import { describe, it, expect, vi } from 'vitest';
import { extractClientCredentialsFromAuthHeader } from './extractClientCredentialsFromAuthHeader';
import { parseBasicCredentials } from '../utils/basicCredentials';

vi.mock('../utils/basicCredentials', () => ({
  parseBasicCredentials: vi.fn(),
}));

describe('extractClientCredentialsFromAuthHeader', () => {
  it('should return empty credentials for undefined input', () => {
    const result = extractClientCredentialsFromAuthHeader(undefined);
    expect(result).toEqual({ clientId: undefined, clientSecret: undefined });
  });

  it('should return empty credentials for empty string input', () => {
    const result = extractClientCredentialsFromAuthHeader('');
    expect(result).toEqual({ clientId: undefined, clientSecret: undefined });
  });

  it('should correctly extract client credentials from valid authorization header', () => {
    vi.mocked(parseBasicCredentials).mockReturnValue({
      userId: 'testClientId',
      password: 'testClientSecret',
    });

    const result = extractClientCredentialsFromAuthHeader(
      'Basic dGVzdENsaWVudElkOnRlc3RDbGllbnRTZWNyZXQ='
    );
    expect(result).toEqual({
      clientId: 'testClientId',
      clientSecret: 'testClientSecret',
    });
    expect(parseBasicCredentials).toHaveBeenCalledWith(
      'Basic dGVzdENsaWVudElkOnRlc3RDbGllbnRTZWNyZXQ='
    );
  });

  it('should handle case where parseBasicCredentials returns undefined values', () => {
    vi.mocked(parseBasicCredentials).mockReturnValue({
      userId: undefined,
      password: undefined,
    });

    const result = extractClientCredentialsFromAuthHeader(
      'Invalid Auth Header'
    );
    expect(result).toEqual({ clientId: undefined, clientSecret: undefined });
    expect(parseBasicCredentials).toHaveBeenCalledWith('Invalid Auth Header');
  });

  it('should handle case where only clientId is present', () => {
    vi.mocked(parseBasicCredentials).mockReturnValue({
      userId: 'testClientId',
      password: undefined,
    });

    const result = extractClientCredentialsFromAuthHeader(
      'Basic dGVzdENsaWVudElkOg=='
    );
    expect(result).toEqual({
      clientId: 'testClientId',
      clientSecret: undefined,
    });
  });

  it('should handle case where only clientSecret is present', () => {
    vi.mocked(parseBasicCredentials).mockReturnValue({
      userId: undefined,
      password: 'testClientSecret',
    });

    const result = extractClientCredentialsFromAuthHeader(
      'Basic OnRlc3RDbGllbnRTZWNyZXQ='
    );
    expect(result).toEqual({
      clientId: undefined,
      clientSecret: 'testClientSecret',
    });
  });
});

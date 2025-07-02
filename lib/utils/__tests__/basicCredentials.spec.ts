import { describe, it, expect } from 'vitest';
import { parseBasicCredentials } from '../basicCredentials';

describe('parseBasicCredentials', () => {
  it('should return empty credentials for undefined input', () => {
    const result = parseBasicCredentials(undefined);
    expect(result).toEqual({ userId: undefined, password: undefined });
  });

  it('should return empty credentials for empty string input', () => {
    const result = parseBasicCredentials('');
    expect(result).toEqual({ userId: undefined, password: undefined });
  });

  it('should return empty credentials for non-Basic auth input', () => {
    const result = parseBasicCredentials('Bearer token');
    expect(result).toEqual({ userId: undefined, password: undefined });
  });

  it('should correctly parse valid Basic auth credentials', () => {
    const base64Credentials = Buffer.from('user:pass').toString('base64');
    const input = `Basic ${base64Credentials}`;
    const result = parseBasicCredentials(input);
    expect(result).toEqual({ userId: 'user', password: 'pass' });
  });

  it('should handle credentials with colon in password', () => {
    const base64Credentials = Buffer.from('user:pass:with:colon').toString(
      'base64'
    );
    const input = `Basic ${base64Credentials}`;
    const result = parseBasicCredentials(input);
    expect(result).toEqual({ userId: 'user', password: 'pass:with:colon' });
  });

  it('should handle credentials without password', () => {
    const base64Credentials = Buffer.from('user:').toString('base64');
    const input = `Basic ${base64Credentials}`;
    const result = parseBasicCredentials(input);
    expect(result).toEqual({ userId: 'user', password: undefined });
  });

  it('should handle credentials without colon', () => {
    const base64Credentials = Buffer.from('user').toString('base64');
    const input = `Basic ${base64Credentials}`;
    const result = parseBasicCredentials(input);
    expect(result).toEqual({ userId: 'user', password: undefined });
  });

  it('should handle credentials with empty username', () => {
    const base64Credentials = Buffer.from(':pass').toString('base64');
    const input = `Basic ${base64Credentials}`;
    const result = parseBasicCredentials(input);
    expect(result).toEqual({ userId: undefined, password: 'pass' });
  });

  it('should handle credentials with empty username and password', () => {
    const base64Credentials = Buffer.from(':').toString('base64');
    const input = `Basic ${base64Credentials}`;
    const result = parseBasicCredentials(input);
    expect(result).toEqual({ userId: undefined, password: undefined });
  });

  it('should return empty credentials for invalid base64 input', () => {
    const input = 'Basic invalid_base64';
    const result = parseBasicCredentials(input);
    expect(result).toEqual({ userId: undefined, password: undefined });
  });
});

import { describe, it, expect } from 'vitest';
import { defaultBuildEndpointErrorMessage } from './buildEndpointErrorMessage';

describe('defaultBuildEndpointErrorMessage', () => {
  it('should format the error message correctly', () => {
    const path = '/api/users';
    const originalMessage = 'User not found';
    const result = defaultBuildEndpointErrorMessage(path, originalMessage);
    expect(result).toBe('Endpoint(/api/users) API Failure: User not found');
  });

  it('should handle paths with special characters', () => {
    const path = '/api/users?id=123&type=admin';
    const originalMessage = 'Invalid parameters';
    const result = defaultBuildEndpointErrorMessage(path, originalMessage);
    expect(result).toBe(
      'Endpoint(/api/users?id=123&type=admin) API Failure: Invalid parameters'
    );
  });

  it('should handle original messages with special characters', () => {
    const path = '/api/posts';
    const originalMessage = 'Error: "Post" not found';
    const result = defaultBuildEndpointErrorMessage(path, originalMessage);
    expect(result).toBe(
      'Endpoint(/api/posts) API Failure: Error: "Post" not found'
    );
  });

  it('should throw an error if path is empty', () => {
    const path = '';
    const originalMessage = 'Some error';
    expect(() =>
      defaultBuildEndpointErrorMessage(path, originalMessage)
    ).toThrow('Path and original message must not be empty');
  });

  it('should throw an error if originalMessage is empty', () => {
    const path = '/api/users';
    const originalMessage = '';
    expect(() =>
      defaultBuildEndpointErrorMessage(path, originalMessage)
    ).toThrow('Path and original message must not be empty');
  });

  it('should throw an error if both path and originalMessage are empty', () => {
    const path = '';
    const originalMessage = '';
    expect(() =>
      defaultBuildEndpointErrorMessage(path, originalMessage)
    ).toThrow('Path and original message must not be empty');
  });

  it('should handle long paths and messages', () => {
    const path = '/api/very/long/path/with/multiple/segments';
    const originalMessage =
      'This is a very long error message that contains a lot of details about what went wrong in the API call';
    const result = defaultBuildEndpointErrorMessage(path, originalMessage);
    expect(result).toBe(
      'Endpoint(/api/very/long/path/with/multiple/segments) API Failure: This is a very long error message that contains a lot of details about what went wrong in the API call'
    );
  });
});

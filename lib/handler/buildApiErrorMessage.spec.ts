import { describe, it, expect } from 'vitest';
import { createBuildApiErrorMessage } from './buildApiErrorMessage';

describe('createBuildApiErrorMessage', () => {
  // Test case for successful creation of error message
  it('should create a valid error message', () => {
    const buildErrorMessage = createBuildApiErrorMessage('/api/users');
    const result = buildErrorMessage('User not found');
    expect(result).toBe('API(/api/users) failure: User not found');
  });

  // Test case for empty path
  it('should throw an error when path is empty', () => {
    expect(() => createBuildApiErrorMessage('')).toThrow(
      'Path must not be empty'
    );
  });

  // Test case for empty original message
  it('should throw an error when original message is empty', () => {
    const buildErrorMessage = createBuildApiErrorMessage('/api/users');
    expect(() => buildErrorMessage('')).toThrow(
      'Original message must not be empty'
    );
  });

  // Test case for different paths
  it('should create error messages with different paths', () => {
    const buildErrorMessage1 = createBuildApiErrorMessage('/api/users');
    const buildErrorMessage2 = createBuildApiErrorMessage('/api/products');

    expect(buildErrorMessage1('Not found')).toBe(
      'API(/api/users) failure: Not found'
    );
    expect(buildErrorMessage2('Server error')).toBe(
      'API(/api/products) failure: Server error'
    );
  });
});

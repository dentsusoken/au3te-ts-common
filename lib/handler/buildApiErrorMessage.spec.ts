import { describe, it, expect } from 'vitest';
import { defaultBuildApiErrorMessage } from './buildApiErrorMessage';

describe('defaultBuildApiErrorMessage', () => {
  // Test for successful case
  it('should return a formatted error message', () => {
    const result = defaultBuildApiErrorMessage('/users', 'Not found');
    expect(result).toBe('API(/users) failure: Not found');
  });

  // Test for empty path
  it('should throw an error if path is empty', () => {
    expect(() => defaultBuildApiErrorMessage('', 'Error')).toThrow(
      'Path must not be empty'
    );
  });

  // Test for empty error message
  it('should throw an error if errorMessage is empty', () => {
    expect(() => defaultBuildApiErrorMessage('/users', '')).toThrow(
      'Error message must not be empty'
    );
  });
});

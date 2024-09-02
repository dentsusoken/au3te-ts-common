import { describe, it, expect } from 'vitest';
import { getErrorMessage } from './errorUtils';

describe('getErrorMessage', () => {
  it('should return the message when input is an Error object', () => {
    const error = new Error('Test error message');
    expect(getErrorMessage(error)).toBe('Test error message');
  });

  it('should return the message for custom Error objects', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'CustomError';
      }
    }
    const customError = new CustomError('Custom error message');
    expect(getErrorMessage(customError)).toBe('Custom error message');
  });

  it('should convert string to string', () => {
    const errorMessage = 'This is an error message';
    expect(getErrorMessage(errorMessage)).toBe(errorMessage);
  });

  it('should convert number to string', () => {
    const numberError = 404;
    expect(getErrorMessage(numberError)).toBe('404');
  });

  it('should convert boolean to string', () => {
    expect(getErrorMessage(true)).toBe('true');
    expect(getErrorMessage(false)).toBe('false');
  });

  it('should convert null to string', () => {
    expect(getErrorMessage(null)).toBe('null');
  });

  it('should convert undefined to string', () => {
    expect(getErrorMessage(undefined)).toBe('undefined');
  });

  it('should convert object to string', () => {
    const obj = { key: 'value' };
    expect(getErrorMessage(obj)).toBe('[object Object]');
  });

  it('should handle objects with custom toString method', () => {
    const customObj = {
      toString: () => 'Custom object string',
    };
    expect(getErrorMessage(customObj)).toBe('Custom object string');
  });
});

import { describe, it, expect } from 'vitest';
import { getErrorMessage } from './errorUtils';

describe('errorUtils', () => {
  describe('getErrorMessage', () => {
    it('should return the message of an Error object', () => {
      const error = new Error('Test error message');
      expect(getErrorMessage(error)).toBe('Test error message');
    });

    it('should return the string itself for string input', () => {
      expect(getErrorMessage('Test string')).toBe('Test string');
    });

    it('should handle null', () => {
      expect(getErrorMessage(null)).toBe('null');
    });

    it('should handle undefined', () => {
      console.log(JSON.stringify(undefined));
      expect(getErrorMessage(undefined)).toBe('undefined');
    });

    it('should handle numbers', () => {
      expect(getErrorMessage(42)).toBe('42');
      expect(getErrorMessage(0)).toBe('0');
      expect(getErrorMessage(NaN)).toBe('null');
    });

    it('should handle booleans', () => {
      expect(getErrorMessage(true)).toBe('true');
      expect(getErrorMessage(false)).toBe('false');
    });

    it('should handle objects without toString method', () => {
      const obj = { key: 'value' };
      expect(getErrorMessage(obj)).toBe('{"key":"value"}');
    });

    it('should handle arrays', () => {
      expect(getErrorMessage([1, 2, 3])).toBe('[1,2,3]');
      expect(getErrorMessage([])).toBe('[]');
    });

    it('should handle custom error classes', () => {
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'CustomError';
        }
      }
      const customError = new CustomError('Custom error message');
      expect(getErrorMessage(customError)).toBe('Custom error message');
    });

    it('should handle complex objects', () => {
      const complexObj = {
        a: 1,
        b: 'string',
        c: { nested: true },
        d: [1, 2, 3],
      };
      expect(getErrorMessage(complexObj)).toBe(
        '{"a":1,"b":"string","c":{"nested":true},"d":[1,2,3]}'
      );
    });

    it('should handle objects with circular references', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const circularObj: any = { a: 1 };
      circularObj.self = circularObj;
      expect(() => getErrorMessage(circularObj)).toThrow();
    });
  });
});

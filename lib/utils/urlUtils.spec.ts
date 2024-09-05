import { describe, it, expect } from 'vitest';
import { urlEncodeFormData } from './urlUtils';

describe('urlUtils', () => {
  describe('urlEncodeFormData', () => {
    it('should encode simple key-value pairs', () => {
      const data = { name: 'John Doe', age: 30 };
      expect(urlEncodeFormData(data)).toBe('name=John+Doe&age=30');
    });

    it('should handle array values', () => {
      const data = { colors: ['red', 'green', 'blue'] };
      expect(urlEncodeFormData(data)).toBe(
        'colors=red&colors=green&colors=blue'
      );
    });

    it('should ignore null and undefined values', () => {
      const data = { name: 'John', age: null, city: undefined, country: 'USA' };
      expect(urlEncodeFormData(data)).toBe('name=John&country=USA');
    });

    it('should handle empty objects', () => {
      expect(urlEncodeFormData({})).toBe('');
    });

    it('should encode special characters', () => {
      const data = { query: 'hello world', param: 'a&b=c' };
      expect(urlEncodeFormData(data)).toBe('query=hello+world&param=a%26b%3Dc');
    });

    it('should handle nested objects', () => {
      const data = { user: { name: 'John', age: 30 } };
      expect(urlEncodeFormData(data)).toBe('user=%5Bobject+Object%5D');
    });

    it('should handle boolean values', () => {
      const data = { isActive: true, isAdmin: false };
      expect(urlEncodeFormData(data)).toBe('isActive=true&isAdmin=false');
    });

    it('should handle number values', () => {
      const data = { id: 12345, price: 99.99 };
      expect(urlEncodeFormData(data)).toBe('id=12345&price=99.99');
    });

    it('should handle mixed types in arrays', () => {
      const data = { mix: [1, 'two', true, null, undefined] };
      expect(urlEncodeFormData(data)).toBe('mix=1&mix=two&mix=true');
    });
  });
});

import { describe, it, expect } from 'vitest';
import { jsonToQueryString } from './urlUtils';

describe('jsonToQueryString', () => {
  it('should convert a simple object to a query string', () => {
    const input = { name: 'John', age: 30 };
    const result = jsonToQueryString(input);
    expect(result).toBe('name=John&age=30');
  });

  it('should handle arrays', () => {
    const input = { fruits: ['apple', 'banana', 'cherry'] };
    const result = jsonToQueryString(input);
    expect(result).toBe('fruits=apple&fruits=banana&fruits=cherry');
  });

  it('should ignore null and undefined values', () => {
    const input = { name: 'John', age: null, city: undefined, country: 'USA' };
    const result = jsonToQueryString(input);
    expect(result).toBe('name=John&country=USA');
  });

  it('should handle empty objects', () => {
    const input = {};
    const result = jsonToQueryString(input);
    expect(result).toBe('');
  });

  it('should handle non-string values', () => {
    const input = { number: 42, boolean: true, object: { key: 'value' } };
    const result = jsonToQueryString(input);
    expect(result).toBe('number=42&boolean=true&object=%5Bobject+Object%5D');
  });

  it('should handle special characters', () => {
    const input = { 'special chars': 'hello world!@#$%^&*()' };
    const result = jsonToQueryString(input);
    expect(result).toBe(
      'special+chars=hello+world%21%40%23%24%25%5E%26*%28%29'
    );
  });

  it('should handle nested arrays', () => {
    const input = { nested: [1, [2, 3], 4] };
    const result = jsonToQueryString(input);
    expect(result).toBe('nested=1&nested=2%2C3&nested=4');
  });
});

import { describe, it, expect } from 'vitest';
import { parseQueryString } from '../parseQueryString';

describe('parseQueryString', () => {
  it('should parse query string into correct object', () => {
    const result = parseQueryString('?foo=bar&baz=qux');
    expect(result).toEqual({
      foo: 'bar',
      baz: 'qux',
    });
  });

  it('should parse correctly without leading question mark', () => {
    const result = parseQueryString('foo=bar');
    expect(result).toEqual({
      foo: 'bar',
    });
  });

  it('should return empty object for empty string', () => {
    const result = parseQueryString('');
    expect(result).toEqual({});
  });

  it('should properly decode URL encoded values', () => {
    const result = parseQueryString('name=%E5%B1%B1%E7%94%B0&age=30');
    expect(result).toEqual({
      name: '山田',
      age: '30',
    });
  });

  it('should use the last value when key appears multiple times', () => {
    const result = parseQueryString('key=value1&key=value2');
    expect(result).toEqual({
      key: 'value2',
    });
  });
});

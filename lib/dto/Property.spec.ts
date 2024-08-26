import { describe, it, expect } from 'vitest';
import { Property } from './Property';

describe('Property', () => {
  it('should create a new instance with the provided key and value', () => {
    const property = new Property('name', 'John');
    expect(property.key).toBe('name');
    expect(property.value).toBe('John');
    expect(property.hidden).toBe(false);
  });

  it('should create a new instance with the provided key, value, and hidden flag', () => {
    const property = new Property('password', 'secret', true);
    expect(property.key).toBe('password');
    expect(property.value).toBe('secret');
    expect(property.hidden).toBe(true);
  });

  it('should return a string representation of the property', () => {
    const property1 = new Property('name', 'John');
    expect(property1.toString()).toBe('name=John');

    const property2 = new Property('password', 'secret', true);
    expect(property2.toString()).toBe('password=secret (hidden)');
  });
});

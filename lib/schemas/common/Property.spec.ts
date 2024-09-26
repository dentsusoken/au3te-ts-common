import { describe, it, expect } from 'vitest';
import { propertySchema } from './Property';

describe('propertySchema', () => {
  it('validates correct input', () => {
    expect(() =>
      propertySchema.parse({
        key: 'testKey',
        value: 'testValue',
        hidden: true,
      })
    ).not.toThrow();
  });

  it('allows null values', () => {
    expect(() =>
      propertySchema.parse({
        key: null,
        value: null,
        hidden: null,
      })
    ).not.toThrow();
  });

  it('allows undefined values', () => {
    expect(() => propertySchema.parse({})).not.toThrow();
  });

  it('rejects invalid types', () => {
    expect(() =>
      propertySchema.parse({
        key: 123,
        value: {},
        hidden: 'not a boolean',
      })
    ).toThrow();
  });

  it('allows partial input', () => {
    expect(() =>
      propertySchema.parse({
        key: 'testKey',
      })
    ).not.toThrow();
  });

  it('infers correct types', () => {
    const validInput = {
      key: 'testKey',
      value: 'testValue',
      hidden: true,
    };
    const parsed = propertySchema.parse(validInput);
    expect(parsed).toEqual(validInput);
  });
});

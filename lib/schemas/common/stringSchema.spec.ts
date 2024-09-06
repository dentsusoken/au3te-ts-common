import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  nullableButOptionalStringSchema,
  nullableButOptionalUrlStringSchema,
} from './stringSchema';

describe('nullableButOptionalStringSchema', () => {
  it('should parse a string value', () => {
    const result = nullableButOptionalStringSchema.parse('hello');
    expect(result).toBe('hello');
  });

  it('should parse an undefined value', () => {
    const result = nullableButOptionalStringSchema.parse(undefined);
    expect(result).toBeUndefined();
  });

  it('should parse a null value as undefined', () => {
    const result = nullableButOptionalStringSchema.parse(null);
    expect(result).toBeUndefined();
  });

  it('should throw an error for non-string, non-null, and non-undefined values', () => {
    expect(() => nullableButOptionalStringSchema.parse(123)).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalStringSchema.parse(true)).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalStringSchema.parse({})).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalStringSchema.parse([])).toThrowError(
      z.ZodError
    );
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof nullableButOptionalStringSchema>;
    type ExpectedType = string | undefined;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});

describe('nullableButOptionalUrlStringSchema', () => {
  it('should parse a valid URL string', () => {
    const result = nullableButOptionalUrlStringSchema.parse(
      'https://example.com'
    );
    expect(result).toBe('https://example.com');
  });

  it('should parse an undefined value', () => {
    const result = nullableButOptionalUrlStringSchema.parse(undefined);
    expect(result).toBeUndefined();
  });

  it('should parse a null value as undefined', () => {
    const result = nullableButOptionalUrlStringSchema.parse(null);
    expect(result).toBeUndefined();
  });

  it('should throw an error for invalid URL strings', () => {
    expect(() =>
      nullableButOptionalUrlStringSchema.parse('invalid-url')
    ).toThrowError(z.ZodError);
    expect(() =>
      nullableButOptionalUrlStringSchema.parse('http://')
    ).toThrowError(z.ZodError);
  });

  it('should throw an error for non-string, non-null, and non-undefined values', () => {
    expect(() => nullableButOptionalUrlStringSchema.parse(123)).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalUrlStringSchema.parse(true)).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalUrlStringSchema.parse({})).toThrowError(
      z.ZodError
    );
    expect(() => nullableButOptionalUrlStringSchema.parse([])).toThrowError(
      z.ZodError
    );
  });

  it('should infer the correct output type', () => {
    type SchemaType = z.infer<typeof nullableButOptionalUrlStringSchema>;
    type ExpectedType = string | undefined;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });
});

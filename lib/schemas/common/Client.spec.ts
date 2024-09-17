import { describe, it, expect } from 'vitest';
import {
  clientSchema,
  Client,
  nullableButOptionalClientSchema,
} from './Client';

describe('clientSchema', () => {
  it('should accept a valid Client object', () => {
    const validClient: Client = { clientName: 'Test Client' };
    const result = clientSchema.safeParse(validClient);
    expect(result.success).toBe(true);
  });

  it('should accept a Client object with null clientName', () => {
    const clientWithNullName = { clientName: null };
    const result = clientSchema.safeParse(clientWithNullName);
    expect(result.success).toBe(true);
  });

  it('should accept a Client object without clientName', () => {
    const clientWithoutName = {};
    const result = clientSchema.safeParse(clientWithoutName);
    expect(result.success).toBe(true);
  });

  it('should reject a Client object with invalid clientName type', () => {
    const invalidClient = { clientName: 123 };
    const result = clientSchema.safeParse(invalidClient);
    expect(result.success).toBe(false);
  });
});

describe('nullableButOptionalClientSchema', () => {
  it('should accept a valid Client object', () => {
    const validClient: Client = { clientName: 'Test Client' };
    const result = nullableButOptionalClientSchema.safeParse(validClient);
    expect(result.success).toBe(true);
  });

  it('should accept undefined', () => {
    const result = nullableButOptionalClientSchema.safeParse(undefined);
    expect(result.success).toBe(true);
  });

  it('should treat null as undefined', () => {
    const result = nullableButOptionalClientSchema.safeParse(null);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeUndefined();
    }
  });

  it('should accept a Client object with null clientName', () => {
    const clientWithNullName = { clientName: null };
    const result =
      nullableButOptionalClientSchema.safeParse(clientWithNullName);
    expect(result.success).toBe(true);
  });

  it('should accept a Client object without clientName', () => {
    const clientWithoutName = {};
    const result = nullableButOptionalClientSchema.safeParse(clientWithoutName);
    expect(result.success).toBe(true);
  });

  it('should reject non-object, non-null values', () => {
    const invalidValues = [123, 'string', true, [], () => {}];
    invalidValues.forEach((value) => {
      const result = nullableButOptionalClientSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });
});

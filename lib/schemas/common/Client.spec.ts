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

  it('should accept additional properties due to passthrough', () => {
    const clientWithExtra = {
      clientName: 'TestClient',
      extraProperty: 'This is an extra property',
      anotherExtra: 123,
      nestedExtra: {
        foo: 'bar',
        baz: [1, 2, 3],
      },
    };
    const result = clientSchema.safeParse(clientWithExtra);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(clientWithExtra);
      expect(result.data.extraProperty).toBe('This is an extra property');
      expect(result.data.anotherExtra).toBe(123);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.data?.nestedExtra as any).foo).toBe('bar');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.data?.nestedExtra as any).baz).toEqual([1, 2, 3]);
    }
  });
});

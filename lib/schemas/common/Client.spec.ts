import { describe, it, expect } from 'vitest';
import {
  clientSchema,
  Client,
  nullableButOptionalClientSchema,
} from './Client';

describe('clientSchema', () => {
  it('should accept additional properties due to passthrough', () => {
    const clientWithExtra = {
      clientName: 'TestClient',
      subjectType: 'pairwise',
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
});

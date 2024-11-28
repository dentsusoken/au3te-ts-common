import { describe, it, expect } from 'vitest';
import { createCreateOrder } from './createOrder';

describe('createCreateOrder', () => {
  // Mock function for computeCredentialDuration
  const mockComputeCredentialDuration = () => 3600;

  // Create test instance
  const createOrder = createCreateOrder({
    computeCredentialDuration: mockComputeCredentialDuration,
  });

  it('creates order with valid claims', () => {
    const requestIdentifier = 'test-request-id';
    const claims = {
      name: 'John Doe',
      age: 30,
    };

    const order = createOrder(requestIdentifier, claims);

    expect(order).toEqual({
      requestIdentifier: 'test-request-id',
      credentialPayload: JSON.stringify(claims),
      issuanceDeferred: false,
      credentialDuration: 3600,
    });
  });

  it('creates deferred order when claims is empty object', () => {
    const requestIdentifier = 'test-request-id';
    const claims = {};

    const order = createOrder(requestIdentifier, claims);

    expect(order).toEqual({
      requestIdentifier: 'test-request-id',
      credentialPayload: '{}',
      issuanceDeferred: false,
      credentialDuration: 3600,
    });
  });

  it('creates deferred order when claims is null', () => {
    const requestIdentifier = 'test-request-id';
    const claims = null as unknown as Record<string, unknown>;

    const order = createOrder(requestIdentifier, claims);

    expect(order).toEqual({
      requestIdentifier: 'test-request-id',
      credentialPayload: undefined,
      issuanceDeferred: true,
      credentialDuration: 3600,
    });
  });

  it('preserves complex nested objects in claims', () => {
    const requestIdentifier = 'test-request-id';
    const claims = {
      user: {
        name: 'John Doe',
        address: {
          street: '123 Main St',
          city: 'Example City',
        },
      },
      certificates: ['cert1', 'cert2'],
    };

    const order = createOrder(requestIdentifier, claims);

    expect(order).toEqual({
      requestIdentifier: 'test-request-id',
      credentialPayload: JSON.stringify(claims),
      issuanceDeferred: false,
      credentialDuration: 3600,
    });
  });
});

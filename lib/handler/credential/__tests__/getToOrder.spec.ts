import { describe, it, expect, vi } from 'vitest';
import { createGetToOrder } from '../getToOrder';
import { MSO_MDOC } from '../constants';
import type { ToOrder } from '../toOrder';
import { CredentialFormat } from '../../../schemas/credential/CredentialFormat';

describe('getToOrder', () => {
  // Mock ToOrder function
  const mockMdocToOrder: ToOrder = vi.fn();

  // Create test instance
  const getToOrder = createGetToOrder({
    mdocToOrder: mockMdocToOrder,
  });

  it('should return mdocToOrder for MSO_MDOC format', () => {
    const toOrder = getToOrder(MSO_MDOC);
    expect(toOrder).toBe(mockMdocToOrder);
  });

  it('should throw error for unsupported format', () => {
    const unsupportedFormat = 'unsupported-format' as CredentialFormat;
    expect(() => getToOrder(unsupportedFormat)).toThrow(
      `Unsupported format: ${unsupportedFormat}`
    );
  });

  it('should throw error for empty format', () => {
    const emptyFormat = '' as CredentialFormat;
    expect(() => getToOrder(emptyFormat)).toThrow(
      `Unsupported format: ${emptyFormat}`
    );
  });

  it('should throw error for undefined format', () => {
    const undefinedFormat = undefined as unknown as CredentialFormat;
    expect(() => getToOrder(undefinedFormat)).toThrow(
      `Unsupported format: ${undefinedFormat}`
    );
  });
});

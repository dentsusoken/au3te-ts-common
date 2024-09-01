import { describe, it, expect } from 'vitest';
import { extractClientCertificateAndPathFromChain } from './extractClientCertificateAndPathFromChain';

describe('extractClientCertificateAndPathFromChain', () => {
  it('should return undefined values for undefined input', () => {
    const result = extractClientCertificateAndPathFromChain(undefined);
    expect(result).toEqual({
      clientCertificate: undefined,
      clientCertificatePath: undefined,
    });
  });

  it('should return undefined values for empty array input', () => {
    const result = extractClientCertificateAndPathFromChain([]);
    expect(result).toEqual({
      clientCertificate: undefined,
      clientCertificatePath: undefined,
    });
  });

  it('should correctly extract certificate and path from a chain with multiple elements', () => {
    const chain = ['clientCert', 'cert1', 'cert2', 'cert3'];
    const result = extractClientCertificateAndPathFromChain(chain);
    expect(result).toEqual({
      clientCertificate: 'clientCert',
      clientCertificatePath: ['cert1', 'cert2', 'cert3'],
    });
  });

  it('should handle a chain with only one element', () => {
    const chain = ['singleCert'];
    const result = extractClientCertificateAndPathFromChain(chain);
    expect(result).toEqual({
      clientCertificate: 'singleCert',
      clientCertificatePath: [],
    });
  });

  it('should not modify the original array', () => {
    const originalChain = ['clientCert', 'cert1', 'cert2'];
    const chainCopy = [...originalChain];
    extractClientCertificateAndPathFromChain(chainCopy);
    expect(chainCopy).toEqual(originalChain);
  });

  it('should handle a chain with two elements', () => {
    const chain = ['clientCert', 'cert1'];
    const result = extractClientCertificateAndPathFromChain(chain);
    expect(result).toEqual({
      clientCertificate: 'clientCert',
      clientCertificatePath: ['cert1'],
    });
  });
});

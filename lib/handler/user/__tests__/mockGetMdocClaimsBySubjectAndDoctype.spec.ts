import { describe, expect, it } from 'vitest';
import { mockGetMdocClaimsBySubjectAndDoctype } from '../mockGetMdocClaimsBySubjectAndDoctype';

describe('mockGetMdocClaimsBySubjectAndDoctype', () => {
  const validSubject = '1004';
  const validDoctype = 'org.iso.18013.5.1.mDL';
  const invalidSubject = '9999';
  const invalidDoctype = 'invalid.doctype';

  it('should return correct Mdoc for valid subject and doctype combination', async () => {
    const result = await mockGetMdocClaimsBySubjectAndDoctype(
      validSubject,
      validDoctype
    );

    expect(result).toBeDefined();
    expect(result?.['org.iso.18013.5.1']).toBeDefined();
    expect(result?.['org.iso.18013.5.1'].family_name).toBe('Silverstone');
    expect(result?.['org.iso.18013.5.1'].given_name).toBe('Inga');
  });

  it('should return undefined for non-existent subject', async () => {
    const result = await mockGetMdocClaimsBySubjectAndDoctype(
      invalidSubject,
      validDoctype
    );

    expect(result).toBeUndefined();
  });

  it('should return undefined for non-existent doctype', async () => {
    const result = await mockGetMdocClaimsBySubjectAndDoctype(
      validSubject,
      invalidDoctype
    );

    expect(result).toBeUndefined();
  });

  it('should return undefined for non-existent subject and doctype combination', async () => {
    const result = await mockGetMdocClaimsBySubjectAndDoctype(
      invalidSubject,
      invalidDoctype
    );

    expect(result).toBeUndefined();
  });
});

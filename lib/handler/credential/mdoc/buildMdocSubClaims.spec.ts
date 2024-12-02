import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBuildMdocSubClaims } from './buildMdocSubClaims';
import type { Claims } from '../types';
import { BadRequestError } from '../../BadRequestError';

describe('buildMdocSubClaims', () => {
  // Mock addMdocDateClaims function
  const mockAddMdocDateClaims = vi.fn();

  // Create test instance
  const buildMdocSubClaims = createBuildMdocSubClaims({
    addMdocDateClaims: mockAddMdocDateClaims,
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should throw BadRequestError when requestedSubClaims is undefined', () => {
    const userSubClaims: Claims = {
      name: 'John Doe',
      age: 25,
    };

    const doctype = 'org.iso.18013.5.1.mDL';

    expect(() =>
      buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims: undefined,
        doctype,
      })
    ).toThrow(
      new BadRequestError(
        'invalid_credential_request',
        'No requested sub-claims provided'
      )
    );

    expect(mockAddMdocDateClaims).not.toHaveBeenCalled();
  });

  it('should throw BadRequestError when requestedSubClaims is empty', () => {
    const userSubClaims: Claims = {
      name: 'John Doe',
      age: 25,
    };

    const requestedSubClaims: Claims = {};
    const doctype = 'org.iso.18013.5.1.mDL';

    expect(() =>
      buildMdocSubClaims({
        userSubClaims,
        requestedSubClaims,
        doctype,
      })
    ).toThrow(
      new BadRequestError(
        'invalid_credential_request',
        'No requested sub-claims provided'
      )
    );

    expect(mockAddMdocDateClaims).not.toHaveBeenCalled();
  });

  it('should return only requested claims when requestedSubClaims is provided', () => {
    const userSubClaims: Claims = {
      name: 'John Doe',
      age: 25,
      address: '123 Main St',
    };

    const requestedSubClaims: Claims = {
      name: {},
      age: {},
    };

    const doctype = 'org.iso.18013.5.1.mDL';

    const result = buildMdocSubClaims({
      userSubClaims,
      requestedSubClaims,
      doctype,
    });

    expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
      subClaims: expect.any(Object),
      requestedSubClaims,
      doctype,
    });
    expect(result).toEqual({
      name: 'John Doe',
      age: 25,
      ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
    });
    expect(result.address).toBeUndefined();
  });

  it('should handle missing user claims', () => {
    const userSubClaims: Claims = {
      name: 'John Doe',
    };

    const requestedSubClaims: Claims = {
      name: {},
      age: {},
    };

    const doctype = 'org.iso.18013.5.1.mDL';

    const result = buildMdocSubClaims({
      userSubClaims,
      requestedSubClaims,
      doctype,
    });

    expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
      subClaims: expect.any(Object),
      requestedSubClaims,
      doctype,
    });
    expect(result).toEqual({
      name: 'John Doe',
      ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
    });
    expect(result.age).toBeUndefined();
  });

  it('should handle undefined claim values', () => {
    const userSubClaims: Claims = {
      name: 'John Doe',
      age: undefined,
    };

    const requestedSubClaims: Claims = {
      name: {},
      age: {},
    };

    const doctype = 'org.iso.18013.5.1.mDL';

    const result = buildMdocSubClaims({
      userSubClaims,
      requestedSubClaims,
      doctype,
    });

    expect(mockAddMdocDateClaims).toHaveBeenCalledWith({
      subClaims: expect.any(Object),
      requestedSubClaims,
      doctype,
    });
    expect(result).toEqual({
      name: 'John Doe',
      ...mockAddMdocDateClaims.mock.calls[0][0].subClaims,
    });
    expect(result.age).toBeUndefined();
  });
});

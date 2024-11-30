import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBuildMdocClaims } from './buildMdocClaims';
import type { Claims } from './types';

describe('buildMdocClaims', () => {
  // Mock buildMdocSubClaims function
  const mockBuildMdocSubClaims = vi.fn();

  // Create test instance
  const buildMdocClaims = createBuildMdocClaims({
    buildMdocSubClaims: mockBuildMdocSubClaims,
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return all user claims when requestedClaims is undefined', async () => {
    const userClaims: Claims = {
      'org.iso.18013.5.1': {
        name: 'John Doe',
        age: 25,
      },
    };

    const doctype = 'org.iso.18013.5.1.mDL';

    const result = await buildMdocClaims({
      userClaims,
      requestedClaims: undefined,
      doctype,
    });

    expect(mockBuildMdocSubClaims).not.toHaveBeenCalled();
    expect(result).toEqual(userClaims);
  });

  it('should return only requested claims when requestedClaims is provided', async () => {
    const userClaims: Claims = {
      'org.iso.18013.5.1': {
        name: 'John Doe',
        age: 25,
        address: '123 Main St',
      },
    };

    const requestedClaims: Claims = {
      'org.iso.18013.5.1': {
        name: {},
        age: {},
      },
    };

    const doctype = 'org.iso.18013.5.1.mDL';

    mockBuildMdocSubClaims.mockReturnValue({
      name: 'John Doe',
      age: 25,
    });

    const result = await buildMdocClaims({
      userClaims,
      requestedClaims,
      doctype,
    });

    expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
      userSubClaims: userClaims['org.iso.18013.5.1'],
      requestedSubClaims: requestedClaims['org.iso.18013.5.1'],
      doctype,
    });
    expect(result).toEqual({
      'org.iso.18013.5.1': {
        name: 'John Doe',
        age: 25,
      },
    });
  });

  it('should handle missing namespaces', async () => {
    const userClaims: Claims = {
      'org.iso.18013.5.1': {
        name: 'John Doe',
      },
    };

    const requestedClaims: Claims = {
      'org.example.custom': {
        score: {},
      },
    };

    const doctype = 'org.iso.18013.5.1.mDL';

    const result = await buildMdocClaims({
      userClaims,
      requestedClaims,
      doctype,
    });

    expect(mockBuildMdocSubClaims).not.toHaveBeenCalled();
    expect(result).toEqual({});
  });

  it('should handle empty requestedClaims', async () => {
    const userClaims: Claims = {
      'org.iso.18013.5.1': {
        name: 'John Doe',
        age: 25,
      },
    };

    const requestedClaims: Claims = {};
    const doctype = 'org.iso.18013.5.1.mDL';

    const result = await buildMdocClaims({
      userClaims,
      requestedClaims,
      doctype,
    });

    expect(mockBuildMdocSubClaims).not.toHaveBeenCalled();
    expect(result).toEqual(userClaims);
  });

  it('should handle multiple namespaces', async () => {
    const userClaims: Claims = {
      'org.iso.18013.5.1': {
        name: 'John Doe',
        age: 25,
      },
      'org.example.custom': {
        score: 100,
        grade: 'A',
      },
    };

    const requestedClaims: Claims = {
      'org.iso.18013.5.1': {
        name: {},
      },
      'org.example.custom': {
        score: {},
      },
    };

    const doctype = 'org.iso.18013.5.1.mDL';

    mockBuildMdocSubClaims
      .mockReturnValueOnce({
        name: 'John Doe',
      })
      .mockReturnValueOnce({
        score: 100,
      });

    const result = await buildMdocClaims({
      userClaims,
      requestedClaims,
      doctype,
    });

    expect(mockBuildMdocSubClaims).toHaveBeenCalledTimes(2);
    expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
      userSubClaims: userClaims['org.iso.18013.5.1'],
      requestedSubClaims: requestedClaims['org.iso.18013.5.1'],
      doctype,
    });
    expect(mockBuildMdocSubClaims).toHaveBeenCalledWith({
      userSubClaims: userClaims['org.example.custom'],
      requestedSubClaims: requestedClaims['org.example.custom'],
      doctype,
    });
    expect(result).toEqual({
      'org.iso.18013.5.1': {
        name: 'John Doe',
      },
      'org.example.custom': {
        score: 100,
      },
    });
  });
});

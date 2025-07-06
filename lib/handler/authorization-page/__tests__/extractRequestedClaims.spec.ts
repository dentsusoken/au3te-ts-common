import { describe, it, expect, vi } from 'vitest';
import {
  extractPurpose,
  extractClaimNamePurposePair,
  extractRequestedClaimsFromObject,
  extractRequestedClaimsFromArray,
  defaultExtractRequestedClaims,
  ClaimsContainer,
} from '../extractRequestedClaims';

describe('Claims Extraction Functions', () => {
  describe('extractPurpose', () => {
    it('should return the purpose when it is a string', () => {
      expect(extractPurpose({ purpose: 'test purpose' })).toBe('test purpose');
    });

    it('should return undefined when purpose is not a string', () => {
      expect(extractPurpose({ purpose: 123 })).toBeUndefined();
      expect(extractPurpose({ purpose: {} })).toBeUndefined();
      expect(extractPurpose({})).toBeUndefined();
    });

    it('should handle null and undefined purpose', () => {
      expect(
        extractPurpose({ purpose: null as unknown as string })
      ).toBeUndefined();
      expect(extractPurpose({ purpose: undefined })).toBeUndefined();
    });
  });

  describe('extractClaimNamePurposePair', () => {
    it('should create a pair with key and value', () => {
      expect(
        extractClaimNamePurposePair('testKey', { purpose: 'test purpose' })
      ).toEqual({
        key: 'testKey',
        value: 'test purpose',
      });
    });

    it('should create a pair with undefined value when purpose is not a string', () => {
      expect(extractClaimNamePurposePair('testKey', { purpose: 123 })).toEqual({
        key: 'testKey',
        value: undefined,
      });
    });

    it('should handle empty string as purpose', () => {
      expect(extractClaimNamePurposePair('testKey', { purpose: '' })).toEqual({
        key: 'testKey',
        value: undefined,
      });
    });
  });

  describe('extractRequestedClaimsFromObject', () => {
    it('should extract claims from an object', () => {
      const obj = {
        claims: {
          claim1: { purpose: 'purpose1' },
          claim2: { purpose: 'purpose2' },
        },
      };
      expect(extractRequestedClaimsFromObject(obj)).toEqual([
        { key: 'claim1', value: 'purpose1' },
        { key: 'claim2', value: 'purpose2' },
      ]);
    });

    it('should return undefined when there are no claims', () => {
      expect(extractRequestedClaimsFromObject({})).toBeUndefined();
    });

    it('should handle empty claims object', () => {
      expect(extractRequestedClaimsFromObject({ claims: {} })).toEqual([]);
    });
  });

  describe('extractRequestedClaimsFromArray', () => {
    it('should extract claims from an array of objects', () => {
      const array: ClaimsContainer[] = [
        { claims: { claim1: { purpose: 'purpose1' } } },
        { claims: { claim2: { purpose: 'purpose2' } } },
      ];
      expect(extractRequestedClaimsFromArray(array)).toEqual([
        { key: 'claim1', value: 'purpose1' },
        { key: 'claim2', value: 'purpose2' },
      ]);
    });

    it('should return undefined when there are no claims', () => {
      expect(extractRequestedClaimsFromArray([])).toBeUndefined();
      expect(extractRequestedClaimsFromArray([{}, {}])).toBeUndefined();
    });

    it('should handle array with empty claims objects', () => {
      const array: ClaimsContainer[] = [{ claims: {} }, { claims: {} }];
      expect(extractRequestedClaimsFromArray(array)).toBeUndefined();
    });
  });

  describe('defaultExtractRequestedClaims', () => {
    it('should extract claims from a JSON string', () => {
      const claimsJson = JSON.stringify({
        verified_claims: {
          claims: {
            claim1: { purpose: 'purpose1' },
            claim2: { purpose: 'purpose2' },
          },
        },
      });
      expect(defaultExtractRequestedClaims(claimsJson)).toEqual([
        { key: 'claim1', value: 'purpose1' },
        { key: 'claim2', value: 'purpose2' },
      ]);
    });

    it('should handle an array of verified claims', () => {
      const claimsJson = JSON.stringify({
        verified_claims: [
          { claims: { claim1: { purpose: 'purpose1' } } },
          { claims: { claim2: { purpose: 'purpose2' } } },
        ],
      });
      expect(defaultExtractRequestedClaims(claimsJson)).toEqual([
        { key: 'claim1', value: 'purpose1' },
        { key: 'claim2', value: 'purpose2' },
      ]);
    });

    it('should return undefined for invalid JSON', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(defaultExtractRequestedClaims('invalid json')).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('should return undefined when there are no verified claims', () => {
      expect(defaultExtractRequestedClaims(JSON.stringify({}))).toBeUndefined();
    });

    it('should return undefined when claimsJson is undefined', () => {
      expect(defaultExtractRequestedClaims(undefined)).toBeUndefined();
    });

    it('should handle empty claims object in verified_claims', () => {
      const claimsJson = JSON.stringify({
        verified_claims: { claims: {} },
      });
      expect(defaultExtractRequestedClaims(claimsJson)).toEqual([]);
    });

    it('should handle array of empty claims objects in verified_claims', () => {
      const claimsJson = JSON.stringify({
        verified_claims: [{ claims: {} }, { claims: {} }],
      });
      expect(defaultExtractRequestedClaims(claimsJson)).toBeUndefined();
    });

    it('should handle special characters in claim names and purposes', () => {
      const claimsJson = JSON.stringify({
        verified_claims: {
          claims: {
            'claim-1': { purpose: 'purpose-1' },
            claim_2: { purpose: 'purpose_2' },
            'claim 3': { purpose: 'purpose 3' },
            'claim.4': { purpose: 'purpose.4' },
          },
        },
      });
      expect(defaultExtractRequestedClaims(claimsJson)).toEqual([
        { key: 'claim-1', value: 'purpose-1' },
        { key: 'claim_2', value: 'purpose_2' },
        { key: 'claim 3', value: 'purpose 3' },
        { key: 'claim.4', value: 'purpose.4' },
      ]);
    });
  });
});

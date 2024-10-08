import { describe, it, expect, vi } from 'vitest';
import {
  extractPurpose,
  extractClaimNamePurposePair,
  extractRequestedClaimsFromObject,
  extractRequestedClaimsFromArray,
  extractRequestedClaims,
  ClaimsContainer,
} from './extractRequestedClaims';

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
  });

  describe('extractRequestedClaims', () => {
    it('should extract claims from a JSON string', () => {
      const claimsJson = JSON.stringify({
        verified_claims: {
          claims: {
            claim1: { purpose: 'purpose1' },
            claim2: { purpose: 'purpose2' },
          },
        },
      });
      expect(extractRequestedClaims(claimsJson)).toEqual([
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
      expect(extractRequestedClaims(claimsJson)).toEqual([
        { key: 'claim1', value: 'purpose1' },
        { key: 'claim2', value: 'purpose2' },
      ]);
    });

    it('should return undefined for invalid JSON', () => {
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      expect(extractRequestedClaims('invalid json')).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('should return undefined when there are no verified claims', () => {
      expect(extractRequestedClaims(JSON.stringify({}))).toBeUndefined();
    });

    it('should return undefined when claimsJson is undefined', () => {
      expect(extractRequestedClaims(undefined)).toBeUndefined();
    });
  });
});

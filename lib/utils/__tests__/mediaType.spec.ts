import { describe, it, expect } from 'vitest';
import {
  MediaType,
  isMediaTypeEqual,
  isJsonType,
  isFormUrlEncodedType,
} from '../mediaType';

describe('MediaType utilities', () => {
  describe('MediaType constants', () => {
    it('should have correct values for media types', () => {
      expect(MediaType.APPLICATION_JSON).toBe('application/json');
      expect(MediaType.APPLICATION_JSON_UTF8).toBe(
        'application/json;charset=utf-8'
      );
      expect(MediaType.APPLICATION_FORM_URLENCODED).toBe(
        'application/x-www-form-urlencoded'
      );
      expect(MediaType.TEXT_HTML).toBe('text/html');
      expect(MediaType.TEXT_PLAIN).toBe('text/plain');
      expect(MediaType.TEXT_PLAIN_UTF8).toBe('text/plain;charset=utf-8');
    });
  });

  describe('isMediaTypeEqual', () => {
    it('should return true for exact matches', () => {
      expect(
        isMediaTypeEqual(MediaType.APPLICATION_JSON, MediaType.APPLICATION_JSON)
      ).toBe(true);
    });

    it('should return true when target type has additional parameters', () => {
      expect(
        isMediaTypeEqual(
          MediaType.APPLICATION_JSON,
          'application/json; charset=utf-8'
        )
      ).toBe(true);
    });

    it('should return false for different types', () => {
      expect(
        isMediaTypeEqual(MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN)
      ).toBe(false);
    });

    it('should return false for undefined target type', () => {
      expect(isMediaTypeEqual(MediaType.APPLICATION_JSON, undefined)).toBe(
        false
      );
    });
  });

  describe('isJsonType', () => {
    it('should return true for application/json', () => {
      expect(isJsonType(MediaType.APPLICATION_JSON)).toBe(true);
    });

    it('should return true for application/json with parameters', () => {
      expect(isJsonType('application/json; charset=utf-8')).toBe(true);
    });

    it('should return false for non-JSON types', () => {
      expect(isJsonType(MediaType.TEXT_PLAIN)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isJsonType(undefined)).toBe(false);
    });
  });

  describe('isFormUrlEncodedType', () => {
    it('should return true for application/x-www-form-urlencoded', () => {
      expect(isFormUrlEncodedType(MediaType.APPLICATION_FORM_URLENCODED)).toBe(
        true
      );
    });

    it('should return true for application/x-www-form-urlencoded with parameters', () => {
      expect(
        isFormUrlEncodedType('application/x-www-form-urlencoded; charset=utf-8')
      ).toBe(true);
    });

    it('should return false for non-form-urlencoded types', () => {
      expect(isFormUrlEncodedType(MediaType.APPLICATION_JSON)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isFormUrlEncodedType(undefined)).toBe(false);
    });
  });
});

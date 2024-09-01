import { describe, it, expect } from 'vitest';
import {
  APPLICATION_JSON_MEDIA_TYPE,
  APPLICATION_JSON_UTF8_CONTENT_TYPE,
  APPLICATION_FORM_URLENCODED_MEDIA_TYPE,
  TEXT_HTML_MEDIA_TYPE,
  TEXT_PLAIN_MEDIA_TYPE,
  APPLICATION_JWT_MEDIA_TYPE,
  isMediaTypeEqual,
  isJsonType,
  isFormUrlEncodedType,
} from './contentType';

describe('Media Types', () => {
  it('should define correct media types', () => {
    expect(APPLICATION_JSON_MEDIA_TYPE).toBe('application/json');
    expect(APPLICATION_JSON_UTF8_CONTENT_TYPE).toBe(
      'application/json;charset=utf-8'
    );
    expect(APPLICATION_FORM_URLENCODED_MEDIA_TYPE).toBe(
      'application/x-www-form-urlencoded'
    );
    expect(TEXT_HTML_MEDIA_TYPE).toBe('text/html');
    expect(TEXT_PLAIN_MEDIA_TYPE).toBe('text/plain');
    expect(APPLICATION_JWT_MEDIA_TYPE).toBe('application/jwt');
  });

  describe('isMediaTypeEqual', () => {
    it('should return true for exact matches', () => {
      expect(isMediaTypeEqual('application/json', 'application/json')).toBe(
        true
      );
    });

    it('should return true for matches with additional parameters', () => {
      expect(
        isMediaTypeEqual('application/json', 'application/json;charset=utf-8')
      ).toBe(true);
    });

    it('should return false for different media types', () => {
      expect(isMediaTypeEqual('application/json', 'application/xml')).toBe(
        false
      );
    });

    it('should return false for undefined target type', () => {
      expect(isMediaTypeEqual('application/json', undefined)).toBe(false);
    });
  });

  describe('isJsonType', () => {
    it('should return true for JSON media type', () => {
      expect(isJsonType('application/json')).toBe(true);
    });

    it('should return true for JSON media type with charset', () => {
      expect(isJsonType('application/json;charset=utf-8')).toBe(true);
    });

    it('should return false for non-JSON media type', () => {
      expect(isJsonType('application/xml')).toBe(false);
    });

    it('should return false for undefined type', () => {
      expect(isJsonType(undefined)).toBe(false);
    });
  });

  describe('isFormUrlEncodedType', () => {
    it('should return true for form-urlencoded media type', () => {
      expect(isFormUrlEncodedType('application/x-www-form-urlencoded')).toBe(
        true
      );
    });

    it('should return true for form-urlencoded media type with additional parameters', () => {
      expect(
        isFormUrlEncodedType('application/x-www-form-urlencoded;charset=utf-8')
      ).toBe(true);
    });

    it('should return false for non-form-urlencoded media type', () => {
      expect(isFormUrlEncodedType('application/json')).toBe(false);
    });

    it('should return false for undefined type', () => {
      expect(isFormUrlEncodedType(undefined)).toBe(false);
    });
  });
});

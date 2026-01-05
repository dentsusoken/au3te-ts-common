import { describe, it, expect } from 'vitest';
import { MediaType, isMediaTypeEqual, isJsonType, isFormUrlEncodedType } from '../mediaType';

describe('MediaType', () => {
  it('should define correct media type constants', () => {
    expect(MediaType.APPLICATION_JSON).toBe('application/json');
    expect(MediaType.APPLICATION_JSON_UTF8).toBe('application/json;charset=utf-8');
    expect(MediaType.APPLICATION_FORM_URLENCODED).toBe('application/x-www-form-urlencoded');
    expect(MediaType.APPLICATION_INTROSPECTION_JWT).toBe('application/token-introspection+jwt');
    expect(MediaType.TEXT_HTML).toBe('text/html');
    expect(MediaType.TEXT_HTML_UTF8).toBe('text/html;charset=utf-8');
    expect(MediaType.TEXT_PLAIN).toBe('text/plain');
    expect(MediaType.TEXT_PLAIN_UTF8).toBe('text/plain;charset=utf-8');
    expect(MediaType.APPLICATION_XML).toBe('application/xml');
    expect(MediaType.APPLICATION_OCTET_STREAM).toBe('application/octet-stream');
    expect(MediaType.APPLICATION_PDF).toBe('application/pdf');
    expect(MediaType.IMAGE_JPEG).toBe('image/jpeg');
    expect(MediaType.IMAGE_PNG).toBe('image/png');
    expect(MediaType.IMAGE_SVG).toBe('image/svg+xml');
    expect(MediaType.TEXT_CSS).toBe('text/css');
    expect(MediaType.APPLICATION_JAVASCRIPT).toBe('application/javascript');
    expect(MediaType.APPLICATION_JWT).toBe('application/jwt');
  });
});

describe('isMediaTypeEqual', () => {
  it('should return true for exact matches', () => {
    expect(isMediaTypeEqual('application/json', 'application/json')).toBe(true);
  });

  it('should return true when target has parameters', () => {
    expect(isMediaTypeEqual('application/json', 'application/json;charset=utf-8')).toBe(true);
    expect(isMediaTypeEqual('text/html', 'text/html; charset=UTF-8')).toBe(true);
  });

  it('should return false for mismatches', () => {
    expect(isMediaTypeEqual('application/json', 'text/html')).toBe(false);
  });

  it('should return false when target is undefined or empty', () => {
    expect(isMediaTypeEqual('application/json', undefined)).toBe(false);
    expect(isMediaTypeEqual('application/json', '')).toBe(false);
  });
});

describe('isJsonType', () => {
  it('should identify JSON types', () => {
    expect(isJsonType('application/json')).toBe(true);
    expect(isJsonType('application/json;charset=utf-8')).toBe(true);
  });

  it('should reject non-JSON types', () => {
    expect(isJsonType('text/html')).toBe(false);
  });
});

describe('isFormUrlEncodedType', () => {
  it('should identify form-urlencoded types', () => {
    expect(isFormUrlEncodedType('application/x-www-form-urlencoded')).toBe(true);
    expect(isFormUrlEncodedType('application/x-www-form-urlencoded;charset=utf-8')).toBe(true);
  });

  it('should reject non-form-urlencoded types', () => {
    expect(isFormUrlEncodedType('application/json')).toBe(false);
  });
});

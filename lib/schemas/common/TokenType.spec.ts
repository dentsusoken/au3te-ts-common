/*
 * Copyright (C) 2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, expect, it } from 'vitest';
import {
  tokenTypeSchema,
  nullableButOptionalTokenTypeSchema,
  type TokenType,
} from './TokenType';
import { ZodError } from 'zod';

describe('TokenType', () => {
  describe('tokenTypeSchema', () => {
    // Test valid token types
    it('should accept valid token types', () => {
      const validTypes: TokenType[] = [
        'urn:ietf:params:oauth:token-type:jwt',
        'urn:ietf:params:oauth:token-type:access_token',
        'urn:ietf:params:oauth:token-type:refresh_token',
        'urn:ietf:params:oauth:token-type:id_token',
        'urn:ietf:params:oauth:token-type:saml1',
        'urn:ietf:params:oauth:token-type:saml2',
      ];

      validTypes.forEach((type) => {
        expect(tokenTypeSchema.parse(type)).toBe(type);
      });
    });

    // Test case insensitivity
    it('should handle uppercase input by converting to lowercase', () => {
      expect(
        tokenTypeSchema.parse('URN:IETF:PARAMS:OAUTH:TOKEN-TYPE:JWT')
      ).toBe('urn:ietf:params:oauth:token-type:jwt');
      expect(
        tokenTypeSchema.parse('URN:IETF:PARAMS:OAUTH:TOKEN-TYPE:ACCESS_TOKEN')
      ).toBe('urn:ietf:params:oauth:token-type:access_token');
    });

    // Test invalid inputs
    it('should reject invalid token types', () => {
      const invalidTypes = [
        'invalid_type',
        'jwt',
        'access_token',
        'urn:invalid:token-type',
        '',
        ' ',
        123,
        null,
        undefined,
        {},
        [],
      ];

      invalidTypes.forEach((type) => {
        expect(() => tokenTypeSchema.parse(type)).toThrow(ZodError);
      });
    });
  });

  describe('nullableButOptionalTokenTypeSchema', () => {
    // Test valid cases including null and undefined
    it('should handle valid token types, null, and undefined', () => {
      // Valid token type
      expect(
        nullableButOptionalTokenTypeSchema.parse(
          'urn:ietf:params:oauth:token-type:jwt'
        )
      ).toBe('urn:ietf:params:oauth:token-type:jwt');

      // Null should be converted to undefined
      expect(nullableButOptionalTokenTypeSchema.parse(null)).toBeUndefined();

      // Undefined should remain undefined
      expect(
        nullableButOptionalTokenTypeSchema.parse(undefined)
      ).toBeUndefined();
    });

    // Test case insensitivity
    it('should handle uppercase input by converting to lowercase', () => {
      expect(
        nullableButOptionalTokenTypeSchema.parse(
          'URN:IETF:PARAMS:OAUTH:TOKEN-TYPE:SAML2'
        )
      ).toBe('urn:ietf:params:oauth:token-type:saml2');
    });

    // Test invalid inputs
    it('should reject invalid token types', () => {
      const invalidTypes = [
        'invalid_token',
        'jwt',
        'saml1',
        123,
        {},
        [],
        '',
        ' ',
        'urn:invalid:token-type',
      ];

      invalidTypes.forEach((type) => {
        expect(() => nullableButOptionalTokenTypeSchema.parse(type)).toThrow(
          ZodError
        );
      });
    });

    // Test all valid URN token types
    it('should accept all valid URN token types', () => {
      const urnTypes = [
        'urn:ietf:params:oauth:token-type:jwt',
        'urn:ietf:params:oauth:token-type:access_token',
        'urn:ietf:params:oauth:token-type:refresh_token',
        'urn:ietf:params:oauth:token-type:id_token',
        'urn:ietf:params:oauth:token-type:saml1',
        'urn:ietf:params:oauth:token-type:saml2',
      ];

      urnTypes.forEach((type) => {
        expect(nullableButOptionalTokenTypeSchema.parse(type)).toBe(type);
      });
    });
  });
});

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
import { tokenTypeSchema, type TokenType, tokenTypes } from '../TokenType';

describe('TokenType', () => {
  describe('tokenTypeSchema', () => {
    it('should accept valid token types', () => {
      tokenTypes.forEach((type) => {
        const result = tokenTypeSchema.parse(type);
        expect(result).toBe(type);
      });
    });

    it('should accept valid token types in uppercase and transform to lowercase', () => {
      const uppercaseTypes = tokenTypes.map((type) => type.toUpperCase());
      uppercaseTypes.forEach((type, index) => {
        const result = tokenTypeSchema.parse(type);
        expect(result).toBe(tokenTypes[index]);
      });
    });

    it('should accept valid token types in mixed case and transform to lowercase', () => {
      const mixedCaseTypes = [
        'Urn:Ietf:Params:Oauth:Token-Type:Jwt',
        'URN:IETF:PARAMS:OAUTH:TOKEN-TYPE:ACCESS_TOKEN',
        'urn:ietf:params:oauth:token-type:Refresh_Token',
        'urn:ietf:params:oauth:token-type:Id_Token',
        'urn:ietf:params:oauth:token-type:Saml1',
        'urn:ietf:params:oauth:token-type:SAML2',
      ];
      const expectedResults = [
        'urn:ietf:params:oauth:token-type:jwt',
        'urn:ietf:params:oauth:token-type:access_token',
        'urn:ietf:params:oauth:token-type:refresh_token',
        'urn:ietf:params:oauth:token-type:id_token',
        'urn:ietf:params:oauth:token-type:saml1',
        'urn:ietf:params:oauth:token-type:saml2',
      ];
      mixedCaseTypes.forEach((type, index) => {
        const result = tokenTypeSchema.parse(type);
        expect(result).toBe(expectedResults[index]);
      });
    });

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
        const result = tokenTypeSchema.safeParse(type);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-string values', () => {
      const nonStringValues = [123, true, false, {}, [], null, undefined];
      nonStringValues.forEach((value) => {
        const result = tokenTypeSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof tokenTypeSchema._type;
      type ExpectedType = TokenType;
      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should ensure all token types are covered', () => {
      expect(tokenTypes).toContain('urn:ietf:params:oauth:token-type:jwt');
      expect(tokenTypes).toContain(
        'urn:ietf:params:oauth:token-type:access_token'
      );
      expect(tokenTypes).toContain(
        'urn:ietf:params:oauth:token-type:refresh_token'
      );
      expect(tokenTypes).toContain('urn:ietf:params:oauth:token-type:id_token');
      expect(tokenTypes).toContain('urn:ietf:params:oauth:token-type:saml1');
      expect(tokenTypes).toContain('urn:ietf:params:oauth:token-type:saml2');
      expect(tokenTypes).toHaveLength(6);
    });
  });

  describe('TokenType type', () => {
    it('should allow valid token type values', () => {
      const validTypes: TokenType[] = [
        'urn:ietf:params:oauth:token-type:jwt',
        'urn:ietf:params:oauth:token-type:access_token',
        'urn:ietf:params:oauth:token-type:refresh_token',
        'urn:ietf:params:oauth:token-type:id_token',
        'urn:ietf:params:oauth:token-type:saml1',
        'urn:ietf:params:oauth:token-type:saml2',
      ];
      validTypes.forEach((type) => {
        expect(tokenTypes).toContain(type);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (tokenType: TokenType): string => {
        return tokenType;
      };
      expect(testFunction('urn:ietf:params:oauth:token-type:jwt')).toBe(
        'urn:ietf:params:oauth:token-type:jwt'
      );
      expect(
        testFunction('urn:ietf:params:oauth:token-type:access_token')
      ).toBe('urn:ietf:params:oauth:token-type:access_token');
      expect(testFunction('urn:ietf:params:oauth:token-type:saml2')).toBe(
        'urn:ietf:params:oauth:token-type:saml2'
      );
    });
  });
});

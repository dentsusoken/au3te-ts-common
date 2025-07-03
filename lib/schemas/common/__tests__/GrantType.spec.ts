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
import { grantTypeSchema, type GrantType, grantTypes } from '../GrantType';

describe('GrantType', () => {
  describe('grantTypeSchema', () => {
    it('should accept valid grant types', () => {
      grantTypes.forEach((type) => {
        const result = grantTypeSchema.parse(type);
        expect(result).toBe(type);
      });
    });

    it('should accept valid grant types in uppercase and transform to lowercase', () => {
      const uppercaseTypes = grantTypes.map((type) => type.toUpperCase());
      uppercaseTypes.forEach((type, index) => {
        const result = grantTypeSchema.parse(type);
        expect(result).toBe(grantTypes[index]);
      });
    });

    it('should accept valid grant types in mixed case and transform to lowercase', () => {
      const mixedCaseTypes = [
        'Authorization_Code',
        'CLIENT_CREDENTIALS',
        'Refresh_Token',
        'Urn:Openid:Params:Grant-Type:Ciba',
      ];
      const expectedResults = [
        'authorization_code',
        'client_credentials',
        'refresh_token',
        'urn:openid:params:grant-type:ciba',
      ];

      mixedCaseTypes.forEach((type, index) => {
        const result = grantTypeSchema.parse(type);
        expect(result).toBe(expectedResults[index]);
      });
    });

    it('should reject invalid grant types', () => {
      const invalidTypes = [
        'invalid_type',
        'oauth',
        'grant_type',
        'token',
        'code',
        '',
        ' ',
        123,
        true,
        false,
        {},
        [],
        null,
        undefined,
      ];

      invalidTypes.forEach((type) => {
        const result = grantTypeSchema.safeParse(type);
        expect(result.success).toBe(false);
      });
    });

    it('should reject non-string values', () => {
      const nonStringValues = [123, true, false, {}, [], null, undefined];
      nonStringValues.forEach((value) => {
        const result = grantTypeSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });

    it('should infer the correct output type', () => {
      type SchemaType = typeof grantTypeSchema._type;
      type ExpectedType = GrantType;

      const assertTypeCompatibility = (value: SchemaType): ExpectedType =>
        value;
      expect(assertTypeCompatibility).toBeDefined();
    });

    it('should ensure all grant types are covered', () => {
      // This test ensures that the schema covers all defined grant types
      expect(grantTypes).toContain('authorization_code');
      expect(grantTypes).toContain('implicit');
      expect(grantTypes).toContain('password');
      expect(grantTypes).toContain('client_credentials');
      expect(grantTypes).toContain('refresh_token');
      expect(grantTypes).toContain('urn:openid:params:grant-type:ciba');
      expect(grantTypes).toContain(
        'urn:ietf:params:oauth:grant-type:device_code'
      );
      expect(grantTypes).toContain(
        'urn:ietf:params:oauth:grant-type:token-exchange'
      );
      expect(grantTypes).toContain(
        'urn:ietf:params:oauth:grant-type:jwt-bearer'
      );
      expect(grantTypes).toContain(
        'urn:ietf:params:oauth:grant-type:pre-authorized_code'
      );
      expect(grantTypes).toHaveLength(10);
    });
  });

  describe('GrantType type', () => {
    it('should allow valid grant type values', () => {
      const validTypes: GrantType[] = [
        'authorization_code',
        'implicit',
        'password',
        'client_credentials',
        'refresh_token',
        'urn:openid:params:grant-type:ciba',
        'urn:ietf:params:oauth:grant-type:device_code',
        'urn:ietf:params:oauth:grant-type:token-exchange',
        'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'urn:ietf:params:oauth:grant-type:pre-authorized_code',
      ];
      validTypes.forEach((type) => {
        expect(grantTypes).toContain(type);
      });
    });

    it('should have correct type inference', () => {
      const testFunction = (grantType: GrantType): string => {
        return grantType;
      };

      expect(testFunction('authorization_code')).toBe('authorization_code');
      expect(testFunction('password')).toBe('password');
      expect(testFunction('urn:openid:params:grant-type:ciba')).toBe(
        'urn:openid:params:grant-type:ciba'
      );
    });
  });
});

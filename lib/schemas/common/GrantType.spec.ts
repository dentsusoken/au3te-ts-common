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
  grantTypeSchema,
  nullableButOptionalGrantTypeSchema,
  type GrantType,
} from './GrantType';
import { ZodError } from 'zod';

describe('GrantType', () => {
  describe('grantTypeSchema', () => {
    // Test valid grant types
    it('should accept valid grant types', () => {
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
        expect(grantTypeSchema.parse(type)).toBe(type);
      });
    });

    // Test case insensitivity
    it('should handle uppercase input by converting to lowercase', () => {
      expect(grantTypeSchema.parse('PASSWORD')).toBe('password');
      expect(grantTypeSchema.parse('AUTHORIZATION_CODE')).toBe(
        'authorization_code'
      );
    });

    // Test invalid inputs
    it('should reject invalid grant types', () => {
      const invalidTypes = [
        'invalid_type',
        'oauth',
        '',
        ' ',
        123,
        null,
        undefined,
        {},
        [],
      ];

      invalidTypes.forEach((type) => {
        expect(() => grantTypeSchema.parse(type)).toThrow(ZodError);
      });
    });
  });

  describe('nullableButOptionalGrantTypeSchema', () => {
    // Test valid cases including null and undefined
    it('should handle valid grant types, null, and undefined', () => {
      // Valid grant type
      expect(nullableButOptionalGrantTypeSchema.parse('password')).toBe(
        'password'
      );

      // Null should be converted to undefined
      expect(nullableButOptionalGrantTypeSchema.parse(null)).toBeUndefined();

      // Undefined should remain undefined
      expect(
        nullableButOptionalGrantTypeSchema.parse(undefined)
      ).toBeUndefined();
    });

    // Test case insensitivity
    it('should handle uppercase input by converting to lowercase', () => {
      expect(nullableButOptionalGrantTypeSchema.parse('REFRESH_TOKEN')).toBe(
        'refresh_token'
      );
    });

    // Test invalid inputs
    it('should reject invalid grant types', () => {
      const invalidTypes = [
        'invalid_grant',
        123,
        {},
        [],
        'oauth',
        '',
        ' ',
        'urn:invalid:grant-type',
      ];

      invalidTypes.forEach((type) => {
        expect(() => nullableButOptionalGrantTypeSchema.parse(type)).toThrow(
          ZodError
        );
      });
    });

    // Test URN format grant types
    it('should accept valid URN format grant types', () => {
      const urnTypes = [
        'urn:openid:params:grant-type:ciba',
        'urn:ietf:params:oauth:grant-type:device_code',
        'urn:ietf:params:oauth:grant-type:token-exchange',
        'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'urn:ietf:params:oauth:grant-type:pre-authorized_code',
      ];

      urnTypes.forEach((type) => {
        expect(nullableButOptionalGrantTypeSchema.parse(type)).toBe(type);
      });
    });
  });
});

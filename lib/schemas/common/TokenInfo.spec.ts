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
  tokenInfoSchema,
  nullableButOptionalTokenInfoSchema,
  type TokenInfo,
} from './TokenInfo';

describe('TokenInfo', () => {
  describe('tokenInfoSchema', () => {
    it('should accept valid token info', () => {
      const validInfo: TokenInfo = {
        clientId: 123,
        subject: 'user123',
        scopes: [{ name: 'read' }, { name: 'write' }],
        expiresAt: 1234567890,
        properties: [{ key: 'prop1', value: 'value1' }],
        clientIdAlias: 'alias123',
        clientIdAliasUsed: true,
        clientEntityId: 'https://client.example.com',
        clientEntityIdUsed: false,
        resources: ['https://api.example.com'],
        authorizationDetails: {
          elements: [
            {
              type: 'payment',
              locations: ['https://payment.example.com'],
              actions: ['execute'],
              datatypes: ['transaction'],
            },
          ],
        },
      };

      const result = tokenInfoSchema.safeParse(validInfo);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validInfo);
      }
    });

    it('should accept minimal token info with no optional fields', () => {
      const minimalInfo = {};
      const result = tokenInfoSchema.safeParse(minimalInfo);
      expect(result.success).toBe(true);
    });

    it('should reject invalid URLs', () => {
      const invalidUrls = {
        clientEntityId: 'not-a-url',
        resources: ['not-a-url', 'https://valid.com'],
      };

      const result = tokenInfoSchema.safeParse(invalidUrls);
      expect(result.success).toBe(false);
    });

    it('should reject invalid types', () => {
      const invalidTypes = {
        clientId: 'not-a-number',
        expiresAt: '1234567890',
        clientIdAliasUsed: 'not-a-boolean',
        scopes: 'not-an-array',
        properties: 'not-an-array',
        resources: 'not-an-array',
      };

      const result = tokenInfoSchema.safeParse(invalidTypes);
      expect(result.success).toBe(false);
    });
  });

  describe('nullableButOptionalTokenInfoSchema', () => {
    it('should handle valid token info, null, and undefined', () => {
      const validInfo: TokenInfo = {
        clientId: 123,
        subject: 'user123',
      };
      expect(nullableButOptionalTokenInfoSchema.parse(validInfo)).toEqual(
        validInfo
      );

      expect(nullableButOptionalTokenInfoSchema.parse(null)).toBeUndefined();

      expect(
        nullableButOptionalTokenInfoSchema.parse(undefined)
      ).toBeUndefined();
    });

    it('should accept partial token info', () => {
      const partialInfo: TokenInfo = {
        clientId: 123,
        resources: ['https://api.example.com'],
      };

      const result = nullableButOptionalTokenInfoSchema.safeParse(partialInfo);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(partialInfo);
      }
    });

    it('should reject invalid inputs', () => {
      const invalidInputs = [
        123,
        'string',
        [],
        { clientId: 'invalid' },
        { expiresAt: 'invalid' },
        { resources: [123] },
      ];

      invalidInputs.forEach((input) => {
        const result = nullableButOptionalTokenInfoSchema.safeParse(input);
        expect(result.success).toBe(false);
      });
    });

    it('should accept token info with all fields', () => {
      const fullInfo: TokenInfo = {
        clientId: 123,
        subject: 'user123',
        scopes: [{ name: 'read' }, { name: 'write' }],
        expiresAt: 1234567890,
        properties: [{ key: 'prop1', value: 'value1' }],
        clientIdAlias: 'alias123',
        clientIdAliasUsed: true,
        clientEntityId: 'https://client.example.com',
        clientEntityIdUsed: false,
        resources: ['https://api.example.com'],
        authorizationDetails: {
          elements: [
            {
              type: 'payment',
              locations: ['https://payment.example.com'],
              actions: ['execute'],
              datatypes: ['transaction'],
            },
          ],
        },
      };

      const result = nullableButOptionalTokenInfoSchema.safeParse(fullInfo);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(fullInfo);
      }
    });
  });
});

/*
 * Copyright (C) 2014-2024 Authlete, Inc.
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
  introspectionResponseSchema,
  type IntrospectionResponse,
} from '../IntrospectionResponse';

describe('IntrospectionResponse', () => {
  describe('valid responses', () => {
    it('should accept response with only required fields', () => {
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: 123456,
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should accept response with all fields', () => {
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: 123456,
        subject: 'user123',
        scopes: ['read', 'write'],
        scopeDetails: [
          {
            name: 'read',
            description: 'Read access',
          },
        ],
        existent: true,
        usable: true,
        sufficient: true,
        refreshable: true,
        responseContent: 'Bearer token="..."',
        expiresAt: 1735689600000,
        properties: [{ key: 'purpose', value: 'testing' }],
        clientIdAlias: 'test_client',
        clientIdAliasUsed: true,
        clientEntityId: 'https://client.example.com',
        clientEntityIdUsed: true,
        certificateThumbprint: 'abc123',
        resources: ['https://api.example.com/v1'],
        accessTokenResources: ['https://api.example.com/v1'],
        authorizationDetails: {
          elements: [
            {
              type: 'account_information',
              actions: ['read'],
              locations: ['https://example.com/accounts'],
            },
          ],
        },
        grantId: 'grant123',
        grant: {
          scopes: [
            {
              scope: 'read',
              resource: ['https://api.example.com/v1'],
            },
          ],
        },
        consentedClaims: ['email', 'name'],
        serviceAttributes: [{ key: 'region', value: 'us-east' }],
        clientAttributes: [{ key: 'tier', value: 'premium' }],
        forExternalAttachment: false,
        acr: 'urn:mace:incommon:iap:silver',
        authTime: 1735689500000,
        grantType: 'AUTHORIZATION_CODE',
        forCredentialIssuance: false,
        cnonce: 'nonce123',
        cnonceExpiresAt: 1735689700000,
        issuableCredentials: JSON.stringify({
          format: 'jwt_vc',
          types: ['VerifiableCredential'],
        }),
        dpopNonce: 'dpop_nonce123',
        responseSigningRequired: true,
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should accept all valid action values', () => {
      const actions = [
        'INTERNAL_SERVER_ERROR',
        'BAD_REQUEST',
        'UNAUTHORIZED',
        'FORBIDDEN',
        'OK',
      ] as const;
      actions.forEach((action) => {
        const response: IntrospectionResponse = {
          resultCode: 'A000000',
          resultMessage: 'success',
          action,
          clientId: 123456,
        };
        const result = introspectionResponseSchema.parse(response);
        expect(result).toEqual(response);
      });
    });

    it('should accept nullish values for optional fields', () => {
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: 123456,
        subject: null,
        scopes: null,
        expiresAt: null,
        authTime: null,
        cnonceExpiresAt: null,
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result.subject).toBeNull();
      expect(result.scopes).toBeNull();
      expect(result.expiresAt).toBeNull();
      expect(result.authTime).toBeNull();
      expect(result.cnonceExpiresAt).toBeNull();
    });

    it('should accept empty arrays and strings', () => {
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: '',
        action: 'OK',
        clientId: 123456,
        scopes: [],
        resources: [],
        accessTokenResources: [],
        consentedClaims: [],
        serviceAttributes: [],
        clientAttributes: [],
        authorizationDetails: {
          elements: [],
        },
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result.scopes).toEqual([]);
      expect(result.resources).toEqual([]);
      expect(result.accessTokenResources).toEqual([]);
      expect(result.consentedClaims).toEqual([]);
      expect(result.serviceAttributes).toEqual([]);
      expect(result.clientAttributes).toEqual([]);
      expect(result.authorizationDetails?.elements).toEqual([]);
    });

    it('should accept zero and negative numeric values', () => {
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: 0,
        expiresAt: 0,
        authTime: 0,
        cnonceExpiresAt: 0,
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result.clientId).toBe(0);
      expect(result.expiresAt).toBe(0);
      expect(result.authTime).toBe(0);
      expect(result.cnonceExpiresAt).toBe(0);
    });

    it('should accept large numeric values', () => {
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: Number.MAX_SAFE_INTEGER,
        expiresAt: Number.MAX_SAFE_INTEGER,
        authTime: Number.MAX_SAFE_INTEGER,
        cnonceExpiresAt: Number.MAX_SAFE_INTEGER,
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result.clientId).toBe(Number.MAX_SAFE_INTEGER);
      expect(result.expiresAt).toBe(Number.MAX_SAFE_INTEGER);
      expect(result.authTime).toBe(Number.MAX_SAFE_INTEGER);
      expect(result.cnonceExpiresAt).toBe(Number.MAX_SAFE_INTEGER);
    });
  });

  describe('invalid responses', () => {
    it('should reject invalid action value', () => {
      const response = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'INVALID_ACTION',
        clientId: 123456,
      };
      const result = introspectionResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });

    it('should reject response without required fields', () => {
      const response = {
        resultMessage: 'success',
        action: 'OK',
      };
      const result = introspectionResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });

    it('should reject invalid types', () => {
      const response = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: '123456', // Should be number
        expiresAt: '1735689600000', // Should be number
        scopes: 'read write', // Should be array
      };
      const result = introspectionResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });

    it('should reject missing all required fields', () => {
      const result = introspectionResponseSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject null object', () => {
      const result = introspectionResponseSchema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it('should reject undefined object', () => {
      const result = introspectionResponseSchema.safeParse(undefined);
      expect(result.success).toBe(false);
    });

    it('should reject non-object values', () => {
      const result1 = introspectionResponseSchema.safeParse('not-an-object');
      expect(result1.success).toBe(false);
      const result2 = introspectionResponseSchema.safeParse(123);
      expect(result2.success).toBe(false);
      const result3 = introspectionResponseSchema.safeParse(true);
      expect(result3.success).toBe(false);
      const result4 = introspectionResponseSchema.safeParse([]);
      expect(result4.success).toBe(false);
    });

    it('should reject invalid URLs in resources', () => {
      const response = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: 123456,
        resources: ['not-a-url', 'also-not-a-url'],
        accessTokenResources: ['invalid-url'],
      };
      const result = introspectionResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });

    it('should reject invalid property structure', () => {
      const response = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: 123456,
        properties: [{ key: 123, value: 'value' }], // key should be string
      };
      const result = introspectionResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should accept very long string values', () => {
      const longString = 'a'.repeat(1000);
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: longString,
        action: 'OK',
        clientId: 123456,
        subject: longString,
        clientIdAlias: longString,
        certificateThumbprint: longString,
        grantId: longString,
        cnonce: longString,
        dpopNonce: longString,
        acr: longString,
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result.resultMessage).toBe(longString);
      expect(result.subject).toBe(longString);
      expect(result.clientIdAlias).toBe(longString);
      expect(result.certificateThumbprint).toBe(longString);
      expect(result.grantId).toBe(longString);
      expect(result.cnonce).toBe(longString);
      expect(result.dpopNonce).toBe(longString);
      expect(result.acr).toBe(longString);
    });

    it('should accept very long arrays', () => {
      const longArray = Array.from({ length: 1000 }, (_, i) => `item${i}`);
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: 123456,
        scopes: longArray,
        resources: longArray.map((_, i) => `https://api${i}.example.com`),
        accessTokenResources: longArray.map(
          (_, i) => `https://api${i}.example.com`
        ),
        consentedClaims: longArray,
        serviceAttributes: longArray.map((_, i) => ({
          key: `key${i}`,
          value: `value${i}`,
        })),
        clientAttributes: longArray.map((_, i) => ({
          key: `key${i}`,
          value: `value${i}`,
        })),
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result.scopes).toHaveLength(1000);
      expect(result.resources).toHaveLength(1000);
      expect(result.accessTokenResources).toHaveLength(1000);
      expect(result.consentedClaims).toHaveLength(1000);
      expect(result.serviceAttributes).toHaveLength(1000);
      expect(result.clientAttributes).toHaveLength(1000);
    });

    it('should accept special characters in strings', () => {
      const response: IntrospectionResponse = {
        resultCode: 'A000000',
        resultMessage: 'success',
        action: 'OK',
        clientId: 123456,
        subject: 'user-with-dashes_123',
        clientIdAlias: 'client.with.dots',
        certificateThumbprint: 'thumb-print_123',
        grantId: 'grant.id-123',
        cnonce: 'nonce-123_456',
        dpopNonce: 'dpop-nonce_123',
        acr: 'urn:mace:incommon:iap:silver',
      };
      const result = introspectionResponseSchema.parse(response);
      expect(result.subject).toBe('user-with-dashes_123');
      expect(result.clientIdAlias).toBe('client.with.dots');
      expect(result.certificateThumbprint).toBe('thumb-print_123');
      expect(result.grantId).toBe('grant.id-123');
      expect(result.cnonce).toBe('nonce-123_456');
      expect(result.dpopNonce).toBe('dpop-nonce_123');
      expect(result.acr).toBe('urn:mace:incommon:iap:silver');
    });
  });
});

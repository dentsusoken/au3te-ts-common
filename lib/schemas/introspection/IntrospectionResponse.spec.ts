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
} from './IntrospectionResponse';

describe('introspectionResponseSchema', () => {
  // Test for minimal valid response
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

  // Test for complete valid response
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

  // Test for different action values
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

  // Test for invalid action value
  it('should reject invalid action value', () => {
    const response = {
      resultCode: 'A000000',
      resultMessage: 'success',
      action: 'INVALID_ACTION',
      clientId: 123456,
    };

    expect(() => introspectionResponseSchema.parse(response)).toThrow();
  });

  // Test for missing required fields
  it('should reject response without required fields', () => {
    const response = {
      resultMessage: 'success',
      action: 'OK',
    };

    expect(() => introspectionResponseSchema.parse(response)).toThrow();
  });

  // Test for nullish fields
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

  // Test for invalid types
  it('should reject invalid types', () => {
    const response = {
      resultCode: 'A000000',
      resultMessage: 'success',
      action: 'OK',
      clientId: '123456', // Should be number
      expiresAt: '1735689600000', // Should be number
      scopes: 'read write', // Should be array
    };

    expect(() => introspectionResponseSchema.parse(response)).toThrow();
  });
});

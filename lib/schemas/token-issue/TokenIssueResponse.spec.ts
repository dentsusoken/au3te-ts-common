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
  tokenIssueResponseSchema,
  type TokenIssueResponse,
} from './TokenIssueResponse';

describe('TokenIssueResponse', () => {
  it('should accept valid token issue response with required fields', () => {
    const validResponse: TokenIssueResponse = {
      action: 'OK',
      responseContent: '{"access_token": "token123"}',
    };

    const result = tokenIssueResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validResponse);
    }
  });

  it('should accept token issue response with all fields', () => {
    const fullResponse: TokenIssueResponse = {
      action: 'OK',
      responseContent: '{"access_token": "token123"}',
      accessToken: 'access123',
      accessTokenExpiresAt: 1234567890,
      accessTokenDuration: 3600,
      refreshToken: 'refresh123',
      refreshTokenExpiresAt: 1234567890,
      refreshTokenDuration: 86400,
      clientId: 123,
      clientIdAlias: 'alias123',
      clientIdAliasUsed: true,
      clientEntityId: 'https://client.example.com',
      clientEntityIdUsed: false,
      subject: 'sub123',
      scopes: ['read', 'write'],
      properties: [{ key: 'prop1', value: 'value1' }],
      jwtAccessToken: 'jwt123',
      accessTokenResources: ['https://api.example.com'],
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
      serviceAttributes: [{ key: 'service1', value: 'value1' }],
      clientAttributes: [{ key: 'client1', value: 'value1' }],
      refreshTokenScopes: ['refresh_scope1', 'refresh_scope2'],
    };

    const result = tokenIssueResponseSchema.safeParse(fullResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(fullResponse);
    }
  });

  it('should reject response without required action', () => {
    const invalidResponse = {
      responseContent: '{"access_token": "token123"}',
    };

    const result = tokenIssueResponseSchema.safeParse(invalidResponse);
    expect(result.success).toBe(false);
  });

  it('should handle null values as undefined for optional fields', () => {
    const responseWithNulls = {
      action: 'OK',
      responseContent: null,
      accessToken: null,
      clientId: null,
      scopes: null,
      properties: null,
      authorizationDetails: null,
      serviceAttributes: null,
      clientAttributes: null,
      refreshTokenScopes: null,
    };

    const result = tokenIssueResponseSchema.safeParse(responseWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.responseContent).toBeUndefined();
      expect(result.data.accessToken).toBeUndefined();
      expect(result.data.clientId).toBeUndefined();
      expect(result.data.scopes).toBeUndefined();
      expect(result.data.properties).toBeUndefined();
      expect(result.data.authorizationDetails).toBeUndefined();
      expect(result.data.serviceAttributes).toBeUndefined();
      expect(result.data.clientAttributes).toBeUndefined();
      expect(result.data.refreshTokenScopes).toBeUndefined();
    }
  });

  it('should reject invalid action values', () => {
    const invalidActions = [
      'INVALID_ACTION',
      'ok',
      '',
      123,
      null,
      undefined,
      {},
      [],
    ];

    invalidActions.forEach((action) => {
      const response = {
        action,
        responseContent: '{"access_token": "token123"}',
      };

      const result = tokenIssueResponseSchema.safeParse(response);
      expect(result.success).toBe(false);
    });
  });

  it('should validate URL fields', () => {
    const invalidUrls = {
      action: 'OK',
      clientEntityId: 'not-a-url',
      accessTokenResources: ['also-not-a-url'],
    };

    const result = tokenIssueResponseSchema.safeParse(invalidUrls);
    expect(result.success).toBe(false);
  });

  it('should validate numeric fields', () => {
    const invalidNumbers = {
      action: 'OK',
      clientId: 'not-a-number',
      accessTokenExpiresAt: '1234567890',
      accessTokenDuration: 'invalid',
      refreshTokenExpiresAt: {},
      refreshTokenDuration: [],
    };

    const result = tokenIssueResponseSchema.safeParse(invalidNumbers);
    expect(result.success).toBe(false);
  });

  it('should validate array fields', () => {
    const invalidArrays = {
      action: 'OK',
      scopes: 'not-an-array',
      properties: 'not-an-array',
      accessTokenResources: 'not-an-array',
      serviceAttributes: 'not-an-array',
      clientAttributes: 'not-an-array',
      refreshTokenScopes: 'not-an-array',
    };

    const result = tokenIssueResponseSchema.safeParse(invalidArrays);
    expect(result.success).toBe(false);
  });

  it('should validate property array structure', () => {
    const validProperties = {
      action: 'OK',
      properties: [
        { key: 'key1', value: 'value1' },
        { key: 'key2', value: 'value2', hidden: true },
      ],
    };

    const result = tokenIssueResponseSchema.safeParse(validProperties);
    expect(result.success).toBe(true);
  });

  it('should validate authorization details structure', () => {
    const validAuthzDetails = {
      action: 'OK',
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

    const result = tokenIssueResponseSchema.safeParse(validAuthzDetails);
    expect(result.success).toBe(true);
  });
});

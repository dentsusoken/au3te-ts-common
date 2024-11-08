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
  tokenIssueRequestSchema,
  type TokenIssueRequest,
} from './TokenIssueRequest';

describe('TokenIssueRequest', () => {
  it('should accept valid token issue request with required fields', () => {
    const validRequest: TokenIssueRequest = {
      ticket: 'ticket123',
      subject: 'user123',
    };

    const result = tokenIssueRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validRequest);
    }
  });

  it('should accept token issue request with all fields', () => {
    const fullRequest: TokenIssueRequest = {
      ticket: 'ticket123',
      subject: 'user123',
      properties: [{ key: 'prop1', value: 'value1' }],
      jwtAtClaims: '{"sub":"user123","name":"John Doe"}',
      accessToken: 'custom-access-token',
      accessTokenDuration: 3600,
      refreshTokenDuration: 86400,
    };

    const result = tokenIssueRequestSchema.safeParse(fullRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(fullRequest);
    }
  });

  it('should reject request without required fields', () => {
    const invalidRequest = {};
    const result = tokenIssueRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);

    const missingSubject = { ticket: 'ticket123' };
    const result2 = tokenIssueRequestSchema.safeParse(missingSubject);
    expect(result2.success).toBe(false);

    const missingTicket = { subject: 'user123' };
    const result3 = tokenIssueRequestSchema.safeParse(missingTicket);
    expect(result3.success).toBe(false);
  });

  it('should accept request with optional fields', () => {
    const requestWithOptionals: TokenIssueRequest = {
      ticket: 'ticket123',
      subject: 'user123',
      properties: [{ key: 'prop1', value: 'value1' }],
      accessTokenDuration: 3600,
    };

    const result = tokenIssueRequestSchema.safeParse(requestWithOptionals);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(requestWithOptionals);
    }
  });

  it('should reject invalid property types', () => {
    const invalidTypes = {
      ticket: 123, // should be string
      subject: true, // should be string
      accessTokenDuration: '3600', // should be number
      refreshTokenDuration: '86400', // should be number
      properties: 'not-an-array', // should be array
    };

    const result = tokenIssueRequestSchema.safeParse(invalidTypes);
    expect(result.success).toBe(false);
  });

  it('should handle null values for optional fields', () => {
    const requestWithNulls: TokenIssueRequest = {
      ticket: 'ticket123',
      subject: 'user123',
      properties: null,
      jwtAtClaims: null,
      accessToken: null,
      accessTokenDuration: null,
      refreshTokenDuration: null,
    };

    const result = tokenIssueRequestSchema.safeParse(requestWithNulls);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.properties).toBeNull();
      expect(result.data.jwtAtClaims).toBeNull();
      expect(result.data.accessToken).toBeNull();
      expect(result.data.accessTokenDuration).toBeNull();
      expect(result.data.refreshTokenDuration).toBeNull();
    }
  });

  it('should validate property array structure', () => {
    const invalidProperties = {
      ticket: 'ticket123',
      subject: 'user123',
      properties: [
        {}, // valid empty property
        { key: null, value: null }, // valid null values
        { invalid: 'property' }, // valid as all fields are optional
      ],
    };

    const result = tokenIssueRequestSchema.safeParse(invalidProperties);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.properties).toEqual([
        {},
        { key: undefined, value: undefined },
        {},
      ]);
    }
  });

  it('should handle empty arrays for array fields', () => {
    const requestWithEmptyArrays: TokenIssueRequest = {
      ticket: 'ticket123',
      subject: 'user123',
      properties: [],
    };

    const result = tokenIssueRequestSchema.safeParse(requestWithEmptyArrays);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.properties).toEqual([]);
    }
  });

  it('should validate JWT claims format', () => {
    const validJwtClaims = {
      ticket: 'ticket123',
      subject: 'user123',
      jwtAtClaims: '{"sub":"user123","name":"John Doe"}',
    };

    const result = tokenIssueRequestSchema.safeParse(validJwtClaims);
    expect(result.success).toBe(true);

    const invalidJwtClaims = {
      ticket: 'ticket123',
      subject: 'user123',
      jwtAtClaims: 123, // should be string
    };

    const result2 = tokenIssueRequestSchema.safeParse(invalidJwtClaims);
    expect(result2.success).toBe(false);
  });
});

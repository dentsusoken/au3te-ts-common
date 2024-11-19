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
import { introspectionRequestSchema } from './IntrospectionRequest';

describe('introspectionRequestSchema', () => {
  // Test for minimal valid request
  it('should accept request with only required fields', () => {
    const request = {
      token: 'access_token_value',
    };

    const result = introspectionRequestSchema.parse(request);
    expect(result).toEqual(request);
  });

  // Test for complete valid request with all fields
  it('should accept request with all fields', () => {
    const request = {
      token: 'access_token_value',
      scopes: ['read', 'write'],
      subject: 'user123',
      clientCertificate: '-----BEGIN CERTIFICATE-----\n...',
      dpop: 'dpop_header_value',
      htm: 'POST',
      htu: 'https://api.example.com/resource',
      resources: ['https://api.example.com/v1', 'https://api.example.com/v2'],
      targetUri: 'https://api.example.com/resource?id=123',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: 'Bearer token' },
      ],
      requestBodyContained: true,
      acrValues: ['urn:mace:incommon:iap:silver'],
      maxAge: 3600,
      dpopNonceRequired: true,
    };

    const result = introspectionRequestSchema.parse(request);
    expect(result).toEqual(request);
  });

  // Test for token validation
  it('should reject request without token', () => {
    const request = {};

    expect(() => introspectionRequestSchema.parse(request)).toThrow();
  });

  // Test for URL validation in resources array
  it('should reject invalid URLs in resources array', () => {
    const request = {
      token: 'access_token_value',
      resources: ['not_a_url', 'https://valid.example.com'],
    };

    expect(() => introspectionRequestSchema.parse(request)).toThrow();
  });

  // Test for targetUri validation
  it('should reject invalid targetUri', () => {
    const request = {
      token: 'access_token_value',
      targetUri: 'not_a_url',
    };

    expect(() => introspectionRequestSchema.parse(request)).toThrow();
  });

  // Test for headers validation
  it('should accept valid headers array', () => {
    const request = {
      token: 'access_token_value',
      headers: [
        { key: 'Content-Type', value: 'application/json' },
        { key: undefined, value: undefined },
        {},
      ],
    };

    const result = introspectionRequestSchema.parse(request);
    expect(result).toEqual(request);
  });

  // Test for type validation of boolean fields
  it('should reject non-boolean values for boolean fields', () => {
    const request = {
      token: 'access_token_value',
      requestBodyContained: 'true', // Should be boolean
      dpopNonceRequired: 1, // Should be boolean
    };

    expect(() => introspectionRequestSchema.parse(request)).toThrow();
  });

  // Test for maxAge validation
  it('should reject non-integer maxAge', () => {
    const request = {
      token: 'access_token_value',
      maxAge: 3600.5, // Should be integer
    };

    expect(() => introspectionRequestSchema.parse(request)).toThrow();
  });

  // Test for nullish fields
  it('should accept null values for optional fields', () => {
    const request = {
      token: 'access_token_value',
      scopes: null,
      headers: null,
      acrValues: null,
    };

    const result = introspectionRequestSchema.parse(request);
    expect(result.scopes).toBeNull();
    expect(result.headers).toBeNull();
    expect(result.acrValues).toBeNull();
  });
});

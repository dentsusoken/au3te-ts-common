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
import { introspectionRequestSchema } from '../IntrospectionRequest';

describe('introspectionRequestSchema', () => {
  it('should accept request with only required fields', () => {
    const request = {
      token: 'access_token_value',
    };
    const result = introspectionRequestSchema.parse(request);
    expect(result).toEqual(request);
  });

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

  it('should accept null values for optional fields', () => {
    const request = {
      token: 'access_token_value',
      scopes: null,
      headers: null,
      acrValues: null,
      subject: null,
      clientCertificate: null,
      dpop: null,
      htm: null,
      htu: null,
      resources: null,
      targetUri: null,
      requestBodyContained: null,
      maxAge: null,
      dpopNonceRequired: null,
    };
    const result = introspectionRequestSchema.parse(request);
    expect(result.scopes).toBeNull();
    expect(result.headers).toBeNull();
    expect(result.acrValues).toBeNull();
    expect(result.subject).toBeNull();
    expect(result.clientCertificate).toBeNull();
    expect(result.dpop).toBeNull();
    expect(result.htm).toBeNull();
    expect(result.htu).toBeNull();
    expect(result.resources).toBeNull();
    expect(result.targetUri).toBeNull();
    expect(result.requestBodyContained).toBeNull();
    expect(result.maxAge).toBeNull();
    expect(result.dpopNonceRequired).toBeNull();
  });

  it('should accept undefined values for optional fields', () => {
    const request = {
      token: 'access_token_value',
      scopes: undefined,
      headers: undefined,
      acrValues: undefined,
      subject: undefined,
      clientCertificate: undefined,
      dpop: undefined,
      htm: undefined,
      htu: undefined,
      resources: undefined,
      targetUri: undefined,
      requestBodyContained: undefined,
      maxAge: undefined,
      dpopNonceRequired: undefined,
    };
    const result = introspectionRequestSchema.parse(request);
    expect(result.token).toBe('access_token_value');
  });

  it('should accept empty arrays for array fields', () => {
    const request = {
      token: 'access_token_value',
      scopes: [],
      headers: [],
      acrValues: [],
      resources: [],
    };
    const result = introspectionRequestSchema.parse(request);
    expect(result.scopes).toEqual([]);
    expect(result.headers).toEqual([]);
    expect(result.acrValues).toEqual([]);
    expect(result.resources).toEqual([]);
  });

  it('should accept valid headers array with partial/empty objects', () => {
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

  it('should accept real-world example', () => {
    const request = {
      token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...',
      scopes: ['openid', 'profile'],
      subject: 'user456',
      clientCertificate: '-----BEGIN CERTIFICATE-----\nMIIBIjANBgkqh...',
      dpop: 'dpop.jwt.token',
      htm: 'GET',
      htu: 'https://wallet.example.com/credential',
      resources: ['https://wallet.example.com/credential'],
      targetUri: 'https://wallet.example.com/credential?type=vc',
      headers: [{ key: 'Accept', value: 'application/json' }],
      requestBodyContained: false,
      acrValues: ['urn:mace:incommon:iap:bronze'],
      maxAge: 600,
      dpopNonceRequired: false,
    };
    const result = introspectionRequestSchema.parse(request);
    expect(result).toEqual(request);
  });

  // Failure cases
  it('should reject request without token', () => {
    const request = {};
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject non-string token', () => {
    const request = { token: 123 };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject invalid URLs in resources array', () => {
    const request = {
      token: 'access_token_value',
      resources: ['not_a_url', 'https://valid.example.com'],
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject invalid targetUri', () => {
    const request = {
      token: 'access_token_value',
      targetUri: 'not_a_url',
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject non-array scopes', () => {
    const request = {
      token: 'access_token_value',
      scopes: 'not-an-array',
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject non-array headers', () => {
    const request = {
      token: 'access_token_value',
      headers: 'not-an-array',
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject non-array acrValues', () => {
    const request = {
      token: 'access_token_value',
      acrValues: 'not-an-array',
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject non-array resources', () => {
    const request = {
      token: 'access_token_value',
      resources: 'not-an-array',
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject non-boolean values for boolean fields', () => {
    const request = {
      token: 'access_token_value',
      requestBodyContained: 'true',
      dpopNonceRequired: 1,
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject non-integer maxAge', () => {
    const request = {
      token: 'access_token_value',
      maxAge: 3600.5,
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject string maxAge', () => {
    const request = {
      token: 'access_token_value',
      maxAge: 'not-a-number',
    };
    const result = introspectionRequestSchema.safeParse(request);
    expect(result.success).toBe(false);
  });

  it('should reject object/array for string fields', () => {
    const request1 = { token: {}, subject: {} };
    const request2 = { token: [], subject: [] };
    const result1 = introspectionRequestSchema.safeParse(request1);
    const result2 = introspectionRequestSchema.safeParse(request2);
    expect(result1.success).toBe(false);
    expect(result2.success).toBe(false);
  });

  it('should reject object/array for url fields', () => {
    const request1 = { token: 't', htu: {}, targetUri: {} };
    const request2 = { token: 't', htu: [], targetUri: [] };
    const result1 = introspectionRequestSchema.safeParse(request1);
    const result2 = introspectionRequestSchema.safeParse(request2);
    expect(result1.success).toBe(false);
    expect(result2.success).toBe(false);
  });

  it('should reject empty object', () => {
    const result = introspectionRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('should reject null object', () => {
    const result = introspectionRequestSchema.safeParse(null);
    expect(result.success).toBe(false);
  });

  it('should reject undefined object', () => {
    const result = introspectionRequestSchema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const result1 = introspectionRequestSchema.safeParse('not-an-object');
    expect(result1.success).toBe(false);
    const result2 = introspectionRequestSchema.safeParse(123);
    expect(result2.success).toBe(false);
    const result3 = introspectionRequestSchema.safeParse(true);
    expect(result3.success).toBe(false);
    const result4 = introspectionRequestSchema.safeParse([]);
    expect(result4.success).toBe(false);
  });
});

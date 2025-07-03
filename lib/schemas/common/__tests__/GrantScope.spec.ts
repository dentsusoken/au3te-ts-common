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
import { grantScopeSchema, type GrantScope } from '../GrantScope';

describe('grantScopeSchema', () => {
  it('should accept an empty object', () => {
    const grantScope = {};

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual({});
  });

  it('should accept valid scope string', () => {
    const grantScope = {
      scope: 'read write profile',
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  it('should accept valid resource array', () => {
    const grantScope = {
      resource: ['https://api.example.com/v1', 'https://api.example.com/v2'],
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  it('should accept complete valid object', () => {
    const grantScope = {
      scope: 'read write profile',
      resource: ['https://api.example.com/v1', 'https://api.example.com/v2'],
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  it('should accept null values', () => {
    const grantScope = {
      scope: null,
      resource: null,
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result.scope).toBeNull();
    expect(result.resource).toBeNull();
  });

  it('should accept undefined values', () => {
    const grantScope = {
      scope: undefined,
      resource: undefined,
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result.scope).toBeUndefined();
    expect(result.resource).toBeUndefined();
  });

  it('should accept mixed null and valid values', () => {
    const grantScope = {
      scope: 'openid profile',
      resource: null,
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  it('should accept scope with only resource', () => {
    const grantScope = {
      resource: ['https://api.example.com/v1'],
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  it('should accept scope with only scope string', () => {
    const grantScope = {
      scope: 'email phone',
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  it('should reject non-string scope', () => {
    const grantScope = {
      scope: 123, // Should be string
    };

    const result = grantScopeSchema.safeParse(grantScope);
    expect(result.success).toBe(false);
  });

  it('should reject non-array resource', () => {
    const grantScope = {
      resource: 'https://api.example.com', // Should be array
    };

    const result = grantScopeSchema.safeParse(grantScope);
    expect(result.success).toBe(false);
  });

  it('should reject invalid resource array elements', () => {
    const grantScope = {
      resource: [123, true], // Should be strings
    };

    const result = grantScopeSchema.safeParse(grantScope);
    expect(result.success).toBe(false);
  });

  it('should reject non-object values', () => {
    const invalidValues = [
      'not an object',
      123,
      true,
      ['array'],
      null,
      undefined,
    ];

    invalidValues.forEach((value) => {
      const result = grantScopeSchema.safeParse(value);
      expect(result.success).toBe(false);
    });
  });

  it('should infer the correct output type', () => {
    type SchemaType = typeof grantScopeSchema._type;
    type ExpectedType = GrantScope;

    const assertTypeCompatibility = (value: SchemaType): ExpectedType => value;
    expect(assertTypeCompatibility).toBeDefined();
  });

  it('should handle various scope string formats', () => {
    const scopeFormats = [
      'read',
      'read write',
      'openid profile email',
      'payment:read payment:write',
      'https://example.com/scope',
      'urn:example:scope',
    ];

    scopeFormats.forEach((scopeString) => {
      const grantScope = { scope: scopeString };
      const result = grantScopeSchema.parse(grantScope);
      expect(result).toEqual(grantScope);
    });
  });

  it('should handle various resource indicator formats', () => {
    const resourceFormats = [
      ['https://api.example.com'],
      ['https://api.example.com/v1', 'https://api.example.com/v2'],
      ['https://bank.com/accounts', 'https://bank.com/payments'],
      ['urn:example:resource'],
    ];

    resourceFormats.forEach((resourceArray) => {
      const grantScope = { resource: resourceArray };
      const result = grantScopeSchema.parse(grantScope);
      expect(result).toEqual(grantScope);
    });
  });
});

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
import { grantScopeSchema } from './GrantScope';

describe('grantScopeSchema', () => {
  // Test for empty object
  it('should accept an empty object', () => {
    const grantScope = {};

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual({});
  });

  // Test for valid scope string
  it('should accept valid scope string', () => {
    const grantScope = {
      scope: 'read write profile',
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  // Test for valid resource array
  it('should accept valid resource array', () => {
    const grantScope = {
      resource: ['https://api.example.com/v1', 'https://api.example.com/v2'],
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  // Test for complete valid object
  it('should accept complete valid object', () => {
    const grantScope = {
      scope: 'read write profile',
      resource: ['https://api.example.com/v1', 'https://api.example.com/v2'],
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result).toEqual(grantScope);
  });

  // Test for null values
  it('should accept null values', () => {
    const grantScope = {
      scope: null,
      resource: null,
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result.scope).toBeNull();
    expect(result.resource).toBeNull();
  });

  // Test for undefined values
  it('should accept undefined values', () => {
    const grantScope = {
      scope: undefined,
      resource: undefined,
    };

    const result = grantScopeSchema.parse(grantScope);
    expect(result.scope).toBeUndefined();
    expect(result.resource).toBeUndefined();
  });

  // Test for invalid scope type
  it('should reject non-string scope', () => {
    const grantScope = {
      scope: 123, // Should be string
    };

    expect(() => grantScopeSchema.parse(grantScope)).toThrow();
  });

  // Test for invalid resource array type
  it('should reject non-array resource', () => {
    const grantScope = {
      resource: 'https://api.example.com', // Should be array
    };

    expect(() => grantScopeSchema.parse(grantScope)).toThrow();
  });

  // Test for invalid resource array elements
  it('should reject invalid resource array elements', () => {
    const grantScope = {
      resource: [123, true], // Should be strings
    };

    expect(() => grantScopeSchema.parse(grantScope)).toThrow();
  });
});

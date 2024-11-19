/*
 * Copyright (C) 2021-2024 Authlete, Inc.
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
import { grantSchema, type Grant } from './Grant';

describe('grantSchema', () => {
  // Test for empty object
  it('should accept an empty object', () => {
    const grant: Grant = {};

    const result = grantSchema.parse(grant);
    expect(result).toEqual({});
  });

  // Test for valid scopes array
  it('should accept valid scopes array', () => {
    const grant: Grant = {
      scopes: [
        {
          scope: 'contacts read write',
          resource: ['https://rs.example.com/api'],
        },
        {
          scope: 'openid',
        },
      ],
    };

    const result = grantSchema.parse(grant);
    expect(result).toEqual(grant);
  });

  // Test for valid claims array
  it('should accept valid claims array', () => {
    const grant: Grant = {
      claims: ['given_name', 'nickname', 'email', 'email_verified'],
    };

    const result = grantSchema.parse(grant);
    expect(result).toEqual(grant);
  });

  // Test for valid authorization details
  it('should accept valid authorization details', () => {
    const grant: Grant = {
      authorizationDetails: {
        elements: [
          {
            type: 'account_information',
            actions: ['list_accounts', 'read_balances'],
            locations: ['https://example.com/accounts'],
          },
        ],
      },
    };

    const result = grantSchema.parse(grant);
    expect(result).toEqual(grant);
  });

  // Test for complete valid object
  it('should accept complete valid object', () => {
    const grant: Grant = {
      scopes: [
        {
          scope: 'contacts read write',
          resource: ['https://rs.example.com/api'],
        },
        {
          scope: 'openid',
        },
      ],
      claims: ['given_name', 'email'],
      authorizationDetails: {
        elements: [
          {
            type: 'account_information',
            actions: ['read_balances'],
            locations: ['https://example.com/accounts'],
          },
        ],
      },
    };

    const result = grantSchema.parse(grant);
    expect(result).toEqual(grant);
  });

  // Test for null values
  it('should accept null values', () => {
    const grant: Grant = {
      scopes: null,
      claims: null,
      authorizationDetails: null,
    };

    const result = grantSchema.parse(grant);
    expect(result.scopes).toBeNull();
    expect(result.claims).toBeNull();
    expect(result.authorizationDetails).toBeNull();
  });

  // Test for undefined values
  it('should accept undefined values', () => {
    const grant: Grant = {
      scopes: undefined,
      claims: undefined,
      authorizationDetails: undefined,
    };

    const result = grantSchema.parse(grant);
    expect(result.scopes).toBeUndefined();
    expect(result.claims).toBeUndefined();
    expect(result.authorizationDetails).toBeUndefined();
  });

  // Test for invalid scopes array
  it('should reject invalid scopes array', () => {
    const grant = {
      scopes: [
        {
          invalid: 'structure',
          scope: 123,
        },
      ],
    };

    expect(() => grantSchema.parse(grant)).toThrow(
      /Invalid input|Expected string/
    );
  });

  // Test for invalid claims array
  it('should reject invalid claims array', () => {
    const grant = {
      claims: [123, true], // Should be strings
    };

    expect(() => grantSchema.parse(grant)).toThrow(/Expected string/);
  });

  // Test for invalid authorization details
  it('should reject invalid authorization details', () => {
    const grant = {
      authorizationDetails: {
        elements: [
          {
            type: 'account_information',
            actions: 'not_an_array',
            locations: [123],
          },
        ],
      },
    };

    expect(() => grantSchema.parse(grant)).toThrow(
      /Expected array|Expected string/
    );
  });
});

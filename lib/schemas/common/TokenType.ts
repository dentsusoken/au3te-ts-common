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

import { z } from 'zod';

/**
 * Token types registered at IANA OAuth Parameters.
 *
 * @see https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#uri IANA OAuth Parameters
 * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-9 RFC 7519 JWT
 * @see https://www.rfc-editor.org/rfc/rfc8693.html#section-3 RFC 8693 Token Exchange
 *
 * @since Authlete 2.3
 */
export const tokenTypes = [
  /**
   * JSON Web Token (JWT) Token Type.
   * @see https://www.rfc-editor.org/rfc/rfc7519.html#section-9
   */
  'urn:ietf:params:oauth:token-type:jwt',

  /**
   * Token type URI for an OAuth 2.0 access token.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html#section-3
   */
  'urn:ietf:params:oauth:token-type:access_token',

  /**
   * Token type URI for an OAuth 2.0 refresh token.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html#section-3
   */
  'urn:ietf:params:oauth:token-type:refresh_token',

  /**
   * Token type URI for an ID Token.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html#section-3
   */
  'urn:ietf:params:oauth:token-type:id_token',

  /**
   * Token type URI for a base64url-encoded SAML 1.1 assertion.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html#section-3
   */
  'urn:ietf:params:oauth:token-type:saml1',

  /**
   * Token type URI for a base64url-encoded SAML 2.0 assertion.
   * @see https://www.rfc-editor.org/rfc/rfc8693.html#section-3
   */
  'urn:ietf:params:oauth:token-type:saml2',
] as const;

/**
 * Type representing a token type.
 */
export type TokenType = (typeof tokenTypes)[number];

/**
 * Schema for validating token types.
 * Converts input to lowercase before validation.
 */
export const tokenTypeSchema = z.preprocess(
  (v) => (v && typeof v === 'string' ? v.toLowerCase() : v),
  z.enum(tokenTypes)
) as z.ZodType<TokenType>;

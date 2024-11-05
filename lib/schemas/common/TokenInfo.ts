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

import { z } from 'zod';
import { nullableButOptionalNumberSchema } from './numberSchema';
import { nullableButOptionalBooleanSchema } from './booleanSchema';
import { nullableButOptionalPropertyArraySchema } from './Property';
import { nullableButOptionalAuthzDetailsSchema } from './AuthzDetails';
import { nullableButOptionalScopeArraySchema } from './Scope';
import {
  nullableButOptionalStringSchema,
  nullableButOptionalUrlStringSchema,
  nullableButOptionalUrlStringArraySchema,
} from './stringSchema';

/**
 * Information about a token of the type "urn:ietf:params:oauth:token-type:access_token"
 * or the type "urn:ietf:params:oauth:token-type:refresh_token".
 *
 * This schema is used to hold detailed information about a subject token or an actor token.
 *
 * @see https://www.rfc-editor.org/rfc/rfc8693.html OAuth 2.0 Token Exchange
 * @since Authlete 2.3
 */
export const tokenInfoSchema = z.object({
  /**
   * (OPTIONAL) The client ID.
   */
  clientId: nullableButOptionalNumberSchema,

  /**
   * (OPTIONAL) Resource owner's unique identifier.
   */
  subject: nullableButOptionalStringSchema,

  /**
   * (OPTIONAL) Scopes granted to the token.
   */
  scopes: nullableButOptionalScopeArraySchema,

  /**
   * (OPTIONAL) The time at which the token expires in seconds since the Unix epoch.
   */
  expiresAt: nullableButOptionalNumberSchema,

  /**
   * (OPTIONAL) Extra properties associated with the token.
   * @see https://www.authlete.com/developers/definitive_guide/extra_properties/
   */
  properties: nullableButOptionalPropertyArraySchema,

  /**
   * (OPTIONAL) The client ID alias when the authorization request or the token request was made.
   * @see https://kb.authlete.com/en/s/oauth-and-openid-connect/a/client-id-alias
   */
  clientIdAlias: nullableButOptionalStringSchema,

  /**
   * (OPTIONAL) Flag indicating whether the client ID alias was used.
   * @see https://kb.authlete.com/en/s/oauth-and-openid-connect/a/client-id-alias
   */
  clientIdAliasUsed: nullableButOptionalBooleanSchema,

  /**
   * (OPTIONAL) The entity ID of the client.
   * @see https://openid.net/specs/openid-federation-1_0.html OpenID Federation 1.0
   * @since Authlete 2.3
   */
  clientEntityId: nullableButOptionalUrlStringSchema,

  /**
   * (OPTIONAL) Flag indicating whether the entity ID of the client was used.
   * @see https://openid.net/specs/openid-federation-1_0.html OpenID Federation 1.0
   * @since Authlete 2.3
   */
  clientEntityIdUsed: nullableButOptionalBooleanSchema,

  /**
   * (OPTIONAL) The resources associated with the token.
   * @see https://www.rfc-editor.org/rfc/rfc8707.html RFC 8707 Resource Indicators
   */
  resources: nullableButOptionalUrlStringArraySchema,

  /**
   * (OPTIONAL) The authorization details associated with the token.
   * @see https://www.rfc-editor.org/rfc/rfc9396.html RFC 9396 OAuth 2.0 Rich Authorization Requests
   */
  authorizationDetails: nullableButOptionalAuthzDetailsSchema,
});

/**
 * Type representing token information.
 * Inferred from the tokenInfoSchema.
 */
export type TokenInfo = z.infer<typeof tokenInfoSchema>;

/**
 * Schema for validating optional token information.
 * Converts null to undefined and validates using tokenInfoSchema.
 */
export const nullableButOptionalTokenInfoSchema = z.preprocess(
  (v) => (v === null ? undefined : v),
  tokenInfoSchema.optional()
) as z.ZodType<TokenInfo | undefined>;

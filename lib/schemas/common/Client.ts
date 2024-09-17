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

/**
 * Information about a client application.
 *
 * Some properties correspond to client metadata defined in related standard
 * specifications. See the implementation of
 * toStandardMetadata(ClientMetadataControl) for exact mappings.
 *
 * @see {@link https://openid.net/specs/openid-connect-registration-1_0.html|OpenID Connect Dynamic Client Registration 1.0}
 * @see {@link https://www.rfc-editor.org/rfc/rfc7591.html|RFC 7591 OAuth 2.0 Dynamic Client Registration Protocol}
 * @see {@link https://www.rfc-editor.org/rfc/rfc8705.html|RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens}
 * @see {@link https://openid.net/specs/oauth-v2-jarm.html|JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)}
 * @see {@link https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html|OpenID Connect Client-Initiated Backchannel Authentication Flow - Core 1.0}
 * @see {@link https://www.rfc-editor.org/rfc/rfc9396.html|RFC 9396 OAuth 2.0 Rich Authorization Requests}
 * @see {@link https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html|OpenID Connect for Identity Assurance 1.0}
 * @see {@link https://openid.net/specs/openid-federation-1_0.html|OpenID Federation 1.0}
 * @see {@link https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#client-metadata|IANA OAuth Parameters / OAuth Dynamic Client Registration Metadata}
 * @see {@link https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html|OpenID for Verifiable Credential Issuance}
 */

import { z } from 'zod';
import { nullableButOptionalStringSchema } from './stringSchema';

/**
 * Schema for client application information.
 *
 * This schema represents information about a client application, which may include
 * properties corresponding to client metadata defined in related standard specifications.
 *
 * @property {string|null} [clientName] - The name of the client application. This field is optional and can be null.
 *
 * @see {@link https://openid.net/specs/openid-connect-registration-1_0.html|OpenID Connect Dynamic Client Registration 1.0}
 * @see {@link https://www.rfc-editor.org/rfc/rfc7591.html|RFC 7591 OAuth 2.0 Dynamic Client Registration Protocol}
 * @see {@link https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#client-metadata|IANA OAuth Parameters / OAuth Dynamic Client Registration Metadata}
 */
export const clientSchema = z.object({
  clientName: nullableButOptionalStringSchema,
});

/**
 * Represents a client application with properties defined by the clientSchema.
 *
 * @typedef {z.infer<typeof clientSchema>} Client
 */
export type Client = z.infer<typeof clientSchema>;

/**
 * Schema for a nullable but optional client.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional clientSchema. This allows the schema to
 * accept null, undefined, or a valid Client object.
 *
 * @type {z.ZodType<Client | undefined>}
 *
 * @example
 * // Valid inputs
 * nullableButOptionalClientSchema.parse(null); // returns undefined
 * nullableButOptionalClientSchema.parse(undefined); // returns undefined
 * nullableButOptionalClientSchema.parse({ clientName: 'Test Client' }); // returns the Client object
 *
 * @example
 * // Invalid input
 * nullableButOptionalClientSchema.parse('not an object'); // throws ZodError
 *
 * @see {@link clientSchema} for the underlying client schema
 */
export const nullableButOptionalClientSchema = z.preprocess(
  (v) => (v === null ? undefined : v),
  z.optional(clientSchema)
) as z.ZodType<Client | undefined>;

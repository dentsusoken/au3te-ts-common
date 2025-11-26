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
import {
  oidcAuthenticationRequestSchema,
  type OidcAuthenticationRequest,
} from './OidcAuthenticationRequest';
import {
  saml2AuthenticationRequestSchema,
  type Saml2AuthenticationRequest,
} from './Saml2AuthenticationRequest';

/**
 * Schema for authentication request parameters used in federation flows.
 * Supports both OpenID Connect and SAML 2.0 protocols.
 */
export const federationAuthenticationRequestSchema = z.discriminatedUnion('protocol', [
  z.object({ protocol: z.literal('oidc') }).merge(oidcAuthenticationRequestSchema),
  z.object({ protocol: z.literal('saml2') }).merge(saml2AuthenticationRequestSchema),
]);

/**
 * Type definition for FederationAuthenticationRequest.
 * This is a discriminated union that supports both OIDC and SAML 2.0 protocols.
 */
export type FederationAuthenticationRequest =
  | ({ protocol: 'oidc' } & OidcAuthenticationRequest)
  | ({ protocol: 'saml2' } & Saml2AuthenticationRequest);
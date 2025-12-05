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
import { oidcClientConfigSchema } from './OidcClientConfig';
import { oidcServerConfigSchema } from './OidcServerConfig';
import { saml2IdpConfigSchemas, saml2SpConfigSchemas } from './saml2';

/**
 * Schema for federation configuration.
 * This represents a single federation setup with client and server configurations.
 * The protocol field determines which protocol-specific configurations are used.
 */
export const federationConfigSchema = z.discriminatedUnion('protocol', [
  z.object({
    /**
     * Unique identifier for the federation.
     */
    id: z.string().min(1),
    /**
     * The federation protocol type.
     */
    protocol: z.literal('oidc'),
    /**
     * Client configuration for the federation.
     */
    client: oidcClientConfigSchema,
    /**
     * Server configuration for the federation.
     */
    server: oidcServerConfigSchema,
  }),
  z.object({
    /**
     * Unique identifier for the federation.
     */
    id: z.string().min(1),
    /**
     * The federation protocol type.
     */
    protocol: z.literal('saml2'),
    /**
     * The display name for saml federation.
     */
    name: z.string(),
    /**
     * Service Provider (SP) configuration for SAML 2.0 federation.
     */
    sp: saml2SpConfigSchemas,
    /**
     * Identity Provider (IdP) configuration for SAML 2.0 federation.
     * Can be either a partial configuration with metadataUrl or a complete configuration.
     */
    idp: z.union([
      saml2IdpConfigSchemas.partial().extend({
        metadataUrl: z.string().url(),
      }),
      saml2IdpConfigSchemas,
    ]),
  }),
]);

/**
 * Type definition for FederationConfig.
 * This is a discriminated union that supports both OIDC and SAML 2.0 protocols.
 */
export type FederationConfig = z.input<typeof federationConfigSchema>;

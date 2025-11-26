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
import { oidcServerConfigSchema, type OidcServerConfig } from './OidcServerConfig';
import { saml2ServerConfigSchema, type Saml2ServerConfig } from './Saml2ServerConfig';

/**
 * Schema for server configuration used in federation flows.
 * Supports both OpenID Connect and SAML 2.0 protocols.
 * Note: The protocol is determined by the parent FederationConfig.
 */
export const federationServerConfigSchema = z.union([
  oidcServerConfigSchema,
  saml2ServerConfigSchema,
]);

/**
 * Type definition for FederationServerConfig.
 * This is a union that supports both OIDC and SAML 2.0 protocols.
 */
export type FederationServerConfig = OidcServerConfig | Saml2ServerConfig;

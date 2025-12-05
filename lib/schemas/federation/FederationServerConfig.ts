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
import { oidcServerConfigSchema, type OidcServerConfig } from './oidc';

/**
 * Schema for server configuration used in federation flows.
 * Supports OpenID Connect protocol.
 * Note: The protocol is determined by the parent FederationConfig.
 */
export const federationServerConfigSchema = z.union([
  oidcServerConfigSchema,
]);

/**
 * Type definition for FederationServerConfig.
 * This is a union that supports OIDC protocol.
 */
export type FederationServerConfig = OidcServerConfig;

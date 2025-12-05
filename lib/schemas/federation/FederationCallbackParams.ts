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
  oidcCallbackParamsSchema,
  type OidcCallbackParams,
} from './oidc';

/**
 * Schema for federation callback parameters.
 * These parameters are stored in session before redirecting to IdP and reused after callback.
 * Supports OpenID Connect protocol.
 */
export const federationCallbackParamsSchema = z.discriminatedUnion('protocol', [
  z.object({ protocol: z.literal('oidc') }).merge(oidcCallbackParamsSchema),
]);

/**
 * Type definition for FederationCallbackParams.
 * This is a discriminated union that supports OIDC protocol.
 */
export type FederationCallbackParams =
  | ({ protocol: 'oidc' } & OidcCallbackParams);

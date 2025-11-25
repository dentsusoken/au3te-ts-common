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
import { clientConfigSchema } from './ClientConfig';
import { serverConfigSchema } from './ServerConfig';

/**
 * Schema for federation configuration.
 * This represents a single federation setup with client and server configurations.
 */
export const federationConfigSchema = z.object({
  /**
   * Unique identifier for the federation.
   */
  id: z.string().min(1),

  /**
   * Client configuration for the federation.
   */
  client: clientConfigSchema,

  /**
   * Server configuration for the federation.
   */
  server: serverConfigSchema,
});

/**
 * Type definition for FederationConfig.
 */
export type FederationConfig = z.infer<typeof federationConfigSchema>;

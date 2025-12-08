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
import { federationConfigSchema } from './FederationConfig';

/**
 * Schema for federation registry.
 * This represents a collection of federation configurations.
 */
export const federationRegistrySchema = z.object({
  /**
   * Array of federation configurations.
   */
  federations: z.array(federationConfigSchema).nullish(),
}).nullish();

/**
 * Type definition for FederationRegistry.
 */
export type FederationRegistry = z.input<typeof federationRegistrySchema>;

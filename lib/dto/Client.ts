/*
 * Copyright (C) 2019-2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the
 * License.
 */

import { z } from 'zod';

import { subjectTypeSchema } from '../types/SubjectType';

/**
 * Zod schema for client data.
 * @typedef {Object} ClientSchema
 * @property {string} [clientName] - The name of the client.
 * @property {string} [logoUri] - The URI of the client's logo.
 * @property {string} [clientUri] - The URI of the client.
 * @property {string} [policyUri] - The URI of the client's policy.
 * @property {string} [tosUri] - The URI of the client's terms of service.
 * @property {string} [description] - The description of the client.
 * @property {('public' | 'pairwise')} [subjectType] - The subject type of the client.
 * @property {string} [derivedSectorIdentifier] - The derived sector identifier of the client.
 */
export const clientSchema = z.object({
  clientName: z.string().optional(),
  logoUri: z.string().url().optional(),
  clientUri: z.string().url().optional(),
  policyUri: z.string().url().optional(),
  tosUri: z.string().url().optional(),
  description: z.string().optional(),
  subjectType: z.optional(subjectTypeSchema),
  derivedSectorIdentifier: z.string().optional(),
});

/**
 * Type representing client data.
 * @typedef {Object} Client
 * @property {string} [clientName] - The name of the client.
 * @property {string} [logoUri] - The URI of the client's logo.
 * @property {string} [clientUri] - The URI of the client.
 * @property {string} [policyUri] - The URI of the client's policy.
 * @property {string} [tosUri] - The URI of the client's terms of service.
 * @property {string} [description] - The description of the client.
 * @property {('public' | 'pairwise')} [subjectType] - The subject type of the client.
 * @property {string} [derivedSectorIdentifier] - The derived sector identifier of the client.
 */
export type Client = z.infer<typeof clientSchema>;

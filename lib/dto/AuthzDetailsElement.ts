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

/**
 * Zod schema for AuthzDetailsElement
 * @typedef {Object} AuthzDetailsElementSchema
 * @property {string} [type] - The type of the authorization details element.
 * @property {string[]} [locations] - The locations associated with the authorization details element.
 * @property {string[]} [actions] - The actions associated with the authorization details element.
 * @property {string[]} [dataTypes] - The data types associated with the authorization details element.
 * @property {string} [identifier] - The identifier of the authorization details element.
 * @property {string[]} [privileges] - The privileges associated with the authorization details element.
 * @property {string} [otherFields] - Other fields associated with the authorization details element.
 */
export const authzDetailsElementSchema = z.object({
  type: z.string().optional(),
  locations: z.array(z.string()).optional(),
  actions: z.array(z.string()).optional(),
  dataTypes: z.array(z.string()).optional(),
  identifier: z.string().optional(),
  privileges: z.array(z.string()).optional(),
  otherFields: z.string().optional(),
});

/**
 * Type representing an authorization details element.
 * @typedef {Object} AuthzDetailsElement
 * @property {string} [type] - The type of the authorization details element.
 * @property {string[]} [locations] - The locations associated with the authorization details element.
 * @property {string[]} [actions] - The actions associated with the authorization details element.
 * @property {string[]} [dataTypes] - The data types associated with the authorization details element.
 * @property {string} [identifier] - The identifier of the authorization details element.
 * @property {string[]} [privileges] - The privileges associated with the authorization details element.
 * @property {string} [otherFields] - Other fields associated with the authorization details element.
 */
export type AuthzDetailsElement = z.infer<typeof authzDetailsElementSchema>;

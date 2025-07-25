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
import { authzDetailsElementSchema } from './AuthzDetailsElement';

/**
 * Schema for Authorization Details as defined in OAuth 2.0 Rich Authorization Requests.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9396.html|RFC 9396 OAuth 2.0 Rich Authorization Requests}
 */
export const authzDetailsSchema = z.object({
  elements: z.array(authzDetailsElementSchema).nullish(),
});

/**
 * Represents the Authorization Details structure.
 *
 * @typedef {Object} AuthzDetails
 * @property {AuthzDetailsElement[]|undefined} [elements] - An array of Authorization Details elements.
 */
export type AuthzDetails = z.input<typeof authzDetailsSchema>;

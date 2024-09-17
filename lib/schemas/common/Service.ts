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

/**
 * Information about a service.
 *
 * Some properties correspond to the ones listed in OpenID Provider Metadata
 * in OpenID Connect Discovery 1.0
 *
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata|OpenID Provider Metadata}
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html|OpenID Connect Discovery 1.0}
 */

import { z } from 'zod';
import { nullableButOptionalStringSchema } from './stringSchema';

/**
 * Schema for service information.
 *
 * This schema represents information about a service, which may include
 * properties corresponding to those listed in OpenID Provider Metadata
 * as defined in OpenID Connect Discovery 1.0.
 *
 * @property {string|null} [serviceName] - The name of the service. This field is optional and can be null.
 *
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata|OpenID Provider Metadata}
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html|OpenID Connect Discovery 1.0}
 */
export const serviceSchema = z.object({
  serviceName: nullableButOptionalStringSchema,
});

/**
 * Represents a service with properties defined by the serviceSchema.
 *
 */
export type Service = z.infer<typeof serviceSchema>;

/**
 * Schema for a nullable but optional service.
 *
 * This schema preprocesses the input to convert null values to undefined,
 * and then applies an optional serviceSchema. This allows the schema to
 * accept null, undefined, or a valid Service object.
 */
export const nullableButOptionalServiceSchema = z.preprocess(
  (v) => (v === null ? undefined : v),
  z.optional(serviceSchema)
) as z.ZodType<Service | undefined>;

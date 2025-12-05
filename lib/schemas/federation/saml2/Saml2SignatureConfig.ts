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

/**
 * Schema for SAML 2.0 signature configuration.
 * Defines how XML signatures should be applied to SAML messages.
 */
export const saml2SignatureConfigSchema = z.object({
  /**
   * XML namespace prefix for signature elements.
   */
  prefix: z.string().optional(),
  /**
   * Configuration for signature element placement.
   */
  location: z
    .object({
      /**
       * XPath reference to the element where the signature should be placed.
       */
      reference: z.string().optional(),
      /**
       * Action specifying where to place the signature relative to the reference element.
       */
      action: z.union([
        z.literal('append'),
        z.literal('prepend'),
        z.literal('before'),
        z.literal('after'),
      ]),
    })
    .optional(),
});

/**
 * Type definition for Saml2SignatureConfig.
 * Configuration for XML signature placement in SAML 2.0 messages.
 */
export type Saml2SignatureConfig = z.infer<typeof saml2SignatureConfigSchema>;

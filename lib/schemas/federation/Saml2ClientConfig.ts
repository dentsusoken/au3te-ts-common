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
 * Schema for SAML 2.0 client configuration used in federation flows.
 */
export const saml2ClientConfigSchema = z.object({
  /**
   * The entity ID of the service provider (SP).
   */
  entityId: z.string().min(1),

  /**
   * The Assertion Consumer Service (ACS) URL where SAML responses will be received.
   */
  assertionConsumerServiceUrl: z.string().url(),

  /**
   * The Single Logout Service (SLO) URL where logout requests will be sent.
   */
  singleLogoutServiceUrl: z.string().url().nullish(),

  /**
   * The certificate used for signing SAML requests (PEM format).
   */
  signingCertificate: z.string().nullish(),

  /**
   * The certificate used for encrypting SAML assertions (PEM format).
   */
  encryptionCertificate: z.string().nullish(),

  /**
   * The NameID format to request from the IdP.
   * Default: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient' if not specified.
   */
  nameIdFormat: z.string().nullish(),
});

/**
 * Type definition for Saml2ClientConfig.
 */
export type Saml2ClientConfig = z.infer<typeof saml2ClientConfigSchema>;


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
 * Schema for SAML 2.0 server configuration used in federation flows.
 */
export const saml2ServerConfigSchema = z.object({
  /**
   * The entity ID of the identity provider (IdP).
   */
  entityId: z.string().min(1),

  /**
   * The Single Sign-On Service (SSO) URL where authentication requests will be sent.
   */
  singleSignOnServiceUrl: z.string().url(),

  /**
   * The Single Logout Service (SLO) URL where logout requests will be sent.
   */
  singleLogoutServiceUrl: z.string().url().nullish(),

  /**
   * The certificate used for verifying signatures on SAML responses (PEM format).
   */
  signingCertificate: z.string().min(1),

  /**
   * The certificate used for decrypting encrypted SAML assertions (PEM format).
   */
  encryptionCertificate: z.string().nullish(),
});

/**
 * Type definition for Saml2ServerConfig.
 */
export type Saml2ServerConfig = z.infer<typeof saml2ServerConfigSchema>;


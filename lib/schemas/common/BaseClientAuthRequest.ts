/*
 * Copyright (C) 2014-2024 Authlete, Inc.
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
 * Base schema for requests that require client authentication.
 */
export const baseClientAuthRequestSchema = z.object({
  /**
   * (REQUIRED) Request parameters in application/x-www-form-urlencoded format.
   */
  parameters: z.string(),

  /**
   * (OPTIONAL) Client ID extracted from the Authorization header.
   */
  clientId: z.string().nullish(),

  /**
   * (OPTIONAL) Client secret extracted from the Authorization header.
   */
  clientSecret: z.string().nullish(),

  /**
   * (OPTIONAL) Client certificate.
   */
  clientCertificate: z.string().nullish(),

  /**
   * (OPTIONAL) Client certificate path.
   */
  clientCertificatePath: z.array(z.string()).nullish(),

  /**
   * (OPTIONAL) DPoP Header
   * @see RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  dpop: z.string().nullish(),

  /**
   * (OPTIONAL) HTTP Method (for DPoP validation).
   * @see RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  htm: z.string().nullish(),

  /**
   * (OPTIONAL) HTTP URL base (for DPoP validation).
   * @see RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
   */
  htu: z.string().nullish(),

  /**
   * (OPTIONAL; Authlete 3.0 onwards) Whether to check if the DPoP proof JWT includes the expected nonce value.
   */
  dpopNonceRequired: z.boolean().nullish(),

  /**
   * (OPTIONAL; Authlete 3.0 onwards) The value of the OAuth-Client-Attestation HTTP header.
   */
  oauthClientAttestation: z.string().nullish(),

  /**
   * (OPTIONAL; Authlete 3.0 onwards) The value of the OAuth-Client-Attestation-PoP HTTP header.
   */
  oauthClientAttestationPop: z.string().nullish(),
});

/**
 * Type definition for base client authentication request
 */
export type BaseClientAuthRequest = z.infer<typeof baseClientAuthRequestSchema>;

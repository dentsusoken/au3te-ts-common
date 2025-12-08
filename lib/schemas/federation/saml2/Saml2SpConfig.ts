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
import { saml2SsoServiceSchema } from './Saml2SsoService';
import { saml2SignatureConfigSchema } from './Saml2SignatureConfig';
import { saml2SamlDocumentTemplateSchema } from './Saml2SamlDocumentTemplate';

/**
 * Schema for SAML 2.0 Service Provider (SP) configuration.
 * Defines settings for SAML 2.0 SP behavior including metadata, certificates, and service endpoints.
 */
export const saml2SpConfigSchemas = z.object({
  /**
   * SAML metadata XML string for the SP.
   */
  metadata: z.string().optional(),
  /**
   * Entity ID of the SP.
   */
  entityID: z.string().optional(),
  /**
   * Whether authentication requests should be signed.
   */
  authnRequestsSigned: z.boolean().optional(),
  /**
   * Whether assertions should be signed.
   */
  wantAssertionsSigned: z.boolean().optional(),
  /**
   * Whether SAML messages should be signed.
   */
  wantMessageSigned: z.boolean().optional(),
  /**
   * Whether logout responses should be signed.
   */
  wantLogoutResponseSigned: z.boolean().optional(),
  /**
   * Whether logout requests should be signed.
   */
  wantLogoutRequestSigned: z.boolean().optional(),
  /**
   * Private key for signing SAML messages.
   */
  privateKey: z.string().optional(),
  /**
   * Password for the private key.
   */
  privateKeyPass: z.string().optional(),
  /**
   * Whether assertions should be encrypted.
   */
  isAssertionEncrypted: z.boolean().optional(),
  /**
   * Algorithm used for signing authentication requests.
   */
  requestSignatureAlgorithm: z.string().optional(),
  /**
   * Private key for decrypting encrypted assertions.
   */
  encPrivateKey: z.string().optional(),
  /**
   * Password for the encryption private key.
   */
  encPrivateKeyPass: z.string().optional(),
  /**
   * Assertion Consumer Service endpoints.
   */
  assertionConsumerService: z.array(saml2SsoServiceSchema).optional(),
  /**
   * Single Logout service endpoints.
   */
  singleLogoutService: z.array(saml2SsoServiceSchema).optional(),
  /**
   * Configuration for XML signature placement.
   */
  signatureConfig: saml2SignatureConfigSchema.optional(),
  /**
   * Template for customizing login request generation.
   */
  loginRequestTemplate: saml2SamlDocumentTemplateSchema.optional(),
  /**
   * Template for customizing logout request generation.
   */
  logoutRequestTemplate: saml2SamlDocumentTemplateSchema.optional(),
  /**
   * Signing certificate(s) for the SP. Can be a single certificate string or an array of certificate strings.
   */
  signingCert: z.union([z.string().optional(), z.array(z.string()).optional()]),
  /**
   * Encryption certificate(s) for the SP. Can be a single certificate string or an array of certificate strings.
   */
  encryptCert: z.union([z.string().optional(), z.array(z.string()).optional()]),
  /**
   * Transformation algorithms for attribute processing.
   */
  transformationAlgorithms: z.array(z.string()).optional(),
  /**
   * Supported NameID formats.
   */
  nameIDFormat: z.array(z.string()).optional(),
  /**
   * Whether NameID creation is allowed.
   */
  allowCreate: z.boolean().optional(),
  /**
   * Relay state value to preserve across SAML flows.
   */
  relayState: z.string().optional(),
  /**
   * Clock drift tolerance in seconds. Tuple of [negative drift, positive drift].
   */
  clockDrifts: z.tuple([z.number(), z.number()]).optional(),
});

/**
 * Type definition for Saml2SpConfig.
 * Complete SAML 2.0 Service Provider configuration structure.
 */
export type Saml2SpConfig = z.infer<typeof saml2SpConfigSchemas>;

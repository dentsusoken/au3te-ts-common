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
import { saml2LoginResponseTemplateSchema } from './Saml2LoginResponseTemplate';
import { saml2SamlDocumentTemplateSchema } from './Saml2SamlDocumentTemplate';
import { saml2SsoServiceSchema } from './Saml2SsoService';

/**
 * Schema for SAML 2.0 Identity Provider (IdP) configuration.
 * Defines settings for SAML 2.0 IdP behavior including metadata, certificates, and service endpoints.
 */
export const saml2IdpConfigSchemas = z.object({
  /**
   * SAML metadata XML string for the IdP.
   */
  metadata: z.string().optional(),
  /**
   * Algorithm used for signing authentication requests.
   */
  requestSignatureAlgorithm: z.string().optional(),
  /**
   * Template for customizing login response generation.
   */
  loginResponseTemplate: saml2LoginResponseTemplateSchema.optional(),
  /**
   * Template for customizing logout request generation.
   */
  logoutRequestTemplate: saml2SamlDocumentTemplateSchema.optional(),
  /**
   * Function to generate unique IDs for SAML messages.
   */
  generateID: z.function().returns(z.string()),
  /**
   * Entity ID of the IdP.
   */
  entityID: z.string().optional(),
  /**
   * Private key for signing SAML messages.
   */
  privateKey: z.string().optional(),
  /**
   * Password for the private key.
   */
  privateKeyPass: z.string().optional(),
  /**
   * Signing certificate(s) for the IdP. Can be a single certificate string or an array of certificate strings.
   */
  signingCert: z.union([z.string().optional(), z.array(z.string()).optional()]),
  /**
   * Encryption certificate(s) for the IdP. Can be a single certificate string or an array of certificate strings.
   */
  encryptCert: z.union([z.string().optional(), z.array(z.string()).optional()]),
  /**
   * Supported NameID formats.
   */
  nameIDFormat: z.array(z.string()).optional(),
  /**
   * Single Sign-On service endpoints.
   */
  singleSignOnService: z.array(saml2SsoServiceSchema),
  /**
   * Single Logout service endpoints.
   */
  singleLogoutService: z.array(saml2SsoServiceSchema),
  /**
   * Whether assertions should be encrypted.
   */
  isAssertionEncrypted: z.boolean().optional(),
  /**
   * Private key for decrypting encrypted assertions.
   */
  encPrivateKey: z.string().optional(),
  /**
   * Password for the encryption private key.
   */
  encPrivateKeyPass: z.string().optional(),
  /**
   * Order of message signing operations.
   */
  messageSigningOrder: z.string().optional(),
  /**
   * Whether logout requests should be signed.
   */
  wantLogoutRequestSigned: z.boolean().optional(),
  /**
   * Whether logout responses should be signed.
   */
  wantLogoutResponseSigned: z.boolean().optional(),
  /**
   * Whether authentication requests should be signed.
   */
  wantAuthnRequestsSigned: z.boolean().optional(),
  /**
   * Whether logout request signed responses should be signed.
   */
  wantLogoutRequestSignedResponseSigned: z.boolean().optional(),
  /**
   * Tag prefix mappings for XML namespace handling.
   */
  tagPrefix: z.record(z.string(), z.string()).optional(),
});

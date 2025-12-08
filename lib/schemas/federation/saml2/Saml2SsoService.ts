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
 * Schema for SAML 2.0 SSO (Single Sign-On) service endpoint.
 * Defines a service endpoint with binding and location information.
 */
export const saml2SsoServiceSchema = z.object({
  /**
   * Whether this is the default service endpoint.
   */
  isDefault: z.boolean().optional(),
  /**
   * SAML binding protocol (e.g., "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST").
   */
  Binding: z.string(),
  /**
   * URL location of the service endpoint.
   */
  Location: z.string(),
});

/**
 * Type definition for Saml2SsoService.
 * SSO service endpoint configuration for SAML 2.0.
 */
export type Saml2SsoService = z.infer<typeof saml2SsoServiceSchema>;

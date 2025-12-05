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
 * Schema for SAML 2.0 login response attribute.
 * Defines the structure of an attribute in a SAML 2.0 authentication response.
 */
export const saml2LoginResponseAttributeSchema = z.object({
  /**
   * Name of the attribute.
   */
  name: z.string(),
  /**
   * Format specification for the attribute name.
   */
  nameFormat: z.string(),
  /**
   * XSI type for the attribute value.
   */
  valueXsiType: z.string(),
  /**
   * XML tag name for the attribute value.
   */
  valueTag: z.string(),
  /**
   * XML namespace declaration for xs (XML Schema).
   */
  valueXmlnsXs: z.string().optional(),
  /**
   * XML namespace declaration for xsi (XML Schema Instance).
   */
  valueXmlnsXsi: z.string().optional(),
});

/**
 * Type definition for Saml2LoginResponseAttribute.
 * Attribute structure in SAML 2.0 login responses.
 */
export type Saml2LoginResponseAttribute = z.infer<
  typeof saml2LoginResponseAttributeSchema
>;

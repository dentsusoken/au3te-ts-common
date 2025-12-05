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
import { saml2BaseSAMLTemplateSchema } from './Saml2BaseSAMLTemplate';
import { saml2LoginResponseAttributeSchema } from './Saml2LoginResponseAttribute';
import { saml2LoginResponseAdditionalTemplatesSchema } from './Saml2LoginResponseAdditionalTemplates';

/**
 * Schema for SAML 2.0 login response template.
 * Extends the base SAML template with attribute and additional template configurations.
 */
export const saml2LoginResponseTemplateSchema = saml2BaseSAMLTemplateSchema.extend({
  /**
   * List of attributes to include in the login response.
   */
  attributes: z.array(saml2LoginResponseAttributeSchema).optional(),
  /**
   * Additional templates for customizing response rendering.
   */
  additionalTemplates: saml2LoginResponseAdditionalTemplatesSchema.optional(),
});

/**
 * Type definition for Saml2LoginResponseTemplate.
 * Template configuration for SAML 2.0 login responses.
 */
export type Saml2LoginResponseTemplate = z.infer<typeof saml2LoginResponseTemplateSchema>;

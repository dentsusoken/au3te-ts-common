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
import { saml2AttributeStatementTemplateSchema } from './Saml2AttributeStatementTemplate';
import { saml2AttributeTemplateSchema } from './Saml2AttributeTemplate';

/**
 * Schema for additional templates used in SAML 2.0 login responses.
 * Provides customization options for attribute and attribute statement rendering.
 */
export const saml2LoginResponseAdditionalTemplatesSchema = z.object({
  /**
   * Template for customizing attribute statement rendering.
   */
  attributeStatementTemplate: saml2AttributeStatementTemplateSchema.optional(),
  /**
   * Template for customizing individual attribute rendering.
   */
  attributeTemplate: saml2AttributeTemplateSchema.optional(),
});

/**
 * Type definition for Saml2LoginResponseAdditionalTemplates.
 * Additional template configurations for SAML 2.0 login responses.
 */
export type Saml2LoginResponseAdditionalTemplates = z.infer<
  typeof saml2LoginResponseAdditionalTemplatesSchema
>;

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

/**
 * Schema for SAML 2.0 attribute statement template.
 * Used for customizing attribute statement rendering in SAML responses.
 */
export const saml2AttributeStatementTemplateSchema = saml2BaseSAMLTemplateSchema;

/**
 * Type definition for Saml2AttributeStatementTemplate.
 * Template for rendering SAML 2.0 attribute statements.
 */
export type Saml2AttributeStatementTemplate = z.infer<
  typeof saml2AttributeStatementTemplateSchema
>;

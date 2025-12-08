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
 * Base schema for SAML 2.0 templates.
 * Provides a common structure for SAML document templates.
 */
export const saml2BaseSAMLTemplateSchema = z.object({
  /**
   * Template context string used for rendering SAML documents.
   */
  context: z.string(),
});

/**
 * Type definition for Saml2BaseSAMLTemplate.
 * Base template structure for SAML 2.0 documents.
 */
export type Saml2BaseSAMLTemplate = z.infer<typeof saml2BaseSAMLTemplateSchema>;

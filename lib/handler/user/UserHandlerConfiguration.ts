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

import { GetByCredentials } from './getByCredentials';
import { GetBySubject } from './getBySubject';
import { GetMdocClaimsBySubjectAndDoctype } from './getMdocClaimsBySubjectAndDoctype';

/**
 * Configuration interface for user-related operations in the OpenID Connect context.
 * Provides methods for user authentication, identification, and mobile document (mdoc) claims retrieval.
 *
 * @interface UserHandlerConfiguration
 * @property {GetByCredentials} getByCredentials - Function to authenticate a user using their login credentials
 *                                                (e.g., username/password combination)
 * @property {GetBySubject} getBySubject - Function to retrieve a user by their unique subject identifier
 *                                         as defined in the OpenID Connect specification
 * @property {GetMdocClaimsBySubjectAndDoctype} getMdocClaimsBySubjectAndDoctype - Function to retrieve mobile document (mdoc) claims
 *                                                                                 for a specific user and document type
 * @example
 * const config: UserHandlerConfiguration = {
 *   getByCredentials: async (loginId, password) => { ... },
 *   getBySubject: async (subject) => { ... },
 *   getMdocClaimsBySubjectAndDoctype: async (subject, doctype) => { ... }
 * };
 */
export interface UserHandlerConfiguration {
  getByCredentials: GetByCredentials;
  getBySubject: GetBySubject;
  getMdocClaimsBySubjectAndDoctype: GetMdocClaimsBySubjectAndDoctype;
}

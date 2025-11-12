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

import { User } from '../../schemas/common';
import { GetByCredentials } from './getByCredentials';
import { GetBySubject } from './getBySubject';
import { GetMdocClaimsBySubjectAndDoctype } from './getMdocClaimsBySubjectAndDoctype';

/**
 * Configuration interface for user-related operations in the OpenID Connect context.
 * This interface provides methods for user authentication, identification, and mobile document (mdoc) claims retrieval.
 * It serves as a contract for implementing user management functionality in OpenID Connect and credential issuance flows.
 *
 * @typeParam U - The user type that extends the base User type. Defaults to User.
 *                This allows the configuration to work with extended user types that include
 *                additional properties beyond the base User interface.
 *
 * @typeParam T - A union of User property keys (excluding 'loginId' and 'password') that must be present
 *                in the options parameter of getByCredentials. When T is never (default), the options
 *                parameter in getByCredentials is undefined. When T is specified, all properties in T
 *                must be provided in the options object passed to getByCredentials.
 *
 * @property getByCredentials - Function to authenticate a user using their login credentials
 *                              (e.g., username/password combination). The function signature depends on
 *                              the type parameter T, which determines what additional properties must be
 *                              provided in the options parameter.
 *
 * @property getBySubject - Function to retrieve a user by their unique subject identifier as defined
 *                          in the OpenID Connect specification. The subject is a string that uniquely
 *                          identifies the user within the identity provider's system.
 *
 * @property getMdocClaimsBySubjectAndDoctype - Function to retrieve mobile document (mdoc) claims
 *                                               for a specific user and document type. This is used
 *                                               in credential issuance flows to retrieve user claims
 *                                               that will be included in issued credentials.
 *
 * @example
 * ```typescript
 * // Basic configuration with default types
 * const config: UserHandlerConfiguration = {
 *   getByCredentials: async (loginId, password) => {
 *     return await authenticateUser(loginId, password);
 *   },
 *   getBySubject: async (subject) => {
 *     return await findUserBySubject(subject);
 *   },
 *   getMdocClaimsBySubjectAndDoctype: async (subject, doctype) => {
 *     return await getClaimsForUser(subject, doctype);
 *   }
 * };
 *
 * // Configuration with required options for getByCredentials
 * const configWithOptions: UserHandlerConfiguration<User, 'subject' | 'email'> = {
 *   getByCredentials: async (loginId, password, options) => {
 *     // options.subject and options.email are required here
 *     return await authenticateUser(loginId, password, options);
 *   },
 *   getBySubject: async (subject) => {
 *     return await findUserBySubject(subject);
 *   },
 *   getMdocClaimsBySubjectAndDoctype: async (subject, doctype) => {
 *     return await getClaimsForUser(subject, doctype);
 *   }
 * };
 * ```
 */
export interface UserHandlerConfiguration<
  U extends User = User,
  T extends keyof Omit<U, 'loginId' | 'password'> = never
> {
  getByCredentials: GetByCredentials<U, T>;
  getBySubject: GetBySubject<U>;
  getMdocClaimsBySubjectAndDoctype: GetMdocClaimsBySubjectAndDoctype;
}

/*
 * Copyright (C) 2024 Authlete, Inc.
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

import type { CredentialType } from './types';

/**
 * Check whether the issuable credentials include the requested credential.
 *
 * @param credentialType - The type of credential issuance ('single', 'batch', or 'deferred')
 * @param issuableCredentials - The issuable credentials associated with the access token
 * @param format - The credential format
 * @param requestedCredential - The requested credential
 *
 * @throws {InvalidCredentialRequestException}
 *         The issuable credentials do not include the requested credential,
 *         the content of the requested credential is invalid, or some other
 *         errors.
 */
export type CheckPermissions = (
  credentialType: CredentialType,
  issuableCredentials: Array<Record<string, unknown>>,
  format: string,
  requestedCredential: Record<string, unknown>
) => Promise<void>;

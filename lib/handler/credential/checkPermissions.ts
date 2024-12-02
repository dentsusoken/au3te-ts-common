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

import type { CredentialType } from './types';

/**
 * Parameters for checking credential issuance permissions.
 *
 * @property credentialType - The type of credential issuance ('single', 'batch', or 'deferred')
 * @property issuableCredentials - Array of credential types that the user is allowed to receive
 * @property requestedCredential - The credential request containing the claims to verify
 */
type CheckPermissionsParams = {
  /** The type of credential issuance ('single', 'batch', or 'deferred') */
  credentialType?: CredentialType;
  /** Array of credential types that the user is allowed to receive */
  issuableCredentials: Array<Record<string, unknown>>;
  /** The credential request containing the claims to verify */
  requestedCredential: Record<string, unknown>;
};

/**
 * Checks if the requested credential can be issued based on permissions.
 * Verifies that the access token has sufficient permissions to issue the requested credential.
 *
 * @param params - Parameters for checking permissions
 * @param params.credentialType - The type of credential issuance ('single', 'batch', or 'deferred')
 * @param params.issuableCredentials - Array of credential types that can be issued with the access token
 * @param params.requestedCredential - The credential request to verify permissions for
 * @returns Promise that resolves to the validated credential request if permissions are valid
 * @throws {BadRequestError} If the access token does not have sufficient permissions
 */
export type CheckPermissions = ({
  credentialType,
  issuableCredentials,
  requestedCredential,
}: CheckPermissionsParams) => Promise<Record<string, unknown>>;

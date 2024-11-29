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

import { User } from '../../schemas/common/User';
import { CredentialType } from './types';

/**
 * Parameters for collecting claims to be included in a verifiable credential.
 *
 * @property credentialType - The type of credential issuance ('single', 'batch', or 'deferred')
 * @property user - The user for whom the credential is being issued
 * @property requestedCredential - The credential request containing the claims to collect
 */
type CollectClaimsParams = {
  credentialType?: CredentialType;
  user: User;
  requestedCredential: Record<string, unknown>;
};

/**
 * Collects claims to be included in a verifiable credential.
 *
 * @param {CredentialType} credentialType - The type of credential issuance ('single', 'batch', or 'deferred')
 * @param {User} user - The user for whom the credential is being issued
 * @param {Record<string, unknown>} requestedCredential - The credential request containing the claims to collect
 * @returns {Promise<Record<string, unknown>>} A promise that resolves to an object containing the collected claims
 */
export type CollectClaims = ({
  credentialType,
  user,
  requestedCredential,
}: CollectClaimsParams) => Promise<Record<string, unknown>>;

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

import { CollectClaims } from './collectClaims';
import { CLAIMS, DOCTYPE } from './constants';
import { buildMdocClaims } from './buildMdocClaims';
import { GetMdocClaimsBySubjectAndDoctype } from '../user/getMdocClaimsBySubjectAndDoctype';
import { BadRequestError } from '../BadRequestError';
import type { Claims } from './types';

/**
 * Parameters for creating an mDoc claim collector function.
 */
type CreateMdocCollectClaimsParams = {
  /** Function to retrieve mDoc claims by subject and document type */
  getMdocClaimsBySubjectAndDoctype: GetMdocClaimsBySubjectAndDoctype;
};

/**
 * Creates a function to collect mDoc claims.
 *
 * @param {CreateMdocCollectClaimsParams} params - Parameters for creating the claim collector
 * @returns {CollectClaims} A function that collects mDoc claims
 */
export const createMdocCollectClaims =
  ({
    getMdocClaimsBySubjectAndDoctype,
  }: CreateMdocCollectClaimsParams): CollectClaims =>
  /**
   * Collects mDoc claims for a user and requested credential.
   *
   * @param {Object} params - Parameters for collecting claims
   * @param {User} params.user - The user for whom to collect claims
   * @param {Record<string, unknown>} params.requestedCredential - The requested credential details
   * @returns {Promise<{doctype: string, claims: Claims}>} The collected claims and document type
   * @throws {BadRequestError} If the doctype is missing or no claims are found
   */
  async ({ user, requestedCredential }) => {
    const doctype = requestedCredential[DOCTYPE] as string | undefined;

    if (!doctype) {
      throw new BadRequestError(
        'invalid_credential_request',
        'doctype field is required in requestedCredential'
      );
    }

    const userClaims = await getMdocClaimsBySubjectAndDoctype(
      user.subject,
      doctype
    );

    if (!userClaims) {
      throw new BadRequestError(
        'invalid_credential_request',
        `No mdoc claims found for subject "${user.subject}" and doctype "${doctype}"`
      );
    }

    const claims = await buildMdocClaims(
      userClaims,
      (requestedCredential[CLAIMS] as Claims) || {}
    );

    return { doctype, claims };
  };

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

import { CollectClaims } from '../collectClaims';
import { CLAIMS, DOCTYPE } from '../constants';
import { BuildMdocClaims } from './buildMdocClaims';
import { GetMdocClaimsBySubjectAndDoctype } from '../../user/getMdocClaimsBySubjectAndDoctype';
import { BadRequestError } from '../../BadRequestError';
import type { Claims } from '../types';

/**
 * Parameters for creating an mDoc claim collector function.
 */
type CreateMdocCollectClaimsParams = {
  /** Function to retrieve mDoc claims by subject and document type */
  getMdocClaimsBySubjectAndDoctype: GetMdocClaimsBySubjectAndDoctype;
  /** Function to build mDoc claims */
  buildMdocClaims: BuildMdocClaims;
};

/**
 * Creates a function to collect mDoc claims.
 *
 * @param getMdocClaimsBySubjectAndDoctype - Function to retrieve mDoc claims by subject and document type
 * @param buildMdocClaims - Function to build mDoc claims
 * @returns Function to collect mDoc claims
 */
export const createMdocCollectClaims =
  ({
    getMdocClaimsBySubjectAndDoctype,
    buildMdocClaims,
  }: CreateMdocCollectClaimsParams): CollectClaims =>
  /**
   * Collects mDoc claims for the specified user and requested credential.
   *
   * @param user - The user to collect claims for
   * @param requestedCredential - The requested credential
   * @returns Promise resolving to an object containing doctype and collected claims
   * @throws {BadRequestError} If the requested credential is invalid or claims are not found
   */
  async ({ user, requestedCredential }) => {
    if (!requestedCredential) {
      throw new BadRequestError(
        'invalid_credential_request',
        'requestedCredential is required'
      );
    }

    const doctype = requestedCredential[DOCTYPE] as string;

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

    const requestedClaims = requestedCredential[CLAIMS] as Claims;
    const claims = await buildMdocClaims({
      userClaims,
      requestedClaims,
      doctype,
    });

    return { doctype, claims };
  };

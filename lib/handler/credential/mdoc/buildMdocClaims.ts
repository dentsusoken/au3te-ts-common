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

import { BuildMdocSubClaims } from './buildMdocSubClaims';
import type { Claims } from '../types';
import { BadRequestError } from '../../BadRequestError';

/**
 * Parameters for building mDoc claims.
 */
type BuildMdocClaimsParams = {
  /** Claims provided by the user */
  userClaims: Claims;
  /** Requested claims for the mDoc */
  requestedClaims: Claims | undefined;
  /** Document type of the mDoc */
  doctype: string;
};

/**
 * Function type for building mDoc claims.
 */
export type BuildMdocClaims = ({
  userClaims,
  requestedClaims,
  doctype,
}: BuildMdocClaimsParams) => Promise<Claims>;

/**
 * Parameters for creating a BuildMdocClaims function.
 */
type CreateBuildMdocClaimsParams = {
  /** Function to build mDoc sub-claims */
  buildMdocSubClaims: BuildMdocSubClaims;
};

/**
 * Creates a function to build mDoc claims.
 * @param {BuildMdocSubClaims} buildMdocSubClaims - Function to build mDoc sub-claims
 * @returns {BuildMdocClaims} A function that builds mDoc claims
 */
export const createBuildMdocClaims =
  ({ buildMdocSubClaims }: CreateBuildMdocClaimsParams): BuildMdocClaims =>
  /**
   * Builds mDoc claims by combining user claims with requested claims.
   * @param {Claims} userClaims - Claims provided by the user
   * @param {Claims | undefined} requestedClaims - Requested claims for the mDoc
   * @param {string} doctype - Document type of the mDoc
   * @returns {Promise<Claims>} A Promise that resolves to the built mDoc claims
   */
  async ({
    userClaims,
    requestedClaims,
    doctype,
  }: BuildMdocClaimsParams): Promise<Claims> => {
    const claims: Claims = {};

    if (!requestedClaims || Object.keys(requestedClaims).length === 0) {
      throw new BadRequestError(
        'invalid_credential_request',
        'No requested claims provided'
      );
    }

    Object.entries(requestedClaims).forEach(
      ([namespace, requestedSubClaims]) => {
        if (namespace in userClaims) {
          const userSubClaims = userClaims[namespace];
          claims[namespace] = buildMdocSubClaims({
            userSubClaims: userSubClaims as Claims,
            requestedSubClaims: requestedSubClaims as Claims,
            doctype,
          });
        }
      }
    );

    return claims;
  };

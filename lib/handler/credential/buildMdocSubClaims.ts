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

import { AddMdocDateClaims } from './addMdocDateClaims';
import { Claims } from './types';

/**
 * Parameters for building mDoc sub-claims.
 */
type BuildMdocSubClaimsParams = {
  /** Sub-claims provided by the user */
  userSubClaims: Claims;
  /** Requested sub-claims for the mDoc */
  requestedSubClaims: Claims | undefined;
  /** Document type of the mDoc */
  doctype: string;
};

/**
 * Function type for building mDoc sub-claims.
 */
export type BuildMdocSubClaims = ({
  userSubClaims,
  requestedSubClaims,
  doctype,
}: BuildMdocSubClaimsParams) => Claims;

/**
 * Parameters for creating a BuildMdocSubClaims function.
 */
type CreateBuildMdocSubClaimsParams = {
  /** Function to add date claims to mDoc */
  addMdocDateClaims: AddMdocDateClaims;
};

/**
 * Creates a function to build mDoc sub-claims.
 *
 * @param params - Parameters for creating the function
 * @returns A function that builds mDoc sub-claims
 */
export const createBuildMdocSubClaims =
  ({ addMdocDateClaims }: CreateBuildMdocSubClaimsParams): BuildMdocSubClaims =>
  /**
   * Builds mDoc sub-claims by combining user sub-claims with requested sub-claims.
   *
   * @param params - Parameters for building mDoc sub-claims
   * @returns The built mDoc sub-claims
   */
  ({
    userSubClaims,
    requestedSubClaims,
    doctype,
  }: BuildMdocSubClaimsParams): Claims => {
    const subClaims: Claims = {};

    addMdocDateClaims({ subClaims, requestedSubClaims, doctype });

    if (!requestedSubClaims) {
      return { ...userSubClaims, ...subClaims };
    }

    Object.keys(requestedSubClaims).forEach((claimName) => {
      const claimValue = userSubClaims[claimName];

      if (claimValue !== undefined) {
        subClaims[claimName] = claimValue;
      }
    });

    return subClaims;
  };

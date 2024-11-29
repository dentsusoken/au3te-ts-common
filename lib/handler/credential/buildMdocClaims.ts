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

import { addMdocDateClaims } from './addMdocDateClaims';
import { Claims } from './types';

/**
 * Builds mDoc claims by combining user claims with requested claims.
 *
 * @param userClaims - The claims provided by the user
 * @param requestedClaims - The claims requested for the mDoc
 * @returns A Promise that resolves to the built mDoc claims
 */
export const buildMdocClaims = async (
  userClaims: Claims,
  requestedClaims: Claims | undefined
): Promise<Claims> => {
  if (!requestedClaims || Object.keys(requestedClaims).length === 0) {
    return userClaims;
  }

  const claims: Claims = {};

  Object.entries(requestedClaims).forEach(([namespace, requestedSubClaims]) => {
    if (namespace in userClaims) {
      const userSubClaims = userClaims[namespace];
      claims[namespace] = buildMdocSubClaims(
        userSubClaims as Claims,
        requestedSubClaims as Claims
      );
    }
  });

  return claims;
};

/**
 * Builds mDoc sub-claims by combining user sub-claims with requested sub-claims.
 *
 * @param userSubClaims - The sub-claims provided by the user
 * @param requestedSubClaims - The sub-claims requested for the mDoc
 * @returns The built mDoc sub-claims
 */
export const buildMdocSubClaims = (
  userSubClaims: Claims,
  requestedSubClaims: Claims
): Claims => {
  const subClaims: Claims = {};

  addMdocDateClaims(subClaims, requestedSubClaims);

  Object.keys(requestedSubClaims).forEach((claimName) => {
    const claimValue = userSubClaims[claimName];

    if (claimValue !== undefined) {
      subClaims[claimName] = claimValue;
    }
  });

  return subClaims;
};

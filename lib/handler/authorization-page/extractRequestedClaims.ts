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

import { Pair } from '../../schemas/common/Pair';
import { runCatching } from '@vecrea/oid4vc-core/utils';

/**
 * Represents an object that may contain a purpose.
 */
export type PurposeContainer = {
  purpose?: unknown;
};

/**
 * Represents an object that may contain claims.
 */
export type ClaimsContainer = {
  claims?: Record<string, PurposeContainer>;
};

/**
 * Extracts the purpose from a PurposeContainer object.
 * @param {PurposeContainer} obj - The object containing the purpose.
 * @returns {string|undefined} The purpose as a string if it exists and is a string, otherwise undefined.
 */
export const extractPurpose = (obj: PurposeContainer): string | undefined => {
  const purpose = obj.purpose;

  return purpose && typeof purpose === 'string' ? purpose : undefined;
};

/**
 * Creates a Pair object from a key and a PurposeContainer.
 * @param {string} key - The key for the pair.
 * @param {PurposeContainer} value - The PurposeContainer object.
 * @returns {Pair} A Pair object with the key and extracted purpose.
 */
export const extractClaimNamePurposePair = (
  key: string,
  value: PurposeContainer
): Pair => ({
  key,
  value: extractPurpose(value),
});

/**
 * Extracts requested claims from a ClaimsContainer object.
 * @param {ClaimsContainer} obj - The object containing claims.
 * @returns {Pair[]|undefined} An array of Pair objects representing the claims, or undefined if no claims exist.
 */
export const extractRequestedClaimsFromObject = (
  obj: ClaimsContainer
): Pair[] | undefined => {
  const claims = obj.claims;

  if (!claims) {
    return undefined;
  }

  return Object.entries(claims).map(([key, value]) =>
    extractClaimNamePurposePair(key, value)
  );
};

/**
 * Extracts requested claims from an array of ClaimsContainer objects.
 * @param {ClaimsContainer[]} array - An array of ClaimsContainer objects.
 * @returns {Pair[]|undefined} An array of Pair objects representing all claims from the array, or undefined if no claims exist.
 */
export const extractRequestedClaimsFromArray = (
  array: ClaimsContainer[]
): Pair[] | undefined => {
  const pairs: Pair[] = [];

  array.forEach((obj) => {
    const pairsFromObject = extractRequestedClaimsFromObject(obj);

    if (pairsFromObject) {
      pairs.push(...pairsFromObject);
    }
  });

  return pairs.length > 0 ? pairs : undefined;
};

/**
 * Defines a function type for extracting requested claims from a JSON string.
 * @typedef {function} ExtractRequestedClaims
 * @param {string} [claimsJson] - The JSON string containing claims information.
 * @returns {Pair[]|undefined} An array of Pair objects representing the extracted claims, or undefined if no claims are found.
 */
export type ExtractRequestedClaims = (
  claimsJson?: string
) => Pair[] | undefined;

/**
 * Default implementation of the ExtractRequestedClaims function.
 * @type {ExtractRequestedClaims}
 * @param {string} [claimsJson] - The JSON string containing claims information.
 * @returns {Pair[]|undefined} An array of Pair objects representing the extracted claims, or undefined if no claims are found or an error occurs.
 */
export const defaultExtractRequestedClaims: ExtractRequestedClaims = (
  claimsJson
) => {
  const result = runCatching(() => {
    if (!claimsJson) {
      return undefined;
    }

    const claims = JSON.parse(claimsJson);
    const verifiedClaims = claims.verified_claims;

    if (!verifiedClaims) {
      return undefined;
    }

    if (Array.isArray(verifiedClaims)) {
      return extractRequestedClaimsFromArray(verifiedClaims);
    }

    return extractRequestedClaimsFromObject(verifiedClaims);
  });

  result.onFailure(console.error);

  return result.getOrDefault(undefined);
};

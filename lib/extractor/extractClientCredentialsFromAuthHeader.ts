/*
 * Copyright (C) 2019-2024 Authlete, Inc.
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

import { parseBasicCredentials } from '../utils/basicCredentials';

/**
 * Type representing client credentials.
 *
 * @typedef {Object} ClientCredentials
 * @property {string | undefined} clientId - The client ID.
 * @property {string | undefined} clientSecret - The client secret.
 */
export type ClientCredentials = {
  clientId: string | undefined;
  clientSecret: string | undefined;
};

/**
 * Empty client credentials object.
 *
 * @type {ClientCredentials}
 */
const emptyClientCredentials: ClientCredentials = {
  clientId: undefined,
  clientSecret: undefined,
};

/**
 * Extracts client credentials from the Authorization header.
 *
 * @param {string | undefined} authorization - The value of the Authorization header.
 * @returns {ClientCredentials} The extracted client credentials.
 */
export const extractClientCredentialsFromAuthHeader = (
  authorization: string | undefined
): ClientCredentials => {
  if (!authorization) {
    return { ...emptyClientCredentials };
  }

  const { userId, password } = parseBasicCredentials(authorization);

  return { clientId: userId, clientSecret: password };
};

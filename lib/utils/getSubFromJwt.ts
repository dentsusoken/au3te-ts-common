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

import { base64UrlDecode } from './base64';

/**
 * Extracts the 'sub' claim from a JWT without verifying its signature.
 * This function decodes the JWT and retrieves the 'sub' claim from its payload.
 *
 * @param jwt - The JWT string
 * @returns The value of the 'sub' claim from the JWT payload
 * @throws {Error} If:
 *   - The JWT is missing
 *   - The JWT does not have the correct number of parts
 *   - The 'sub' claim is missing from the payload
 *   - The JWT cannot be parsed
 */
export const getSubFromJwt = async (
  jwt: string | undefined
): Promise<string | undefined> => {
  try {
    if (!jwt) {
      throw new Error('JWT is missing.');
    }

    const parts = jwt.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT does not have the correct number of parts.');
    }

    // Decode payload
    const payloadJson = base64UrlDecode(parts[1]);
    const payload = JSON.parse(payloadJson);

    if (!payload.sub) {
      throw new Error("The 'sub' claim is missing from the JWT payload.");
    }

    return payload.sub;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to parse JWT. Error: ${errorMessage}`);
  }
};

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

import { z } from 'zod';

/**
 * Represents an API client for making HTTP requests.
 * @interface
 */
export interface ApiClient {
  /**
   * The base URL for API requests.
   * @readonly
   */
  readonly baseUrl: string;

  /**
   * The authentication token or credentials.
   * @readonly
   */
  readonly auth: string;

  /**
   * The path for pushing authorization requests.
   * @readonly
   */
  readonly pushAuthorizationRequestPath: string;

  /**
   * The path for authorization.
   * @readonly
   */
  readonly authorizationPath: string;

  /**
   * The path to redirect to in case of authorization failure.
   * @readonly
   */
  readonly authorizationFailPath: string;

  /**
   * The path for authorization issue requests.
   * @readonly
   */
  readonly authorizationIssuePath: string;

  /**
   * The path for token requests.
   * @readonly
   */
  readonly tokenPath: string;

  /**
   * The path for token issue requests.
   * @readonly
   */
  readonly tokenIssuePath: string;

  /**
   * The path for token fail requests.
   * @readonly
   */
  readonly tokenFailPath: string;

  /**
   * The path for token create requests.
   * @readonly
   */
  readonly tokenCreatePath: string;

  /**
   * The path for introspection requests.
   * @readonly
   */
  readonly introspectionPath: string;

  /**
   * The path for service configuration requests.
   * @readonly
   */
  readonly serviceConfigurationPath: string;

  /**
   * The path for credential issuer metadata requests.
   * @readonly
   */
  readonly credentialIssuerMetadataPath: string;

  /**
   * The path for credential single parse requests.
   * @readonly
   */
  readonly credentialSingleParsePath: string;

  /**
   * The path for credential single issue requests.
   * @readonly
   */
  readonly credentialSingleIssuePath: string;

  /**
   * The path for service JWKS requests.
   * @readonly
   */
  readonly serviceJwksPath: string;

  /**
   * The path for credential issuer JWKS requests.
   * @readonly
   */
  readonly credentialIssuerJwksPath: string;

  /**
   * Makes a POST API call to the specified path.
   * @template REQ - The type of the request object.
   * @template RES - The type of the response object.
   * @param {string} path - The API endpoint path.
   * @param {z.ZodType<RES>} schema - The Zod schema for validating the response.
   * @param {REQ} request - The request object.
   * @returns {Promise<RES>} A promise that resolves to the validated response.
   */
  callPostApi<REQ extends object, RES>(
    path: string,
    schema: z.ZodType<RES>,
    request: REQ
  ): Promise<RES>;

  /**
   * Makes a GET API call to the specified path.
   * @template REQ - The type of the request object.
   * @template RES - The type of the response object.
   * @param {string} path - The API endpoint path.
   * @param {z.ZodType<RES>} schema - The Zod schema for validating the response.
   * @param {REQ} request - The request object.
   * @returns {Promise<RES>} A promise that resolves to the validated response.
   */
  callGetApi<REQ extends object, RES>(
    path: string,
    schema: z.ZodType<RES>,
    request: REQ
  ): Promise<RES>;
}

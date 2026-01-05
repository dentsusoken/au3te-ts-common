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
import { ApiClient } from './ApiClient';
import { PostHttpCall } from './PostHttpCall';
import { ApiCall } from './ApiCall';
import { GetHttpCall } from './GetHttpCall';

/**
 * Abstract API client class implementing the ApiClient interface.
 * @abstract
 * @implements {ApiClient}
 */
export abstract class AbstractApiClient implements ApiClient {
  /**
   * Base URL for API requests.
   * @abstract
   * @type {string}
   */
  abstract baseUrl: string;

  /**
   * Authentication token or credentials.
   * @abstract
   * @type {string}
   */
  abstract auth: string;

  /**
   * Path for pushing authorization requests.
   * @abstract
   * @type {string}
   */
  abstract pushAuthorizationRequestPath: string;

  /**
   * Path for authorization.
   * @abstract
   * @type {string}
   */
  abstract authorizationPath: string;

  /**
   * Path for authorization failure redirection.
   * @abstract
   * @type {string}
   */
  abstract authorizationFailPath: string;

  /**
   * Path for authorization issue requests.
   * @abstract
   * @type {string}
   */
  abstract authorizationIssuePath: string;

  /**
   * Path for token requests.
   * @abstract
   * @type {string}
   */
  abstract tokenPath: string;

  /**
   * Path for token issue requests.
   * @abstract
   * @type {string}
   */
  abstract tokenIssuePath: string;

  /**
   * The path for token fail requests.
   * @abstract
   * @type {string}
   */
  abstract tokenFailPath: string;

  /**
   * The path for token create requests.
   * @abstract
   * @type {string}
   */
  abstract tokenCreatePath: string;

  /**
   * The path for introspection requests.
   * @abstract
   * @type {string}
   */
  abstract introspectionPath: string;

  /**
   * The path for service configuration requests
   *
   * @abstract
   * @type {string}
   */
  abstract serviceConfigurationPath: string;

  /**
   * The path for credential issuer metadata requests
   *
   * @abstract
   * @type {string}
   */
  abstract credentialIssuerMetadataPath: string;

  /**
   * The path for credential single parse requests.
   *
   * @abstract
   * @type {string}
   */
  abstract credentialSingleParsePath: string;

  /**
   * The path for credential single issue requests.
   *
   * @abstract
   * @type {string}
   */
  abstract credentialSingleIssuePath: string;

  /**
   * The path for service JWKS requests.
   *
   * @abstract
   * @type {string}
   */
  abstract serviceJwksPath: string;

  /**
   * The path for credential issuer JWKS requests.
   *
   * @abstract
   * @type {string}
   */
  abstract credentialIssuerJwksPath: string;

  /**
   * The path for standard introspection requests.
   *
   * @abstract
   * @type {string}
   */
  abstract standardIntrospectionPath: string;

  /**
   * Makes a POST API call to the specified path.
   * @template REQ - Type of the request object.
   * @template RES - Type of the response object.
   * @param {string} path - API endpoint path.
   * @param {z.ZodType<RES>} schema - Zod schema for validating the response.
   * @param {REQ} request - Request object.
   * @returns {Promise<RES>} Promise resolving to the validated response.
   */
  callPostApi<REQ extends object, RES>(
    path: string,
    schema: z.ZodType<RES>,
    request: REQ
  ): Promise<RES> {
    const httpCall = new PostHttpCall(this.baseUrl, path, this.auth, request);
    const apiCall = new ApiCall(httpCall, schema);

    return apiCall.call();
  }

  /**
   * Makes a GET API call to the specified path.
   * @template REQ - Type of the request object.
   * @template RES - Type of the response object.
   * @param {string} path - API endpoint path.
   * @param {z.ZodType<RES>} schema - Zod schema for validating the response.
   * @param {REQ} request - Request object.
   * @returns {Promise<RES>} Promise resolving to the validated response.
   */
  callGetApi<REQ extends object, RES>(
    path: string,
    schema: z.ZodType<RES>,
    request: REQ
  ): Promise<RES> {
    const httpCall = new GetHttpCall(this.baseUrl, path, this.auth, request);
    const apiCall = new ApiCall(httpCall, schema);

    return apiCall.callGet();
  }
}

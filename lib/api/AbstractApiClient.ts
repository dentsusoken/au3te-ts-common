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
   * The path for the authorization issue endpoint.
   * This abstract property should be implemented by subclasses to provide
   * the specific path for issuing authorizations.
   *
   * @abstract
   * @type {string}
   */
  abstract authorizationIssuePath: string;

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
}
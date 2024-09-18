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
import { AuthleteApi } from './AuthleteApi';
import { PostHttpCall } from './PostHttpCall';
import { ApiCall } from './ApiCall';
import { PushedAuthReqRequest } from '../schemas/par/PushedAuthReqRequest';
import {
  PushedAuthReqResponse,
  pushedAuthReqResponseSchema,
} from '../schemas/par/PushedAuthReqResponse';
import { AuthorizationRequest } from '../schemas/authorization/AuthorizationRequest';
import {
  AuthorizationResponse,
  authorizationResponseSchema,
} from '../schemas/authorization/AuthorizationResponse';

/**
 * Abstract base class for Authlete API implementations.
 *
 * @abstract
 * @implements {AuthleteApi}
 */
export abstract class AbstractAuthleteApi implements AuthleteApi {
  /** @protected @abstract The base URL for API calls */
  protected abstract baseUrl: string;

  /** @protected @abstract The authentication string for API calls */
  protected abstract auth: string;

  /** @protected @abstract The path for push authorization requests */
  protected abstract pushAuthorizationRequestPath: string;

  /** @protected @abstract The path for authorization requests */
  protected abstract authorizationPath: string;

  /**
   * Makes a POST API call to the specified path.
   *
   * @template REQ - The type of the request object
   * @template RES - The type of the response object
   * @param {string} path - The API endpoint path
   * @param {REQ} request - The request object
   * @param {z.ZodType<RES>} schema - The Zod schema for response validation
   * @returns {Promise<RES>} A promise that resolves with the API response
   */
  async callPostApi<REQ extends object, RES>(
    path: string,
    request: REQ,
    schema: z.ZodType<RES>
  ): Promise<RES> {
    const httpCall = new PostHttpCall(this.baseUrl, path, this.auth, request);
    const apiCall = new ApiCall(httpCall, schema);

    return apiCall.call();
  }

  /**
   * Sends a push authorization request.
   *
   * @param {PushedAuthReqRequest} request - The push authorization request
   * @returns {Promise<PushedAuthReqResponse>} A promise that resolves with the push authorization response
   */
  async pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse> {
    return this.callPostApi(
      this.pushAuthorizationRequestPath,
      request,
      pushedAuthReqResponseSchema
    );
  }

  /**
   * Sends an authorization request.
   *
   * @param {AuthorizationRequest} request - The authorization request
   * @returns {Promise<AuthorizationResponse>} A promise that resolves with the authorization response
   */
  async authorization(
    request: AuthorizationRequest
  ): Promise<AuthorizationResponse> {
    return this.callPostApi(
      this.authorizationPath,
      request,
      authorizationResponseSchema
    );
  }
}

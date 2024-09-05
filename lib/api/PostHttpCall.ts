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

import { HttpCall } from './HttpCall';
import { MediaType } from '../utils/mediaType';

/**
 * Represents a POST HTTP call.
 * @implements {HttpCall}
 */
export class PostHttpCall implements HttpCall {
  /**
   * The Request object representing the HTTP POST request to be made.
   *
   * This property is initialized in the constructor and contains all the necessary
   * information for the HTTP request, including the URL, method (POST),
   * headers (Content-Type and Authorization), and the stringified body.
   *
   * @type {Request}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
   */
  request: Request;

  /**
   * Creates a new instance of PostHttpCall.
   *
   * This constructor initializes a POST HTTP request with the given parameters.
   * It constructs the full URL, sets up the request headers including content type and authorization,
   * and prepares the request body by stringifying the provided parameters.
   *
   * @param {string} baseUrl - The base URL of the API endpoint.
   * @param {string} path - The specific path of the API endpoint, to be appended to the base URL.
   * @param {string} auth - The authorization token or string to be included in the request header.
   * @param {object} parameters - An object containing the parameters to be sent in the request body.
   *
   * @throws {TypeError} If any of the parameters are of incorrect type.
   * @throws {Error} If there's an issue constructing the URL or preparing the request.
   *
   * @example
   * const postCall = new PostHttpCall(
   *   'https://api.example.com',
   *   '/users',
   *   'Bearer token123',
   *   { name: 'John Doe', email: 'john@example.com' }
   * );
   */
  constructor(
    protected baseUrl: string,
    protected path: string,
    protected auth: string,
    protected parameters: object
  ) {
    const url = new URL(`${this.baseUrl}${this.path}`);
    const requestInit = {
      method: 'POST',
      headers: {
        'Content-Type': MediaType.APPLICATION_JSON_UTF8,
        Authorization: this.auth,
      },
      body: JSON.stringify(this.parameters),
    };
    this.request = new Request(url, requestInit);
  }

  /**
   * Executes the HTTP POST request.
   * @returns {Promise<Response>} A Promise that resolves to the Response object.
   */
  async call(): Promise<Response> {
    return fetch(this.request);
  }
}

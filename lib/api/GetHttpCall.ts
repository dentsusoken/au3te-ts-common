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
 * Represents a GET HTTP call.
 * @implements {HttpCall}
 */
export class GetHttpCall implements HttpCall {
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
   * Creates a new instance of GetHttpCall.
   * @param {string} baseUrl - The base URL for the request.
   * @param {string} path - The path to append to the base URL.
   * @param {string} auth - The authorization header value.
   * @param {object} parameters - The request parameters to be appended to the URL.
   */
  constructor(
    protected baseUrl: string,
    protected path: string,
    protected auth: string,
    protected parameters: object
  ) {
    const queryParams = Object.entries(this.parameters)
      .map(([key, value]) => {
        const encodedValue =
          typeof value === 'string'
            ? encodeURIComponent(value)
            : encodeURIComponent(JSON.stringify(value));
        return `${encodeURIComponent(key)}=${encodedValue}`;
      })
      .join('&');

    const url = new URL(
      `${this.baseUrl}${this.path}${queryParams ? '?' + queryParams : ''}`
    );
    const requestInit = {
      method: 'GET',
      headers: {
        'Content-Type': MediaType.APPLICATION_JSON_UTF8,
        Authorization: this.auth,
      },
    };
    this.request = new Request(url, requestInit);
  }

  /**
   * Executes the HTTP GET request.
   * @returns {Promise<Response>} A Promise that resolves to the Response object.
   */
  async call(): Promise<Response> {
    return fetch(this.request);
  }
}

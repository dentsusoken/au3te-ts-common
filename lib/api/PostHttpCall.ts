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

/**
 * Represents a POST HTTP call.
 * @implements {HttpCall}
 */
export class PostHttpCall implements HttpCall {
  /**
   * The URL to make the HTTP request to.
   * @type {URL}
   */
  url: URL;

  /**
   * The options for the HTTP request.
   * @type {RequestInit}
   */
  requestInit: RequestInit;

  /**
   * Creates a new instance of PostHttpCall.
   * @param {string} baseUrl - The base URL for the request.
   * @param {string} path - The path to append to the base URL.
   * @param {string} auth - The authorization header value.
   * @param {object} request - The request body to be sent.
   */
  constructor(
    protected baseUrl: string,
    protected path: string,
    protected auth: string,
    protected request: object
  ) {
    this.url = new URL(`${this.baseUrl}${this.path}`);
    this.requestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.auth,
      },
      body: JSON.stringify(this.request),
    };
  }

  /**
   * Executes the HTTP POST request.
   * @returns {Promise<Response>} A Promise that resolves to the Response object.
   */
  async call(): Promise<Response> {
    return fetch(this.url, this.requestInit);
  }
}

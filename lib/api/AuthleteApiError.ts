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

const stringifyResponse = (response?: Response): string => {
  if (!response) {
    return 'undefined';
  }

  const { status, statusText, headers } = response;

  return JSON.stringify({ status, statusText, headers }, undefined, 2);
};

const createMessage = (
  url: URL,
  requestInit: RequestInit,
  cause?: Error,
  response?: Response
): string =>
  `Authlete API failure url: ${url}, requestInit: ${JSON.stringify(
    requestInit,
    undefined,
    2
  )}, cause: ${cause}, response: ${stringifyResponse(response)}`;

export class AuthleteApiError extends Error {
  static {
    this.prototype.name = 'AuthleteApiError';
  }

  constructor(
    public url: URL,
    public requestInit: RequestInit,
    public cause?: Error,
    public response?: Response
  ) {
    super(createMessage(url, requestInit, cause, response));
    console.log('AuthleteApiError response:', this.response);
  }
}

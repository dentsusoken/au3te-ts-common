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

/**
 * HTTP status codes.
 *
 * This object contains constants for standard HTTP status codes as defined in
 * RFC 2616, RFC 6585, and other relevant RFCs.
 *
 * @see https://tools.ietf.org/html/rfc2616
 * @see https://tools.ietf.org/html/rfc6585
 */
export const HttpStatus = {
  /** HTTP status code 200: OK */
  OK: 200,
  /** HTTP status code 201: Created */
  CREATED: 201,
  /** HTTP status code 202: Accepted */
  ACCEPTED: 202,
  /** HTTP status code 204: No Content */
  NO_CONTENT: 204,
  /** HTTP status code 205: Reset Content */
  RESET_CONTENT: 205,
  /** HTTP status code 206: Partial Content */
  PARTIAL_CONTENT: 206,
  /** HTTP status code 301: Moved Permanently */
  MOVED_PERMANENTLY: 301,
  /** HTTP status code 302: Found */
  FOUND: 302,
  /** HTTP status code 303: See Other */
  SEE_OTHER: 303,
  /** HTTP status code 304: Not Modified */
  NOT_MODIFIED: 304,
  /** HTTP status code 305: Use Proxy */
  USE_PROXY: 305,
  /** HTTP status code 307: Temporary Redirect */
  TEMPORARY_REDIRECT: 307,
  /** HTTP status code 400: Bad Request */
  BAD_REQUEST: 400,
  /** HTTP status code 401: Unauthorized */
  UNAUTHORIZED: 401,
  /** HTTP status code 402: Payment Required */
  PAYMENT_REQUIRED: 402,
  /** HTTP status code 403: Forbidden */
  FORBIDDEN: 403,
  /** HTTP status code 404: Not Found */
  NOT_FOUND: 404,
  /** HTTP status code 405: Method Not Allowed */
  METHOD_NOT_ALLOWED: 405,
  /** HTTP status code 406: Not Acceptable */
  NOT_ACCEPTABLE: 406,
  /** HTTP status code 407: Proxy Authentication Required */
  PROXY_AUTHENTICATION_REQUIRED: 407,
  /** HTTP status code 408: Request Timeout */
  REQUEST_TIMEOUT: 408,
  /** HTTP status code 409: Conflict */
  CONFLICT: 409,
  /** HTTP status code 410: Gone */
  GONE: 410,
  /** HTTP status code 411: Length Required */
  LENGTH_REQUIRED: 411,
  /** HTTP status code 412: Precondition Failed */
  PRECONDITION_FAILED: 412,
  /** HTTP status code 413: Request Entity Too Large */
  REQUEST_ENTITY_TOO_LARGE: 413,
  /** HTTP status code 414: Request-URI Too Long */
  REQUEST_URI_TOO_LONG: 414,
  /** HTTP status code 415: Unsupported Media Type */
  UNSUPPORTED_MEDIA_TYPE: 415,
  /** HTTP status code 416: Requested Range Not Satisfiable */
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  /** HTTP status code 417: Expectation Failed */
  EXPECTATION_FAILED: 417,
  /** HTTP status code 500: Internal Server Error */
  INTERNAL_SERVER_ERROR: 500,
  /** HTTP status code 501: Not Implemented */
  NOT_IMPLEMENTED: 501,
  /** HTTP status code 502: Bad Gateway */
  BAD_GATEWAY: 502,
  /** HTTP status code 503: Service Unavailable */
  SERVICE_UNAVAILABLE: 503,
  /** HTTP status code 504: Gateway Timeout */
  GATEWAY_TIMEOUT: 504,
  /** HTTP status code 505: HTTP Version Not Supported */
  HTTP_VERSION_NOT_SUPPORTED: 505,
} as const;

/**
 * Type representing all possible HTTP status codes.
 */
export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

/**
 * Returns the standard HTTP status text for a given HTTP status code.
 *
 * This function takes an HTTP status code as defined in the HttpStatus enum
 * and returns the corresponding standard status text.
 *
 * @param {HttpStatus} status - The HTTP status code.
 * @returns {string} The standard status text corresponding to the given status code.
 *
 * @example
 * const statusText = getStatusText(HttpStatus.OK);
 * console.log(statusText); // Outputs: "OK"
 *
 * @example
 * const statusText = getStatusText(HttpStatus.NOT_FOUND);
 * console.log(statusText); // Outputs: "Not Found"
 *
 * @throws {Error} Will throw an error if an undefined status code is provided.
 */
export const getStatusText = (status: HttpStatus): string => {
  switch (status) {
    case HttpStatus.OK:
      return 'OK';
    case HttpStatus.CREATED:
      return 'Created';
    case HttpStatus.ACCEPTED:
      return 'Accepted';
    case HttpStatus.NO_CONTENT:
      return 'No Content';
    case HttpStatus.RESET_CONTENT:
      return 'Reset Content';
    case HttpStatus.PARTIAL_CONTENT:
      return 'Partial Content';
    case HttpStatus.MOVED_PERMANENTLY:
      return 'Moved Permanently';
    case HttpStatus.FOUND:
      return 'Found';
    case HttpStatus.SEE_OTHER:
      return 'See Other';
    case HttpStatus.NOT_MODIFIED:
      return 'Not Modified';
    case HttpStatus.USE_PROXY:
      return 'Use Proxy';
    case HttpStatus.TEMPORARY_REDIRECT:
      return 'Temporary Redirect';
    case HttpStatus.BAD_REQUEST:
      return 'Bad Request';
    case HttpStatus.UNAUTHORIZED:
      return 'Unauthorized';
    case HttpStatus.PAYMENT_REQUIRED:
      return 'Payment Required';
    case HttpStatus.FORBIDDEN:
      return 'Forbidden';
    case HttpStatus.NOT_FOUND:
      return 'Not Found';
    case HttpStatus.METHOD_NOT_ALLOWED:
      return 'Method Not Allowed';
    case HttpStatus.NOT_ACCEPTABLE:
      return 'Not Acceptable';
    case HttpStatus.PROXY_AUTHENTICATION_REQUIRED:
      return 'Proxy Authentication Required';
    case HttpStatus.REQUEST_TIMEOUT:
      return 'Request Timeout';
    case HttpStatus.CONFLICT:
      return 'Conflict';
    case HttpStatus.GONE:
      return 'Gone';
    case HttpStatus.LENGTH_REQUIRED:
      return 'Length Required';
    case HttpStatus.PRECONDITION_FAILED:
      return 'Precondition Failed';
    case HttpStatus.REQUEST_ENTITY_TOO_LARGE:
      return 'Request Entity Too Large';
    case HttpStatus.REQUEST_URI_TOO_LONG:
      return 'Request-URI Too Long';
    case HttpStatus.UNSUPPORTED_MEDIA_TYPE:
      return 'Unsupported Media Type';
    case HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE:
      return 'Requested Range Not Satisfiable';
    case HttpStatus.EXPECTATION_FAILED:
      return 'Expectation Failed';
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return 'Internal Server Error';
    case HttpStatus.NOT_IMPLEMENTED:
      return 'Not Implemented';
    case HttpStatus.BAD_GATEWAY:
      return 'Bad Gateway';
    case HttpStatus.SERVICE_UNAVAILABLE:
      return 'Service Unavailable';
    case HttpStatus.GATEWAY_TIMEOUT:
      return 'Gateway Timeout';
    case HttpStatus.HTTP_VERSION_NOT_SUPPORTED:
      return 'HTTP Version Not Supported';
  }
};

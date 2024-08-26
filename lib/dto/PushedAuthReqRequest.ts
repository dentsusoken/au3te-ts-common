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
 * Request to Authlete's /api/pushed_auth_req API.
 */
export class PushedAuthReqRequest {
  /**
   * Request parameters that the pushed authorization request endpoint of the
   * authorization server implementation received from the client application.
   * Its format is application/x-www-form-urlencoded.
   */
  parameters?: string;

  /**
   * The client ID extracted from the Authorization header of the request
   * to the pushed authorization request endpoint.
   */
  clientId?: string;

  /**
   * The client secret extracted from the Authorization header of the
   * request to the pushed authorization request endpoint.
   */
  clientSecret?: string;

  /**
   * The client certificate used in the TLS connection between the client
   * application and the pushed authorization request endpoint of the
   * authorization server.
   */
  clientCertificate?: string;

  /**
   * The client certificate path presented by the client during client
   * authentication. Each element is a string in PEM format.
   */
  clientCertificatePath?: string[];

  /**
   * The value of the DPoP HTTP header.
   */
  dpop?: string;

  /**
   * The HTTP method of the PAR request. In normal cases, the value is "POST".
   * When this parameter is omitted, "POST" is used as the default value.
   */
  htm?: string;

  /**
   * The URL of the PAR endpoint, without query or path components. If omitted,
   * the pushedAuthReqEndpoint property of Service is used as the default value.
   */
  htu?: string;

  /**
   * The flag indicating whether to require the DPoP proof JWT to include
   * the nonce claim.
   */
  dpopNonceRequired?: boolean;
}

/*
 * Copyright (C) 2014-2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { z } from 'zod';
import { apiResponseSchema } from '../common/ApiResponse';
import { propertySchema } from '../common/Property';
import { pairSchema } from '../common/Pair';
import { scopeSchema } from '../common/Scope';
import { authzDetailsSchema } from '../common/AuthzDetails';
import { grantSchema } from '../common/Grant';

/**
 * Grant type values as defined in OAuth 2.0 and its extensions.
 */
const grantTypeSchema = z.enum([
  'AUTHORIZATION_CODE',
  'REFRESH_TOKEN',
  'CLIENT_CREDENTIALS',
  'PASSWORD',
  'JWT_BEARER',
  'SAML2_BEARER',
]);

/**
 * Action values for the introspection API response.
 */
const actionSchema = z.enum([
  /**
   * The request from the service implementation was wrong or
   * an error occurred in Authlete. The service implementation
   * should return "500 Internal Server Error" to the client application.
   */
  'INTERNAL_SERVER_ERROR',

  /**
   * The request does not contain an access token. The service
   * implementation should return "400 Bad Request" to the client
   * application.
   */
  'BAD_REQUEST',

  /**
   * The access token does not exist or has expired. The service
   * implementation should return "401 Unauthorized" to the client
   * application.
   */
  'UNAUTHORIZED',

  /**
   * The access token does not cover the required scopes. The
   * service implementation should return "403 Forbidden" to the
   * client application.
   */
  'FORBIDDEN',

  /**
   * The access token is valid. The service implementation should
   * return the protected resource to the client application.
   */
  'OK',
]);

/**
 * Schema for the response from Authlete's /auth/introspection API.
 *
 * Authlete's /auth/introspection API returns JSON which can be mapped to this type.
 * The service implementation should retrieve the value of "action" from the response
 * and take the following steps according to the value:
 *
 * When the value of "action" is "INTERNAL_SERVER_ERROR":
 * It means that the request from the service implementation was wrong or that an
 * error occurred in Authlete. In either case, from the viewpoint of the client
 * application, it is an error on the server side. Therefore, the service
 * implementation should generate a response to the client application with the
 * HTTP status of "500 Internal Server Error".
 *
 * The responseContent field returns a string which describes the error in the
 * format of RFC 6750 (OAuth 2.0 Bearer Token Usage), so if the protected resource
 * wants to return an error response in compliance with RFC 6750, the string can
 * be used as the value of WWW-Authenticate header.
 *
 * Example response:
 * ```http
 * HTTP/1.1 500 Internal Server Error
 * WWW-Authenticate: (The value returned from responseContent)
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * When the value of "action" is "BAD_REQUEST":
 * It means that the request from the client application does not contain an access
 * token. The service implementation should return "400 Bad Request" to the client
 * application.
 *
 * Example response:
 * ```http
 * HTTP/1.1 400 Bad Request
 * WWW-Authenticate: (The value returned from responseContent)
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * When the value of "action" is "UNAUTHORIZED":
 * It means that the access token does not exist or has expired. Or the client
 * application associated with the access token does not exist any longer.
 * The service implementation should return "401 Unauthorized" to the client
 * application.
 *
 * Example response:
 * ```http
 * HTTP/1.1 401 Unauthorized
 * WWW-Authenticate: (The value returned from responseContent)
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * When the value of "action" is "FORBIDDEN":
 * It means that the access token does not cover the required scopes or that the
 * subject associated with the access token is different from the subject contained
 * in the request. The service implementation should return "403 Forbidden" to the
 * client application.
 *
 * Example response:
 * ```http
 * HTTP/1.1 403 Forbidden
 * WWW-Authenticate: (The value returned from responseContent)
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * When the value of "action" is "OK":
 * It means that the access token is valid (= exists and has not expired).
 * The service implementation is supposed to return the protected resource
 * to the client application.
 *
 * HTTP Message Signatures:
 * If the responseSigningRequired response parameter from the API is true,
 * the response from the protected resource endpoint must contain the Signature
 * and Signature-Input HTTP fields (RFC 9421 HTTP Message Signatures) that comply
 * with FAPI 2.0 Message Signing.
 *
 * DPoP Nonce (Authlete 3.0 onwards):
 * Since version 3.0, Authlete recognizes the nonce claim in DPoP proof JWTs.
 * If the presented access token is bound to a public key through the DPoP mechanism,
 * and if the nonce claim is required, the Authlete API checks whether the nonce
 * claim in the presented DPoP proof JWT is identical to the expected value.
 *
 * If the dpopNonce response parameter from the API is not null, its value is the
 * expected nonce value for DPoP proof JWT. The expected value needs to be conveyed
 * to the client application as the value of the DPoP-Nonce HTTP header:
 *
 * ```http
 * DPoP-Nonce: (The value returned from dpopNonce)
 * ```
 *
 * @see https://www.rfc-editor.org/rfc/rfc6750.html
 *      RFC 6750 The OAuth 2.0 Authorization Framework: Bearer Token Usage
 *
 * @see https://www.rfc-editor.org/rfc/rfc7662.html
 *      RFC 7662 OAuth 2.0 Token Introspection
 *
 * @see https://www.rfc-editor.org/rfc/rfc9421.html
 *      RFC 9421 HTTP Message Signatures
 *
 * @see https://www.rfc-editor.org/rfc/rfc9449.html
 *      RFC 9449 OAuth 2.0 Demonstrating Proof of Possession (DPoP)
 *
 * @see https://openid.bitbucket.io/fapi/fapi-2_0-message-signing.html
 *      FAPI 2.0 Message Signing
 */
export const introspectionResponseSchema = apiResponseSchema.extend({
  /**
   * The next action the service implementation should take.
   */
  action: actionSchema,

  /**
   * The client ID.
   */
  clientId: z.number(),

  /**
   * Resource owner's user account.
   *
   * This field is null if the access token was generated by Client Credentials
   * Grant, which means that the access token is not associated with any specific
   * end-user.
   */
  subject: z.string().nullish(),

  /**
   * Scopes covered by the access token.
   */
  scopes: z.array(z.string()).nullish(),

  /**
   * Scope details.
   *
   * The scopes property is a list of scope names. The property does not hold
   * information about scope attributes. This scopeDetails property was newly
   * created to convey information about scope attributes.
   *
   * @since Authlete 2.3.0
   */
  scopeDetails: z.array(scopeSchema).nullish(),

  /**
   * Flag to indicate whether the access token exists.
   */
  existent: z.boolean().nullish(),

  /**
   * Flag to indicate whether the access token is usable
   * (= exists and has not expired).
   */
  usable: z.boolean().nullish(),

  /**
   * Flag to indicate whether the access token covers the required scopes.
   */
  sufficient: z.boolean().nullish(),

  /**
   * Flag to indicate whether the access token is refreshable.
   */
  refreshable: z.boolean().nullish(),

  /**
   * Entity body of the response to the client.
   */
  responseContent: z.string().nullish(),

  /**
   * The time at which the access token expires in milliseconds
   * since the Unix epoch (1970-01-01).
   */
  expiresAt: z.number().nullish(),

  /**
   * Extra properties associated with the access token.
   */
  properties: z.array(propertySchema).nullish(),

  /**
   * The client ID alias when the authorization request or the token request
   * for the access token was made.
   */
  clientIdAlias: z.string().nullish(),

  /**
   * Flag which indicates whether the client ID alias was used when the
   * authorization request or the token request for the access token was made.
   */
  clientIdAliasUsed: z.boolean().nullish(),

  /**
   * The entity ID of the client.
   *
   * @since Authlete 2.3
   */
  clientEntityId: z.string().url().nullish(),

  /**
   * Flag which indicates whether the entity ID of the client was used when
   * the request for the access token was made.
   *
   * @since Authlete 2.3
   */
  clientEntityIdUsed: z.boolean().nullish(),

  /**
   * Confirmation hash for MTLS-bound access tokens.
   * Currently only the S256 type is supported and is assumed.
   */
  certificateThumbprint: z.string().nullish(),

  /**
   * The target resources specified by the initial request.
   */
  resources: z.array(z.string().url()).nullish(),

  /**
   * The target resources of the access token.
   */
  accessTokenResources: z.array(z.string().url()).nullish(),

  /**
   * The content of the "authorization_details" request parameter which was
   * included in the request that obtained the token.
   */
  authorizationDetails: authzDetailsSchema.nullish(),

  /**
   * Grant ID that this access token is tied to.
   *
   * @since Authlete 2.3.0
   */
  grantId: z.string().nullish(),

  /**
   * Grant that this access token has inherited.
   *
   * @since Authlete 2.3.0
   */
  grant: grantSchema.nullish(),

  /**
   * Claims that the user has consented for the client application to know.
   *
   * @since Authlete 2.3.0
   */
  consentedClaims: z.array(z.string()).nullish(),

  /**
   * The attributes of the service that the client belongs to.
   *
   * @since Authlete 2.2.3
   */
  serviceAttributes: z.array(pairSchema).nullish(),

  /**
   * The attributes of the client that the access token has been issued to.
   *
   * @since Authlete 2.2.3
   */
  clientAttributes: z.array(pairSchema).nullish(),

  /**
   * Flag that indicates whether the token is for an external attachment.
   *
   * @since Authlete 2.3.0
   */
  forExternalAttachment: z.boolean().nullish(),

  /**
   * The Authentication Context Class Reference of the user authentication
   * that the authorization server performed during the course of issuing
   * the access token.
   *
   * @since Authlete 2.3
   */
  acr: z.string().nullish(),

  /**
   * The time when the user authentication was performed during the course
   * of issuing the access token.
   *
   * @since Authlete 2.3
   */
  authTime: z.number().nullish(),

  /**
   * The grant type that was used for the issuance of the access token.
   *
   * @since Authlete 2.3
   */
  grantType: grantTypeSchema.nullish(),

  /**
   * The flag indicating whether the token is for credential issuance.
   *
   * @since Authlete 3.0
   */
  forCredentialIssuance: z.boolean().nullish(),

  /**
   * The c_nonce.
   *
   * @since Authlete 3.0
   */
  cnonce: z.string().nullish(),

  /**
   * The time at which the c_nonce expires.
   *
   * @since Authlete 3.0
   */
  cnonceExpiresAt: z.number().nullish(),

  /**
   * The credentials that can be obtained by presenting the access token.
   *
   * @since Authlete 3.0
   */
  issuableCredentials: z.string().nullish(),

  /**
   * The expected nonce value for DPoP proof JWT, which should be used
   * as the value of the DPoP-Nonce HTTP header.
   *
   * @since Authlete 3.0
   */
  dpopNonce: z.string().nullish(),

  /**
   * The flag indicating whether the HTTP response from the protected
   * resource endpoint must include an HTTP message signature in
   * compliance with FAPI 2.0 Message Signing.
   *
   * @since Authlete 2.3.27
   */
  responseSigningRequired: z.boolean().nullish(),
});

/**
 * Type definition for the response from Authlete's /auth/introspection API.
 */
export type IntrospectionResponse = z.input<typeof introspectionResponseSchema>;

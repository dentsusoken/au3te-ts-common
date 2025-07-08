/*
 * Copyright (C) 2021-2023 Authlete, Inc.
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

/**
 * Dynamic Scope.
 *
 * @description
 * Concept of Parameterized Scopes:
 *
 * "Scope" is a technical term in the context of OAuth 2.0. It represents
 * a permission which is necessary to access protected resources.
 *
 * When a client application asks an authorization server to issue an access
 * token, the client application includes a list of scopes in the request.
 * If the specified scopes are supported by the server, the server issues an
 * access token that has the scopes.
 *
 * If unsupported scopes are included in a request, the server ignores such
 * scopes. As a result, the access token which will be issued based on the
 * request will include supported scopes only. For example, if a request
 * including "scope1" and "scope2" is sent to a server that
 * supports "scope1" only, the issued access token will include
 * "scope1" only.
 *
 * @typedef {Object} DynamicScope
 * @property {string} name - The name of the dynamic scope.
 * @property {string} [description] - A description of the dynamic scope.
 *
 * @see {@link https://tools.ietf.org/html/rfc6749#section-3.3|OAuth 2.0 Scope}
 *
 * If a server supports OpenID Connect Discovery 1.0 or RFC 8414 OAuth 2.0 Authorization Server Metadata,
 * it is highly likely that the discovery document advertised by the server includes the
 * "scopes_supported" server metadata which is a list of scopes supported by the server.
 *
 * RFC 6749 The OAuth 2.0 Authorization Framework, the core specification of OAuth 2.0,
 * restricts the range of characters which are allowed to be used in scope
 * strings. To be concrete, the range is printable ASCII letters except SPACE
 * (U+0020), QUOTATION MARK (U+0022), REVERSE SOLIDUS (U+005C) and DELETE
 * (U+007F).
 *
 * On the other hand, the specification does not define scope strings themselves
 * and leaves them to authorization server implementations. Some implementations
 * use simple English words such as "publish_video" and
 * "read_insights" (from Facebook Permissions Reference), others may use URIs such as
 * "https://www.googleapis.com/auth/youtube" (from Google OAuth 2.0 Scopes for Google APIs).
 * Of course, other styles also may exist.
 *
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html|OpenID Connect Discovery 1.0}
 * @see {@link https://www.rfc-editor.org/rfc/rfc8414.html|RFC 8414 OAuth 2.0 Authorization Server Metadata}
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html|RFC 6749 The OAuth 2.0 Authorization Framework}
 * @see {@link https://developers.facebook.com/docs/permissions/reference/|Facebook Permissions Reference}
 * @see {@link https://developers.google.com/identity/protocols/oauth2/scopes|Google OAuth 2.0 Scopes for Google APIs}
 *
 * And, in the history, some deployments invented their own local rules to
 * embed variable information into scope strings. For instance, like
 * "payment:36fc67776" where the part "payment:" is a fixed
 * text but the part "36fc67776" is variable. This approach is often
 * called "parameterized scopes".
 *
 * As you can easily imagine, rules for parameterized scopes can be invented
 * in various ways. A colon (:) is used as a delimiter in the example
 * above, but it does not necessarily have to be so. Another local rule may
 * introduce an asterisk (*) to make it represent all options in the
 * field like "*:view". Yet another rule may become more complex like
 * "printer:print,manage:lp7200".
 *
 * After years of experience and discussion, experts in the OAuth community
 * reached a consensus that "parameterized scopes" is not a good approach.
 * And the community has developed a new specification titled "RFC 9396 OAuth 2.0 Rich
 * Authorization Requests" (RAR). The specification introduces a new
 * parameter "authorization_details" by which client applications
 * can express variable information in a flexible way. Therefore, new
 * deployments should use RAR instead of inventing yet another rule for
 * parameterized scopes. Authlete 2.2 and onwards support RAR.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9396.html|RFC 9396 OAuth 2.0 Rich Authorization Requests}
 *
 * However, it is not always possible to use RAR, and people have to use
 * parameterized scopes. For example, because Open Banking Brasil Financial-grade API Security Profile 1.0
 * Implementers Draft 1 has introduced "Dynamic Consent Scope", financial
 * institutions in Brazil must support the dynamic scope, a kind of
 * parameterized scopes.
 *
 * A big problem here is that most vendor solutions for generic purposes do
 * not support local rules of parameterized scopes off the shelf. One of the
 * authors of the RAR specification mentioned the problem in his blog post as follows:
 *
 * "Open Banking implementation experience has shown that this kind of
 * dynamically parameterized authorization process requires changes to most
 * existing OAuth implementations."
 *
 * @see {@link https://openbanking-brasil.github.io/specs-seguranca/open-banking-brasil-financial-api-1_ID1.html|Open Banking Brasil Financial-grade API Security Profile 1.0 Implementers Draft 1}
 * @see {@link https://medium.com/oauth-2/transaction-authorization-or-why-we-need-to-re-think-oauth-scopes-2326e2038948|Blog post on Transaction Authorization}
 *
 * Vendors that want to enter local markets may fork their products to support
 * local rules of parameterized scopes, but forking is a burden on vendors.
 *
 * Authlete's Approach:
 *
 * Authlete has a mechanism by which each scope can have scope attributes,
 * which are arbitrary key-value pairs. Developers can utilize scope attributes
 * for their own purposes but must keep in mind that some keys such as
 * "fapi" and "access_token.duration" have special meanings
 * in Authlete.
 *
 * To cover most possible patterns of local rules of parameterized scopes,
 * Authlete has defined a new key, "regex". The value of a "regex"
 * attribute should be a regular expression which matches a scope
 * string that may include dynamic values. Authlete uses regular expressions
 * defined by "regex" attributes to check whether requested scopes
 * are supported or not.
 *
 * For example, suppose that the server supports "consent" scope and
 * the scope has an "regex" attribute whose value is
 * "^consent:.+$". In this case, the server accepts
 * "consent:urn:bancoex:C1DD33123" as a valid scope.
 *
 * Responses from some Authlete APIs (e.g. /auth/authorization
 * API) include information about scopes as an array of Scope.
 * However, dynamic scopes are not included in the array. Instead, they are
 * listed in a separate array named "dynamicScopes" whose elements
 * can be mapped to this class, DynamicScope.
 *
 * For example, if the value of the "scope" request parameter of an
 * authorization request is "email consent:urn:bancoex:C1DD33123",
 * the JSON response from the /auth/authorization API will include
 * the "dynamicScopes" array and the "scopes" array like below.
 *
 * @see {@link https://docs.authlete.com/#auth-authorization-api|/auth/authorization API}
 * @see {@link Scope}
 *
 * Example of dynamic scopes and regular scopes in an API response:
 *
 * @example
 * {
 *   "dynamicScopes": [
 *     {
 *       "name": "consent",
 *       "value": "consent:urn:bancoex:C1DD33123"
 *     }
 *   ],
 *   "scopes": [
 *     {
 *       "defaultEntry": false,
 *       "description": "(abbrev)",
 *       "descriptions": [
 *         {
 *           "tag": "en",
 *           "value": "(abbrev)"
 *         },
 *         {
 *           "tag": "ja",
 *           "value": "(abbrev)"
 *         }
 *       ],
 *       "name": "email"
 *     }
 *   ]
 * }
 *
 * Note that in the array of the "dynamicScopes" array, scope strings
 * specified in the "scope" request parameter are set in the
 * "value" field. On the other hand, the "name" field of
 * DynamicScope holds the name of the scope. The scope name will
 * appear in the discovery document like below.
 *
 * @example
 * {
 *   "scopes_supported": [
 *     "address",
 *     "email",
 *     "openid",
 *     "offline_access",
 *     "phone",
 *     "profile",
 *     "consent"
 *   ]
 * }
 *
 * This "Dynamic Scope" feature is available since Authlete 2.2.9.
 *
 * @since 2.92
 */

import { z } from 'zod';

/**
 * Schema for a dynamic scope.
 *
 * @type {z.ZodType<DynamicScope>}
 */
export const dynamicScopeSchema = z.object({
  name: z.string().nullish(),
  value: z.string().nullish(),
});

/**
 * Represents a dynamic scope.
 *
 * @typedef {Object} DynamicScope
 * @property {string|undefined} [name] - The name of the dynamic scope.
 * @property {string|undefined} [value] - The value of the dynamic scope.
 */
export type DynamicScope = z.input<typeof dynamicScopeSchema>;

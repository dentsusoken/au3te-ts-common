/*
 * Copyright (C) 2014-2023 Authlete, Inc.
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
 * Response from Authlete's `/auth/authorization` API.
 *
 * Note: In the description below, "authorization server"
 * is always used even where "OpenID provider" should be used.
 *
 * Authlete's `/auth/authorization` API returns JSON which can be
 * mapped to this object. The authorization server implementation
 * should retrieve the value of "action" from the response and
 * take the following steps according to the value.
 *
 * INTERNAL_SERVER_ERROR:
 * When the value of "action" is "INTERNAL_SERVER_ERROR",
 * it means that the request from the authorization server implementation
 * was wrong or that an error occurred in Authlete.
 *
 * In either case, from the viewpoint of the client application, it
 * is an error on the server side. Therefore, the authorization server
 * implementation should generate a response to the client application
 * with the HTTP status of "500 Internal Server Error". Authlete
 * recommends "application/json" as the content type although
 * OAuth 2.0 specification does not mention the format of the error
 * response when the redirect URI is not usable.
 *
 * The `responseContent` field returns a JSON string which
 * describes the error, so it can be used as the entity body of the response.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application.
 *
 * ```
 * HTTP/1.1 500 Internal Server Error
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value of the responseContent field)
 * ```
 *
 * BAD_REQUEST:
 * When the value of "action" is "BAD_REQUEST", it means
 * that the request from the client application is invalid.
 *
 * The HTTP status of the response returned to the client application should
 * be "400 Bad Request" and Authlete recommends "application/json"
 * as the content type although OAuth 2.0 specification does not mention
 * the format of the error response when the redirect URI is not usable.
 *
 * The `responseContent` field returns a JSON string which describes the error,
 * so it can be used as the entity body of the response.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application.
 *
 * ```
 * HTTP/1.1 400 Bad Request
 * Content-Type: application/json
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value of the responseContent field)
 * ```
 *
 * LOCATION:
 * When the value of "action" is "LOCATION", it means
 * that the request from the client application is invalid but the
 * redirect URI to which the error should be reported has been determined.
 *
 * The HTTP status of the response returned to the client application should
 * be "302 Found" and "Location" header must have a redirect
 * URI with the "error" parameter.
 *
 * The `responseContent` field returns the redirect URI which has the
 * "error" parameter, so it can be used as the value of "Location"
 * header.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application.
 *
 * ```
 * HTTP/1.1 302 Found
 * Location: (The value of the responseContent field)
 * Cache-Control: no-store
 * Pragma: no-cache
 * ```
 *
 * FORM:
 * When the value of "action" is "FORM", it means
 * that the request from the client application is invalid but the
 * redirect URI to which the error should be reported has been determined,
 * and that the request contains response_mode=form_post as is
 * defined in "OAuth 2.0 Form Post Response Mode".
 *
 * The HTTP status of the response returned to the client application should
 * be "200 OK" and the content type should be "text/html;charset=UTF-8".
 *
 * The `responseContent` field returns an HTML which satisfies the requirements
 * of response_mode=form_post, so it can be used as the entity body
 * of the response.
 *
 * The following illustrates the response which the authorization server
 * implementation should generate and return to the client application.
 *
 * ```
 * HTTP/1.1 200 OK
 * Content-Type: text/html;charset=UTF-8
 * Cache-Control: no-store
 * Pragma: no-cache
 *
 * (The value of the responseContent field)
 * ```
 *
 * @see {@link https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html|OAuth 2.0 Form Post Response Mode}
 *
 * NO_INTERACTION:
 * When the value of "action" is "NO_INTERACTION", it means
 * that the request from the client application has no problem and requires
 * the authorization server to process the request without displaying any
 * user interface for authentication and/or consent. This happens when the
 * request contains prompt=none.
 *
 * The authorization server implementation must follow the following steps.
 *
 * @property {string} action - The action to be taken by the authorization server.
 *
 * [END-USER AUTHENTICATION]
 * Check whether an end-user has already logged in. If an end-user has
 * logged in, go to the next step ([MAX_AGE]). Otherwise, call Authlete's
 * `/auth/authorization/fail` API with `reason=NOT_LOGGED_IN` and use
 * the response from the API to generate a response to the client
 * application.
 *
 * @typedef {Object} AuthorizationFailRequest
 * @property {string} reason - The reason for the authorization failure.
 * @property {string} reason.NOT_LOGGED_IN - Indicates that the end-user is not logged in.
 *
 * [MAX_AGE]
 * Get the value of the max age from the `maxAge` field. The value
 * represents the maximum authentication age which has come from
 * "max_age" request parameter or "default_max_age" configuration
 * parameter of the client application. If the value is 0, go to the next
 * step ([SUBJECT]). Otherwise, follow the sub steps described below.
 *
 * 1. Get the time at which the end-user was authenticated. Note that
 *    this value is not managed by Authlete, meaning that it is expected
 *    that the authorization server implementation manages the value.
 *    If the authorization server implementation does not manage
 *    authentication time of end-users, call Authlete's
 *    `/auth/authorization/fail` API with `reason=MAX_AGE_NOT_SUPPORTED`
 *    and use the response from the API to generate a response to the
 *    client application.
 *
 * 2. Add the value of the maximum authentication age (which is represented
 *    in seconds) to the authentication time.
 *
 * 3. Check whether the calculated value is equal to or greater than the
 *    current time. If this condition is satisfied, go to the next step
 *    ([SUBJECT]). Otherwise, call Authlete's `/auth/authorization/fail` API with
 *    `reason=EXCEEDS_MAX_AGE` and use the response from the API to generate a
 *    response to the client application.
 *
 * @typedef {Object} AuthorizationFailRequest
 * @property {string} reason - The reason for the authorization failure.
 * @property {string} reason.MAX_AGE_NOT_SUPPORTED - Indicates that the server does not support max_age.
 * @property {string} reason.EXCEEDS_MAX_AGE - Indicates that the authentication age exceeds the max_age.
 *
 * [SUBJECT]
 * Get the value of the requested subject from the `subject` field.
 * The value represents an end-user who the client application expects to
 * grant authorization. If the value is null, go to the next step
 * ([ACRs]). Otherwise, follow the sub steps described below.
 *
 * 1. Compare the value of the requested subject to the subject (= unique
 *    user ID) of the current end-user.
 *
 * 2. If they are equal, go to the next step ([ACRs]).
 *
 * 3. If they are not equal, call Authlete's `/auth/authorization/fail`
 *    API with `reason=DIFFERENT_SUBJECT` and use the response from the API
 *    to generate a response to the client application.
 *
 * @typedef {Object} AuthorizationFailRequest
 * @property {string} reason - The reason for the authorization failure.
 * @property {string} reason.DIFFERENT_SUBJECT - Indicates that the requested subject does not match the current user.
 *
 * [SCOPES]
 * Get the scopes from the `scopes` field. If the array contains a scope
 * which has not been granted to the client application by the end-user
 * in the past, call Authlete's `/auth/authorization/fail` API with
 * `reason=CONSENT_REQUIRED` and use the response from the API to generate a
 * response to the client application. Otherwise, go to the next step
 * ([DYNAMIC SCOPES]).
 *
 * Note that Authlete provides APIs to manage records of granted scopes
 * (`/api/client/granted_scopes/*` APIs), but the APIs work only
 * in the case the Authlete server you use is a dedicated Authlete server
 * (contact sales@authlete.com for details). In other words, the APIs of
 * the shared Authlete server are disabled intentionally (in order to prevent
 * garbage data from being accumulated) and they return `403 Forbidden`.
 *
 * [DYNAMIC SCOPES]
 * Get the dynamic scopes from the `dynamicScopes` field. If the array
 * contains a scope which has not been granted to the client application
 * by the end-user in the past, call Authlete's
 * `/auth/authorization/fail` API with
 * `reason=CONSENT_REQUIRED` and use the response from the API to generate a
 * response to the client application. Otherwise, go to the next step
 * ([RESOURCES]).
 *
 * Note that Authlete provides APIs to manage records of granted scopes
 * (`/api/client/granted_scopes/*` APIs) but dynamic scopes are
 * not remembered as granted scopes.
 *
 * @typedef {Object} AuthorizationFailRequest
 * @property {string} reason - The reason for the authorization failure.
 * @property {string} reason.CONSENT_REQUIRED - Indicates that user consent is required for the requested scopes.
 *
 * [RESOURCES]
 * Get the requested target resources from the `resources` field. The array
 * represents the values of the `resource` request parameters. If you
 * want to reject the request, call Authlete's `/auth/authorization/fail`
 * API with `reason=INVALID_TARGET` and use the response from the API to generate a response
 * to the client application. Otherwise, go to the next step ([ISSUE]).
 *
 * See "Resource Indicators for OAuth 2.0" for details. Note that the
 * specification is supported since Authlete 2.2. If the Authlete server you
 * are using is older than 2.2, the `resources` field always returns null.
 *
 * @typedef {Object} AuthorizationFailRequest
 * @property {string} reason - The reason for the authorization failure.
 * @property {string} reason.INVALID_TARGET - Indicates that the requested target resource is invalid.
 *
 * @see {@link https://tools.ietf.org/html/rfc8707|Resource Indicators for OAuth 2.0}
 *
 * [ISSUE]
 * If all the above steps succeeded, the last step is to issue an authorization
 * code, an ID token and/or an access token. (There is a special case. When
 * `response_type=none`, nothing is issued.) The last step can be
 * performed by calling Authlete's `/auth/authorization/issue` API.
 * The API requires the following parameters, which are represented as
 * properties of the `AuthorizationIssueRequest` class. Prepare these
 * parameters and call the `/auth/authorization/issue` API.
 *
 * @typedef {Object} AuthorizationIssueRequest
 * @property {string} ticket - This parameter represents a ticket which is exchanged with tokens
 * at the `/auth/authorization/issue` endpoint.
 * Use the value returned by the `ticket` field as it is.
 *
 * @property {string} subject - This parameter represents the unique identifier of the current end-user.
 * It is often called "user ID" and it may or may not be visible to the user.
 * In any case, it is a number or a string assigned to an end-user by your
 * service. Authlete does not care about the format of the value of `subject`,
 * but it must consist of only ASCII letters and its length must
 * be equal to or less than 100.
 *
 * When the `subject` field returns a non-null value, the
 * value of `subject` parameter is necessarily identical to the
 * value returned from the field.
 *
 * The value of this parameter will be embedded in an ID token as the
 * value of `"sub"` claim. When the value of `"subject_type"`
 * configuration parameter of the client is `PAIRWISE`, the value
 * of `"sub"` claim is different from the value specified here.
 * Note that the behavior for `PAIRWISE` is not supported by
 * Authlete 2.1 and older versions.
 *
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes|8. Subject Identifier Types of OpenID Connect Core 1.0}
 *
 * You can use the `sub` request parameter to adjust the value
 * of the `sub` claim in an ID token. See the description of the
 * `sub` request parameter for details.
 *
 * @property {number} [authTime] - This parameter represents the time when the end-user authentication
 * occurred. Its value is the number of seconds from 1970-01-01. The
 * value of this parameter will be embedded in an ID token as the value
 * of `"auth_time"` claim.
 *
 * @property {string} [acr] - This parameter represents the ACR (Authentication Context Class
 * Reference) which the authentication of the end-user satisfies.
 * When the `acrs` field returns a non-empty array and
 * the `acrEssential` field returns `true`, the value of this parameter
 * must be one of the array elements. Otherwise, even `null` is allowed. The value of
 * this parameter will be embedded in an ID token as the value of
 * `"acr"` claim.
 *
 * @property {string} [claims] - This parameter represents claims of the end-user. "Claims" here
 * are pieces of information about the end-user such as "name",
 * "email" and "birthdate". The authorization server
 * implementation is required to gather claims of the end-user, format
 * the claim values into a JSON and set the JSON string as the value
 * of this parameter.
 *
 * The claims which the authorization server implementation is required
 * to gather can be obtained from the `claims` field.
 *
 * For example, if the `claims` field returns JSON string which
 * contains "name", "email" and "birthdate",
 * the value of this parameter should look like the following:
 *
 * ```json
 * {
 *   "name": "John Smith",
 *   "email": "john@example.com",
 *   "birthdate": "1974-05-06"
 * }
 * ```
 *
 * The `claimsLocales` field lists the end-user's preferred languages
 * and scripts for claim values, ordered by preference. When the `claimsLocales` field
 * returns a non-empty array, its elements should be taken into account when
 * the authorization server implementation gathers claim values.
 *
 * If the `claims` field returns null or an empty array,
 * the value of this parameter should be null.
 *
 * The claim values in this parameter will be embedded in an ID token.
 *
 * The `idTokenClaims` field is available since version 2.25. The field
 * returns the value of the "id_token" property in the "claims"
 * request parameter or in the "claims" property in a request object.
 * The value returned from the field should be considered when you prepare
 * claim values. See the description of the field for details. Note that,
 * however, old Authlete servers don't support this response parameter.
 *
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims|5.1. Standard Claims of OpenID Connect Core 1.0}
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts|5.2. Claims Languages and Scripts of OpenID Connect Core 1.0}
 *
 * @property {Object[]} [properties] - Extra properties to associate with an access token and/or an authorization
 * code that may be issued by this request. Note that `properties`
 * parameter is accepted only when Content-Type of the request to Authlete's
 * `/auth/authorization/issue` is `application/json`, so
 * don't use `application/x-www-form-urlencoded` if you want to
 * use this request parameter. See
 * {@link https://www.authlete.com/documents/definitive_guide/extra_properties|Extra Properties}
 * for details.
 *
 * @property {string[]} [scopes] - Scopes to associate with an access token and/or an authorization code.
 * If this parameter is null, the scopes specified in the original authorization
 * request from the client application are used. In other cases, including the
 * case of an empty array, the specified scopes will replace the scopes
 * contained in the original authorization request.
 *
 * Even scopes that are not included in the original authorization request
 * can be specified. However, as an exception, "openid" scope is
 * ignored on Authlete server side if it is not included in the original
 * request. It is because the existence of "openid" scope considerably
 * changes the validation steps and because adding "openid" triggers
 * generation of an ID token (although the client application has not requested
 * it) and the behavior is a major violation against the specification.
 *
 * If you add "offline_access" scope although it is not included
 * in the original request, keep in mind that the specification requires explicit
 * consent from the user for the scope (OpenID Connect Core 1.0, 11. Offline Access).
 * When "offline_access" is included in the original request, the current implementation
 * of Authlete's `/auth/authorization` API checks whether the request has come along with
 * `prompt` request parameter and the value includes "consent". However, note that
 * the implementation of Authlete's `/auth/authorization/issue` API does not perform
 * such checking if "offline_access" scope is added via this scopes parameter.
 *
 * @property {string} [sub] - The value of the `sub` claim in an ID token which may be issued.
 * If the value of this request parameter is not empty, it is used as the
 * value of the `sub` claim. Otherwise, the value of the `subject`
 * request parameter is used as the value of the `sub` claim. The main
 * purpose of this parameter is to hide the actual value of the subject from
 * client applications.
 *
 * INTERACTION:
 * When the value of "action" is "INTERACTION", it means
 * that the request from the client application has no problem and requires
 * the authorization server to process the request with user interaction by
 * an HTML form.
 *
 * The purpose of the UI displayed to the end-user is to ask the end-user
 * to grant authorization to a client application. The items described
 * below are some points which the authorization server implementation
 * should take into account when it builds the UI.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string} action - The action that the authorization server should take.
 * @property {string} action.INTERACTION - Indicates that user interaction is required.
 *
 * [DISPLAY MODE]
 * The `AuthorizationResponse` contains a "display" parameter.
 * The value can be obtained from the `display` field and is
 * one of "PAGE" (default), "POPUP", "TOUCH", and "WAP".
 * The meanings of the values are described in
 * {@link http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest|3.1.2.1. Authentication Request}
 * of OpenID Connect Core 1.0.
 * Basically, the authorization server implementation should display
 * the UI which is suitable for the display mode, but it is okay for
 * the authorization server implementation to "attempt to detect
 * the capabilities of the User Agent and present an appropriate
 * display."
 *
 * It is ensured that the value returned by the `display` field is
 * one of the supported display values which are specified by the
 * "display_values_supported" configuration parameter of the service.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string} display - The display mode for the authorization UI.
 *
 * @typedef {Object} Display
 * @property {string} PAGE - Default display mode.
 * @property {string} POPUP - Display the authorization UI in a popup window.
 * @property {string} TOUCH - Display the authorization UI optimized for touch devices.
 * @property {string} WAP - Display the authorization UI optimized for WAP devices.
 *
 * [UI LOCALE]
 * The `AuthorizationResponse` contains a "ui_locales" parameter.
 * The value can be obtained from the `uiLocales` field and it is an
 * array of language tag values (such as "fr-CA" and "en") ordered by preference.
 * The authorization server implementation should display the UI in one of the
 * languages listed in the "ui_locales" parameter when possible.
 *
 * It is ensured that language tags returned by the `uiLocales` field
 * are contained in the list of supported UI locales which are specified
 * by the "ui_locales_supported" configuration parameter of the service.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string[]} uiLocales - An array of language tag values ordered by preference.
 *
 * [CLIENT INFORMATION]
 * The authorization server implementation should show the end-user
 * information about the client application. The information can be
 * obtained from the `client` field.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {Object} client - Information about the client application.
 *
 * [SCOPES]
 * A client application requires authorization for specific permissions.
 * In OAuth 2.0 specification, "scope" is a technical term which represents
 * a permission. The `scopes` field returns scopes requested by
 * the client application. The authorization server implementation should
 * show the end-user the scopes.
 *
 * The authorization server implementation may choose not to show scopes
 * to which the end-user has given consent in the past. To put it the
 * other way around, the authorization server implementation may show
 * only the scopes to which the end-user has not given consent yet.
 * However, if the value returned from the `prompts` field contains
 * "CONSENT", the authorization server implementation
 * has to obtain explicit consent from the end-user even if the end-user
 * has given consent to all the requested scopes in the past.
 *
 * Note that Authlete provides APIs to manage records of granted scopes
 * (`/api/client/granted_scopes/*` APIs), but the APIs work only
 * in the case the Authlete server you use is a dedicated Authlete server
 * (contact sales@authlete.com for details). In other words, the APIs of
 * the shared Authlete server are disabled intentionally (in order to prevent
 * garbage data from being accumulated) and they return `403 Forbidden`.
 *
 * It is ensured that scopes returned by the `scopes` field are
 * contained in the list of supported scopes which are specified by
 * "scopes_supported" configuration parameter of the service.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string[]} scopes - The scopes requested by the client application.
 * @property {string[]} prompts - The prompts requested in the authorization.
 *
 * [DYNAMIC SCOPES]
 * The authorization request may include dynamic scopes. The list of
 * recognized dynamic scopes are accessible from the `dynamicScopes` field.
 * See the description of the `DynamicScope` class for details about dynamic scopes.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {DynamicScope[]} dynamicScopes - The list of recognized dynamic scopes.
 *
 * [AUTHORIZATION DETAILS]
 * The authorization server implementation should show the end-user
 * "authorization details" if the request includes it.
 * The `authorizationDetails` field returns the content of the
 * `authorization_details` request parameter.
 *
 * See "OAuth 2.0 Rich Authorization Requests" for details. Note that the
 * specification is supported since Authlete 2.2. If the Authlete server
 * you are using is older than 2.2, the `authorizationDetails` field
 * always returns null.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {Object[]} authorizationDetails - The content of the authorization_details request parameter.
 *
 * @see {@link https://tools.ietf.org/html/draft-lodderstedt-oauth-rar|OAuth 2.0 Rich Authorization Requests}
 *
 * [PURPOSE]
 * The authorization server implementation must show the value of the
 * `purpose` request parameter if it supports OpenID Connect for Identity Assurance 1.0.
 * See 8. Transaction-specific Purpose in the specification for details.
 *
 * The `purpose` field returns the value of the `purpose` request
 * parameter. However, if the Authlete server you are using does not support
 * OpenID Connect for Identity Assurance 1.0 (in other words, if the Authlete
 * server is older than 2.2), the `purpose` field always returns null.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string} [purpose] - The value of the purpose request parameter.
 *
 * @see {@link https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html|OpenID Connect for Identity Assurance 1.0}
 * @see {@link https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.8|8. Transaction-specific Purpose}
 *
 * [ISSUABLE CREDENTIALS]
 * An authorization request may specify issuable credentials by using
 * one or more of the following mechanisms in combination.
 *
 * 1. The "issuer_state" request parameter.
 * 2. The "authorization_details" request parameter.
 * 3. The "scope" request parameter.
 *
 * When the authorization request specifies one or more issuable credentials,
 * the `issuableCredentials` field returns the information about
 * the issuable credentials. When the information is available, the
 * authorization server implementation should show the information to the user.
 *
 * Note that if scope values specifying issuable credentials are dropped
 * due to user disapproval, the resulting set of issuable credentials will
 * differ from the originally requested set in the authorization request.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {IssuableCredential[]} issuableCredentials - Information about the issuable credentials.
 *
 * @typedef {Object} IssuableCredential
 * @property {string} type - The type of the issuable credential.
 * @property {string} format - The format of the issuable credential.
 * @property {Object} claims - The claims included in the issuable credential.
 *
 * [END-USER AUTHENTICATION]
 * Necessarily, the end-user must be authenticated (= must login your
 * service) before granting authorization to the client application.
 * Simply put, a login form is expected to be displayed for end-user
 * authentication. The authorization server implementation must follow
 * the steps described below to comply with OpenID Connect. (Or just
 * always show a login form if it's too much of a bother to follow
 * the steps below.)
 *
 * @typedef {Object} AuthorizationResponse
 * @property {boolean} authenticationRequired - Indicates whether end-user authentication is required.
 *
 * Get the value of the `prompts` field. It corresponds to the
 * value of the `prompt` request parameter. Details of the
 * request parameter are described in
 * {@link http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest|3.1.2.1. Authentication Request} of OpenID Connect Core 1.0.
 *
 * If the value returned from the `prompts` field contains
 * "SELECT_ACCOUNT", display a form to urge the end-user to select one of his/her accounts for login.
 * If the `subject` field returns a non-null value, it is the
 * end-user ID that the client application expects, so the value
 * should be used to determine the value of the login ID. Note
 * that a subject and a login ID are not necessarily equal. If
 * the `subject` field returns null, the value returned by
 * the `loginHint` field should be referred to as a hint to
 * determine the value of the login ID. The `loginHint` field
 * simply returns the value of the `login_hint` request parameter.
 *
 * Also, if the `credentialOfferInfo` field returns a non-null
 * value, it may be appropriate to use the value returned from
 * `credentialOfferInfo.subject` as a hint. The
 * value represents the unique identifier of the user who was
 * authenticated when the credential offer was issued by the
 * credential issuer. See the "OpenID for Verifiable Credential
 * Issuance" specification for details about the credential offer.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string[]} prompts - The value of the prompt request parameter.
 * @property {string} [subject] - The end-user ID expected by the client application.
 * @property {string} [loginHint] - The value of the login_hint request parameter.
 * @property {CredentialOfferInfo} [credentialOfferInfo] - Information about the credential offer.
 *
 * @typedef {Object} CredentialOfferInfo
 * @property {string} subject - The unique identifier of the user authenticated during credential offer issuance.
 *
 * @see {@link http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest|OpenID Connect Core 1.0 - Authentication Request}
 *
 * If the value returned from the `prompts` field contains
 * "LOGIN", display a form to urge the end-user
 * to login even if the end-user has already logged in. If the
 * `subject` field returns a non-null value, it is the end-user
 * ID that the client application expects, so the value should
 * be used to determine the value of the login ID. Note that a
 * subject and a login ID are not necessarily equal. If the
 * `subject` field returns null, the value returned by the
 * `loginHint` field should be referred to as a hint to determine
 * the value of the login ID. The `loginHint` field
 * simply returns the value of the `login_hint` request
 * parameter.
 *
 * Also, if the `credentialOfferInfo` field returns a non-null
 * value, it may be appropriate to use the value returned from
 * `credentialOfferInfo.subject` as a hint. The
 * value represents the unique identifier of the user who was
 * authenticated when the credential offer was issued by the
 * credential issuer. See the "OpenID for Verifiable Credential
 * Issuance" specification for details about the credential offer.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string[]} prompts - The prompts requested in the authorization.
 * @property {string} [subject] - The end-user ID expected by the client application.
 * @property {string} [loginHint] - The value of the login_hint request parameter.
 * @property {CredentialOfferInfo} [credentialOfferInfo] - Information about the credential offer.
 *
 * @typedef {Object} CredentialOfferInfo
 * @property {string} subject - The unique identifier of the user authenticated during credential offer issuance.
 *
 * If the value returned from the `prompts` field does not
 * contain "LOGIN", the authorization server
 * implementation does not have to authenticate the end-user
 * if all the conditions described below are satisfied. If
 * any one of the conditions is not satisfied, show a login
 * form to authenticate the end-user.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string[]} prompts - The prompts requested in the authorization.
 *
 * The authorization server implementation does not have to authenticate the end-user
 * if all the following conditions are satisfied:
 *
 * 1. An end-user has already logged in your service.
 *
 * 2. The login ID of the current end-user matches the value
 *    returned by the `subject` field. This check is required
 *    only when the `subject` field returns a non-null value.
 *
 * 3. The max age, which is the number of seconds obtained by
 *    the `maxAge` field, has not passed since the
 *    current end-user logged in your service. This check is
 *    required only when the `maxAge` field returns a
 *    non-zero value.
 *
 *    If the authorization server implementation does not manage
 *    authentication time of end-users (= if the authorization
 *    server implementation cannot know when end-users logged in)
 *    and if the `maxAge` field returns a non-zero value, a
 *    login form should be displayed.
 *
 * 4. The ACR (Authentication Context Class Reference) of the
 *    authentication performed for the current end-user satisfies
 *    one of the ACRs listed by the `acrs` field. This check is
 *    required only when the `acrs` field returns a non-empty
 *    array.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string} [subject] - The expected subject (user ID) for the current end-user.
 * @property {number} [maxAge] - The maximum authentication age in seconds.
 * @property {string[]} [acrs] - The list of acceptable Authentication Context Class References.
 *
 * If the value returned from the `prompts` field includes
 * "CREATE", it indicates that the client desires that
 * the user be shown the account creation UX rather than the login
 * flow. See "Initiating User Registration via OpenID Connect 1.0" for
 * details about the value "create".
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string[]} prompts - The prompts requested in the authorization.
 *
 * @see {@link https://openid.net/specs/openid-connect-prompt-create-1_0.html|Initiating User Registration via OpenID Connect 1.0}
 *
 * In every case, the end-user authentication must satisfy one of the ACRs
 * listed by the `acrs` field when the `acrs` field returns a non-empty
 * array and the `acrEssential` field returns `true`.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string[]} acrs - The list of acceptable Authentication Context Class References (ACRs).
 * @property {boolean} acrEssential - Indicates whether satisfying one of the listed ACRs is essential.
 *
 * [GRANT/DENY BUTTONS]
 * The end-user is supposed to choose either (1) to grant authorization
 * to the client application or (2) to deny the authorization request.
 * The UI must have UI components to accept the decision by the user.
 * Usually, a button to grant authorization and a button or to deny the
 * request are provided.
 *
 * @typedef {Object} AuthorizationUI
 * @property {Function} grantAuthorization - Function to handle the user's decision to grant authorization.
 * @property {Function} denyAuthorization - Function to handle the user's decision to deny authorization.
 *
 * When the subject returned by the `subject` field is not `null`,
 * the end-user authentication must be performed for the subject, meaning that
 * the authorization server implementation should repeatedly show a login form
 * until the subject is successfully authenticated.
 *
 * The end-user will choose either (1) to grant authorization to the client
 * application or (2) to deny the authorization request. When the end-user
 * chose to deny the authorization request, call Authlete's
 * `/auth/authorization/fail` API with `reason=DENIED` and use the response from
 * the API to generate a response to the client application.
 *
 * When the end-user chose to grant authorization to the client application,
 * the authorization server implementation has to issue an authorization code,
 * an ID token, and/or an access token to the client application. (There is a
 * special case. When `response_type=none`, nothing is issued.) Issuing
 * the tokens can be performed by calling Authlete's `/auth/authorization/issue`
 * API. Read [ISSUE] written above in the description for the case of
 * `action=NO_INTERACTION`.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string} [subject] - The subject (user identifier) for authentication.
 *
 * @typedef {Object} AuthorizationFailRequest
 * @property {string} reason - The reason for the authorization failure.
 * @property {string} reason.DENIED - Indicates that the end-user denied the authorization request.
 *
 * @see [ISSUE] section for details on issuing tokens
 *
 * Authlete 2.3 and newer versions support Grant Management for OAuth 2.0.
 * An authorization request may contain a `grant_id` request parameter which
 * is defined in the specification. If the value of the request parameter is valid,
 * the `grantSubject` field will return the subject of the user who has given
 * the grant to the client application. Authorization server implementations may
 * use the value returned from the `grantSubject` field in order to determine
 * the user to authenticate.
 *
 * Authlete 2.3 and newer version support "Transformed Claims". An
 * authorization request may request "transformed claims". A transformed
 * claim uses an existing claim as input. For example, an authorization server
 * may predefine a transformed claim named `18_or_over` which uses the
 * `birthdate` claim as input. If a client application requests the
 * `18_or_over` transformed claim, the authorization server needs to
 * prepare the value of the `birthdate` claim and passes it to Authlete's
 * `/api/auth/authorization/issue` API so that Authlete can compute the
 * value of the `18_or_over` transformed claim. See the descriptions
 * of the `requestedClaimsForTx` and `requestedVerifiedClaimsForTx` fields
 * for details.
 *
 * @typedef {Object} AuthorizationResponse
 * @property {string} [grantSubject] - The subject of the user who has given the grant to the client application.
 * @property {Object} [requestedClaimsForTx] - The requested claims for transformation.
 * @property {Object} [requestedVerifiedClaimsForTx] - The requested verified claims for transformation.
 *
 * @see {@link http://tools.ietf.org/html/rfc6749|RFC 6749, OAuth 2.0}
 * @see {@link http://openid.net/specs/openid-connect-core-1_0.html|OpenID Connect Core 1.0}
 * @see {@link http://openid.net/specs/openid-connect-registration-1_0.html|OpenID Connect Dynamic Client Registration 1.0}
 * @see {@link http://openid.net/specs/openid-connect-discovery-1_0.html|OpenID Connect Discovery 1.0}
 * @see {@link https://openid.net/specs/fapi-grant-management.html|Grant Management for OAuth 2.0}
 *
 * @author Takahiko Kawasaki
 */

import { z } from 'zod';
import { apiResponseSchema } from '../common/ApiResponse';
import {
  nullableButOptionalStringArrayArraySchema,
  nullableButOptionalStringArraySchema,
  nullableButOptionalStringSchema,
} from '../common/stringSchema';
import { nullableButOptionalServiceSchema } from '../common/Service';
import { nullableButOptionalNumberSchema } from '../common/numberSchema';
import { nullableButOptionalScopeArraySchema } from '../common/Scope';
import { nullableButOptionalDynamicScopeArraySchema } from '../common/DynamicScope';
import { nullableButOptionalClientSchema } from '../common/Client';
import { nullableButOptionalPromptArraySchema } from '../common/Prompt';
import { nullableButOptionalAuthzDetailsSchema } from '../common/AuthzDetails';

/**
 * Enum representing possible actions for the authorization response.
 */
const actionSchema = z.enum([
  'INTERNAL_SERVER_ERROR',
  'BAD_REQUEST',
  'LOCATION',
  'FORM',
  'NO_INTERACTION',
  'INTERACTION',
]);

/**
 * Schema for the authorization response.
 *
 * This schema extends the apiResponseSchema and includes various fields
 * related to the authorization process in OAuth 2.0 and OpenID Connect.
 *
 * @type {z.ZodType<AuthorizationResponse>}
 */
export const authorizationResponseSchema = apiResponseSchema.extend({
  /** The action to be taken based on the authorization result. */
  action: actionSchema,
  /** Optional response content, such as a redirect URL. */
  responseContent: nullableButOptionalStringSchema,
  /** Information about the service. */
  service: nullableButOptionalServiceSchema,
  /** Information about the client. */
  client: nullableButOptionalClientSchema,
  /** Maximum authentication age. */
  maxAge: nullableButOptionalNumberSchema,
  /** Scopes associated with the authorization. */
  scopes: nullableButOptionalScopeArraySchema,
  /** Dynamic scopes associated with the authorization. */
  dynamicScopes: nullableButOptionalDynamicScopeArraySchema,
  /** Claims requested in the authorization. */
  claims: nullableButOptionalStringArraySchema,
  /** Claims to be included in the UserInfo response. */
  claimsAtUserInfo: nullableButOptionalStringArraySchema,
  /** Authentication Context Class References. */
  acrs: nullableButOptionalStringArraySchema,
  /** Subject identifier. */
  subject: nullableButOptionalStringSchema,
  /** Login hint provided in the request. */
  loginHint: nullableButOptionalStringSchema,
  /** Prompts requested in the authorization. */
  prompts: nullableButOptionalPromptArraySchema,
  /** Claims to be included in the ID Token. */
  idTokenClaims: nullableButOptionalStringSchema,
  /** Detailed authorization request information. */
  authorizationDetails: nullableButOptionalAuthzDetailsSchema,
  /** Purpose of the authorization request. */
  purpose: nullableButOptionalStringSchema,
  /** Claims to be included in the UserInfo response. */
  userInfoClaims: nullableButOptionalStringSchema,
  /** Ticket for the authorization session. */
  ticket: nullableButOptionalStringSchema,
  /** Requested locales for claims. */
  claimsLocales: nullableButOptionalStringArraySchema,
  /** Claims requested for a specific transaction. */
  requestedClaimsForTx: nullableButOptionalStringArraySchema,
  /** Verified claims requested for a specific transaction. */
  requestedVerifiedClaimsForTx: nullableButOptionalStringArrayArraySchema,
});

/**
 * Represents the structure of an authorization response.
 *
 * @typedef {z.infer<typeof authorizationResponseSchema>} AuthorizationResponse
 */
export type AuthorizationResponse = z.infer<typeof authorizationResponseSchema>;

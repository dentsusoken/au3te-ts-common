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
import { stringArraySchema } from '../common/stringSchema';

/**
 * Schema for authorization decision parameters.
 * This schema defines the structure and types of parameters used in the authorization decision process.
 */
export const authorizationDecisionParamsSchema = z.object({
  /**
   * The ticket associated with the authorization request.
   * This can be a string, null, or undefined.
   */
  ticket: z.string().nullish(),

  /**
   * An array of claim names requested in the authorization.
   * This can be an array of strings, null, or undefined.
   */
  claimNames: z.array(z.string()).nullish(),

  /**
   * An array of claim locales requested in the authorization.
   * This can be an array of strings, null, or undefined.
   */
  claimLocales: z.array(z.string()).nullish(),

  /**
   * The ID token claims associated with the authorization request.
   * This can be a string, null, or undefined.
   */
  idTokenClaims: z.string().nullish(),

  /**
   * An array of requested claims for transaction purposes.
   * This can be an array of strings, null, or undefined.
   */
  requestedClaimsForTx: z.array(z.string()).nullish(),

  /**
   * An array of requested verified claims for transaction purposes.
   * This can be an array of strings, null, or undefined.
   */
  requestedVerifiedClaimsForTx: z.array(stringArraySchema).nullish(),
});

/**
 * Type definition for AuthorizationDecisionParams.
 * This type is inferred from the authorizationDecisionParams schema.
 */
export type AuthorizationDecisionParams = z.infer<
  typeof authorizationDecisionParamsSchema
>;

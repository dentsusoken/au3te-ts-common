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

/**
 * Schema for federation callback parameters.
 * These parameters are stored in session before redirecting to IdP and reused after callback.
 */
export const federationCallbackParamsSchema = z.object({
  /**
   * An opaque value used to maintain state between the request and callback.
   */
  state: z.string(),

  /**
   * The code verifier for PKCE (Proof Key for Code Exchange).
   */
  codeVerifier: z.string().nullish(),
});

/**
 * Type definition for FederationCallbackParams.
 */
export type FederationCallbackParams = z.infer<typeof federationCallbackParamsSchema>;

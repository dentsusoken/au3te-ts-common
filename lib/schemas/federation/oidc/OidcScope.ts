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

export const oidcScopeEnumSchema = z.union([
  z.literal('openid'),
  z.literal('email'),
  z.literal('profile'),
  z.literal('address'),
  z.literal('phone'),
]);

export const oidcScopeSchema = z.array(oidcScopeEnumSchema).nonempty();

export type OidcScopeEnum = z.infer<typeof oidcScopeEnumSchema>;

export type OidcScope = z.input<typeof oidcScopeSchema>;

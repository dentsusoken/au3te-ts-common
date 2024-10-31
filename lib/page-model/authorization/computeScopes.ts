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

import { Scope } from '../../schemas/common/Scope';
import { DynamicScope } from '../../schemas/common/DynamicScope';

/**
 * A function type that computes scopes based on input scopes and dynamic scopes.
 * @param {Scope[]} [scopes] - An optional array of Scope objects.
 * @param {DynamicScope[]} [dynamicScopes] - An optional array of DynamicScope objects.
 * @returns {Scope[]} An array of computed Scope objects.
 */
export type ComputeScopes = (
  scopes?: Scope[],
  dynamicScopes?: DynamicScope[]
) => Scope[];

/**
 * Default implementation of the ComputeScopes function.
 * @param {Scope[]} [scopes] - An optional array of Scope objects.
 * @param {DynamicScope[]} [dynamicScopes] - An optional array of DynamicScope objects.
 * @returns {Scope[]} An array of computed Scope objects.
 */
export const defaultComputeScopes: ComputeScopes = (scopes, dynamicScopes) => {
  if (!dynamicScopes) {
    return scopes ?? [];
  }

  const computed = scopes ? [...scopes] : [];

  dynamicScopes.forEach((ds) =>
    computed.push({
      name: ds.name,
    })
  );

  return computed;
};

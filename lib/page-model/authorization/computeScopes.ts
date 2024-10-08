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
 * Computes a combined array of scopes from regular scopes and dynamic scopes.
 *
 * This function merges regular scopes with dynamic scopes, creating a new array
 * that includes all regular scopes (if any) followed by the names of dynamic scopes.
 *
 * @param {Scope[]} [scopes] - An optional array of regular scopes.
 * @param {DynamicScope[]} [dynamicScopes] - An optional array of dynamic scopes.
 *
 * @returns {Scope[]} A new array containing all regular scopes (if provided)
 * and the names of all dynamic scopes (if provided). If both input arrays are
 * undefined or empty, an empty array is returned.
 *
 * @example
 * const regularScopes = [{ name: 'read' }, { name: 'write' }];
 * const dynamicScopes = [{ name: 'dynamic1' }, { name: 'dynamic2' }];
 * const result = computeScopes(regularScopes, dynamicScopes);
 * // result: [{ name: 'read' }, { name: 'write' }, { name: 'dynamic1' }, { name: 'dynamic2' }]
 *
 * @example
 * const result = computeScopes();
 * // result: []
 *
 * @example
 * const result = computeScopes(undefined, [{ name: 'dynamic1' }]);
 * // result: [{ name: 'dynamic1' }]
 */
export const computeScopes = (
  scopes?: Scope[],
  dynamicScopes?: DynamicScope[]
): Scope[] => {
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

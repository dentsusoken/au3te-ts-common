/*
 * Copyright (C) 2014-2024 Authlete, Inc.
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
 * Recursively checks if the source object contains all properties of the target object up to the specified depth.
 *
 * @param source - The object to check against (contains all possible properties)
 * @param target - The object whose properties should be included in source
 * @param maxRecursionDepth - Maximum depth for recursive property checking
 * @param currentRecursionDepth - Current depth in the recursion (defaults to 1)
 * @returns true if source contains all properties of target, false otherwise
 */
export const containsAllProperties = (
  source: Record<string, unknown>,
  target: Record<string, unknown>,
  maxRecursionDepth: number,
  currentRecursionDepth = 1
): boolean => {
  return Object.entries(target).every(([targetKey, targetValue]) => {
    if (!Object.prototype.hasOwnProperty.call(source, targetKey)) {
      return false;
    }

    if (
      currentRecursionDepth === maxRecursionDepth ||
      typeof targetValue !== 'object' ||
      targetValue == null
    ) {
      return true;
    }

    const sourceValue = source[targetKey];
    if (typeof sourceValue !== 'object' || sourceValue == null) {
      return false;
    }

    return containsAllProperties(
      sourceValue as Record<string, unknown>,
      targetValue as Record<string, unknown>,
      maxRecursionDepth,
      currentRecursionDepth + 1
    );
  });
};

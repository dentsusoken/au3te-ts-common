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
      return true;
    }

    return containsAllProperties(
      sourceValue as Record<string, unknown>,
      targetValue as Record<string, unknown>,
      maxRecursionDepth,
      currentRecursionDepth + 1
    );
  });
};

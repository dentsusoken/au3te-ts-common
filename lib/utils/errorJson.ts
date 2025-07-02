/**
 * Creates a JSON string representing an error response.
 *
 * @param errorCode - The error code to include in the response
 * @param errorMessage - The error description message
 * @returns A JSON string containing the error code and description
 *
 * @example
 * const json = errorJson('invalid_request', 'Missing required parameter');
 * // Returns: {"error":"invalid_request","error_description":"Missing required parameter"}
 */
export const errorJson = (errorCode: string, errorMessage: string): string =>
  JSON.stringify({
    error: errorCode,
    error_description: errorMessage,
  });

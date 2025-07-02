/**
 * Converts an HTTP Response object to an Error object.
 *
 * Creates an Error with a descriptive message based on the response status
 * and status text. This is used when an HTTP request returns a non-ok status.
 *
 * @param response - The HTTP Response object that represents an error
 * @returns An Error object with a descriptive message
 *
 * @example
 * const response = new Response(undefined, {
 *   status: 404,
 *   statusText: 'Not Found'
 * });
 * const error = responseToError(response);
 * // error.message === 'Invalid response with status 404 Not Found'
 */
export const responseToError = (response: Response): Error => {
  const message = `Invalid response with status ${response.status} ${response.statusText}`;
  return new Error(message);
};

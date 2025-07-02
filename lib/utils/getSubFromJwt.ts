import { decodeBase64Url } from 'u8a-utils';
import { getErrorMessage } from '@vecrea/oid4vc-core/utils';

const decoder = new TextDecoder();

/**
 * Extracts the 'sub' claim from a JWT without verifying its signature.
 * This function decodes the JWT and retrieves the 'sub' claim from its payload.
 *
 * @param jwt - The JWT string
 * @returns The value of the 'sub' claim from the JWT payload
 * @throws {Error} If:
 *   - The JWT is missing
 *   - The JWT does not have the correct number of parts
 *   - The 'sub' claim is missing from the payload
 *   - The JWT cannot be parsed
 */
export const getSubFromJwt = async (
  jwt: string | undefined
): Promise<string> => {
  try {
    if (!jwt) {
      throw new Error('JWT is missing.');
    }

    const parts = jwt.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT does not have the correct number of parts.');
    }

    // Decode payload
    const payloadJson = decoder.decode(decodeBase64Url(parts[1]));
    const payload = JSON.parse(payloadJson);

    if (!payload.sub) {
      throw new Error("The 'sub' claim is missing from the JWT payload.");
    }

    return payload.sub;
  } catch (error) {
    throw new Error(`Failed to parse JWT. Error: ${getErrorMessage(error)}`);
  }
};

import { describe, it, expect } from 'vitest';
import { getSubFromJwt } from '../getSubFromJwt';

describe('getSubFromJwt', () => {
  it('should extract sub claim from a valid JWT', async () => {
    // header: {"alg":"HS256","typ":"JWT"}
    // payload: {"sub":"1234567890","name":"John Doe"}
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.signature';
    const sub = await getSubFromJwt(jwt);
    expect(sub).toBe('1234567890');
  });

  it('should throw error when JWT is missing', async () => {
    await expect(getSubFromJwt(undefined)).rejects.toThrow('JWT is missing.');
  });

  it('should throw error when JWT has incorrect number of parts', async () => {
    const invalidJwt = 'header.payload';
    await expect(getSubFromJwt(invalidJwt)).rejects.toThrow(
      'JWT does not have the correct number of parts.'
    );
  });

  it('should throw error when sub claim is missing', async () => {
    // header: {"alg":"HS256","typ":"JWT"}
    // payload: {"name":"John Doe"}
    const jwtWithoutSub =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.signature';
    await expect(getSubFromJwt(jwtWithoutSub)).rejects.toThrow(
      "The 'sub' claim is missing from the JWT payload."
    );
  });

  it('should throw error when payload is invalid JSON', async () => {
    // header: {"alg":"HS256","typ":"JWT"}
    // payload: invalid base64
    const jwtWithInvalidPayload =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.!!!invalid!!!.signature';
    await expect(getSubFromJwt(jwtWithInvalidPayload)).rejects.toThrow(
      'Failed to parse JWT.'
    );
  });
});

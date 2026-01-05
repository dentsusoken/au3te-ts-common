/*
 * Copyright (C) 2023 Authlete, Inc.
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
import { z } from 'zod';
import { jwsAlgSchema } from '../jose/JWSAlg';
import { jweAlgSchema } from '../jose/JWEAlg';
import { jweEncSchema } from '../jose/JWEEnc';

export const authenticationTypeSchema = z.enum(['BASIC', 'BEARER']);

export type AuthenticationType = z.infer<typeof authenticationTypeSchema>;

/**
 * Zod schema for Resource Server.
 *
 * @property {string} id - The identifier of the resource server.
 * @property {string} secret - The secret of the resource server.
 * @property {string} uri - The URI of the resource server.
 * @property {JWSAlg|null|undefined} [introspectionSignAlg] - The JWS algorithm for signing the introspection response.
 * @property {JWEAlg|null|undefined} [introspectionEncryptionAlg] - The JWE algorithm for encrypting the introspection response.
 * @property {JWEEnc|null|undefined} [introspectionEncryptionEnc] - The JWE encryption algorithm for encrypting the introspection response.
 * @property {string|null|undefined} [sharedKeyForIntrospectionResponseSign] - The shared key for signing the introspection response.
 * @property {string|null|undefined} [sharedKeyForIntrospectionResponseEncryption] - The shared key for encrypting the introspection response.
 * @property {string|null|undefined} [publicKeyForIntrospectionResponseEncryption] - The public key for encrypting the introspection response.
 *
 * @example
 * // Valid schema usage
 * const rs = {
 *   id: 'rs1',
 *   secret: 'secret',
 *   uri: 'https://rs1.example.com',
 *   introspectionSignAlg: 'RS256'
 * };
 * resourceServerSchema.parse(rs);
 */
export const resourceServerSchema = z.object({
  id: z.string(),
  authenticationType: authenticationTypeSchema,
  secret: z.string(),
  uri: z.string().url(),
  introspectionSignAlg: jwsAlgSchema.nullish(),
  introspectionEncryptionAlg: jweAlgSchema.nullish(),
  introspectionEncryptionEnc: jweEncSchema.nullish(),
  sharedKeyForIntrospectionResponseSign: z.string().nullish(),
  sharedKeyForIntrospectionResponseEncryption: z.string().nullish(),
  publicKeyForIntrospectionResponseEncryption: z.string().nullish(),
});

/**
 * Resource Server.
 *
 * @typedef {Object} ResourceServer
 * @property {string} id - The identifier of the resource server.
 * @property {string} secret - The secret of the resource server.
 * @property {string} uri - The URI of the resource server.
 * @property {JWSAlg|null|undefined} [introspectionSignAlg] - The JWS algorithm for signing the introspection response.
 * @property {JWEAlg|null|undefined} [introspectionEncryptionAlg] - The JWE algorithm for encrypting the introspection response.
 * @property {JWEEnc|null|undefined} [introspectionEncryptionEnc] - The JWE encryption algorithm for encrypting the introspection response.
 * @property {string|null|undefined} [sharedKeyForIntrospectionResponseSign] - The shared key for signing the introspection response.
 * @property {string|null|undefined} [sharedKeyForIntrospectionResponseEncryption] - The shared key for encrypting the introspection response.
 * @property {string|null|undefined} [publicKeyForIntrospectionResponseEncryption] - The public key for encrypting the introspection response.
 */
export type ResourceServer = z.infer<typeof resourceServerSchema>;

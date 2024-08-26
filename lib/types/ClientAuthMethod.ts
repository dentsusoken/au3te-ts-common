/*
 * Copyright (C) 2019-2024 Authlete, Inc.
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
 * Flag indicating that the client authentication method is secret based.
 * @type {number}
 */
const FLAG_SECRET_BASED = 1;

/**
 * Flag indicating that the client authentication method is JWT based.
 * @type {number}
 */
const FLAG_JWT_BASED = 2;

/**
 * Flag indicating that the client authentication method is certificate based.
 * @type {number}
 */
const FLAG_CERTIFICATE_BASED = 4;

/**
 * Array to store the instances of ClientAuthMethod.
 * @type {ClientAuthMethod[]}
 */
const clientAuthMethods: ClientAuthMethod[] = [];

/**
 * Represents a client authentication method.
 */
export class ClientAuthMethod {
  /**
   * No client authentication.
   * @type {ClientAuthMethod}
   */
  static readonly NONE = new ClientAuthMethod(0, 'none', 0);

  /**
   * Client authentication using client secret basic.
   * @type {ClientAuthMethod}
   */
  static readonly CLIENT_SECRET_BASIC = new ClientAuthMethod(
    1,
    'client_secret_basic',
    1
  );

  /**
   * Client authentication using client secret post.
   * @type {ClientAuthMethod}
   */
  static readonly CLIENT_SECRET_POST = new ClientAuthMethod(
    2,
    'client_secret_post',
    1
  );

  /**
   * Client authentication using client secret JWT.
   * @type {ClientAuthMethod}
   */
  static readonly CLIENT_SECRET_JWT = new ClientAuthMethod(
    3,
    'client_secret_jwt',
    2
  );

  /**
   * Client authentication using private key JWT.
   * @type {ClientAuthMethod}
   */
  static readonly PRIVATE_KEY_JWT = new ClientAuthMethod(
    4,
    'private_key_jwt',
    2
  );

  /**
   * Client authentication using TLS client auth.
   * @type {ClientAuthMethod}
   */
  static readonly TLS_CLIENT_AUTH = new ClientAuthMethod(
    5,
    'tls_client_auth',
    4
  );

  /**
   * Client authentication using self-signed TLS client auth.
   * @type {ClientAuthMethod}
   */
  static readonly SELF_SIGNED_TLS_CLIENT_AUTH = new ClientAuthMethod(
    6,
    'self_signed_tls_client_auth',
    4
  );

  /**
   * Client authentication using attestation JWT.
   * @type {ClientAuthMethod}
   */
  static readonly ATTEST_JWT_CLIENT_AUTH = new ClientAuthMethod(
    7,
    'attest_jwt_client_auth',
    2
  );

  /**
   * Gets the ClientAuthMethod instance by its value.
   * @param {number} value - The value of the client authentication method.
   * @returns {ClientAuthMethod | undefined} The ClientAuthMethod instance or undefined if not found.
   */
  static getByValue(value: number): ClientAuthMethod | undefined {
    return clientAuthMethods.find((v) => v.value === value);
  }

  /**
   * Gets the ClientAuthMethod instance by its name.
   * @param {string} name - The name of the client authentication method.
   * @returns {ClientAuthMethod | undefined} The ClientAuthMethod instance or undefined if not found.
   */
  static getByName(name: string): ClientAuthMethod | undefined {
    return clientAuthMethods.find((v) => v.name === name);
  }

  /**
   * Creates an instance of ClientAuthMethod.
   * @param {number} value - The value of the client authentication method.
   * @param {string} name - The name of the client authentication method.
   * @param {number} flags - The flags associated with the client authentication method.
   */
  private constructor(
    public readonly value: number,
    public readonly name: string,
    private readonly flags: number
  ) {
    clientAuthMethods.push(this);
  }

  /**
   * Checks if the client authentication method is secret based.
   * @returns {boolean} True if the client authentication method is secret based, false otherwise.
   */
  isSecretBased(): boolean {
    return (this.flags & FLAG_SECRET_BASED) !== 0;
  }

  /**
   * Checks if the client authentication method is JWT based.
   * @returns {boolean} True if the client authentication method is JWT based, false otherwise.
   */
  isJwtBased(): boolean {
    return (this.flags & FLAG_JWT_BASED) !== 0;
  }

  /**
   * Checks if the client authentication method is certificate based.
   * @returns {boolean} True if the client authentication method is certificate based, false otherwise.
   */
  isCertificateBased(): boolean {
    return (this.flags & FLAG_CERTIFICATE_BASED) !== 0;
  }

  toString(): string {
    return `{name=${this.name}, value=${
      this.value
    }, isSecretBased=${this.isSecretBased()}, isJwtBased=${this.isJwtBased()}, isCertificateBased=${this.isCertificateBased()}}`;
  }
}

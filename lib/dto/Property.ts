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
 * Represents a property with a key, value, and optional hidden flag.
 */
export class Property {
  /**
   * Creates a new instance of the Property class.
   * @param {string} key - The key of the property.
   * @param {string} value - The value of the property.
   * @param {boolean} [hidden=false] - Indicates whether the property should be hidden.
   */
  public constructor(
    public key: string,
    public value: string,
    public hidden = false
  ) {}

  /**
   * Returns a string representation of the property.
   * @returns {string} The string representation of the property.
   */
  public toString(): string {
    return `${this.key}=${this.value}${this.hidden ? ' (hidden)' : ''}`;
  }
}

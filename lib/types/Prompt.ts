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
 * Array to store the instances of Prompt.
 * @type {Prompt[]}
 */
const prompts: Prompt[] = [];

/**
 * Represents a prompt type.
 */
export class Prompt {
  /**
   * No prompt.
   * @type {Prompt}
   */
  static readonly NONE = new Prompt(0, 'none');

  /**
   * Login prompt.
   * @type {Prompt}
   */
  static readonly LOGIN = new Prompt(1, 'login');

  /**
   * Consent prompt.
   * @type {Prompt}
   */
  static readonly CONSENT = new Prompt(2, 'consent');

  /**
   * Select account prompt.
   * @type {Prompt}
   */
  static readonly SELECT_ACCOUNT = new Prompt(3, 'select_account');

  /**
   * Create prompt.
   * @type {Prompt}
   */
  static readonly CREATE = new Prompt(4, 'create');

  /**
   * Creates an instance of Prompt.
   * @param {number} value - The value of the prompt.
   * @param {string} name - The name of the prompt.
   */
  private constructor(
    public readonly value: number,
    public readonly name: string
  ) {
    prompts.push(this);
  }

  /**
   * Gets the Prompt instance by its value.
   * @param {number} value - The value of the prompt.
   * @returns {Prompt | undefined} The Prompt instance or undefined if not found.
   */
  static getByValue(value: number): Prompt | undefined {
    return prompts.find((v) => v.value === value);
  }

  /**
   * Gets the Prompt instance by its name.
   * @param {string} name - The name of the prompt.
   * @returns {Prompt | undefined} The Prompt instance or undefined if not found.
   */
  static getByName(name: string): Prompt | undefined {
    return prompts.find((v) => v.name === name);
  }

  /**
   * Converts an array of Prompt instances to a bit representation.
   * @param {Prompt[]} array - The array of Prompt instances.
   * @returns {number} The bit representation of the array.
   */
  static toBits(array: Prompt[]): number {
    return array.reduce((acc, v) => acc | (1 << v.value), 0);
  }

  /**
   * Converts a bit representation to an array of Prompt instances.
   * @param {number} bits - The bit representation.
   * @returns {Prompt[]} The array of Prompt instances.
   */
  static toArray(bits: number): Prompt[] {
    const result: Prompt[] = [];

    prompts.forEach((v) => {
      if (bits & (1 << v.value)) {
        result.push(v);
      }
    });

    return result;
  }
}

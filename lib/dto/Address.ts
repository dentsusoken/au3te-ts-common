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
 * Represents an address.
 */
export class Address {
  /**
   * The formatted address.
   * @type {string | undefined}
   */
  formatted?: string;

  /**
   * The street address.
   * @type {string | undefined}
   */
  streetAddress?: string;

  /**
   * The locality (e.g., city).
   * @type {string | undefined}
   */
  locality?: string;

  /**
   * The region (e.g., state or province).
   * @type {string | undefined}
   */
  region?: string;

  /**
   * The postal code.
   * @type {string | undefined}
   */
  postalCode?: string;

  /**
   * The country.
   * @type {string | undefined}
   */
  country?: string;
}

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

import { z } from 'zod';
import { HttpCall } from './HttpCall';
import { responseToError } from '../utils/responseToError';

/**
 * Represents an API call that can be executed.
 * @template T - The type of the response data.
 */
export class ApiCall<T> {
  /**
   * Creates a new instance of ApiCall.
   * @param {HttpCall} httpCall - The HttpCall instance to use for the request.
   * @param {z.ZodType<T>} schema - The Zod schema to validate the response data against.
   */
  constructor(private httpCall: HttpCall, private schema: z.ZodType<T>) {}

  async call(): Promise<T> {
    const response = await this.httpCall.call();

    if (response.ok) {
      if (response.status === 204) {
        return this.schema.parse({});
      }

      const json = await response.json();

      return this.schema.parse(json);
    }

    throw responseToError(response);
  }

  async callGet(): Promise<T> {
    const response = await this.httpCall.call();

    if (response.ok) {
      if (response.status === 204) {
        return this.schema.parse('{}');
      }

      const text = await response.text();

      return this.schema.parse(text);
    }

    throw responseToError(response);
  }
}

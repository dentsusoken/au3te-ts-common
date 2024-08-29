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
import { AuthleteApiError } from './AuthleteApiError';

export class ApiCall<T> {
  constructor(private httpCall: HttpCall, private schema: z.ZodType<T>) {}

  async call(): Promise<T> {
    let response: Response;

    try {
      response = await this.httpCall.call();

      if (response.ok) {
        const json = await response.json();
        return this.schema.parse(json);
      }
    } catch (e: unknown) {
      if (e instanceof AuthleteApiError) {
        throw e;
      }

      const cause = e instanceof Error ? e : new Error(String(e));
      throw new AuthleteApiError(
        this.httpCall.url,
        this.httpCall.requestInit,
        cause
      );
    }

    throw new AuthleteApiError(
      this.httpCall.url,
      this.httpCall.requestInit,
      undefined,
      response
    );
  }
}

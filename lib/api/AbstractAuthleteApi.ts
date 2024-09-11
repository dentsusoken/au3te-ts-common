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
import { AuthleteApi } from './AuthleteApi';
import { PostHttpCall } from './PostHttpCall';
import { ApiCall } from './ApiCall';
import { PushedAuthReqRequest } from '../schemas/par/PushedAuthReqRequest';
import {
  PushedAuthReqResponse,
  pushedAuthReqResponseSchema,
} from '../schemas/par/PushedAuthReqResponse';

export abstract class AbstractAuthleteApi implements AuthleteApi {
  protected abstract baseUrl: string;
  protected abstract auth: string;
  protected abstract pushAuthorizationRequestPath: string;

  async callPostApi<REQ extends object, RES>(
    path: string,
    request: REQ,
    schema: z.ZodType<RES>
  ): Promise<RES> {
    const httpCall = new PostHttpCall(this.baseUrl, path, this.auth, request);
    const apiCall = new ApiCall(httpCall, schema);

    return apiCall.call();
  }

  async pushAuthorizationRequest(
    request: PushedAuthReqRequest
  ): Promise<PushedAuthReqResponse> {
    return this.callPostApi(
      this.pushAuthorizationRequestPath,
      request,
      pushedAuthReqResponseSchema
    );
  }
}

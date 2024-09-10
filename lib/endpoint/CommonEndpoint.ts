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

import {
  BuildEndpointErrorMessage,
  defaultBuildEndpointErrorMessage,
} from './buildEndpointErrorMessage';
import {
  BuildErrorMessage,
  defaultBuildErrorMessage,
} from './buildErrorMessage';
import {
  BuildUnknownActionMessage,
  createBuildUnknownActionMessage,
} from './buildUnknownActionMessage';
import {
  defaultOutputErrorMessage,
  OutputErrorMessage,
} from './outputErrorMessage';
import { ProcessError, createProcessError } from './processError';

export type CommonEndpointConstructorOptions = {
  buildErrorMessage?: BuildErrorMessage;
  buildEndpointErrorMessage?: BuildEndpointErrorMessage;
  outputErrorMessage?: OutputErrorMessage;
  processError?: ProcessError;
  buildUnknownActionMessage?: BuildUnknownActionMessage;
};

export class CommonEndpoint {
  readonly path: string;
  readonly buildErrorMessage: BuildErrorMessage;
  readonly buildEndpointErrorMessage: BuildEndpointErrorMessage;
  readonly outputErrorMessage: OutputErrorMessage;
  readonly processError: ProcessError;
  readonly buildUnknownActionMessage: BuildUnknownActionMessage;

  constructor(
    path: string,
    {
      buildErrorMessage,
      buildEndpointErrorMessage,
      outputErrorMessage,
      processError,
      buildUnknownActionMessage,
    }: CommonEndpointConstructorOptions = {}
  ) {
    this.path = path;
    this.buildErrorMessage = buildErrorMessage ?? defaultBuildErrorMessage;
    this.buildEndpointErrorMessage =
      buildEndpointErrorMessage ?? defaultBuildEndpointErrorMessage;
    this.outputErrorMessage = outputErrorMessage ?? defaultOutputErrorMessage;
    this.processError =
      processError ??
      createProcessError({
        path: this.path,
        buildErrorMessage: this.buildErrorMessage,
        buildEndpointErrorMessage: this.buildEndpointErrorMessage,
        outputErrorMessage: this.outputErrorMessage,
      });
    this.buildUnknownActionMessage =
      buildUnknownActionMessage ??
      createBuildUnknownActionMessage({
        path: this.path,
        buildEndpointErrorMessage: this.buildEndpointErrorMessage,
      });
  }
}

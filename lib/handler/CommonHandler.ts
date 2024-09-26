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
  BuildApiErrorMessage,
  createBuildApiErrorMessage,
} from './buildApiErrorMessage';
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

export type CommonHandlerConstructorOptions = {
  buildErrorMessage?: BuildErrorMessage;
  buildApiErrorMessage?: BuildApiErrorMessage;
  outputErrorMessage?: OutputErrorMessage;
  processError?: ProcessError;
  buildUnknownActionMessage?: BuildUnknownActionMessage;
};

export class CommonHandler {
  readonly path: string;
  readonly buildErrorMessage: BuildErrorMessage;
  readonly buildApiErrorMessage: BuildApiErrorMessage;
  readonly outputErrorMessage: OutputErrorMessage;
  readonly processError: ProcessError;
  readonly buildUnknownActionMessage: BuildUnknownActionMessage;

  constructor(path: string, options: CommonHandlerConstructorOptions = {}) {
    this.path = path;
    this.buildErrorMessage =
      options.buildErrorMessage ?? defaultBuildErrorMessage;
    this.buildApiErrorMessage =
      options.buildApiErrorMessage ?? createBuildApiErrorMessage(this.path);
    this.outputErrorMessage =
      options.outputErrorMessage ?? defaultOutputErrorMessage;
    this.processError =
      options.processError ??
      createProcessError({
        buildErrorMessage: this.buildErrorMessage,
        buildApiErrorMessage: this.buildApiErrorMessage,
        outputErrorMessage: this.outputErrorMessage,
      });
    this.buildUnknownActionMessage =
      options.buildUnknownActionMessage ??
      createBuildUnknownActionMessage({
        buildApiErrorMessage: this.buildApiErrorMessage,
      });
  }
}

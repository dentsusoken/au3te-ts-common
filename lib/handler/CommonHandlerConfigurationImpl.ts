/*
 * Copyright (C) 2014-2024 Authlete, Inc.
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
  defaultBuildApiErrorMessage,
} from './buildApiErrorMessage';
import {
  BuildUnknownActionMessage,
  createBuildUnknownActionMessage,
} from './buildUnknownActionMessage';
import {
  defaultOutputErrorMessage,
  OutputErrorMessage,
} from './outputErrorMessage';
import { createProcessError, ProcessError } from './processError';
import { CommonHandlerConfiguration } from './CommonHandlerConfiguration';

/**
 * Implementation of the CommonHandlerConfiguration interface.
 */
export class CommonHandlerConfigurationImpl
  implements CommonHandlerConfiguration
{
  buildApiErrorMessage: BuildApiErrorMessage = defaultBuildApiErrorMessage;

  outputErrorMessage: OutputErrorMessage = defaultOutputErrorMessage;

  processError: ProcessError = createProcessError({
    buildApiErrorMessage: this.buildApiErrorMessage,
    outputErrorMessage: this.outputErrorMessage,
  });

  buildUnknownActionMessage: BuildUnknownActionMessage =
    createBuildUnknownActionMessage({
      buildApiErrorMessage: this.buildApiErrorMessage,
    });
}

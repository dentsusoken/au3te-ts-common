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

import { BuildApiErrorMessage } from './buildApiErrorMessage';
import { BuildUnknownActionMessage } from './buildUnknownActionMessage';
import { OutputErrorMessage } from './outputErrorMessage';
import { ProcessError } from './processError';

/**
 * Interface representing the configuration for common handlers.
 * This interface defines methods for handling errors, building error messages,
 * and processing unknown actions in the application.
 */
export interface CommonHandlerConfiguration {
  /**
   * Function to build API error messages.
   */
  buildApiErrorMessage: BuildApiErrorMessage;

  /**
   * Function to output error messages.
   */
  outputErrorMessage: OutputErrorMessage;

  /**
   * Function to process errors.
   */
  processError: ProcessError;

  /**
   * Function to build messages for unknown actions.
   */
  buildUnknownActionMessage: BuildUnknownActionMessage;
}

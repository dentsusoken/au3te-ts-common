/*
 * Copyright (C) 2014-2024 Authlete, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FORMAT } from './constants';
import { CredentialFormat } from './types';

/**
 * Checks if the format of an issuable credential matches the specified format.
 *
 * @param issuableCredential - The credential to check the format of
 * @param format - The expected credential format to match against
 * @returns True if the credential format matches the specified format, false otherwise
 */
export const matchFormat = (
  issuableCredential: Record<string, unknown>,
  format: CredentialFormat
): boolean => {
  return issuableCredential[FORMAT] === format;
};

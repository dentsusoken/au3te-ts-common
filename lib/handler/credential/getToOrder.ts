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

import { MSO_MDOC } from './constants';
import { ToOrder } from './toOrder';
import { CredentialFormat } from '../../schemas/credential/CredentialFormat';

/**
 * Function type that returns a ToOrder function based on the credential format.
 *
 * @param format - The format of the credential to be issued
 * @returns A ToOrder function that handles credential issuance for the specified format
 */
export type GetToOrder = (format: CredentialFormat) => ToOrder;

/**
 * Parameters for creating a GetToOrder function.
 *
 * @property mdocToOrder - ToOrder function for handling mDoc credential issuance
 */
type CreateGetToOrderParams = {
  mdocToOrder: ToOrder;
};

/**
 * Creates a GetToOrder function that returns the appropriate ToOrder handler
 * based on the credential format.
 *
 * @param params - Configuration parameters containing format-specific ToOrder handlers
 * @param params.mdocToOrder - ToOrder function for handling mDoc credential issuance
 * @returns A GetToOrder function that selects the appropriate handler
 * @throws {Error} If the requested credential format is not supported
 */
export const createGetToOrder =
  ({ mdocToOrder }: CreateGetToOrderParams): GetToOrder =>
  (format: CredentialFormat) => {
    if (format === MSO_MDOC) {
      return mdocToOrder;
    }

    throw new Error(`Unsupported format: ${format}`);
  };

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

import { Mdocs } from './types';

export const mockMdocs: { [subject: string]: Mdocs } = {
  '1004': {
    'org.iso.18013.5.1.mDL': {
      'org.iso.18013.5.1': {
        family_name: 'Silverstone',
        given_name: 'Inga',
        birth_date: 'cbor:1004("1991-11-06")',
        issuing_country: 'US',
        document_number: '12345678',
        driving_privileges: [
          {
            vehicle_category_code: 'A',
            issue_date: 'cbor:1004("2023-01-01")',
            expiry_date: 'cbor:1004("2043-01-01")',
          },
        ],
      },
    },
  },
};

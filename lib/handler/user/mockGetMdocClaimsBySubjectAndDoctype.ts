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

import { GetMdocClaimsBySubjectAndDoctype } from './getMdocClaimsBySubjectAndDoctype';
import { mockMdocs } from './mockMdocs';

/**
 * Implements a mock mobile document (mdoc) claims lookup service by subject and document type.
 * Performs a lookup against a static mdoc repository using the subject identifier and document type.
 * This implementation is intended for testing and development purposes only.
 *
 * @implements {GetMdocClaimsBySubjectAndDoctype}
 * @param subject - The unique subject identifier to search for
 * @param doctype - The document type identifier (e.g. 'org.iso.18013.5.1.mDL')
 * @returns {Promise<Mdoc | undefined>} Returns a Promise that resolves to:
 *                                     - Mdoc object if matching claims are found
 *                                     - undefined if no matching claims are found
 * @example
 * const mdoc = await mockGetMdocClaimsBySubjectAndDoctype('1004', 'org.iso.18013.5.1.mDL');
 * if (mdoc) {
 *   console.log('Mdoc claims found:', mdoc);
 * }
 */
export const mockGetMdocClaimsBySubjectAndDoctype: GetMdocClaimsBySubjectAndDoctype =
  async (subject, doctype) => {
    return mockMdocs[subject]?.[doctype];
  };

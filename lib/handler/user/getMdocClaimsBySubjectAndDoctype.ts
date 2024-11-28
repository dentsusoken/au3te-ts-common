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

import { Mdoc } from './types';

/**
 * Type definition for a function that retrieves mobile document (mdoc) claims for a specific subject and document type.
 *
 * @param subject - The unique subject identifier of the user
 * @param doctype - The document type identifier (e.g. 'org.iso.18013.5.1.mDL')
 * @returns Promise resolving to the mdoc claims if found, or undefined if no match exists
 */
export type GetMdocClaimsBySubjectAndDoctype = (
  subject: string,
  doctype: string
) => Promise<Mdoc | undefined>;

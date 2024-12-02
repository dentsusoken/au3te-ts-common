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

import { CLAIMS, DOCTYPE } from './constants';

/**
 * Type of credential issuance.
 * - 'single': Single credential issuance
 * - 'batch': Batch credential issuance
 * - 'deferred': Deferred credential issuance
 */
export type CredentialType = 'single' | 'batch' | 'deferred';

/**
 * Format of verifiable credential.
 * - 'vc+sd-jwt': W3C Verifiable Credentials with SD-JWT
 * - 'mso_mdoc': ISO/IEC 18013-5 mdoc
 */
export type CredentialFormat = 'vc+sd-jwt' | 'mso_mdoc';

/**
 * Represents a collection of claims where each claim is a key-value pair.
 * The value can be of any type.
 */
export type Claims = Record<string, unknown>;

/**
 * Represents a mobile document (mdoc) structure.
 * Contains namespaces as keys (e.g. 'org.iso.18013.5.1') mapping to their respective claims.
 */
export type Mdoc = {
  [namespace: string]: Claims;
};

/**
 * Collection of mobile documents indexed by document type.
 * Document types (e.g. 'org.iso.18013.5.1.mDL') map to their full mdoc structure.
 */
export type Mdocs = { [doctype: string]: Mdoc };
/**
 * Represents a mobile document (mdoc) credential structure.
 * Contains a document type identifier and associated claims data.
 */
export type MdocCredential = {
  [DOCTYPE]?: string;
  [CLAIMS]?: Mdoc;
};
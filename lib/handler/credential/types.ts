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

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

import { z } from 'zod';

/**
 * Constant representing the W3C Verifiable Credentials with SD-JWT format.
 * This format combines W3C Verifiable Credentials with Selective Disclosure JWT.
 *
 * @constant {string}
 */
export const CREDENTIAL_FORMAT_VC_SD_JWT = 'vc+sd-jwt' as const;

/**
 * Constant representing the ISO/IEC 18013-5 mobile document (mdoc) format.
 * This format is used for mobile driving licenses and other mobile documents.
 *
 * @constant {string}
 */
export const CREDENTIAL_FORMAT_MSO_MDOC = 'mso_mdoc' as const;

/**
 * Array of supported credential format constants.
 * Currently supports VC+SD-JWT and MSO_MDOC formats.
 *
 * @constant {readonly string[]}
 */
export const credentialFormats = [
  CREDENTIAL_FORMAT_VC_SD_JWT,
  CREDENTIAL_FORMAT_MSO_MDOC,
] as const;

/**
 * Type representing valid credential formats.
 * Derived from the credentialFormats array.
 *
 * @typedef {string} CredentialFormat
 */
export type CredentialFormat = (typeof credentialFormats)[number];

/**
 * Zod schema for validating credential formats.
 * Preprocesses input by converting to lowercase and validates against supported formats.
 *
 * @constant {z.ZodType<CredentialFormat>}
 */
export const credentialFormatSchema = z.preprocess(
  (v) => (v && typeof v === 'string' ? v.toLowerCase() : v),
  z.enum(credentialFormats)
) as z.ZodType<CredentialFormat>;

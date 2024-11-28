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

/**
 * Property key for format in credential objects.
 * Used to identify the format of the credential (e.g. 'vc+sd-jwt', 'mso_mdoc').
 */
export const FORMAT = 'format';
/**
 * Property key for document type in credential objects.
 * Used to identify the type of mobile document (e.g. 'org.iso.18013.5.1.mDL').
 */
export const DOCTYPE = 'doctype';

/**
 * Property key for claims in credential objects.
 * Used to access the claims data structure containing the actual credential information.
 */
export const CLAIMS = 'claims';

/**
 * Property key for the mdoc format in credential objects.
 * Used to identify the format of the credential as mdoc.
 */
export const MSO_MDOC = 'mso_mdoc';

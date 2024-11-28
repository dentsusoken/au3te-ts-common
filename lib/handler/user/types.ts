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

/**
 * Represents a collection of claims within a specific namespace of an mdoc.
 * Each claim is a key-value pair where the value can be of any type.
 */
export type MdocSubClaims = Record<string, unknown>;

/**
 * Represents a mobile document (mdoc) structure.
 * Contains namespaces as keys (e.g. 'org.iso.18013.5.1') mapping to their respective claims.
 */
export type Mdoc = {
  [namespace: string]: MdocSubClaims;
};

/**
 * Collection of mobile documents indexed by document type.
 * Document types (e.g. 'org.iso.18013.5.1.mDL') map to their full mdoc structure.
 */
export type Mdocs = { [doctype: string]: Mdoc };

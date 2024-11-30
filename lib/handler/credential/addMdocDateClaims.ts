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

import { formatCborDate } from '../../utils/formatDate';
import { nextYear } from '../../utils/nextYear';
import { EXPIRY_DATE, ISSUE_DATE } from './constants';
import { Claims } from './types';

type AddMdocDateClaimsParams = {
  subClaims: Claims;
  requestedSubClaims: Claims | undefined;
  doctype?: string;
};

export type AddMdocDateClaims = ({
  subClaims,
  requestedSubClaims,
  doctype,
}: AddMdocDateClaimsParams) => void;

export const defaultAddMdocDateClaims: AddMdocDateClaims = ({
  subClaims,
  requestedSubClaims,
}) => {
  const now = new Date();

  if (!requestedSubClaims || ISSUE_DATE in requestedSubClaims) {
    subClaims[ISSUE_DATE] = formatCborDate(now);
  }

  if (!requestedSubClaims || EXPIRY_DATE in requestedSubClaims) {
    const expiry = nextYear(now);
    subClaims[EXPIRY_DATE] = formatCborDate(expiry);
  }
};

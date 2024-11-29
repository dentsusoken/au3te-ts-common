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

/**
 * Adds date claims (issue_date and expiry_date) for mDoc (ISO/IEC 18013-5 mobile documentation)
 * @param subclaims - The map to store the date claims
 * @param requestedSubclaims - The map containing requested claims
 */
export const addMdocDateClaims = (
  subclaims: Claims,
  requestedSubclaims: Claims
): void => {
  const now = new Date();

  if (ISSUE_DATE in requestedSubclaims) {
    subclaims[ISSUE_DATE] = formatCborDate(now);
  }

  if (EXPIRY_DATE in requestedSubclaims) {
    const expiry = nextYear(now);
    subclaims[EXPIRY_DATE] = formatCborDate(expiry);
  }
};

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

import { describe, expect, it } from 'vitest';
import { mockGetMdocClaimsBySubjectAndDoctype } from './mockGetMdocClaimsBySubjectAndDoctype';

describe('mockGetMdocClaimsBySubjectAndDoctype', () => {
  const validSubject = '1004';
  const validDoctype = 'org.iso.18013.5.1.mDL';
  const invalidSubject = '9999';
  const invalidDoctype = 'invalid.doctype';

  it('should return correct Mdoc for valid subject and doctype combination', async () => {
    const result = await mockGetMdocClaimsBySubjectAndDoctype(
      validSubject,
      validDoctype
    );

    expect(result).toBeDefined();
    expect(result?.['org.iso.18013.5.1']).toBeDefined();
    expect(result?.['org.iso.18013.5.1'].family_name).toBe('Silverstone');
    expect(result?.['org.iso.18013.5.1'].given_name).toBe('Inga');
  });

  it('should return undefined for non-existent subject', async () => {
    const result = await mockGetMdocClaimsBySubjectAndDoctype(
      invalidSubject,
      validDoctype
    );

    expect(result).toBeUndefined();
  });

  it('should return undefined for non-existent doctype', async () => {
    const result = await mockGetMdocClaimsBySubjectAndDoctype(
      validSubject,
      invalidDoctype
    );

    expect(result).toBeUndefined();
  });

  it('should return undefined for non-existent subject and doctype combination', async () => {
    const result = await mockGetMdocClaimsBySubjectAndDoctype(
      invalidSubject,
      invalidDoctype
    );

    expect(result).toBeUndefined();
  });
});

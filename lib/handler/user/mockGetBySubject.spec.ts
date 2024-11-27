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
import { mockGetBySubject } from './mockGetBySubject';

describe('mockGetBySubject', () => {
  it('should return a user when valid subject is provided', async () => {
    const user = await mockGetBySubject('1004');
    expect(user).toBeDefined();
    expect(user?.subject).toBe('1004');
  });

  it('should return undefined when invalid subject is provided', async () => {
    const user = await mockGetBySubject('nonexistent');
    expect(user).toBeUndefined();
  });

  it('should return user with all required OpenID Connect claims', async () => {
    const user = await mockGetBySubject('1004');
    expect(user).toBeDefined();
    expect(user?.loginId).toBe('inga');
    expect(user?.email).toBe('inga@example.com');
    expect(user?.givenName).toBe('Inga');
    expect(user?.familyName).toBe('Silverstone');
    expect(user?.address?.country).toBe('USA');
  });

  it('should handle empty subject', async () => {
    const user = await mockGetBySubject('');
    expect(user).toBeUndefined();
  });
});

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
import { mockGetByCredentials } from './mockGetByCredentials';

describe('mockGetByCredentials', () => {
  it('should return a user when valid credentials are provided', async () => {
    const user = await mockGetByCredentials('inga', 'inga');
    expect(user).toBeDefined();
    expect(user?.loginId).toBe('inga');
    expect(user?.name).toBe('Inga Silverstone');
  });

  it('should return undefined when invalid loginId is provided', async () => {
    const user = await mockGetByCredentials('nonexistent', 'inga');
    expect(user).toBeUndefined();
  });

  it('should return undefined when invalid password is provided', async () => {
    const user = await mockGetByCredentials('inga', 'wrongpassword');
    expect(user).toBeUndefined();
  });

  it('should return user with all required OpenID Connect claims', async () => {
    const user = await mockGetByCredentials('inga', 'inga');
    expect(user).toBeDefined();
    expect(user?.subject).toBe('1004');
    expect(user?.loginId).toBe('inga');
    expect(user?.email).toBe('inga@example.com');
    expect(user?.givenName).toBe('Inga');
    expect(user?.familyName).toBe('Silverstone');
    expect(user?.address?.country).toBe('USA');
  });

  it('should handle empty credentials', async () => {
    const user = await mockGetByCredentials('', '');
    expect(user).toBeUndefined();
  });
});

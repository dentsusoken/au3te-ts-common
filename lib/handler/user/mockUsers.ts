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

import { User } from '../../schemas/common';

/**
 * Static array containing mock user data for testing and development.
 * Each user object implements the OpenID Connect standard claims specification,
 * providing a comprehensive set of user attributes commonly used in authentication
 * and authorization scenarios.
 *
 * @type {User[]}
 */
export const mockUsers: User[] = [
  {
    subject: '1004',
    loginId: 'inga',
    password: 'inga',
    name: 'Inga Silverstone',
    email: 'inga@example.com',
    address: {
      formatted: '114 Old State Hwy 127, Shoshone, CA 92384, USA',
      country: 'USA',
      locality: 'Shoshone',
      streetAddress: '114 Old State Hwy 127',
      postalCode: 'CA 92384',
      region: undefined,
    },
    phoneNumberVerified: false,
    emailVerified: false,
    givenName: 'Inga',
    familyName: 'Silverstone',
    middleName: undefined,
    nickname: undefined,
    profile: 'https://example.com/inga/profile',
    picture: 'https://example.com/inga/me.jpg',
    website: 'https://example.com/inga/',
    gender: 'female',
    zoneinfo: 'America/Toronto',
    locale: 'en-US',
    preferredUsername: 'inga',
    birthdate: '1991-11-06',
    updatedAt: '2022-04-30',
  },
];

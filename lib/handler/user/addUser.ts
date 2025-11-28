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
import { User } from '../../schemas/common/User';

/**
 * Type definition for a function that adds a user to the user store.
 *
 * @typeParam U - The user type that extends the base User type. Defaults to User.
 *
 * @param user - The user to add to the user store.
 *
 * @returns A Promise that resolves when the user is added to the user store.
 */
export type AddUser<U extends User = User> = (user: U) => Promise<void>;

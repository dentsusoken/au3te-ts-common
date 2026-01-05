/*
 * Copyright (C) 2023 Authlete, Inc.
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
import { AuthenticateResourceServer } from './authenticateResorceServer';
import { GetResourceServer } from './getResourceServer';
import { mockAuthenticateResorceServer } from './mockAuthenticateResorceServer';
import { mockGetResourceServer } from './mockGetResourceServer';
import { ResourceServerHandlerConfiguration } from './ResourceServerHandlerConfiguration';

/**
 * Implementation of the `ResourceServerHandlerConfiguration` interface.
 * Uses mock implementations for `get` and `authenticate` by default.
 */
export class ResourceServerHandlerConfigurationImpl
  implements ResourceServerHandlerConfiguration
{
  /**
   * The function to retrieve a resource server.
   * Defaults to {@link mockGetResourceServer}.
   */
  get: GetResourceServer;

  /**
   * The function to authenticate a resource server.
   * Defaults to {@link mockAuthenticateResorceServer}.
   */
  authenticate: AuthenticateResourceServer;

  constructor() {
    this.get = mockGetResourceServer;
    this.authenticate = mockAuthenticateResorceServer;
  }
}

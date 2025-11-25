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

import { z } from 'zod';

/**
 * Schema for server configuration used in federation flows.
 */
export const serverConfigSchema = z.object({
  /**
   * The name of the server.
   */
  name: z.string().min(1),

  /**
   * The issuer URL of the server.
   */
  issuer: z.string().min(1).url(),
});

/**
 * Type definition for ServerConfig.
 */
export type ServerConfig = z.infer<typeof serverConfigSchema>;

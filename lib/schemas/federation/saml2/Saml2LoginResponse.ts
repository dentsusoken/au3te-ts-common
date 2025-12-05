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
 * Schema for SAML 2.0 conditions element.
 * Defines validity time constraints for assertions.
 */
const conditionsSchema = z.object({
  /**
   * Time before which the assertion is not valid.
   */
  notBefore: z.string().nullish(),
  /**
   * Time after which the assertion is not valid.
   */
  notOnOrAfter: z.string().nullish(),
});

/**
 * Schema for SAML 2.0 response element.
 * Contains response metadata and identifiers.
 */
const responseSchema = z.object({
  /**
   * Destination URL where the response should be sent.
   */
  destination: z.string().nullish(),
  /**
   * Unique identifier for the response.
   */
  id: z.string(),
  /**
   * ID of the request this response is answering.
   */
  inResponseTo: z.string().nullish(),
  /**
   * Timestamp when the response was issued.
   */
  issueInstant: z.string(),
});

/**
 * Schema for audience restriction.
 * Specifies the intended audience for the assertion.
 */
const audienceSchema = z.string().nullish();
/**
 * Schema for issuer identifier.
 * Identifies the entity that issued the assertion.
 */
const issuerSchema = z.string();
/**
 * Schema for NameID.
 * Identifier for the authenticated principal.
 */
const nameIDSchema = z.string().nullish();

/**
 * Schema for session index information.
 * Contains authentication session details.
 */
const sessionIndexSchema = z.object({
  /**
   * Timestamp when authentication occurred.
   */
  authnInstant: z.string(),
  /**
   * Session index identifier.
   */
  sessionIndex: z.string().nullish(),
  /**
   * Time after which the session is not valid.
   */
  sessionNotOnOrAfter: z.string().nullish(),
});

/**
 * Schema for common attribute fields.
 * Standard attributes extracted from SAML attribute statements.
 */
const commonAttributeSchema = z.object({
  /**
   * Given name (first name) of the user.
   */
  givenName: z.string().nullish(),
  /**
   * Surname (last name) of the user.
   */
  surname: z.string().nullish(),
  /**
   * Email address of the user.
   */
  email: z.string().nullish(),
});

type commonAttributes = z.infer<typeof commonAttributeSchema>;

/**
 * Schema for SAML attributes.
 * Transforms OID-based attributes to common attribute names and preserves other attributes.
 */
const attributesSchema = z
  .record(z.string(), z.union([z.string(), z.array(z.string())]))
  .transform<
    Record<string, string | string[] | null | undefined> & commonAttributes
  >((v) => {
    const {
      ['urn:oid:2.5.4.42']: givenName,
      ['urn:oid:2.5.4.4']: surname,
      ['urn:oid:1.2.840.113549.1.9.1']: email,
      ...rest
    } = v;

    const commonAttributes = commonAttributeSchema.parse({
      givenName,
      surname,
      email,
    });

    return { ...rest, ...commonAttributes };
  });

/**
 * Schema for SAML 2.0 login response.
 * Represents a complete SAML 2.0 authentication response with assertions and attributes.
 */
export const saml2LoginResponseSchema = z.object({
  /**
   * Conditions that apply to the assertion.
   */
  conditions: conditionsSchema.nullish(),
  /**
   * Response metadata and identifiers.
   */
  response: responseSchema,
  /**
   * Intended audience for the assertion.
   */
  audience: audienceSchema.nullish(),
  /**
   * Entity that issued the assertion.
   */
  issuer: issuerSchema,
  /**
   * Identifier for the authenticated principal.
   */
  nameID: nameIDSchema.nullish(),
  /**
   * Session index information.
   */
  sessionIndex: sessionIndexSchema.nullish(),
  /**
   * User attributes extracted from the SAML response.
   */
  attributes: attributesSchema.nullish(),
});

/**
 * Type definition for Saml2LoginResponse.
 * Complete SAML 2.0 authentication response structure.
 */
export type Saml2LoginResponse = z.infer<typeof saml2LoginResponseSchema>;

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

/**
 * Formats a Date object into a YYYY-MM-DD string.
 *
 * @param date - The Date object to format
 * @returns The formatted date string in YYYY-MM-DD format
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Formats a date into a CBOR date string representation (format: cbor:1004("YYYY-MM-DD"))
 * @param date The date to format
 * @returns A string in the format cbor:1004("YYYY-MM-DD")
 */
export const formatCborDate = (date: Date): string => {
  return `cbor:1004("${formatDate(date)}")`;
};

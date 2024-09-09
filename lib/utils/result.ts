/*
 * Copyright (c) 2024 Dentsusoken
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

import { convertToError } from './errorUtils';

/**
 * Represents the result of an operation that can either be successful or fail with an error.
 * @template T The type of the value returned on success.
 */
export class Result<T> {
  /**
   * Creates a successful result with the specified value.
   * @template T The type of the value.
   * @param {T} value The value to be wrapped in the successful result.
   * @returns {Result<T>} A successful result containing the value.
   */
  static success<T>(value: T): Result<T> {
    return new Result(value, undefined);
  }

  /**
   * Creates a failure result with the specified error.
   * @template T The type of the value.
   * @param {Error} error The error to be wrapped in the failure result.
   * @returns {Result<T>} A failure result containing the error.
   */
  static failure<T>(error: Error): Result<T> {
    return new Result<T>(undefined, error);
  }

  /**
   * Constructs a new instance of the Result class.
   * @param {T | undefined} value The value associated with the result, if successful.
   * @param {Error | undefined} error The error associated with the result, if failed.
   * @throws {Error} If both value and error are provided.
   */
  private constructor(
    public value: T | undefined,
    public error: Error | undefined
  ) {
    if (value && error) {
      throw new Error('Result cannot be both success and failure');
    }
  }

  /**
   * Checks if the result is successful.
   * @returns {this is { value: T }} True if the result is successful, false otherwise.
   */
  isSuccess(): this is { value: T } {
    return this.error === undefined;
  }

  /**
   * Checks if the result is a failure.
   * @returns {this is { error: Error }} True if the result is a failure, false otherwise.
   */
  isFailure(): this is { error: Error } {
    return !this.isSuccess();
  }

  /**
   * Returns the value if the result is successful, or throws the error if it is a failure.
   * @returns {T} The value, if the result is successful.
   * @throws {Error} The error, if the result is a failure.
   */
  getOrThrow(): T {
    if (this.isSuccess()) {
      return this.value;
    }

    throw this.error;
  }

  /**
   * Returns the value if the result is successful, or the specified default value if it is a failure.
   *
   * @param {T} defaultValue - The default value to return if the result is a failure.
   * @returns {T} The value if the result is successful, or the default value if it is a failure.
   */
  getOrDefault(defaultValue: T): T {
    if (this.isSuccess()) {
      return this.value;
    }

    return defaultValue;
  }

  /**
   * Returns the value if the result is successful, or the result of the transfer function if it is a failure.
   * @param {(error: Error) => T} transfer A function that transfers the error to a value.
   * @returns {T} The value, if the result is successful, or the result of the transfer function if it is a failure.
   */
  getOrElse(transfer: (error: Error) => T): T {
    return this.isSuccess() ? this.value : transfer(this.error!);
  }

  /**
   * Executes the specified function if the result is successful.
   * @param {(value: T) => void} f A function to be executed if the result is successful.
   * @returns {Result<T>} The current result instance.
   */
  onSuccess(f: (value: T) => void): Result<T> {
    if (this.isSuccess()) {
      f(this.value);
    }

    return this;
  }

  /**
   * Executes the specified function if the result is a failure.
   * @param {(error: Error) => void} f A function to be executed if the result is a failure.
   * @returns {Result<T>} The current result instance.
   */
  onFailure(f: (error: Error) => void): Result<T> {
    if (this.isFailure()) {
      f(this.error);
    }

    return this;
  }

  /**
   * Recovers from a failure by applying the specified transform function.
   * @param {(error: Error) => T} transform A function that transforms the error to a value.
   * @returns {Result<T>} A new successful result with the transformed value if the current result is a failure, or the current result if it is already successful.
   */
  recover(transform: (error: Error) => T): Result<T> {
    return this.isFailure() ? runCatching(() => transform(this.error)) : this;
  }

  /**
   * Recovers from a failure by applying the specified asynchronous transform function.
   * @param {(error: Error) => Promise<T>} transform An asynchronous function that transforms the error to a value.
   * @returns {Promise<Result<T>>} A promise that resolves to a new successful result with the transformed value if the current result is a failure, or the current result if it is already successful.
   */
  async recoverAsync(
    transform: (error: Error) => Promise<T>
  ): Promise<Result<T>> {
    return this.isFailure()
      ? runAsyncCatching(() => transform(this.error))
      : this;
  }
}

/**
 * Executes the specified function and wraps the result in a Result instance.
 * @template T The type of the value returned by the function.
 * @template A The type of the arguments passed to the function.
 * @param {(...args: A) => T} f The function to be executed.
 * @param {...A} args The arguments to be passed to the function.
 * @returns {Result<T>} A result containing the value returned by the function if it succeeds, or a failure result if an error occurs.
 */
export const runCatching = <T, A extends unknown[]>(
  f: (...args: A) => T,
  ...args: A
): Result<T> => {
  try {
    const value = f(...args);

    if (value instanceof Result) {
      return value;
    }

    return Result.success(value);
  } catch (e) {
    return Result.failure(convertToError(e));
  }
};

/**
 * Executes the specified asynchronous function and wraps the result in a Promise of a Result instance.
 * @template T The type of the value returned by the asynchronous function.
 * @template A The type of the arguments passed to the asynchronous function.
 * @param {(...args: A) => Promise<T>} f The asynchronous function to be executed.
 * @param {...A} args The arguments to be passed to the asynchronous function.
 * @returns {Promise<Result<T>>} A promise that resolves to a result containing the value returned by the asynchronous function if it succeeds, or a failure result if an error occurs.
 */
export const runAsyncCatching = async <T, A extends unknown[]>(
  f: (...args: A) => Promise<T>,
  ...args: A
): Promise<Result<T>> => {
  try {
    const value = await f(...args);

    if (value instanceof Result) {
      return value;
    }

    return Result.success(value);
  } catch (e) {
    return Result.failure(convertToError(e));
  }
};

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

import { getErrorMessage } from './errorUtils';

/**
 * Represents the result of an operation that can either be successful or fail with an error.
 * @template T The type of the value returned on success.
 */
export class Result<T> {
  /**
   * Indicates whether the result is a success.
   * @type {boolean}
   */
  public readonly isSuccess: boolean;

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
   * @param {Error} exception The error to be wrapped in the failure result.
   * @returns {Result<T>} A failure result containing the error.
   */
  static failure<T>(exception: Error): Result<T> {
    return new Result<T>(undefined, exception);
  }

  /**
   * Constructs a new instance of the Result class.
   * @param {T | undefined} value The value associated with the result, if successful.
   * @param {Error | undefined} error The error associated with the result, if failed.
   */
  private constructor(
    private value: T | undefined,
    private error: Error | undefined
  ) {
    this.isSuccess = error === undefined;

    if (value && error) {
      throw new Error('Result cannot be both success and failure');
    }
  }

  /**
   * Indicates whether the result is a failure.
   *
   * This is a computed property that returns the opposite of `isSuccess`.
   * It provides a convenient way to check if the result represents a failure state.
   *
   * @type {boolean}
   * @readonly
   *
   * @example
   * const result = Result.failure(new Error('Something went wrong'));
   * console.log(result.isFailure); // Output: true
   *
   * @example
   * const result = Result.success(42);
   * console.log(result.isFailure); // Output: false
   */
  get isFailure(): boolean {
    return !this.isSuccess;
  }

  /**
   * Returns the value if the result is successful, or throws the error if it is a failure.
   * @returns {T} The value, if the result is successful.
   * @throws {Error} The error, if the result is a failure.
   */
  getOrThrow(): T {
    if (this.isSuccess) {
      return this.value!;
    }

    throw this.error;
  }

  /**
   * Returns the value if the result is successful, or undefined if it is a failure.
   * @returns {T | undefined} The value, or undefined.
   */
  getOrUndefined(): T | undefined {
    return this.value;
  }

  /**
   * Returns the value if the result is successful, or the specified default value if it is a failure.
   * @param {T} defaultValue The default value to return if the result is a failure.
   * @returns {T} The value, if the result is successful, or the default value if it is a failure.
   */
  getOrDefault(defaultValue: T): T {
    return this.isSuccess ? this.value! : defaultValue;
  }

  /**
   * Returns the value if the result is successful, or the value returned by the specified function if it is a failure.
   * @param {(error: Error) => T} failure A function that takes the error and returns a value to be used if the result is a failure.
   * @returns {T} The value, if the result is successful, or the value returned by the onFailure function if it is a failure.
   */
  getOrElse(failure: (error: Error) => T): T {
    return this.isSuccess ? this.value! : failure(this.error!);
  }

  /**
   * Returns the error if the result is a failure, or undefined if it is successful.
   * @returns {Error | undefined} The error, or undefined.
   */
  errorOrUndefined(): Error | undefined {
    return this.error;
  }

  /**
   * Transforms the successful value using the specified function.
   * @template R The type of the transformed value.
   * @param {(value: T) => R} transform A function that takes the successful value and returns the transformed value.
   * @returns {Result<R>} A new result containing the transformed value if the current result is successful, or the current failure otherwise.
   */
  map<R>(transform: (value: T) => R): Result<R> {
    return this.isSuccess
      ? Result.success(transform(this.value!))
      : Result.failure(this.error!);
  }

  /**
   * Transforms the successful value using the specified function, catching any errors that may occur.
   * @template R The type of the transformed value.
   * @param {(value: T) => R} transform A function that takes the successful value and returns the transformed value.
   * @returns {Result<R>} A new result containing the transformed value if the current result is successful and the transformation succeeds, or a failure result if an error occurs during the transformation or if the current result is a failure.
   */
  mapCatching<R>(transform: (value: T) => R): Result<R> {
    return this.isSuccess
      ? runCatching(() => transform(this.value!))
      : Result.failure(this.error!);
  }

  /**
   * Recovers from a failure by applying the specified function to the error.
   * @param {(error: Error) => T} transform A function that takes the error and returns a value to recover with.
   * @returns {Result<T>} A new successful result containing the recovered value if the current result is a failure, or the current successful result otherwise.
   */
  recover(transform: (error: Error) => T): Result<T> {
    return this.isFailure ? Result.success(transform(this.error!)) : this;
  }

  /**
   * Recovers from a failure by applying the specified function to the error, catching any errors that may occur.
   * @param {(error: Error) => T} transform A function that takes the error and returns a value to recover with.
   * @returns {Result<T>} A new result containing the recovered value if the current result is a failure and the recovery succeeds, or a failure result if an error occurs during the recovery or if the current result is successful.
   */
  recoverCatching(transform: (error: Error) => T): Result<T> {
    return this.isFailure ? runCatching(() => transform(this.error!)) : this;
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
    if (e instanceof Error) {
      return Result.failure(e);
    }

    return Result.failure(new Error(getErrorMessage(e)));
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
    if (e instanceof Error) {
      return Result.failure(e);
    }

    return Result.failure(new Error(getErrorMessage(e)));
  }
};

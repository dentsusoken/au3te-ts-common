import { describe, it, expect, vi } from 'vitest';
import { Result, runCatching, runAsyncCatching } from './result';

describe('Result', () => {
  describe('success', () => {
    it('should create a successful result with the given value', () => {
      const value = 42;
      const result = Result.success(value);

      expect(result.isSuccess()).toBe(true);
      expect(result.isFailure()).toBe(false);
      expect(result.value).toBe(value);
      expect(result.error).toBeUndefined();
    });
  });

  describe('failure', () => {
    it('should create a failure result with the given error', () => {
      const error = new Error('Something went wrong');
      const result = Result.failure(error);

      expect(result.isSuccess()).toBe(false);
      expect(result.isFailure()).toBe(true);
      expect(result.value).toBeUndefined();
      expect(result.error).toBe(error);
    });
  });

  describe('getOrThrow', () => {
    it('should return the value if the result is successful', () => {
      const value = 42;
      const result = Result.success(value);

      expect(result.getOrThrow()).toBe(value);
    });

    it('should throw the error if the result is a failure', () => {
      const error = new Error('Something went wrong');
      const result = Result.failure(error);

      expect(() => result.getOrThrow()).toThrowError(error);
    });
  });

  describe('getOrDefault', () => {
    it('should return the value if the result is successful', () => {
      const value = 42;
      const defaultValue = 0;
      const result = Result.success(value);

      expect(result.getOrDefault(defaultValue)).toBe(value);
    });

    it('should return the default value if the result is a failure', () => {
      const error = new Error('Something went wrong');
      const defaultValue = 0;
      const result = Result.failure(error);

      expect(result.getOrDefault(defaultValue)).toBe(defaultValue);
    });
  });

  describe('getOrElse', () => {
    it('should return the value if the result is successful', () => {
      const value = 42;
      const result = Result.success(value);

      expect(result.getOrElse(() => 0)).toBe(value);
    });

    it('should return the value from the transfer function if the result is a failure', () => {
      const error = new Error('Something went wrong');
      const result = Result.failure(error);
      const transferValue = 0;

      expect(result.getOrElse(() => transferValue)).toBe(transferValue);
    });
  });

  describe('onSuccess', () => {
    it('should execute the function if the result is successful', () => {
      const value = 42;
      const result = Result.success(value);
      const mockFunction = vi.fn();

      result.onSuccess(mockFunction);

      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith(value);
    });

    it('should not execute the function if the result is a failure', () => {
      const error = new Error('Something went wrong');
      const result = Result.failure(error);
      const mockFunction = vi.fn();

      result.onSuccess(mockFunction);

      expect(mockFunction).not.toHaveBeenCalled();
    });
  });

  describe('onFailure', () => {
    it('should execute the function if the result is a failure', () => {
      const error = new Error('Something went wrong');
      const result = Result.failure(error);
      const mockFunction = vi.fn();

      result.onFailure(mockFunction);

      expect(mockFunction).toHaveBeenCalledTimes(1);
      expect(mockFunction).toHaveBeenCalledWith(error);
    });

    it('should not execute the function if the result is successful', () => {
      const value = 42;
      const result = Result.success(value);
      const mockFunction = vi.fn();

      result.onFailure(mockFunction);

      expect(mockFunction).not.toHaveBeenCalled();
    });
  });

  describe('recover', () => {
    it('should return the original result if it is successful', () => {
      const value = 42;
      const result = Result.success(value);

      expect(result.recover(() => 0)).toBe(result);
    });

    it('should return a new successful result with the transformed value if the original result is a failure', () => {
      const error = new Error('Something went wrong');
      const result = Result.failure(error);
      const transformedValue = 0;

      const recoveredResult = result.recover(() => transformedValue);

      expect(recoveredResult.isSuccess()).toBe(true);
      expect(recoveredResult.value).toBe(transformedValue);
    });
  });

  describe('recoverAsync', () => {
    it('should return the original result if it is successful', async () => {
      const value = 42;
      const result = Result.success(value);

      const recoveredResult = await result.recoverAsync(async () => 0);

      expect(recoveredResult).toBe(result);
    });

    it('should return a new successful result with the transformed value if the original result is a failure', async () => {
      const error = new Error('Something went wrong');
      const result = Result.failure(error);
      const transformedValue = 0;

      const recoveredResult = await result.recoverAsync(
        async () => transformedValue
      );

      expect(recoveredResult.isSuccess()).toBe(true);
      expect(recoveredResult.value).toBe(transformedValue);
    });
  });
});

describe('runCatching', () => {
  it('should return a successful result for a function that does not throw', () => {
    const result = runCatching(() => 42);
    expect(result.isSuccess()).toBe(true);
    expect(result.value).toBe(42);
  });

  it('should return a failure result for a function that throws', () => {
    const result = runCatching(() => {
      throw new Error('Test error');
    });
    expect(result.isFailure() && result.error.message).toBe('Test error');
  });

  it('should handle non-Error throws', () => {
    const result = runCatching(() => {
      throw 'string error';
    });
    expect(result.isFailure() && result.error.message).toBe('string error');
  });

  it('should return the Result if the function returns a Result', () => {
    const innerResult = Result.success(42);
    const result = runCatching(() => innerResult);
    expect(result).toBe(innerResult);
  });
});

describe('runAsyncCatching', () => {
  it('should return a successful result for an async function that resolves', async () => {
    const result = await runAsyncCatching(async () => 42);
    expect(result.isSuccess()).toBe(true);
    expect(result.value).toBe(42);
  });

  it('should return a failure result for an async function that rejects', async () => {
    const result = await runAsyncCatching(async () => {
      throw new Error('Test error');
    });
    expect(result.isFailure() && result.error.message).toBe('Test error');
  });

  it('should handle non-Error rejections', async () => {
    const result = await runAsyncCatching(async () => {
      throw 'string error';
    });
    expect(result.isFailure() && result.error.message).toBe('string error');
  });

  it('should return the Result if the async function returns a Result', async () => {
    const innerResult = Result.success(42);
    const result = await runAsyncCatching(async () => innerResult);
    expect(result).toBe(innerResult);
  });
});

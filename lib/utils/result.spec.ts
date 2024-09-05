import { describe, it, expect } from 'vitest';
import { Result, runCatching, runAsyncCatching } from './result';

describe('Result', () => {
  describe('success', () => {
    it('should create a successful result', () => {
      const result = Result.success(42);
      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.getOrUndefined()).toBe(42);
      expect(result.errorOrUndefined()).toBeUndefined();
    });
  });

  describe('failure', () => {
    it('should create a failure result', () => {
      const error = new Error('Test error');
      const result = Result.failure<number>(error);
      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
      expect(result.getOrUndefined()).toBeUndefined();
      expect(result.errorOrUndefined()).toBe(error);
    });
  });

  describe('getOrThrow', () => {
    it('should return the value for a successful result', () => {
      const result = Result.success(42);
      expect(result.getOrThrow()).toBe(42);
    });

    it('should throw the error for a failure result', () => {
      const error = new Error('Test error');
      const result = Result.failure<number>(error);
      expect(() => result.getOrThrow()).toThrow(error);
    });
  });

  describe('getOrDefault', () => {
    it('should return the value for a successful result', () => {
      const result = Result.success(42);
      expect(result.getOrDefault(0)).toBe(42);
    });

    it('should return the default value for a failure result', () => {
      const result = Result.failure<number>(new Error('Test error'));
      expect(result.getOrDefault(0)).toBe(0);
    });
  });

  describe('getOrElse', () => {
    it('should return the value for a successful result', () => {
      const result = Result.success(42);
      expect(result.getOrElse(() => 0)).toBe(42);
    });

    it('should return the value from the function for a failure result', () => {
      const error = new Error('Test error');
      const result = Result.failure<number>(error);
      expect(result.getOrElse((e) => e.message.length)).toBe(10);
    });
  });

  describe('map', () => {
    it('should transform the value for a successful result', () => {
      const result = Result.success(42);
      const mapped = result.map((x) => x.toString());
      expect(mapped.getOrUndefined()).toBe('42');
    });

    it('should not transform for a failure result', () => {
      const error = new Error('Test error');
      const result = Result.failure<number>(error);
      const mapped = result.map((x) => x.toString());
      expect(mapped.errorOrUndefined()).toBe(error);
    });
  });

  describe('mapCatching', () => {
    it('should transform the value for a successful result', () => {
      const result = Result.success(42);
      const mapped = result.mapCatching((x) => x.toString());
      expect(mapped.getOrUndefined()).toBe('42');
    });

    it('should catch errors during transformation', () => {
      const result = Result.success(42);
      const mapped = result.mapCatching(() => {
        throw new Error('Transform error');
      });
      expect(mapped.isFailure).toBe(true);
      expect(mapped.errorOrUndefined()?.message).toBe('Transform error');
    });

    it('should not transform for a failure result', () => {
      const error = new Error('Test error');
      const result = Result.failure<number>(error);
      const mapped = result.mapCatching((x) => x.toString());
      expect(mapped.errorOrUndefined()).toBe(error);
    });
  });
});

describe('recover', () => {
  it('should recover from a failure', () => {
    const error = new Error('Test error');
    const result = Result.failure<number>(error);
    const recovered = result.recover(() => 42);
    expect(recovered.isSuccess).toBe(true);
    expect(recovered.getOrUndefined()).toBe(42);
  });

  it('should not affect a successful result', () => {
    const result = Result.success(42);
    const recovered = result.recover(() => 0);
    expect(recovered.isSuccess).toBe(true);
    expect(recovered.getOrUndefined()).toBe(42);
  });

  it('should pass the error to the transform function', () => {
    const error = new Error('Test error');
    const result = Result.failure<number>(error);
    const recovered = result.recover((e) => e.message.length);
    expect(recovered.isSuccess).toBe(true);
    expect(recovered.getOrUndefined()).toBe(10); // "Test error" の長さ
  });
});

describe('recoverCatching', () => {
  it('should recover from a failure', () => {
    const error = new Error('Test error');
    const result = Result.failure<number>(error);
    const recovered = result.recoverCatching(() => 42);
    expect(recovered.isSuccess).toBe(true);
    expect(recovered.getOrUndefined()).toBe(42);
  });

  it('should not affect a successful result', () => {
    const result = Result.success(42);
    const recovered = result.recoverCatching(() => 0);
    expect(recovered.isSuccess).toBe(true);
    expect(recovered.getOrUndefined()).toBe(42);
  });

  it('should catch errors during recovery', () => {
    const error = new Error('Test error');
    const result = Result.failure<number>(error);
    const recovered = result.recoverCatching(() => {
      throw new Error('Recovery error');
    });
    expect(recovered.isFailure).toBe(true);
    expect(recovered.errorOrUndefined()?.message).toBe('Recovery error');
  });

  it('should pass the error to the transform function', () => {
    const error = new Error('Test error');
    const result = Result.failure<number>(error);
    const recovered = result.recoverCatching((e) => e.message.length);
    expect(recovered.isSuccess).toBe(true);
    expect(recovered.getOrUndefined()).toBe(10);
  });
});

describe('runCatching', () => {
  it('should return a successful result for a function that does not throw', () => {
    const result = runCatching(() => 42);
    expect(result.isSuccess).toBe(true);
    expect(result.getOrUndefined()).toBe(42);
  });

  it('should return a failure result for a function that throws', () => {
    const result = runCatching(() => {
      throw new Error('Test error');
    });
    expect(result.isFailure).toBe(true);
    expect(result.errorOrUndefined()?.message).toBe('Test error');
  });

  it('should handle non-Error throws', () => {
    const result = runCatching(() => {
      throw 'string error';
    });
    expect(result.isFailure).toBe(true);
    expect(result.errorOrUndefined()?.message).toBe('string error');
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
    expect(result.isSuccess).toBe(true);
    expect(result.getOrUndefined()).toBe(42);
  });

  it('should return a failure result for an async function that rejects', async () => {
    const result = await runAsyncCatching(async () => {
      throw new Error('Test error');
    });
    expect(result.isFailure).toBe(true);
    expect(result.errorOrUndefined()?.message).toBe('Test error');
  });

  it('should handle non-Error rejections', async () => {
    const result = await runAsyncCatching(async () => {
      throw 'string error';
    });
    expect(result.isFailure).toBe(true);
    expect(result.errorOrUndefined()?.message).toBe('string error');
  });

  it('should return the Result if the async function returns a Result', async () => {
    const innerResult = Result.success(42);
    const result = await runAsyncCatching(async () => innerResult);
    expect(result).toBe(innerResult);
  });
});

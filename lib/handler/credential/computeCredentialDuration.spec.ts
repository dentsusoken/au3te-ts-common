import { describe, it, expect } from 'vitest';
import { defaultComputeCredentialDuration } from './computeCredentialDuration';

describe('computeCredentialDuration', () => {
  describe('defaultComputeCredentialDuration', () => {
    it('should return 0 indicating no expiration', () => {
      const duration = defaultComputeCredentialDuration();
      expect(duration).toBe(0);
    });
  });
});

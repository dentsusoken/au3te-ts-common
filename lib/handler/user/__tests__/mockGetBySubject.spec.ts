import { describe, expect, it } from 'vitest';
import { mockGetBySubject } from '../mockGetBySubject';

describe('mockGetBySubject', () => {
  it('should return a user when valid subject is provided', async () => {
    const user = await mockGetBySubject('1004');
    expect(user).toBeDefined();
    expect(user?.subject).toBe('1004');
  });

  it('should return undefined when invalid subject is provided', async () => {
    const user = await mockGetBySubject('nonexistent');
    expect(user).toBeUndefined();
  });

  it('should return user with all required OpenID Connect claims', async () => {
    const user = await mockGetBySubject('1004');
    expect(user).toBeDefined();
    expect(user?.loginId).toBe('inga');
    expect(user?.email).toBe('inga@example.com');
    expect(user?.givenName).toBe('Inga');
    expect(user?.familyName).toBe('Silverstone');
    expect(user?.address?.country).toBe('USA');
  });

  it('should handle empty subject', async () => {
    const user = await mockGetBySubject('');
    expect(user).toBeUndefined();
  });
});

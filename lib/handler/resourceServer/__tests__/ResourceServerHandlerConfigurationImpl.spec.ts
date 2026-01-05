import { describe, it, expect } from 'vitest';
import { ResourceServerHandlerConfigurationImpl } from '../ResourceServerHandlerConfigurationImpl';
import { mockGetResourceServer } from '../mockGetResourceServer';
import { mockAuthenticateResorceServer } from '../mockAuthenticateResorceServer';

describe('ResourceServerHandlerConfigurationImpl', () => {
  it('should be instantiated with default mock implementations', () => {
    const config = new ResourceServerHandlerConfigurationImpl();

    expect(config.get).toBe(mockGetResourceServer);
    expect(config.authenticate).toBe(mockAuthenticateResorceServer);
  });

  it('should allow overriding implementations', () => {
    const config = new ResourceServerHandlerConfigurationImpl();
    const customGet = async (id: string) => null;
    const customAuth = async () => false;

    config.get = customGet;
    config.authenticate = customAuth;

    expect(config.get).toBe(customGet);
    expect(config.authenticate).toBe(customAuth);
  });
});


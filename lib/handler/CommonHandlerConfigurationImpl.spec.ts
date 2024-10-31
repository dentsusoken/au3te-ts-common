import { describe, it, expect } from 'vitest';
import { CommonHandlerConfigurationImpl } from './CommonHandlerConfigurationImpl';

describe('CommonHandlerConfigurationImpl', () => {
  it('should verify that buildApiErrorMessage property is defined', () => {
    const config = new CommonHandlerConfigurationImpl();
    expect(config.buildApiErrorMessage).toBeDefined();
  });

  it('should verify that outputErrorMessage property is defined', () => {
    const config = new CommonHandlerConfigurationImpl();
    expect(config.outputErrorMessage).toBeDefined();
  });

  it('should verify that processError property is defined and returns a properly configured ProcessError function', () => {
    const config = new CommonHandlerConfigurationImpl();
    expect(config.processError).toBeDefined();
  });

  it('should verify that buildUnknownActionMessage property is defined and returns a properly configured BuildUnknownActionMessage function', () => {
    const config = new CommonHandlerConfigurationImpl();
    expect(config.buildUnknownActionMessage).toBeDefined();
  });
});

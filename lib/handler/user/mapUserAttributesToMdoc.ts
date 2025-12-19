import { Mdocs } from './types';

export interface MapUserAttributesToMdoc {
  (
    // docType: string,
    userAttributes: Record<string, unknown>,
    protocol: 'oidc' | 'saml2'
  ): Mdocs;
}

export type ClaimsMapper = {
  [docType: string]: {
    [namespace: string]: {
      [claim: string]: string;
    };
  };
};
export interface CreateMapUserAttributesToMdoc {
  (
    oidcClaimsMapper: ClaimsMapper,
    saml2ClaimsMapper: ClaimsMapper
  ): MapUserAttributesToMdoc;
}

export const createMapUserAttributesToMdoc: CreateMapUserAttributesToMdoc = (
  oidcClaimsMapper,
  saml2ClaimsMapper
) => {
  return (userAttributes, protocol) => {
    const claimsMapper =
      protocol === 'oidc' ? oidcClaimsMapper : saml2ClaimsMapper;

    const result: Mdocs = {};
    Object.entries(claimsMapper).forEach(([docType, namespaceSubClaims]) => {
      result[docType] = {};

      Object.entries(namespaceSubClaims).forEach(([namespace, subClaims]) => {
        result[docType][namespace] = {};
        Object.entries(subClaims).forEach(([claim, attribute]) => {
          if (attribute in userAttributes) {
            result[docType][namespace][claim] = userAttributes[attribute];
          }
        });
      });
    });
    return result;
  };
};

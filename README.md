# AU3TE TypeScript Common Library

A comprehensive TypeScript library providing common utilities, schemas, and handlers for AU3TE (Authorization and User Authentication for Trusted Ecosystems). This library supports OAuth 2.0, OpenID Connect, and Verifiable Credentials standards.

## Features

- **OAuth 2.0 & OpenID Connect Support**: Complete schemas and handlers for OAuth 2.0 flows
- **Verifiable Credentials**: mDoc (ISO 18013-5) credential support with comprehensive claim handling
- **TypeScript First**: Full TypeScript support with comprehensive type definitions
- **Zod Schema Validation**: Runtime validation using Zod schemas
- **Modular Architecture**: Organized into logical modules for easy integration
- **Comprehensive Testing**: Extensive test coverage with Vitest

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Modules](#modules)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Install the Package

```bash
npm install @vecrea/au3te-ts-common
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @vecrea/oid4vc-core u8a-utils
```

## Quick Start

### Using Schemas

This library provides comprehensive Zod schemas for OAuth 2.0, OpenID Connect, and Verifiable Credentials protocols.

#### Available Schemas

**Authentication & Authorization**

- `authorizationRequestSchema` / `authorizationResponseSchema` - OAuth 2.0 authorization request/response
- `authorizationDecisionParamsSchema` - Authorization decision parameters
- `authorizationFailRequestSchema` / `authorizationFailResponseSchema` - Authorization failure handling
- `authorizationIssueRequestSchema` / `authorizationIssueResponseSchema` - Authorization issuance
- `authorizationPageModelSchema` - Authorization page display model

**Token Management**

- `tokenRequestSchema` / `tokenResponseSchema` - Token endpoint
- `tokenIssueRequestSchema` / `tokenIssueResponseSchema` - Token issuance
- `tokenFailRequestSchema` / `tokenFailResponseSchema` - Token failure handling
- `tokenCreateRequestSchema` / `tokenCreateResponseSchema` - Token creation

**Verifiable Credentials**

- `credentialRequestInfoSchema` - Credential request information
- `credentialFormatSchema` - Credential format
- `credentialIssuanceOrderSchema` - Credential issuance order
- `credentialSingleIssueRequestSchema` / `credentialSingleIssueResponseSchema` - Single credential issuance
- `credentialSingleParseRequestSchema` / `credentialSingleParseResponseSchema` - Credential parsing

**Metadata & Configuration**

- `serviceConfigurationRequestSchema` / `serviceConfigurationResponseSchema` - Service configuration
- `serviceJwksRequestSchema` / `serviceJwksResponseSchema` - Service JWKS
- `credentialIssuerJwksRequestSchema` / `credentialIssuerJwksResponseSchema` - Credential issuer JWKS
- `credentialMetadataRequestSchema` / `credentialMetadataResponseSchema` - Credential metadata

**Other**

- `introspectionRequestSchema` / `introspectionResponseSchema` - Token introspection
- `pushedAuthReqRequestSchema` / `pushedAuthReqResponseSchema` - Pushed Authorization Request

#### Validation Examples

```typescript
import {
  authorizationRequestSchema,
  tokenRequestSchema,
  credentialRequestInfoSchema,
  authorizationPageModelSchema,
} from '@vecrea/au3te-ts-common';

// OAuth 2.0 authorization request validation
const result = authorizationRequestSchema.safeParse({
  parameters:
    'response_type=code&client_id=client123&redirect_uri=https://example.com/callback&scope=openid%20profile&state=random-state',
  context: 'additional-context',
});
if (result.success) {
  // result.data is type-safe
} else {
  // result.error contains validation errors
}

// Token request validation
const tokenResult = tokenRequestSchema.safeParse({
  ticket: 'ticket-123',
  properties: [{ key: 'custom_property', value: 'custom_value' }],
  accessTokenDuration: 3600,
  refreshTokenDuration: 86400,
});

// Verifiable Credential request validation
const credResult = credentialRequestInfoSchema.safeParse({
  identifier: 'base64url_encoded_identifier_43_chars_long',
  format: 'jwt_vc_json',
  bindingKey: '{"kty":"RSA","n":"abc...","e":"AQAB"}',
  details:
    '{"credential_definition":{"type":["VerifiableCredential","UniversityDegreeCredential"]}}',
});

// Authorization page model validation
const pageResult = authorizationPageModelSchema.safeParse({
  authorizationResponse: {
    ticket: 'ticket-123',
    result: 'AUTHORIZED',
    subject: 'user123',
  },
  serviceName: 'My OAuth Service',
  clientName: 'Example App',
  scopes: [
    { name: 'openid', description: 'OpenID Connect' },
    { name: 'profile', description: 'User Profile' },
  ],
  user: {
    subject: 'user123',
    loginId: 'user@example.com',
  },
});
```

> **Note:**
>
> - Use the `xxxSchema` (e.g., `authorizationRequestSchema`) for validation (`parse`/`safeParse`).
> - Use the type (e.g., `AuthorizationRequest`) for TypeScript type annotations only.
> - The schema and the type are separate exports.

For real-world usage and validation patterns, please refer to the `__tests__` directory and the TypeScript type definitions in the source code.

## Architecture

The library is organized into several key modules:

### Core Modules

- **`handler/`**: Request handlers for different OAuth flows and credential operations
- **`api/`**: HTTP client utilities for making API calls
- **`utils/`**: Common utility functions
- **`conf/`**: Configuration management
- **`schemas/`**: Zod schemas for request/response validation

### Handler Types

- **Authorization Page Handlers**: Handle authorization page rendering and processing
- **Credential Handlers**: Manage verifiable credential operations
- **User Handlers**: User management and authentication
- **Common Handlers**: Shared handler utilities

## Modules

### Main Exports

```typescript
// Main library exports
import {
  // Handlers
  createMdocCollectClaims,
  createMdocCheckPermissions,
  defaultMdocComputeCredentialDuration,
  defaultMdocBuildRequestedCredential,

  // API utilities
  ApiClient,
  AbstractApiClient,
  ApiCall,
  HttpCall,
  PostHttpCall,

  // Utilities
  bearerToken,
  basicCredentials,
  formatDate,
  parseQueryString,
  toErrorJson,

  // Configuration
  AuthleteConfiguration,
} from '@vecrea/au3te-ts-common';
```

### Subpath Exports

```typescript
// Specific module imports
import { AuthorizationRequest } from '@vecrea/au3te-ts-common/schemas.authorization';
import { TokenRequest } from '@vecrea/au3te-ts-common/schemas.token';
import { CredentialRequestInfo } from '@vecrea/au3te-ts-common/schemas.credential';
import { AuthorizationPageModel } from '@vecrea/au3te-ts-common/schemas.authorization-page';
```

## API Reference

### Credential Handlers

#### `createMdocCollectClaims`

Creates a function to collect mDoc claims for credential issuance.

```typescript
const collectClaims = createMdocCollectClaims({
  getMdocClaimsBySubjectAndDoctype: (subject: string, doctype: string) =>
    Promise<Claims | null>,
  buildMdocClaims: (params: BuildMdocClaimsParams) => Promise<Claims>,
});
```

#### `defaultMdocBuildRequestedCredential`

Default implementation for building requested credentials from user claims.

```typescript
const buildCredential = defaultMdocBuildRequestedCredential({
  containsRequestedMdocClaims: (userClaims: Claims, requestedClaims: Claims) =>
    boolean,
  checkPermissions: (userClaims: Claims, requestedClaims: Claims) =>
    Promise<boolean>,
});
```

#### `defaultMdocComputeCredentialDuration`

Default implementation for computing credential duration (1 year from current date).

```typescript
const duration = defaultMdocComputeCredentialDuration(); // Returns seconds until expiry
```

### API Client

#### `ApiClient`

HTTP client for making API calls with automatic error handling.

```typescript
const client = new ApiClient({
  baseUrl: 'https://api.example.com',
  headers: { Authorization: 'Bearer token' },
});

const response = await client.get('/users/123');
```

### Schemas

All schemas are built with Zod and provide runtime validation:

```typescript
import {
  AuthorizationRequest,
  TokenRequest,
  CredentialRequestInfo,
} from '@vecrea/au3te-ts-common';

// Validate requests
const authRequest = AuthorizationRequest.parse(requestData);
const tokenRequest = TokenRequest.parse(tokenData);
const credentialRequest = CredentialRequestInfo.parse(credentialData);
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/dentsusoken/au3te-ts-common
cd au3te-ts-common

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Type checking
npm run typecheck
```

### Available Scripts

- `npm run build`: Build the project and generate type definitions
- `npm test`: Run all tests with Vitest
- `npm run typecheck`: Run TypeScript type checking
- `npm run prepublishOnly`: Run tests and build before publishing

### Project Structure

```
au3te-ts-common/
├── lib/                    # Source code
│   ├── handler/           # Request handlers
│   ├── api/               # API client utilities
│   ├── utils/             # Utility functions
│   ├── conf/              # Configuration
│   └── schemas/           # Zod schemas
├── docs/                  # Documentation
│   ├── api/              # API documentation
│   └── sequence/         # Sequence diagrams
├── dist/                  # Built output
└── __tests__/            # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests for new features
- Use arrow functions for all functions
- Write JSDoc comments in English
- Use Vitest for testing with `.spec.ts` files
- Store test files in `__tests__` directories

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/dentsusoken/au3te-ts-common/issues)
- **Documentation**: [API Documentation](docs/api/)
- **Examples**: See the [examples](#examples) section above

## Related Projects

- [@vecrea/oid4vc-core](https://github.com/dentsusoken/oid4vc-core): Core OID4VC implementation
- [AU3TE Project](https://github.com/dentsusoken/au3te): Main AU3TE implementation

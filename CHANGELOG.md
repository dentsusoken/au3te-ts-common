# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Client Registration API support including request/response schemas and client methods
- Standard Introspection support with request/response schemas and handler
- Resource Server handler implementation and interfaces
- JOSE schemas and validation for JWE and JWS algorithms
- User attributes caching and deletion interfaces
- `addUser` functionality to user handler
- Federation configuration support for SAML 2.0 and OIDC
- `federationsConfig` to `AuthorizationPageHandlerConfiguration` and `AuthorizationPageModel`
- `APPLICATION_INTROSPECTION_JWT` constant
- Generic type parameters to `GetByCredentials`

### Changed

- Refactored federation configuration to be split by protocol
- Moved OIDC-related schemas to `oidc` subdirectory
- Renamed federation schemas for clarity
- Refactored `buildAuthorizationPageModel` to use `federationsConfig`
- Enhanced SAML 2.0 configuration schemas

### Fixed

- Allowed nullish values for federations array in schema
- Fixed TypeScript errors in tests

## [0.1.2] - 2025-07-08

### Changed

- Changed API response type definitions from `z.infer` to `z.input` for better type consistency
- Updated all common schema types to use `z.input` for API response compatibility
- Fixed type inconsistencies between input and output types in Zod schemas

## [0.1.1] - 2025-07-08

### Changed

- Moved `zod` from dependencies to peer dependencies

## [0.1.0] - 2025-07-08

### Added

- Initial release of AU3TE TypeScript Common library
- Common TypeScript utilities and schemas for AU3TE (Authorization and User Authentication for Trusted Ecosystems)
- API client utilities for making HTTP calls
- Handler configurations for authorization, credentials, and user management
- Schema definitions for various OAuth2 and OpenID Connect operations
- Utility functions for authentication and authorization workflows

### Features

- Support for OAuth2 and OpenID Connect protocols
- Verifiable credentials handling
- Authorization page and decision handling
- Token management (issue, fail, create)
- Credential issuance and parsing
- Service configuration and JWKS management
- User authentication and management utilities

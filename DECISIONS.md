# Technical Decisions and Scope

## Prioritization

The first priority was a demonstrable vertical slice: login → list → create → update → delete, with data persisted in PostgreSQL. Search/filter, priority management, and ticket details/comments were chosen next because they materially improve triage and collaboration without adding external infrastructure. Responsive behavior, validation, tests, and documentation were treated as product requirements rather than optional polish.

## Stack trade-offs

Spring Boot was chosen over NestJS because it matches the developer's claimed Java and enterprise API experience, reducing implementation and explanation risk. React and Material UI provide accessible components and responsive primitives quickly. Redux Toolkit makes user and ticket state explicit and testable, although Context would require less code for an application this small. PostgreSQL offers durable relational storage and maps naturally to ticket records.

## Authentication boundary

The login endpoint validates one fixed demo identity and returns user context. This satisfies the assessment's simplified-authentication allowance while keeping authentication server-side. It is intentionally not represented as secure production authentication; JWT, hashed credentials, authorization rules, and refresh-token handling are listed as next steps.

## Features deferred

- WebSockets: additional connection lifecycle and event-consistency testing.
- Attachments: requires durable object storage, file validation, and security controls.
- Email: requires a provider, credentials, templates, and failure/retry design.
- Dashboards/dark mode: visual bonuses with less value than stable core operations.
- Advanced roles/assignment: requires a user model and authorization matrix.

## Time allocation

- 10 minutes: structure and persistence configuration
- 20 minutes: backend API and validation
- 15 minutes: frontend workflow and responsive layout
- 10 minutes: unit tests and build verification
- 5 minutes: documentation and repository cleanup

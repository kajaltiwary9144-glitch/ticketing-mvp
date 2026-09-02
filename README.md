# HelpDesk Ticketing MVP

A responsive full-stack ticketing system completed as a time-boxed AI-assisted assessment. Users can sign in, create and inspect tickets, change their status and priority, search/filter the queue, and delete tickets. All ticket operations use a real Spring Boot API backed by PostgreSQL.

## Feature selection

The MVP includes simplified authentication, complete ticket CRUD, status workflow, responsive layouts, API validation, and clear error feedback because these form the minimum usable end-to-end journey. Search/filter and priority management were selected as high-value, low-effort enhancements that help agents work through a queue efficiently.

WebSockets, attachments, email notifications, dashboard metrics, and advanced role assignment were deliberately excluded. Each adds infrastructure or cross-cutting complexity that would put correctness and testing of the core workflow at risk within the two-hour limit. See [DECISIONS.md](DECISIONS.md) for trade-offs.

## Stack

- React 19, Material UI, Redux Toolkit, Axios
- Spring Boot 3.5, Spring Data JPA, Bean Validation
- PostgreSQL 16
- JUnit 5, Mockito, and Vitest

## Run locally — 3 commands

Prerequisites: Java 17+, Maven 3.9+, Node 20+, npm, and Docker.

```bash
docker compose up -d
cd backend && mvn spring-boot:run
cd frontend && npm install && npm run dev
```

Run the second and third commands in separate terminals. Open `http://localhost:5173` and use `agent@demo.com` / `demo123`.

## Tests

```bash
cd backend && mvn test
cd frontend && npm test
```

Six unit tests cover ticket creation, missing-ticket handling, normalized search, filtering, status formatting, and client-side validation.

## Structure

```text
backend/src/main/java/com/kajal/ticketing
├── auth/       simplified authentication endpoint
├── common/     CORS and centralized exception handling
└── ticket/     controller, service, repository, entity and DTO
frontend/src
├── components/ responsive feature components
├── features/   Redux async state and API actions
└── utils/      tested ticket utilities
```

## Screenshots

Before submission, run the application and add desktop and mobile screenshots to `docs/screenshots/`. Capture login, ticket list, and ticket form states; use browser responsive mode for a 390px-wide mobile view.

## AI-assisted workflow

AI accelerated scaffolding, CRUD boilerplate, Redux async actions, responsive Material UI composition, and initial test cases. Every generated section was reviewed and adjusted to use DTO validation, centralized API errors, server persistence, explicit loading/error states, and small reusable components. The complete prompt trace and manual corrections are recorded in [AI_PROMPTS.md](AI_PROMPTS.md) and [AI_CHANGE_LOG.md](AI_CHANGE_LOG.md).

## With more time

Replace fixed credentials with Spring Security/JWT and password hashing, add ticket ownership and role authorization, introduce Flyway migrations, add pagination, build controller integration tests with Testcontainers, and provide WebSocket notifications only after the core API is production-hardened.

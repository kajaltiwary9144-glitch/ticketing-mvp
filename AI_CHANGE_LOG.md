# AI-Assisted Change Log

## Generated foundations

AI was used for the initial Maven/Vite structure, entity/repository/controller boilerplate, Redux slice skeletons, Material UI component layout, and first-pass unit tests. The fixed-login endpoint contains an inline comment marking the principal AI-assisted MVP boundary.

## Developer review and modifications

- Replaced entity-as-input handling with a validated `TicketRequest` DTO.
- Trimmed user-controlled title, description, and search values.
- Added centralized 400/404 API responses instead of leaking framework exceptions.
- Kept persistence in PostgreSQL; no mock server or local-storage ticket database is used.
- Added explicit loading, error, empty-list, and destructive-action confirmation states.
- Extracted small deterministic frontend utilities and tested them independently.
- Kept demo authentication honest and narrowly scoped rather than presenting fixed credentials as production security.
- Deferred WebSockets, attachments, and email instead of including unverified placeholders.
- Reworked the initial casual card dashboard into a restrained navy/slate enterprise interface with desktop table and mobile cards.
- Completed priority filtering and sorting rather than only displaying priority labels.
- Added a persisted ticket activity view with comments and parent-ticket validation.
- Changed the PostgreSQL host port to `5433` after reproducing a real local port-conflict scenario.

## Effectiveness

AI was most effective for repetitive scaffolding and component/API wiring. Human review was essential for scope discipline, input boundaries, error behavior, persistence decisions, and ensuring documentation accurately described what was and was not implemented.

# DropouTTuneS

## Backend-API

## User Routes

### User route table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

## Song Routes

### Song route table

| Verb    | URI Pattern            | Controller#Action      |
|---------|------------------------|------------------------|
| GET     | `/songs`               | `index page`           |
| GET     | `/songs/:id`           | `show page`            |
| POST    | `/songs`               | `create route`         |
| PATCH   | `/songs/:id`           | `update route`         |
| DELETE  | `/songs/:id`           | `delete route`         |

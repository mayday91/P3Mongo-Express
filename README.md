 featuresetup
# DropouTTuneS

## Backend-API

## Approach to project(backend)
 - Will be using lastFM API to fetch data that will be relevant to display on the client side of the app. 

## Technologies used
 - Postman - 
 - bcrypt
 - cors
 - dotenv
 - express
 - jsonwebtoken
 - method-override
 - mongodb
 - mongoose
 - passport
 - passport-http-bearer
 - GitHub
 - lastFM API

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
=======
## User Stories
- Sign up
- Log in
- Sign out
- Change Password
- Search Artist
- Search Song
- Search Album
- Put song/album in cart
- Remove song/album from cart
- Preview song
- View album artwork
- View album tracklist
- Show length of songs/albums
- Show contributing artists on songs/albums
 main


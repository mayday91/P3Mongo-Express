
## FRONT-END

## User Stories
- As a user I can Sign up
- As a user I can Log in
- As a user I can Log out
- As a user I can Change Password
- As a user I can Search Musical Artist *
- As a user I can Search for a Song
- As a user I can Search for an Album *
- As a user I can Put Song or album in cart
- As a user I can Remove Song or album from cart
- As a user I can Preview a song *
- As a user I can View album artwork
- As a user I can View album tracklist
- As a user I can Show length of songs
- As a user I can make a purchase
( * = stretch goals)


## Technologies
- React-Shopping-Cart : Shopping cart package  
- JavaScript : programming language for websites
- Axios : making API and backend requests
- Bootstrap : CSS styling
- Dotenv : setting and hiding our backend variables
- React : front-end JavaScript library
- React-Boostrap : UI styling for REACT
- React-Dom : allows for DOM-specific methods
- React-Router-Dom : implmentation of web page routing
- React-Scrips : code to create scripts and configurations
- Sass : CSS extension scripting
- Uuid : npm package to create universally unique identifiers
- Web-vitals : library for measuring all the metrics on users

## Wireframes

![Home](public/images/IndexPage.png)
![Search](public/images/SearchPageLoggedIn.png)
![Login](public/images/Login.png)
![Show](public/images/ShowPage.png)
![Cart](public/images/Cart.png)
![Logout](public/images/logout.png)



## BACKEND-API

## Approach to project(backend)
 - Will be using lastFM API to fetch data that will be relevant to display on the client side of the app. 

## Technologies used
 - Postman - Postman is an API client that makes it easy for developers to create, share, test and document APIs.
 - bcrypt - a password security platform.
 - cors - supports secure cross-origin requests and data transfers between browsers and servers.
 - dotenv - dotenv is a zero-dependency module that loads environment variables from a . env file into process. env.
 - express - Node web framework.
 - jsonwebtoken - a program for trasmitting information between parties as a JSON object.
 - method-override - object-oriented programming, is a language feature that allows a subclass or child class to provide a specific implementation of a method that is already provided by one of its superclasses or parent classes.
 - mongodb - open source NoSQL database management program.
 - mongoose - Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node. js.
 - passport - Passport is authentication middleware for Node. js. 
 - passport-http-bearer - HTTP Bearer authentication strategy for Passport. 
 - GitHub - an online collaborative platform to share ideas and methods.
 - lastFM API - an API to fetch music data (example endpoint from a search - https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=dmx&api_key=b6d97def09e924303dab1c829302163b&format=json&limit=30)

## User Routes

### User route table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

## Song Routes

### Song route table

| Verb    | URI Pattern            | Controller#Action      |
|---------|------------------------|------------------------|
| GET     | `/songs`               | `index page`           |
| GET     | `/songs/:id`           | `show page`            |
| POST    | `/songs`               | `create route`         |
| PATCH   | `/songs/:id`           | `update route`         |
| DELETE  | `/songs/:id`           | `delete route`         |

## ERD

![ERD](public/ERD/ERD.png)

## Roles
Randy D'Abbraccio & Gonzalo Quiroqa - Frontend Client
Lance Nguyen - Backend API
Ryan May - Team Manager
=======
 

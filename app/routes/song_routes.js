// Express docs: http://expressjs.com/en/api.html
const express = require('express')

// dotenv
require("dotenv").config()

// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

const apiKey = require("../../.env")
// const apiKey = "d8e8bce9ba4ee2c4e9813f3ccb16ed83"

// import getLastFmSong
const apiF = require('../api/songsFm') 

// pull in Mongoose model for songs
// song model
const Song = require('../models/song')
const Cart = require("../models/cart")

// require axios
const axios = require("axios")

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')


// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()




// SINGLE SONG SEARCH
// Q for a related title
// if we want our searchTerm to come from body, we must do a few things
// A - must coordinate with front end team about the details of the request url and body
// B - remove searchTerm parameter from url
// C - change definition of searchTerm to be derived from req.body.searchTerm?
router.get("/songs/:searchTerm", (req, res, next) => {
	const searchTerm = req.params.searchTerm
	console.log(searchTerm)
	console.log("here is the key!", process.env.apiKey)
	// getLastFmSong()
	// .then((res) => console.log(res))
		apiF.getLastFmSong(searchTerm, process.env.apiKey)
			.then((res) => {
				console.log("IN GET SONG AFTER GETFM")
				console.log(res.data)
				console.log(res.data.results.trackmatches)
				return res.data
			
			})
			.then((resData) => {
				 res.status(201).json({fmData: resData})
			})
			.catch(err => console.log(err))
})





module.exports = router

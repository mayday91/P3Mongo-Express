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
const cart = require('../models/cart')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()



// SINGLE SONG SEARCH
// Q for a related title
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


// ADD TO CART ROUTE
// 
router.post("/addToCart", (req, res, next) => {
	const user = req.data.user.id
	const songId = req.data.mbid
	const price = 1
	const total = 1
	const totalPrice = price * total
	orderActive = true
	if (Cart.find(user) === "") {
		Cart.create({

			trackName: songId,
			price: price,
			totalPrice: totalPrice,
			orderActive: true
		})
	} else (Cart.find({

		trackName: songId,
		price: price,
		totalPrice: totalPrice,
		orderActive: true
	}))
		Cart.create({

			trackName: songId,
			price: price,
			totalPrice: totalPrice,
			orderActive: true
		})
			.then((res) => {
			return Cart.updateOne(req.body.cart)
			})
			.catch(err => console.log(err))
})



// INDEX
// GET /songs
router.get('/songs', requireToken, (req, res, next) => {
	Song.find()
		.then((songs) => {
			// `songs` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return songs.map((song) => song.toObject())
		})
		// respond with status 200 and JSON of the songs
		.then((songs) => res.status(200).json({ songs: songs }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /songs/5a7db6c74d55bc51bdf39793
router.get('/songs/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Song.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "song" JSON
		.then((song) => res.status(200).json({ song: song.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /songs
router.post('/songs', requireToken, (req, res, next) => {
	// set owner of new song to be current user
	req.body.song.owner = req.user.id

	Song.create(req.body.song)
		// respond to succesful `create` with status 201 and JSON of new "song"
		.then((song) => {
			res.status(201).json({ song: song.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /songs/5a7db6c74d55bc51bdf39793
router.patch('/songs/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.song.owner

	Song.findById(req.params.id)
		.then(handle404)
		.then((song) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, song)

			// pass the result of Mongoose's `.update` to the next `.then`
			return song.updateOne(req.body.song)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /songs/5a7db6c74d55bc51bdf39793
router.delete('/songs/:id', requireToken, (req, res, next) => {
	Song.findById(req.params.id)
		.then(handle404)
		.then((song) => {
			// throw an error if current user doesn't own `song`
			requireOwnership(req, song)
			// delete the song ONLY IF the above didn't throw
			song.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router

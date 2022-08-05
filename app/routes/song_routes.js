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


// CREATE A CART ROUTE
// CREATE A CART FOR THE USER WHEN THEY LOGGED IN
// requireToken
router.post("/carts", requireToken, (req, res, next) => {
	// create a const for id first?
    req.body.owner = req.user.Id

    Cart.create(req.body)
        .then(cart => {
            console.log(cart)
			res.status(201).json({cart})
            
        })
        .catch(err => {
            res.json(err)
        })
})


// // UPDATE ADD/REMOVE SONG FROM CART
// // FULL CRUD WILL BE CARRIED OUT HERE
// router.patch("/cart/:id", requireToken, removeBlanks, (req, res, next) => {
// 	delete req.body.cart.owner

// 	Cart.findById(req.params.id)
// 		//hanlde 404 errors
// 		.then(handle404)
// 		.then((cart) => {
// 			// require ownership of the cart before updating
// 			requireOwnership(req, cart)
// 			// pass along the update to the next .then
// 			return cart.updateOne(req.body.cart)
// 		})
// 		// no content, but successful update
// 		.then(() => res.sendStatus(204))
// 		.catch(next)
// })


// // DELETE CART ROUTE
// router.delete("/carts/:id", requireToken, (req, res, next) => {

// 	Cart.findById(req.params.id)
// 	// handle 404
// 	.then(handle404)
// 	.then((cart) => {
// 		requireOwnership(req, res)
// 		cart.deleteOne()
// 	})
// 	// send status since this will be no content
// 	.then(() => res.sendStatus(204))
// 	.catch(next)
// })





// SHOW CART ROUTE?





// // ADD TO CART ROUTE
// // 
// router.post("/addToCart", (req, res, next) => {
// 	const user = req.data.user.id
// 	const songId = req.data.mbid
// 	const price = 1
// 	const total = 1
// 	const totalPrice = price * total
// 	orderActive = true
// 	if (Cart.find(user) === "") {
// 		Cart.create({

// 			trackName: songId,
// 			price: price,
// 			totalPrice: totalPrice,
// 			orderActive: true
// 		})
// 	} else (Cart.find({

// 		trackName: songId,
// 		price: price,
// 		totalPrice: totalPrice,
// 		orderActive: true
// 	}))
// 		Cart.create({

// 			trackName: songId,
// 			price: price,
// 			totalPrice: totalPrice,
// 			orderActive: true
// 		})
// 			.then((res) => {
// 			return Cart.updateOne(req.body.cart)
// 			})
// 			.catch(err => console.log(err))
// })




module.exports = router

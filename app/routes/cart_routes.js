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




// CREATE A CART ROUTE
// CREATE A CART FOR THE USER WHEN THEY LOGGED IN
// requireToken
router.post("/carts", requireToken, (req, res, next) => {
	// create a const for id first?
    req.body.owner = req.user.id

    Cart.create(req.body)
        .then(cart => {
            console.log(cart)
			res.status(201).json({cart})
            
        })
        .catch(next)
})


// INDEX
// GET /carts
router.get("/carts", (req, res, next) => {

    Cart.find()
        .populate("owner")
        .then((carts) => {
        return carts.map((cart) => cart.toObject())
    })
    .then((carts) => res.status(200).json({carts: carts}))
    .catch(err => {
        res.json(err)
    })
})


// SHOW
//GET /carts/:id
// SHOW
//GET /carts/:id

// WORKING WITH HAYK
// USER ID
router.get("/carts/:id", (req, res, next) => {
	console.log('req.param!!!',req.params);

    Cart.find({ owner : req.params.id})
        .populate("owner") // brings the whole user info in
		.exec(function(error,cart){
			console.log('CART',cart)
			if(error){
				res.send(error)
			} else { 
				res.status(200).json({ cart })
			}			
			})
		

})



// UPDATE ADD/REMOVE SONG FROM CART
// FULL CRUD WILL BE CARRIED OUT HERE
// REQUIRETOKEN
// UPDATED WITH HAYK

// WORKING
router.patch("/carts/:id", requireToken,removeBlanks, (req, res, next) => {
	// delete req.body.cart.owner
	console.log('HIT .THEN IN PATCH~~~~~~~');
	console.log('req.body***********',req.body.songIdToAdd);		

	// NEEDS WORK
	// Needs to be changed to album
	let songIn = { 
				 songName : req.body.songIdToAdd.name,
				 songArtist : req.body.songIdToAdd.artist,
				 songImages : req.body.songIdToAdd.image[3]['#text']}	

	// let songIn = { songs : "testSongtoAdd"}
	// console.log(songIn);

	Cart.findOneAndUpdate({ owner : req.user.id},{ $push: { songs: songIn}})
		//hanlde 404 errors
		.then(handle404)
		.then((cart) => {
			
			console.log('this is cart', cart)
			console.log("this is req", req.body)
			// require ownership of the cart before updating
			requireOwnership(req, cart)
			// pass along the update to the next .then
			return cart.updateOne(req.body.cart)
		})
		// no content, but successful update
		.then(() => res.sendStatus(204))
		.catch(next)
})



// DELETE CART ROUTE
router.delete("/carts/:id", requireToken, (req, res, next) => {

	Cart.findById(req.params.id)
	// handle 404
	.then(handle404)
	.then((cart) => {
		// requireOwnership(req, cart)
		cart.deleteOne()
	})
	// send status since this will be no content
	.then(() => res.sendStatus(204))
	.catch(next)
})






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

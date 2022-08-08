// import dependencies
const mongoose = require('mongoose')
const { Schema, model } = mongoose
const songSchema = require("./song")

const cartSchema = new Schema({
<<<<<<< HEAD
  songs: [], //we can make songs a subdocument by importing the model schema into this array
  // or we can leave them as separate docs by using object id reference (based on MongoDB id when we make the song)
=======
  songs: Array,
  // we can make songs a subdoc by importing the model schema into this array
>>>>>>> a02736f5a1b5df859394024849be16a382602577
  price: {
    type: Number,
    default: 1
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  totalPrice: {
    type: Number
  },
  orderActive: {
    type: Boolean,
    default: true,
    required: true
  }
}, 
{
  timestamps: true
})


module.exports = mongoose.model('Cart', cartSchema)
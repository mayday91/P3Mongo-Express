// import dependencies
const mongoose = require('mongoose')

const { Schema, model } = mongoose
const songSchema = require("./song")

const cartSchema = new Schema({
  songs: [songSchema],
  // we can make songs a subdoc by importing the model schema into this array
  price: {
    type: Number,
    default: 1
  },
  // owner
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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


module.exports = model('Cart', cartSchema)
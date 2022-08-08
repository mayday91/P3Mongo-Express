// import dependencies
const mongoose = require('mongoose')

const { Schema, model } = mongoose
const songSchema = require("./song")

const cartSchema = new Schema({
  songs: Array,
  // we can make songs a subdoc by importing the model schema into this array
  price: {
    type: Number,
    default: 1
  },
  // owner
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
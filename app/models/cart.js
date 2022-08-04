// import dependencies
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const cartSchema = new Schema({
  trackName: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    default: 1
  },
  user: {
    type: String,
    required: true
  }
},{
  totalPrice: {
    type: Number
  },
  orderActive: {
    type: Boolean,
    default: true,
    required: true
  }
})


module.exports = model('Cart', cartSchema)
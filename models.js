'use strict';

const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  created: {type: Date, default: Date.now},
  id: {type: String, default: uuidv4()},
  orders: [{
    id: {type: String, default: uuidv4()},
    firstName: String,
    lastName: String,
    product: String,
    note: String,
    created: {type: Date, default: Date.now},
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: Number
    },
    deliveryDate: Date,
    payment: {
      cardNumber: Number,
      expDate: String,
      csc: Number,
      name: String,
      billingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: Number
      },
      paid: Boolean
    }
  }]
});

userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim()
});


userSchema.methods.serialize = function() {
  return {
    name: this.fullName,
    userName: this.userName,
    password: this.password,
    email: this.email,
    created: this.created,
    id: this._id,
    orders: this.orders
  };
};

const User = mongoose.model('User', userSchema);

module.exports = {User};

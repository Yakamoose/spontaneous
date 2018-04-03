'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  userName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  created: {type: Date, default: Date.now},
  orders: {type: Array}
});

userSchema.virtual('fullName').get(function() {
  return `${this.name.firstName} ${this.name.lastName}`.trim()
});

userSchema.methods.serialize = function() {
  return {
    name: this.fullName,
    userName: this.userName,
    password: this.password,
    email: this.email,
    created: this.created,
    id: this._id,
    orders: []
  };
};

const User = mongoose.model('User', userSchema);

module.exports = {User};

var orderSchema = mongoose.Schema ({
  orderId: {type: String, required: true},
  created: {type: Date, default: Date.now},
  from: {type: String},
  to: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  address: {
    street1: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: Number, required: true}
  },
  product: {type: String, required: true},
  deliveryDate: {type: Date},
  payment: {
    cardNumber: {type: Number, required: true},
    expDate: {
      month: {type: Number, required: true},
      year: {type: Number, required: true}
    },
    csc: {type: Number, required: true},
    cardName: {
      firstName: {type: String, required: true},
      lastName: {type: String, required: true}
    },
    billingAddress: {
      street1: {type: String, required: true},
      city: {type: String, required: true},
      state: {type: String, required: true},
      zipCode: {type: Number, required: true}
    },
    paid: {type: Boolean, required: true}
  }
});

orderSchema.virtual('toFullName').get(function() {
  return `${this.to.firstName} ${this.to.lastName}`.trim()
});

orderSchema.methods.serialize = function() {
  return {
    orderId: this.orderId,
    created: this.created,
    from: this.fullName,
    to: this.toFullName,
    address: {
      street1: this.address.street1,
      city: this.address.city,
      state: this.address.state,
      zipCode: this.address.zipCode
    },
    product: this.product,
    deliveryDate: this.deliveryDate,
    payment: {
      cardNumber: this.payment.cardNumber,
      expDate: {
        month: this.payment.expDate.month,
        year: this.payment.expDate.year
      },
      csc: this.csc,
      cardName: {
        firstName: this.payment.cardName.firstName,
        lastName: this.payment.cardName.lastName
      },
      billingAddress: {
        street1: this.payment.billingAddress.street1,
        city: this.payment.billingAddress.city,
        state: this.payment.billingAddress.state,
        zipCode: this.payment.billingAddress.zipCode
      },
      paid: this.payment.paid
    }
  };
};

const Order = mongoose.model('Order', orderSchema);

module.exports = {Order};

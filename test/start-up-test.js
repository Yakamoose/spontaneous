'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');
const {User} = require('../model');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedUserData() {
  console.log('seedng user profiles');
  const seedData = [];

  for (let i = 0; i < 5; i++) {
    seedData.push(generateUser());
  };
  return User.insertMany(seedData);
}

function generateUser() {
  // console.log('generating user data');
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email()
  };
};

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

function generateOrder() {
  return {
    people: [{
      id: String,
      firstName: String,
      lastName: String,
      orders: [{
        id: String,
        created: Date,
        address: {
          street1: String,
          city: String,
          state: String,
          zipCode: Number
        },
        product: String,
        deliveryDate: Date,
        payment: {
          cardNumber: Number,
          expDate: {
            month: Number,
            year: Number
          },
          csc: Number,
          cardName: {
            firstName: String,
            lastName: String
          },
          billingAddress: {
            street1: String,
            city: String,
            state: String,
            zipCode: Number
          },
          paid: Boolean
        }
      }]
    }]
  };
};


describe('API tests', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedUserData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('home page check', function() {
    it('should return status 200', function() {
      return chai.request(app)
        .get('/')
        .then(function(res) {
          expect(res).to.have.status(200);
        });
    });
  });

  describe('create order page check', function() {
    it('should return status 200', function() {
      return chai.request(app)
        .get('/create-order-page.html')
        .then(function(res) {
          expect(res).to.have.status(200);
        });
    });
  });

  describe('GET user endpoint', function() {
    it('should return all users', function() {
      let res;
      return chai.request(app)
        .get('/user')
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
        });
    });
  });

  describe('GET 1 user endpoint', function() {
    it('should return a specific user', function() {
      let findUser = {};
      return User
        .findOne()
        .then(function(res) {
          findUser = res;
          // console.log(res);
          return chai.request(app)
            .get(`/user/${res._id}`)
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(findUser.userName).to.equal(`${res.body.userName}`);
        });
    });
  });


  describe('POST user endpoint', function() {
    it('should add a new user to DB', function() {
      const newUser = generateUser();

      return chai.request(app)
        .post('/user')
        .send(newUser)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.id).to.not.be.null;
          expect(res.body).to.include.keys(
            'name', 'userName', 'password', 'email', 'id');
        });
    });
  });

  describe('PUT user endpoint', function() {
    it('should update fields in user profile', function() {
      const updateData = {
        firstName: "test name",
        password: "new password from test"
      };

      return User
        .findOne()
        .then(function(res) {
          updateData.id = res._id;
          return chai.request(app)
            .put(`/user/${res._id}`)
            .send(updateData);
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          return User.findById(updateData.id);
        })
        .then(function(res) {
          expect(res.firstName).to.equal(updateData.firstName);
          expect(res.password).to.equal(updateData.password);
        });
    });
  });

  describe('DELETE user', function() {
    it('should delete a single user by id', function() {
      let user;

      return User
        .findOne()
        .then(function(res) {
          user = res;
          return chai.request(app).delete(`/user/${user._id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return User.findById(user._id);
        })
        .then(function(res) {
          expect(res).to.be.null;
        });
    });
  });



















});

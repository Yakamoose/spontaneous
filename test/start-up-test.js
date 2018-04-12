'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');
const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');
const {User} = require('../models');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedUserData() {
  console.log('seedng user profiles');
  const seedData = [];

  for (let i = 0; i < 5; i++) {
    seedData.push(generateUser());
  };
  // console.log(seedData);
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
    // orders: []
  };
};


function generateOrder() {
  return {
      orders: [{
        // created: faker.date.recent(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        product: faker.commerce.productName(),
        note: faker.lorem.sentences(),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          zipCode: faker.address.zipCode()
        },
        deliveryDate: faker.date.future(),
        payment: {
          cardNumber: faker.finance.account(),
          expDate: faker.date.future(),
          csc: faker.random.number(999),
          name: faker.name.findName(),
          billingAddress: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode()
          },
          paid: true
        }
      }]
  };
};

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}
// const testOrder = generateOrder();
// console.log(testOrder.people[0].orders[0]);


describe('API tests', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    const order = generateOrder();
    // console.log(seedUserData());
    return seedUserData();

  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('landing page check', function() {
    it('should return status 200', function() {
      return chai.request(app)
        .get('/')
        .then(function(res) {
          expect(res).to.have.status(200);
        });
    });
  });

  describe('home page check', function() {
    it('should return status 200', function() {
      return chai.request(app)
        .get('/home.html')
        .then(function(res) {
          expect(res).to.have.status(200);
        });
    });
  });

  describe('products page check', function() {
    it('should return status 200', function() {
      return chai.request(app)
        .get('/products.html')
        .then(function(res) {
          expect(res).to.have.status(200);
        });
    });
  });

  describe('GET user endpoint', function() {
    it('should return all users', function() {
      let res;
      return chai.request(app)
        .get('/users')
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

  // describe('GET 1 user by username', function() {
  //   it('should return a specific user', function() {
  //     let findUser = {};
  //     return User
  //       .findOne()
  //       .then(function(res) {
  //         findUser = res;
  //         console.log('res');
  //         console.log(res);
  //         return chai.request(app)
  //           .get(`/user/${res.userName}`)
  //       })
  //       .then(function(res) {
  //         expect(res).to.have.status(200);
  //         expect(findUser.userName).to.equal(`${res.body.userName}`);
  //       });
  //   });
  // });


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

  describe('PUT create order for a user', function() {
    it('should add an order to a users profile', function() {
        const testOrder = generateOrder();
        const testOrder2 = generateOrder();
        const testOrder3 = generateOrder();

        return User
          .findOne()
          .then(function(res) {
            // console.log(res._id)
            testOrder.id = res._id;
            // console.log(testOrder);
            // console.log('testOrder');
            return chai.request(app)
              .put(`/user/order/${testOrder.id}`)
              .send(testOrder)
          })
          .then(function(res) {
            return chai.request(app)
              .put(`/user/order/${testOrder.id}`)
              .send(testOrder2);
          })
          .then(function(res) {
            return chai.request(app)
              .put(`/user/order/${testOrder.id}`)
              .send(testOrder3);
          })
          .then(function(res) {
            expect(res).to.have.status(200);
            return User.findById(testOrder.id);
          })
          .then(function(res) {
            // console.log('ender  hello hello hello');
            // console.log(res);
          })
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

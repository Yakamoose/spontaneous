'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');

const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

describe('start up test', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  // beforeEach(function() {
  //   return seedBlogData();
  // });
  //
  // // afterEach(function() {
  // //   return tearDownDb();
  // // });

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

});

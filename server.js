'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL, TEST_DATABASE_URL } = require('./config');
const { User } = require('./models');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
// app.listen(process.env.PORT || 8080);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'Content-Type');
  res.header('Access-Control-Allow-Origin', 'GET');
  // res.header('Access-Control-Allow-Origin', 'GET, POST, PUT, PATCH, DELETE');

  next();
});


app.get('/users', (req, res) => {
  User
    .find()
    .then(users => {
      res.json(users.map(
          (user) => user.serialize())
      );
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.get('/user/:id', (req, res) => {
  User
    .findById(req.params.id)
    .then(user => res.json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
})

app.get('/user/:userName/:password', (req, res) => {
  // console.log(req.params);
  User
    .findOne({userName: req.params.userName, password: req.params.password })
    .then(user => {
      if(user != null) {
      res.json(user.serialize());
    } else {
      res.json({message: 'user not found'});
    }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    })
})



app.post('/user', (req, res) => {
  const requiredFields = ['firstName', 'lastName', 'userName', 'password', 'email'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    };
  };

  User
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email
    })
    .then(user => res.status(201).json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.put('/user/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ['firstName', 'lastName', 'userName', 'password', 'email'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  User
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(user => res.status(200).json(user.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });

});

app.put('/user/order/:id', (req, res) => {

  const requiredFields = ['firstName'];
  delete req.body.id;
  // console.log(req.body);
  // console.log('req.body');

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body.orders[0])) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    };
  };


  let toUpdate = {};
  toUpdate = req.body;
  // console.log('toUpdate');
  // console.log(toUpdate);
  let updateId = req.params.id;



  User
    .findById(req.params.id)
    .then(function(user) {

      user.orders.push(toUpdate.orders[0]);
      toUpdate = user.orders;
      // console.log('in first part of put');
      // console.log(toUpdate);

      User
        .findByIdAndUpdate(updateId, { $set: {orders: toUpdate}}, { new: true })
        .then(user => res.status(200).json(user.serialize()))
        .catch(err => {
          console.error('error' + err);
          res.status(500).json({ message: 'Internal server error' });
        });

      return toUpdate;
    })
    .catch(err => {
      console.error('error' + err);
      res.status(500).json({ message: 'Internal server error' });
    });


});

app.delete('/user/:id', (req, res) => {
  User
  .findByIdAndRemove(req.params.id)
  .then(post => res.status(204).end())
  .catch(err => res.status(500).json({ message: 'Internal server error' }));
});


app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});



let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    console.log('Starting server');
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

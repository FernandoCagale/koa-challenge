const mongoose = require('mongoose');
const bluebird = require('bluebird');

const uri = process.env.URI || 'mongodb://localhost:27017/challenge';

module.exports = function () {
  mongoose.Promise = bluebird;
  mongoose.connect(uri, { useMongoClient: true });

  mongoose.connection.on('connected', function () {
    console.log(`Mongoose connected ${uri}`);
  });

  mongoose.connection.on('disconnected', function () {
    console.log(`Mongoose disconnected ${uri}`);
  });

  mongoose.connection.on('error', function (erro) {
    console.log(`Mongoose error ${erro}`);
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(`Mongoose finalized`);
      process.exit(0);
    });
  });
};

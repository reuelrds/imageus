const config = require('./var.config');
const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const url = config.mongodb.url;
    const opts = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
    await mongoose.connect(url, opts);
    console.log("Connection Successful");
  } catch (error) {
    console.log("Error Connecting to database");
  }
}

const disconnectDatabase = async () => {
  await mongoose.disconnect()
}

module.exports = {
  connect: connectDatabase,
  disconnect: disconnectDatabase
}
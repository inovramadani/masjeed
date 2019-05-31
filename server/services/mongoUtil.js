const mongodb = require('mongodb')
const keys = require('../config/keys')
const mongoClient = mongodb.MongoClient

const dbName = 'masjeed'
var _db

module.exports = {
  connectToDB: (callback) => {
    const client = new mongoClient(keys.mongoURI, { useNewUrlParser: true })
    client.connect(err => {
      if (err) console.log('Failed to connect to MongoDB\nError: ', err)
      else {
        console.log('Connected to MongoDB successfully')
        _db = client.db(dbName)
      }
      return callback(err)
    })
  },

  getDB: () => {
    return _db;
  }
}
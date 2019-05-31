const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const dbName = 'masjeed'
var _db

module.exports = {
  connectToDB: callback => {
    const mongoURI = process.env.MONGO_URI
    const client = new mongoClient(mongoURI, { useNewUrlParser: true })
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
    return _db
  },
}

const express = require('express')
const router = express.Router()

const mongoUtil = require( '../services/mongoUtil' )
const db = mongoUtil.getDB()

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('req = ', '/api'+req.url);
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! iqbal again!' }) 
})

router.post('/writeDB', (req, res) => {
  const collection = db.collection('app')
  const { appName } = req.body

  collection.updateOne({ name: 'appName' }, { $set: {name: 'appName'} }, { upsert: true }, (err, result) => {
    if (err) {
      res.status(404).send({ message: 'fail to create app' })
    } else {
      res.send({ message: 'app created' })
    }
  })
})

router.get('/readDB', (req, res) => {
  const collection = db.collection('test')

  collection.findOne({ name: 'iqbal' }, (err, result) => {
    if (err) {
      console.log('error read db')
    } else {
      res.send({ result })
    }
  })
})

module.exports = router;
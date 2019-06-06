const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('./controller')

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  controller.google,
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  controller.googleCallback,
)

router.get('/logout', controller.logout)
router.get('/user', (req, res) => {
  res.send(req.user)
})

module.exports = router

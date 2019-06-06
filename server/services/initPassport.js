const GoogleStrategy = require('passport-google-oauth20').Strategy

module.exports = (passport, db) => {
  const User = db.collection('users')
  console.log('got to init passport...')
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }, (err, user) => {
          if (err) console.error(err)

          if (user) return done(null, user)
          else {
            const profileData = { 
              googleId: profile.id,
              fullname: profile.displayName,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              email: profile.emails[0].value
            }
            
            User.insertOne(profileData, (err, obj) => {
              if (obj.result.ok) done(null, obj.ops[0])
            })
          }
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.googleId)
  })

  passport.deserializeUser((googleId, done) => {
    User.findOne({ googleId }, (err, user) => {
      done(err, user)
    })
  })
}


module.exports = {
  google: () => {
    console.log('google..')
    console.log('req.user = ', req.user)
  },

  googleCallback: (req, res) => {
    console.log('googleCallback..')
    console.log('req.user = ', req.user)
    res.redirect('/')
  },

  logout: (req, res) => {
    console.log('logout..')
    console.log('req.user = ', req.user)
    req.logout();
    res.redirect('/');
  }
}
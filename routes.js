// This defines three routes that our API is going to use.
const handlers = require('./handlers')

const routes = app => {
  // Handle posts from slack
  app.post('/api', function (req, res) {
    console.log('got api request')
    const body = req.body
    // Compare tokens
    if (body.type === 'url_verification') {
      return res.send(handlers.verifyUrl(body))
    } else {
      return res.send(handlers.handleEventCallback(body))
    }
  })
}

module.exports = routes

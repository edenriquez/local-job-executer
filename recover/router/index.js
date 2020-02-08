var express = require('express')

const allRoutes = () => {
  var app = express.Router()
  app.use('/jobs', require('./jobs')());
  return app
}

module.exports = allRoutes;
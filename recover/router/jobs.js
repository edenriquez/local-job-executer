'use strict'

var express = require('express');
const kue = require("kue");

import {
  generateProduct,
  scrapCategory
}
from '../jobs/jobs';

const JobsRouter = () => {
  var router = express.Router();
  router.use('/', kue.app);
  router.post('/product/new', generateProduct);
  router.post('/category/new', scrapCategory);
  return router
}
module.exports = JobsRouter;
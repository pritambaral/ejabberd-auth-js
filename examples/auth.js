#!/usr/bin/node

var ejabb = require('../index.js');

ejabb.on('auth', function() {
  ejabb.success();
})

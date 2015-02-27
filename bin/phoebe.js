#!/usr/bin/env node

var http = require('http'),
    log = require('../lib/logger'),
    logger = log.middleware(),
    Phoebe = require('../');

var phoebe = Phoebe();

var httpServer = http.createServer(function (req, res) {
  logger(req, res, function () {
    phoebe(req, res, function () {
      res.end();
    });
  });
});

httpServer.listen(8080, function () {
  console.log("Phoebe's ready on port 8080");
});

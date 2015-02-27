#!/usr/bin/env node

var http = require('http'),
    log = require('../lib/logger'),
    requestLogger = log.middleware(true),
    responseLogger = log.middleware(),
    Phoebe = require('../');

var phoebe = Phoebe();

var httpServer = http.createServer(function (req, res) {
  requestLogger(req, res, function () {

    responseLogger(req, res, function () {
      phoebe(req, res, function () {
        res.end();
      });
    });

  });
});

var port = process.env.port || 80;
var ip = process.env.IP;

httpServer.listen(port, ip, function () {
  log.info("Phoebe's ready at http://%s:%d", ip || 'localhost', port);
});

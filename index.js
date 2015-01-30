var random = require('./lib/random');

var statusCodes = [200, 201, 400, 403, 500];

function decideResponse(req) {
  var neverResponds = random.boolean();
  if (neverResponds)
    return null;

  var statusCode = statusCodes[random.integer(0, statusCodes.length - 1)];
  var delay = random.integer(0, 30000);

  return { statusCode: statusCode, delay: delay };
}

function Respond(strategy, res) {
  res.statusCode = strategy.statusCode;
  setTimeout(function () {
    res.end();
  }, strategy.delay);
}

module.exports = function () {
  return function server(req, res, next) {
    var decidedResponse = decideResponse(req);
    if (decidedResponse === null)
      return next();

    Respond(decidedResponse, res);
  };
};
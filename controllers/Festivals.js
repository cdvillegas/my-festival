'use strict';

var utils = require('../utils/writer.js');
var Festivals = require('../service/FestivalsService');

module.exports.create_festival = function create_festival (req, res, next, body) {
  Festivals.create_festival(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_festival = function get_festival (req, res, next, id) {
  Festivals.get_festival(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.list_festivals = function list_festivals (req, res, next) {
  Festivals.list_festivals()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.optimize_festival_schedule = function optimize_festival_schedule (req, res, next, body, id) {
  Festivals.optimize_festival_schedule(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

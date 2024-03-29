'use strict';

var utils = require('../utils/writer.js');
var Shows = require('../service/ShowsService');

module.exports.create_show = function create_show (req, res, next, body) {
  Shows.create_show(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.delete_show = function delete_show (req, res, next, id) {
  Shows.delete_show(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.list_shows = function list_shows(req, res, next) {
  const festival_id = req.query.festival_id;

  Shows.list_shows(festival_id)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response, response.status || 500);
    });
};


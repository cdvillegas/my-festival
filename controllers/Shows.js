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

module.exports.list_shows = function list_shows (req, res, next) {
  Shows.list_shows()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

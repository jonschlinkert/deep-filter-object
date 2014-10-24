'use strict';

var filterObject = require('filter-object');
var isObject = require('isobject');

module.exports = function deepFilter(obj, patterns) {
  if (obj == null) {
    throw new Error('deep-filter-object expects an object');
  }
  if (arguments.length === 1) {
    return obj;
  }

  obj = filterObject(obj, patterns);
  var o = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];

      if (isObject(value)) {
        o[key] = deepFilter(value, patterns);
      } else {
        o[key] = value;
      }
    }
  }
  return o;
};

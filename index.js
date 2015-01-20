'use strict';

var filterObject = require('filter-object');
var isObject = require('isobject');

/**
 * Expose `deepFilter`
 */

module.exports = deepFilter;


function deepFilter(obj, patterns, options, i) {
  if (obj == null) {
    throw new Error('deep-filter-object expects an object');
  }

  if (arguments.length === 1) return obj;

  obj = filterObject(obj, patterns, options);
  var res = {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];

      if (isObject(value)) {
        res[key] = deepFilter(value, patterns, options);
      } else {
        res[key] = value;
      }
    }
  }
  return res;
};

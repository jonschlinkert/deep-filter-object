/*!
 * deep-filter-object <https://github.com/jonschlinkert/deep-filter-object>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var deepFilter = require('./');

describe('deep filter', function () {
  it('should deeply filter keys using the given glob patterns', function () {
    var obj1 = deepFilter({a: 'a', b: {a: 'a', b: {a: 'a', b: 'b', c: 'c'}}}, '*');
    obj1.should.eql({a: 'a', b: {a: 'a', b: {a: 'a', b: 'b', c: 'c'}}});

    var obj2 = deepFilter({a: 'a', b: {a: 'a', b: {a: 'a', b: 'b', c: 'c'}}}, 'b');
    obj2.should.eql({b: {b: {b: 'b'}}});

    var obj3 = deepFilter({foo: 'a', bar: {foo: 'a', bar: {foo: 'a', bar: 'b', baz: 'c'}}}, 'b*');
    obj3.should.eql({bar: {bar: {bar: 'b', baz: 'c'}}});
  });

  it('should deeply exclude keys that match negation patterns:', function () {
    var obj1 = deepFilter({a: 'a', b: {a: 'a', b: {a: 'a', b: 'b', c: 'c'}}}, ['*', '!a']);
    obj1.should.eql({b: {b: {b: 'b', c: 'c'}}});

    var obj2 = deepFilter({foo: 'a', bar: {foo: 'a', bar: {foo: 'a', bar: 'b', baz: 'c'}}}, ['*', '!foo']);
    obj2.should.eql({bar: {bar: {bar: 'b', baz: 'c'}}});
  });

  it('should deeply filter keys using brace expansion', function () {
    var obj1 = deepFilter({a: 'a', b: {a: 'a', b: {a: 'a', b: 'b', c: 'c'}}}, '{b,c}');
    obj1.should.eql({b: {b: {b: 'b', c: 'c'}}});
  });

  it('should return the entire object if no pattern is given:', function () {
    deepFilter({a: 'a', b: 'b', c: 'c'}).should.eql({a: 'a', b: 'b', c: 'c'});
  });

  it('should throw an error if an object is not passed:', function () {
    (function () {
      deepFilter()
    }).should.throw('deep-filter-object expects an object');
  });
});

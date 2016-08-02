'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var assert = require('assert');
var isBinary = require('./');

describe('isBinary()', function () {
  it('should add an isBinary method', function (cb) {
    var stream = isBinary();
    var buffer = [];

    stream.write(new File({
      base: __dirname,
      path: __dirname + '/foo.txt'
    }));

    stream.on('data', function (file) {
      buffer.push(file);
    });

    stream.on('end', function () {
      assert(buffer[0].hasOwnProperty('isBinary'));
      assert.equal(typeof buffer[0].isBinary, 'function');
      cb();
    });

    stream.end();
  });

  it('should return true when a file is a binary file', function (cb) {
    var stream = isBinary();
    var buffer = [];

    var base = path.join.bind(path, __dirname, 'fixtures');
    var file = new File({
      base: base(),
      path: base('trunks.gif')
    });

    file.contents = fs.readFileSync(file.path);
    stream.write(file);

    stream.on('data', function (file) {
      buffer.push(file);
    });

    stream.on('end', function () {
      assert.equal(buffer[0].basename, 'trunks.gif');
      assert(buffer[0].isBinary());
      cb();
    });
    stream.end();
  });

  it('should return false when a file is not a binary file', function (cb) {
    var stream = isBinary();
    var buffer = [];

    var file = new File({
      base: __dirname,
      path: path.join(__dirname, 'foo.txt')
    });

    file.contents = new Buffer('foo');
    stream.write(file);

    stream.on('data', function (file) {
      buffer.push(file);
    });

    stream.on('end', function () {
      assert.equal(buffer[0].basename, 'foo.txt');
      assert(!buffer[0].isBinary());
      cb();
    });
    stream.end();
  });
});

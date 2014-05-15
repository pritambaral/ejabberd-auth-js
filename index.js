#!/usr/bin/env node
//Reference: http://www.ejabberd.im/files/doc/dev.html#htoc8
var struct = require('bufferpack');
var EventEmitter = require('events').EventEmitter;
exports = module.exports = new EventEmitter();

var PACKET = 2, LENGTH = 0;

var _read = function() {
  var data = process.stdin.read(LENGTH || PACKET);
  if(data === null)
    return;
  if(LENGTH === 0) { // We read AA
    LENGTH = struct.unpack("!H", data)[0];
    // Read internal buffer until drained.
    process.nextTick(_read);
  }
  else { // We read BBBBBBB
    data = data.toString();
    LENGTH = 0;
    _operate(data);
  }
}

var _operate = function(data) {
  if (process.env.EAJ_LOG) process.stderr.write(data);
  data = data.split(':');
  if (exports.listeners(data[0]).length == 0)
    _write(0);
  exports.emit.apply(exports, data);
}

var _write = function(success) {
  if(!success)
    success = 0;
  else
    success = 1;
  process.stdout.write(struct.pack("!HH", [PACKET, success]));
}

exports.success = _write.bind(null, 1);
exports.failure = _write.bind(null, 0);

process.stdin.on("readable", _read);

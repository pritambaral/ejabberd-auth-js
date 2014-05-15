#!/usr/bin/env node
//Reference: http://www.ejabberd.im/files/doc/dev.html#htoc8
struct = require('bufferpack');

PACKET = 2, LENGTH = 0;

_read = function() {
  data = process.stdin.read(LENGTH || PACKET);
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

_operate = function(data) {
  if (process.env.EAJ_LOG) process.stderr.write(data);
  _write(data);
}

_write = function(success) {
  if(!success)
    success = 0;
  else
    success = 1;
  process.stdout.write(struct.pack("!HH", [PACKET, success]));
}

process.stdin.on("readable", _read);

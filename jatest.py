#!/usr/bin/python3
# -*- coding: utf-8 -*-

from struct import pack, unpack
import subprocess, sys

node = subprocess.Popen(['node', sys.argv[1]], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE);
creds = b'auth:ula:haha:lol';
creds = pack(">H", len(creds)) + bytes(creds);
(out, err) = node.communicate(input = creds);
try:
    assert out == pack(">HH", 2, 1);
except AssertionError:
    print('FAIL:')
    print(err.decode("utf-8"));
    exit(2)
print("OK")

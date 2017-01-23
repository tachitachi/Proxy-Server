var util = require('util');
var net = require('net');
var _ = require('underscore');
var fs = require('fs');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

eval(fs.readFileSync('player.js').toString());
eval(fs.readFileSync('bufutil.js').toString());
eval(fs.readFileSync('constants.js').toString());

eval(fs.readFileSync('LogMessage.js').toString());

process.on("uncaughtException", function(e) {
    console.log(e);
});

var client = new net.Socket();
client.connect(5555, '127.0.0.1', function() {
	console.log('Connected');
	client.write(LOG_CONNECTION_PASSWORD);
});

client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('close', function() {
	console.log('Connection closed');
});


const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

var user = 0;
var totalClicksFromOneUser = 0;
io.on('connection', (socket) => {

	socket.on('buttonClicked', (data) => {
		totalClicksFromOneUser = data.totalClicks;
		io.emit('clicksCountFromUsers', {
			clicks: totalClicksFromOneUser
		});
	});

	io.emit('totalClickedTimes', {
		clicks: totalClicksFromOneUser
	});

	io.emit('totalUsers', {
		usersCount: user = user + 1
	});

	socket.on('disconnect', () => {
		io.emit('userdc', {
			usersCount: user = user - 1
		});
	});
});

server.listen(port, () => {
	console.log('Working * 3000');
});
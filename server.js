// LEARN PLATFORM'S WAY:
// const express = require("express"),
// app = express();
// const server = app.listen(8000, () => console.log("server is listening on port 8000!"));
// const io = require("socket.io")(server);

// SOCKET.IO DOCUMENTATION'S WAY:
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// const allMsg = [];

// FOLLOWING WORKS FOR A SINGLE CHAT ROOM, A DEFAULT ROOM:
// io.on("connection", socket => {
// 	console.log(`Nice to meet you, client ${socket.id}! - Inside of server`); // can make use of the socket.id!!!
// 	socket.on("join chat", newUser => {
// 		console.log(newUser)
// 		allMsg.push({newUser: true, name: newUser.name, msg: "has joined the chat", timestamp: Date.now()})
// 		io.emit("new user joined", {"newUser": newUser, "allMsg": allMsg})
// 	})
// 	socket.on("new message", newMsg => {
// 		console.log(newMsg)
// 		allMsg.push(newMsg)
// 		io.emit("new message from server", allMsg)
// 	})
// });

// FOLLOWING IS FOR MULTI CHAT ROOMS:
const allMsg = {allMsg_snap: [], allMsg_beagle: [], allMsg_monstars: []}
// const allMsg_snap = [];
// const allMsg_beagle = [];
// const allMsg_monstars = [];

io.on("connection", socket => {
	console.log(`Nice to meet you, client ${socket.id}! - Inside of server`); // can make use of the socket.id!!!
	socket.on("join chat", newUser => {
		console.log(newUser)
		socket.join(newUser.room);
		allMsg["allMsg_"+newUser.room].push({newUser: true, name: newUser.name, msg: "has joined the chat", timestamp: Date.now()})
		io.to(newUser.room).emit("new user joined", {"newUser": newUser, "allMsg": allMsg["allMsg_"+newUser.room]})
	})
	socket.on("new message", newMsg => {
		console.log(newMsg)
		allMsg["allMsg_"+newMsg.room].push(newMsg)
		io.to(newMsg.room).emit("new message from server", allMsg["allMsg_"+newMsg.room])
	})
});

server.listen(8000, () => console.log("server is listening on port 8000!"));
// WARNING: app.listen(80) will NOT work here!
const express = require("express"),
app = express();

const server = app.listen(8000, () => console.log("server is listening on port 8000!"));

const io = require("socket.io")(server);

io.on("connection", socket => {
	console.log(`Nice to meet you, client ${socket.id}! - Inside of server`);
	socket.emit("from_server", "Welcome! - Sent from server");
});
import React, {useState, useEffect} from "react";
import io from "socket.io-client";

const Chat = props => {
	const [socket] = useState(() => io(":8000"));

	useEffect(() => {
		console.log("this is from useEffect");
		socket.on("from_server", data => console.log(data));
		return () => socket.disconnect(true);
	}, []);

	return(
		<h1>The Handshake</h1>
	);
};

export default Chat;
import React, {useState, useEffect, useRef} from "react";
import io from "socket.io-client";

const socket = io(":8000");

const Chat = props => {
	// const [socket] = useState(() => io(':8000'));
	const {personName} = props;
	const [inputmessage, setInputmessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [inRoomYet, setInRoomYet] = useState(false);
	const [inWhichRoom, setInWhichRoom] = useState("");
	const [joined, setJoined] = useState(false);
	const messagesEndRef = useRef(null);

	const handleInRoom = (whichRoom) => {
		console.log(whichRoom);
		setInRoomYet(true);
		setInWhichRoom(whichRoom);
	};

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			console.log(messagesEndRef.current)
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const onSubmitHandler = e => {
		e.preventDefault();
		console.log(inputmessage);
		socket.emit('new message', {room: inWhichRoom, newUser: false, name: personName, msg: inputmessage, timestamp: Date.now()});
		setInputmessage("");
	};

	useEffect(() => {
		if (inRoomYet) {
			console.log("joining a room");
			socket.emit("join chat", {room: inWhichRoom, name: personName})
		}
		socket.on("new user joined", data => {
			console.log(data)
			setMessages(data.allMsg)
			setJoined(true)
		});
		socket.on("new message from server", msg => {
			console.log(msg)
			setMessages(msg)
		});
	}, [inRoomYet, inWhichRoom, personName]);

	useEffect(() => {
		console.log("scrollToBottom")
		scrollToBottom();
	}, [messages]);

	return(
		<div className="container-fluid">
			<div className="row">
				<nav className="col-md-2 d-md-block bg-light sidebar">
					<div className="sidebar-sticky">
						<ul className="nav flex-column">
							<li className="nav-item">
								<button className={inWhichRoom === "snap" ? "btn btn-light active" : "btn btn-light"} onClick={() => handleInRoom("snap")}>Oh Snap</button>
							</li>
							<li className="nav-item">
								<button className={inWhichRoom === "beagle" ? "btn btn-light active" : "btn btn-light"} onClick={() => handleInRoom("beagle")}>Fly Like a Beagle</button>
							</li>
							<li className="nav-item">
								<button className={inWhichRoom === "monstars" ? "btn btn-light active" : "btn btn-light"} onClick={() => handleInRoom("monstars")}>Monstars</button>
							</li>
						</ul>
					</div>
				</nav>
				<main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
					{!inRoomYet && <div className="border border-warning p-3 rounded" style={{"height": "300px", "overflow": "scroll"}}>
						<h3 className="text-center">Friends list</h3>
					</div>}
					{inRoomYet && <div>
						<div className="border border-warning p-3 rounded" style={{"height": "300px", "overflow": "scroll"}}>
							{joined && messages.map((m, i) => {
								return <div key={i} className={(!m.newUser && m.name === personName) ? "row justify-content-end" : "row justify-content-start"}>
									{m.newUser ? 
										<p className="font-italic">{m.name} {m.msg}</p>
									:
										<div className={m.name === personName ? "col-6 bg-warning border border-dark rounded p-2 mx-2" : "col-6 bg-light border border-dark rounded p-2 mx-2"}>
											{m.name === personName ? <b>You said</b> : <b>{m.name}</b>}
											<p>{m.msg}</p>
										</div>
									}
								</div>
							})}
							<div ref={messagesEndRef} />
						</div>
						<form onSubmit={onSubmitHandler}>
							<div className="form-row align-items-center">
								<div className="col-md-9">
									<label htmlFor="inputMsg" className="sr-only">Message</label>
									<input type="text" className="form-control" id="inputMsg" value={inputmessage} onChange={e=>setInputmessage(e.target.value)} />
								</div>
								<div className="col-md-3">
									<button type="submit" className="btn btn-primary col-md-12">Send</button>
								</div>
							</div>
						</form>
					</div>}
				</main>
			</div>
		</div>
	);
};

export default Chat;
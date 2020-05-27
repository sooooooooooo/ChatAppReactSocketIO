import React, {useState} from "react";
import Login from "../components/Login";
import Chat from "../components/Chat";

const MainView = props => {
	const [loadlogin, setLoadlogin] = useState(true);
	const [loadchat, setLoadchat] = useState(false);
	const [name, setName] = useState("");

	const formSubmitName = name => {
		setName(name);
		console.log(name);
		setLoadlogin(!loadlogin);
		setLoadchat(!loadchat);
	}

	return(
		<>
			<div className="align-items-center p-3 my-3 text-white bg-warning rounded shadow-sm text-center">
				<h3>MERN Chat</h3>
			</div>
			{loadlogin && <Login initialName={""} formSubmitProp={formSubmitName} />}
			{loadchat && <Chat personName={name} />}
		</>
	);
};

export default MainView;
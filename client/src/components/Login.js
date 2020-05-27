import React, {useState} from "react";

const Login = props => {
	const {initialName, formSubmitProp} = props;
	const [name, setName] = useState(initialName);

	const onSubmitHandler = e => {
		e.preventDefault();
		formSubmitProp(name);
	}

	return(
		<div className="border border-warning p-3 rounded">
			<h5 className="text-center">Get started here:</h5>
			<p>I want to start chatting with the name ...</p>

			<form onSubmit={onSubmitHandler}>
				<div className="form-row align-items-center">
					<div className="col-md-9">
						<label htmlFor="inputName" className="sr-only">Name</label>
						<input type="text" className="form-control" id="inputName" placeholder="My name ..." value={name} onChange={e=>setName(e.target.value)} />
					</div>
					<div className="col-md-3">
						<button type="submit" className="btn btn-warning">Start Chatting</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
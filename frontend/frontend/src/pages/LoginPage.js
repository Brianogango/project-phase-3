import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsLoggedIn }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	function handleLogin(event) {
		event.preventDefault();
		const formData = { type: "login", email: email, password: password };

		// Send login request to backend API
		fetch("http://localhost:9292/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ formData }),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Login failed.");
				}
			})
			.then((data) => {
				console.log("Response data:", data);
				if (data.message === "logged in successfully.") {
					localStorage.setItem("token", data.token); // Save the token in local storage
					localStorage.setItem("userId", data.user_id); // Save the user ID in local storage
					localStorage.setItem("isLoggedIn", true);
					setIsLoggedIn(true);
					navigate("/home"); // Redirect to the home page
					window.location.reload();
				}
			})
			.catch((error) => {
				alert("Invalid email or password.");
			});
	}

	return (
		<div className='hero'>
			<div className='container'>
				<div className='user_form'>
					<h1>Login</h1>
					<form onSubmit={handleLogin}>
						<div className='form-group'>
							<label for='email'>
								Email:
								<input
									type='email'
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</label>
						</div>
						<div className='form-group'>
							<label for='password'>
								Password:
								<input
									type='password'
									value={password}
									onChange={(event) => setPassword(event.target.value)}
								/>
							</label>
						</div>
						<button className='btn btn-primary' type='submit'>
							Login
						</button>
						<p>
							Have an account? <Link to='/signupPage'>signup</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;

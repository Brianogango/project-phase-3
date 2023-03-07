import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

function SignupPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			// Display an error message or alert
			console.log("Error");
			return;
		}
		const formData = { name, email, password, type: "signup" };
		fetch("http://localhost:9292/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				formData,
			}),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Signup failed.");
				}
			})
			.then((data) => {
				// Handle successful signup
				navigate("/loginPage");
				console.log("Signup successful");
			})
			.catch((error) => {
				// Handle signup failure
			});
	};

	return (
		<div className='hero'>
			<div className='container'>
				<div className='user_form'>
					<h1>Create account</h1>
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label htmlFor='name'>Name:</label>
							<input
								type='text'
								id='name'
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='email'>Email:</label>
							<input
								type='email'
								id='email'
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password:</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='confirm-password'>Confirm Password:</label>
							<input
								type='password'
								id='confirm-password'
								value={confirmPassword}
								onChange={(event) => setConfirmPassword(event.target.value)}
							/>
						</div>

						<button className='btn btn-primary' type='submit'>
							Sign up
						</button>
						<p>
							Have an account? <Link to='/loginPage'>Login</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
export default SignupPage;

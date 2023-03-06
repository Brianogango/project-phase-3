import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Display from "./pages/Display";
import Pets from "./pages/Pets";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		localStorage.getItem("isLoggedIn") === "true"
	);
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(false);
		navigate("/loginPage");
	};
	const handleLogin = () => {
		localStorage.setItem("isLoggedIn", "true");
		setIsLoggedIn(true);
		navigate("/");
	};

	return (
		<div>
			<Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/display' element={<Display isLoggedIn={isLoggedIn} />} />
				<Route path='/pets/:id' element={<Pets isLoggedIn={isLoggedIn} />} />
				<Route
					path='/profile'
					element={<Profile setIsLoggedIn={setIsLoggedIn} />}
				/>
				<Route
					path='/loginPage'
					element={<LoginPage handleLogin={handleLogin} />}
				/>
				<Route path='/signupPage' element={<SignupPage />} />
			</Routes>
		</div>
	);
}

export default App;

import { NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn, handleLogout }) {
	return (
		<nav
			className='navbar navbar-expand-lg bg-light-600 navbar-light py-3 fixed-top text-dark-500'
			style={{ opacity: "1", backgroundColor: "rgba(255, 255, 255, 1)" }}
		>
			<div className='container'>
				<a href='#!' className='navbar-brand'>
					FOREVER<span className='span'> PETS</span>
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navMenu'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navMenu'>
					<ul className='navbar-nav ms-auto'>
						{isLoggedIn ? (
							<>
								<li className='nav-item'>
									<NavLink to='/' className='nav-link'>
										Home
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink to='/display' className='nav-link'>
										Pets
									</NavLink>
								</li>

								<li className='nav-item'>
									<NavLink to='/pets' className='nav-link'>
										Pet-Details
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink to='/profile' className='nav-link'>
										Profile
									</NavLink>
								</li>
								<li className='nav-item'>
									<a href='#!' className='nav-link' onClick={handleLogout}>
										Logout
									</a>
								</li>
							</>
						) : (
							<>
								<li className='nav-item'>
									<NavLink to='/' className='nav-link'>
										Home
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink to='/loginPage' className='nav-link'>
										Login
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink to='/signupPage' className='nav-link'>
										Register
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

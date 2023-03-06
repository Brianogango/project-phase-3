import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<div className='hero'>
			<div className='container'>
				<div className='message'>
					<h1 className='message_hi'>Welcome to Forever Pets!</h1>
					<p className='message_p'>Find your forever friend here.</p>
					<button>
						<Link to='/loginPage'>Get Started</Link>
					</button>
					<div className='image-grid'>
						<img
							src='https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg'
							alt='Adopt a pet today'
						/>
						<img
							src='https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_960_720.jpg'
							alt='Find pets near you'
						/>
						<img
							src='https://as1.ftcdn.net/v2/jpg/02/43/84/26/1000_F_243842650_PcnKP2aCKQMU08jWG6z9wZAXTnf6s398.jpg'
							alt='Support pet adoption charities'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;

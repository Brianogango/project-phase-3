import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Display = () => {
	const [pets, setPets] = useState([]);
	const [type, setType] = useState("");
	const [loading, setLoading] = useState(false);
	console.log(type);
	useEffect(() => {
		setLoading(true); // Set loading to true before fetching data
		let apiUrl = "http://localhost:9292/pets";

		if (type !== "all") {
			apiUrl += `?animal_type=${type}`;
		}

		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => {
				setPets(data);
				setLoading(false); // Set loading to false after data has been fetched
			})
			.catch((error) => console.error(error));
	}, [type]);

	return (
		<div className='container'>
			<div className='hero'>
				<div className='home_page'>
					<h2 style={{ textAlign: "center", fontStyle: "italic" }}>
						Welcome to the Pet Adoption Agency!
					</h2>
					<h2
						style={{
							textAlign: "center",
							fontStyle: "italic",
							fontSize: "30px",
						}}
					>
						Available Pets:
					</h2>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginBottom: "20px",
						}}
					>
						<button onClick={() => setType("All")}>All</button>
						<button onClick={() => setType("Dog")}>Dog</button>
						<button onClick={() => setType("Cat")}>Cat</button>
						<button onClick={() => setType("Rabbit")}>Rabbit</button>
					</div>
					{loading ? (
						<p>Loading...</p> // Display loading message while data is being fetched
					) : (
						<div className='row'>
							{Array.isArray(pets) &&
								pets.map((pet, index) => {
									return (
										<div className='card mx-1' key={index}>
											<img
												className='card-img-top'
												src={pet.image_url}
												alt={pet.name}
											/>
											<div className='card-body'>
												<h4 className='card-title'>{pet.name}</h4>
												<p className='card-text'>{pet.breed}</p>
											</div>
											<Link to={`/pets/${pet.id}`} className='link'>
												View More &#8594;
											</Link>
										</div>
									);
								})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Display;

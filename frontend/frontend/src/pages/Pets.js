import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Pets() {
	const { id } = useParams();
	const userId = localStorage.getItem("userId");

	const [pet, setPet] = useState([]);
	const formData = { pet_id: id, user_id: userId };

	useEffect(() => {
		fetch(`http://localhost:9292/pets/${id}`)
			.then((res) => res.json())
			.then((data) => setPet(data));
	}, [id]);

	// save the pet in the adoption table
	const handleAdopt = async (e) => {
		e.preventDefault();

		const res = await fetch(`http://localhost:9292/adoptions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				formData,
			}),
		});

		if (res.ok) {
			// Adoption created successfully
			console.log("Adoption created successfully");
		} else {
			// Handle error
			console.log("Error creating adoption");
		}
	};

	return (
		<div className='hero'>
			<div className='container'>
				<div className='pet_details_page'>
					<div className='pet_details_container'>
						<div className='pet_details_left'>
							<img src={pet.image_url} alt={pet.name} />
							<div className='pet_details_hover'>
								<h3>{pet.name}</h3>
								<p>{pet.breed}</p>
							</div>
						</div>
						<div className='pet_details_right'>
							<h1>Name: {pet.name}</h1>
							<h3>Posted: {pet.created_at}</h3>
							<h3>Gender: {pet.gender}</h3>
							<h3>Age: {pet.age}</h3>
							<h3>Size: {pet.size}</h3>
							<h3>Weight: {pet.weight}</h3>
							<h3>Color: {pet.color}</h3>
							<h3>Available: {pet.available_for_adoption}</h3>
						</div>
					</div>
					<div className='pet_description'>
						<p>Description: {pet.description}</p>
					</div>
					<div className='adopt_button'>
						<form onSubmit={handleAdopt}>
							<button type='submit' className='adopt_button_hover'>
								Adopt
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Pets;

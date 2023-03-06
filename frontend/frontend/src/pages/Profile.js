import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
	const [user, setUser] = useState(null);
	const [data, setData] = useState({});

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		// const token = localStorage.getItem("token");

		if (userId) {
			fetch(`http://localhost:9292/users/${userId}`)
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Failed to retrieve user data.");
					}
				})
				.then((data) => {
					setUser(data.user);
				})
				.catch((error) => {
					alert(error.message);
				});
		}
	}, []);

	// handle delete user account
	const navigate = useNavigate(); // Get navigate function
	function handleDeleteUser() {
		const userId = localStorage.getItem("userId");

		fetch(`http://localhost:9292/users/${userId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					// Remove user data from local storage
					localStorage.removeItem("userId");
					localStorage.removeItem("isLoggedIn");
					localStorage.removeItem("token");

					// Redirect to login page
					navigate("/loginPage");
				} else {
					alert("Failed to delete user data.");
				}
			})
			.catch((error) => {
				alert("Failed to delete user data.");
			});
	}

	// create new pet
	const userId = localStorage.getItem("userId");
	// usestates
	const [name, setName] = useState("");
	const [animalType, setAnimalType] = useState("Cat");
	const [breed, setBreed] = useState("");
	const [age, setAge] = useState(0);
	const [gender, setGender] = useState("Male");
	const [size, setSize] = useState("Medium");
	const [weight, setWeight] = useState(0);
	const [color, setColor] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [description, setDescription] = useState("");

	function handleSubmit(event) {
		const formData = {
			name: name,
			animal_type: animalType,
			breed: breed,
			age: age,
			gender: gender,
			size: size,
			weight: weight,
			color: color,
			image_url: imageUrl,
			description: description,
			user_id: userId,
			pet_id: data.id,
		};

		event.preventDefault();
		fetch("http://localhost:9292/pets", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				formData,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Filed to create new pet.");
				}
			})
			.then((data) => {
				window.location.reload();
				console.log(data);
			});
	}
	// show data when the modal opens
	function showDetail(id) {
		fetch(`http://localhost:9292/pets/${id}`)
			.then((res) => res.json())
			.then((data) => setData(data));
	}

	function newPet() {}
	function deletePet(id) {
		fetch(`http://localhost:9292/pets/${id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(() => {
				// Remove the deleted pet from the UI
				setUser((prevState) => ({
					...prevState,
					pets: prevState.pets.filter((pet) => pet.id !== id),
				}));
			})
			.catch((error) => console.error(error));
	}

	// edit pet-details

	const handleSubmitEdit = (event, id) => {
		event.preventDefault();
		// Update pet details in database

		const userId = localStorage.getItem("userId");

		const formData = {
			user_id: userId,
			name: data.name,
			animal_type: data.animal_type,
			breed: data.breed,
			age: data.age,
			gender: data.gender,
			size: data.size,
			weight: data.weight,
			color: data.color,
			image_url: data.image_url,
			description: data.description,
			pet_id: data.id,
		};

		console.log(formData);
		fetch(`http://localhost:9292/pets/${data.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ formData }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success:", data);
				// Redirect to the pet details page after the pet has been updated
				Navigate(`/profile`);
				window.location.reload();
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};
	const [pets, setPets] = useState();
	useEffect(() => {
		fetch(`http://localhost:9292/pets`)
			.then((res) => res.json())
			.then((data) => setPets(data));
	}, []);
	return (
		<div className='hero'>
			<div className='container'>
				<div className='Personal_details_section'>
					<div className='personal_details_content'>
						<h2>My Profile</h2>
						<div className='profile'>
							{user ? (
								<div>
									<label>Name:</label>
									<input type='text' value={user.name} />
									<br />
									<label>Email:</label>
									<input type='email' value={user.email} />
									<br />
									<button onClick={handleDeleteUser}>Delete</button>

									<button>Save</button>
								</div>
							) : (
								<p>Loading user data...</p>
							)}
						</div>
					</div>
				</div>

				<div className='pets_section'>
					<div className='pets_content'>
						<h2 className='d-flex text-dark'>
							My Pets
							<button
								class='btn btn-primary'
								onClick={(e) => newPet()}
								data-toggle='modal'
								data-target='#my2Modal'
							>
								New-Pet
							</button>
						</h2>
						{user && user.pets.length > 0 ? (
							<div className='pets'>
								{user &&
									user.pets.map((pet) => (
										<div key={pet.id}>
											<div className='pet-card'>
												<img
													className='pet-image'
													src={pet.image_url}
													alt={pet.name}
												/>
												<div className='pet-details'>
													<label>Name:</label>
													<input type='text' value={pet.name} />
													<br />
													<label>Breed:</label>
													<input type='text' value={pet.breed} />
													<br />
													<label>Age:</label>
													<input type='number' value={pet.age} />
													<br />
													<div className='pet-buttons'>
														<button
															class='btn btn-primary'
															onClick={(e) => showDetail(pet.id)}
															data-toggle='modal'
															data-target='#myModal'
														>
															Get Details
														</button>
														<button
															className='delete-button'
															onClick={(e) => deletePet(pet.id)}
														>
															Delete
														</button>
													</div>
												</div>
											</div>
										</div>
									))}
							</div>
						) : (
							<p>No pets found</p>
						)}
					</div>
				</div>

				<div className='adoptions_section'>
					<div className='adoptions_content'>
						<h2>My Adoptions</h2>
						<div className='adoptions'>
							{user && user.adoptions.length > 0 ? (
								user.adoptions.map((adoption) => (
									<div key={adoption.id}>
										{pets && pets.find((pet) => pet.id === adoption.pet_id) && (
											<div className='row'>
												<div className='col'>
													<img
														className='pet-image'
														src={
															pets.find((pet) => pet.id === adoption.pet_id)
																.image_url
														}
														alt=''
													/>
													<p>
														Name :
														{
															pets.find((pet) => pet.id === adoption.pet_id)
																.name
														}
													</p>
													<p>
														Color :
														{
															pets.find((pet) => pet.id === adoption.pet_id)
																.color
														}
													</p>
													<p>
														Breed :
														{
															pets.find((pet) => pet.id === adoption.pet_id)
																.breed
														}
													</p>
												</div>
												<div className='col'>
													<p>
														Gender :
														{
															pets.find((pet) => pet.id === adoption.pet_id)
																.gender
														}
													</p>
													<p>
														Age :
														{pets.find((pet) => pet.id === adoption.pet_id).age}
													</p>
													<p>
														Size :
														{
															pets.find((pet) => pet.id === adoption.pet_id)
																.size
														}
													</p>
													<p>
														Weight :
														{
															pets.find((pet) => pet.id === adoption.pet_id)
																.weight
														}
													</p>
												</div>
												<div className='col'>
													<p>
														Description :
														{
															pets.find((pet) => pet.id === adoption.pet_id)
																.description
														}
													</p>
													<p>Created on: {adoption.created_at}</p>
													<p>Status: {adoption.status}</p>
												</div>
											</div>
										)}
									</div>
								))
							) : (
								<p>No adoptions found.</p>
							)}
						</div>
					</div>
				</div>

				{/* modal */}
				<div class='modal' id='myModal'>
					<div class='modal-dialog' style={{ width: "700px" }}>
						<div class='modal-content'>
							<div class='modal-header'>
								<h4 class='modal-title'>UPDATE</h4>
								<button type='button' class='close' data-dismiss='modal'>
									&times;
								</button>
							</div>

							<div class='modal-body'>
								<form onSubmit={handleSubmitEdit}>
									<div className='row'>
										<div className='col'>
											<label htmlFor='name'>Name:</label>
											<input
												type='text'
												id='name'
												name='name'
												value={data.name}
												onChange={(event) =>
													setData({ ...data, name: event.target.value })
												}
											/>
											<br />
											<label htmlFor='animal_type'>Animal Type:</label>
											<select
												id='animal_type'
												name='animal_type'
												value={data.animal_type}
												onChange={(event) =>
													setData({ ...data, animal_type: event.target.value })
												}
											>
												<option value='Dog'>Dog</option>
												<option value='Cat'>Cat</option>
												<option value='Rabbit'>Rabbit</option>
											</select>
											<br />
											<label htmlFor='breed'>Breed:</label>
											<input
												type='text'
												id='breed'
												name='breed'
												value={data.breed}
												onChange={(event) =>
													setData({ ...data, breed: event.target.value })
												}
											/>
											<br />
											<label htmlFor='age'>Age:</label>
											<input
												type='number'
												id='age'
												name='age'
												value={data.age}
												onChange={(event) =>
													setData({ ...data, age: event.target.value })
												}
											/>
											<br />
											<label htmlFor='gender'>Gender:</label>
											<input
												type='text'
												id='gender'
												name='gender'
												value={data.gender}
												onChange={(event) =>
													setData({ ...data, gender: event.target.value })
												}
											/>
											<br />
										</div>
										<div className='col'>
											<label htmlFor='size'>Size:</label>
											<select
												id='size'
												name='size'
												value={data.size}
												onChange={(event) =>
													setData({ ...data, size: event.target.value })
												}
											>
												<option value='Small'>Small</option>
												<option value='Medium'>Medium</option>
												<option value='Large'>Large</option>
											</select>
											<br />

											<label htmlFor='weight'>Weight:</label>
											<input
												type='number'
												id='weight'
												name='weight'
												value={data.weight}
												onChange={(event) =>
													setData({ ...data, weight: event.target.value })
												}
											/>
											<br />

											<label htmlFor='color'>Color:</label>
											<input
												type='text'
												id='color'
												name='color'
												value={data.color}
												onChange={(event) =>
													setData({ ...data, color: event.target.value })
												}
											/>
											<br />

											<label htmlFor='image_url'>Image URL:</label>
											<input
												type='text'
												id='image_url'
												name='image_url'
												value={data.image_url}
												onChange={(event) =>
													setData({ ...data, image_url: event.target.value })
												}
											/>
											<br />
											<br />
											<label htmlFor='description'>Description:</label>

											<textarea
												id='description'
												name='description'
												value={data.description}
												onChange={(event) =>
													setData({ ...data, description: event.target.value })
												}
											></textarea>
											<br />
										</div>
									</div>

									<input type='submit' value='Submit' />
								</form>
							</div>
						</div>
					</div>
				</div>
				{/* end */}
				{/* modal2 */}
				<div class='modal' id='my2Modal'>
					<div class='modal-dialog' style={{ width: "700px" }}>
						<div class='modal-content'>
							<div class='modal-header'>
								<h4 class='modal-title'>NEW-PET</h4>
								<button type='button' class='close' data-dismiss='modal'>
									&times;
								</button>
							</div>

							<div class='modal-body'>
								<form onSubmit={handleSubmit}>
									<div className='row'>
										<div className='col'>
											<label htmlFor='name'>Name:</label>
											<input
												type='text'
												id='name'
												name='name'
												value={name}
												onChange={(event) => setName(event.target.value)}
											/>
											<br />

											<label htmlFor='animal_type'>Animal Type:</label>
											<select
												id='animal_type'
												name='animal_type'
												value={animalType}
												onChange={(event) => setAnimalType(event.target.value)}
											>
												<option value='Dog'>Dog</option>
												<option value='Cat'>Cat</option>
												<option value='Rabbit'>Rabbit</option>
											</select>
											<br />

											<label htmlFor='breed'>Breed:</label>
											<input
												type='text'
												id='breed'
												name='breed'
												value={breed}
												onChange={(event) => setBreed(event.target.value)}
											/>
											<br />

											<label htmlFor='age'>Age:</label>
											<input
												type='number'
												id='age'
												name='age'
												value={age}
												onChange={(event) => setAge(event.target.value)}
											/>
											<br />

											<label htmlFor='gender'>Gender:</label>
											<input
												type='radio'
												id='gender-male'
												name='gender'
												value='Male'
												checked={gender === "Male"}
												onChange={(event) => setGender(event.target.value)}
											/>
											<label htmlFor='gender-male'>Male</label>
											<input
												type='radio'
												id='gender-male'
												name='gender'
												value='Female'
												checked={gender === "Female"}
												onChange={(event) => setGender(event.target.value)}
											/>
											<label htmlFor='gender-female'>Female</label>
											<br />
										</div>
										<div className='col'>
											<label htmlFor='size'>Size:</label>
											<select
												id='size'
												name='size'
												value={size}
												onChange={(event) => setSize(event.target.value)}
											>
												<option value='Small'>Small</option>
												<option value='Medium'>Medium</option>
												<option value='Large'>Large</option>
											</select>
											<br />

											<label htmlFor='weight'>Weight:</label>
											<input
												type='number'
												id='weight'
												name='weight'
												value={weight}
												onChange={(event) => setWeight(event.target.value)}
											/>
											<br />

											<label htmlFor='color'>Color:</label>
											<input
												type='text'
												id='color'
												name='color'
												value={color}
												onChange={(event) => setColor(event.target.value)}
											/>
											<br />

											<label htmlFor='image_url'>Image URL:</label>
											<input
												type='text'
												id='image_url'
												name='image_url'
												value={imageUrl}
												onChange={(event) => setImageUrl(event.target.value)}
											/>
											<br />
											<br />
											<label htmlFor='description'>Description:</label>

											<textarea
												id='description'
												name='description'
												value={description}
												onChange={(event) => setDescription(event.target.value)}
											></textarea>
											<br />
										</div>
									</div>

									<input type='submit' value='Submit' />
								</form>
							</div>
						</div>
					</div>
				</div>
				{/* end */}
			</div>
		</div>
	);
}

export default Profile;

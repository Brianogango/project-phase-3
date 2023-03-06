require_relative '../controllers/application_controller'
class PetsController < ApplicationController
get '/pets' do
  animal_type = params[:animal_type]

  if animal_type == "Dog"
    pets = Pet.where(animal_type: "Dog")
  elsif animal_type == "Cat"
    pets = Pet.where(animal_type: "Cat")
  elsif animal_type == "Rabbit"
    pets = Pet.where(animal_type: "Rabbit")
  else
    pets = Pet.all
  end

  pets.to_json
end

    # endpoint to create a new pet
# endpoint to create a new pet
post '/pets' do
  request_body = request.body.read
  form_data = JSON.parse(request_body)['formData']
  puts form_data.inspect
  # Retrieve user_id from session

  name = form_data['name']
  animal_type = form_data['animal_type']
  breed = form_data['breed']
  age = form_data['age']
  gender = form_data['gender']
  size = form_data['size']
  weight = form_data['weight']
  color = form_data['color']
  image_url = form_data['image_url']
  description = form_data['description']
  user_id = form_data['user_id']

  if (name.present? && animal_type.present? && breed.present? &&
      image_url.present? && description.present? && age.present? &&
      gender.present? && size.present? && weight.present? && color.present? && user_id.present?)
    
    pet = Pet.create(
      name: name,
      animal_type: animal_type,
      breed: breed,
      age: age,
      gender: gender,
      size: size,
      weight: weight,
      color: color,
      image_url: image_url,
      description: description,
      user_id: user_id
    )
puts pet
    if pet.persisted?
      pet.to_json
      halt 200, { message: "Pet created successfully" }.to_json
    else
      halt 400, pet.errors.to_json
    end
  else
    halt 400, { message: "All fields are required" }.to_json
  end
end


# endpoint to get details of a pet
get '/pets/:id' do
  pet = Pet.find_by_id(params[:id])
  if pet
    pet.to_json
  else
    halt 404, { error: "Pet not found" }.to_json
  end
end

put '/pets/:id' do
  request_body = request.body.read
  form_data = JSON.parse(request_body)['formData']

  name = form_data['name']
  animal_type = form_data['animal-type']
  breed = form_data['breed']
  age = form_data['age']
  gender = form_data['gender']
  size = form_data['size']
  weight = form_data['weight']
  color = form_data['color']
  image_url = form_data['image_url']
  description = form_data['description']
  user_id = form_data['user_id']
  pet_id = form_data['pet_id']

  # check if pet with that id exists if exists update else return an error message
  pet = Pet.find_by(id: pet_id)
  if pet.nil?
    status 404
    return { error: "Pet with ID #{pet_id} not found" }.to_json
  else
    pet.update(
      name: name,
      animal_type: animal_type,
      breed: breed,
      age: age,
      gender: gender,
      size: size,
      weight: weight,
      color: color,
      image_url: image_url,
      description: description,
      user_id: user_id
    )
    { message: "Pet with ID #{pet_id} updated successfully" }.to_json
  end
end


# endpoint to delete a particular pet
delete '/pets/:id' do
  pet = Pet.find_by_id(params[:id])
  if pet
    pet.destroy
    { message: "Pet deleted successfully" }.to_json
  else
    halt 404, { error: "Pet not found" }.to_json
  end
end
end
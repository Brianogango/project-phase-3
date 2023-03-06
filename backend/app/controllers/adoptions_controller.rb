require_relative '../controllers/application_controller'
class AdoptionsController < ApplicationController
    get '/adoptions' do
        adoptions = Adoption.all
        adoptions.to_json
    end
# post a new adoption
 post '/adoptions' do
    request_body = request.body.read
  form_data = JSON.parse(request_body)['formData']
  user_id = form_data['user_id']
  pet_id = form_data['pet_id']

  adoption = Adoption.new(user_id: user_id, pet_id: pet_id, status: "pending")

  if adoption.save
    status 201
    { message: "Adoption created successfully" }.to_json
  else
    status 422
    { message: "Failed to create adoption" }.to_json
  end
end

   
end
require_relative '../controllers/application_controller'
class UsersController < ApplicationController
    get '/users' do
        users=User.all
        users.to_json
    end
 
  
# get an individual user from the database using the user id
get '/users/:id' do
  user = User.find_by(id: params[:id])
  if user
    { user: user }.to_json(include: [:adoptions, :pets])
  else
    halt 404, { error: "User not found" }.to_json
  end
end




post '/users' do
  request_body = request.body.read
  form_data = JSON.parse(request_body)['formData']
  puts "form_data: #{form_data.inspect}"
  
  if form_data['type'] == 'signup'
    # Handle sign-up request
    name = form_data['name']
    email = form_data['email']
    password = BCrypt::Password.create(form_data['password'])

    # Perform server-side validation here if necessary
    if name.present? && email.present? && password.present?
      check_email_validation = User.where(email: email).count()
      if check_email_validation < 1
        user = User.create(name: name, email: email, password_digest: password)
        if user
          session[:user_id] = user.id
          content_type :json
          status 200
          { message: "Signed up successfully." }.to_json()
        else
          content_type :json
          status 400
          { message: "Unable to sign up." }.to_json()
        end
      else
        content_type :json
        status 400
        { message: "The Email already exists!" }.to_json()
      end
    else
      content_type :json
      status 400
      { message: "All fields are required." }.to_json()
    end
  elsif form_data['type'] == 'login'
    # Handle login request
    email = form_data['email']
    password = form_data['password']
   
    user = User.find_by(email: form_data["email"])
    puts user
if user && user.authenticate(form_data["password"])
token = SecureRandom.hex(32)
  user.update_attribute(:token, token)

  # store the user id in the session
  session[:user_id] = user.id

  # send a JSON response with user_id, token and success message
  { user_id: user.id, token: token, message: "logged in successfully." }.to_json()
else
  # authentication failed, handle it here
   redirect '/login'
end

else
    content_type :json
    status 400
    { message: "Invalid request type" }.to_json()
end

end

# deleting user

delete '/users/:id' do
  user = User.find_by_id(params[:id])
  if user
    user.destroy
    { message: "User deleted successfully" }.to_json
  else
    halt 404, { error: "User not found" }.to_json
  end
end

# logout
# get '/logout' do
#     if session[:user_id] != nil
#       session.clear
#       redirect to '/login'
#     else
#       redirect to '/'
#     end
  # end

end






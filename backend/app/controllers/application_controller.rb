require 'sinatra/cross_origin'
require 'jwt'
require 'bcrypt'




class ApplicationController < Sinatra::Base
  # configure do
  #   enable :sessions
  #   set :session_secret, ENV.fetch('SESSION_SECRET') { SecureRandom.hex(64) }
  #   set :protection, except: [:json_csrf]
  #   enable :cross_origin
  # end


# ENV['JWT_SECRET'] =  SecureRandom.hex(32)
# ENV['SESSION_SECRET'] =  SecureRandom.hex(32)


    configure do
    enable :sessions
    set :session_secret, ENV['SESSION_SECRET']
    set :views, 'app/views'
    set :public_folder, 'public'
  end

  before do
    content_type :json
  end

  helpers do
    def authenticate!
      begin
        token = request.env['HTTP_AUTHORIZATION'].split(' ').last
        decoded_token = JWT.decode(token, ENV['JWT_SECRET'], true, { algorithm: 'HS256' })
        @current_user = User.find(decoded_token[0]['user_id'])
      rescue JWT::DecodeError
        halt 401, { message: 'Invalid token' }.to_json
      rescue ActiveRecord::RecordNotFound
        halt 404, { message: 'User not found' }.to_json
      end
    end
  end

  # ...
end


require_relative "./config/environment"

require 'rack/cors'

use Rack::Cors do
  allow do
    origins 'http://localhost:3000' # Update with your client's origin URL
    resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end


use AdoptionsController
use PetsController
use UsersController

run ApplicationController
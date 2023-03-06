class User <ActiveRecord::Base
    has_secure_password
    has_many :pets, dependent: :destroy
    has_many :adoptions, dependent: :destroy
end
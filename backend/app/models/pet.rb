class Pet <ActiveRecord::Base
    belongs_to :user
    has_many :adoptions, dependent: :destroy
end
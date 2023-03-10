class User < ApplicationRecord
  has_one :user_profile
  has_many :favourites
  validates :email, uniqueness: :true, presence: :true
  validates :password, length: { in: 6..16, message: "must be between 6 and 16 characters" }, presence: :true
  devise :database_authenticatable
end

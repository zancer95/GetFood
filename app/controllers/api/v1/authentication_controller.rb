class Api::V1::AuthenticationController < ApplicationController
 def sign_up
  # create a new user object with parameters passed from the client
  user = User.new(user_params)
  # attempt to save the new user object to the database
  if user.save
    # return a success message with the user's id
    render json: { user_id: user.id, message: "User sign up successful" }
  else
    # return an error message with full error messages from the user object
    render json: { error: user.errors.full_messages }
  end
  # catch any exceptions thrown during the execution of the method and return an error message
  rescue StandardError => e
    render json: { error: e.message }
end


    def sign_in
  # find the user object in the database with the email parameter passed from the client
  user = User.find_by(email: params[:email])
  if user && user.valid_password?(params[:password])
    # if the user exists and the password is valid, encode a JWT token with the user's id
    token = JWT.encode({ user_id: user.id }, ENV['JWT_SECRET_KEY'], 'HS256')
    # return a success message with the token and user's id
    render json: { token: token, user_id: user.id, message: "User sign in successful" }
  elsif user
    # if the user exists but the password is invalid, return an error message with unauthorized status
    render json: { errors: ["Invalid password"] }, status: :unauthorized
  else
    # if the user does not exist, return an error message with unauthorized status
    render json: { errors: ["Invalid email address"] }, status: :unauthorized
  end
end



    private

    def user_params
      params.permit(:email, :password)
    end
end
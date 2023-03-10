class Api::V1::ProfilesController < ApplicationController
 # Creates a new user profile record in the database with the given parameters.
# If the record is saved successfully, returns a JSON response with the created user profile
# and a 201 Created status code. If there are any validation errors, returns a JSON response
# with the error messages and a 422 Unprocessable Entity status code.
def create
  @user_profile = UserProfile.new(user_profile_params)
  if @user_profile.save
    render json: { user_profile: @user_profile }, status: :created
  else
    render json: { error: @user_profile.errors.full_messages }, status: :unprocessable_entity
  end
end

# Finds the user profile record in the database with the given user ID parameter.
# If the user profile is found, returns a JSON response with the user profile and a 200 OK
# status code. If the user profile is not found, returns a JSON response with an error message
# and a 404 Not Found status code.
def show
  @user_profile = UserProfile.find_by(user_id: params[:id])
  if @user_profile
    render json: { user_profile: @user_profile }, status: :ok
  else
    render json: { error: "User profile not found" }, status: :not_found
  end
end

# Updates an existing user profile record in the database with the given parameters.
# Finds the user profile record in the database with the given user ID parameter and updates
# its attributes with the given parameters. If the update is successful, returns a JSON
# response with the updated user profile and a 200 OK status code. If there are any validation
# errors, returns a JSON response with the error messages and a 422 Unprocessable Entity
# status code.
def update
  user_profile = UserProfile.find_by(user_id: params[:id])
  param = params["user_profile"]
  user_profile.update(first_name: param[:first_name],
                      last_name: param[:last_name],
                      date_of_birth: param[:date_of_birth],
                      bio: param[:bio],
                      user_id: param[:user_id])
  if user_profile.update(user_profile_params)
    render json: { user_profile: user_profile }, status: :ok
  else
    render json: { error: user_profile.errors.full_messages }, status: :unprocessable_entity
  end
end


  private

  def user_profile_params
    params.permit(:first_name, :last_name, :date_of_birth, :bio, :location, :user_id)
  end
end

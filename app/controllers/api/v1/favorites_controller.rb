class Api::V1::FavoritesController < ApplicationController
  def show
    user = User.find_by_id(params['id'].to_i) # finding the user with the given id
    favourites = user.favourites # retrieving all favourites for that user
    render json: { favourites: favourites } # returning a JSON response with the user's favourites
  end

  def create
    current_user = User.find_by_id(params['current_user']) # finding the user who is creating the favourite
    favourite = current_user.favourites.build(favourite_params) # building a new favourite object for the current user
    if favourite.save # attempting to save the new favourite object to the database
      render json: { status: 'success', favourite: favourite } # returning a success message and the saved favourite object
    else
      render json: { status: 'error', errors: favourite.errors.full_messages } # returning an error message with any validation errors
    end
  end

  def destroy
    current_user = User.find_by_id(params["current_user"]) # finding the user who wants to delete the favourite
    favorite = current_user.favourites.find_by(id: params[:id]) # finding the favourite with the given id that belongs to the current user
    if favorite
      favorite.destroy # deleting the favourite from the database
      render json: { status: 'success' } # returning a success message
    else
      render json: { status: 'error', error: 'Favorite not found' } # returning an error message if the favourite was not found
    end
  end


  private

  def favourite_params
    params.permit( :name, :display_phone, :rating, :address, :img_url, :location_url)
  end
end


  


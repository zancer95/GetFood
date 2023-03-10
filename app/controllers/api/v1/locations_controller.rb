require "uri"
require "net/http"

class Api::V1::LocationsController < ApplicationController

  # API endpoint to retrieve nearby restaurant locations using Google Maps Places API
  def location    
    latitude = params[:latitude].to_f
    longitude = params[:longitude].to_f

    # Build the URL for the Google Maps Places API request using latitude and longitude parameters
    url = URI("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{latitude},#{longitude}&radius=5000&type=restaurant&key=AIzaSyA4DWR7K5Z6E1XC2iVy6Zkk6T3t--iLbX8")

    # Create a new HTTPS connection to the API endpoint
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    # Create a new GET request with the specified URL
    request = Net::HTTP::Get.new(url)

    # Send the request to the API and store the response
    response = https.request(request)

    # If the response is successful (HTTP status code 200), parse the response body and return location data in JSON format
    if response.code == "200"
      data = JSON.parse(response.body)
      render json: { data: data['results'], message: "Successful" }
    else
      # If the response is not successful, return an error message in JSON format
      render json: { error: "Oops" }
    end
  end

  # API endpoint to retrieve the photo URL of a specific location using Google Maps Places API
  def image_src
    # Build the URL for the Google Maps Places API request using the provided photo reference ID parameter
    url = URI("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=#{params["image_reference"]}&key=AIzaSyA4DWR7K5Z6E1XC2iVy6Zkk6T3t--iLbX8")

    # Create a new HTTPS connection to the API endpoint
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    # Create a new GET request with the specified URL
    request = Net::HTTP::Get.new(url)

    # Send the request to the API and store the response
    response = https.request(request)
    
    # If the response is successful (HTTP status code 200), extract the photo URL from the response headers and return it in JSON format
    if response.code == "200" || response.code == '302'
      photo_url = response['location']
      render json: { image_src: photo_url, message: "Successful" }
    else
      render json: {}
    end
  end
end

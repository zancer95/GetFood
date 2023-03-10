GetFood
GetFood is a web application that helps users find and save their favorite restaurants on a map.

Features
The GetFood application includes the following features:

Login and logout authentication: Users can create an account, login, and logout.

Map display: A map is displayed using the Google Maps API.

Restaurant markers: Restaurant markers are displayed on the map, indicating the location of each restaurant.

Favorite button: Logged in users can add a restaurant to their list of favorites by clicking a button.

View button: Users can click a view button to open a new tab displaying the restaurant on Google Maps.

Installation
To install GetFood, follow these steps:

Clone this repository to your local machine.
Install the required dependencies by running npm install in the project directory.
Create a .env file in the project directory and add your Google Maps API key and database connection string. Example:
makefile
Copy code
GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
DATABASE_URL=YOUR_DATABASE_URL_HERE
Start the application by running npm start in the project directory.

Usage
To use GetFood, follow these steps:

Open a web browser and navigate to http://localhost:3000.
Create an account or login if you already have an account.
Use the map to find restaurants near you.
Click on a restaurant marker to view more information about the restaurant.
Click the favorite button to add the restaurant to your list of favorites.
Click the view button to open a new tab displaying the restaurant on Google Maps.

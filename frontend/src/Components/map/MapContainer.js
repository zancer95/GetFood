import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import Modal from "react-modal";
import LocationDetails from "./LocationDetails";
const API_URL = "http://127.0.0.1:3000/api/v1/locations/location";
const MAP_KEY = "AIzaSyA4DWR7K5Z6E1XC2iVy6Zkk6T3t--iLbX8";
export default function MapContainer() {
    // Defining the state variables
    const [foodLocations, setFoodLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [error, setError] = useState(false);
    const [userPosition, setUserPosition] = useState(null);

    // Function to fetch food locations based on the user's current location
    const fetchFoodLocations = async (latitude, longitude) => {
        try {
            const response = await axios.get(API_URL, {
                params: { latitude, longitude },
            });
            const { data } = response.data;
            setFoodLocations(data); // Setting the foodLocations state variable
            setError(null); // Resetting the error state variable
        } catch (error) {
            setError("Failed to fetch locations."); // Setting the error state variable if there's an error fetching locations
        }
    };

    // Using useEffect to get the user's current location
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }); // Setting the userPosition state variable
                },
                (error) => {
                    setError("Please allow location access to see nearby food locations."); // Setting the error state variable if there's an error getting the user's location
                }
            );
        } else {
            setError("Geolocation is not supported by your browser."); // Setting the error state variable if geolocation is not supported by the browser
        }
    }, []);


    // Using useEffect to fetch food locations based on the user's current location
    useEffect(() => {
        if (userPosition) {
            fetchFoodLocations(userPosition.lat, userPosition.lng);
        }
    }, [userPosition]);

    const defaultCenter = {
        lat: userPosition?.lat,
        lng: userPosition?.lng,
    };

    // Function to handle when a location marker is clicked
    const handleLocationClick = (location) => {
        setSelectedLocation(location); // Setting the selectedLocation state variable
    };

    // Function to handle when the modal is closed
    const handleModalClose = () => {
        setSelectedLocation(null); // Resetting the selectedLocation state variable
    };

    return (
        <div className="w-full relative map_container">
            { error && <div className="text-red-500 mt-2">{ error }</div> }
            { !error && (
                <GoogleMapReact
                    bootstrapURLKeys={ { key: MAP_KEY } }
                    center={ defaultCenter }
                    defaultZoom={ 12 }
                >
                    { foodLocations.map((location) => (
                        <div
                            key={ location.place_id }
                            lat={ location.geometry.location.lat }
                            lng={ location.geometry.location.lng }
                            onClick={ () => handleLocationClick(location) }
                            className="flex items-center justify-center cursor-pointer"
                        >
                            <img
                                src="foody.png"
                                alt={ location.name }
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    )) }
                </GoogleMapReact>
            ) }
            { selectedLocation && (
                <Modal
                    isOpen={ true }
                    style={ {
                        overlay: {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        },
                        content: {
                            width: "500px",
                            height: "600px",
                            margin: "auto",
                            borderRadius: "0.5rem",
                            backgroundColor: "#FFF",
                            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
                            overflowY: "hidden",
                            fontFamily: "Roboto, sans-serif",
                        },
                    } }
                    onRequestClose={ handleModalClose }
                    className="bg-opacity-75 absolute inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0"
                >
                    <button onClick={ handleModalClose } className="close-button absolute top-0 right-0 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#fff" d="M18.1 5.9c-.8-.8-2-.8-2.8 0L12 9.2 8.7 5.9c-.8-.8-2-.8-2.8 0-.8.8-.8 2 0 2.8l3.3 3.3-3.3 3.3c-.8.8-.8 2 0 2.8.8.8 2 .8 2.8 0l3.3-3.3 3.3 3.3c.8.8 2 .8 2.8 0 .8-.8.8-2 0-2.8l-3.3-3.3 3.3-3.3c.7-.8.7-2 0-2.8z" />
                        </svg>
                    </button>
                    <div className="showDetails">
                        <LocationDetails location={ selectedLocation } onClose={ handleModalClose } />
                    </div>
                </Modal>
            ) }
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LocationDetails({ location, onClose }) {
    const [isFavorited, setIsFavorited] = useState(false);
    const current_user = localStorage.getItem('current_user')
    const [photoUrl, setPhotoUrl] = useState("");

    console.log(location);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/locations/image?image_reference=${location.photos[0].photo_reference}`);
                const data = await response.json();
                console.log(data, '<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                setPhotoUrl(data.image_src);
            } catch (error) {
                console.error(error);
            }
        };
        fetchImage();
    }, []);


    const addToFavorites = () => {
        const data = {
            current_user: current_user,
            name: location.name,
            img_url: photoUrl,
            rating: location.rating,
            location_url: `https://www.google.com/maps/search/?api=1&query=${location.geometry.location.lat},${location.geometry.location.lng}`,
            address: location.vicinity
        }

        axios.post('http://localhost:3000/api/v1/favorites', data)
            .then(response => {
                setIsFavorited(true);
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="p-6">
            <button
                onClick={ onClose }
                className="absolute top-0 right-0 p-4 text-gray-700 hover:text-gray-900"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#000" d="M18.1 5.9c-.8-.8-2-.8-2.8 0L12 9.2 8.7 5.9c-.8-.8-2-.8-2.8 0-.8.8-.8 2 0 2.8l3.3 3.3-3.3 3.3c-.8.8-.8 2 0 2.8.8.8 2 .8 2.8 0l3.3-3.3 3.3 3.3c.8.8 2 .8 2.8 0 .8-.8.8-2 0-2.8l-3.3-3.3 3.3-3.3c.7-.8.7-2 0-2.8z" />
                </svg>
            </button>
            <div className="flex flex-col justify-center items-center mb-6">
                <img
                    src={ photoUrl || "food_API.jpg" }
                    alt={ location.name }
                    className="w-96 h-64 object-cover object-center rounded-md mb-4"
                />
                <h2 className="text-2xl font-medium mb-2">{ location.name }</h2>
                { location.opening_hours && (
                    <span className='text-lg text-gray-700'>Open now: { location.opening_hours.open_now ? "Yes" : "No" }</span>
                ) }
                <div className="flex items-center justify-center mt-4">
                    <span className="text-yellow-500 font-medium">{ location.rating }</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-500 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={ 2 }
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            </div>
            <p className="text-lg text-gray-700 mb-4">{ location.vicinity }</p>
            <div className="flex justify-between gap-2">
                { !isFavorited &&
                    <button
                        onClick={ addToFavorites }
                        className="bg-pink-600 hover:bg-pink-700 py-2 px-4 rounded mb-4 text-white"
                    >
                        Add to favorites
                    </button>
                }
                <a
                    href={ `https://www.google.com/maps/search/?api=1&query=${location.geometry.location.lat},${location.geometry.location.lng}` }
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded mb-4 text-white"
                >
                    Visit
                </a>
            </div>
        </div>
    );
}


export default LocationDetails
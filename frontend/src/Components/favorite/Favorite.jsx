import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Favourite() {
    const [favourites, setFavourites] = useState([]);

    const current_user = localStorage.getItem('current_user')
    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/favorites/${current_user}`);
                setFavourites(response.data.favourites);
                console.log(response.data.favourites);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavourites();
    }, []);

    const deleteFavourit = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/favorites/${id}`, { data: { current_user } });
            setFavourites(favourites.filter((favourite) => favourite.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 text-gray-700 font-serif">
            <h1 className="text-center py-4 text-2xl font-bold">Favourite Food Locations</h1>
            <div className="grid grid-cols-1 gap-6 mx-auto mt-8 md:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-xl">
                { favourites.map((favourite) => (
                    <div key={ favourite.id } className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                        <img className="w-full h-48 object-cover object-center rounded-md mb-4" src={ favourite.img_url } alt={ favourite.name } />
                        <h2 className="text-lg font-semibold mb-2">{ favourite.name }</h2>
                        <div className="mb-4 text-gray-600 text-sm">{ favourite.address }</div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-yellow-500 font-medium">{ favourite.rating }</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <a href={ favourite.location_url } target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                                View on Google Maps
                            </a>
                        </div>
                        <button onClick={ () => deleteFavourit(favourite.id) } className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow mt-4">
                            Delete
                        </button>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default Favourite;

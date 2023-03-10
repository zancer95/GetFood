// import React, { useState, useEffect } from 'react';
// import { FaEdit } from 'react-icons/fa';

// import axios from 'axios';

// export default function Profile() {
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         async function fetchUserProfile() {
//             try {
//                 const response = await axios.get(`http://localhost:3000/api/v1/profiles/${localStorage.getItem('current_user')}`);
//                 console.log(response.data)
//                 setUserData(response.data.user_profile);
//             } catch (error) {
//                 console.error(error);
//             }
//         }

//         fetchUserProfile();
//     }, []);

//     if (!userData) {
//         return <div>Loading user profile...</div>;
//     }

//     return (
//         <div className='bg-gray-100 w-screen absolute overflow-hidden height_over'>
//             <div className="w-96 container mx-auto my-24 px-4 bg-white shadow-md rounded-lg font-serif">
//                 <div className="flex items-center justify-end">
//                     <FaEdit
//                         size={ 18 }
//                         className="cursor-pointer text-red-500 hover:text-green-300 cursor-pointer"
//                     />
//                 </div>
//                 <div className="p-8 cursor-text">
//                     <h1 className="text-4xl font-bold text-green-600 hover:text-green-300 mt-4 mb-2 text-center">
//                         { userData.first_name } { userData.last_name }
//                     </h1>
//                     <p className="text-gray-600 text-center">Location: { userData.location }</p>
//                     <hr className="my-8" />
//                     <div className="w-full">
//                         <h2 className="text-xl font-semibold mb-4 text-green-600">About Me</h2>
//                         <p className="text-gray-600 mb-2">{ userData.bio }</p>
//                         <p className="text-gray-600">Date of birth: { userData.date_of_birth }</p>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }




import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

import axios from 'axios';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState(null);

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/profiles/${localStorage.getItem('current_user')}`);
                console.log(response.data)
                setUserData(response.data.user_profile);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setUpdatedUserData({ ...userData });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setUpdatedUserData(null);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/profiles/${localStorage.getItem('current_user')}`, { user_profile: updatedUserData });
            setUserData(response.data.user_profile);
            setIsEditing(false);
            setUpdatedUserData(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    };

    if (!userData) {
        return <div>Loading user profile...</div>;
    }

    if (isEditing) {
        return (
            <div className="bg-gray-100 flex height_over shadow-md rounded-lg font-serif p-8 cursor-text items-center justify-center text-gray-700">
                <form className="grid grid-cols-1 gap-6 bg-white rounded shadow-lg p-6 mt-4 w-96">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" name="first_name" id="first_name" className="mt-1 focus:ring-green-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={ updatedUserData.first_name } onChange={ handleInputChange } />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" name="last_name" id="last_name" className="mt-1 focus:ring-green-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={ updatedUserData.last_name } onChange={ handleInputChange } />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" name="location" id="location" className="mt-1 focus:ring-green-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={ updatedUserData.location } onChange={ handleInputChange } />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea name="bio" id="bio" className="mt-1 focus:ring-green-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={ updatedUserData.bio } onChange={ handleInputChange }></textarea>
                    </div>
                    <div>
                        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input type="date" name="date_of_birth" id="date_of_birth" className="mt-1 focus:ring-green-500 focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" value={ updatedUserData.date_of_birth } onChange={ handleInputChange } />
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button onClick={ handleSaveClick } type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Save
                            </button>
                            <button onClick={ handleCancelClick } type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        );
    }

    return (
        <div className='bg-gray-100 flex height_over shadow-md rounded-lg font-serif p-8 cursor-text items-center justify-center text-gray-700'>
            <div className="w-96 container mx-auto my-24 px-4 bg-white shadow-md rounded-lg font-serif">
                <div className="flex items-center justify-end pt-2">
                    <FaEdit
                        size={ 18 }
                        onClick={ handleEditClick }
                        className="cursor-pointer text-red-400 hover:text-red-600 cursor-pointer"
                    />
                </div>
                <div className="p-8 cursor-text">
                    <h1 className="text-4xl font-bold text-green-600 hover:text-green-300 mt-4 mb-2 text-center">
                        { userData.first_name } { userData.last_name }
                    </h1>
                    <p className="text-gray-600 text-center">Location: { userData.location }</p>
                    <hr className="my-8" />
                    <div className="w-full">
                        <h2 className="text-xl font-semibold mb-4 text-green-600">About Me</h2>
                        <p className="text-gray-600 mb-2">{ userData.bio }</p>
                        <p className="text-gray-600">Date of birth: { userData.date_of_birth }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

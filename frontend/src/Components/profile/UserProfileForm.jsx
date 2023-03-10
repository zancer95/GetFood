import React, { useState } from 'react';
import axios from 'axios';

function UserProfileForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/profiles', {
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                bio,
                location,
                user_id: localStorage.getItem('profile_id')
            });
            window.location.href = '/signIn';
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setError(error.response.data.error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen text-gray-700">
            <h1 className="font-bold text-3xl mb-4 text-green-600">Profile</h1>
            <h5 className="text-gray-500">Make Profile :)</h5>
            <form onSubmit={ handleSubmit } className="flex flex-col bg-white rounded shadow-lg p-6 mt-4 w-96">
                { error && <div>{ error }</div> }
                <label className="font-semibold text-xs" htmlFor="firstNameField">First Name</label>
                <input
                    className="flex items-center h-12 px-4 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                    type="text"
                    value={ firstName }
                    onChange={ (e) => setFirstName(e.target.value) }
                    required
                />

                <label className="font-semibold text-xs mt-3" htmlFor="lastNameField">Last Name</label>
                <input
                    className="flex items-center h-12 px-4 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                    type="text"
                    value={ lastName }
                    onChange={ (e) => setLastName(e.target.value) }
                    required
                />

                <label className="font-semibold text-xs mt-3" htmlFor="dateOfBirthField">Date of Birth</label>
                <input
                    className="flex items-center h-12 px-4 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                    type="date"
                    value={ dateOfBirth }
                    onChange={ (e) => setDateOfBirth(e.target.value) }
                    required
                />

                <label className="font-semibold text-xs mt-3" htmlFor="bioField">Bio</label>
                <textarea
                    className="flex items-center h-32 px-4 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                    value={ bio }
                    onChange={ (e) => setBio(e.target.value) }
                    required
                />

                <label className="font-semibold text-xs mt-3" htmlFor="locationField">Location</label>
                <input
                    className="flex items-center h-12 px-4 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
                    type="text"
                    value={ location }
                    onChange={ (e) => setLocation(e.target.value) }
                    required
                />
                <button
                    type="submit"
                    className="flex items-center justify-center h-12 px-6 bg-green-600 mt-8 rounded font-semibold text-sm text-green-100 hover:bg-green-700"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default UserProfileForm;

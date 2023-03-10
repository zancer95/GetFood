import React, { useState } from 'react';
import axios from 'axios';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    if (localStorage.getItem('token')) {
        window.location.href = '/';
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/authentication/sign_in',
                {
                    email,
                    password,
                }
            );
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('current_user', response.data.user_id);
            console.log(response.data);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
            setError(error.response.data.errors.join(', '));
        }
    };


    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center w-screen h-screen text-gray-700">
            <h1 className="font-bold text-3xl mb-4 text-green-600">Sign In</h1>
            <h5 className="text-gray-500">Welcome Foody APP :)</h5>
            <form onSubmit={ handleSubmit } className="flex flex-col bg-white rounded-lg shadow-lg p-12 mt-12">

                <label className="font-semibold text-sm text-green-600" htmlFor="usernameField">Email</label>
                <input
                    className="flex items-center h-12 px-4 w-full bg-green-100 mt-2 rounded-md border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                    type="email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    required
                />
                <label className="font-semibold text-sm mt-3 text-green-600" htmlFor="passwordField">Password</label>
                <input
                    className="flex items-center h-12 px-4 w-full bg-green-100 mt-2 rounded-md border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-600"
                    type="password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    required
                />
                { error && <div className="text-red-500 mt-2">{ error }</div> }
                <button type="submit"
                    className="flex items-center justify-center h-12 px-6 w-full bg-green-600 mt-8 rounded-md font-semibold text-sm text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600">Sign In
                </button>
            </form>
        </div>
    );
}

export default SignIn;

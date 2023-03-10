import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);

  if (localStorage.getItem('token')) {
    window.location.href = '/';
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/authentication/sign_up',
        { email, password }
      );
      if (response.data.error) {
        console.log(response.data.error);
        setError(response.data.error);

      }
      else {
        localStorage.setItem('profile_id', response.data.user_id);
        window.location.href = '/NewProfile';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center w-screen h-screen text-gray-700">
      <>
        <h1 className="font-bold text-2xl">Sign Up</h1>
        <h5 className="text-red">Welcome Foody APP :)</h5>
        <form
          onSubmit={ (e) => handleSubmit(e) }
          className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        >
          <label className="font-semibold text-xs text-green-600" htmlFor="usernameField">
            Email
          </label>
          <input
            className="flex items-center h-12 px-4 w-64 bg-green-100 mt-2 rounded focus:outline-none focus:ring-2"
            type="email"
            value={ email }
            required
            onChange={ (e) => setEmail(e.target.value) }
          />
          <label className="font-semibold text-xs mt-3 text-green-600" htmlFor="passwordField">
            Password
          </label>
          <input
            className="flex items-center h-12 px-4 w-64 bg-green-100 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
            value={ password }
            required
            onChange={ (e) => setPassword(e.target.value) }
          />
          { error.map(er => (
            <div className="text-red-500 mt-2" key={ er }>{ er }</div>
          )) }
          <button
            type="submit"
            className="flex items-center justify-center h-12 px-6 w-64 bg-green-600 mt-8 rounded font-semibold text-sm text-green-100 hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
      </>
    </div>
  );
}

export default SignUp;

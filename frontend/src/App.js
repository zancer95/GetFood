import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import './app.css'
import SignIn from "./Components/auth/SignIn";
import SignUp from "./Components/auth/SignUp";
import Favourite from "./Components/favorite/Favorite";
import Profile from "./Components/profile/Profile"
import MapContainer from "./Components/map/MapContainer"
import UserProfileForm from "./Components/profile/UserProfileForm";

function App() {
  const tokenValue = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('long');
    localStorage.removeItem('lati');
    localStorage.removeItem('current_user');
    window.location.href = '/signin';
  }

  return (
    <div>
      <Router>
        <header className="bg-white py-4 shadow-sm sticky top-0 z-50 font-serif">
          <div className="mx-auto flex items-center justify-between px-8">
            <h1 className="text-3xl font-bold text-green-600">
              <NavLink to="/">
                FOODY
              </NavLink>
            </h1>
            <nav className='nav'>
              <ul className="flex space-x-4 justify-end">
                { tokenValue ?
                  <>
                    <li>
                      <NavLink
                        to="/profile"                       
                        className={({ isActive }) =>
                          isActive ? "font-bold" : 'text-black hover:text-green-600 hover:underline'
                        }
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                          to="/favourite" 
                          className={({ isActive }) =>
                          isActive ? "font-bold" : 'text-black hover:text-green-600 hover:underline'
                        }
                      >
                        Favorite List
                      </NavLink>
                    </li>
                    <li onClick={ handleLogout } className="cursor-pointer text-red-400 hover:text-red-600 hover:underline font-bold">Sign out</li>
                  </> :
                  <>
                    <li>
                      <NavLink 
                          to="/signIn" 
                         className={({ isActive }) =>
                         isActive ? "font-bold" : 'text-black hover:text-green-600 hover:underline'
                       }
                      >
                        Sign in
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                         to="/signUp"
                         className={({ isActive }) =>
                          isActive ? "font-bold" : 'text-black hover:text-green-600 hover:underline'
                        }
                         >
                        Sign up
                      </NavLink>
                    </li>
                  </>
                }
              </ul>
            </nav>
          </div>
        </header>


        <main className="flex-grow">
          <Routes>
            <Route exact path="/" element={ <MapContainer /> } />
            <Route exact path="/profile" element={ <Profile /> } />
            <Route exact path="/favourite" element={ <Favourite /> } />
            <Route exact path="/signIn" element={ <SignIn /> } />
            <Route exact path="/signUp" element={ <SignUp /> } />
            <Route exact path="/NewProfile" element={ <UserProfileForm /> } />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

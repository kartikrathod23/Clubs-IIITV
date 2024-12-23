import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg';
import authService from '../appwrite/config';

const ClubNavbar = ({ club }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setIsLoggedIn(true);
          const userEmail = user.email;
          const userDetails = await authService.getProfile({ userEmail });
          if (userDetails) {
            setClub(userDetails.club);
          }
        }
      } catch (e) {
        console.log("No active session.");
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.log('Error during logout:', error.message);
    }
  };

  return (
    <div className="flex flex-col">
      <nav className="p-3 bg-gradient-to-r from-fuchsia-900 shadow-lg to-gray-700 text-white flex justify-between items-center">
        {/* Home Section */}
        <Link to="/" className="flex items-center">
          <FontAwesomeIcon icon={faHome} className="h-5 text-lg" />
          <span className="hidden md:inline ml-2 font-bold">Home</span>
        </Link>

        {/* Club Name */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Club Logo"
            className="hidden md:inline w-14 h-12 rounded-full m-1 mr-0"
          />
          <Link
            to="/dashboard"
            className="text-transparent bg-clip-text bg-opacity-100 bg-gradient-to-r from-pink-600 to-blue-500 font-extrabold font-serif text-xl md:text-4xl"
          >
            {club} Fam
          </Link>
        </div>

        {/* Actions: Profile and Logout */}
        <div className="flex items-center space-x-4">
          {/* Profile */}
          <NavLink
            to="/profile"
            className="text-purple-400 border-purple-600 border-2 hover:text-pink-400 font-semibold rounded-3xl hover:border-pink-500 text-md px-4 lg:px-9 py-1 lg:py-1.5 mr-2 hidden md:flex"
          >
            <FontAwesomeIcon icon={faUser} size="lg" className="mr-1" />
            Profile
          </NavLink>
          {/* Profile Icon for <md */}
          <NavLink
            to="/profile"
            className="text-purple-400 md:hidden"
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:text-purple-600 hover:border-2 hover:border-purple-500 hover:bg-none font-medium rounded-3xl text-md px-4 lg:px-5 py-1 lg:py-1.5 mr-2 hidden md:flex"
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-1" />
            LogOut
          </button>
          {/* Logout Icon for <md */}
          <button
            onClick={handleLogout}
            className="text-white md:hidden"
          >
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          </button>
        </div>
      </nav>

      {/* Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-2xl shadow-pink-500 -mt-2 md:-mt-4 rounded-full"></div>
    </div>
  );
};

export default ClubNavbar;

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../appwrite/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.jpg';

const Header = () => {
  const [club, setClub] = useState();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="p-4 bg-gradient-to-r from-fuchsia-900 shadow-lg to-gray-700 text-white overflow-x-hidden">
      <ul className="flex justify-between items-center">
   
        <div className="hidden md:flex md:space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-pink-500 font-semibold " : "text-white font-semibold hover:text-pink-500 text-md hover:translate-x-1.5"
              }
            >
              <div>
                <FontAwesomeIcon icon={faHome} className='mr-1 mb-0.5 h-4 ' />
                Home
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clubs"
              className={({ isActive }) =>
                isActive ? " text-md text-pink-500 font-semibold" : "text-white font-semibold hover:text-pink-500 hover:translate-x-1.5"
              }
            >
              Clubs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/committees"
              className={({ isActive }) =>
                isActive ? "text-md text-pink-500 font-semibold" : "text-white font-semibold hover:text-pink-500 hover:translate-x-1.5"
              }
            >
              Committees
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? "text-md text-pink-500 font-semibold" : "text-white font-semibold hover:text-pink-500 hover:translate-x-1.5"
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-md text-pink-500 font-semibold" : "text-white font-semibold  hover:text-pink-500 hover:translate-x-1.5 "
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-md text-pink-500 font-semibold" : "text-white font-semibold hover:text-pink-500 hover:translate-x-1.5"
              }
            >
              Contact
            </NavLink>
          </li>
        </div>

        {/* Hamburger menu for width < md */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-lg"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {menuOpen && (
            <div>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setMenuOpen(false)} 
              ></div>

              {/* Sliding Fullscreen Menu */}
              <div
                className={`fixed top-0 left-0 h-full w-full bg-gradient-to-br from-fuchsia-800 to-purple-500 z-50 flex flex-col items-center justify-center transform transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                  }`}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
                  onClick={() => setMenuOpen(false)}
                >
                  &times;
                </button>

                <ul className="flex flex-col space-y-8 text-center text-white text-2xl">
                  <li>
                    <NavLink
                      to="/"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-pink-500 font-semibold"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/clubs"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-pink-500 font-semibold"
                    >
                      Clubs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/committees"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-pink-500 font-semibold"
                    >
                      Committees
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/events"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-pink-500 font-semibold"
                    >
                      Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-pink-500 font-semibold"
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-pink-500 font-semibold"
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Right side login/logout button */}
        <div className="flex items-center">
          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className=" md:block text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:text-pink-400 font-semibold rounded-3xl text-md px-4 lg:px-10 py-1 lg:py-1.5 mr-2"
              >
                Log in
              </NavLink>
              <NavLink
                to="/signup"
                className=" md:block text-purple-400 border-purple-600 border-2 hover:text-pink-400 font-semibold rounded-3xl hover:border-pink-500 text-md px-4 lg:px-9 py-1 lg:py-1.5 mr-2 "
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-1">
              {/* Profile Icon */}
              <NavLink
                to="/profile"
                className="text-purple-400 border-purple-600 border-2 hover:text-pink-400 font-semibold rounded-3xl hover:border-pink-500 text-md px-4 lg:px-9 py-1 lg:py-1.5 mr-2 md:flex hidden"
              >
                <FontAwesomeIcon icon={faUser} size="lg" className="mr-1" />
                Profile
              </NavLink>
              <NavLink
                to="/profile"
                className="md:hidden text-purple-400 hover:text-pink-400"
              >
                <FontAwesomeIcon icon={faUser} size="lg" />
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:text-purple-600 hover:border-2 hover:border-purple-500 hover:bg-none font-medium rounded-3xl text-md px-4 lg:px-5 py-1 lg:py-1.5 mr-2 md:flex hidden"
              >
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-1" />
                LogOut
              </button>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="md:hidden text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:text-purple-600 rounded-full p-2"
              >
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              </button>
            </div>
          )}
        </div>
      </ul>
      <div className="w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-2xl shadow-pink-500 mt-1 rounded-full"></div>
    </nav>
  );
};

export default Header;

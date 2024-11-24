import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/config';
import bg1 from '../images/bg1.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [club, setClub] = useState("");
    const [error, setError] = useState("");

    const loginHandle = async (e) => {
        e.preventDefault();
        // await authService.logout();
        if (email === '' || password === '') {
            return alert("Invalid Credentials")
        }
        try {
            const userData = { email, password }
            // const data = await authService.login(userData);
            const profile = await authService.getProfile({ userEmail: email });
            if (profile) {
                const userClub = profile.club;
                if (userClub === club) {
                    const data = await authService.login(userData);
                    navigate('/dashboard')
                }
                else {
                    setError("You are not part of the  " + club + " club");
                    console.log(error);
                }
            }

            // console.log(data);

        } catch (e) {
            throw e
        }
    }

    return (
        <>
            <Header />
            <div className="w-full h-screen flex items-center justify-center -mt-1 bg-gradient-to-r from-fuchsia-990 to-gray-400">
                <div className="md:w-2/4 w-full m-10 -mt-20 md:mt-0 bg-gray-400 rounded-lg shadow-xl p-6">
                    <h2 className="text-center font-bold text-2xl text-black mb-4">Log In</h2>
                    {error && <p className="text-red-500 text-lg text-center mb-1">{error}</p>}
                    <form className="flex flex-col gap-4" onSubmit={loginHandle}>
                        <div>
                            <label htmlFor="email" className="text-lg font-bold">Institute Email ID</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter institute email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-2 w-full mt-1 bg-blue-100 border-2 border-blue-950 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="club" className="text-lg font-bold">Your Club</label>
                            <select
                                id="club"
                                name="club"
                                value={club}
                                onChange={(e) => setClub(e.target.value)}
                                className="p-2 w-full mt-1 bg-blue-100 border-2 border-blue-950 rounded-md"
                                required
                            >
                                <option value="">Select a club</option>
                                <option value="Mod5">Mod5</option>
                                <option value="Encore">Encore</option>
                                <option value="Coding_Club">Coding_Club</option>
                                <option value="Pensieve">Pensieve</option>
                                <option value="9Bit">9Bit</option>
                                <option value="Shades">Shades</option>
                                <option value="FnC">FnC</option>
                                <option value="Editorial_Club">Editorial_Club</option>
                                <option value="Masquerade">Masquerade</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-lg font-bold">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-2 w-full mt-1 bg-blue-100 border-2 border-blue-950 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 hover:bg-red-200 bg-gradient-to-r from-pink-700 to-purple-700 text-white font-bold rounded-md transition duration-300"
                        >
                            Log In
                        </button>
                        <p className='text-center text-lg '>Haven't Registered Yet?</p>
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="w-full py-2 mt-0 bg-gradient-to-r from-pink-700 to-purple-700 text-white font-bold rounded-md hover:bg-pink-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Login;

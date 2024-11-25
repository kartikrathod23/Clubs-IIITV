import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/config';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [club, setClub] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            if (username === "" || email === "" || password === "" || club === "") {
                setError('Please enter valid credentials.');
                return;
            }
            const userData = { email, password, name: username, club };
            const data = await authService.createAccount(userData);
            console.log(data);
            setSuccess('Account created successfully!');
            
            navigate('/dashboard');
        } catch (e) {
            setError(`Signup error: ${e.message}`);
        }
    }

    return (
        <>
        <Header/>
        <div className="w-full mt-28 sm:mt-0 h-screen flex items-center justify-center bg-gradient-to-r from-fuchsia-990 to-gray-400">
            <div className="md:w-2/4 w-full m-10 -mt-20 md:mt-4 p-6 bg-gray-400 rounded-md shadow-xl">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <p className="text-center font-bold text-2xl text-black">JOIN US</p>

                    {/* Display error message if there is any */}
                    {error && <p className="text-red-500 text-center mb-1">{error}</p>}

                    {/* Display success message if account creation is successful */}
                    {success && <p className="text-green-500 text-center mb-1">{success}</p>}

                    {/* Username Field */}
                    <div>
                        <label htmlFor="username" className="text-lg font-bold">Your name</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2 w-full mt-1 bg-blue-100 border-2 border-blue-950 rounded-md"
                            required
                        />
                    </div>

                    {/* Institute Email Field */}
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

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="text-lg font-bold">Set Password</label>
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

                    {/* Club Selection Dropdown */}
                    <div>
                        <label htmlFor="club" className="text-lg font-bold">Select a Club (You wanna part to be...)</label>
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
                        <label htmlFor="audition" className='text-lg font-bold block'>Any Photos/Videos to present your skills for corresponding club</label>
                        <input
                            id='audition'
                            name="audition"
                            type='file'
                            className='pt-2 '
                            required

                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-gradient-to-r from-pink-700 to-purple-700 text-white font-bold rounded-md hover:bg-pink-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className='text-center mt-1.5'>Already a member?</p>
                <button
                    type="submit"
                    onClick={() => navigate('/login')}
                    className="w-full py-2 mt-4 bg-gradient-to-r from-pink-700 to-purple-700 text-white font-bold rounded-md hover:bg-pink-600 transition duration-300"
                >
                    Log in
                </button>
            </div>
        </div>
        </>
    );
}

export default Signup;

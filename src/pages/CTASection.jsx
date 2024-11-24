import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div>
      <div className="w-full h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-2xl shadow-pink-500 mt-1 rounded-full"></div>

      <section className="py-12 bg-gradient-to-r from-fuchsia-990 to-gray-400 text-white text-center">
        <p className="tetx-lg mb-2">Intakes of all clubs are open!</p>
        <h2 className="text-3xl text-pink-500 font-bold mb-4">Join Clubs@IIITV Today!</h2>
        <p className="mb-6">Discover your passion, build skills, and connect with like-minded peers. Start your journey now!</p>
        <Link to='/signup'>
          <button className="bg-white text-pink-600 font-bold text-lg h-12 px-8 rounded-lg hover:scale-105 transition-transform">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default CTASection;

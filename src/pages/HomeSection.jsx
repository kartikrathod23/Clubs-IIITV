import React from 'react';
import clubsImage from '../images/clubs@iiitv.png';
import main from '../images/main.jpg'
import main2 from '../images/main2.jpg'
import main3 from '../images/main3.jpg'
import { Link } from 'react-router-dom';
// import './HomeSection.css'; // Add custom styles here

const HomeSection = () => {
  return (
    <section className=" w-[calc(95vw)] mx-auto text-white pt-3 " >
      <div className="bg-opacity-60 backdrop:filter bg-black flex flex-col items-center mx-auto p-6 rounded-lg " >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 md:text-center">
          Welcome to the <span className=' text-transparent  bg-clip-text bg-gradient-to-r from-white to-white p-1 pt-0 rounded-full'>Heart</span> of IIITV - The <span className='text-transparent bg-clip-text bg-gradient-to-r font-extrabold from-pink-600 to-purple-600 p-1 pt-0 rounded-full'>Clubs@IIITV</span>
        </h1>
        <p className="text-lg md:text-lg mb-6 text-gray-400 md:text-center">
          Experience vibrant and dynamic communities that bring together like-minded individuals. The Clubs@IIITV is where passion, creativity, and collaboration meet to foster excellence, spark innovation, and form lifelong connections. From tech enthusiasts and cultural buffs to sports lovers and art aficionados, there's a place for everyone.
        </p>
        <Link to='/signup'>
          <button className="bg-white text-pink-600 font-bold text-lg h-12 px-8 rounded-lg hover:scale-105 transition-transform">
            Get Started
          </button>
        </Link>
        <p className="text-md md:text-lg text-gray-400 md:text-center ">
          Explore your interests, develop new skills, and immerse yourself in unforgettable experiences. Discover the clubs and committees that form the heartbeat of IIITV.
        </p>
      </div>
    </section>


  );
};

export default HomeSection;

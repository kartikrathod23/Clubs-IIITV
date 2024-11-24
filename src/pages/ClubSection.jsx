import React from 'react'
import danceClubImg from '../images/danceClub.jpg'
import musicClubImg from '../images/musicClub.jpg'
import masquerade from '../images/masquerade.jpg'
import shades from '../images/shades.jpg'
import cc from '../images/cc.jpg'
import fnc from '../images/fnc.jpg'
import pensieve from '../images/pensieve.jpg'
import editorial from '../images/editorial.jpg'
import bit from '../images/9bit.jpg'

import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

function ClubSection() {

    const navigate = useNavigate();

    const clubsData = [
        {
            name: "Mod5-The Dance Club",
            description: "A space to express and learn dance forms, from traditional to modern, and showcase your passion on stage.",
            image: danceClubImg,
        },
        {
            name: "Masquerade - The Drama Club",
            description: "Bringing stories to life through acting, stage plays, and street performances. A stage for creativity and expression.",
            image: masquerade,
        },
        {
            name: "Encore-The Music Club",
            description: "A haven for music enthusiasts to collaborate, perform, and celebrate melodies and rhythms together.",
            image: musicClubImg,
        },
        {
            name: "Shades - The Art Club",
            description: "A space for artists to create, explore, and collaborate on painting, sketching, digital art, and more, adding color to campus life.",
            image: shades,
        },
        {
            name: "Coding Club",
            description: "Fostering coding, problem-solving, and innovation with hackathons, workshops, and collaborative tech projects.",
            image: cc,
        },
        {
            name: "9Bit - The Robotics Club",
            description: "Hands-on innovation in robotics, building intelligent machines, and exploring automation through teamwork and creativity.",
            image: bit,
        },
        {
            name: "Pensieve - The Poetry Club",
            description: "For poets and word lovers to express themselves through poetry, sharing emotions and stories in a supportive space.",
            image: pensieve,
        },
        {
            name: "FNC-The Finance Club",
            description: "A place to explore finance, investments, and money management, preparing you for a smarter future.",
            image: fnc, 
        },
        {
            name: "Editorial Club",
            description: "Fostering creativity through writing and editing, this club is for storytellers and content creators alike.",
            image: editorial,
        },

    ]
    return (
        
        <section className="py-1 bg-gradient-to-r from-fuchsia-990 to-gray-400 m-4 mt-8">
            <div className="mx-auto px-4">
                <h2 className="text-gray-200 text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6">
                    Explore Our Clubs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clubsData.map((club, index) => (
                        <div key={index} className="bg-gradient-to-r from-fuchsia-990 via-pink-500 to-gray-400 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all duration-300">
                            <img src={club.image} alt={`${club.name} Image`} className="w-full h-1/2 object-cover rounded-b-md" />
                            <div className="p-6">
                                <h3 className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-2xl text-white md:text-3xl mb-2">{club.name}</h3>
                                <p className="text-white">{club.description}</p>
                            </div>

                            <div className='flex justify-center gap-1 items-center'>
                                <p className='mb-2 text-white'>Join us to</p>
                                <button onClick={() => navigate('/signup')} className='p-2 rounded-lg mb-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-700 transition-colors duration-300 text-white' >Explore more</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ClubSection

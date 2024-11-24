import React from 'react';
import Header from '../components/Header';
import literatureImage from '../images/academics.jpg';
import technicalImage from '../images/technical.png';
import culturalImage from '../images/cultural.jpg';

function Committees() {
    return (
        <div className=''>
            <Header />
            <section className=" py-20 pt-5 bg-gradient-to-r from-fuchsia-990 to-gray-400">
                <div className=" mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-20 ">
                        Major Committees
                    </h2>

                    <div className="relative flex flex-col items-center space-y-12 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-8">
                        {/* Committee Card Components */}
                        {[
                            {
                                title: "Literature Committee",
                                description: "Unleash creativity through poetry, debates, and literary events.",
                                subDetails: "Includes Pensieve, Editorial, DnD, FNC.",
                                events: "Hosts Alfaaz, Tedx IIITV.",
                                image: literatureImage,
                                offsetClass: "lg:-translate-y-8", 
                            },
                            {
                                title: "Technical Committee",
                                description: "Innovate, code, and build exciting tech projects and events.",
                                subDetails: "Includes Coding Club, Dot Club.",
                                events: "Hosts Cerebro.",
                                image: technicalImage,
                                offsetClass: "lg:translate-y-20",
                            },
                            {
                                title: "Cultural Committee",
                                description: "Celebrate diversity with music, dance, and cultural festivals.",
                                subDetails: "Includes Mod5, Encore, Shades, Masquerade.",
                                events: "Hosts Kreiva.",
                                image: culturalImage,
                                offsetClass: "lg:-translate-y-8", 
                            },
                        ].map((committee, index) => (
                            <div
                                key={index}
                                className={`w-2/3 lg:w-[calc(300px)] bg-gradient-to-r from-fuchsia-900 via-pink-500 to-gray-400 relative bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 ${committee.offsetClass}`}
                            >

                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                                    <img
                                        src={committee.image}
                                        alt={committee.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="mt-16 text-center">
                                    <h3 className="md:text-3xl text-2xl font-bold text-white mb-2">
                                        {committee.title}
                                    </h3>
                                    <p className="text-xl font-semibold text-gray-900 mb-2">
                                        {committee.description}
                                    </p>
                                    <p className="text-md md:text-lg text-gray-200 italic mb-2">
                                        {committee.subDetails}
                                    </p>
                                    <p className="text-md md:text-lg text-gray-800">
                                        <span className="font-semibold">Events:</span> {committee.events}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Committees;

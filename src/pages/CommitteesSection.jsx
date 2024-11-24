import React from 'react';
import literatureImage from '../images/academics.jpg';
import technicalImage from '../images/technical.png';
import culturalImage from '../images/cultural.jpg';

function CommitteesSection() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 text-center mb-16">
                    Major Committees
                </h2>
                {/* Flexbox Container for Overlapping Style */}
                <div className="relative flex flex-col items-center space-y-12 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-8">
                    {/* Committee Card Components */}
                    {[
                        {
                            title: "Literature Committee",
                            description: "Unleash creativity through poetry, debates, and literary events.",
                            image: literatureImage,
                            offsetClass: "lg:-translate-y-8", 
                        },
                        {
                            title: "Technical Committee",
                            description: "Innovate, code, and build exciting tech projects and events.",
                            image: technicalImage,
                            offsetClass: "lg:translate-y-20", 
                        },
                        {
                            title: "Cultural Committee",
                            description: "Celebrate diversity with music, dance, and cultural festivals.",
                            image: culturalImage,
                            offsetClass: "lg:-translate-y-8", 
                        },
                    ].map((committee, index) => (
                        <div
                            key={index}
                            className={`w-2/3 lg:w-[calc(300px)] bg-gradient-to-r from-fuchsia-990 via-pink-500 to-gray-400 relative bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 ${committee.offsetClass}`}
                        >

                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                                <img
                                    src={committee.image}
                                    alt={committee.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="mt-16 text-center">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {committee.title}
                                </h3>
                                <p className="text-md text-gray-900 mb-4">
                                    {committee.description}
                                </p>
                                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors duration-300">
                                    Explore More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CommitteesSection;

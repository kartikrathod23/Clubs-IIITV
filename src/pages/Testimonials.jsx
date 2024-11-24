import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-fuchsia to-gray-800 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Members Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        <div className="bg-opacity-60 backdrop:filter bg-black rounded-lg shadow-lg p-6">
          <p className="italic text-gray-400">
            "Joining Encore-The Music Club was the best decision of my college life. I made amazing friends and improved my skills."
          </p>
          <h4 className="mt-4 text-pink-500">- Priya,Batch of 2021</h4>
        </div>
        <div className="bg-opacity-60 backdrop:filter bg-black rounded-lg shadow-lg p-6">
          <p className="italic text-gray-400">
            "Mod5-The Dance Club helped me express my creativity and grow as a performer. Truly unforgettable!"
          </p>
          <h4 className="mt-4 text-pink-500">- Rahul, Batch of 2020</h4>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

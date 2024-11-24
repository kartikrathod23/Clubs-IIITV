import React from 'react';

const Statistics = () => {
  return (
    <section className="py-12 bg-white text-black text-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-4xl font-bold text-pink-600">10+</h3>
          <p>Active Clubs</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-purple-500">50+</h3>
          <p>Events Hosted</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-blue-500">500+</h3>
          <p>Members</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold text-gray-500">10+</h3>
          <p>Competitions won </p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;

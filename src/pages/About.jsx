import React from 'react';
import Header from '../components/Header';

function About() {
    return (
        <>
            <Header />
            <section className="py-5 h-screen bg-gradient-to-r from-fuchsia-990 to-gray-400">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-8">
                        About Us
                    </h2>
                    <div className="text-lg text-gray-200 leading-relaxed">
                        <p className="mb-4">
                            Welcome to clubs@IIITv, your go-to platform for exploring and engaging with the various student
                            clubs at IIIT Vadodara. Our platform connects you with a diverse range of clubs in the fields of
                            literature, technology, culture, and more. Whether you’re looking to collaborate on innovative
                            projects, participate in exciting events, or simply meet like-minded people, you’ll find a vibrant
                            community here.
                        </p>
                        <p className="mb-4">
                            Our mission is to foster creativity, learning, and collaboration through student-run clubs and
                            organizations. We strive to create a dynamic space where students can thrive in both personal and
                            professional growth, while also contributing to the campus community through meaningful
                            experiences.
                        </p>
                        <p className="mb-4">
                            We believe in the power of community and teamwork, and we’re excited to have you join us in making
                            the most of your time at IIITv.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;

import React, { useState } from 'react';
import Header from '../components/Header';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can replace this with API call or service to send the contact message
        console.log('Message Sent:', formData);
        setFormStatus('Thank you for contacting us. We will get back to you soon!');
        setFormData({ name: '', email: '', message: '' }); // Clear form after submit
    };

    return (
        <>
            <Header />
            <section className="py-8 bg-gradient-to-r pt-4 from-fuchsia-990 to-gray-400">
                <div className=" mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-8">
                        Contact Us
                    </h2>
                    <div className="flex flex-col lg:flex-row space-y-12 lg:space-y-0 lg:space-x-12">

                        <div className=" bg-gradient-to-r from-fuchsia-900 via-pink-500 to-gray-400 flex-1 bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-xl font-bold text-gray-100 mb-4">Contact Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-lg text-gray-100">Literature Committee</h4>
                                    <p className="text-gray-950">Updating soon....</p>
                                    {/* <p className="text-gray-700">Contact: 9876543210</p> */}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-gray-100">Technical Committee</h4>
                                    <p className="text-gray-950">Updating soon....</p>
                                    {/* <p className="text-gray-700">Contact: 9876543211</p> */}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-gray-100">Cultural Committee</h4>
                                    <p className="text-gray-950">Updating soon....</p>
                                    {/* <p className="text-gray-700">Contact: 9876543212</p> */}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-gray-100">Club Leader's Contact Info</h4>
                                    <p className="text-gray-950">Updating soon......</p>
                                    {/* <p className="text-gray-700">Contact: 9876543213</p> */}
                                </div>
                            </div>
                        </div>

                        {/* Right Section: Contact Form */}
                        <div className="bg-gradient-to-r from-fuchsia-900 via-pink-500 to-gray-400 flex-1 bg-white rounded-lg shadow-lg p-8">
                            <h3 className="text-xl font-bold text-gray-100 mb-4">Get in Touch</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-200 mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-200 mb-2" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-200 mb-2" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 mt-0 bg-gradient-to-r from-pink-300 to-purple-700 text-white font-bold rounded-md hover:bg-pink-700 transition duration-300"
                                >
                                    Send Message
                                </button>
                            </form>

                            {formStatus && (
                                <div className="mt-4 text-center text-green-600 font-semibold">
                                    {formStatus}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Contact;

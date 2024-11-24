import React, { useState, useEffect } from "react";
import authService from "../appwrite/config";

function UpcomingEventsSection() {
    const [events, setEvents] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const upcomingEvents = await authService.showEvents();
                setEvents(upcomingEvents.documents);
            } catch (e) {
                throw e;
            }
        };
        getEvents();
    }, []);

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "UTC",
        };

        return date.toLocaleString("en-US", options);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % events.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [events]);

    return (
        <section className=" py-8 mt-4 bg-gradient from-fuchsia-900 to-gray-400">
            <div className="mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-10">
                    Upcoming Events
                </h2>

                <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentSlide * 100}%)`,
                            width: `${events.length * 50}%`,
                        }}
                    >
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="flex-none w-2/3"
                                style={{ flex: "0 0 100%" }} 
                            >
                                <div className="bg-gradient-to-r from-fuchsia-900 via-pink-500 to-gray-400 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mx-auto max-w-full">

                                    <div className="mt-0 w-full flex items-center justify-center">
                                        {event.imageUrl && (
                                            <img
                                                src={event.imageUrl}
                                                alt={event.title}
                                                className="object-contain w-full h-full"
                                            />
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl md:text-3xl font-bold text-gray-100">
                                            {event.title}
                                        </h3>
                                        <p className="text-sm md:text-lg font-semibold text-gray-300 mt-2">
                                            {event.description}
                                        </p>
                                        <p className="text-xs md:text-lg text-gray-900 mt-4">
                                            <span className="font-semibold">Club:</span> {event.club}
                                        </p>
                                        <p className="text-xs md:text-lg text-black">
                                            <span className="font-semibold">Event on:</span>{" "}
                                            {formatDateTime(event.date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-500 text-white rounded-full"
                        onClick={() =>
                            setCurrentSlide((prevSlide) =>
                                (prevSlide - 1 + events.length) % events.length
                            )
                        }
                    >
                        &#10094;
                    </button>
                    <button
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-500 text-white rounded-full"
                        onClick={() =>
                            setCurrentSlide((prevSlide) => (prevSlide + 1) % events.length)
                        }
                    >
                        &#10095;
                    </button>
                </div>
            </div>
        </section>
    );
}

export default UpcomingEventsSection;

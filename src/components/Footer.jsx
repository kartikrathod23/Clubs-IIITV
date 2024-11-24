import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center space-y-8 lg:space-y-0 lg:flex-row lg:justify-between">

                    <div className="text-center lg:text-left">
                        <h3 className="text-2xl font-extrabold text-pink-500">Clubs@IIITV</h3>
                        <p className="text-gray-400 mt-2">Engage. Create. Inspire.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Coding Club */}
                        <div className="text-center flex items-center justify-center space-x-2">
                            <a href="https://www.instagram.com/coding_iiitv/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-400 hover:text-white" />
                            </a>
                            <h4 className="font-bold text-white mb-2">Coding Club</h4>
                        </div>
                        {/* Mod5 */}
                        <div className="text-center flex items-center justify-center space-x-2">
                            <a href="https://www.instagram.com/mod5_iiitv/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-400 hover:text-white" />
                            </a>
                            <h4 className="font-bold text-white mb-2">Mod5</h4>
                        </div>
                        {/* Encore */}
                        <div className="text-center flex items-center justify-center space-x-2">
                            <a href="https://www.instagram.com/encore_iiitv/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-400 hover:text-white" />
                            </a>
                            <h4 className="font-bold text-white mb-2">Encore</h4>
                        </div>
                        {/* Shades */}
                        <div className="text-center flex items-center justify-center space-x-2">
                            <a href="https://www.instagram.com/shades_iiitv/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-400 hover:text-white" />
                            </a>
                            <h4 className="font-bold text-white mb-2">Shades</h4>
                        </div>
                        {/* Masquerade */}
                        <div className="text-center flex items-center justify-center space-x-2">
                            <a href="https://www.instagram.com/masquerade_iiitv/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-400 hover:text-white" />
                            </a>
                            <h4 className="font-bold text-white mb-2">Masquerade</h4>
                        </div>
                        {/* 9bit */}
                        <div className="text-center flex items-center justify-center space-x-2">
                            <a href="https://www.instagram.com/9bit_iiitv/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-400 hover:text-white" />
                            </a>
                            <h4 className="font-bold text-white mb-2">9bit</h4>
                        </div>
                        {/* FNC */}
                        <div className="text-center flex items-center justify-center space-x-2">
                            <a href="https://www.instagram.com/fnc_iiitv/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-400 hover:text-white" />
                            </a>
                            <h4 className="font-bold text-white mb-2">FNC</h4>
                        </div>
                        {/* Pensieve */}
                        <div className="text-center flex items-center justify-center space-x-2">
                            <a href="https://www.instagram.com/pensieve_iiitv/" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="lg" className="text-gray-400 hover:text-white" />
                            </a>
                            <h4 className="font-bold text-white mb-2">Pensieve</h4>
                        </div>
                    </div>

                    <div className="text-center lg:text-right mt-8 lg:mt-0">
                        <p className="text-gray-400">&copy; 2024 Clubs@IIITV. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

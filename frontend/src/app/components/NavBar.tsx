import React from 'react';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-[#344e41] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    Logo Here
                </div>
                <div>
                    <a href="#" className="text-white mx-2">Home</a>
                    <a href="#" className="text-white mx-2">About</a>
                    <a href="#" className="text-white mx-2">Contact</a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
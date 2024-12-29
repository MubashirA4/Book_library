import React from 'react';
import { Link, NavLink } from 'react-router-dom'; 

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-white">My Book Library</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li><NavLink to="/" className="hover:text-gray-300">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-gray-300">About</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-gray-300">Contact</NavLink></li>
            <li>
              <NavLink to="/login" className="hover:text-gray-300">Login</NavLink> 
            </li>
            <li>
              <NavLink to="/signup" className="hover:text-gray-300">Signup</NavLink> 
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
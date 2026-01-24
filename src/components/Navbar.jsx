import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            OnlineAssess
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                {link.name}
              </a>
            ))}
            <Link to="/register" className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
              Get Started
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-100 pt-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block text-gray-600 hover:text-blue-600 font-medium py-2 px-2 rounded hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <Link to="/register" className="block bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm text-center mt-4" onClick={() => setIsOpen(false)}>
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
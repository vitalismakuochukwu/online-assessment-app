import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} OnlineAssess Platform. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {currentYear} YM. All Rights Reserved.
        </p>
        <div className="mt-2">
          <a
            href="https://www.linkedin.com/in/binyam-tagel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-700 mx-3 transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/bin-ym"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-700 mx-3 transition duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white shadow mt-10">
      <div className="max-w-screen-xl mx-auto px-4 py-6 lg:py-8">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-200 pb-6 mb-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start mb-4 md:mb-0"
          >
            <span className="text-xl font-semibold text-blue-700">
              Golden Chapter
            </span>
          </Link>

          {/* Navigation links */}
          <ul className="flex flex-wrap justify-center md:justify-end space-x-6 font-medium text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-700">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-700">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/github" className="hover:text-blue-700">
                Github
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <span className="text-sm text-gray-500 text-center sm:text-left mb-3 sm:mb-0">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="hover:underline text-blue-700">
              Golden Chapter
            </Link>
            . All Rights Reserved. <small> Developed by </small>
            <bold className="text-blue-700"> Muhammad Khan</bold>
          </span>

          {/* Social icons */}
          <div className="flex space-x-5 text-gray-500 text-xl">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/muhammad-khan-53a192357/"
              className="hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
            <a
              target="_blank"
              href="https://github.com//Muhammad-Khan-Khichi"
              className="hover:text-blue-700"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

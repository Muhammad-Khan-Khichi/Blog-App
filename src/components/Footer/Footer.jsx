import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 text-gray-200 mt-0 shadow-inner">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-600 pb-6 mb-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start mb-4 md:mb-0"
          >
            <span className="text-2xl font-extrabold tracking-wider text-white hover:text-indigo-400 transition duration-300">
              MK <span className="text-indigo-400">BLOGS</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-wrap justify-center md:justify-end gap-4 font-medium text-gray-300 text-base">
            <li>
              <Link
                to="/"
                className="hover:text-indigo-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-indigo-400 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-indigo-400 transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-indigo-400 transition duration-300"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <span className="text-sm text-gray-400 mb-4 sm:mb-0">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="hover:underline text-indigo-400">
              MK BLOGS
            </Link>
            . All Rights Reserved.{" "}
            <small className="text-gray-400">Developed by</small>{" "}
            <strong className="text-indigo-400">Muhammad Khan</strong>
          </span>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-end space-x-5 text-2xl">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/muhammad-khan-53a192357/"
              className="hover:text-indigo-400 transition duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Muhammad-Khan-Khichi"
              className="hover:text-indigo-400 transition duration-300"
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

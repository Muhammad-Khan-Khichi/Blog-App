import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import {
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiFileText,
  FiPlusCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: <FiHome className="inline mr-2 text-indigo-500" />,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: <FiLogIn className="inline mr-2 text-indigo-500" />,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: <FiUserPlus className="inline mr-2 text-indigo-500" />,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: <FiFileText className="inline mr-2 text-indigo-500" />,
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus,
      icon: <FiPlusCircle className="inline mr-2 text-indigo-500" />,
    },
  ];

  return (
    <header className="bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 shadow-lg py-3 px-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-white tracking-wider hover:text-indigo-300 transition duration-300">
          <Link to="/">MK<span className="text-indigo-400">.</span></Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl md:hidden focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex flex-col md:flex-row md:items-center md:space-x-3 absolute md:static top-16 left-0 w-full md:w-auto bg-slate-900 md:bg-transparent shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${
            menuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-5 md:opacity-100 md:visible md:translate-y-0"
          }`}
        >
          {navItem.map((item) =>
            item.active ? (
              <li key={item.name} className="md:my-0 my-2 text-center">
                <button
                  onClick={() => {
                    navigate(item.slug);
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center md:justify-start w-full px-4 py-2 rounded-full bg-slate-700 text-gray-200 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {item.icon}
                  {item.name}
                </button>
              </li>
            ) : null
          )}

          {authStatus && (
            <li className="md:my-0 my-2 text-center">
              <Logout />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

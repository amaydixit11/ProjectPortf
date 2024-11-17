import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const NavBar = ({ className }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={`relative flex items-center justify-between rounded-2xl px-6 py-2 ${className}`}
    >
      {/* Logo / Name */}
      <p className="font-sans text-4xl font-bold tracking-wide leading-normal">
        Amay Dixit
      </p>

      {/* Right Container with Links and Icon */}
      {/* <div className="flex items-center text-white text-lg">
        {menuOpen && (
          <div className="flex items-center space-x-6 bg-gray-800 bg-opacity-80 rounded-lg py-2 px-4 transition-all duration-300">
            {["Site Map", "Certifications", "Blog", "Resume"].map(
              (section, idx) => (
                <a
                  key={idx}
                  href={`#${section.toLowerCase()}`}
                  onClick={toggleMenu}
                  className="hover:text-gray-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  {section}
                </a>
              )
            )}
          </div>
        )}
        <div onClick={toggleMenu} className="cursor-pointer ml-4">
          {menuOpen ? (
            <AiOutlineClose size="30" />
          ) : (
            <GiHamburgerMenu size="30" />
          )}
        </div> */}
      {/* </div> */}
      <p className="font-sans text-xl text-gray-400 font-bold tracking-wide leading-normal mx-4">
        View Full Site
      </p>
    </div>
  );
};

export default NavBar;

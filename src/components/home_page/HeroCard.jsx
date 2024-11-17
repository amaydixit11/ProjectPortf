import React from "react";
import { TypeAnimation } from "react-type-animation";
import RadialGradientCursor from "../RadialGradientCursor";
import { FaDownload } from "react-icons/fa";

const HeroCard = ({ className }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-evenly rounded-2xl px-4 ${className}`}
    >
      <div className="text-left font-sans text-5xl font-bold tracking-wide leading-normal">
        I Am{" "}
        <TypeAnimation
          sequence={[
            "A Student",
            1000,
            "A Frontend Developer",
            1000,
            "A Backend Developer",
            1000,
            "An App Developer",
            1000,
            "An ML engineer",
            1000,
            "A Data Scientist",
            1000,
            "Amay Dixit",
            3000,
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
        />
      </div>

      <div className="text-xl text-gray-200 leading-relaxed">
        Hello! I'm Amay Dixit, currently a student with a passion for developing
        full-stack web applications and machine learning models. I'm skilled in
        various technologies, including frontend and backend development, app
        creation, and data science.
      </div>

      {/* Download Resume Button */}
      <div className="absolute bottom-4 right-4 flex items-center justify-center rounded-2xl p-2 bg-[#ffbf3c] cursor-pointer">
        <div className="flex items-center font-sans text-2xl md:text-2xl font-bold tracking-wide text-white">
          Resume
        </div>
        <FaDownload className="m-2 text-white" />
      </div>
    </div>
  );
};

export default HeroCard;

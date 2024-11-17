import React from "react";
import mapPic from "/public/map.png";
import Image from "next/image";

const AboutCard = ({ className }) => {
  return (
    <div className={`flex flex-col justify-center rounded-2xl ${className}`}>
      <div className={`flex items-center justify-between px-4`}>
        <p className="font-sans text-2xl font-bold tracking-wide leading-normal">
          About Me:
        </p>
        <p className="font-sans text-xl text-gray-400 font-bold tracking-wide leading-normal">
          Show More
        </p>
      </div>
      <Image src={mapPic} alt="Amay Dixit" className="rounded-2xl" />
    </div>
  );
};
export default AboutCard;

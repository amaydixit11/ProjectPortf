import React from "react";
import Image from "next/image";
import myPic from "/public/Amay_Dixit_12340220.png";

const PhotoCard = ({ className }) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl overflow-hidden ${className}`}
    >
      <Image
        src={myPic}
        alt="Amay Dixit"
        layout="fill"
        objectFit="cover"
        className="rounded-2xl"
      />
    </div>
  );
};

export default PhotoCard;

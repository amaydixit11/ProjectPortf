import React from "react";

const DetailsCard = ({ className, children }) => {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl p-4 ${className}`}
    >
      <p className="font-sans text-2xl font-bold tracking-wide leading-normal">
        Experience
      </p>
      <p className="font-sans text-2xl font-bold tracking-wide leading-normal">
        PORs
      </p>
      <p className="font-sans text-xl text-gray-400 font-bold tracking-wide leading-normal">
        Show More
      </p>
      {children}
    </div>
  );
};

export default DetailsCard;

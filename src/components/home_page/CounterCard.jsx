import React from "react";

const CounterCard = ({ className, number, text }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl p-4 ${className}`}
    >
      <div className="flex items-center justify-center">
        <p className="font-sans text-6xl md:text-7xl font-bold tracking-wide leading-normal text-white text-center">
          {number}+
        </p>
      </div>
      <div className="flex items-center justify-center">
        <p className="font-sans text-lg md:text-2xl font-semibold tracking-wide leading-normal text-white text-center">
          {text}
        </p>
      </div>
    </div>
  );
};
export default CounterCard;

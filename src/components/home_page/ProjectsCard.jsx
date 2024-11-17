import React from "react";
import mapPic from "/public/map.png";
import Image from "next/image";

const Project = ({ className, title }) => {
  return (
    <div
      className={`grid grid-cols-1 grid-row-4 items-center justify-center rounded-2xl ${className}`}
    >
      <h1 className="col-span-1 row-span-1 font-sans text-lg font-bold tracking-wide leading-normal p-2">
        {title}
      </h1>
      <div className="col-span-1 row-span-3"> </div>
    </div>
  );
};

const ProjectsCard = ({ className }) => {
  return (
    <div className={`rounded-2xl ${className}`}>
      <div className="flex flex-wrap flex-row items-center justify-between pt-4 px-4">
        <p className="font-sans text-3xl font-bold tracking-wide leading-normal mx-4">
          Projects
        </p>
        <p className="font-sans text-xl text-gray-400 font-bold tracking-wide leading-normal mx-4">
          Show More
        </p>
      </div>
      <div className="flex justify-between justify-items-stretch items-stretch self-stretch place-self-stretch mx-4 p-4">
        <Project
          className={`basis-1/3 mx-2 bg-[url('/bg.jpg')] bg-cover`}
          title={`Stress Management App`}
        />
        <Project
          className={`basis-1/3 mx-2 bg-[url('/bg.jpg')] bg-cover`}
          title={`Library Automation System`}
        />
        <Project
          className={`basis-1/3 mx-2 bg-[url('/bg.jpg')] bg-cover`}
          title={`Graphical Timeline Maintainer`}
        />
      </div>
    </div>
  );
};

export default ProjectsCard;

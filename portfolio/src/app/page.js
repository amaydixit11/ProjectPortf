"use client";
import {
  PhotoCard,
  NavBar,
  AboutCard,
  HeroCard,
  CounterCard,
  DetailsCard,
  ProjectsCard,
  SocialsCard,
  TechStackCard,
} from "../components/index.js";

import RadialGradientCursor from "../components/RadialGradientCursor.jsx";

export default function Home() {
  const bgclr = "#1e1b1e";
  const glass = `bg-gray-600 backdrop-filter backdrop-blur-md bg-opacity-20`;
  const activeGlass = `glow`;
  return (
    <div>
      <RadialGradientCursor />
      <style>
        {`
          .glow {
            animation: glow 1s ease-in-out infinite alternate;
            box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.8);
            transform: scale(1.05);
          }
          @keyframes glow {
            from {
              box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.8);
            }
            to {
              box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.8);
            }
          }
          `}
      </style>

      <div className={`grid grid-cols-12 grid-row-8 gap-5 p-4 h-[calc(100vh)]`}>
        <HeroCard className={`col-span-6 row-span-3 ${glass}`} />
        <NavBar className={`col-span-6 row-span-1 ${glass}`} />
        <PhotoCard className={`col-span-3 row-span-4 ${glass}`} />
        <DetailsCard className={`col-span-3 row-span-1 ${glass}`} />
        <AboutCard className={`col-span-3 row-span-2 ${glass}`} />
        <CounterCard
          className={`col-span-2 row-span-2 bg-[#ffbf3c]`}
          number={20}
          text={"Projects"}
        />
        <CounterCard
          className={`col-span-2 row-span-2 bg-[#fe6d79]`}
          number={100}
          text={"LeetCode Problems Solved"}
        />
        <CounterCard
          className={`col-span-2 row-span-2 bg-[#00c39a]`}
          number={10}
          text={"Open Source Contributions"}
        />
        <SocialsCard className={`col-span-3 row-span-1 ${glass}`} />
        <ProjectsCard className={`col-span-7 row-span-3 ${glass}`} />
        <TechStackCard className={`col-span-5 row-span-3 ${glass}`} />
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";

import { useCurrentTime } from "@/hooks/useCurrentTime";
import { LocationTimeWidget } from "@/components/about/LocationTime";
import { StatusWidget } from "@/components/about/Status";
import { AchievementsWidget } from "@/components/about/Achievements";
import { LearningWidget } from "@/components/about/Learning";
import { QuickLinksWidget } from "@/components/about/QuickLinks";

import {
  personalInfo,
  bioData,
  beyondCodeData,
  getMockCurrentActivity,
  achievementsData,
  learningData,
  quickLinksData,
  journeyData,
} from "@/data/about";
import { highlightText } from "@/utils/highlightText";
import Link from "next/link";
import ConnectWidget from "@/components/about/ConnectWidget";
import Map from "@/components/about/Map";

const About: React.FC = () => {
  const currentTime = useCurrentTime();
  const [currentActivity] = useState(getMockCurrentActivity());

  return (
    <div className="py-8 min-h-screen mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              About Me
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {personalInfo.description}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Who I Am
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {bioData.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2"
                >
                  {highlightText(paragraph)}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Journey
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              {journeyData.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5"
                >
                  {highlightText(paragraph)}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Beyond Code
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {beyondCodeData.content}
            </p>
          </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Always open to chatting about tech, projects, or ideas. Feel free to
            reach out via my socials in the Quick Links section, or reach out to me via email at{" "}
            <Link href={`mailto:${"amayd@iitbhilai.ac.in"}`} className="text-blue-500">
              {"amayd@iitbhilai.ac.in"}
            </Link>
          </p>
        </div>
        </div>

        <div className="space-y-6">
          <ConnectWidget />
          <LocationTimeWidget
            location={personalInfo.location}
            currentTime={currentTime}
          />
          <StatusWidget activity={currentActivity} />
          {/* <SpotifyWidget track={currentTrack} /> */}
          <AchievementsWidget achievements={achievementsData} />
          <LearningWidget technologies={learningData} />
          <QuickLinksWidget links={quickLinksData} />
          <Map />
        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";

import {
  ArchlinuxOriginal,
  AmazonwebservicesPlainWordmark,
  COriginal,
  CplusplusOriginal,
  Css3Original,
  DartOriginal,
  DjangoPlain,
  DockerOriginal,
  ElectronOriginal,
  ExpressOriginal,
  FigmaOriginal,
  FirebaseOriginal,
  FlutterOriginal,
  GitOriginal,
  GoOriginal,
  Html5Original,
  JavascriptOriginal,
  LinuxOriginal,
  MaterialuiOriginal,
  MongodbOriginal,
  MongooseOriginal,
  NestjsOriginal,
  NextjsOriginal,
  NodejsOriginalWordmark,
  NumpyOriginal,
  PandasPlainWordmark,
  PythonOriginal,
  ReactOriginal,
  ReactrouterOriginal,
  RedisOriginal,
  ReduxOriginal,
  RustOriginal,
  TypescriptOriginal,
  VitejsOriginal,
} from "devicons-react";

const TechStackCard = ({ className }) => {
  const size = 40;
  return (
    <div
      className={`flex flex-wrap flex-row items-center justify-between rounded-2xl ${className}`}
    >
      <p className="font-sans text-3xl font-bold tracking-wide leading-normal mx-4">
        Tech Stack
      </p>
      <p className="font-sans text-xl text-gray-400 font-bold tracking-wide leading-normal mx-4">
        Show More
      </p>
      <div className="flex flex-wrap items-center justify-center m-0">
        <ArchlinuxOriginal size={`${size}`} className="m-1" />
        <LinuxOriginal size={`${size}`} className="m-1" />
        <GitOriginal size={`${size}`} className="m-1" />
        <COriginal size={`${size}`} className="m-1" />
        <CplusplusOriginal size={`${size}`} className="m-1" />
        <RustOriginal size={`${size}`} className="m-1" />
        <GoOriginal size={`${size}`} className="m-1" />
        <AmazonwebservicesPlainWordmark size={`${size}`} className="m-1" />
        <Html5Original size={`${size}`} className="m-1" />
        <Css3Original size={`${size}`} className="m-1" />
        <JavascriptOriginal size={`${size}`} className="m-1" />
        <TypescriptOriginal size={`${size}`} className="m-1" />
        <ReactOriginal size={`${size}`} className="m-1" />
        <ReactrouterOriginal size={`${size}`} className="m-1" />
        <VitejsOriginal size={`${size}`} className="m-1" />
        <NextjsOriginal size={`${size}`} className="m-1" />
        <ReduxOriginal size={`${size}`} className="m-1" />
        <ElectronOriginal size={`${size}`} className="m-1" />
        <MaterialuiOriginal size={`${size}`} className="m-1" />
        <NodejsOriginalWordmark size={`${size}`} className="m-1" />
        <ExpressOriginal size={`${size}`} className="m-1" />
        <NestjsOriginal size={`${size}`} className="m-1" />
        <MongooseOriginal size={`${size}`} className="m-1" />
        <MongodbOriginal size={`${size}`} className="m-1" />
        <RedisOriginal size={`${size}`} className="m-1" />
        <DjangoPlain size={`${size}`} className="m-1" />
        <DockerOriginal size={`${size}`} className="m-1" />
        <DartOriginal size={`${size}`} className="m-1" />
        <FlutterOriginal size={`${size}`} className="m-1" />
        <FirebaseOriginal size={`${size}`} className="m-1" />
        <PythonOriginal size={`${size}`} className="m-1" />
        <PandasPlainWordmark size={`${size}`} className="m-1" />
        <NumpyOriginal size={`${size}`} className="m-1" />
        <FigmaOriginal size={`${size}`} className="m-1" />
      </div>
    </div>
  );
};

export default TechStackCard;

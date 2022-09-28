import React from "react";
import { GiBatteryPack } from "react-icons/gi";

const PathCards = () => {
  return (
    <div className="mx-auto my-5 max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
      <div className="w-min">
        <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
          Battery
        </h1>
        <GiBatteryPack size={50} />
      </div>
    </div>
  );
};

export default PathCards;

import React from "react";

const PathCards = ({ title, icon, description, tooltip }) => {
  return (
    <div className="mx-auto my-5 max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800 hover:cursor-pointer">
      <div className="mx-auto justify-center items-center">
        {icon}
        <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PathCards;

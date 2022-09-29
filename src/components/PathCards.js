import React from "react";

const PathCards = ({ title, icon, description, tooltip }) => {
  return (
    <div className="flex mx-auto my-5 w-1/2 md:w-96 px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800 hover:cursor-pointer">
      <div className="mx-auto justify-center items-center">
        <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h1>
        {icon}
      </div>
      <div className="p-5 hidden md:flex items-center ">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PathCards;

import React, { useState } from "react";

const SideSummary = () => {
  const [showSideSummary, setshowSideSummary] = useState(false);

  const handleClick = (e) => {
    if (e.target.id === "sidesummaryBtn" || e.target.id === "sidesummarydiv")
      setshowSideSummary(true);
    else setshowSideSummary(false);
  };

  return (
    <>
      {showSideSummary ? (
        <div
          onClick={handleClick}
          className="fixed inset-0 z-10 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        >
          <div
            id="sidesummarydiv"
            className="right-0 fixed h-full w-1/4 z-10 p-10 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-2xl">Summary</h2>
          </div>
        </div>
      ) : (
        <button
          id="sidesummaryBtn"
          onClick={handleClick}
          className="fixed top-1/2 right-0 z-10 bg-stone-800 p-10 rounded-l-lg text-white"
        >
          Test
        </button>
      )}
    </>
  );
};

export default SideSummary;

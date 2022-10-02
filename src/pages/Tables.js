import { useQuery } from "@apollo/client";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import React from "react";
import { FETCH_BATTERY } from "../util/graphql/Query";

const Tables = () => {
  const { loading, data } = useQuery(FETCH_BATTERY);
  console.log(data);
  return (
    <>
      {/* TODO: Change to loading spinner */}
      {loading ? (
        <h1>Loading posts...</h1>
      ) : (
        <div>
          <GridComponent dataSource={data.getBatteries}></GridComponent>
        </div>
      )}
      <button
        // onClick={() => openModal(item)}
        className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
      >
        Create battery
      </button>
    </>
  );
};

export default Tables;

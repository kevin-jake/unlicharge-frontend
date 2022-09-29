import React from "react";

const ItemCard = ({ setShowModal, item }) => {
  return (
    <div className="block relative my-5 mx-auto max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="w-1/3 bg-cover"></div>

      <div className="w-2/3 p-4 md:p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {item.name}
        </h1>
        <de></de>

        <div className="flex justify-between mt-3 item-center">
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
            $220
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

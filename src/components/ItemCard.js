import React from "react";

const ItemCard = ({ setShowModal, item }) => {
  const properties = Object.getOwnPropertyNames(item);
  const doNotDisplay = [
    "name",
    "id",
    "__typename",
    "price_per_pc",
    "min_voltage",
    "max_voltage",
    "supplier",
    "publish_status",
    "createdAt",
  ];

  return (
    <div className="block relative w-2/3 my-5 mx-auto max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="w-full p-4 md:p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {item.name}
        </h1>
        <div>
          <ul>
            {properties.map(
              (prop) =>
                !doNotDisplay.includes(prop) && (
                  <li>
                    <div className="grid grid-cols-2">
                      <p className="font-bold text-sm">{prop}</p>
                      <p className="text-sm">{item[prop]}</p>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>

        <div className="flex justify-between mt-3 item-center">
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">
            Php {item.price_per_pc}
          </h1>
          {/* TODO: Add specs on the cards */}

          <button
            onClick={() => setShowModal(true)}
            className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

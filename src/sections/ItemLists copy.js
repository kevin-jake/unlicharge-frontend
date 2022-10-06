import React from "react";
import CardsFilter from "../components/CardsFilter";
import ItemCard from "../components/ItemCard";
import { FETCH_BATTERY } from "../util/graphql/Query";
import { useQuery } from "@apollo/client";

const ItemLists = ({ setShowModal, setModalDetails }) => {
  const { loading, data } = useQuery(FETCH_BATTERY);
  var itemData = [];
  if (data) {
    itemData = data.getBatteries;
  }

  const openModal = (item) => {
    setShowModal(true);
    setModalDetails(item);
  };

  console.log(itemData);
  return (
    <div>
      <h2 className="px-10 text-lg font-bold">List of Compatible Batteries</h2>
      <CardsFilter />
      <div className="grid grid-row-1 sm:grid-row-1 md:grid-cols-2 lg:grid-cols-4">
        {/* TODO: Change to loading spinner */}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : itemData.length > 0 ? (
          itemData.map((item) => (
            <ItemCard key={item.id} item={item} openModal={openModal} />
          ))
        ) : (
          // TODO: Make this more catchy
          <div> No List found...</div>
        )}
      </div>
    </div>
  );
};

export default ItemLists;

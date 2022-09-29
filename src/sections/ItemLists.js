import React from "react";
import CardsFilter from "../components/CardsFilter";
import ItemCard from "../components/ItemCard";

const ItemLists = (props) => {
  return (
    <div>
      <h2 className="px-10 text-lg font-bold">List of Compatible Batteries</h2>
      <CardsFilter />
      <div className="grid grid-row-1 sm:grid-row-1 md:grid-cols-2 lg:grid-cols-4">
        <ItemCard setShowModal={props.setShowModal} />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
};

export default ItemLists;

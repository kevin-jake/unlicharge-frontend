import React from "react";
import ItemCard from "../components/ItemCard";
import { FETCH_BATTERY } from "../util/graphql/Query";
import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";

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
    <Grid
      container
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      sx={{ padding: 2 }}
      justify="flex-start"
      alignItems="flex-start"
    >
      {loading ? (
        <h1>Loading posts...</h1>
      ) : itemData.length > 0 ? (
        itemData.map((item) => (
          <Grid key={item.id} item xs={3} lg={"auto"}>
            <ItemCard item={item} />
          </Grid>
        ))
      ) : (
        // TODO: Make this more catchy
        <div> No List found...</div>
      )}
    </Grid>
  );
};

export default ItemLists;

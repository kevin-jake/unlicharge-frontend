import React, { useState } from "react";
import ItemCard from "../components/ItemCard";
import { FETCH_BATTERY } from "../util/graphql/Query";
import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import DetailsModal from "../components/DetailsModal";
import FormModal from "../components/FormModal";

const ItemLists = () => {
  const { loading, data } = useQuery(FETCH_BATTERY);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [showFormModal, setShowFormModal] = useState({
    open: false,
    operation: "",
  });

  var itemData = [];
  if (data) {
    itemData = data.getBatteries;
  }

  const openModal = (item) => {
    setShowModal(true);
    setModalData(item);
  };

  const openEditModal = (operation) => {
    setShowFormModal({ open: true, operation });
  };

  console.log(itemData);
  return (
    <>
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
              <ItemCard item={item} openModal={() => openModal(item)} />
            </Grid>
          ))
        ) : (
          // TODO: Make this more catchy
          <div> No List found...</div>
        )}
      </Grid>
      {modalData && (
        <>
          <DetailsModal
            modalData={modalData}
            showModal={showModal}
            setShowModal={setShowModal}
            openEditModal={openEditModal}
          />
          <FormModal
            showFormModal={showFormModal}
            setShowFormModal={setShowFormModal}
            formData={modalData}
          />
        </>
      )}
    </>
  );
};

export default ItemLists;

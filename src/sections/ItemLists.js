import React, { useContext, useState } from "react";
import ItemCard from "../components/ItemCard";
import { FETCH_AB, FETCH_BATTERY, FETCH_BMS } from "../util/graphql/Query";
import { useQuery } from "@apollo/client";
import { Box, Button, Grid } from "@mui/material";
import DetailsModal from "../components/DetailsModal";
import FormModal from "../components/FormModal";
import { AB, Battery, BMS } from "../util/AddFormProperties";
import { AuthContext } from "../context/auth-context";

function querySelect(select) {
  switch (select) {
    case "Battery":
      return { gql_query: FETCH_BATTERY, form_props: Battery };
    case "BMS":
      return { gql_query: FETCH_BMS, form_props: BMS };
    case "Active Balancer":
      return { gql_query: FETCH_AB, form_props: AB };
  }
}

const ItemLists = ({ selection }) => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(querySelect(selection).gql_query, {
    variables: { userId: user.id },
  });
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

  const openFormModal = (operation) => {
    setShowFormModal({ open: true, operation });
  };

  const openAddModal = () => {
    setModalData(querySelect(selection).form_props);
    setShowFormModal({ open: true, operation: "Create" });
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
        ) : itemData && itemData.length > 0 ? (
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
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
        px={2}
        pb={5}
      >
        <Button
          variant="contained"
          size="small"
          sx={{ color: "white", margin: 1, textTransform: "none" }}
          onClick={openAddModal}
        >
          Add
        </Button>
      </Box>
      {modalData && (
        <>
          <DetailsModal
            modalData={modalData}
            showModal={showModal}
            setShowModal={setShowModal}
            openEditModal={openFormModal}
          />
          <FormModal
            showFormModal={showFormModal}
            setShowFormModal={setShowFormModal}
            formData={modalData}
            title={selection}
          />
        </>
      )}
    </>
  );
};

export default ItemLists;

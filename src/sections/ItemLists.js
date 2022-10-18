import React, { useContext, useState } from "react";
import ItemCard from "../components/ItemCard";
import { FETCH_AB, FETCH_BATTERY, FETCH_BMS } from "../util/graphql/Query";
import { useQuery } from "@apollo/client";
import { Box, Button, Grid } from "@mui/material";
import DetailsModal from "../components/DetailsModal";
import FormModal from "../components/FormModal";
import { AB, Battery, BMS } from "../util/AddFormProperties";
import { AuthContext } from "../context/auth-context";
import SideSummary from "../components/SideSummary";
import { SummaryContext } from "../context/summary-context";
import SpecsTable from "../components/SpecsTable";
import PathCards from "../components/PathCards";
import { MdBatteryChargingFull } from "react-icons/md";

function querySelect(select) {
  switch (select) {
    case "Battery":
      return {
        gql_query: FETCH_BATTERY,
        form_props: Battery,
        data: "getBatteries",
      };
    case "BMS":
      return { gql_query: FETCH_BMS, form_props: BMS, data: "getBMSes" };
    case "Active Balancer":
      return {
        gql_query: FETCH_AB,
        form_props: AB,
        data: "getActiveBalancers",
      };
  }
}

const ItemLists = ({ selection }) => {
  const { userId } = useContext(AuthContext);
  const { batterySelected, bmsSelected, abSelected } =
    useContext(SummaryContext);
  const { loading, data } = useQuery(querySelect(selection).gql_query, {
    variables: { userId },
  });
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [computedData, setComputedData] = useState();

  const [showFormModal, setShowFormModal] = useState({
    open: false,
    operation: "",
  });

  var itemData = [];
  if (data) {
    itemData = data[querySelect(selection).data];
  }

  const openModal = (item, computedData) => {
    console.log({ computedData });
    setShowModal(true);
    setComputedData(computedData);
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
      <Box sx={{ flexDirection: "row" }}>
        <Grid
          container
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ padding: 2 }}
          alignContent="start"
          justifyContent="center"
          alignItems="center"
        >
          {loading ? (
            <h1>Loading posts...</h1>
          ) : itemData && itemData.length > 0 ? (
            itemData.map((item) => (
              <Grid key={item.id} item xs={3} lg={"auto"}>
                <ItemCard
                  selection={selection}
                  item={item}
                  openModal={openModal}
                />
              </Grid>
            ))
          ) : (
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
      </Box>
      {modalData && (
        <>
          <DetailsModal
            modalData={modalData}
            showModal={showModal}
            setShowModal={setShowModal}
            openEditModal={openFormModal}
            computedData={computedData}
          />
          <FormModal
            showFormModal={showFormModal}
            setShowFormModal={setShowFormModal}
            formData={modalData}
            title={selection}
          />
        </>
      )}
      {/* <SideSummary
        components={
          batterySelected && (
            <PathCards
              title="Battery"
              icon={<MdBatteryChargingFull />}
              description={
                <div>
                  <p> Selected Battery: {batterySelected.id} </p>
                  <p> Battery Price: {batterySelected.price} </p>
                  <p> Total Quantity: {batterySelected.qty} </p>
                </div>
              }
            /> */}
      ) } />
    </>
  );
};

export default ItemLists;

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import SpecsTable from "./SpecsTable";
import { batterySummary } from "../logic/battery-computations";
import { SummaryContext } from "../context/summary-context";
import QuickSpecs from "./QuickSpecs";
import { stringCompatibility } from "../logic/incompatibiliy";

const ItemCard = ({ item, openModal, selection }) => {
  const {
    initialForm,
    batterySelected,
    bmsSelected,
    abSelected,
    setBattery,
    setBMS,
    setAB,
  } = useContext(SummaryContext);
  const [computedData, setComputedData] = useState();
  const bgSelect = () => {
    if (selection === "Battery") {
      if (batterySelected.id === item.id) {
        if (
          batterySelected.error &&
          Object.keys(batterySelected.error).length !== 0
        )
          return "pink";
        else return "lightgreen";
      }
      return "";
    }
    if (selection === "BMS") {
      if (bmsSelected.id === item.id) {
        if (bmsSelected.error && Object.keys(bmsSelected.error).length !== 0)
          return "pink";
        else return "lightgreen";
      }
      return "";
    }
    if (selection === "Active Balancer") {
      if (abSelected.id === item.id) {
        if (abSelected.error && Object.keys(abSelected.error).length !== 0)
          return "pink";
        else return "lightgreen";
      }
      return "";
    }
  };

  useEffect(() => {
    setComputedData(batterySummary(item, initialForm));
    // if (
    //   batterySelected.computedData &&
    //   Object.keys(batterySelected.computedData).length !== 0
    // ) {
    setBattery({
      ...batterySelected,
      computedData: batterySummary(batterySelected, initialForm),
    });
    // }
  }, [initialForm]);

  const handleItemClick = () => {
    var error;
    if (
      batterySelected.computedData &&
      Object.keys(batterySelected.computedData).length !== 0
    ) {
      error = stringCompatibility(
        +batterySelected.computedData.totalSeries,
        +item.strings,
        selection
      );
    }
    if (selection === "Battery") {
      setBattery(
        {
          ...batterySelected,
          ...item,
          computedData,
        },
        true
      );
    }
    if (selection === "BMS") {
      setBMS(
        {
          ...bmsSelected,
          ...item,
          error,
        },
        true
      );
    }
    if (selection === "Active Balancer") {
      setAB(
        {
          ...abSelected,
          ...item,
          error,
        },
        true
      );
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          pb: 2,
          width: 450,
          height: "auto",
          backgroundColor: bgSelect(),
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "11rem",
                }}
              >
                <Typography noWrap variant="h5" color="text.secondary">
                  {item.name}
                </Typography>
              </div>
              {item && <SpecsTable specs={item} />}
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 151, height: 151, margin: 2 }}
              image={
                item.image_url
                  ? item.image_url
                  : "https://pharma.doh.gov.ph/wp-content/uploads/2020/08/placeholder.png"
              }
              alt={item.name}
            />
          </Box>
        </Box>
        {computedData && (
          <QuickSpecs computedData={computedData} title={selection} />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", margin: 1, textTransform: "none" }}
            onClick={() => openModal(item, computedData)}
          >
            More Details
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", margin: 1, textTransform: "none" }}
            onClick={handleItemClick}
          >
            Select
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default ItemCard;

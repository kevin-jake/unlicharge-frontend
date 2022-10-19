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
      return batterySelected.id === item.id ? "lightgreen" : "";
    }
    if (selection === "BMS") {
      console.log({ bmsSelected });
      return bmsSelected.id === item.id ? "lightgreen" : "";
    }
    if (selection === "Active Balancer") {
      console.log({ abSelected });
      return abSelected.id === item.id ? "lightgreen" : "";
    }
  };

  useEffect(() => {
    setComputedData(batterySummary(item, initialForm));
  }, [initialForm]);

  useEffect(() => {
    if (batterySelected.id === item.id) {
      setBattery({
        ...batterySelected,
        qty: computedData && computedData.totalQty,
        battSeries: computedData && computedData.totalSeries,
      });
    }
  }, [computedData]);

  const handleItemCick = () => {
    if (selection === "Battery") {
      setBattery({
        id: item.id,
        price: item.price_per_pc,
        qty: computedData && computedData.totalQty,
        battSeries: computedData && computedData.totalSeries,
      });
    }
    if (selection === "BMS") {
      setBMS({ id: item.id, qty: 1, price: item.price, strings: item.strings });
    }
    if (selection === "Active Balancer") {
      setAB({ id: item.id, qty: 1, price: item.price, strings: item.strings });
    }
  };

  console.log({ computedData });
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
              image={item.image_url}
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
            onClick={handleItemCick}
          >
            Select
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default ItemCard;

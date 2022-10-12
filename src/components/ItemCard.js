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

const ItemCard = ({ item, openModal, selection }) => {
  const { initialForm, batterySelected, setBattery } =
    useContext(SummaryContext);
  const [computedData, setComputedData] = useState();
  useEffect(() => {
    setComputedData(batterySummary(item, initialForm));
  }, [initialForm]);

  console.log(computedData);
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 450,
          height:
            selection === "BMS"
              ? 330
              : selection === "Active Balancer"
              ? 350
              : 270,
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
              <Typography variant="h5" color="text.secondary">
                {item.name}
              </Typography>
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
              image="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Live from space album cover"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", margin: 1, textTransform: "none" }}
            onClick={openModal}
          >
            More Details
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white", margin: 1, textTransform: "none" }}
          >
            Select
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default ItemCard;

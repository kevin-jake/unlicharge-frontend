import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Divider, Fab, Typography } from "@mui/material";
import { computeTotalPrice } from "../logic/total-summary";
import { numberWithCommas } from "../util/numberFormats";

export default function SideSummary({ components, data }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handlePrice = (batterySelected, bmsSelected, abSelected) => {
    var battPrice, bmsPrice, abPrice;
    if (batterySelected && Object.hasOwn(batterySelected, "computedData")) {
      battPrice = batterySelected.computedData.totalPrice;
    }
    if (bmsSelected && Object.hasOwn(bmsSelected, "price"))
      bmsPrice = bmsSelected.price;
    if (abSelected && Object.hasOwn(abSelected, "price"))
      abPrice = abSelected.price;
    return computeTotalPrice(battPrice, bmsPrice, abPrice);
  };

  const list = (anchor, components) => (
    <Box
      sx={{ width: 400, p: 2, m: 0 }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {components}
    </Box>
  );
  console.log({ data });
  return (
    <Box
      sx={{
        margin: 0,
        top: "50%",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",
      }}
      alignItems="center"
    >
      <Fab variant="extended" onClick={toggleDrawer("right", true)}>
        Summary
        <Typography variant="caption" sx={{ m: 2 }}>
          {handlePrice(
            data.batterySelected,
            data.bmsSelected,
            data.abSelected
          ) > 0
            ? "Php" +
              numberWithCommas(
                handlePrice(
                  data.batterySelected,
                  data.bmsSelected,
                  data.abSelected
                )
              )
            : ""}
        </Typography>
      </Fab>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        <Typography variant="h4" sx={{ m: 2 }}>
          Summary
        </Typography>
        {list("right", components)}
        <Divider variant="middle" />
        <Typography variant="h5" sx={{ m: 2 }}>
          Total Price:{" "}
          {handlePrice(
            data.batterySelected,
            data.bmsSelected,
            data.abSelected
          ) > 0
            ? "Php " +
              numberWithCommas(
                handlePrice(
                  data.batterySelected,
                  data.bmsSelected,
                  data.abSelected
                )
              )
            : ""}
        </Typography>
      </Drawer>
    </Box>
  );
}

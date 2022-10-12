import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { numberWithCommas } from "../util/numberFormats";

const QuickSpecs = ({ computedData, title }) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "text.primary",
          "& div": {
            mx: 2,
            justifyContent: "center",
          },
        }}
      >
        <div>
          <Typography gutterBottom variant="caption" component="span">
            {title === "Battery" ? "Total Price" : "Price"}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Php {numberWithCommas(+computedData.totalPrice)}
          </Typography>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div>
          <Typography gutterBottom variant="caption" component="span">
            {title === "Battery" ? "Configuration" : ""}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {title === "Battery"
              ? computedData.totalSeries +
                "S " +
                computedData.totalParallel +
                "P"
              : ""}
          </Typography>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div>
          <Typography gutterBottom variant="caption" component="span">
            {title === "Battery" ? "Total Qty." : ""}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {title === "Battery" ? computedData.totalQty : ""}
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default QuickSpecs;

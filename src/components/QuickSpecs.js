import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const QuickSpecs = () => {
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
            Price
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Php 4.50
          </Typography>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div>
          <Typography gutterBottom variant="caption" component="span">
            Configuration
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            4S 11P
          </Typography>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div>
          <Typography gutterBottom variant="caption" component="span">
            Total Qty.
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            44
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default QuickSpecs;

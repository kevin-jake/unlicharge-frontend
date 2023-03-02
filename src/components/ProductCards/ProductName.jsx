import { Grid, Typography } from "@mui/material";
import React from "react";

const ProductName = ({ name, subName, openModal }) => {
  return (
    <>
      <Grid item>
        <Typography
          noWrap
          fontWeight="500"
          variant="h3"
          onClick={openModal}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          {name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption"> {subName}</Typography>
      </Grid>
    </>
  );
};

export default ProductName;

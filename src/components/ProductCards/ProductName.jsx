import { Grid, Typography } from "@mui/material";
import React from "react";

const ProductName = ({ name, subName }) => {
  return (
    <>
      <Grid item>
        <Typography noWrap variant="h4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption"> Subs</Typography>
      </Grid>
    </>
  );
};

export default ProductName;

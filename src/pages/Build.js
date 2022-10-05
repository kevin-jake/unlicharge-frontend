import { Grid } from "@mui/material";
import React from "react";
import CardsFilter from "../components/CardsFilter";
import InitialForm from "../components/InitialForm";
import ItemCard from "../components/ItemCard";
import Path from "../sections/Path";

const Build = () => {
  return (
    <>
      <InitialForm />
      <Path />
      <CardsFilter />
      <Grid
        container
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        sx={{ padding: 2 }}
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <ItemCard />
        </Grid>

        <Grid item xs={3}>
          <ItemCard />
        </Grid>

        <Grid item xs={3}>
          <ItemCard />
        </Grid>

        <Grid item xs={3}>
          <ItemCard />
        </Grid>

        <Grid item xs={3}>
          <ItemCard />
        </Grid>
      </Grid>
    </>
  );
};

export default Build;

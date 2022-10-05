import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ItemCard from "../components/ItemCard";
import CardsFilter from "../components/CardsFilter";

const Home = () => {
  // TODO: Make modal dynamic
  return (
    <>
      <Box p={2}>
        <Typography align="center" variant="h4">
          Builds
        </Typography>
      </Box>
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

export default Home;

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CardsFilter from "../components/CardsFilter";
import Upload from "../components/UploadZone";

const Home = () => {
  // TODO: Make modal dynamic
  return (
    <>
      <Box p={2}>
        <Typography align="center" variant="h4">
          Builds
        </Typography>
      </Box>
      <Upload />
      <CardsFilter />
      <Grid
        container
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        sx={{ padding: 2 }}
        justify="flex-start"
        alignItems="flex-start"
      ></Grid>
    </>
  );
};

export default Home;

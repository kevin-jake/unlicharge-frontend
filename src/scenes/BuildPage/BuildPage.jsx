import { Box, Container, Fab, Grid } from "@mui/material";
import React from "react";
import ProductCard from "../../components/ProductCards/ProductCards";
import CategoryCards from "../../components/CategoryCards";
import InitialParams from "./InitialParams";
import PageWrapper from "../../components/wrappers/PageWrapper";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import ProductDialogContent from "../../components/ProductDialogContent";
import SortFilter from "../../components/SortFilter";
import SummarySideBar from "../SummarySideBar/SummarySideBar";

function BuildPage() {
  return (
    <PageWrapper title="Estimate your build">
      <Box
        width="100%"
        padding="1rem 2% 0.1rem 2%"
        display="block"
        justifyContent="space-between"
      >
        <InitialParams />
      </Box>
      <Grid container>
        <CategoryCards />
        <CategoryCards />
        <CategoryCards />
      </Grid>
      <Grid container>
        <Grid paddingX="0.5rem" container spacing={0.5} item md={9}>
          <Grid item xs={12}>
            <SortFilter />
          </Grid>
          {/* TODO: Make this responsive 3 cards if large screen and one card on mobile */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
        <Grid
          item
          lg={3}
          sx={{
            borderRadius: "0.75rem",
            height: "fit-content",
            top: "1rem",
            position: "sticky",
            overflow: "hidden",
          }}
        >
          <SummarySideBar />
        </Grid>
      </Grid>
      <Box
        sx={{
          margin: "1rem",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
      >
        {/* TODO: Make dynamic or mobile responsive */}
        <Fab variant="extended" size="small" color="primary" aria-label="add">
          Summary
        </Fab>
      </Box>
      <DialogWrapper showModal={true}>
        <ProductDialogContent />
      </DialogWrapper>
    </PageWrapper>
  );
}

export default BuildPage;

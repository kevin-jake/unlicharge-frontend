import { Box, Container, Fab, Grid } from "@mui/material";
import React, { useState } from "react";
import ProductCard from "../../components/ProductCards/ProductCards";
import CategoryCards from "../../components/CategoryCards";
import InitialParams from "./InitialParams";
import PageWrapper from "../../components/wrappers/PageWrapper";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import ProductDialogContent from "../ProductDialog/ProductDialogContent";
import SortFilter from "../../components/SortFilter";
import SummarySideBar from "../SummarySideBar/SummarySideBar";
import CRUDDialogContent from "../FormDialog/CRUDDialogContent";

function BuildPage() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  console.log(
    "🚀 ~ file: BuildPage.jsx:14 ~ BuildPage ~ isProductModalOpen:",
    isProductModalOpen
  );

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
          <ProductCard openModal={() => setIsProductModalOpen(true)} />
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
      <DialogWrapper
        isOpen={isProductModalOpen}
        title="testTESTASAASDFasdfasdfasdfasdf"
        closeModal={() => setIsProductModalOpen(false)}
      >
        <ProductDialogContent />
      </DialogWrapper>
      <DialogWrapper isOpen={false} title="Create Battery">
        <CRUDDialogContent />
      </DialogWrapper>
    </PageWrapper>
  );
}

export default BuildPage;

import { Box, Grid } from "@mui/material";
import React from "react";
import ProductCard from "../../components/ProductCards/ProductCards";
import CategoryCards from "../../components/CategoryCards";
import InitialParams from "./InitialParams";
import PageWrapper from "../../components/wrappers/PageWrapper";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import ProductDialogContent from "../../components/ProductDialogContent";
import SortFilter from "../../components/SortFilter";

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
      <Grid paddingX="0.5rem" container spacing={0.5}>
        <Grid item xs={12}>
          <SortFilter />
        </Grid>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Grid>
      <DialogWrapper>
        <ProductDialogContent />
      </DialogWrapper>
    </PageWrapper>
  );
}

export default BuildPage;

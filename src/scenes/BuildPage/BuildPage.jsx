import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import ProductCard from "../../components/ProductCards";
import CategoryCards from "../../components/CategoryCards";
import InitialParams from "./InitialParams";
import PageWrapper from "../../components/wrappers/PageWrapper";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";

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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Grid>
      {/* TODO: Add a product card modal template */}
      <DialogWrapper>
        <ProductCard />
      </DialogWrapper>
    </PageWrapper>
  );
}

export default BuildPage;

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
import Navbar from "../navbar/Navbar";
import CategoryCards from "./CategoryCards";
import InitialParams from "./InitialParams";

function BuildPage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 2% 0.1rem 2%"
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-between"
      >
        <Typography color={palette.neutral.dark} variant="h2" fontWeight="500">
          Estimate your build
        </Typography>
      </Box>
      <Box
        width="100%"
        padding="1rem 2% 0.1rem 2%"
        display="block"
        justifyContent="space-between"
      >
        <InitialParams />
      </Box>
      <Grid marginY="0.5rem" container>
        <CategoryCards />
        <CategoryCards />
        <CategoryCards />
      </Grid>
      <Grid container spacing={0.25}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Grid>
    </Box>
  );
}

export default BuildPage;

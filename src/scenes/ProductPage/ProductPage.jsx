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
import DataFilters from "../../components/DataFilters";
import Navbar from "../navbar/Navbar";
import PostsWidget from "../widgets/PostsWidget";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryCards from "../../components/CategoryCards";

function ProductPage() {
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
        <Typography color={palette.neutral.dark} variant="h3" fontWeight="500">
          Products
        </Typography>
      </Box>
      <Grid marginY="0.5rem" container>
        <CategoryCards />
        <CategoryCards />
        <CategoryCards />
      </Grid>
      <Box
        width="100%"
        padding="2rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <DataFilters />
        <Grid container spacing={0.25}>
          <PostsWidget />
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductPage;

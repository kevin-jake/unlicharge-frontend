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
        <Box
          sx={{
            position: isNonMobileScreens ? "sticky" : "static",
            top: "1rem",
            height: "100%",
          }}
          flexBasis={isNonMobileScreens ? "13%" : undefined}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="filters"
              id="filters"
            >
              <Typography variant="h5">Filter</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DataFilters />
            </AccordionDetails>
          </Accordion>
        </Box>
        <Grid container spacing={0.25}>
          <PostsWidget />
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductPage;

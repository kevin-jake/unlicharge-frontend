import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Navbar from "../navbar/Navbar";
import InitialParams from "./InitialParams";
import WidgetWrapper from "../../components/WidgetWrapper";

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
        <WidgetWrapper>
          <Typography
            marginBottom="1rem"
            color={palette.neutral.medium}
            variant="h5"
            fontWeight="500"
          >
            Initial Parameters:
          </Typography>
          <InitialParams />
        </WidgetWrapper>
      </Box>
    </Box>
  );
}

export default BuildPage;

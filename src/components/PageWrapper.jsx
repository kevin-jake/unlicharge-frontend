import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Navbar from "../scenes/NavBar/Navbar";

const PageWrapper = ({ title, children }) => {
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
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default PageWrapper;

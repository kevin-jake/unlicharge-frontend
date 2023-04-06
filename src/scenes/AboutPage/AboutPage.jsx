import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import PageWrapper from "../../components/wrappers/PageWrapper";
import AboutContent from "./AboutContent";

const AboutPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <PageWrapper title="About">
      <Box
        width="100%"
        padding="2rem 3%"
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box display="flex" gap={3} flexDirection="row">
          <AboutContent />
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default AboutPage;

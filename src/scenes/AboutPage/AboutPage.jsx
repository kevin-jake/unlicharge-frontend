import React from "react";
import SendEmail from "./SendEmail";
import { Box, Typography, useMediaQuery } from "@mui/material";
import PageWrapper from "../../components/wrappers/PageWrapper";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import AboutContent from "./AboutContent";
import DonationContent from "./DonationContent";

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
      <Box
        width="100%"
        display="flex"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="0.5rem"
        justifyContent="center"
      >
        <DonationContent />
        <WidgetWrapper
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h4">Send us a message</Typography>
          <SendEmail />
        </WidgetWrapper>
      </Box>
    </PageWrapper>
  );
};

export default AboutPage;

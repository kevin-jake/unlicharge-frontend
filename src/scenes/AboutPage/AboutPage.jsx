import React from "react";
import SendEmail from "./SendEmail";
import { Box, Typography, useMediaQuery } from "@mui/material";
import PageWrapper from "../../components/wrappers/PageWrapper";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";

const AboutPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <PageWrapper title="About">
      <Box
        width="100%"
        padding="2rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
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

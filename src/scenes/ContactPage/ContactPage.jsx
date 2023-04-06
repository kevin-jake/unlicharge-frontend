import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import DonationContent from "./DonationContent";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import SendEmail from "./SendEmail";
import PageWrapper from "../../components/wrappers/PageWrapper";

const ContactPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <PageWrapper title="Contact Us">
      <Box
        width="100%"
        display="flex"
        paddingX="3%"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        marginY="0.5rem"
        gap="0.5rem"
        justifyContent="center"
      >
        <WidgetWrapper
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h4">Send us a message</Typography>
          <SendEmail />
        </WidgetWrapper>
        <DonationContent />
      </Box>
    </PageWrapper>
  );
};

export default ContactPage;

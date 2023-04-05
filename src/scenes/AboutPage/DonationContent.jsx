import React from "react";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import { Box, Typography, useMediaQuery } from "@mui/material";
import gcash from "../../assets/gcash.png";

const DonationContent = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <WidgetWrapper
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={5}
      width={isNonMobileScreens ? "50%" : "100%"}
    >
      <Box gap={5} display="flex" flexDirection="column">
        <Typography variant="h5">
          At Unlicharge, we are constantly working to improve our web
          application and add new features that will benefit our users.
        </Typography>

        <Typography variant="h5">
          However, developing and maintaining such a platform requires a
          significant amount of resources and funding. We would greatly
          appreciate any donations made through Gcash to help us in our mission
          of promoting sustainable energy and making renewable energy accessible
          to everyone.
        </Typography>
        <Typography variant="h5">
          Your donation will go towards funding future plans and features of the
          website, allowing us to continue providing a valuable service to our
          users.
        </Typography>
        <Typography variant="h5">
          Thank you for considering supporting Unlicharge!
        </Typography>
      </Box>
      <Box>
        <img width="auto" height="400px" alt="gcash" src={gcash} />
      </Box>
    </WidgetWrapper>
  );
};

export default DonationContent;

import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import DialogWrapper from "../../components/wrappers/DialogWrapper";

const TermsDialogContent = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      width="100%"
      padding="2rem 3%"
      display="flex"
      flexDirection={isNonMobileScreens ? "row" : "column"}
      gap="0.5rem"
      justifyContent="center"
    >
      <WidgetWrapper
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={5}
        width="100%"
      >
        <Box display="flex" gap={2} flexDirection="column">
          <Typography variant="h3" fontWeight="bold">
            Terms of use
          </Typography>

          <Typography variant="body">
            Please read these Terms of Use ("Terms", "Terms of Use") carefully
            before using the Unlicharge website ("the website", "our website")
            operated by Unlicharge ("us", "we", or "our").
          </Typography>
          <Typography variant="body">
            Your access to and use of the website is conditioned on your
            acceptance of and compliance with these Terms. By accessing or using
            the website, you agree to be bound by these Terms. If you disagree
            with any part of the Terms, then you may not access the website.
          </Typography>
        </Box>

        <Box display="flex" gap={2} flexDirection="column">
          <Typography variant="h4" fontWeight="bold">
            Intellectual Property
          </Typography>

          <Typography variant="body">
            All content on this website, including text, graphics, logos,
            images, videos, and any other material, is the property of
            Unlicharge or its content creators and is protected by copyright and
            other intellectual property laws. You may not reproduce, distribute,
            or create derivative works from any content on this website without
            the express written permission of Unlicharge or the respective
            content creator.
          </Typography>
        </Box>
        <Box display="flex" gap={2} flexDirection="column">
          <Typography variant="h4" fontWeight="bold">
            Affiliate Disclosure
          </Typography>

          <Typography variant="body">
            Unlicharge participates in various affiliate marketing programs,
            which means we may receive commissions on products purchased through
            our links to retailer sites. Our participation in these programs
            does not affect the content we provide, and we only promote products
            we believe will be of value to our users.
          </Typography>
        </Box>
        <Box display="flex" gap={2} flexDirection="column">
          <Typography variant="h4" fontWeight="bold">
            Third-Party Links
          </Typography>

          <Typography variant="body">
            Our website may contain links to third-party websites or services
            that are not owned or controlled by Unlicharge. We have no control
            over and assume no responsibility for the content, privacy policies,
            or practices of any third-party websites or services. You
            acknowledge and agree that Unlicharge shall not be responsible or
            liable, directly or indirectly, for any damage or loss caused or
            alleged to be caused by or in connection with the use of or reliance
            on any such content, goods, or services available on or through any
            such websites or services.
          </Typography>
        </Box>

        <Box display="flex" gap={2} flexDirection="column">
          <Typography variant="h4" fontWeight="bold">
            Disclaimer
          </Typography>

          <Typography variant="body">
            Although we strive to provide accurate and up-to-date information,
            the information on our website is for general informational purposes
            only. We make no warranties or representations regarding the
            accuracy, completeness, reliability, or suitability of the
            information provided. You are solely responsible for any reliance
            you place on the information found on our website.
          </Typography>
        </Box>

        <Box display="flex" gap={2} flexDirection="column">
          <Typography variant="h4" fontWeight="bold">
            Limitation of Liability
          </Typography>

          <Typography variant="body">
            In no event shall Unlicharge, its affiliates, directors, employees,
            or agents be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of our
            website, any third-party conduct or content, or any unauthorized
            access, use, or alteration of your transmissions or content.
          </Typography>
        </Box>

        <Box display="flex" gap={2} flexDirection="column" marginBottom="1rem">
          <Typography variant="h4" fontWeight="bold">
            Changes to Terms of Use
          </Typography>

          <Typography variant="body">
            We reserve the right to modify or replace these Terms at any time at
            our sole discretion. By continuing to access or use our website
            after these revisions become effective, you agree to be bound by the
            revised Terms. If you do not agree with the new Terms, please stop
            using our website immediately.
          </Typography>
        </Box>
      </WidgetWrapper>
    </Box>
  );
};

export default TermsDialogContent;

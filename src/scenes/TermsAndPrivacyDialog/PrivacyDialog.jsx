import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";

const PrivacyDialogContent = () => {
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
            Privacy Policy
          </Typography>

          <Typography variant="body">
            At Unlicharge, we highly value our users' privacy and are dedicated
            to safeguarding their personal information. This Privacy Policy
            provides a comprehensive overview of the type of data we collect,
            how we use it, and the measures we employ to protect it. By using
            our website, you acknowledge and agree to comply with the policy's
            terms and conditions.
          </Typography>
          <Typography variant="body">
            We may collect certain personally identifiable information while you
            are using Unlicharge, such as your email address (if you opt to sign
            up for our newsletter or other communications), cookies, and usage
            data. We use this information to analyze user behavior, enhance our
            website's functionality, and offer tailored content and advertising.
            We may also use your email address to send you newsletters,
            promotional materials, or other information related to our site.
          </Typography>
          <Typography variant="body">
            Cookies are small data files that may include an anonymous unique
            identifier, which are sent to your browser and stored on your
            computer's hard drive. Similar to most websites, we use cookies to
            collect information about your visits to our site. However, you can
            set your browser to block cookies or alert you when they are being
            sent. If you choose to decline cookies, some parts of our site may
            be unavailable to you.
          </Typography>
          <Typography variant="body">
            At Unlicharge, we participate in various affiliate marketing
            programs, which means we may receive commissions on products
            purchased through our links to retailer sites. When you click on one
            of these affiliate links and make a purchase, we may earn a small
            commission. We are not responsible for the privacy policies,
            content, or practices of any third-party websites or services we
            link to.
          </Typography>
          <Typography variant="body">
            We take the security of your personal information very seriously,
            and we strive to employ commercially acceptable measures to protect
            your data. However, please note that no method of electronic storage
            or transmission over the internet is completely secure. While we
            will do our best to safeguard your personal information, we cannot
            guarantee its absolute security.
          </Typography>
          <Typography variant="body">
            We reserve the right to amend or modify this Privacy Policy at any
            time without prior notice. Your continued use of our website after
            we post any updates or changes to this policy will constitute your
            acceptance of the modifications and agreement to abide by them.
          </Typography>
        </Box>
      </WidgetWrapper>
    </Box>
  );
};

export default PrivacyDialogContent;

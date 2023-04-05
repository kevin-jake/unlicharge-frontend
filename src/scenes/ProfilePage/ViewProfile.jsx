import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const ViewProfile = ({ user }) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box
      display="grid"
      gap="30px"
      marginTop="1.5rem"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <Box
        gap={2}
        display="flex"
        justifyContent="center"
        sx={{ gridColumn: "span 2" }}
      >
        <Typography variant="body" color={palette.primary.light}>
          Email
        </Typography>
        <Typography variant="body">{user?.email}</Typography>
      </Box>
      <Box
        gap={2}
        display="flex"
        justifyContent="center"
        sx={{ gridColumn: "span 2" }}
      >
        <Typography variant="body" color={palette.primary.light}>
          Username
        </Typography>
        <Typography variant="body">{user?.email}</Typography>
      </Box>
      <Box
        gap={2}
        display="flex"
        justifyContent="center"
        sx={{ gridColumn: "span 2" }}
      >
        <Typography variant="body" color={palette.primary.light}>
          Full Name
        </Typography>
        <Typography variant="body">
          {user?.firstName} {user?.lastName}
        </Typography>
      </Box>
      <Box
        gap={2}
        display="flex"
        justifyContent="center"
        sx={{ gridColumn: "span 4" }}
      >
        <Typography variant="body" color={palette.primary.light}>
          Location
        </Typography>
        <Typography variant="body">{user?.location}</Typography>
      </Box>
      <Box
        gap={2}
        display="flex"
        justifyContent="center"
        sx={{ gridColumn: "span 4" }}
      >
        <Typography variant="body" color={palette.primary.light}>
          Mobile Number
        </Typography>
        <Typography variant="body">{user?.mobileNumber}</Typography>
      </Box>
    </Box>
  );
};

export default ViewProfile;

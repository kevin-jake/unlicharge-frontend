import { Box, Typography, useTheme } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import React from "react";

const NoResults = () => {
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={300}
      flexDirection="column"
    >
      <ErrorIcon fontSize="large" sx={{ color: palette.neutral.medium }} />
      <Typography
        variant="h5"
        margin="1rem"
        sx={{ color: palette.neutral.medium }}
      >
        No results found.
      </Typography>
    </Box>
  );
};

export default NoResults;

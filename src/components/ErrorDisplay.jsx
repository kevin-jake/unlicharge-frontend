import { Alert, Stack, useMediaQuery } from "@mui/material";
import React from "react";

const ErrorDisplay = ({ issues }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:500px)");
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");

  return (
    <>
      {Boolean(errors.length) && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="baseline"
          sx={{ width: "100%", marginY: "0.5rem" }}
          spacing={0.5}
        >
          {errors.map((error, index) => (
            <Alert
              key={`err-${index}`}
              sx={{
                width: "100%",
                flexDirection: isNonMobileScreens ? "row" : "column",
              }}
              severity="error"
              width="100%"
            >
              {error.message}
            </Alert>
          ))}
        </Stack>
      )}
      {Boolean(warnings.length) && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="baseline"
          sx={{ width: "100%", marginY: "0.5rem" }}
          spacing={0.5}
        >
          {warnings.map((warn, index) => (
            <Alert
              key={`warn-${index}`}
              variant="outlined"
              severity="warning"
              sx={{
                width: "100%",
                flexDirection: isNonMobileScreens ? "row" : "column",
              }}
            >
              {warn.message}
            </Alert>
          ))}
        </Stack>
      )}
    </>
  );
};

export default ErrorDisplay;

import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "../../components/wrappers/FlexBetween";
import isObjectEmpty from "../../util/isObjectEmpty";
import { numberWithCommas } from "../../util/numberFormats";
import PriceCompute from "../ProductCards/PriceCompute";

const SummaryCardContent = ({ specs, openModal }) => {
  const { palette } = useTheme();
  const primary = palette.primary.main;
  return (
    <Grid item xs={12} sx={{ width: "100%" }}>
      <FlexBetween marginY="1rem" sx={{ justifyContent: "flex-start" }}>
        <Box
          width="50px"
          height="50px"
          sx={{ cursor: "pointer" }}
          onClick={openModal}
        >
          <img
            style={{ objectFit: "cover", borderRadius: "0.75rem" }}
            width="50px"
            height="50px"
            alt={specs.name}
            src={specs.imagePath}
          />
        </Box>
        <Grid
          item
          xs
          container
          direction="column"
          marginLeft="1rem"
          wrap="nowrap"
          zeroMinWidth
          sx={{
            "& > div": {
              marginTop: "0.5rem",
            },
          }}
        >
          <Box onClick={openModal} sx={{ cursor: "pointer" }}>
            {!isObjectEmpty(specs.computedSpecs) ? (
              <>
                {specs.name}
                <PriceCompute
                  computedSpecs={specs.computedSpecs}
                  flexDirection="row"
                  isSummary={true}
                />
              </>
            ) : (
              <>
                {specs.name}
                <Typography
                  variant="h4"
                  fontWeight="700"
                  sx={{
                    color: primary,
                    cursor: "pointer",
                  }}
                >
                  {`Php ${
                    (specs.pricePerPc && numberWithCommas(specs.pricePerPc)) ||
                    numberWithCommas(specs.price)
                  }`}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </FlexBetween>
    </Grid>
  );
};

export default SummaryCardContent;

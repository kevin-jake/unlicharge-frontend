import { Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../wrappers/FlexBetween";

const ProductName = ({ name, subName, openModal, publishStatus }) => {
  return (
    <>
      <Grid item>
        <FlexBetween gap="1rem">
          <Typography
            noWrap
            fontWeight="500"
            variant="h3"
            onClick={openModal}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          {publishStatus !== "Approved" && (
            <Stack direction="row" spacing={1}>
              <Chip label={publishStatus} variant="outlined" />
            </Stack>
          )}
        </FlexBetween>
      </Grid>
    </>
  );
};

export default ProductName;

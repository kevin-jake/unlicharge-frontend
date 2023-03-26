import { Box, Divider, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/wrappers/FlexBetween";

const CreatorInfo = ({ creator, productCreated, productUpdated }) => {
  return (
    <FlexBetween gap="0.3rem" sx={{ justifyContent: "center" }}>
      <FlexBetween gap="0.5rem">
        <UserImage size="30px" image={creator?.imagePath} />
        <Box
          display="flex"
          sx={{
            "& hr": {
              mx: 1,
            },
            "& .css-1idn90j-MuiGrid-root": {
              display: "flex",
              justifyContent: "center",
            },
          }}
          alignItems="center"
          justifyContent="center"
          width="auto"
          height="fit-content"
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="caption">
              This product is created by:
            </Typography>
            <Typography variant="body">{creator?.username}</Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box display="flex" flexDirection="column">
            <Typography variant="caption">
              Created At: {moment(productCreated).format("lll")}
            </Typography>
            <Typography variant="caption">
              Last Updated: {moment(productUpdated).fromNow()}
            </Typography>
          </Box>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default CreatorInfo;

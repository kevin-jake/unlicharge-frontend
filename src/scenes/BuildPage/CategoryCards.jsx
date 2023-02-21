import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";

const CategoryCards = () => {
  return (
    <Grid item xs={4} padding="1rem">
      <WidgetWrapper>
        {/* <Friend /> */}
        <Typography sx={{ mt: "1rem" }}> Test</Typography>
        <FlexBetween mt="0.25rem">
          {/* <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton></IconButton>
              <Typography></Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography></Typography>
            </FlexBetween>
          </FlexBetween> */}

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </WidgetWrapper>
    </Grid>
  );
};

export default CategoryCards;

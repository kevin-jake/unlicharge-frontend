import { Box, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../../../components/wrappers/WidgetWrapper";
import React, { useState } from "react";
import UserImage from "../../../components/UserImage";
import FlexBetween from "../../../components/wrappers/FlexBetween";
import moment from "moment";

const CommentTab = ({ comments }) => {
  const { palette } = useTheme();
  const main = palette.compliment.light;
  const commentColor = palette.neutral.main;
  console.log("🚀 ~ file: CommentTab.jsx:6 ~ CommentTab ~ comments:", comments);
  return (
    <Stack spacing={1}>
      {comments?.length > 0 && (
        <>
          <Divider />
          {comments.map((comment, i) => (
            <React.Fragment key={`${comment.userId?.id}-${i}`}>
              <Grid container item xs={12}>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <UserImage size="40px" image={comment.userId?.imagePath} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6" sx={{ color: main, pl: "1rem" }}>
                    {comment.userId?.username}
                    <Typography
                      variant="caption"
                      sx={{ color: palette.neutral.mediumMain, pl: "1rem" }}
                    >
                      {moment(comment.createdAt).fromNow()}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body"
                    sx={{
                      color: commentColor,
                      m: "0.5rem 0",
                      pl: "1rem",
                      wordBreak: "break-word",
                    }}
                  >
                    {comment.body}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
            </React.Fragment>
          ))}
        </>
      )}
    </Stack>
  );
};

export default CommentTab;

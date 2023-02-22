import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state/state";
import UserImage from "./UserImage";

const ProductCards = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <Grid item s={12} xs={12} md={4}>
      <WidgetWrapper m="0.25rem" flexBasis="50%">
        <FlexBetween marginY="0.25rem" sx={{ justifyContent: "flex-start" }}>
          <Box width="130px" height="130px">
            <img
              style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              width="130px"
              height="130px"
              alt="user"
              src="/test.jpg"
            />
          </Box>
          {/* TODO: Extract this to a new component */}
          <Grid
            item
            xs
            container
            direction="column"
            marginX="1rem"
            wrap="nowrap"
            zeroMinWidth
            sx={{
              "& > div": {
                my: 0.25,
              },
            }}
          >
            <Grid item>
              <Typography noWrap variant="h4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption"> Subs</Typography>
            </Grid>
            {/* TODO: Extract this to a new component */}
            <Grid item>
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
                <Grid container item>
                  <Grid item xs={12}>
                    <Typography variant="body"> Price</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4"> test</Typography>
                  </Grid>
                </Grid>
                <Divider
                  color={primary}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                <Grid container item>
                  <Grid item xs={12}>
                    <Typography variant="body"> Capacity</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4"> test</Typography>
                  </Grid>
                </Grid>
                <Divider
                  color={primary}
                  orientation="vertical"
                  variant="middle"
                  flexItem
                />
                <Grid container item>
                  <Grid item xs={12}>
                    <Typography variant="body"> Quantity</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4"> test</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* TODO: Extract this to a new component */}
            <Grid item zeroMinWidth>
              <List
                dense
                sx={{
                  "& span": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    width: "-webkit-fill-available",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  },
                  columns: 2,
                }}
              >
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText primary="testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest" />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText primary="test" />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText primary="test" />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText primary="test" />
                </ListItem>
                <ListItem sx={{ display: "list-item" }}>
                  <ListItemText primary="test" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </FlexBetween>
        {/* TODO: Extract this to a new component */}
        <FlexBetween gap="0.3rem">
          <FlexBetween gap="0.5rem">
            <UserImage size="20px" />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="body"> test</Typography>
              <Typography variant="caption"> test</Typography>
            </Box>
          </FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </WidgetWrapper>
    </Grid>
  );
};

export default ProductCards;

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
import FlexBetween from "../wrappers/FlexBetween";
import WidgetWrapper from "../wrappers/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setPost } from "../../store/slices/auth/authSlice";
import UserImage from "../UserImage";
import ProductName from "./ProductName";
import PriceCompute from "./PriceCompute";
import QuickSpecs from "./QuickSpecs";
import ProductCardFooter from "./ProductCardFooter";

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
  openModal,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);
  // const {loggedInUserId: _id} = useSelector(selectUser);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  // const patchLike = async () => {
  //   const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
  //     method: "PATCH",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userId: loggedInUserId }),
  //   });
  //   const updatedPost = await response.json();
  //   dispatch(setPost({ post: updatedPost }));
  // };

  return (
    <Grid item s={12} xs={12} md={6}>
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
            <ProductName
              openModal={openModal}
              // name subName
            />
            <PriceCompute />
            <QuickSpecs />
          </Grid>
        </FlexBetween>
        <ProductCardFooter />
      </WidgetWrapper>
    </Grid>
  );
};

export default ProductCards;

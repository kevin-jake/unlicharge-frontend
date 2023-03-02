import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import { Box, Grid, Typography, useTheme } from "@mui/material";
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
import moment from "moment";
import { numberWithCommas } from "../../util/numberFormats";

const ProductCards = ({
  productId,
  specs,
  creator,
  openModal,
  isInitParamsPresent = false,
  isSummaryOpen,
}) => {
  const dispatch = useDispatch();
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
    <Grid item s={12} xs={12} md={isSummaryOpen ? 6 : 4}>
      <WidgetWrapper m="0.25rem">
        <ProductName openModal={openModal} name={specs.name} />
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
                marginTop: "0.5rem",
              },
            }}
          >
            {isInitParamsPresent ? (
              <PriceCompute />
            ) : (
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="700"
                  sx={{ color: primary }}
                >
                  {`Php ${
                    (specs.pricePerPc && numberWithCommas(specs.pricePerPc)) ||
                    numberWithCommas(specs.price)
                  }`}
                </Typography>
              </Box>
            )}
            <QuickSpecs specs={specs} />
          </Grid>
        </FlexBetween>
        <ProductCardFooter
          creatorImage={creator.imagePath}
          creatorName={creator.username}
          lastUpdated={moment(specs.updatedAt).fromNow()}
        />
      </WidgetWrapper>
    </Grid>
  );
};

export default ProductCards;

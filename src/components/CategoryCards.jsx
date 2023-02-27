import {
  Battery1BarOutlined,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import FlexBetween from "./wrappers/FlexBetween";
import Friend from "./Friend";
import WidgetWrapper from "./wrappers/WidgetWrapper";

const CategoryCards = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  return (
    <Grid item xs={4} padding="1rem">
      <Card
        sx={{
          backgroundColor: palette.background.alt,
          borderRadius: "0.75rem",
        }}
      >
        <CardActionArea>
          <CardContent>
            <FlexBetween mt="0.25rem" sx={{ justifyContent: "center" }}>
              <FlexBetween mt="0.25rem">
                <Battery1BarOutlined fontSize="large" />
                <Typography variant="h4" sx={{ marginLeft: "0.25rem" }}>
                  Battery
                </Typography>
              </FlexBetween>
            </FlexBetween>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CategoryCards;

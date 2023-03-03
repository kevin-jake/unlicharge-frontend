import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../store/slices/products/productSlice";
import FlexBetween from "./wrappers/FlexBetween";

const CategoryCards = ({ category, icon, refetch }) => {
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  return (
    <Grid item xs={4} padding="1rem">
      <Card
        sx={{
          backgroundColor: palette.background.alt,
          borderRadius: "0.75rem",
        }}
        onClick={() => {
          refetch();
          dispatch(
            setCategory(
              category === "Active Balancer" ? "ab" : category.toLowerCase()
            )
          );
        }}
      >
        <CardActionArea>
          <CardContent>
            <FlexBetween mt="0.25rem" sx={{ justifyContent: "center" }}>
              <FlexBetween mt="0.25rem">
                {icon}
                <Typography variant="h4" sx={{ marginLeft: "0.25rem" }}>
                  {category}
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

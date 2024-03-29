import { Battery1BarOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/wrappers/FlexBetween";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import { useGetCategoryObject } from "../../hooks/useGetCategoryObject";
import { selectSelection } from "../../store/slices/buildpage/buildpageSlice";
import SummaryCardContent from "./SummaryCardContent";

const SummaryCards = ({ openModal, category }) => {
  const selectedItems = useSelector(selectSelection);
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1300px)");
  const { categoryDisplayName, icon } = useGetCategoryObject(category);

  return (
    <WidgetWrapper
      width="100%"
      sx={{ padding: !isNonMobileScreens && "0.3rem !important" }}
    >
      <Card
        sx={{
          backgroundColor: palette.background.alt,
          borderRadius: "0.75rem",
        }}
      >
        <CardContent>
          <FlexBetween
            sx={{ justifyContent: "flex-start", flexDirection: "column" }}
          >
            <Box display="flex" justifyContent="center">
              {icon}
              <Typography variant="h5" sx={{ marginLeft: "0.25rem" }}>
                {categoryDisplayName}
              </Typography>
            </Box>
            {selectedItems[category].hasOwnProperty("id") ? (
              <SummaryCardContent
                specs={selectedItems[category]}
                openModal={openModal}
              />
            ) : (
              <Typography
                variant="body"
                color={palette.neutral.medium}
                margin="0.5rem"
              >
                {`No selected ${categoryDisplayName} yet`}{" "}
              </Typography>
            )}
          </FlexBetween>
        </CardContent>
      </Card>
    </WidgetWrapper>
  );
};
export default SummaryCards;

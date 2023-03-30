import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "../../components/wrappers/FlexBetween";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import { useSelector } from "react-redux";
import ProductName from "./ProductName";
import PriceCompute from "./PriceCompute";
import QuickSpecs from "./QuickSpecs";
import { numberWithCommas } from "../../util/numberFormats";
import DialogFooter from "../../components/DialogFooter";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import {
  selectCategory,
  selectSelection,
} from "../../store/slices/buildpage/buildpageSlice";

// TODO: Add color-coding and in SortFilter add filters for Requests, Approved and Deleted
const ProductCards = ({
  specs,
  publishStatus,
  creator,
  openModal,
  isSummaryOpen,
}) => {
  const selectedItems = useSelector(selectSelection);
  const category = useSelector(selectCategory);
  const { palette } = useTheme();
  const primary = palette.primary.main;
  const [isFlipped, setIsFlipped] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1300px)");
  const isNonSmallMobileScreens = useMediaQuery("(min-width:500px)");
  const isSelected = selectedItems[category].id === specs.id;
  const isRequest = publishStatus === "Request";

  const backgroundColor = isSelected
    ? `${palette.primary.selectedCard} !important`
    : isRequest
    ? `${palette.primary.request} !important`
    : palette.background.alt;

  const handleFlip = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <Grid item s={12} xs={12} lg={isSummaryOpen ? 6 : 4} md={12}>
      <WidgetWrapper
        m="0.25rem"
        sx={{
          backgroundColor,
        }}
      >
        <ProductName
          openModal={openModal}
          name={specs.name}
          publishStatus={publishStatus}
        />
        <FlexBetween marginY="1rem" sx={{ justifyContent: "flex-start" }}>
          <Box
            width="130px"
            height="130px"
            sx={{ cursor: "pointer" }}
            onClick={openModal}
          >
            <img
              style={{ objectFit: "cover", borderRadius: "0.75rem" }}
              width="130px"
              height="130px"
              alt={specs.name}
              src={specs.imagePath}
            />
          </Box>
          <Grid
            item
            xs
            container
            direction="column"
            marginLeft="1rem"
            wrap="nowrap"
            zeroMinWidth
            sx={{
              "& > div": {
                marginTop: "0.5rem",
              },
            }}
          >
            {Boolean(specs.computedSpecs) ? (
              <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <WidgetWrapper
                  sx={{
                    backgroundColor: isSelected
                      ? `${palette.primary.selectedCompute} !important`
                      : isRequest
                      ? `${palette.primary.requestCompute} !important`
                      : `${palette.neutral.light} !important`,
                    padding: "0.5rem !important",
                    cursor: "pointer",
                  }}
                  onClick={handleFlip}
                >
                  <PriceCompute
                    computedSpecs={specs.computedSpecs}
                    flexDirection={isNonSmallMobileScreens ? "row" : "column"}
                  />
                </WidgetWrapper>

                <WidgetWrapper
                  sx={{
                    backgroundColor: isSelected
                      ? `${palette.primary.selectedCompute} !important`
                      : isRequest
                      ? `${palette.primary.requestCompute} !important`
                      : `${palette.neutral.light} !important`,
                    padding: "0.5rem !important",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleFlip}
                >
                  <Typography
                    variant="h4"
                    fontWeight="700"
                    sx={{
                      color:
                        isSelected || isRequest
                          ? palette.primary.white
                          : primary,
                    }}
                  >
                    {`Php ${
                      (specs.pricePerPc &&
                        numberWithCommas(specs.pricePerPc)) ||
                      numberWithCommas(specs.price)
                    }`}
                  </Typography>
                </WidgetWrapper>
              </ReactCardFlip>
            ) : (
              <WidgetWrapper
                sx={{
                  backgroundColor: isSelected
                    ? `${palette.primary.selectedCompute} !important`
                    : isRequest
                    ? `${palette.primary.requestCompute} !important`
                    : `${palette.neutral.light} !important`,
                  padding: "0.5rem !important",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="700"
                  sx={{
                    color:
                      isSelected || isRequest ? palette.primary.white : primary,
                  }}
                >
                  {`Php ${
                    (specs.pricePerPc && numberWithCommas(specs.pricePerPc)) ||
                    numberWithCommas(specs.price)
                  }`}
                </Typography>
              </WidgetWrapper>
            )}
            <QuickSpecs specs={specs} openModal={openModal} />
          </Grid>
        </FlexBetween>
        <DialogFooter
          isProduct={true}
          userImage={creator.imagePath}
          userName={creator.username}
          specs={specs}
        />
      </WidgetWrapper>
    </Grid>
  );
};

export default ProductCards;

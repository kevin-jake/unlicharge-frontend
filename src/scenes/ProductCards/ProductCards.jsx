import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "../../components/wrappers/FlexBetween";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import { useDispatch } from "react-redux";
import ProductName from "./ProductName";
import PriceCompute from "./PriceCompute";
import QuickSpecs from "./QuickSpecs";
import { numberWithCommas } from "../../util/numberFormats";
import DialogFooter from "../../components/DialogFooter";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

// TODO: Add color-coding and in SortFilter add filters for Requests, Approved and Deleted
const ProductCards = ({
  productId,
  specs,
  publishStatus,
  creator,
  openModal,
  isSummaryOpen,
}) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [isFlipped, setIsFlipped] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width:1300px)");

  const handleFlip = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <Grid item s={12} xs={12} lg={isSummaryOpen ? 6 : 4} md={12}>
      <WidgetWrapper
        m="0.25rem"
        sx={{
          backgroundColor:
            publishStatus === "Request" &&
            `${palette.compliment.main} !important`,
        }}
      >
        <ProductName
          openModal={openModal}
          name={specs.name}
          publishStatus={publishStatus}
        />
        <FlexBetween marginY="1rem" sx={{ justifyContent: "flex-start" }}>
          <Box width="130px" height="130px">
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
            marginX="1rem"
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
                    backgroundColor: `${palette.neutral.light} !important`,
                    padding: "0.5rem !important",
                    cursor: "pointer",
                    width: "fit-content",
                  }}
                  onClick={handleFlip}
                >
                  <PriceCompute computedSpecs={specs.computedSpecs} />
                </WidgetWrapper>

                <WidgetWrapper
                  sx={{
                    backgroundColor: `${palette.neutral.light} !important`,
                    padding: "0.5rem !important",
                    cursor: "pointer",
                  }}
                  onClick={handleFlip}
                >
                  <Typography
                    variant="h4"
                    fontWeight="700"
                    sx={{ color: primary }}
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
                  backgroundColor: `${palette.neutral.light} !important`,
                  padding: "0.5rem !important",
                }}
              >
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
              </WidgetWrapper>
            )}
            <QuickSpecs specs={specs} />
          </Grid>
        </FlexBetween>
        <DialogFooter
          isProduct={true}
          userImage={creator.imagePath}
          userName={creator.username}
          lastUpdated={specs.updatedAt}
        />
      </WidgetWrapper>
    </Grid>
  );
};

export default ProductCards;

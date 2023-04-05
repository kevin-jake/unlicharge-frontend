import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/wrappers/FlexBetween";
import { selectUser } from "../../store/slices/auth/authSlice";
import SummaryCards from "./SummaryCards";
import { selectSelection } from "../../store/slices/buildpage/buildpageSlice";
import { numberWithCommas } from "../../util/numberFormats";
import { Close } from "@mui/icons-material";

const SummarySideBar = ({ openModal, setIsSummaryOpen }) => {
  const user = useSelector(selectUser);
  const selectedItems = useSelector(selectSelection);
  const isNonMobileScreens = useMediaQuery("(min-width: 1300px)");
  const [total, setTotal] = useState(0);
  const { palette } = useTheme();
  const alt = palette.background.alt;
  const selectedArray = Object.keys(selectedItems);

  useEffect(() => {
    let newTotal = 0;
    newTotal +=
      selectedItems.battery.computedSpecs?.totalPrice ||
      selectedItems.battery.pricePerPc ||
      0;
    newTotal += +selectedItems.bms?.price || 0;
    newTotal += +selectedItems.ab?.price || 0;
    setTotal(newTotal);
  }, [selectedItems]);

  return (
    <>
      {isNonMobileScreens && (
        <Box
          height="max-content"
          minWidth="300px"
          margin="0.25rem"
          backgroundColor={alt}
          borderRadius="0.75rem"
        >
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {selectedArray.map((product) => (
              <SummaryCards
                key={`summary-${product}`}
                category={product}
                openModal={() => openModal(product)}
              />
            ))}
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              margin="0.25rem"
              padding="1rem"
            >
              <Typography variant="h4">Total:</Typography>
              <Typography variant="h3">
                Php {numberWithCommas(total)}
              </Typography>
            </Box>
          </FlexBetween>
        </Box>
      )}
      {!isNonMobileScreens && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          maxWidth="400px"
          minWidth="300px"
          backgroundColor={palette.background.default}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsSummaryOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {selectedArray.map((product) => (
              <SummaryCards
                key={`summary-${product}`}
                category={product}
                openModal={() => openModal(product)}
              />
            ))}
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              margin="0.25rem"
              padding="1rem"
            >
              <Typography variant="h4">Total:</Typography>
              <Typography variant="h3">
                Php {numberWithCommas(total)}
              </Typography>
            </Box>
          </FlexBetween>
        </Box>
      )}
    </>
  );
};

export default SummarySideBar;

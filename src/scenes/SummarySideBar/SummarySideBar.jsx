import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import FlexBetween from "../../components/wrappers/FlexBetween";
import { selectUser } from "../../store/slices/auth/authSlice";
import SummaryCards from "./SummaryCards";
import { selectSelection } from "../../store/slices/buildpage/buildpageSlice";
import { numberWithCommas } from "../../util/numberFormats";

const SummarySideBar = ({ openModal }) => {
  const user = useSelector(selectUser);
  const selectedItems = useSelector(selectSelection);
  console.log(
    "🚀 ~ file: SummarySideBar.jsx:19 ~ SummarySideBar ~ selectedItems:",
    selectedItems
  );
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
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
    console.log(
      "🚀 ~ file: SummarySideBar.jsx:54 ~ useEffect ~ newTotal:",
      newTotal
    );
    newTotal += +selectedItems.bms?.price || 0;
    newTotal += +selectedItems.ab?.price || 0;
    setTotal(newTotal);
  }, [selectedItems]);

  return (
    // TODO: Make this responsive use below if large screen if mobile use the hamburger menu navbar? Or dialog?
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
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          margin="0.25rem"
          padding="1rem"
        >
          <Typography variant="h4">Total:</Typography>
          <Typography variant="h3">Php {numberWithCommas(total)}</Typography>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default SummarySideBar;

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
  CardHeader,
  Avatar,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Divider,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Close,
  Battery1BarOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/wrappers/FlexBetween";
import { setMode } from "../../store/slices/auth/authSlice";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import CategoryCards from "../../components/CategoryCards";
import SummaryCards from "./SummaryCards";
import { selectSelection } from "../../store/slices/buildpage/buildpageSlice";
import isObjectEmpty from "../../util/isObjectEmpty";

const SummarySideBar = ({ openModal }) => {
  const user = useSelector(({ auth }) => auth.user);
  const selectedItems = useSelector(selectSelection);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [total, setTotal] = useState(0);
  const { palette } = useTheme();
  const alt = palette.background.alt;
  const selectedArray = Object.keys(selectedItems);

  // FIXME: Total computation
  useEffect(() => {
    let newTotal = total;
    console.log(
      "🚀 ~ file: SummarySideBar.jsx:49 ~ useEffect ~ newTotal:",
      newTotal
    );

    selectedArray.forEach(
      (product) =>
        (newTotal =
          product === "battery"
            ? !isObjectEmpty(selectedItems.battery.computedSpecs)
              ? newTotal + selectedItems.battery.computedSpecs.totalPrice
              : newTotal + selectedItems.battery.pricePerPc
            : newTotal + selectedItems[product].price)
    );
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
          justifyContent="flex-start"
          width="100%"
          margin="0.25rem"
          padding="1rem"
        >
          <Typography variant="h4">Total:</Typography>
          <Typography variant="h3">{total}</Typography>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default SummarySideBar;

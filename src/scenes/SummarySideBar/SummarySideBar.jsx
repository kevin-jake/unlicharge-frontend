import { useMemo, useState } from "react";
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
import { setMode } from "../../store/slices/authSlice";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import CategoryCards from "../../components/CategoryCards";

const SummarySideBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const primaryLight = palette.primary.light;
  const alt = palette.background.alt;

  const fullName = useMemo(() => "test", [user]);

  return (
    // TODO: Make this responsive use below if large screen if mobile use the hamburger menu navbar
    <Box
      height="max-content"
      minWidth="300px"
      margin="0.75rem"
      backgroundColor={alt}
      borderRadius="0.75rem"
    >
      <FlexBetween
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* TODO: Extract to a new component */}
        <WidgetWrapper width="100%">
          <Card
            sx={{
              backgroundColor: palette.background.alt,
              borderRadius: "0.75rem",
            }}
          >
            <CardContent>
              <FlexBetween margin="1rem" sx={{ justifyContent: "center" }}>
                <FlexBetween mt="0.25rem">
                  <Battery1BarOutlined fontSize="large" />
                  <Typography variant="h4" sx={{ marginLeft: "0.25rem" }}>
                    Battery
                  </Typography>
                </FlexBetween>
              </FlexBetween>
            </CardContent>
          </Card>
        </WidgetWrapper>
        <WidgetWrapper width="100%">
          <Card
            sx={{
              backgroundColor: palette.background.alt,
              borderRadius: "0.75rem",
            }}
          >
            <CardContent>
              <FlexBetween margin="1rem" sx={{ justifyContent: "center" }}>
                <FlexBetween mt="0.25rem">
                  <Battery1BarOutlined fontSize="large" />
                  <Typography variant="h4" sx={{ marginLeft: "0.25rem" }}>
                    Battery
                  </Typography>
                </FlexBetween>
              </FlexBetween>
            </CardContent>
          </Card>
        </WidgetWrapper>
        <WidgetWrapper width="100%">
          <Card
            sx={{
              backgroundColor: palette.background.alt,
              borderRadius: "0.75rem",
            }}
          >
            <CardContent>
              <FlexBetween margin="1rem" sx={{ justifyContent: "center" }}>
                <FlexBetween mt="0.25rem">
                  <Battery1BarOutlined fontSize="large" />
                  <Typography variant="h4" sx={{ marginLeft: "0.25rem" }}>
                    Battery
                  </Typography>
                </FlexBetween>
              </FlexBetween>
            </CardContent>
          </Card>
        </WidgetWrapper>
      </FlexBetween>
    </Box>
  );
};

export default SummarySideBar;

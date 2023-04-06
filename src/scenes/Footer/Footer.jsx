import {
  Box,
  Container,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/wrappers/FlexBetween";
import { Facebook } from "@mui/icons-material";
import logo from "../../assets/Unlicharge_logo.svg";
import { useDispatch } from "react-redux";
import {
  setIsPrivacyOpen,
  setIsTermsOpen,
} from "../../store/slices/auth/authSlice";

const Footer = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        top: "100%",
        position: "sticky",
      }}
    >
      <Container maxWidth="lg">
        <FlexBetween>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box onClick={() => navigate("/")}>
              <img
                src={logo}
                height={30}
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(74%) sepia(43%) saturate(405%) hue-rotate(71deg) brightness(91%) contrast(89%)",
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box
              gap={1}
              sx={{
                flexGrow: 1,
                justifyContent: "flex-start",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Typography variant="caption" color={palette.primary.light}>
                © 2023
              </Typography>
              <Box onClick={() => dispatch(setIsTermsOpen(true))}>
                <Typography
                  variant="body1"
                  color={palette.neutral.medium}
                  sx={{ cursor: "pointer" }}
                >
                  Terms
                </Typography>
              </Box>
              <Box onClick={() => dispatch(setIsPrivacyOpen(true))}>
                <Typography
                  variant="body1"
                  color={palette.neutral.medium}
                  sx={{ cursor: "pointer" }}
                >
                  Privacy
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            gap="1rem"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
            }}
          >
            {/* TODO: Enable this once facebook group is already up */}
            {/* <Box
              gap="1rem"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  borderRadius: 5,
                  borderColor: "primary.main",
                }}
                aria-label="fbgroup"
                size="large"
                color="primary"
              >
                <Facebook />
                <Typography variant="h6" marginX="1rem">
                  {" "}
                  Join our community
                </Typography>
              </IconButton>
            </Box> */}
            <Box
              gap="1rem"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body"
                color={palette.primary.main}
                onClick={() => navigate("/about")}
                sx={{ cursor: "pointer" }}
              >
                About
              </Typography>
              <Typography
                variant="body"
                color={palette.primary.main}
                onClick={() => navigate("/contact")}
                sx={{ cursor: "pointer" }}
              >
                Contact
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
      </Container>
    </Paper>
  );
};

export default Footer;

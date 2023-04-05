import {
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/wrappers/FlexBetween";
import { Facebook } from "@mui/icons-material";
import logo from "../../assets/Unlicharge_logo.svg";

const Footer = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  // TODO: Add more context
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
                height={20}
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
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="#"
                underline="none"
              >
                <Typography variant="body1" color={palette.neutral.medium}>
                  Terms
                </Typography>
              </Link>
              <Link
                rel="noopener noreferrer"
                sx={{ color: palette.primary.light }}
                target="_blank"
                href="#"
                underline="none"
              >
                <Typography variant="body1" color={palette.neutral.medium}>
                  Privacy
                </Typography>
              </Link>
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
            <Box
              gap="1rem"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <IconButton aria-label="fbgroup" size="large" color="primary">
                <Facebook />
              </IconButton>
            </Box>
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
            </Box>
          </Box>
        </FlexBetween>
      </Container>
    </Paper>
  );
};

export default Footer;

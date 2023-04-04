import { Box, Container, Paper, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "flex-start",
            display: "flex",
            my: 1,
          }}
        ></Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            margin: "1rem",
          }}
        >
          <Typography variant="caption" color={palette.primary.light}>
            Copyright ©2022. | Limited
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;

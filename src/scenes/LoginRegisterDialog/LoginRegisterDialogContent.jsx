import { Facebook, Google } from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import Form from "./Form";

const LoginRegisterDialogContent = ({ title }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  return (
    <>
      <DialogContent dividers>
        <Box>
          <Box>
            <Typography fontWeight="500" variant="h5">
              Welcome to Unlicharge.
            </Typography>
            <Typography
              variant="body"
              color={palette.neutral.dark}
              sx={{ mb: "1.5rem" }}
            >
              Estimate, create and share your builds.
            </Typography>
            <Divider sx={{ marginTop: "1rem" }} textAlign="left">
              <Typography variant="h6">{title} via</Typography>
            </Divider>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <IconButton aria-label="delete" size="large" color="primary">
                <Facebook />
              </IconButton>
              <IconButton aria-label="delete" size="large" color="primary">
                <Google />
              </IconButton>
            </Box>
            <Divider>or</Divider>
            <Form />
          </Box>
        </Box>
      </DialogContent>
    </>
  );
};

export default LoginRegisterDialogContent;

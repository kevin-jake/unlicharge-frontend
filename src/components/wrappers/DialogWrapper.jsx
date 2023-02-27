import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DialogWrapper = ({
  children,
  title = "TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest",
  showModal = true,
  closeModal,
}) => {
  const { palette } = useTheme();

  return (
    <Dialog
      open={showModal ? showModal : false}
      onClose={closeModal}
      maxWidth="lg"
      PaperProps={{
        style: { borderRadius: "0.75rem" },
      }}
    >
      <DialogTitle>
        <Typography
          noWrap
          color={palette.neutral.dark}
          variant="h4"
          fontWeight="500"
        >
          {title}
        </Typography>
        {closeModal ? (
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeModal}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWrapper;

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  useTheme,
} from "@mui/material";
import React from "react";
import CRUDForm from "./CRUDForm";

const CRUDDialogContent = (props) => {
  const { palette } = useTheme();
  return (
    <>
      <DialogContent dividers>
        <Box>
          <CRUDForm {...props} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          type="submit"
          form="crud-form"
          sx={{
            m: "0.5rem 0",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          Save
        </Button>
        <Button
          sx={{
            m: "0.5rem 0",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default CRUDDialogContent;

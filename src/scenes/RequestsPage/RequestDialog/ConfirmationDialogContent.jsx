import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";

const ConfirmationDialogContent = ({
  isLoading,
  handleFormSubmit,
  closeModal,
}) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();

  const initialValues = {
    commentBody: "",
  };

  return (
    <>
      <DialogContent dividers>
        <Box>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit} id="crud-form">
                <Box
                  display="grid"
                  gap="30px"
                  marginTop="1.5rem"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobileScreens ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    label="Comment"
                    rows={4}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.commentBody}
                    name="commentBody"
                    multiline
                    error={
                      Boolean(touched.commentBody) &&
                      Boolean(errors.commentBody)
                    }
                    helperText={touched.commentBody && errors.commentBody}
                    sx={{ gridColumn: "span 12" }}
                  />
                </Box>
              </form>
            )}
          </Formik>
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
          {isLoading ? (
            <CircularProgress
              size={20}
              sx={{ color: palette.secondary.light }}
            />
          ) : (
            "Yes"
          )}
        </Button>
        <Button
          sx={{
            m: "0.5rem 0",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
          onClick={closeModal}
        >
          No
        </Button>
      </DialogActions>
    </>
  );
};

export default ConfirmationDialogContent;

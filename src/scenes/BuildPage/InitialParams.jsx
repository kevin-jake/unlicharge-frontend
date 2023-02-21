import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import WidgetWrapper from "../../components/WidgetWrapper";

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const InitialParams = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <WidgetWrapper>
      <Typography
        marginBottom="1rem"
        color={palette.neutral.medium}
        variant="h5"
        fontWeight="500"
      >
        Initial Parameters:
      </Typography>
      <Formik initialValues={initialValuesRegister}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(12, 1fr)"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
              }}
            >
              <TextField
                label="Battery Voltage"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 6" }}
              />
              <TextField
                label="Battery Capacity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 6" }}
              />
              <Accordion sx={{ gridColumn: "span 12" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="initparam"
                  id="initparam"
                >
                  <Typography color={palette.neutral.medium} variant="text">
                    Advanced Parameters
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(12, 1fr)"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 12",
                      },
                    }}
                  >
                    <TextField
                      label="Max. Voltage"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="maxVoltage"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Min. Voltage"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="minVoltage"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="DOD"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.occupation}
                      name="dod"
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                sx={{
                  m: "1rem 0",
                  p: ".5rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Caculate
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </WidgetWrapper>
  );
};

export default InitialParams;

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInitParams,
  setInitParams,
} from "../../store/slices/buildpage/buildpageSlice";

const InitialParams = ({ refetch }) => {
  const dispatch = useDispatch();
  const initParams = useSelector(selectInitParams);
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValuesRegister = {
    inputVoltage: initParams?.inputVoltage || "",
    inputCapacity: initParams?.inputCapacity || "",
    inputmaxVoltage: initParams?.inputinputmaxVoltage || "",
    inputminVoltage: initParams?.inputinputminVoltage || "",
    inputdod: initParams?.inputdod || "",
  };

  const handleCalculate = (values) => {
    dispatch(setInitParams(values));
    refetch();
  };

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
      <Formik initialValues={initialValuesRegister} onSubmit={handleCalculate}>
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
              <FormControl fullWidth sx={{ gridColumn: "span 6" }}>
                <InputLabel id="battVoltage-label">Battery Voltage</InputLabel>
                <Select
                  labelId="battVoltage-label"
                  id="battVoltage"
                  label="Battery Voltage"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.inputVoltage}
                  name="inputVoltage"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value={12}>12 V</MenuItem>
                  <MenuItem value={24}>24 V</MenuItem>
                  <MenuItem value={48}>48 V</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField
                label="Battery Voltage"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.inputVoltage}
                name="inputVoltage"
                error={
                  Boolean(touched.inputVoltage) &&
                  Boolean(errors.inputVoltage)
                }
                helperText={touched.inputVoltage && errors.inputVoltage}
                sx={{ gridColumn: "span 6" }}
              /> */}
              <TextField
                label="Battery Capacity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.inputCapacity}
                name="inputCapacity"
                sx={{ gridColumn: "span 6" }}
              />
              <Accordion sx={{ gridColumn: "span 12", boxShadow: 0 }}>
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
                      value={values.inputmaxVoltage}
                      name="inputmaxVoltage"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Min. Voltage"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.inputminVoltage}
                      name="inputminVoltage"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="DOD"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.inputdod}
                      name="inputdod"
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

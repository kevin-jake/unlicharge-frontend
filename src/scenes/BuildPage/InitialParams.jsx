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
} from "../../store/slices/products/productSlice";

const InitialParams = ({ refetch }) => {
  const dispatch = useDispatch();
  const initParams = useSelector(selectInitParams);
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValuesRegister = {
    batteryVoltage: initParams?.batteryVoltage || "",
    batteryCapacity: initParams?.batteryCapacity || "",
    maxVoltage: initParams?.maxVoltage || "",
    minVoltage: initParams?.minVoltage || "",
    dod: initParams?.dod || "",
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
                  value={values.batteryVoltage}
                  name="batteryVoltage"
                  error={
                    Boolean(touched.batteryVoltage) &&
                    Boolean(errors.batteryVoltage)
                  }
                  helperText={touched.batteryVoltage && errors.batteryVoltage}
                >
                  <MenuItem value={12}>12 V</MenuItem>
                  <MenuItem value={24}>24 V</MenuItem>
                  <MenuItem value={48}>48 V</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField
                label="Battery Voltage"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.batteryVoltage}
                name="batteryVoltage"
                error={
                  Boolean(touched.batteryVoltage) &&
                  Boolean(errors.batteryVoltage)
                }
                helperText={touched.batteryVoltage && errors.batteryVoltage}
                sx={{ gridColumn: "span 6" }}
              /> */}
              <TextField
                label="Battery Capacity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.batteryCapacity}
                name="batteryCapacity"
                error={
                  Boolean(touched.batteryCapacity) &&
                  Boolean(errors.batteryCapacity)
                }
                helperText={touched.batteryCapacity && errors.batteryCapacity}
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
                      value={values.maxVoltage}
                      name="maxVoltage"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Min. Voltage"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.minVoltage}
                      name="minVoltage"
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="DOD"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.dod}
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

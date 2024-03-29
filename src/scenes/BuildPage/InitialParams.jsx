import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputAdornment,
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
import React, { useEffect, useState } from "react";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectInitParams,
  selectSelection,
  setInitParams,
  setUpdatedBatt,
} from "../../store/slices/buildpage/buildpageSlice";
import { useGetBatteryQuery } from "../../store/slices/products/productApiSlice";

const InitialParams = () => {
  const dispatch = useDispatch();
  const initParams = useSelector(selectInitParams);
  const { battery } = useSelector(selectSelection);
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { data, isSuccess } = useGetBatteryQuery(
    {
      initParams,
      selectedBatt: battery?.id,
    },
    {
      skip: !battery.hasOwnProperty("id"),
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUpdatedBatt(data));
    }
  }, [data]);

  const initialValuesRegister = {
    inputVoltage: initParams?.inputVoltage || "",
    inputCapacity: initParams?.inputCapacity || "",
    inputDod: initParams?.inputDod || "",
  };

  const handleCalculate = (values) => {
    dispatch(setInitParams(values));
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
              <TextField
                label="Battery Capacity"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.inputCapacity}
                name="inputCapacity"
                sx={{ gridColumn: "span 6" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Ah</InputAdornment>
                  ),
                }}
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
                        gridColumn: isNonMobile ? undefined : "span 9",
                      },
                    }}
                  >
                    <TextField
                      label="Depth of Discharge (DOD)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.inputDod}
                      name="inputDod"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      sx={{ gridColumn: "span 3" }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box display="flex" gap={1} justifyContent="flex-end">
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
              <Button
                onClick={() => {
                  setFieldValue("inputVoltage", "");
                  setFieldValue("inputDod", "");
                  setFieldValue("inputCapacity", "");
                }}
                sx={{
                  m: "1rem 0",
                  p: ".5rem",
                }}
                variant="outlined"
              >
                Reset Values
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </WidgetWrapper>
  );
};

export default InitialParams;

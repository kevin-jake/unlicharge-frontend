import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/auth/authSlice";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/wrappers/FlexBetween";
import { batterySchema, initialBatteryValues } from "./formSchemas";
import { specMap } from "../../util/specDisplayFormat";

const CRUDForm = ({ operation, category }) => {
  const [dialogType, setDialogType] = useState(operation);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isCreate = dialogType === "Create";
  const isEdit = dialogType === "Edit";
  const isDelete = dialogType === "Delete";

  const operationType = (cat) => {
    let initialValues, validationSchema;
    if (cat === "Battery") {
      initialValues = initialBatteryValues;
      validationSchema = batterySchema;
    } else if (cat === "BMS") {
      // initialValues = initialBatteryValues;
      // validationSchema = batterySchema;
    }
    return {
      initialValues,
      validationSchema,
    };
  };

  const formikProps = operationType(category);
  const batteryFields = specMap.filter((specItem) =>
    specItem.specOf.includes(category)
  );

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={formikProps.initialValues}
      validationSchema={formikProps.validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => {
        console.log("🚀 ~ file: CRUDForm.jsx:72 ~ CRUDForm ~ values:", values);
        return (
          <form onSubmit={handleSubmit} id="crud-form">
            <Box
              display="grid"
              gap="30px"
              marginTop="1.5rem"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {(isCreate || isEdit) && (
                <>
                  {batteryFields.map((field) => (
                    <TextField
                      key={field.specProps}
                      label={field.nameDisplay}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values[field.specProps]}
                      InputProps={{
                        endAdornment:
                          field.unit !== "Php" ? (
                            <InputAdornment position="end">
                              {field.unit}
                            </InputAdornment>
                          ) : (
                            ""
                          ),
                        startAdornment:
                          field.unit === "Php" ? (
                            <InputAdornment position="start">
                              {field.unit}
                            </InputAdornment>
                          ) : (
                            ""
                          ),
                      }}
                      name={field.name}
                      sx={{ gridColumn: "span 12" }}
                    />
                  ))}

                  {/* <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box> */}
                </>
              )}
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default CRUDForm;

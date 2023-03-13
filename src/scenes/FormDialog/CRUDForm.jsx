import { useCallback, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/wrappers/FlexBetween";
import {
  abSchema,
  batterySchema,
  bmsSchema,
  initialABValues,
  initialBatteryValues,
  initialBMSValues,
} from "./formSchemas";
import { specMap } from "../../util/specDisplayFormat";
import { useCreateProductRequestMutation } from "../../store/slices/products/productApiSlice";
import { useEditProductRequestMutation } from "../../store/slices/requests/requestApiSlice";

const CRUDForm = ({
  operation,
  category,
  productId,
  oldValues,
  closeModal,
  refetch,
  setIsLoading,
}) => {
  const apiCategory = useSelector(({ product }) => product.category);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isCreate = operation === "Create";
  const isEdit = operation === "Edit";
  const isDelete = operation === "Delete";

  const [createProductRequest, { isLoading: createLoading }] =
    useCreateProductRequestMutation();
  const [editProductRequest, { isLoading: editLoading }] =
    useEditProductRequestMutation();

  useEffect(() => {
    setIsLoading(createLoading);
  }, [createLoading]);

  useEffect(() => {
    setIsLoading(createLoading);
  }, [createLoading]);

  const operationType = useCallback(
    (category, operation) => {
      let initialValues, validationSchema, textFields;
      if (category === "Battery") {
        initialValues = initialBatteryValues;
        validationSchema = batterySchema;
      } else if (category === "BMS") {
        initialValues = initialBMSValues;
        validationSchema = bmsSchema;
      } else if (category === "Active Balancer") {
        initialValues = initialABValues;
        validationSchema = abSchema;
      }

      if (operation === "Edit") {
        initialValues = oldValues;
      }

      textFields = specMap.filter((specItem) =>
        specItem.specOf.includes(category)
      );
      return {
        initialValues,
        validationSchema,
        textFields,
      };
    },
    [category, operation, oldValues]
  );

  const formikProps = operationType(category, operation);

  const handleFormSubmit = async (values) => {
    console.log(
      "🚀 ~ file: CRUDForm.jsx:89 ~ handleFormSubmit ~ values:",
      values
    );
    if (isCreate)
      await createProductRequest({ category: apiCategory, specs: values });
    if (isEdit)
      await editProductRequest({
        category: apiCategory,
        id: productId,
        specs: values,
      });
    // refetch();
    // closeModal();
  };
  // TODO: Add form for delete request
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
      }) => (
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
                {formikProps.textFields.map((field) => (
                  <TextField
                    key={field.specProps}
                    label={field.nameDisplay}
                    type={field.unit ? "number" : "text"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required={field.required}
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
                    name={field.specProps}
                    error={
                      Boolean(touched[field.specProps]) &&
                      Boolean(errors[field.specProps])
                    }
                    helperText={
                      touched[field.specProps] && errors[field.specProps]
                    }
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
      )}
    </Formik>
  );
};

export default CRUDForm;

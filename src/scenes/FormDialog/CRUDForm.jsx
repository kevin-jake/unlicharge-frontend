import { useCallback, useEffect, useState } from "react";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/wrappers/FlexBetween";
import {
  abSchema,
  batterySchema,
  bmsSchema,
  deleteFormSchema,
  initialABValues,
  initialBatteryValues,
  initialBMSValues,
  initialDeleteFormValues,
} from "./formSchemas";
import { specMap } from "../../util/specDisplayFormat";
import { useCreateProductRequestMutation } from "../../store/slices/products/productApiSlice";
import {
  useDeleteProductRequestMutation,
  useEditProductRequestMutation,
} from "../../store/slices/requests/requestApiSlice";
import { uploadImage } from "../../util/uploadImage";
import { selectUser } from "../../store/slices/auth/authSlice";
import { toast } from "react-toastify";
import { selectCategory } from "../../store/slices/buildpage/buildpageSlice";

const CRUDForm = ({
  operation,
  category,
  productId,
  oldValues,
  closeModal,
  refetch,
  setIsLoading,
}) => {
  const { palette } = useTheme();
  const apiCategory = useSelector(selectCategory);
  const { role, userId } = useSelector(selectUser) || {};
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isMah, setIsMah] = useState(false);
  const isCreate = operation === "Create";
  const isEdit = operation === "Edit";
  const isDelete = operation === "Delete";

  const { specCreator, ...initValue } = oldValues;

  const [createProductRequest, { isLoading: createLoading }] =
    useCreateProductRequestMutation();
  const [editProductRequest, { isLoading: editLoading }] =
    useEditProductRequestMutation();
  const [deleteProductRequest, { isLoading: deleteLoading }] =
    useDeleteProductRequestMutation();

  useEffect(() => {
    setIsLoading(createLoading);
  }, [createLoading]);

  useEffect(() => {
    setIsLoading(editLoading);
  }, [editLoading]);

  useEffect(() => {
    setIsLoading(deleteLoading);
  }, [deleteLoading]);

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
        initialValues = initValue;
      }

      textFields = specMap.filter(
        (specItem) => specItem.specOf.includes(category) && specItem.textField
      );

      if (operation === "Delete") {
        initialValues = initialDeleteFormValues;
        validationSchema = deleteFormSchema;
      }
      return {
        initialValues,
        validationSchema,
        textFields,
      };
    },
    [category, operation, oldValues]
  );

  const notifyError = (error) => {
    const errMsg = `${error.data.message}`;
    toast.error(errMsg);
    throw new Error(errMsg);
  };

  const formikProps = operationType(category, operation);
  const handleFormSubmit = async (values) => {
    let specs = values;
    if (Boolean(values.imagePath) && typeof values.imagePath === "object") {
      try {
        specs = await uploadImage(values);
      } catch (err) {
        toast.error(err);
      }
    }
    if (isMah) {
      specs.capacity = (+specs.capacity / 1000).toFixed(2);
    }
    if (isCreate) {
      await createProductRequest({ category: apiCategory, specs })
        .unwrap()
        .then()
        .catch((error) => notifyError(error));
      if (role === "User")
        toast.success(
          "Request submitted successfully. This part will only be visible to you. Once approved it will be visible to public."
        );
      else if (role === "Admin") {
        toast.success("Part created successfully.");
      }
    }
    if (isEdit) {
      await editProductRequest({
        category: apiCategory,
        productId,
        specs,
      })
        .unwrap()
        .then()
        .catch((error) => notifyError(error));
      if (specCreator.id === userId) toast.success("Product edit saved.");
      else if (role === "User")
        toast.success(
          "Edit Request submitted successfully. Once approved it will be visible to public."
        );
    }
    if (isDelete) {
      await deleteProductRequest({
        category: apiCategory,
        productId,
        deleteBody: values,
      })
        .unwrap()
        .then()
        .catch((error) => notifyError(error));
      if (specCreator.id === userId)
        toast.success("Product deleted successfully.");
      else if (role === "User")
        toast.success(
          "Delete Request submitted successfully. Once approved it will be visible to public."
        );
    }
    refetch();
    closeModal();
  };

  const handleClickAh = () => setIsMah(!isMah);

  return (
    // TODO: Improve page layout of items
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
                <Box
                  gridColumn="span 12"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  {/* TODO: On load or upload display the image or have an option to use an image address */}
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("imagePath", acceptedFiles[0])
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
                        {!values.imagePath ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>
                              {values.imagePath.name
                                ? values.imagePath.name
                                : values.imagePath}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                {formikProps.textFields.map((field) =>
                  field.specProps === "battType" ? (
                    <FormControl
                      key="battType"
                      fullWidth
                      sx={{ gridColumn: "span 12" }}
                      error={
                        Boolean(errors.battType) && Boolean(touched.battType)
                      }
                    >
                      <InputLabel id={"battType-label"}>
                        {field.nameDisplay} *
                      </InputLabel>
                      <Select
                        labelId={"battType-label"}
                        id="battType"
                        label="Battery Type *"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        MenuProps={{
                          style: { zIndex: 3500 },
                        }}
                        value={values.battType}
                        name="battType"
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="LiFePo4">LiFePo4</MenuItem>
                        <MenuItem value="Li-On">Li-On (Lithium Ion)</MenuItem>
                        {category === "Battery" && (
                          <MenuItem value="Lead Acid">Lead Acid</MenuItem>
                        )}
                      </Select>
                      {Boolean(errors.battType) &&
                        Boolean(touched.battType) && (
                          <FormHelperText>{errors.battType}</FormHelperText>
                        )}
                    </FormControl>
                  ) : field.specProps === "portType" ? (
                    <FormControl
                      key="portType"
                      fullWidth
                      sx={{ gridColumn: "span 12" }}
                    >
                      <InputLabel id={"portType-label"}>
                        {field.nameDisplay}
                      </InputLabel>
                      <Select
                        labelId={"portType-label"}
                        id="portType"
                        label="Port Type"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={{
                          style: { zIndex: 3500 },
                        }}
                        value={values.portType}
                        name="portType"
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Common">Common</MenuItem>
                        <MenuItem value="Seperate">Seperate</MenuItem>
                      </Select>
                    </FormControl>
                  ) : field.specProps === "balancingType" ? (
                    <FormControl
                      key="balancingType"
                      fullWidth
                      sx={{ gridColumn: "span 12" }}
                    >
                      <InputLabel id={"balancingType-label"}>
                        {field.nameDisplay}
                      </InputLabel>
                      <Select
                        labelId={"balancingType-label"}
                        id="balancingType"
                        label="Balancing Type"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={{
                          style: { zIndex: 3500 },
                        }}
                        value={values.balancingType}
                        name="balancingType"
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Passive">Passive</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
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
                          field.unit === "Ah" ? (
                            <InputAdornment
                              onClick={handleClickAh}
                              position="end"
                              sx={{
                                cursor: "pointer",
                                "& p": { color: palette.primary.main },
                              }}
                            >
                              {isMah ? "mAh" : "Ah"}
                            </InputAdornment>
                          ) : field.unit !== "Php" ? (
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
                  )
                )}
              </>
            )}
            {isDelete && (
              <>
                <TextField
                  label="Reason"
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.deleteReason}
                  name="deleteReason"
                  multiline
                  error={
                    Boolean(touched.deleteReason) &&
                    Boolean(errors.deleteReason)
                  }
                  helperText={touched.deleteReason && errors.deleteReason}
                  sx={{ gridColumn: "span 12" }}
                />
              </>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default CRUDForm;

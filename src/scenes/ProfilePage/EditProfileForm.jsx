import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../../components/wrappers/FlexBetween";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const registerSchema = yup.object().shape({
  username: yup.string().required("Required"),
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Required"),
  password: yup.string().required("Required"),
  mobileNumber: yup.string().required("Required"),
});
// TODO: Add functionality on frontend and backend
const EditProfileForm = ({ user }) => {
  const { palette } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValuesRegister = user;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleFormSubmit = () => {};
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
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
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            marginTop="1.5rem"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              required
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            {/* <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            /> */}
            <TextField
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              required
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              required
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              required
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Location"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.location}
              name="location"
              error={Boolean(touched.location) && Boolean(errors.location)}
              helperText={touched.location && errors.location}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Mobile Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.mobileNumber}
              name="mobileNumber"
              required
              error={
                Boolean(touched.mobileNumber) && Boolean(errors.mobileNumber)
              }
              helperText={touched.mobileNumber && errors.mobileNumber}
              sx={{ gridColumn: "span 2" }}
            />
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
                        <Typography>{values.imagePath.name}</Typography>
                        <ModeEditOutlineIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box> */}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {false ? (
                <CircularProgress
                  size={20}
                  sx={{ color: palette.secondary.light }}
                />
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditProfileForm;

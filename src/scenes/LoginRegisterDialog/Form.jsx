import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  CircularProgress,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  FormControl,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  setIsPrivacyOpen,
  setIsTermsOpen,
  setLogin,
} from "../../store/slices/auth/authSlice";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/wrappers/FlexBetween";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../store/slices/auth/authApiSlice";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { uploadImage } from "../../util/uploadImage";
import { toast } from "react-toastify";

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
  isTermsChecked: yup
    .boolean()
    .oneOf([true], "Please read and check the Terms of Use"),
  isPrivacyChecked: yup
    .boolean()
    .oneOf([true], "Please read and check the Privacy Policy"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesRegister = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  imagePath: "",
  isTermsChecked: false,
  isPrivacyChecked: false,
};

const initialValuesLogin = {
  email: "",
  password: "",
  isTermsChecked: false,
  isPrivacyChecked: false,
};

const Form = ({ setModalType, pageType, closeModal }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "Login";
  const isRegister = pageType === "Register";
  const [login, { isLoading: loginLoading, isError }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const notifyError = (error) => {
    const errMsg = `${error.data.message}`;
    toast.error(errMsg);
    throw new Error(errMsg);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async (values, onSubmitProps) => {
    const valuesWithImage = await uploadImage(values);
    const userData = await register(values.imagePath ? valuesWithImage : values)
      .unwrap()
      .then()
      .catch((error) => notifyError(error));
    onSubmitProps.resetForm();
    dispatch(setLogin(userData));
    closeModal();
  };

  const handleLogin = async (values, onSubmitProps) => {
    const userData = await login(values)
      .unwrap()
      .then()
      .catch((error) => notifyError(error));
    onSubmitProps.resetForm();
    dispatch(setLogin(userData));
    closeModal();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      if (isLogin) {
        await handleLogin(values, onSubmitProps);
        toast.success("Log in successful");
      }
      if (isRegister) {
        await handleRegister(values, onSubmitProps);
        toast.success("Registered successfully. Log in successful.");
      }
    } catch (error) {}
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
            {isRegister && (
              <Box
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
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              required={isRegister}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
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
              required={isRegister}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            {isRegister && (
              <>
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
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
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
                    Boolean(touched.mobileNumber) &&
                    Boolean(errors.mobileNumber)
                  }
                  helperText={touched.mobileNumber && errors.mobileNumber}
                  sx={{ gridColumn: "span 2" }}
                />
                <FormControl
                  required
                  error={
                    Boolean(errors.isTermsChecked) ||
                    Boolean(errors.isPrivacyChecked)
                  }
                  component="fieldset"
                  sx={{ gridColumn: "span 2" }}
                  variant="standard"
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isTermsChecked"
                          checked={values.isTermsChecked}
                          onChange={handleChange}
                        />
                      }
                      label={
                        <Box display="flex" flexDirection="row" width="100%">
                          I agree to the
                          <Typography
                            variant="body1"
                            color={palette.primary.main}
                            onClick={() => dispatch(setIsTermsOpen(true))}
                            sx={{ cursor: "pointer", ml: "0.5rem" }}
                          >
                            Terms of Use
                          </Typography>
                        </Box>
                      }
                    />
                    {Boolean(errors.isTermsChecked) && (
                      <FormHelperText id="isTermsChecked-helper-text">
                        {errors.isTermsChecked}
                      </FormHelperText>
                    )}
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isPrivacyChecked"
                          checked={values.isPrivacyChecked}
                          onChange={handleChange}
                        />
                      }
                      label={
                        <Box display="flex" flexDirection="row" width="100%">
                          I agree to the
                          <Typography
                            variant="body1"
                            color={palette.primary.main}
                            onClick={() => dispatch(setIsPrivacyOpen(true))}
                            sx={{ cursor: "pointer", ml: "0.5rem" }}
                          >
                            Privacy Policy
                          </Typography>
                        </Box>
                      }
                    />
                    {Boolean(errors.isPrivacyChecked) && (
                      <FormHelperText id="isTermsChecked-helper-text">
                        {errors.isPrivacyChecked}
                      </FormHelperText>
                    )}
                  </FormGroup>
                </FormControl>
              </>
            )}
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
              {isLogin ? (
                loginLoading ? (
                  <CircularProgress
                    size={20}
                    sx={{ color: palette.secondary.light }}
                  />
                ) : (
                  "LOGIN"
                )
              ) : registerLoading ? (
                <CircularProgress
                  size={20}
                  sx={{ color: palette.secondary.light }}
                />
              ) : (
                "REGISTER"
              )}
            </Button>
            <Typography
              onClick={() => {
                setModalType(isLogin ? "Register" : "Login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;

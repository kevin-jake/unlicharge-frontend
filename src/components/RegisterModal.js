import { useMutation } from "@apollo/client";
import {
  Facebook,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  Typography,
  Link,
  DialogActions,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { REGISTER_USER } from "../util/graphql/Mutation";
import { useForm } from "../hooks/useForm";
// TODO: Add frontend validators

const RegisterModal = ({
  registerModal,
  showRegisterModal,
  showSignInModal,
  fromFormModal,
}) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    name: "",
    email: "",
    mobile_number: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setErrors({});
  }, [values]);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: {
          register: { id, token, email, username, name },
        },
      }
    ) {
      context.login(id, token, email, username, name);
      if (!fromFormModal) {
        showRegisterModal(false);
        navigate("/");
      } else {
        showRegisterModal(false);
        showSignInModal(false, true);
      }
    },
    onError(err) {
      if (err.graphQLErrors[0]) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog
      open={registerModal}
      onClose={() => showRegisterModal(false)}
      maxWidth="sm"
    >
      <DialogTitle align="center">
        Register {fromFormModal ? "to Save" : ""}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container sx={{ padding: 2 }} spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              size="small"
              label="Username"
              value={values.username}
              onChange={onChange}
              error={errors.username || errors.general ? true : false}
              helperText={errors.username || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              size="small"
              label="Name"
              value={values.name}
              onChange={onChange}
              error={errors.name ? true : false}
              helperText={errors.name || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              size="small"
              label="Email"
              value={values.email}
              onChange={onChange}
              error={errors.email ? true : false}
              helperText={errors.email || ""}
            />
          </Grid>
          {/* TODO: Add mobile number validator */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="mobile_number"
              size="small"
              label="Mobile Number"
              value={values.mobile_number}
              onChange={onChange}
              error={errors.mobile_number ? true : false}
              helperText={errors.mobile_number || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="address"
              size="small"
              label="Address"
              value={values.address}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl size="small" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={onChange}
                error={errors.password || errors.general ? true : false}
                endAdornment={
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
                }
                label="Password"
              />
            </FormControl>
            <Typography variant="caption" justifyContent="center" color="red">
              {errors.password ? errors.password : ""}
            </Typography>
            <Typography variant="caption" justifyContent="center" color="red">
              {errors.general ? errors.general : ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl size="small" required fullWidth>
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={onChange}
                error={errors.confirmPassword ? true : false}
                endAdornment={
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
                }
                label="Confirm Password"
              />
            </FormControl>
            <Typography variant="caption" justifyContent="center" color="red">
              {errors.confirmPassword ? errors.confirmPassword : ""}
            </Typography>
          </Grid>
        </Grid>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin={1}
          >
            <Button
              variant="contained"
              size="medium"
              sx={{ color: "white", margin: 1, textTransform: "none" }}
              onClick={onSubmit}
            >
              Register
            </Button>
          </Box>
          or via
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton aria-label="delete" size="large" color="primary">
              <Facebook />
            </IconButton>
            <IconButton aria-label="delete" size="large" color="primary">
              <Google />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <Button
              variant="contained"
              size="small"
              sx={{ color: "white", margin: 1, textTransform: "none" }}
              onClick={showSignInModal}
            >
              Login
            </Button>
          </div>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;

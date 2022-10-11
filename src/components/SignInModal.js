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
import { LOGIN_USER } from "../util/graphql/Mutation";
import { useForm } from "../hooks/useForm";

const SignInModal = ({ signInModal, showSignInModal, showRegisterModal }) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const initialState = {
    username: "",
    password: "",
  };
  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  );

  useEffect(() => {
    setErrors({});
  }, [values]);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: {
          login: { id, token, email, username },
        },
      }
    ) {
      // console.log(id, token, email,username );
      context.login(id, token, email, username);
      showSignInModal(false);
      navigate("/");
    },
    onError(err) {
      if (err.graphQLErrors[0]) {
        console.log(err.graphQLErrors[0].extensions.errors);
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog
      open={signInModal}
      onClose={() => showSignInModal(false)}
      maxWidth="sm"
    >
      <DialogTitle align="center">Login</DialogTitle>
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
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  onSubmit();
                }
              }}
              error={errors.username || errors.general ? true : false}
              helperText={errors.username || ""}
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
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    onSubmit();
                  }
                }}
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
            <Typography variant="caption" component="div" color="red">
              {errors.password ? errors.password : ""}
            </Typography>
            <Typography variant="caption" component="div" color="red">
              {errors.general ? errors.general : ""}
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
              Login
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
            <Typography variant="caption">No account? </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ color: "white", margin: 1, textTransform: "none" }}
              onClick={showRegisterModal}
            >
              Register
            </Button>
          </div>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default SignInModal;

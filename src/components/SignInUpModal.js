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
import React, { useState } from "react";

const SignInUpModal = ({ showModal, setShowModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm">
      <DialogTitle align="center">{signUp ? "Register" : "Login"}</DialogTitle>
      <DialogContent dividers>
        <Grid container sx={{ padding: 2 }} spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              size="small"
              label="Username"
            />
          </Grid>
          {signUp && (
            <>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  size="small"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  size="small"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  size="small"
                  label="Mobile Number"
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <FormControl size="small" required fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                // value={values.password}
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
          </Grid>
          {signUp && (
            <Grid item xs={12}>
              <FormControl size="small" required fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  // value={values.password}
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
            </Grid>
          )}
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
            >
              {signUp ? "Register" : "Login"}
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
          {!signUp && (
            <div>
              <Typography variant="caption">No account? </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{ color: "white", margin: 1, textTransform: "none" }}
                onClick={() => setSignUp(true)}
              >
                Register
              </Button>
            </div>
          )}
          {signUp && (
            <div>
              <Button
                variant="contained"
                size="small"
                sx={{ color: "white", margin: 1, textTransform: "none" }}
                onClick={() => setSignUp(false)}
              >
                Login
              </Button>
            </div>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default SignInUpModal;

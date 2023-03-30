import {
  Avatar,
  Box,
  Button,
  CardHeader,
  FormControl,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import React, { memo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setLogout } from "../../store/slices/auth/authSlice";
import { resetSelection } from "../../store/slices/buildpage/buildpageSlice";

const ProfileButton = ({ user, isLoggedIn, openModal }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;
  const [imgUrl, setImgUrl] = useState(
    user?.imagePath ? user?.imagePath : "/placeholder-avatar.png"
  );

  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleImgError = () => {
    setImgUrl("/placeholder-avatar.png");
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    setIsOpen(false);
    dispatch(setLogout());
    dispatch(resetSelection());
  };

  return (
    <>
      {isLoggedIn ? (
        <FormControl
          variant="standard"
          value={`${user?.firstName} ${user?.lastName}`}
        >
          <CardHeader
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
              backgroundColor: neutralLight,
              borderRadius: "0.25rem",
              p: "0.75rem 1rem",
              ":hover": {
                cursor: "pointer",
              },
            }}
            avatar={
              <Avatar
                alt="User"
                sx={{ width: 30, height: 30 }}
                src={imgUrl}
                imgProps={{
                  onError: () => handleImgError(),
                }}
              />
            }
            // title={username}
            title={
              <>
                <Box flexDirection="column" display="flex">
                  <Typography
                    noWrap
                    variant="body"
                    sx={{
                      maxWidth: "130px",
                    }}
                  >
                    {user?.username}
                  </Typography>
                  <Typography
                    noWrap
                    variant="caption"
                    sx={{
                      maxWidth: "130px",
                    }}
                    color={palette.neutral.medium}
                  >
                    {user?.role}
                  </Typography>
                </Box>
              </>
            }
          />
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorRef.current}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={isOpen}
            onClose={handleClose}
          >
            {/* TODO: Add an Edit Profile and My Builds home profile pages */}
            <MenuItem>
              <Typography textAlign="center">test</Typography>
            </MenuItem>
            <MenuItem>
              <NavLink to="/requests" exact="true">
                <Typography textAlign="center" color={palette.neutral.dark}>
                  My Requests
                </Typography>
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleLogOut}>
              <Typography textAlign="center">Log out</Typography>
            </MenuItem>

            {/* ))} */}
          </Menu>
        </FormControl>
      ) : (
        <Box
          sx={{
            "& .MuiButton-root": {
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
            },
          }}
        >
          <Button
            sx={{
              "&:hover": { color: palette.primary.main },
              marginX: "0.25rem",
            }}
            onClick={() => openModal("Login")}
          >
            Login
          </Button>
          <Button
            sx={{
              "&:hover": { color: palette.primary.main },
              marginX: "0.25rem",
            }}
            onClick={() => openModal("Register")}
          >
            Register
          </Button>
        </Box>
      )}
    </>
  );
};

export default memo(ProfileButton);

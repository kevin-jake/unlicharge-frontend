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
import React, { useState } from "react";

const ProfileButton = ({ fullName, isLoggedIn = true }) => {
  const { palette } = useTheme();
  const neutralLight = palette.neutral.light;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {isLoggedIn ? (
        <FormControl variant="standard" value={fullName}>
          <CardHeader
            onClick={handleOpenUserMenu}
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
                //  FIXME: Make this image from users correct pic
                src="https://images.pexels.com/photos/340780/pexels-photo-340780.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              />
            }
            // title={username}
            title={
              <>
                <Box flexDirection="column" display="flex">
                  <Typography variant="body">test</Typography>
                  <Typography variant="caption" color={palette.neutral.medium}>
                    test
                  </Typography>
                </Box>
              </>
            }
          />
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {/* TODO: */}
            {/* {settings.map((setting) => ( */}
            <MenuItem>
              <Typography textAlign="center">test</Typography>
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
          >
            Login
          </Button>
          <Button
            sx={{
              "&:hover": { color: palette.primary.main },
              marginX: "0.25rem",
            }}
          >
            Register
          </Button>
        </Box>
      )}
    </>
  );
};

export default ProfileButton;

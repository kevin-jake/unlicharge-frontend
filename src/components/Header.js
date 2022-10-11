import React, { useContext, useState } from "react";
import { Notifications } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "./unlicharge_logo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import SignInModal from "./SignInModal";
import RegisterModal from "./RegisterModal";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [signInModal, showSignInModal] = useState(false);
  const [registerModal, showRegisterModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    if (event.target.innerText === "Logout") {
      logout();
      navigate("/");
    }
  };

  const openLogin = () => {
    showRegisterModal(false);
    showSignInModal(true);
  };

  const openRegister = () => {
    showSignInModal(false);
    showRegisterModal(true);
  };

  console.log(isLoggedIn);
  // TODO: Make this mobile responsive
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "rgb(17 24 39)" }}>
      <StyledToolbar>
        <NavLink to="/tables" exact="true">
          <Box
            component="img"
            alt="The house from the offer."
            sx={{ width: 270, height: 70 }}
            src={logo}
          />
        </NavLink>
        {/* <Pets sx={{ display: { xs: "block", sm: "none" } }} /> */}
        {/* <Search>
          <InputBase placeholder="Search" />
        </Search> */}
        <Box sx={{ display: "inline-flex" }}>
          <NavLink to="/" exact="true">
            <Button
              variant="text"
              sx={{ minWidth: 100, color: "white", textTransform: "none" }}
            >
              Home
            </Button>
          </NavLink>
          <NavLink to="/build" exact="true">
            <Button
              variant="text"
              sx={{ minWidth: 100, color: "white", textTransform: "none" }}
            >
              Build
            </Button>
          </NavLink>
          <Button
            variant="text"
            sx={{ minWidth: 100, color: "white", textTransform: "none" }}
          >
            Parts
          </Button>
          {!isLoggedIn && (
            <Button variant="contained" onClick={openLogin} size="medium">
              Login
            </Button>
          )}
          {isLoggedIn && (
            <Icons>
              <Badge badgeContent={4} color="error">
                <Notifications color="white" />
              </Badge>
              <Avatar
                sx={{ width: 30, height: 30 }}
                src="https://images.pexels.com/photos/340780/pexels-photo-340780.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                onClick={handleClick}
              />
            </Icons>
          )}
        </Box>

        {isLoggedIn && (
          <UserBox onClick={handleClick}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/340780/pexels-photo-340780.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            />
            <Typography variant="span"> test</Typography>
          </UserBox>
        )}
      </StyledToolbar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <SignInModal
        signInModal={signInModal}
        showSignInModal={showSignInModal}
        showRegisterModal={openRegister}
      />
      <RegisterModal
        registerModal={registerModal}
        showRegisterModal={showRegisterModal}
        showSignInModal={openLogin}
      />
    </AppBar>
  );
};

export default Header;

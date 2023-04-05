import { useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/wrappers/FlexBetween";
import LoginRegisterDialogContent from "../LoginRegisterDialog/LoginRegisterDialogContent";
import DialogWrapper from "../../components/wrappers/DialogWrapper";
import { selectUser, setMode } from "../../store/slices/auth/authSlice";
import ProfileButton from "./ProfileButton";
import logo from "../../../public/Unlicharge_logo.svg";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [modalType, setModalType] = useState("Login");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const handleOpenModal = (pageType) => {
    setModalType(pageType);
    setIsModalOpen(true);
  };

  return (
    <>
      <FlexBetween padding="1rem 2% 1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Box onClick={() => navigate("/")}>
            <img
              src={logo}
              height={50}
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(74%) sepia(43%) saturate(405%) hue-rotate(71deg) brightness(91%) contrast(89%)",
                cursor: "pointer",
              }}
            />
          </Box>
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <>
            <Box
              gap="1rem"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {/* <NavLink to="/" exact="true">
                <Button>Home</Button>
              </NavLink> */}
              <NavLink to="/build" exact="true">
                <Button>Build</Button>
              </NavLink>
              {/* <Button>Complete Builds</Button> */}
              {/* <NavLink to="/products" exact="true">
                <Button>Products</Button>
              </NavLink> */}
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <ProfileButton
                user={user}
                isLoggedIn={user}
                openModal={handleOpenModal}
              />
            </Box>
          </>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              {/* <NavLink to="/" exact="true">
                <Button>Home</Button>
              </NavLink> */}
              <NavLink to="/build" exact="true">
                <Button>Build</Button>
              </NavLink>
              {/* <Button>Complete Builds</Button> */}
              {/* <NavLink to="/build" exact="true">
                <Button>Products</Button>
              </NavLink> */}
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <ProfileButton
                user={user}
                isLoggedIn={user}
                openModal={handleOpenModal}
              />
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
      <DialogWrapper
        isOpen={isModalOpen}
        title={modalType}
        closeModal={() => setIsModalOpen(false)}
      >
        <LoginRegisterDialogContent
          pageType={modalType}
          setModalType={setModalType}
          closeModal={() => setIsModalOpen(false)}
        />
      </DialogWrapper>
    </>
  );
};

export default Navbar;

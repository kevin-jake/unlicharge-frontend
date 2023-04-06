import React from "react";
import WidgetWrapper from "../../components/wrappers/WidgetWrapper";
import { Typography, useMediaQuery } from "@mui/material";

const AboutContent = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <WidgetWrapper
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={5}
      width="100vh"
    >
      <Typography variant="h5">
        Welcome to Unlicharge! We are a web application that helps users design
        their renewable energy system. Our mission is to help people go green
        and save money while doing it.
      </Typography>

      <Typography variant="h5">
        Unlicharge allows users to easily calculate the costs of installing a
        renewable energy system, as well as any other expenses related to their
        installation. All data is presented in one place in a very intuitive
        way, making it easy for users to understand how much money they can save
        by going green.{" "}
      </Typography>

      <Typography variant="h5">
        Our user-friendly interface makes it simple for anyone to design their
        renewable energy system, regardless of their technical expertise. We are
        dedicated to providing accurate and up-to-date information to help our
        users make informed decisions about their renewable energy options.
      </Typography>
      <Typography variant="h5">
        Our team at Unlicharge is passionate about promoting sustainable energy
        solutions and reducing our carbon footprint. We believe that small
        changes can have a big impact, and that everyone can make a difference
        by adopting renewable energy practices.
      </Typography>

      <Typography variant="h5" marginBottom="1rem">
        Thank you for choosing Unlicharge to help you design your renewable
        energy system. We are committed to providing you with the tools and
        resources you need to create a more sustainable future for yourself and
        for generations to come.
      </Typography>
    </WidgetWrapper>
  );
};

export default AboutContent;

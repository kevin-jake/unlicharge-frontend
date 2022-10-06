import { Grid } from "@mui/material";
import React from "react";
import CardsFilter from "../components/CardsFilter";
import InitialForm from "../components/InitialForm";
import ItemLists from "../sections/ItemLists";
import Path from "../sections/Path";

const Build = () => {
  return (
    <>
      <InitialForm />
      <Path />
      <CardsFilter />
      <ItemLists />
    </>
  );
};

export default Build;

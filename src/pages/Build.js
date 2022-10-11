import React, { useState } from "react";
import CardsFilter from "../components/CardsFilter";
import InitialForm from "../components/InitialForm";
import ItemLists from "../sections/ItemLists";
import Path from "../sections/Path";

const Build = () => {
  const [selection, setSelection] = useState("Battery");
  console.log(selection);
  return (
    <>
      <InitialForm />
      <Path selection={selection} setSelection={setSelection} />
      <CardsFilter />
      <ItemLists selection={selection} />
    </>
  );
};

export default Build;

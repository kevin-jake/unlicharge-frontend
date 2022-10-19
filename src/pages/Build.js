import React, { useContext, useEffect, useState } from "react";
import CardsFilter from "../components/CardsFilter";
import InitialForm from "../components/InitialForm";
import { SummaryContext } from "../context/summary-context";
import { stringCompatibility } from "../logic/incompatibiliy";
import ItemLists from "../sections/ItemLists";
import Path from "../sections/Path";

const Build = () => {
  const [selection, setSelection] = useState("Battery");
  const {
    initialForm,
    batterySelected,
    bmsSelected,
    abSelected,
    setBMS,
    setAB,
  } = useContext(SummaryContext);

  useEffect(() => {
    var error;
    if (
      batterySelected.computedData &&
      Object.keys(batterySelected.computedData).length !== 0
    ) {
      console.log({ error });
      if (selection === "BMS") {
        setBMS({
          ...bmsSelected,
          error: stringCompatibility(
            +batterySelected.computedData.totalSeries,
            +bmsSelected.strings,
            selection
          ),
        });
      }
      if (selection === "Active Balancer") {
        setAB({
          ...abSelected,
          error: stringCompatibility(
            +batterySelected.computedData.totalSeries,
            +abSelected.strings,
            selection
          ),
        });
      }
    }
  }, [batterySelected, initialForm]);

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

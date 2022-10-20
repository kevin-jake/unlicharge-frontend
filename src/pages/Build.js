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
    if (
      batterySelected.computedData &&
      Object.keys(batterySelected.computedData).length !== 0
    ) {
      setBMS({
        ...bmsSelected,
        error: stringCompatibility(
          +batterySelected.computedData.totalSeries,
          +bmsSelected.strings,
          "BMS"
        ),
      });
      setAB({
        ...abSelected,
        error: stringCompatibility(
          +batterySelected.computedData.totalSeries,
          +abSelected.strings,
          "Active Balancer"
        ),
      });
    }
  }, [batterySelected, initialForm]);

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

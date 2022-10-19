import React, { createContext, useReducer } from "react";

const initState = {
  initialForm: {
    batteryVoltage: 12,
    batteryCapacity: 0,
    maxBattVoltage: 0,
    minBattVoltage: 0,
    dod: 0,
  },
  batterySelected: {
    id: "",
    qty: "",
    price: "",
    sumPrice: "",
    battSeries: "",
  },
  bmsSelected: {
    id: "",
    qty: "",
    price: "",
    sumPrice: "",
    strings: "",
  },
  abSelected: {
    id: "",
    qty: "",
    price: "",
    sumPrice: "",
    strings: "",
  },
  incompatibility: [],
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_INIT_FORM":
      return {
        ...state,
        initialForm: action.initialForm,
      };
    case "SET_BATT":
      return {
        ...state,
        batterySelected: {
          ...action.batterySelected,
          sumPrice: +action.batterySelected.qty * +action.batterySelected.price,
        },
      };
    case "SET_BMS":
      return {
        ...state,
        bmsSelected: {
          ...action.bmsSelected,
          sumPrice: +action.bmsSelected.qty * +action.bmsSelected.price,
        },
      };
    case "SET_AB":
      return {
        ...state,
        abSelected: {
          ...action.abSelected,
          sumPrice: +action.abSelected.qty * +action.abSelected.price,
        },
      };
    case "SET_INCOMPATIBILITY":
      return {
        ...state,
        incompatibility: action.incompatibility,
      };
    default:
      return state;
  }
};

const SummaryContext = createContext(initState);

const SummaryProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initState);
  const setInitForm = (initialForm) => {
    dispatch({
      type: "SET_INIT_FORM",
      initialForm,
    });
  };

  const setBattery = (batterySelected) => {
    dispatch({
      type: "SET_BATT",
      batterySelected,
    });
  };

  const setBMS = (bmsSelected) => {
    dispatch({
      type: "SET_BMS",
      bmsSelected,
    });
  };

  const setAB = (abSelected) => {
    dispatch({
      type: "SET_AB",
      abSelected,
    });
  };

  const setIncompatibility = (incompatibility) => {
    dispatch({
      type: "SET_INCOMPATIBILITY",
      incompatibility,
    });
  };

  const value = {
    initialForm: state.initialForm,
    batterySelected: state.batterySelected,
    bmsSelected: state.bmsSelected,
    abSelected: state.abSelected,
    incompatibility: state.incompatibility,
    setBattery,
    setBMS,
    setAB,
    setIncompatibility,
    setInitForm,
  };
  console.log({ value });
  return (
    <SummaryContext.Provider value={value}>
      {props.children}
    </SummaryContext.Provider>
  );
};

export { SummaryContext, SummaryProvider };

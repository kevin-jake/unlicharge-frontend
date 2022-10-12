import React, { createContext, useReducer } from "react";

const initState = {
  initialForm: {
    batteryVoltage: 12,
    batteryCapacity: 0,
    maxBattVoltage: 0,
    minBattVoltage: 0,
    dod: 0,
  },
  batterySelected: "",
  bmsSelected: "",
  abSelected: "",
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
        initialForm: action.initialForm,
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

  console.log(state);
  const value = {
    initialForm: state.initialForm,
    batterySelected: state.batterySelected,
    setBattery,
    setInitForm,
  };
  // // console.log(state);
  return (
    <SummaryContext.Provider value={value}>
      {props.children}
    </SummaryContext.Provider>
  );
};

export { SummaryContext, SummaryProvider };

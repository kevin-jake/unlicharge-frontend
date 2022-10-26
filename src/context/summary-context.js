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
    error: {},
  },
  bmsSelected: {
    error: {},
  },
  abSelected: {
    error: {},
  },
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_INIT_FORM":
      return {
        ...state,
        initialForm: action.initialForm,
      };
    case "SET_BATT": {
      return {
        ...state,
        batterySelected:
          action.batterySelected.id === state.batterySelected.id
            ? {
                error: {},
              }
            : action.batterySelected,
      };
    }
    case "SET_BMS":
      return {
        ...state,
        bmsSelected:
          action.bmsSelected.id === state.bmsSelected.id
            ? {
                error: {},
              }
            : action.bmsSelected,
      };
    case "SET_AB":
      return {
        ...state,
        abSelected:
          action.abSelected.id === state.abSelected.id
            ? {
                error: {},
              }
            : action.abSelected,
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

  const value = {
    initialForm: state.initialForm,
    batterySelected: state.batterySelected,
    bmsSelected: state.bmsSelected,
    abSelected: state.abSelected,
    setBattery,
    setBMS,
    setAB,
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

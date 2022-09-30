import React, { createContext, useReducer } from "react";

const initState = {
  showModal: false,
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: action.showModal,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initState);

  const setShowModal = (showModal) => {
    dispatch({
      type: "SHOW_MODAL",
      showModal,
    });
  };

  const value = {
    showModal: state.showModal,
    setShowModal,
  };
  // // console.log(state);
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

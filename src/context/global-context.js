import React, { createContext, useReducer } from "react";

const initState = {
  signInModal: false,
  fromFormModal: false,
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        signInModal: action.signInModal,
        fromFormModal: action.fromFormModal,
      };
    default:
      return state;
  }
};

const GlobalContext = createContext(initState);

const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initState);

  const showSignInModal = (signInModal, fromFormModal) => {
    dispatch({
      type: "SHOW_MODAL",
      signInModal,
      fromFormModal,
    });
  };

  const value = {
    signInModal: state.signInModal,
    fromFormModal: state.fromFormModal,
    showSignInModal,
  };
  // // console.log(state);
  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

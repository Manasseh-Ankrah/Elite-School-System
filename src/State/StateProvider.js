import React, { createContext, useContext, useReducer } from "react";

export const stateContext = createContext();

function StateProvider({ reducer, initialState, children }) {
  return (
    <stateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </stateContext.Provider>
  );
}

export const useStateValue = () => useContext(stateContext);

export default StateProvider;

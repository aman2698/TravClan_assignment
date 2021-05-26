import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

import axios from "axios";

// Initial state
const initialState = {
  customer: [],
  error: null,
  loading: true
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getCustomers() {
    try {
      const res = await axios.get("https://intense-tor-76305.herokuapp.com/merchants");

      dispatch({
        type: "GET_CUSTOMER",
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: "CUSTOMER_ERROR",
        payload: err
      });
    }
  }

 

  
  return (
    <GlobalContext.Provider
      value={{
        customer: state.customer,
        error: state.error,
        loading: state.loading,
        getCustomers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
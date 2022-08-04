import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import StateProvider from "./State/StateProvider";
import reducer, { initialState } from "./State/reducer";
// import LineChart from "./Charts/LineChart";

ReactDOM.render(
  <StateProvider reducer={reducer} initialState={initialState}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);

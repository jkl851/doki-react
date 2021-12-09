import React from "react";
import { render } from "react-dom";
import App from "./App";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

render(<App />, document.getElementById("root"));

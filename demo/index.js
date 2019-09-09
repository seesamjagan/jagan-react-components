import React from "react";
import ReactDOM from "react-dom";
import { Footer } from "../src/index.js";

const Index = () => {
  return (
    <React.Fragment>
      <div>Hello React!</div>
      <Footer year={2019} org="Msys Technologies Inc" />
    </React.Fragment>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));

console.log("THIS IS DEV BUILD");
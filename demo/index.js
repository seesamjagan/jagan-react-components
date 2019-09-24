import React from "react";
import ReactDOM from "react-dom";
import { Footer, Logo, LogoImgData, Clock } from "../src/index.js";

const Index = () => {
  return (
    <React.Fragment>
      <div><Logo />Jagan React Components</div>
      <Clock />
      <img src={LogoImgData} />
      <Footer year={2019} org="Msys Technologies Inc" />
    </React.Fragment>
  );
};

ReactDOM.render(<Index />, document.getElementById("app"));

console.log("THIS IS DEV BUILD");
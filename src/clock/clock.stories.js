import React from "react";
import { Clock } from "./index";

export default { title: "Clock"};

export const defaultClock = () => <Clock />;

export const formatAs12Hrs = () => <Clock format="12" />
import React, { Component } from "react";
import "./clock.scss";

function paddZero(val, maxLength = 2) {
  if (val > 9) {
    return val;
  } else {
    return val.toString().padStart(maxLength, "0");
  }
}

export class Clock extends Component {
  state = {
    h: 0,
    m: 0,
    s: 0
  };

  updateTime = () => {
    let d = new Date();
    this.setState({
      h: d.getHours(),
      m: d.getMinutes(),
      s: d.getSeconds()
    });
  };

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 999);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearImmediate(this.interval);
    }
  }

  render() {
    let { h, m, s } = this.state;
    h = paddZero(h);
    m = paddZero(m);
    s = paddZero(s);

    return (
      <span className="clock">
        <span className="unit" key={h + "h"}>
          {h}
        </span>
        <span>:</span>
        <span className="unit" key={m + "m"}>
          {m}
        </span>
        <span>:</span>
        <span className="unit" key={s + "s"}>
          {s}
        </span>
      </span>
    );
  }
}

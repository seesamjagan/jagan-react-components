"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  sayHello: true
};
exports.sayHello = sayHello;

require("./index.css");

require("./comp.scss");

var _footer = require("./footer");

Object.keys(_footer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _footer[key];
    }
  });
});

function sayHello() {
  console.log("Welcome to Library...");
}
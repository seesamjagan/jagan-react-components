import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import buble from "rollup-plugin-buble";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";
import postcss from "rollup-plugin-postcss";

const isProduction = process.env.NODE_ENV === "production";

const output = [
  {
    dir: "./lib/esm",
    format: "esm", // Keep the bundle as an ES module file, suitable for other bundlers and inclusion as a <script type=module> tag in modern browsers
    indent: !isProduction,
    compact: true
  },
  {
    dir: "./lib/umd",
    format: "umd", // Universal Module Definition, works as amd, cjs and iife all in one
    indent: !isProduction,
    name: "MyLib",
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    } // !!! ... HOW and WHERE to use this ... !!!
  }
];

const plugins = [
  postcss({
    extract: true,
    inject: false,
    minimize: true
  }),
  buble(), // plugin to resolve jsx syntax
  commonjs(),
  replace({ "process.env.NODE_ENV": JSON.stringify("development") }),
  resolve({
    // pass custom options to the resolve plugin
    customResolveOptions: {
      moduleDirectory: "node_modules"
    }
  }),
  babel({
    exclude: "node_modules/**"
  }),
  terser() // plugin to uglify
];

export default [
  {
    external: ["react", "react-dom"],
    input: "./src/index.js",
    output,
    plugins,
    watch: {
      exclude: "node_modules/**",
      include: "src/**"
    }
  }
];

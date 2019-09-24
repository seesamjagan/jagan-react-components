const path = require('path');

/* // Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  // Return the altered config
  return config;
};*/

// your app's webpack.config.js
const custom = require('../webpack.config.dev.js');

module.exports = async ({ config, mode }) => {
  //return { ...config, module: { ...config.module, rules: custom[0]({NODE_ENV: mode}).module.rules } }
  return { ...config, module: { ...config.module, rules: custom[0].module.rules } }
};
const path = require('path');

module.exports = {
  webpack: (config:any) => {
    config.resolve.alias['@'] = path.resolve(__dirname).replace(/\\/g, '/');
    return config;
  },
};

const { readFileSync } = require('fs');

const { root } = require('./paths');

const gitIgnorePatterns = readFileSync(root('.gitignore'), 'utf8')
  .split('\n')
  .filter((line) => line && line.charAt(0) !== '#');

module.exports = { gitIgnorePatterns };

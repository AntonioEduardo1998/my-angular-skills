const { resolve } = require('path');

const root = (...childPaths) => resolve(process.cwd(), ...childPaths);
const src = (...childPaths) => root('src', ...childPaths);
const dist = (...childPaths) => root('dist', ...childPaths);

module.exports = { root, src, dist };

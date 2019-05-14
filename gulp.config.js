const path = require('path');
const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');
function resolve(dir) {
  return path.join(__dirname, dir);
}
let config = {
  isDev: true,
  src: {
    sass: resolve('src/sass/**/*.scss'),
    js: resolve('src/babel/**/*.js'),
  },
  dist: {
    sass: resolve('dist/css'),
    js: resolve('dist/js'),
  },
};

module.exports = config;

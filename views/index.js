const hbs = require("handlebars");

var renderer = (view, params) => (hbs.compile(require(`./${view}.js`)[view]))(params)

module.exports = {renderer};
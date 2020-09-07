const path = require('path');

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname),
        filename: "green-gis.js",
        library: "Green"
    },
    devtool: "source-map"
};
"use strict"

const path = require("path");

module.exports = {
    dev: {
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        proxyTable: {},
        host: "localhost",
        port: 48826,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: "cheap-module-eval-source-map",
        cacheBusting: true,
        cssSourceMap: true,
    },

    build: {
        index: path.resolve(__dirname, "../www/index.html"),
        assetsRoot: path.resolve(__dirname, "../www"),
        assetsSubDirectory: "static",
        assetsPublicPath: "",
        productionSourceMap: true,
        devtool: "#source-map",
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],
        bundleAnalyzerReport: process.env.npm_config_report,
    },
};

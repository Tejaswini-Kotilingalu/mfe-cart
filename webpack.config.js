const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        publicPath: "auto",
        filename: "[name].js",
        clean: true,
        crossOriginLoading: "anonymous",
    },
    devServer: {
        port: 3002,
        static: {
            directory: path.join(__dirname, "public"),
        },
        headers: {
            "Access-Control-Allow-Origin": "*", // ✅ REQUIRED
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react", "@babel/preset-env"],
                },
            },
            {
                test: /\.svg$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "cart",
            filename: "remoteEntry.js",
            exposes: {
                "./Cart": "./src/Cart",
            },
            shared: {
                react: { singleton: true, requiredVersion: false },
                "react-dom": { singleton: true, requiredVersion: false },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
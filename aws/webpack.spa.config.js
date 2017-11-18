const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const definition = {};

if (process.env.IS_OFFLINE) {
    definition["SERVICE_ENDPOINT"] = JSON.stringify("http://localhost:3000");
} else {
    const stack = require("./.serverless/stack.json");
    definition["SERVICE_ENDPOINT"] = JSON.stringify(stack.ServiceEndpoint);
}

console.log('Definition: ', definition);

module.exports = {
    entry: './www/index.js',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new DefinePlugin(definition),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({ template: './www/index.ejs' }),
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['eslint-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                ],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'sass-loader', options: {} },
                    ],
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: 'file-loader',
            },
        ],
    },
};

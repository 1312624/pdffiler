const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        app: './app-client.js'
    },

    output: {
        path: path.join(__dirname, 'src', 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: 'babel_cache',
                            presets: ['react', 'es2015', 'stage-0']
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader : 'css-loader',
                        options : {
                            modules : true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: true },
            mangle: true,
            sourceMap: true,
            beautify: false,
            dead_code: true
        })
    ]
};
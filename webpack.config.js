const path = require('path');

module.exports = env => {
    return {
        mode: env,
        devtool: 'inline-source-map',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            chunkFilename: '[name].js',
            sourceMapFilename: '[file].map',
            publicPath: '/'
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    exportGlobals: true,
                                    localIdentName: '[name]__[local]'
                                },
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        },
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
        },
        performance: {
            hints: false
        }
    }
};

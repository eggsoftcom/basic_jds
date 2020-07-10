var path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src/main/webapp'),
    entry: {
    	EggsoftTop: './jsx/EggsoftTop.jsx',
    	EggsoftLeft: './jsx/EggsoftLeft.jsx',
    	Components: './jsx/Components.jsx',
    },
    devtool: 'sourcemaps',
    cache: true,
    output: { // 위의 entry에 설정한 jsx파일이 빌드되어서 저장 될 위치설정
        path: __dirname,
        filename: './src/main/webapp/js/react/[name].bundle.js'
    },
    mode: 'none',
    module: {
        rules: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ '@babel/preset-env', '@babel/preset-react' ]
                }
            }
        }, {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        } ]
    }
};
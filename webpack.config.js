const path = require("path");

/*todo setup storyBook for Documentation*/

const paths = {
	context: path.join(__dirname, "./src/"),
	output: path.join(__dirname, "./dist/"),
	entry: {
		'app':"./index.js",
	}
};

const config = {
	context: paths.context,
	entry: paths.entry,
	output: {
		path: paths.output,
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.csv$/,
				use: {
					loader: "csv-loader",
					options: {
						dynamicTyping: true,
						header: true,
						skipEmptyLines: true
					}
				}
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
		]

	},
	resolve: {
		extensions: ['.jsx','.js'],
		modules: [path.resolve(__dirname,'src'), 'node_modules'],
		alias: {
			'context': path.resolve(__dirname,'src/context/'),
			'static': path.resolve(__dirname,'static/'),
			'abstract': path.resolve(__dirname,'src/abstract/'),
			'editor': path.resolve(__dirname,'src/editor/'),
			'preview': path.resolve(__dirname,'src/preview/'),
			'metadata': path.resolve(__dirname,'src/metadata/')
		}
	},
	devServer: {
		contentBase: path.join(__dirname, '/'),
		compress: true,
	},
	devtool: 'inline-source-map'
};


module.exports = config;



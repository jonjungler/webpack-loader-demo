var htmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var webpack = require("webpack");
var exTxt = require('extract-text-webpack-plugin');

module.exports = {
	entry:"./src/app.js",
	output:{
		path:path.resolve(__dirname,"./dist"),
		publicPath:"",
		filename:"js/[name].js"
	},
	plugins:[
		new htmlWebpackPlugin({
			fileName:"index.html",
			template:"index.html",
			inject:"body",
		    minify: {
		        // removeComments: true,
		        // collapseWhitespace: true,
		        // removeAttributeQuotes: true
		        // more options:
		        // https://github.com/kangax/html-minifier#options-quick-reference
		    },
		}),
		//提取css
		new exTxt({
			// filename:'css/[name]-[contenthash].css'
			filename:'css/[name].css'
		}),
		new webpack.LoaderOptionsPlugin({options: {
				postcss:[
					require('autoprefixer')({
											browsers:["last 5 versions"]
										})
				]
			}
		}),
		//压缩
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      },
	      sourceMap: true,
	      except: ['$super', '$', 'exports', 'require']    //排除关键字
	    })
	],
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:path.resolve(__dirname,'ndoe_modules'),
				include:path.resolve(__dirname,'./src/'),
				//在webpack。json中写入
				query:{
					presets:['latest']
				}
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader?importLoaders=1'
			},
			{
				test:/\.less$/,
				loader:exTxt.extract({fallback:'style-loader',use:['css-loader','postcss-loader','less-loader']})
			},
			{
				test:/\.html$/,
				loader:'html-loader'
			},
			{
				test:/\.(png|jpg|svg|gif)$/,
				// loader:'file-loader',
				loader:'url-loader?limit=3&name=../assets/[name]-[hash].[ext]!image-webpack-loader',
				// query:{
				// 	limit:3,
				// 	name:'../assets/[name]-[hash].[ext]'
				// }
			}
		]
	}
}
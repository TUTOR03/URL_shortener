const webpack = require('webpack')

module.exports = {
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:{
					loader:"babel-loader"
				}
			},
			// {
		 //        test: /\.css$/,
		 //        use: [
		 //        	'style-loader',
		 //        	{
		 //        		loader: 'css-loader',
		 //        		options: {
		 //            	modules: false,
		 //            	}
		 //        	},
		 //        ],
		 //    },
		]
	},
	optimization: {
		minimize: true,
	},
	// plugins: [
	// 	new webpack.DefinePlugin({
	// 		'process.env': {
	// 			NODE_ENV: JSON.stringify('production')
	// 		}
	// 	})
	// ]
}
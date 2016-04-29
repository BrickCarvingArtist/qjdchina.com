import path from "path";
import webpack from "webpack";
const entryPath = "./dev_resource/entry/";
export default {
	entry : {
		home : `${entryPath}home`,
		join : `${entryPath}join`,
		corporation : `${entryPath}corporation`,
		project : `${entryPath}project`,
		bill : `${entryPath}bill`,
		contract : `${entryPath}contract`,
		manufacturer : `${entryPath}manufacturer`,
		messageentrance : `${entryPath}messageentrance`,
		dependencies : ["react", "react-dom", "redux", "immutable"]
	},
	output : {
		path : `${process.cwd()}/resource/`,
		filename : "/js/[name].js",
		chunkFilename : "/lib/[name].min.js"
	},
	module : {
		loaders : [
			{
				test : /\.js$/,
				loaders : [
					"jsx",
					"babel"
				]
			}
		]
	},
	resolve : {
		modulesDirectories : [
			"node_modules",
			path.join(__dirname, "./node_modules")
		],
		extensions : ["", ".js"],
	},
	resolveLoader : {
		modulesDirectories : [
			"node_modules",
			path.join(__dirname, "./node_modules")
		]
	},
	plugins : [
		new webpack.optimize.CommonsChunkPlugin("dependencies", "/lib/dependencies.min.js"),
		new webpack.optimize.MinChunkSizePlugin({
			compress : {
				warnings: false
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			"process.env" : {
				NODE_ENV: JSON.stringify("production")
			}
		})
	]
};
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
		messageentrance : `${entryPath}messageentrance`
	},
	output : {
		path : `${process.cwd()}/resource/`,
		filename : "/js/[name].js",
		chunkFilename : "/lib/[name].min.js"
	},
	externals : {
		react : "React",
		"react-dom" : "ReactDOM",
		redux : "Redux",
		immutable : "Immutable",
		"react-date-picker" : "DatePicker"
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
import path from "path";
import webpack from "webpack";
export default {
	entry : {
		home : "./dev_resource/entry/home",
		join : "./dev_resource/entry/join",
		corporation : "./dev_resource/entry/corporation",
		project : "./dev_resource/entry/project",
		bill : "./dev_resource/entry/bill",
		contract : "./dev_resource/entry/contract",
		manufacturer : "./dev_resource/entry/manufacturer",
		messageentrance : "./dev_resource/entry/messageentrance"
	},
	output : {
		path : process.cwd(),
		filename : "./resource/js/[name].js",
		publicPath : "./resource/"
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
	extensions : [".js"],
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
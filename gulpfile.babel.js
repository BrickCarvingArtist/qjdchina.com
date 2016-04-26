import gulp from "gulp";
import gutil from "gulp-util";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import sass from "gulp-ruby-sass";
import WebpackConfig from "./webpack.config";
import {WebpackDevServerConfig} from "./config/config";
const devCompiler = webpack(WebpackConfig);
gulp.task("build-dev", ["webpack:build-dev", "sass:build-dev"], () => {
	gulp.watch(["./dev_resource/**/*"], ["webpack:build-dev", "sass:build-dev"]);
});
gulp.task("webpack:build-dev", callback => {
	devCompiler.run((err, stats) => {
		if(err){
			throw new gutil.PluginError("webpack:build-dev", err);
		}
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: 1
		}));
		callback();
	});
});
gulp.task("sass:build-dev", callback => {
	sass("./dev_resource/sass/*.scss", {
		style : "compressed",
		noCache : true
	})
	.on("error", sass.logError)
	.pipe(gulp.dest("./resource/css"));
	callback();
});
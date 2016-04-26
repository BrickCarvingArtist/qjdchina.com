const WebpackDevServerConfig = {
		host : "127.0.0.1",
		port : 20000
	},
	ServerConfig = {
		port : 3000
	},
	HostConfig = {
		//Tip : domain
		hostName : "dev2.qjdchina.com",
		//Tip : 后端nginx服务IP
		host : "10.1.1.62",
		//Tip : 后端nginx服务端口
		port : 80
	},
	RedisConfig = {
		//Tip : redis server
		host : "10.1.1.62",
		//Tip : redis port
		port : 6379
	},
	UploadConfig = {
		//Tip : 文件上传路径
		path : `${process.cwd()}/src/upload/`
	},
	LogConfig = {
		path : `${process.cwd()}/log`
	};
export {
	WebpackDevServerConfig,
	ServerConfig,
	HostConfig,
	RedisConfig,
	UploadConfig,
	LogConfig
};
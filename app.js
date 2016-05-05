import express from "express";
import bodyParser from "body-parser";
import request from "request";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectRedis from "connect-redis";
import {ServerConfig, RedisConfig} from "./config/config";
import Log from "./controller/log";
import RouterAuth from "./controller/auth";
import {Router as RouterApi} from "./controller/api/index";
import {Router as RouterStatic} from "./controller/static/index";
import react from "react";
import reactDOMServer from "react-dom/server";
const port = process.env.PORT || ServerConfig.port,
	app = express(),
	router = express.Router(),
	RedisStore = connectRedis(session);
app.use(cookieParser());
app.use(session({
	secret : "awesome",
	name : "qjd_user",
	cookie : {
		maxAge : 7200000
	},
	store : new RedisStore({
		host : RedisConfig.host,
		port : RedisConfig.port
	}),
	resave : 0,
	saveUninitialized : 1
}));
app.use(bodyParser.urlencoded({
	extended : 1
}));
app.set("views", `${__dirname}/view`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/resource`, {
	index : 0,
	maxAge : 600000
}));
app.use(Log(router));
app.use(RouterAuth(router));
app.use(RouterApi(router, request));
app.use(RouterStatic(router, react, reactDOMServer));
app.listen(port);
console.log(`server started on port ${port}`);
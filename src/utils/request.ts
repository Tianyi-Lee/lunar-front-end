import axios from "axios";

const request = axios.create({
	baseURL: "/api",
	timeout: 3000,
});

/**
 * request拦截器
 * 在发送请求前做一些处理,比如统一加token session,请求参数加密等
 */
request.interceptors.request.use(
	(config: any) => {
		config.headers["Content-Type"] = "application/json;charset=utf-8";
		if (sessionStorage.getItem("token"))
			config.headers["token"] = sessionStorage.getItem("token");

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

/**
 * response拦截器
 * 在接口响应后统一处理结果
 */
request.interceptors.response.use(
	(response) => {
		let res = response.data;
		// 如果是返回的文件
		if (response.config.responseType === "blob") {
			return res;
		}
		// 兼容服务端返回的字符串数据
		if (typeof res === "string") {
			res = res ? JSON.parse(res) : res;
		}
		return res;
	},
	(error) => {
		console.log("err" + error); // for debug
		return Promise.reject(error);
	}
);

export default request;

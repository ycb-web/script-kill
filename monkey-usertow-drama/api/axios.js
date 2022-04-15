import axios from './js_sdk'

const baseURL = process.env.NODE_ENV === 'development' ? 
	'https://app.jbstj.com/customer' : 'https://monkey.e.enjoyu.com'
// const baseURL = process.env.NODE_ENV === 'development' ? 
// 	'https://back.enjoyu.com' : 'https://back.enjoyu.com'

const baseURL2 = process.env.NODE_ENV === 'development' ? 
	// 'https://customer.enjoyu.com' : 'https://customer.enjoyu.com';
	'https://app.jbstj.com/customer' : 'https://customer.enjoyu.com/script-kill';

const baseURL3 = process.env.NODE_ENV === 'development' ? 
	// 'https://customer.enjoyu.com' : 'https://customer.enjoyu.com';
	'https://app.jbstj.com/customer' : 'https://customer.enjoyu.com/script-kill';


let request = axios.create({
	baseURL,
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		/* application/x-www-form-urlencoded */
		'User-Type': 'APP_USER' // 用户登陆类型：app用户:APP_USER  后台商户:STORE_USER
	},
})
axios.default.baseURL = baseURL
// 请求拦截器
request.interceptors.request.use(config => {
	// const accountInfo = wx.getAccountInfoSync();

	// const APPID = accountInfo.miniProgram.appId
	const tokens = uni.getStorageSync('token');
	const APPID = uni.getStorageSync('appId');
	
	// config.headers['X-TOKEN'] = tokens;
	config.headers['Authorization'] = tokens;
	config.headers['APPID'] = APPID;
	config.headers['merchantId'] = uni.getStorageSync('merchantId') || config.headers['merchantId']
	// config.headers['APPID'] = APPID;
	
	// config.headers['X-TOKEN'] = '$2y$10$Q/7c79J5pPr8bUw9..HIU.dqmO4dPrufvIwl6fFzfPU4.STriJoiG';
	return config
})
// 响应拦截
request.interceptors.response.use(
	res => {
		let {
			data
		} = res
		if(typeof data == 'string'){
			data = JSON.parse(data)
		}
		// _reslog(res)
		if (data.status === 200) {
			return res.data;
		} else if (data.status === 40001) {
			// uni.removeStorageSync("token")
			// uni.removeStorageSync("open_id")
			let inviteCode = uni.getStorageSync("inviteCode") || ''
			let vestige_id = uni.getStorageSync("vestige_id") || ''
			const page = uni.getStorageSync('page');
			uni.setStorageSync('page', true);
			uni.navigateTo({
				url: `/pages/login/index?inviteCode=${inviteCode}&vestige_id=${vestige_id}&page=true`
			});

			return false;
		} else {
			uni.showToast({
				title: data.msg || data.message || data.reason,
				icon: 'none'
			})
			return {...data};
		}
	},
	err => {
		const errObj = err.toJSON()

		if(/401/.test(err.message)){
			uni.setStorageSync('page', true)
			uni.navigateTo({
				url: `/pages/login/index`
			});
		} else {
			uni.showToast({
				title: err.toString(),
				icon: 'none'
			})
		}
		return Promise.reject(err.toString())
	}
)

// 请求接口日志记录
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("请求地址:", req.url)
		console.log(req.data || req.params);
	}
}

// 响应接口日志记录
function _reslog(res) {
	if (process.env.NODE_ENV === 'development') {
		console.log(`${res.config.url}响应结果：`, res.data)
	}
}

axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}











export {
	request,
	baseURL,
	baseURL2,
	baseURL3,
}

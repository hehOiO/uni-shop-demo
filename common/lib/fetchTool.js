import md5 from '../../common/lib/md5'
import config from '../../common/lib/config.js'
import cache from '../../common/lib/cache'
const qiniuUploader = require("../../common/lib/qiniuUploader");

var client_type = "android";
uni.getSystemInfo({
	success: function(e) {
		if (e['model'].indexOf('iPhone') > -1) {
			client_type = "ios";
		} else {
			client_type = "android";
		}
	}
})

var fetchTool = {
	Request: function(url, data, method, header) {
		let _self = this;
		data = fetchTool.bulidParms(data); //获取签名参数
		let version = encodeURI(fetchTool.config('appversion'));
		header = header || "application/x-www-form-urlencoded";
		method = method || "POST";
		let appid = fetchTool.config('appkey');
		let appsecret = fetchTool.config('appsecret');
		let sign = md5(md5(data['signature'] + appid + appsecret) + data['signature'])
		var deviceid = "",
			channel = "",
			api_path = url;
		// #ifdef APP-PLUS
		deviceid = plus.device.uuid;
		channel = plus.runtime.channel;
		version = plus.runtime.version;
		// #endif
		var __token__ = md5(md5(appid + deviceid) + md5(appsecret + deviceid) + md5(api_path) + md5(data['client_type']));
		if (url.indexOf("?") == -1) {
			url += "?version=" + version + "&sign=" + sign
		} else {
			url += "&version=" + version + "&sign=" + sign
		}

		url = fetchTool.config("baseURL") + url;

		
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: method,
				header: {
					"content-type": header,
					'appid': appid,
					'appsecret': appsecret,
					'deviceid': deviceid,
					'channel': channel,
					'token': __token__,
					'api-path': api_path,
					'version': version,
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					if (error && typeof(error) == "object") {
						error.call(self, e)
					} else {
						succ.call(self, {
							"code": 100,
							"msg": "请稍后..."
						})
						// uni.showToast({title:"网络繁忙！",icon:"none"});
					}

				}
			})
		})
	},
	Request1: function(url, data, method, header) {
		let _self = this;
		data = fetchTool.bulidParms(data); //获取签名参数
		let version = encodeURI(fetchTool.config('appversion'));
		header = header || "application/x-www-form-urlencoded";
		method = method || "POST";
		let appid = fetchTool.config('appkey');
		let appsecret = fetchTool.config('appsecret');
		let sign = md5(md5(data['signature'] + appid + appsecret) + data['signature'])
		var deviceid = "",
			channel = "",
			api_path = url;
		// #ifdef APP-PLUS
		deviceid = plus.device.uuid;
		channel = plus.runtime.channel;
		version = plus.runtime.version;
		// #endif
		var __token__ = "";
		uni.getStorage({
		    key: 'zbdata',
		    success: function (res) {
				__token__ = JSON.parse(res.data).token;
		    }
		});
		
	// 	if (url.indexOf("?") == -1) {
	// 		url += "?version=" + version + "&sign=" + sign
	// 	} else {
	// 		url += "&version=" + version + "&sign=" + sign
	// 	}
	
		url = fetchTool.config("base1URL") + url;
	
		
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: method,
				header: {
					"content-type": header,
					'appid': appid,
					'appsecret': appsecret,
					'deviceid': deviceid,
					'channel': channel,
					'token': __token__,
					'api-path': api_path,
					'version': version,
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					if (error && typeof(error) == "object") {
						error.call(self, e)
					} else {
						succ.call(self, {
							"code": 100,
							"msg": "请稍后..."
						})
						// uni.showToast({title:"网络繁忙！",icon:"none"});
					}
	
				}
			})
		})
	},
	bulidParms: function(params) {
		var client_type = "wechat";
		var SystemModel = uni.getSystemInfoSync().model;
		if (SystemModel.indexOf('iPhone') > -1) {
			client_type = "ios";
		} else {
			client_type = "android";
		}
		params['client_type'] = client_type;
		params['_timestamp'] = Math.round(new Date().getTime() / 1000);
		params['appkey'] = fetchTool.config('appkey');
		params['appsecret'] = fetchTool.config('appsecret');
		params['app_debug'] = fetchTool.config("APP_DEBUG");
		let signature = "";
		for (let sign in params) {
			signature += sign + "=" + params[sign] + "&"
		}
		params['signature'] = md5(md5(signature))
		delete params['appkey']
		delete params['appsecret']
		return params;
	},
	config: function(name) {
		// 支持 imagelist.kefu 
		var conf = config.getConfig(name);
		return conf;
	},
	cache: cache,
	formatDataInfo: function(data, val, key, son) {
		// 根据data数组 以及值 + key 匹配数据  
		var ret = false;
		key = key ? key : 'id';
		if (typeof data === 'string') {
			return false;
		}
		// 定义自数据 
		son = son ? son : 'sub'
		if (val) {
			for (var i = 0; i < data.length; i++) {
				if (data[i][son]) {
					if (typeof data[i][son] == "object") {
						for (var j = 0; j < data[i][son].length; j++) {
							if (data[i][son][j][key] == val) {
								ret = [];
								ret['index'] = j;
								ret['data'] = data[i][son][j];
								ret["tree"] = true;
								break;
							}
						}
					}
				}
				if (data[i][key] == val) {
					ret = [];
					ret['index'] = i;
					ret['data'] = data[i];
					ret["tree"] = false;
					break;
				}
			}
		}
		return ret;
	},
	uploadFile: function(url, files, data) {
		var _self = this;
		data = fetchTool.bulidParms(data); //获取签名参数
		var version = encodeURI(fetchTool.config('appversion'));
		var appid = fetchTool.config('appkey');
		var appsecret = fetchTool.config('appsecret');
		var sign = md5(md5(data['signature'] + appid + appsecret) + data['signature'])
		var router = url;
		if (url.indexOf("?") == -1) {
			url += "?version=" + version + "&sign=" + sign
		} else {
			url += "&version=" + version + "&sign=" + sign
		}
		url = fetchTool.config("baseURL") + url
		return new Promise((succ, error) => {
			uni.uploadFile({
				url: url,
				filePath: files,
				name: "file",
				formData: data,
				header: {
					"Content-Type": "multipart/form-data",
					'appid': appid,
					'appsecret': appsecret
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					fetchTool.ReportError("ajax", e, router);
					error.call(self, e)
				}
			});
		});
	},
	uploadFileList: function(url, files, data) {
		// 批量上传图片 （仅APP支持）
		var _self = this;
		data = fetchTool.bulidParms(data); //获取签名参数
		var version = encodeURI(fetchTool.config('appversion'));
		var appid = fetchTool.config('appkey');
		var appsecret = fetchTool.config('appsecret');
		var sign = md5(md5(data['signature'] + appid + appsecret) + data['signature'])
		var router = url;
		if (url.indexOf("?") == -1) {
			url += "?version=" + version + "&sign=" + sign
		} else {
			url += "&version=" + version + "&sign=" + sign
		}
		url = fetchTool.config("baseURL") + url
		return new Promise((succ, error) => {
			uni.uploadFile({
				url: url,
				files: files,
				name: "file",
				formData: data,
				header: {
					"Content-Type": "multipart/form-data",
					'appid': appid,
					'appsecret': appsecret
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					fetchTool.ReportError("ajax", e, router);
					error.call(self, e)
				}
			});
		});
	},
	JumpTargeLink: function(link) {
		// 连接跳转  http 则跳转到web-view
		if (link.indexOf("http://") >= 0 || link.indexOf("https://") >= 0) {
			var param = "JALON=1";
			try {
				param = link.split("?")[1];
			} catch (e) {}
			var linkview = "/pages/tool/webview?" + param + "&link=" + encodeURI(link);
			uni.navigateTo({
				url: linkview
			})
		} else {
			uni.navigateTo({
				url: link,
				fail: function(err) {
					uni.switchTab({
						url: link,
						fail: function(fe) {
							console.log("switchTab 跳转：" + link + "失败")
						}
					})
				}
			})
		}
	},
	ReportError: function(type, data, router) {
		// 上报错误信息到服务器 必须在配置文件中配置 
		if (fetchTool.config("app_debug") == false) {
			return false;
		}
		router = router ? router : "";
		// fetchTool.Request("config/appReportError",{type:type,router:router,data:JSON.stringify(data)}).then(request=>{
		// 	console.log(request); 
		// })
	},
	uploadQiniu: function(filepath) {

	}
}


module.exports = fetchTool;

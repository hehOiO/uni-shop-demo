import fetchTool from '../../common/lib/fetchTool'
import userService from '../../common/lib/userService'
var base = {
	Init: function() {
		// APP 初始化 
		fetchTool.Request('config/getinfo', {
			server: true
		}).then(res => {
			// 读取服务器配置并保存到缓存
			if (res['code'] == 200) {
				fetchTool.cache.put('web_config', res['data'])
			}
		})
	},
	update: function() {
		fetchTool.Request('config/update', {
			"runtimeAppid": plus.runtime.appid,
			"version": plus.runtime.version,
			"imei": plus.device.imei,
		}).then(res => {
			if (res.code == 200) {
				var openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
				uni.showModal({
					title: '发现新版本',
					content: res.data.note,
					showCancel: false,
					confirmText: "下载新版",
					success: (res => {
						if (res.confirm) {
							plus.runtime.openURL(openUrl);
						}
					})
				})
			}
		})
	}
}

let IS_Wx = false;
let system = []
let IS_IOS = false;
//#ifdef APP-PLUS
IS_IOS = plus.os.name === 'iOS' ? true : false;
//#endif 

//#ifdef MP-WEIXIN	
IS_Wx = true
//#endif

var printjson = function(val) {
	return JSON.stringify(val);
}


var message = function(options) {
	var config = {
		title: options.title || "操作成功",
		icon: options.icon || "none",
		image: options.image || "",
		mask: options.mask || true,
		duration: options.duration || 1500,
	};
	uni.showToast(config);
}




module.exports = {
	fetchTool,
	common: base,
	IS_APP: IS_Wx ? false : true,
	IS_Wx: IS_Wx,
	IS_IOS: IS_IOS,
	IS_Android: IS_IOS ? false : true,
	system: system,
	user: userService,
	print: printjson,
	message: message,
}

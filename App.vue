<script>
	import Vue from 'vue'
	var app_checktoken_timer = null;
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		methods: {
			...mapMutations(['task', 'task_clear'])
		},
		onLaunch: function() {
			var that = this;
			setTimeout(() => {
				uni.setTabBarBadge({
					index: 1,
					text: '31'
				});
				uni.showTabBarRedDot({
					index: 3
				});
			}, 1000);
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			that.$Request('config/getinfo',{server:true}).then(res=>{
				// 读取服务器配置并保存到缓存
				if (res['code'] == 200 ) { 
					that.$Cache.put('web_config',res['data'])
				}
			})
			that.chat()
			//#ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //锁定屏幕方向 
			console.log(process.env.NODE_ENV );
		
			// if ( process.env.NODE_ENV !== 'development' ){
			// 	that.$Request('config/update', {
			// 		"runtimeAppid": plus.runtime.appid,
			// 		"version": plus.runtime.version,
			// 		"imei": plus.device.imei,
			// 	}).then(res=>{
			// 		if (res.code == 200) {
			// 			var openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
			// 			uni.showModal({
			// 				title: '发现新版本',
			// 				content : res.data.note,
			// 				showCancel:false,
			// 				confirmText:"下载新版",
			// 				success:(res=>{
			// 					if (res.confirm) {
			// 						plus.runtime.openURL(openUrl);
			// 					}
			// 				})
			// 			})
			// 		}
			// 	})
			// }
		
		/*	uni.subscribePush({
				provider: "igexin",
				success: (e) => {
					that.$Cache.put("member_openPush", true); //是否开启推送 
				},
				fail: (err) => {
					that.$Cache.put("member_openPush", false); //是否开启推送 
				}
			});

			// 个推透传监听 
			uni.onPush({
				provider: 'igexin',
				success: function() {
					console.log('监听透传成功');
				},
				callback: function(data) {
					that.onListenerIgetTui(data.data, true);
					plus.push.clear();
				}
			});
			// 用户点击通知栏消息进入的APP 
			plus.push.addEventListener("click", function(msg) {
				console.log("来自click事件监听")
				console.log("我是click:" + JSON.stringify(msg));
				if (msg.payload) {
					that.onListenerIgetTui(msg, false);
				}
				plus.push.clear();

			}, false); */
			
			
			// #endif
		},
		onShow: function() {
			console.log("我启动了！");
		},
		onHide: function() {
			//#ifdef APP-PLUS
// 			if (plus.push.getAllMessage()) {
// 				plus.push.clear();
// 			}
			//#endif
		},
		onUnload: function() {
			this.task_clear(); //清理正在请求的任务 
		},
		methods: {

			onPushIgetTui:function(data) {
				if (data.errMsg == "onPush:ok") {
					this.IGetTuiBusiness(data.data);
				}
				// 处理个推透传数据 
			},
			onListenerIgetTui:function(data, isApp) {
				// 处理通知栏点击数据 
				if (data.payload) {
					this.IGetTuiBusiness(data.payload, isApp);
				}
			},
			IGetTuiBusiness: function(data, isApp) {
				//console.log(JSON.stringify(data)); 
				// {"action":"task","content":"您接到了一个新的浏览任务，赶快去完成吧~","id":1542299746,"title":"来新任务啦，赶快做任务吧","model":"showModal"}
				// action = cash提现 buyer买号 task任务 
				var that = this;
				try {
					data['model'] = data['model'] || "";
					if (data.title && data.content) {
						if (data.model == "showToast") {
							uni.showToast({
								title: data.content,
								icon: "none",
							});
						} else if (data.model == "navigateTo" && data.url != "") {
							uni.navigateTo({
								url: data.url,
								fail: function(err) {
									uni.switchTab({
										url: data.url
									})
								}
							})
						} else {
							console.log("action:" + data.action);
							console.log(isApp);
							if (data.action == "task" && isApp) {
								console.log("在APP环境了");
								uni.vibrateShort();
								uni.showTabBarRedDot({
									index: 1
								});
								return false;
							}
							console.log(JSON.stringify(data)); 
							// if(data.action == "showModal")
							uni.showModal({
								title: data.title,
								content: data.content,
								cancelText: data.cancelText || "取消",
								confirmText: data.confirmText || "确定",
								success: function(modal) {
									plus.push.clear();
									if (modal.confirm) {
										var itemid = data.id;
										// 用户点击了确定
										if (data.action == "task") {
											that.task_clear(); //清理正在请求的任务 
											uni.switchTab({
												url: "/pages/task/index"
											})
										} else if (data.action == "cash") {
											uni.navigateTo({
												url: "/pages/ucenter/score/cashDetail?id=" + itemid
											})
										} else if (data.action == "buyer") {
											uni.navigateTo({
												url: "/pages/ucenter/security/buynumber"
											})
										}
									}
								}
							});
						}
					}
				} catch (e) {
					//console.log(JSON.stringify(e)); 
				}

			},
			chat:function(){//网易七鱼客服
				// (function (w, d, n, a, j) {
				// 	w[n] = w[n] || function () {
				// 		(w[n].a = w[n].a || []).push(arguments)
				// 	};
				// 	j = d.createElement('script');
				// 	j.async = true;
				// 	j.src = 'https://qiyukf.com/script/f72a7748cf06401510e43f552c8a8d82.js';
				// 	d.body.appendChild(j);
				// })(window, document, 'ysf');
				// 
				// ysf('onready', function () {
				// 	// todo
				// 	console.log('ready');
				// 	console.log(ysf('url'));
				// 	
				// })

			}
			
		},
	}
</script>

<style lang="less">
	/*每个页面公共css */
	@import "./static/css/base.less";
	@import "./static/css/global.css";
	@import "./colorui/main.css";
	@import "colorui/icon.css";
	/* 这是页面的公用css */

	page {
		background-color: @baseBackColor;
		/*		height: 100%;*/
		font-size: 32px;
		line-height: 1.6;
	}


	checkbox,
	radio {
		margin-right: 10px;
	}

	.is-56aafb {
		color: @baseBackGroundColor;
	}

	form {
		width: 100%;
	}

	/* page */

	.container {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		justify-content: space-between;
		font-size: 32px;
		// font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
		font-family: "苹果专用","Microsoft YaHei";
	}

	.page-head {
		padding: 60px 50px 80px;
		text-align: center;
		line-height: initial;
		height: 60px;
	}

	.page-head-title {
		display: inline-block;
		padding: 0 40px;
		font-size: 30px;
		height: 60px;
		line-height: 60px;
		color: #BEBEBE;
		box-sizing: border-box;
		border-bottom: 2px solid #D8D8D8;
	}

	.page-head-desc {
		padding-top: 20px;
		color: #9B9B9B;
		font-size: 32px;
	}

	.page-body {
		width: 100%;
		flex-grow: 1;
		overflow-x: hidden;
	}

	.page-body-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.page-body-wording {
		text-align: center;
		padding: 200px 100px;
	}

	.page-body-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		width: 100%;
		padding: 50px 0 150px 0;
	}

	.page-body-title {
		margin-bottom: 100px;
		font-size: 32px;
	}

	.page-body-text {
		font-size: 30px;
		line-height: 52px;
		color: #ccc;
	}

	.page-body-text-small {
		font-size: 24px;
		color: #000;
		margin-bottom: 100px;
	}

	.page-foot {
		margin: 100px 0 30px 0;
		text-align: center;
		color: #1aad19;
		font-size: 0;
	}

	.icon-foot {
		width: 152px;
		height: 23px;
	}

	.page-section {
		width: 100%;
		margin-bottom: 60px;
	}

	.page-section_center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.page-section:last-child {
		margin-bottom: 0;
	}

	.page-section-gap {
		box-sizing: border-box;
		padding: 0 30px;
	}

	.page-section-spacing {
		box-sizing: border-box;
		padding: 0 80px;
	}

	.page-section-title {
		font-size: 28px;
		color: #999999;
		margin-top: 10px;
		margin-bottom: 10px;
		padding-left: 30px;
		padding-right: 30px;
	}

	.page-section-gap .page-section-title {
		padding-left: 0;
		padding-right: 0;
	}

	/* example */

	.index-hd {
		padding: 90px;
		text-align: center;
	}

	.index-logo {
		width: 140px;
		height: 140px;
	}

	.btn-area {
		margin-top: 60px;
		box-sizing: border-box;
		width: 100%;
		padding: 0 30px;
	}

	.image-plus {
		width: 150px;
		height: 150px;
		border: 2px solid #D9D9D9;
		position: relative;
	}

	.image-plus-nb {
		border: 0;
	}

	.image-plus-text {
		color: #888888;
		font-size: 28px;
	}

	.image-plus-horizontal {
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: #d9d9d9;
		width: 4px;
		height: 80px;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}

	.image-plus-vertical {
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: #d9d9d9;
		width: 80px;
		height: 4px;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}

	.color1 {
		background-color: #1AAD19;
		color: #FFFFFF;
	}

	.color2 {
		background-color: #2782D7;
		color: #FFFFFF;
	}

	.color3 {
		background-color: #F1F1F1;
		color: #353535;
	}

	.has-bg-base {
		background-color: @baseBackGroundColor !important;
		color: #fff !important;
	}

	.siderfloat {
		position: fixed;
		bottom: 10%;
		left: 50%;
		margin-left: 35%;
		z-index: 10001;

	}

	.siderfloat .iconfont {
		background: @baseBackGroundColor;
		width: 90rpx;
		height: 90rpx;
		line-height: 85rpx;
		text-align: center;
		border-radius: 50%;
		color: #FFFFFF;
		font-size: 50rpx;
		margin-bottom: 14rpx;
	}

	.siderfloat .pictureIcon image,
	.siderfloat .pictureIcon button {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		background: #fff;
		padding: 0px;
		margin-bottom: 14rpx;
		opacity: 1;
	}

	.page-show-load {
		background: url("@{staticHost}/common/common-loading.gif") center center no-repeat;
		background-size: 100rpx 100rpx;
		position: fixed;
		z-index: 101;
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 100%;
		top: 0%;
		/*   // left: 50%;*/
	}
</style>

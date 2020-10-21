<template>
	<view class="s-page-wrapper is-100vh">
		<view class="is-33vh has-mgt-10">
			<view class="is-flex is-column is-justify-center  is-align-center is-height-100">
				<image src="../../static/images/common/87.png" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="registercontent">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="11" :value="register.phone" placeholder="请输入手机号" @input="BindInput" data-val="register|phone"
					 class="is-input1 " />
				</view>
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="6" :value="register.msgcode" placeholder="短信验证码" @input="BindInput" data-val="register|msgcode"
					 class="is-input1 " />
					<view class="codeimg" @tap="getsmscode">{{smsbtn.text}}</view>
				</view>

				<view class=" has-radius has-mgtb-10">
					<input :value="register.password" placeholder="请输入登录密码" :password="register.showpwd" @input="BindInput" data-val="register|password"
					 class="is-input1" />
					<view class="iconfont" v-if="register.password.length > 0 " :class="[!register.showpwd?'icon-visibilityoff':'icon-visibility']"
					 @click="changePassword" data-val="register|showpwd"></view>
				</view>

				<view class=" has-radius has-mgtb-10">
					<input :value="register.cpassword" placeholder="请再次输入登录密码" :password="register.showcpwd" @input="BindInput"
					 data-val="register|cpassword" class="is-input1" />
					<view class="iconfont" v-if="register.cpassword.length > 0 " :class="[!register.showcpwd?'icon-visibilityoff':'icon-visibility']"
					 @click="changePassword" data-val="register|showcpwd"></view>
				</view>

				<view class=" has-mgtb-10 ">
					<input type="text" :value="register.agent" placeholder="请输入邀请码" @input="BindInput" data-val="register|agent"
					 class="is-input1 " />
				</view>

				<view class=" registerbtn has-radius has-mgtb-20">
					<button :loading="register.loading" @tap="defaultHandlerReg"> {{ register.loading ? "注册中...":"注 册"}} </button>
				</view>
			</view>
		</view>
		<view class="is-20vh has-mgt-80">
			<navigator url="/pages/detail/content?id=15" class=" has-radius is-center is-grey " hover-class="">
				<text>注册即表示同意</text><text class="is_xieyi">《用户协议》</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	var base = require('../../common/lib/base.js');
	export default {
		data() {
			return {
				current: 0,
				register: {
					phone: '',
					password: '',
					cpassword: '',
					msgcode: '',
					showpwd: true,
					showcpwd: true,
					loading: false,
					agent: "",
				},
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60
				},
				timerId: null,
			}
		},
		methods: {
			BindInput: function(e) {
				var dataval = e.currentTarget.dataset.val,
					dataval = dataval.split("|"); //字符分割  
				var value = e.detail.value;
				var model = dataval[0],
					type = dataval[1];
				if (model == "login") {
					var data = this.login;
					data[type] = value;
					this.login = data;
				} else {
					var data = this.register;
					data[type] = value;
					this.register = data;
				}
			},
			clearInput: function(e) {
				var dataval = e.currentTarget.dataset.val,
					dataval = dataval.split("|"); //字符分割  
				var model = dataval[0],
					type = dataval[1];
				if (model == "login") {
					var data = this.login;
					data[type] = "";
					this.login = data;
				} else {
					var data = this.register;
					data[type] = "";
					this.register = data;
				}
			},
			changePassword: function(e) {
				var dataval = e.currentTarget.dataset.val,
					dataval = dataval.split("|"); //字符分割  
				var model = dataval[0],
					type = dataval[1];
				if (model == "login") {
					this.login.showpwd = !this.login.showpwd;
				} else {
					this.register[type] = !this.register[type];
				}
			},
			clearData: function() {
				this.register = {
					phone: '',
					password: '',
					cpassword: '',
					msgcode: '',
					showpwd: true,
					showcpwd: true,
					loading: false,
					agent: "",
				};
				this.smsbtn = {
					text: '获取验证码',
					status: false,
					codeTime: 60
				};
				this.timerId = null;
			},
			findPassword: function() {
				uni.navigateTo({
					url: '/pages/ucenter/security/findPassword'
				});
			},
			defaultHandlerReg: function() {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				var register = this.register;
				if (register.phone == "") {
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					});
					return false;
				}
				if (register.phone.toString().length < 11) {
					uni.showToast({
						title: "请输入11位以上的手机号",
						icon: "none"
					});
					return false;
				}
				if (register.msgcode == "") {
					uni.showToast({
						title: "短信验证码不能为空",
						icon: "none"
					});
					return false;
				}
				if (register.msgcode.toString().length != 6) {
					uni.showToast({
						title: "短信验证码错误",
						icon: "none"
					});
					return false;
				}
				if (register.password == "") {
					uni.showToast({
						title: "请输入登录密码",
						icon: "none"
					});
					return false;
				}
				if (register.cpassword == "") {
					uni.showToast({
						title: "请再次输入登录密码",
						icon: "none"
					});
					return false;
				}
				if (register.cpassword != register.password) {
					uni.showToast({
						title: "两次密码输入不一致",
						icon: "none"
					});
					return false;
				}
				uni.showLoading({
					title: '请稍等..',
					mask: true
				});
				this.register.loading = true;
				this.$Request('member/register', {
					phone: register.phone,
					pwd: register.password,
					code: register.msgcode,
					cpwd: register.cpassword,
					agent: register.agent,
				}).then(request => {
					uni.hideLoading();
					this.register.loading = false;
					uni.showToast({
						title: request['msg'],
						icon: "none"
					});
					if (request['code'] == 200) {
						uni.navigateBack();
					}

				});
			},
			getsmscode: function() {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				var register = this.register;
				if (register.phone == "") {
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					});
					return false;
				}
				if (register.phone.toString().length < 11) {
					uni.showToast({
						title: "请输入11位以上的手机号",
						icon: "none"
					});
					return false;
				}
				if (this.smsbtn.status) {
					uni.showToast({
						title: "验证码已发送，请勿重复获取",
						icon: "none"
					});
					return false;
				}
				this.smsbtn.status = true;
				var that = this;
				uni.showLoading({
					title: '验证码发送中',
					mask: true
				});
				this.$Request("config/getmessagesms", {
					phone: register.phone,
					action: 'register'
				}).then(request => {
					uni.hideLoading();
					uni.showToast({
						title: request['msg'],
						icon: "none"
					});
					if (request['code'] == 200) {
						that.timerId = setInterval(() => {
								var codeTime = that.smsbtn.codeTime;
								codeTime--;
								that.smsbtn.codeTime = codeTime;
								that.smsbtn.text = codeTime + "S";
								if (codeTime < 1) {
									clearInterval(that.timerId);
									that.smsbtn.text = "重新获取";
									that.smsbtn.codeTime = 60;
									that.smsbtn.status = false;
								}
							},
							1000);
						return false;
					} else {
						this.smsbtn.status = false;
					}
				});
			},
		},
		onLoad: function(param) {
			if (param['current']) {
				this.current = param['current']; // 当前滑块所在位置 
			} else {
				this.current = 0; // 当前滑块所在位置 
			}
		},
		onShow: function() {
			var set_invitation_code = false; 
			uni.getClipboardData({
				success: (data) => {
					if (data.data) {
						data.data.replace(/￥(\S*)￥/, (res) => {
							if (res) {
								// 解析后的邀请码 请求服务器校验 邀请码是否存在
								var code = res.replace("￥", '').replace("￥", ''); 
								this.$Request("member/get_passcode_status", {
									code: code
								}).then(res => {
									if (res.code == 200) {
										set_invitation_code = true; 
										this.$Cache.put("app_invitation_code", res.data.code);
										this.register.agent = res.data.code; 
									}
								});
							}
						})
					}
				}
			})
			if(set_invitation_code == false) {
				var agent = this.$Cache.get("app_invitation_code");
				if(agent){
					this.register.agent = agent; 
				}
			}
		},
		onUnload: function() {
			this.timerId && clearInterval(this.timerId);
			this.clearData();
		},
		onNavigationBarButtonTap: function() {
			uni.navigateTo({
				url: '/pages/ucenter/register'
			});
		}
	}
</script>

<style lang="less">
	@import "../../common/uni.css";
	@import "../../common/icon.css";
	@import "../../static/css/base.less";

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.registercontent {
		width: 85%;
		margin: 0 auto;
	}

	.logoimg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.is-input1 {
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		padding: 12rpx;
		color: #353535;
		font-size: 32rpx;
		box-sizing: border-box;
		appearance: none;
		border: 2rpx solid #e5e5e5;
		box-shadow: none;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		padding-left: 30rpx;
		margin: 0;
		font-family: inherit;
		background: #fff;
		resize: none;
	}

	.iconfont {
		position: absolute;
		font-size: 40rpx;
		right: 12%;
		z-index: 999;
		width: 105rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.codeimg {
		position: absolute;
		font-size: 28rpx;
		right: 12%;
		z-index: 999;
		width: 200rpx;
		text-align: center;
		color: #353535;
		margin-top: -11%;
		background: #fff;
		border-top-right-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.registerbtn button {
		margin-top: 20rpx;
		height: 88rpx;
		width: 100%;
		line-height: 88rpx;
		color: #ffffff;
		font-size: 32rpx;
		border-radius: 44rpx;
		outline: 0;
		display: block;
		margin: 0;
		font-family: inherit;
		background: @baseBackGroundColor;
		opacity: 0.8;
	}

	button:after {
		border: 2rpx solid @baseBackGroundColor;
	}

	.is_xieyi {
		color: @baseBackGroundColor;
	}
</style>

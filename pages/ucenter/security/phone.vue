<template>
	<view class="content">

		<view class="s-page-wrapper has-bg-white">
			<view class="page-security has-pdtb-20">
				<image src="../../../static/images/common/security-icon.png" mode="widthFix" class="is-response"></image>
			</view>
		</view>
		<view class="s-col is-col-24 ordersnInf">
			<view class="s-list has-mgt-0">
				<view class="is-item-line has-pdtb-20">
					<view class="is-item-bd">
						{{sendData.phone}}
					</view>
				</view>
			</view>
			<view class="s-list has-mgt-0">
				<view class="is-item-line ">
					<view class="is-item-bd">
						<input type="password" :value="sendData.pwd" placeholder="登录密码" @input="BindInput" data-val="sendData|pwd">
					</view>
				</view>
			</view>
			<view class="s-list has-mgt-0">
				<view class="is-item-line ">
					<view class="is-item-bd">
						<input type="number" :value="sendData.newPhone" placeholder="新手机号" @input="BindInput" data-val="sendData|newPhone">
					</view>
				</view>
			</view>
			<view class="s-list has-mgt-0">
				<view class="is-item-line ">
					<view class="is-item-bd smscodebtn">
						<input type="number" :value="sendData.smscode" placeholder="短信验证码" @input="BindInput" data-val="sendData|smscode">
						<view class="getsmscode" @tap="getsmscode">{{smsbtn.text}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="s-col is-col-24">
			<view class="s-list has-mgt-0">
				<view class="is-item-line ">
					<view class="is-item-bd s-btn" @tap="submitTask">
						<view class="is-btn-lg has-bg-base">{{loadingtext}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="s-col is-col-24">
			<view class="s-list has-mgt-0">
				<view class="is-item-line has-borderb">
					<view class="is-item-bd  is-size-14 is-lh-18">
						<view class="has-desc-color has-mgt-5">1.更改手机号时需要验证您的登录密码，如忘记请联系客服</view>
						<view class="has-desc-color has-mgt-5">2.输入密码后输入您的新手机号并获取验证码。</view>
						<view class="has-desc-color has-mgt-5" v-if="app_member_kefu_weixin != '' ">3.如果您在使用中有任何问题可以联系在线客服</view>
						<view class="is-red is-lh-18 has-mgt-5 has-mgl-10" v-if="app_member_kefu_weixin != '' ">
							{{app_member_kefu_weixin}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				sendData: {
					phone: '',
					smscode: '',
					newPhone: '',
					pwd:'', 
				},
				loadingtext: '确认更换',
				isLoading: false,
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60
				},
				timerId: null,
				app_member_kefu_weixin: "",
			}
		},
		onUnload: function() {
			this.clearData();
		},
		onLoad: function() {
			var phone = this.$SysUser.get("phone");
			phone = phone.substr(0, 3) + '****' + phone.substr(7)
			this.sendData.phone = phone;
			this.app_member_kefu_weixin = this.$Sysconf("app_member_kefu_weixin");
		},
		methods: {
			clearData: function() {
				this.sendData = {
					phone: '',
					npwd: '',
					cpwd: '',
					smscode: '',
				};
				this.loadingtext = "确定";
				this.isLoading = false;
				this.smsbtn = {
					text: '获取验证码',
					status: false,
					codeTime: 60
				};
				this.timerId && clearInterval(this.timerId);
				this.timerId = null;
			},
			BindInput: function(e) {
				// 监听INPUT 事件
				var dataval = e.currentTarget.dataset.val,
					dataval = dataval.split("|"); //字符分割  
				var value = e.detail.value;
				var model = dataval[0],
					type = dataval[1];
				if (model == "sendData") {
					var data = this.sendData;
					data[type] = value;
					this.sendData = data;
				}
			},
			submitTask() {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				if (this.isLoading) {
					return false;
				}
				var sendData = this.sendData;
				if (sendData.smscode == "") {
					uni.showToast({
						title: "请输入短信验证码"
					});
					return false;
				}
				if(sendData.newPhone == ""){
					uni.showToast({
						title: "请输入新手机号"
					});
					return false;
				}
				sendData['uid'] = this.$SysUser.openid();
				this.isLoading = true;
				this.loadingtext = "请稍等...";
				this.$Request("member/update_old_phone", sendData).then(res => {
					this.isLoading = false;
					this.loadingtext = "确定";
					uni.showToast({
						title: res.msg
					});
					if (res.code == 200) {
						this.$SysUser.save(res.data); // 更新用户的信息  
						setTimeout(function() {
							uni.reLaunch({
								url: "/pages/index/index"
							})
						}, 1500);
					}
				});
			},
			getsmscode: function() {
				uni.hideKeyboard();
				var register = this.sendData;
				var phone = register['newPhone'];
				if (phone == "") {
					uni.showToast({
						title: "请输入新手机号",
						icon: "none"
					});
					return false;
				}
				if (phone.toString().length < 11) {
					uni.showToast({
						title: "请输入新手机号",
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
					phone: phone,
					action: 'update_phone'
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
					}else{
						this.smsbtn.status = false; 
					}
				});
			},
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";
	@import "../../../common/uni.css";
	@import "../../../common/icon.css";

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.ordersnInf input {
		height: 80rpx;
		line-height: 60rpx;
		padding: 10rpx;
	}

	.smscodebtn input {
		width: 70%;
		float: left;
	}

	.smscodebtn .getsmscode {
		width: 25%;
		float: right;
		background: @baseBackGroundColor;
		font-size: 24rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 10rpx;
		text-align: center;
		color: #fff;
	}

	.page-security {
		margin: 0 auto;
		text-align: center;
		width: 300upx;
	}
</style>

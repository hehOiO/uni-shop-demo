<template>
	<view class="content">
		<view class="s-col is-col-24 ordersnInf">
			<view class="s-list has-mgt-0">
				<view class="is-item-line ">
					<view class="is-item-bd">
						<input type="number" :value="sendData.phone" placeholder="请输入手机号" @input="BindInput" data-val="sendData|phone">
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

		<view class="s-col is-col-24 ordersnInf">
			<view class="s-list">

				<view class="is-item-line ">
					<view class="is-item-bd">
						<input type="password" :value="sendData.npwd" placeholder="请输入新密码" @input="BindInput" data-val="sendData|npwd">
					</view>
				</view>
				<view class="is-item-line ">
					<view class="is-item-bd">
						<input type="password" :value="sendData.cpwd" placeholder="请确认新密码" @input="BindInput" data-val="sendData|cpwd">
					</view>
				</view>

			</view>
		</view>


		<view class="s-col is-col-24 ordersnInf">
			<view class="s-list">
				<view class="is-item-line ">
					<view class="is-item-bd s-btn" @tap="submitTask">
						<view class="is-btn-lg has-bg-base">{{loadingtext}}</view>
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
					npwd: '',
					cpwd: '',
					smscode: '',
				},
				loadingtext: '确定',
				isLoading: false,
				smsbtn: {
					text: '获取验证码',
					status: false,
					codeTime: 60
				},
				timerId: null,
			}
		},
		onUnload: function() {
			this.clearData();
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
				if (sendData.npwd == "") {
					uni.showToast({
						title: "请输入新密码",
						icon:"none"
					});
					return false;
				}
				if (sendData.cpwd == "") {
					uni.showToast({
						title: "请确认新密码",
						icon:"none"
					});
					return false;
				}
				if (sendData.cpwd != sendData.npwd) {
					uni.showToast({
						title: "确认密码和新密码不一致",
						icon:"none"
					});
					return false;
				}
				this.isLoading = true;
				this.loadingtext = "请稍等...";
				this.$Request("member/findpassword", sendData).then(res => {
					this.isLoading = false;
					this.loadingtext = "确定";
					uni.showToast({
						title: res.msg
					});
					if (res.code == 200) {
						setTimeout(function() {
							uni.navigateBack();
						}, 1500);
					}
				});
			},
			getsmscode: function() {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				var register = this.sendData;
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
					action: 'findpassword'
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
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";
	@import "../../../common/uni.css";
	@import "../../../common/icon.css";

	page {
		min-height: 100%;
		background-color: @baseBackColor;
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
</style>

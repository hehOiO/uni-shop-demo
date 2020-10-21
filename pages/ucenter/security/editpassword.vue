<template>
	<view class="content">
		<view class="s-col is-col-24 ordersnInf">
			<view class="s-list has-mgt-0">
				<view class="is-item-line ">
					<view class="is-item-bd">
						<input type="password" :value="sendData.pwd" placeholder="请输入旧密码" @input="BindInput" data-val="sendData|pwd">
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
					pwd: '',
					npwd: '',
					cpwd: '',
				},
				loadingtext: '修改',
				isLoading: false,
			}
		},
		methods: {
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
				let _self = this;
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				if (this.isLoading) {
					return false;
				}
				var sendData = this.sendData;
				if (sendData.pwd == "") {
					uni.showToast({
						title: "请输入旧密码",
						icon:"none"
					});
					uni.showToast({
						title: "请输入新密码",
						icon:"none"
					});
					return false;
				}
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
				sendData['uid'] = this.userid;
				this.$Request("member/edit_password", sendData).then(res => {
					this.isLoading = false;
					this.loadingtext = "修改";
					uni.showToast({
						title: res.msg,
						icon:"none"
					});
					if (res.code == 200) {
						_self.$SysUser.loginout(); // 退出当前用户 
						_self.userinfo = _self.$SysUser.get();
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/ucenter/login',
							});
						}, 1500);
					}
				});
			}
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			if (!userid) {
				uni.navigateTo({
					url: '/pages/ucenter/login'
				});
				return false;
			}
			this.userid = userid;
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
</style>

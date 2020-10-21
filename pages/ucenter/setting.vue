<template>
	<view class="content">
		<view class="user_content">
			<!-- 未登录S -->
			<!-- <view class="user_content_list" v-if="userid == false" @tap="JumpModel" data-model="/pages/ucenter/login">
				<view class="user_content_row">
					<view class="">头像</view>
					<view class="iconfont icon-ico_rightarrow"></view>
					<view class="img">
						<image :src="defaultAvatar" mode="aspectFit" style=""/>
					</view>
				</view>
			</view> -->
			<view class="user_content_list" v-if="userid == false" @tap="JumpModel" data-model="/pages/ucenter/login">
				<view class="user_content_row">
					<view class="">会员ID</view>
					<view class="iconfont icon-ico_rightarrow"></view>
					<view class="username">
						<text>未登录</text>
					</view>
				</view>
			</view>
			<!-- 未登录E -->

			<!-- 已登录 S-->
			<!-- <view class="user_content_list" v-if="userid != false" @tap="updateAvatar">
				<view class="user_content_row">
					<view class="">头像</view>
					<view class="iconfont icon-ico_rightarrow"></view>
					<view class="img">
						<image :src="defaultAvatar" mode="aspectFit" style="" />
					</view>

				</view>
			</view> -->
			<view class="user_content_list" v-if="userid != false" @tap="copyuserId">
				<view class="user_content_row">
					<view class="">会员ID</view>
					<view class="iconfont icon-ico_rightarrow"></view>
					<view class="username">
						<text v-if="userinfo['username'] != ''">{{userinfo['username']}}</text>
						<text v-if="userinfo['username'] == ''">未设置</text>
					</view>
				</view>
			</view>
			<view class="user_content_list" v-if="userid != false" @tap="bindPhone">
				<view class="user_content_row">
					<view class="">手机号</view>
					<view class="iconfont icon-ico_rightarrow"></view>
					<view class="username">
						<text v-if="userinfo['phone'] != ''">{{userinfo['phone']}}</text>
						<text v-if="userinfo['phone'] == ''">去绑定</text>
					</view>
				</view>
			</view>

			<!-- 已登录 E-->
			<!-- 
			<view class="user_content_list" @tap="browseRecords">
				<view class="user_content_row">
					<view class="" >浏览记录</view>
					<view class="iconfont icon-ico_rightarrow" ></view>
				</view>
			</view> -->
			<view class="user_content_list" @tap="clearRuntime">
				<view class="user_content_row">
					<view class="">清理缓存</view>
					<view class="iconfont icon-ico_rightarrow"></view>
				</view>
			</view>

			<!-- <view class="user_content_list list-line" v-if="userid !== false" @tap="JumpModel" data-model="/pages/ucenter/security/push">
				<view class="user_content_row">
					<view class="">消息设置</view>
					<view class="iconfont icon-ico_rightarrow"></view>
				</view>
			</view> -->

			<view class="user_content_list list-line" @tap="JumpModel" data-model="/pages/tool/about">
				<view class="user_content_row">
					<view class="">关于我们</view>
					<view class="iconfont icon-ico_rightarrow"></view>
				</view>
			</view>

			<!-- <view class="user_content_list" @tap="JumpModel" data-model="/pages/tool/feedback">
				<view class="user_content_row">
					<view class="">意见反馈</view>
					<view class="iconfont icon-ico_rightarrow"></view>
				</view>
			</view> -->

			<view class="user_content_list list-line" v-if="userid == false" @tap="JumpModel" data-model="/pages/ucenter/login">
				<view class="user_content_row">
					<view class="">立即登录</view>
					<view class="iconfont icon-ico_rightarrow"></view>
				</view>
			</view>

			<view class="user_content_list list-line" v-if="userid != false" @tap="JumpModel" data-model="/pages/ucenter/security/editpassword">
				<view class="user_content_row">
					<view class="">修改密码</view>
					<view class="iconfont icon-ico_rightarrow"></view>
				</view>
			</view>

			<view class="user_content_list" v-if="userid != false" @tap="loginout">
				<view class="user_content_row">
					<view class="">退出登录</view>
					<view class="iconfont icon-ico_rightarrow"></view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	var base = require('../../common/lib/base.js');
	export default {
		data() {
			return {
				page: 1,
				showFooterLoading: true,
				navlist: [],
				userid: false,
				userinfo: {},
				defaultAvatar: '',
				showpopup: {
					signature: {
						show: false
					},
					nickname: {
						show: false
					},
					showMask: false,
				}
			}
		},
		methods: {
			HomeInit: function() {
				let _self = this;
				_self.userid = _self.$SysUser.openid(),
				_self.userinfo = _self.$SysUser.get();
			},
			updateAvatar: function() {
				// 修改图片
				// this.handleUpdataImg()
				return false;
			},

			bindPhone: function() {
				let _self = this;
				var userid = _self.userid;
				if (!userid) {	
					return false;
				}
				uni.navigateTo({
					url: "/pages/ucenter/security/phone",
				})
			},
			copyuserId: function() {

			},
			clearRuntime: function() {
				let users_local_info = this.$Cache.get("users_local_info");
				let app_message_push = this.$Cache.get("app_message_push"); 
				this.$Cache.clear(); // 清理所有缓存 
				base.common.Init(); // 获取初始化配置 
				this.$Cache.put("users_local_info", users_local_info); // 缓存登录信息 
				if ( app_message_push ){
					this.$Cache.put("app_message_push", app_message_push); // 缓存登录信息 
				}
				uni.showToast({
					title: '缓存清理成功',
					icon: 'success'
				});
			},
			JumpModel: function(e) {
				let model = e['currentTarget']['dataset']['model'];
				uni.navigateTo({
					url: model,
					fail: function(err) {
						uni.switchTab({
							url: model
						})
					}
				})
			},
			loginout: function() {
				var _self = this;
// 				const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert'); 
// 				dcRichAlert.show({
// 					title: "温馨提示",
// 					titleColor: '#303133',
// 					content: "您确定退出当前帐号吗？",
// 					contentAlign: 'left',
// 					buttons: [{
// 							title: '确定',
// 							titleColor: '#409EFF'
// 						},
// 						{
// 							title: '取消',
// 							titleColor: '#303133'
// 						},
// 					]
// 				}, result => {
// 					if (result.index == 0) {
// 						 _self.$SysUser.loginout();
// 						_self.userid = false;
// 						_self.userinfo = _self.$SysUser.get();
// 						uni.showToast({
// 							title: '退出成功',
// 							icon: 'success'
// 						});
// 						uni.reLaunch({
// 							url: '/pages/ucenter/login',
// 						});
// 						
// 					}
// 				});
				uni.showModal({
					title: '温馨提示',
					content: '您确定退出当前账号吗?',
					success: result => {
						if(result.confirm){
							 _self.$SysUser.loginout();
							 uni.showToast({
							 	title: '退出成功',
							 	icon: 'success',
							 });
							_self.userid = false;
							_self.userinfo = _self.$SysUser.get();
							uni.reLaunch({
								url: '/pages/ucenter/login',
							});

						}
						if(result.cancel){
							console.log('用户点击取消')
						}
					},
					fail: () => {},
					complete: () => {}
				});
			
			},
			//修改图像
			handleUpdataImg(){
				console.log('修改图片')
				uni.chooseImage({
					success:(chooseImageres)=>{
						const tempFilePath=chooseImageres.tempFilePaths;
						let url='';
						// uni.uploadFile()
						// this.$uploadFile()
						
					}
				})
			}
		},
		onShow: function() {
			this.defaultAvatar = this.$Sysconf('imagelist.defaultAvatar');
			this.HomeInit()
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";

	.user_content .user_content_list {
		position: relative;
		background-color: #fff;
		height: 100rpx;
		line-height: 100rpx;
		overflow: hidden;
	}

	.user_content .user_content_list:before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: 200%;
		height: 200%;
		border: 0 #F4F6F9 solid;
		box-sizing: border-box;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		pointer-events: none;
		z-index: 0;
		border-bottom-width: 2rpx;
	}

	.user_content .user_content_list .user_content_row view {
		float: left;
		color: #252629;
	}

	.user_content .user_content_list .user_content_row image {
		float: left;
		display: inline-block;
		margin-top: 18rpx;
		width: 64rpx;
		height: 64rpx;
		margin-left: 20rpx;
		border-radius: 50%;
	}

	.user_content .user_content_list .user_content_row view:nth-child(1) {
		padding-left: 20rpx;
	}

	.user_content .user_content_list .user_content_row view:nth-child(2) {
		float: right;
		padding-right: 20rpx;
		font-size: 20rpx;
	}

	.user_content .user_content_list .user_content_row view:nth-child(3) {
		float: right;
		padding-right: 20rpx;
	}

	.user_content .user_content_list .user_content_row .username {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: right;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user_content .user_content_list .user_content_row .username text {
		font-size: 30rpx;
		color: #666;
	}

	.user_content .user_content_list.list-line {
		margin-top: 10rpx;
	}

	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.popup {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30px rgba(0, 0, 0, .1);
		box-shadow: 0 0 30px rgba(0, 0, 0, .1);
	}

	.popup-top {
		top: 10%;
		left: 5%;
		width: 90%;
		min-height: 200rpx;
		max-height: 600rpx;
		text-align: center;
		margin: 0 auto;
		border-radius: 5rpx;
	}

	.popup-top.nickname {
		min-height: 100rpx;
		max-height: 220rpx;
	}

	.signature-popup textarea {
		width: auto;
		padding: 20rpx;
		color: #999;
		line-height: 12rpx;
		text-align: left;
		min-height: 200rpx;
		max-height: 400rpx;
	}

	.nickname-popup input {
		width: auto;
		padding: 20rpx;
		color: #999;
		line-height: 12rpx;
		text-align: left;
		min-height: 80rpx;
		max-height: 80rpx;
	}

	.popup-top .popup-submit {
		border-top: 2rpx solid @baseBackColor;
		height: 100rpx;
		line-height: 100rpx;
	}

	.nickname .popup-submit {
		height: 90rpx;
		line-height: 90rpx;
	}

	.popup-top .popup-submit text {
		width: 40%;
		color: #333;
	}

	.popup-top .popup-submit text:nth-child(1) {
		float: left;
		text-align: left;
		padding-left: 40rpx;
		color: #666;
	}

	.popup-top .popup-submit text:nth-child(2) {
		float: right;
		text-align: right;
		padding-right: 40rpx;
	}
</style>

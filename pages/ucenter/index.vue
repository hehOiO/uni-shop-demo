<template>
	<view class="content index-content">
		<view class="user_content">
			<view class="header-info-box">
				<view class="header-un-login" v-if="userid == false" @tap="JumpModel" data-model="/pages/ucenter/login">
					<view class="header-icon-box" >
						<image :src="head_icon?head_icon:defaultAvatar" mode="aspectFit" style="" />
					</view>
					<view class="header-text-box">
						<view >登录/注册</view>
					</view>
				</view>
				<view class="header-already-login" @tap="toPersonalSet">
					<view class="header-icon-box" >
						<image :src="head_icon?head_icon:defaultAvatar" mode="aspectFill" style="" />
					</view>
					<view class="header-text-box">
						<view style="font-size: 32rpx;margin-bottom: 20rpx;">{{user_name}}</view>
						<view style="font-size: 28rpx;">
							<text style="padding-right: 30rpx;border-right: 1upx solid #fff;margin-right: 30rpx;">{{userinfo['phone']}}</text>
							<text>ID : {{userinfo['username']?userinfo['username']:'--'}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="nav-list-container">
				<view class="has-right-icon nav-item-box" style="border-top: 20upx solid #E2E1E0;" data-model="/pages/ucenter/security/buynumber" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/bind.png" mode="widthFix"></image></view>
					<view>
						账号绑定
					</view>
				</view>
				<view class="has-right-icon nav-item-box" style="border-top: 20upx solid #E2E1E0;border-bottom:1upx solid #e2e1e0;" data-model="/pages/task/appeallist" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/sszx.png" mode="widthFix"></image></view>
					<view>
						申诉中心
					</view>
				</view>
				<view class="has-right-icon nav-item-box" data-model="/pages/message/new_message" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/msg.png" mode="widthFix"></image></view>
					<view>
						消息中心
					</view>
				</view>
				
				<view class="has-right-icon nav-item-box" style="border-top: 20upx solid #E2E1E0;border-bottom:1upx solid #e2e1e0;" data-model="/pages/ucenter/setting" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/setting.png" mode="widthFix"></image></view>
					<view>
						设置
					</view>
				</view>
				<view class="has-right-icon nav-item-box" style="border-bottom:1upx solid #e2e1e0;" data-model="/pages/ucenter/score/forwardlist" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/txjl.png" mode="widthFix"></image></view>
					<view>
						提现记录
					</view>
				</view>
				<view class="has-right-icon nav-item-box" style="border-bottom:1upx solid #e2e1e0;" data-model="putForward" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/wytx.png" mode="widthFix"></image></view>
					<view>
						我要提现
					</view>
				</view>
				<view class="has-right-icon nav-item-box" style="border-bottom:1upx solid #e2e1e0;" data-model="/pages/ucenter/activity/unionlist" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/wdtd.png" mode="widthFix"></image></view>
					<view>
						我的团队
					</view>
				</view>
				<view class="has-right-icon nav-item-box" style="border-bottom:1upx solid #e2e1e0;" data-model="/pages/ucenter/activity/union" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/tgzj.png" mode="widthFix"></image></view>
					<view>
						推广赚金
					</view>
				</view>
				<view @tap="showBanner" class="has-right-icon nav-item-box" style="border-bottom:1upx solid #e2e1e0;" data-model="/pages/message/chat1" :data-login="true" >
					<view><image src="../../static/images/common/lxwm.png" mode="widthFix"></image></view>
					<view>
						联系我们
					</view>
				</view>
				<view class="has-right-icon nav-item-box" style="border-bottom:1upx solid #e2e1e0;" data-model="/pages/tool/task_rule" :data-login="true" @tap="JumpModel">
					<view><image src="../../static/images/common/jdgz.png" mode="widthFix"></image></view>
					<view>
						接单规则
					</view>
				</view>
				<view class="has-right-icon nav-item-box" style="border-bottom:1upx solid #e2e1e0;" data-model="/pages/help/indexNew" :data-login="true" @tap="toHelp">
					<view><image src="../../static/images/common/bzzx.png" mode="widthFix"></image></view>
					<view>
						帮助中心
					</view>
				</view>
				
			</view>
		</view>
		<!-- 弹出层 -->
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
		    <view style="justify-content:flex-end;" @tap="closeBanner">
		        <view style="justify-content:flex-end; text-align:right; padding:20upx;">
		            <text class="uni-icon uni-icon-close"></text>
		        </view>
		    </view>
			<view class="wx-title" style="font-size: 24rpx;color: #CFCFCF;text-align: center;width: 50%;margin: 0 auto;margin-bottom: 20rpx;">
				{{customer_server_type}}咨询
			</view>
		    <view style="width: 50%;margin: 0 auto;">
		        <image :src="customer_server_icon" style="width:100%;" mode="widthFix"></image>
		    </view>
			<view style="font-size: 24rpx;color: rgb(255, 75, 94);margin: 0px 80rpx;">
				保存图片使用{{customer_server_type}}扫一扫添加或直接点击下方按钮直接复制添加
			</view>
		    <view style="padding:30upx 0; padding-bottom:30upx;">
		        <button @tap="clipBoardLink" type='warn' class="mini-btn" style="background:#FA707E; margin:0 80upx;line-height: 60rpx;font-size: 30rpx;border-radius: 15px;">自动复制添加</button>
		    </view>
			<view @tap="kfOnline" style="padding-bottom:30upx;">
			    <button  type='warn' class="mini-btn" style="background:#459ae9; margin:0 80upx;line-height: 60rpx;font-size: 30rpx;border-radius: 15px;">在线客服</button>
			</view>
		</view>
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
	</view>
</template>

<script>
	var base = require('../../common/lib/base.js');
	export default {
		data() {
			return {
				bannerShow: false,
				page: 1,
				showFooterLoading: true,
				navlist: [],
				userid: false,
				userinfo: {},
				defaultAvatar: '',
				head_icon:"",
				user_name:"",
				statistics: {
					credit_score: 0,//信用评分
					score: 0.00,//本金余额
					task_score: 0.00,//我的收益
					agent_score: 0.00//团队的收益
				},
				customer_server_config:"",//链接
				customer_server_type:"",
				customer_server_icon:"",
				customer_wchat:""
			}
		},
		methods: {
			clipBoardLink(){//复制微信号
				let _this = this;
				let link = this.customer_wchat;
				uni.setClipboardData({
				    data: link,
				    success: function () {
						console.log( _this.customer_server_type);
				    	uni.showModal({
				    		title: "温馨提示",
				    		content: "复制成功，请到"+ _this.customer_server_type +"-添加好友-搜索中复制并搜索添加！",
				    		showCancel: false,
				    		confirmText: "确定",
							success(){
								//#ifdef APP-PLUS
									// 判断平台
										if (plus.os.name == 'Android') {
											plus.runtime.launchApplication(
												{
													pname: _this.customer_server_config.suffix
												},
												function(e) {
													console.log(e);
												}
											);
										} else if (plus.os.name == 'iOS') {
											plus.runtime.launchApplication({ action: _this.customer_server_config.prefix }, function(e) {
												console.log(JSON.stringify(e));
											});
										}
								//#endif
							}
				    	})
				    }
				}); 
			},
			showBanner: function() {
				this.bannerShow = true;	
			},
			kfOnline(){
				uni.navigateTo({
					url: '/pages/message/chat1?id='+this.userinfo['username']+'&phone='+this.userinfo['phone']
				});
			},
			toHelp(){
				uni.navigateTo({
					url: '/pages/help/indexNew?id='+this.userinfo['username']+'&phone='+this.userinfo['phone'],
				});
			},
			closeBanner: function() {
			    this.bannerShow = false;
			},
			loadData: function() {
				this.$Request("member/loadMemberAmount", {
					uid: this.userid
				}).then(res => {
					if (res.code == 200) {
						this.statistics = {
							score: res.data.score,
							task_score: res.data.task_score,
							agent_score: res.data.agent_score,
							credit_score: res.data.credit_score,
						}
						this.head_icon = res.data.head_icon;
						this.user_name = res.data.user_name;
						this.customer_server_icon = res.data.customer_server_icon;
						this.customer_wchat = res.data.customer_wchat;
						this.customer_server_type = res.data.customer_server_type;
						this.customer_server_config = res.data.customer_server_config;
					} else {
						this.statistics = {
							score: "0.00",
							task_score: '0.00',
							agent_score: '0.00',
							credit_score: 0
						}
					}
				});
			},
			toPersonalSet(){//用户头像设置
				uni.navigateTo({
					url: '/pages/ucenter/personal_head_set',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			loadNavList: function() {
				var baseURL = base.fetchTool.config("APPHOST");
				this.navlist = [{
						"icon": baseURL + "static/mobile/userleft/buyer-bind.png?t=1111",
						"title": "账号绑定",
						"isLogin": true,
						"model": "/pages/ucenter/security/buynumber"
					}, {
						"icon": baseURL + "static/mobile/userleft/web-message.png?t=1111",
						"title": "站内消息",
						"isLogin": true,
						"model": "/pages/ucenter/security/message"
					}, {
						"icon": baseURL + "static/mobile/userleft/put-cash.png?t=1111",
						"title": "我要提现",
						"isLogin": true,
						"model": "putForward", // /pages/ucenter/score/forwardlist
					}, {
						"icon": baseURL + "static/mobile/userleft/ucenter_put_amount.png?t=1111",
						"title": "提现记录",
						"isLogin": true,
						"model": "/pages/ucenter/score/forwardlist"
					}, {
						"icon": baseURL + "static/mobile/userleft/ucenter-union.png?t=1111",
						"title": "我的团队",
						"isLogin": true,
						"model": "/pages/ucenter/activity/unionlist"
					},
					{
						"icon": baseURL + "static/mobile/userleft/ucenter-union2.png?t=1111",
						"title": "推广赚金",
						"isLogin": true,
						"model": "/pages/ucenter/activity/union"
					},
					{
						"icon": baseURL + "static/mobile/userleft/ucenter-rule.png?t=1111",
						"title": "接单规则",
						"model": "/pages/tool/task_rule"
					},
					{
						"icon": baseURL + "static/mobile/userleft/ucenter-help.png?t=1111",
						"title": "帮助中心",
						"model": "/pages/help/indexNew"
					}, {
						"icon": baseURL + "static/mobile/userleft/ucenter-setting.png?t=1111",
						"title": "设置中心",
						"model": "/pages/ucenter/setting"
					},
					{
						"icon": baseURL + "static/mobile/userleft/contact_us.png?t=1111",
						"title": "联系我们",
						"model": "/pages/message/chat1"
					}
				];

			},
			credit_score: function() {
				uni.showToast({
					title: "信用分体系即将上线",
					icon: "none",
				})
			},
			JumpModel: function(e) {
				let model = e['currentTarget']['dataset']['model'];
				let isLogin = e['currentTarget']['dataset']['login'];
				if (isLogin && !this.userid) {
					this.$NavTarge("/pages/ucenter/login");
					return false;
				}
				if (model == "putForward") {
					// uni.showActionSheet({
					// 	itemList: ['账户本金提现', '佣金收益提现', '团队收益提现'],
					// 	success: function(res) {
					// 		var url = '/pages/ucenter/score/putforward?type=';
					// 		var param = ['product_order', 'product_commision', 'agent_commision'];
					// 		url += param[res.tapIndex];
					// 		base.fetchTool.JumpTargeLink(url);
					// 	}
					// })
					var url = '/pages/ucenter/score/putforward';
					base.fetchTool.JumpTargeLink(url);
					return false;
				}
				if(model =="/pages/message/chat1"){
					uni.navigateTo({
						url:"/pages/message/chat1?uid="+this.userinfo['username']+"&uphone="+this.userinfo['phone']
					})
					return false;
				}
				base.fetchTool.JumpTargeLink(model);
			}
		},
		onLoad:function(option){
			this.loadNavList();
		},
		onReady: function() {
		},
		onShow: function() {
			this.defaultAvatar = this.$Sysconf('imagelist.defaultAvatar');
			this.userid = base.user.openid(),
			this.userinfo = base.user.get();
			this.loadData();
		},
		onNavigationBarButtonTap: function(e) {
			this.$NavTarge('/pages/ucenter/activity/poster');
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	@import "../../common/uni.css";
	@import "../../common/icon.css";
	
	/* 遮罩层 */
	.uni-mask {
	    background: rgba(0, 0, 0, 0.6);
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    z-index: 1;
	}
	/* 弹出层形式的广告 */
	.uni-banner {
	    width: 70%;
	    position: fixed;
	    left: 50%;
	    top: 50%;
	    background: #FFF;
	    border-radius: 10upx;
	    z-index: 99;
	    transform: translate(-50%, -50%);
	}
	.wx-title{
		position: relative;
	}
	.wx-title:before{
		content:"";
		display: block;
		height: 1rpx;
		width: 20%;
		position: absolute;
		left: 2%;
		background-color: #CFCFCF;
		top: calc(50% - 1rpx);
	}
	.wx-title:after{
		content:"";
		display: block;
		height: 1rpx;
		width: 20%;
		position: absolute;
		right: 2%;
		background-color: #CFCFCF;
		top: calc(50% - 1rpx);
	}
	.header-already-login{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.header-info-box{
		background-color: #FA707E;
		padding: 60rpx;
		padding-top: 130rpx;
		color: #fff;
		font-size: 30rpx;
	}
	.header-un-login{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.header-icon-box{
		margin-right: 20rpx;
	}
	.header-icon-box image{
		width: 110rpx;
		height: 110rpx;
		border-radius: 100%;
		vertical-align: middle;
	}
	.nav-item-box{
		position: relative;
		color: #666;
		padding:18rpx 24rpx;
		display:flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 29rpx;
		view:first-child{
			margin-right: 20rpx;
			height: 40rpx;
			width: 40rpx;
		}
		image{
			width: 100%;
			height:100%;
			border-radius: 100%;
		}
	}
	.nav-item-box:after{
		    content: " ";
			display: inline-block;
			height: 14rpx;
			width: 14rpx;
			border-width: 2px 2px 0 0;
			border-color: #c8c8cd;
			border-style: solid;
			-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			-ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			position: relative;
			top: -2px;
			position: absolute;
			top: 50%;
			margin-top: -4px;
			right: 20rpx;
	}
	.has-bordernone:after {
		border: none
	}
	.user_content .header_top {
		position: relative;
		-webkit-flex: 1;
		flex: 1;
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: center;
		justify-content: center;
		background: @baseBackGroundColor;
		padding: 0rpx 30rpx;

	}

	.user_content .header_top .header-userinfo {
		height: 100%;
		min-width: 0;
		width: 100%;
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		height: 260rpx;
		padding-top: 25upx;
	}

	.user_content .header_top .header-userinfo .header-avatar {
		justify-content: center;
		flex: 0 0 150rpx;
		border-radius: 50%;
		width: 20%;
		line-height: 300rpx;
	}

	.user_content .header_top .header-userinfo .header-avatar image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		border: 5upx solid #FFFFFF;
	}

	.user_content .header_top .header-userinfo .header-name {
		color: #fff;
		width: 70%;
		justify-content: center;
		margin-top: 50rpx;
		font-size: 30rpx;
	}

	.user_content .header_top .header-userinfo .header-name .user-sign {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.user_content .header_top .header-userinfo .user-notlogin {
		color: #fff;
		width: 70%;
		justify-content: center;
		margin-top: 20rpx;
		font-size: 35rpx;
	}

	.load-more-content {
		padding-top: 80rpx;
		padding-bottom: 80rpx;
		color: #999;
	}

	.content-icon {
		width: 64upx;
		height: 64upx;
	}
</style>

<template>
	<view class="s-page-wrapper">
		<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh" v-if="loglist.length < 1 ">
			<i class="iconfont icon-huodongyebucunzai has-desc-color" style="font-size: 280rpx;color: #DDDDDD"></i>
			<view class="has-desc-color is-size-16">暂无更多</view>
		</view>
		<view class="s-row " v-if="loglist.length > 0 ">
			<view class="top-box">
				<view class="text-explain">
					<view>直接邀请人注册且绑定买号才能获得邀请奖励；</view>
					<view>直接邀请人，2级，3级间接邀请人做任务会获得团队分佣！</view>
				</view>
				<view class="top-content-box">
					<view class="top-content-item-box">
						<view><span style="font-size: 40rpx;">{{totalNum.yuser}}</span><span style="font-size: 22rpx;">人</span></view>
						<view @tap="helpAlertMessage('有效人数：您直接邀请的好友完成了实名认证且绑定买号成功！')">有效邀请总人数</view>
					</view>
					<view class="top-content-item-box">
						<view><span style="font-size: 40rpx;">{{totalNum.euser}}</span><span style="font-size: 22rpx;">人</span></view>
						<view @tap="helpAlertMessage('团队人数：您的团队邀请的总人数')">团队邀请总人数</view>
					</view>
				</view>
			</view>
			<view class="list-container">
				<view class="list-header-box">
					<view>
						用户名
					</view>
					<view>
						注册时间
					</view>
					<view>
						本月完成数
					</view>
				</view>
				<view class="list-content-box">
					<view v-for="(item,index) in loglist" :key="index" @tap="unionInfo(item.userid)">
						<view class="list-content-item">
							<view>{{item.real_name}}</view>
							<view>{{item.addtime}}</view>
							<view>{{item.total_num}}</view>
						</view>
					</view>
				</view>
				<view class="s-col is-col-24" v-if="loglist.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var util = require('../../../common/util.js');
	export default {
		data() {
			return {
				userid: '',
				loglist: [],
				totalNum: {
					user: 0,
					euser: 0,
					yuser:0
				},
				page: 1,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		methods: {
			loadData: function(type) {
				this.loadingType = 1;
				if (this.page == 1) {
					this.loglist = [];
				}
				this.$Request("member/loadUnion", {
					uid: this.userid,
					page: this.page
				}).then(res => {
					if (type == "refresh") {
						uni.stopPullDownRefresh()
					}
					if (res.code == 200) {
						this.loadingType = 0;
						var data = res.data.list;
						data.forEach(item => {
							item['addtime'] = util.dateUtils.toDateString(item['addtime'] * 1000, "yyyy-MM-dd");
							this.loglist.push(item);
						});
						this.totalNum = res.data.totalNum
					} else {
						this.loadingType = 2;
					}
				});
			},
			toDetail: function(id) {
				uni.navigateTo({
					url: '/pages/message/chat?userid=' + id
				});
			},
			unionInfo: function(id) {
				uni.navigateTo({
					url: '/pages/ucenter/activity/unionDetail?userid=' + id
				});
			},
			helpAlertMessage:function(message){
				// const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert'); 
// 				dcRichAlert.show({
// 					content: message,
// 					contentAlign: 'left',
// 					buttons: [{
// 							title: '我知道了',
// 							titleColor: '#409EFF'
// 						}
// 					]
// 				});
// 				uni.showToast({
// 					title:message,
// 					duration:1500
// 				})
				uni.showModal({
					content:message,
					showCancel:false,
					confirmText:'我知道了'
				})
				
			}
		},
		onLoad: function() {
			var userid = this.$SysUser.openid();
			this.userid = userid;
			this.loadData();
		},
		onReachBottom: function() {
			if (this.loadingType !== 0) {
				return;
			}
			this.page = this.page + 1;
			this.loadData();
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.loadData("refresh");
		},
		onNavigationBarButtonTap: function(e) {
			uni.navigateTo({
				url: '/pages/ucenter/activity/union'
			})
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
	.list-content-item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items:center;
		width: 85%;
		margin: 0 auto;
	}
	.list-content-box>view:nth-child(odd){
		background-color: #F0F0F0;
	}
	.list-content-item>view{
		width: 30%;
		text-align: center;
		font-size: 26rpx;
		color: #808080;
		padding: 20rpx 0;
	}
	.list-container{
		background-color: #fff;
	}
	.list-header-box{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items:center;
		width: 85%;
		margin: 0 auto;
		padding: 20rpx 0;
		padding-top: 55rpx;
	}
	.list-header-box>view{
		width: 30%;
		text-align: center;
		font-size:28rpx;
		color: #808080;
	}
	.top-content-item-box>view:last-child{
		color: #808080;
		font-size: 24rpx;
	}
	.top-content-box{
		width: 95%;
		display: flex;
		align-items: center;
		margin: 0 auto;
		background-color: #fff;
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
		justify-content: space-between;
	}
	.top-content-box>view{
		width: 40%;
		text-align: center;
		padding-top: 30rpx;
	}
	.top-box{
		background-color:rgb(251, 113, 128);
	}
	.text-explain{
		font-size: 22rpx;
		color: #fff;
		width:80%;
		margin: 0 auto;
		padding-top: 60rpx;
		padding-bottom: 20rpx;
	}
	.has-border-radius {
		border-radius: 10rpx !important;
		width: 50% !important;
		right: -40px !important;
	}

	.header-total {
		font-size: 28upx;
		width: 100%;
		position: fixed;
		height: 180upx;
		line-height: 80upx;
		top: 0upx;
		z-index: 99999;
		background: @baseBackColor;
		box-shadow: 0 0px 10px #EEEEEE;
		color: #999999;
	}
</style>

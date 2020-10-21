<template>
	<view class="s-page-wrapper">
		<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh" v-if="message.length < 1 ">
			<i class="iconfont icon-huodongyebucunzai has-desc-color" style="font-size: 280rpx;color: #DDDDDD"></i>
			<view class="has-desc-color is-size-16">暂无更多</view>
		</view>
		<view class="s-row" v-if="message.length > 0">
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">
					<view class="is-item is-a" v-if="message.length > 0 " v-for="(item,index) in message" :key="index" @tap="toDetail(item.userid)"
					 @longtap="messagelongtap(index)">
						<view class="is-item-hd">
							<image :src="portrait_bg"></image>
						</view>
						<view class="is-list2-info has-pdl-10">
							<view>{{item.username}}<span class="layim-msg-time">{{item.addtime}}</span></view>
							<view class="has-desc-color is-size-14 is-oneline">
								<text>{{item.content}}</text>
							</view>
							<view class="is-item-ft layim-msg-status" v-if="item.UnreadTotal > 0 && item.UnreadTotal < 100 ">{{item.UnreadTotal}}</view>
							<view class="is-item-ft layim-msg-status" v-if="item.UnreadTotal > 0 && item.UnreadTotal > 99 ">{{item.UnreadTotal}}+</view>
						</view>
					</view>
				</view>
			</view>
		</view>
 
		<view class="s-col is-col-24" v-if="message.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>

	</view>
</template>

<script>
	import chat from '../../common/chat/index'; 
	export default {
		data() {
			return {
				userid: '',
				message: [],
				loadMessageTimer: null,
				page: 1,
				loadingType: 0,
				portrait_bg: "",
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		onShow() {
			this.userid = this.$SysUser.openid();
			this.portrait_bg = this.$Sysconf('imagelist.defaultAvatar');
			this.loadFriends();
			this.loadMessageTimer = setInterval(inc => {
				this.loadFriends("new");
			}, 30000);
		},
		onHide() {
			this.loadMessageTimer && clearInterval(this.loadMessageTimer);
		},
		onReachBottom: function() {
			if (this.loadingType !== 0) {
				return;
			}
			this.page = this.page + 1;
			this.loadFriends("mew");
		},
		onPullDownRefresh: function() {
			this.loadMessageTimer && clearInterval(this.loadMessageTimer);
			this.page = 1;
			this.loadFriends();
			this.loadMessageTimer = setInterval(inc => {
				this.loadFriends("new");
			}, 30000);
		},
		onPullDownRefresh: function() {
			this.loadMessageTimer && clearInterval(this.loadMessageTimer);
			this.page = 1;
			this.loadFriends();
			this.loadMessageTimer = setInterval(inc => {
				this.loadFriends("new");
			}, 30000);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			toDetail: function(userid) {
				// 打开消息窗口 
				uni.navigateTo({
					url: '/pages/message/chat?userid=' + userid
				});
			},
			messagelongtap: function(id) {
				
			},
			loadFriends: function(action) {
				this.loadingType = 1;
				if (this.page == 1) {
					this.message = []; 
				}
				this.$Request("chat/loadFriends", {
					uid: this.userid,
					page: this.page, 
				}).then(res => {
					if (res.code == 200) {
						var message = [];
						res.data.data.forEach(item => {
							message.push({
								username: item.userid,
								addtime: item.addtime,
								content: item.content,
								status: item.status,
								UnreadTotal: item.UnreadTotal,
								userid: item.userid,
							})
						});
						this.message = message;

						this.loadingType = 0;
					} else {
						this.loadingType = 2;
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";

	.is-item-hd image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
	}

	.has-desc-color {
		max-width: 80%;
	}

	.layim-msg-status {
		position: absolute;
		right: 19rpx;
		bottom: 40rpx;
		padding: 0 10rpx;
		height: 34rpx;
		line-height: 34rpx;
		border-radius: 34rpx;
		text-align: center;
		font-size: 20rpx;
		background-color: #F74C31;
		color: #fff;
	}

	.layim-msg-time {
		position: absolute;
		right: 20rpx;
		color: #ddd;
		font-size: 30rpx;
		margin-top: -5rpx;
	}
</style>

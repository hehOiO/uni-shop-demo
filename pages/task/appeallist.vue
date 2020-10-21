<template>
	<view class="page">

		<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh" v-if="tasklist.length < 1 ">
			<i class="iconfont icon-huodongyebucunzai has-desc-color" style="font-size: 280rpx;color: #DDDDDD"></i>
			<view class="has-desc-color is-size-16">还没有申诉记录哦~</view>
		</view>


		<view class="s-row " v-if="tasklist.length > 0 ">
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">

					<view class="s-row-flex is-grey has-pdtb-15 has-borderb">
						<view class="s-col is-col-6 is-order-1">
							<view class="is-center">
								<view class="is-center">申诉编号</view>
							</view>
						</view>
						<view class="s-col is-col-6 is-order-2">
							<view class="is-center">
								<view class="is-center">处理状态</view>
							</view>
						</view>
						<view class="s-col is-col-6 is-order-3 ">
							<view class="is-center">
								<view class="is-center">小二介入</view>
							</view>
						</view>
						<view class="s-col is-col-6 is-order-4 ">
							<view class="is-center">
								<view class="is-center">投诉角度</view>
							</view>
						</view>
					</view>

					<view class="s-row-flex is-grey has-pdtb-20 has-borderb" v-for="(item,index) in tasklist" :key="index" @tap="toDetail(item.id)">
						<view class="s-col is-col-6 is-order-1 is-size-16">
							<view class="is-center">
								<view class="is-center is-black">{{item.id}}</view>
							</view>
						</view>
						<view class="s-col is-col-6 is-order-2 is-size-14">
							<view class="is-center">
								<view class="is-center is-grey" v-if="item.status == 0">处理中</view>
								<view class="is-center is-green" v-if="item.status == 1">已完结</view>
							</view>
						</view>
						<view class="s-col is-col-6 is-order-3 is-size-14">
							<view class="is-center">
								<view class="is-center is-grey" v-if="item.step == 1">未介入</view>
								<view class="is-center is-red" v-if="item.step == 2">已介入</view>
							</view>
						</view>
						<view class="s-col is-col-6 is-order-4 is-size-14">
							<view class="is-center">
								<view class="is-center is-grey" v-if="item.position == 1">商家投诉</view>
								<view class="is-center is-grey" v-if="item.position == 2">自己投诉</view>
							</view>
						</view>
					</view>


				</view>
				<view class="s-col is-col-24" v-if="tasklist.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				tasklist: [],
				status: 6,
				page: 1,
				userid: "",
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},

		onLoad: function(param) {
			this.status = param.status
			var userid = this.$SysUser.openid();
			this.userid = userid;
			this.loadData();
		},
		onShow: function() {

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
			this.loadData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			previewImage: function(e) {
				var src = e.currentTarget.dataset.src;
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage([src]);
				//#endif
			},
			loadData: function(hideload) {
				this.loadingType = 1;
				if (this.page == 1) {
					this.tasklist = [];
				}

				this.$Request("task/appeal_list", {
					uid: this.userid,
					page: this.page
				}).then(res => {
					hideload && uni.hideLoading();
					if (res.code == 200) {
						this.loadingType = 0;
						var data = res.data.data;
						console.log(data);
						data.forEach(item => {
							this.tasklist.push(item);
						})
					} else {
						this.loadingType = 2;
					}
				});
			},
			toDetail: function(itemid) {
				uni.navigateTo({
					url: '/pages/help/appealInfo?itemid=' + itemid
				});
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";

	.segmented-control-item {
		line-height: 100rpx !important;
	}

	.has-button-view {
		position: relative;
		right: -100rpx;
		top: -40rpx;
		width: 30% !important;
		border: none;
		background: #108ee9;
		color: #fff;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 26rpx;
		padding: 10rpx 40rpx;
		border-radius: 5rpx;
	}

	.has-button-view:nth-child(1) {
		background: #108ee9;
	}

	.has-button-view:nth-child(2) {
		background: #FF5722;
	}

	.has-button-view:nth-child(3) {
		background: #f48c02;
	}

	.has-button-view:nth-child(4) {
		background: #2F4056;
	}
</style>

<template>
	<view class="s-page-wrapper">

		<view class="s-row " v-if="loglist.length > 0 ">
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">

					<view class="is-item is-a has-pdtb-10" v-for="(item,index) in loglist" :key="index" @tap="toDetail(item.id)">
						<view class="is-item-bd is-oneline ">
							<view class="is-size-16 ">
								{{item.content}}
								<view class="is-size-14 is-grey">{{item.addtime}}</view>
							</view>
						</view>
					</view>

				</view>
				<view class="s-col is-col-24" v-if="loglist.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
			</view>
		</view>

		<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh" v-if="loglist.length < 1 ">
			<i class="iconfont icon-huodongyebucunzai has-desc-color" style="font-size: 280rpx;color: #DDDDDD"></i>
			<view class="has-desc-color is-size-16">暂无更多</view>
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
			loadData(type) {

				this.loadingType = 1;
				if (this.page == 1) {
					this.loglist = [];
				}
				this.$Request("member/loadMessage", {
					uid: this.userid,
					page: this.page
				}).then(res => {
					if (type == "refresh") {
						uni.stopPullDownRefresh()
					}
					if (res.code == 200) {
						this.loadingType = 0;
						var data = res.data.data;
						data.forEach(item => {
							item['addtime'] = util.dateUtils.toDateString(item['addtime'] * 1000);
							this.loglist.push(item);
						})
					} else {
						this.loadingType = 2;
					}
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/ucenter/security/messageDetail?id=' + id
				});
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
			this.page = 1
			this.loadData("refresh");
		},
		onNavigationBarButtonTap: function(e) {
			uni.navigateTo({
				url: '/pages/ucenter/score/putforward'
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

	.is-oneline view {
		max-width: 90% !important;
	}
</style>

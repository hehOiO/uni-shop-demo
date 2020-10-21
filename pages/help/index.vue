<template>
	<view class="s-page-wrapper">
		<view class="banner">
			<view class="topBanner">
				<!-- 				<view class="leftIcon" @tap="ReturnBack">
					<text class="iconfont icon-fanhui"></text>
				</view> -->
				<image src="../../static/images/help/helptopbg.png" mode="widthFix" class="is-response"></image>
			</view>
		</view>
		<view class="help-main">
			<view class="help-title has-pd-10 has-title-color">常见问题</view>
			<view class="help-content s-row">
				<view class="s-row">
					<view class="s-list has-mgt-0 has-bordernone">
						<view class="s-col is-col-24">
							<view class="s-grids has-bg-white">
								<view class="is-grid is-col-12 is-a is-center has-pd-15" @tap="getTypeIdData(1)">
									<view class="">
										<view style="font-size: 30rpx;color: rgb(59, 60, 55);">
											<text class="iconfont icon-help-dingdan has-pdr-3 has-mgr-6"></text>任务订单问题
										</view>
									</view>
								</view>
								<view class="is-grid is-col-12 is-a is-center has-pd-15" @tap="getTypeIdData(2)">
									<view class="">
										<view style="font-size: 30rpx;color: rgb(59, 60, 55);">
											<text class="iconfont icon-help-zhanghu has-pdr-3 has-mgr-6"></text>平台帐号问题
										</view>
									</view>
								</view>
								<view class="is-grid is-col-12 is-a is-center has-pd-15" @tap="getTypeIdData(3)">
									<view class="">
										<view style="font-size: 30rpx;color: rgb(59, 60, 55);">
											<text class="iconfont icon-help-zijin has-pdr-3 has-mgr-6"></text>账户资金问题
										</view>
									</view>
								</view>
								<view class="is-grid is-col-12 is-a is-center has-pd-15" @tap="getTypeIdData(4)">
									<view class="">
										<view style="font-size: 30rpx;color: rgb(59, 60, 55);">
											<text class="iconfont icon-help-qita1 has-pdr-3 has-mgr-6"></text>其它常见问题
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="s-row ">
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">
					<view class="is-item is-a has-pdtb-10" v-for="(item,index) in loglist" :key="index" @tap="toDetail(item.id)" style="background-color: #ececec">
						<view class="is-item-bd is-oneline ">
							<view style="font-size: 30rpx;color: rgb(59, 60, 55);">
								{{item.title}}
								<view class="is-size-14 is-grey has-mgt-5">{{item.addtime}}</view>
							</view>
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
	var util = require('../../common/util.js');
	export default {
		data() {
			return {
				userid: '',
				loglist: [],
				page: 1,
				loadingType: 0,
				typeid: "",
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		methods: {
			ReturnBack: function() {
				uni.navigateBack()
			},
			getTypeIdData: function(typeid) {
				this.page = 1;
				this.typeid = typeid;
				this.loadData();
			},
			loadData: function() {
				var typeid = this.typeid;
				this.loadingType = 1;
				if (this.page == 1) {
					this.loglist = [];
				}
				this.$Request("task/loadContentList", {
					page: this.page,
					model: 2,
					typeid: typeid || 0
				}).then(res => {

					if (res.code == 200) {
						this.loadingType = 0;
						var data = res.data.data;
						data.forEach(item => {
							item['addtime'] = util.dateUtils.toDateString(item['addtime'] * 1000, "yyyy-MM-dd");
							this.loglist.push(item);
						})
					} else {
						this.loadingType = 2;
					}
				});
			},
			toDetail: function(id) {
				uni.navigateTo({
					url: '/pages/detail/content?id=' + id
				});
			}
		},
		onLoad: function(e) {
			if(e.typeid){
				this.typeid = e.typeid; 
			}
			this.loadData();
		},
		onReachBottom: function() {
			if (this.loadingType !== 0) {
				return;
			}
			this.page = this.page + 1;
			this.loadData();
		},
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	@import "../../common/uni.css";
	@import "../../common/icon.css";

	page {
		min-height: 100%;
		background-color: #E2E1E0;
		font-size: 30rpx;
	}

	.has-border {
		border: 1px solid #dcdee2;
		content: '';
		display: block;
		bottom: 0;
		position: absolute;
		left: 0;
		top: 0;
		-webkit-transform-origin: left top;
	}

	.banner {
		width: 100%;

	}

	.has-bordernone {
		border: none !important;
	}

	.leftIcon {
		position: absolute;
		left: 20upx;
		padding-top: 20upx;
		top: var(--status-bar-height);
		color: #FFFFFF;
		width: 30%;
	}

	.leftIcon .icon-fanhui {
		font-size: 30upx;

	}

	.help-content .help-div {
		width: 50%;
		height: 60px;
		float: left;
	}

	.help-content .s-row .iconfont {
		font-size: 40upx;
	}

	.icon-help-dingdan {
		color: rgb(159, 212, 91);
	}

	.icon-help-zhanghu {
		color: #eb5620;
	}

	.icon-help-zijin {
		color: #fca909;
	}

	.icon-help-qita1 {
		color: #3c6fe3;
	}

	.scroll-view_H {
		height: 50%;
		overflow: hidden;
	}
</style>

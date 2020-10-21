<template>
	<view class="s-page-wrapper">
		<view class="s-row " v-if="isLoading&&loglist.length > 0 ">
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">

					<view class="is-a has-pdtb-15" v-for="(item,index) in loglist" :key="index" @tap="toDetail(item.id)" style="background-color: #F3F4EF;color: #3B3C37;border-bottom: 1px solid #DFE0DB;">
						<view class="is-item " style="padding-top: 0!important;padding-bottom: 0!important;">
							<view class="is-item-bd is-oneline ">
								<view style="font-size: 30rpx;">
									<span v-if="item.product_source=='jd'" style="margin-right:20rpx;">[ 京东 ]</span>
									<span v-if="item.product_source=='taobao'" style="margin-right:20rpx;">[ 淘宝/天猫 ]</span>
									<span v-if="item.product_source=='pinduoduo'" style="margin-right:20rpx;">[ 拼多多 ]</span>
									<span v-if="item.product_source=='douyin'" style="margin-right:20rpx;">[ 抖音 ]</span>
									{{item.content}}...
								</view>
							</view>
							<view class="is-item-ft is-size-18 " style="color: #FB7180;" v-if="item.type==2">+{{item.score}}</view>
							<view class="is-item-ft is-size-18 " style="color: #FB7180;" v-if="item.type==1">-{{item.score}}</view>
						</view>
						<view style="color: #B8B8B8;padding: 0 30rpx;font-size: 30rpx;margin-top: 10upx;">{{item.addtime}}</view>
					</view>

				</view>
				<view class="s-col is-col-24" v-if="loglist.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
			</view>
		</view>

		<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh" v-else-if="loglist.length < 1&&isLoading ">
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
				type: '',
				date: '',
				loadingType: 0,
				isLoading:false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		methods: {
			loadDataLog:function(s) {
				this.loadingType = 1;
				if (this.page == 1) {
					this.loglist = [];
				}
				var action_type = this.type;
				this.$Request("member/loadScorelog", {
					uid: this.userid,
					page: this.page,
					action_type: action_type || "",
					date: this.date || "",
				}).then(res => {
					if (s == "refresh") {
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
					this.isLoading = true;
					uni.hideLoading();
				});
			},
			toDetail:function(id) {
				uni.navigateTo({
					url: '/pages/ucenter/score/logDetail?id=' + id
				});
			}
		},
		onShow: function() {
			var userid = this.userid; 
			if (!userid) {
				uni.showToast({
					title: "请输入登录密码",
					icon:"none"
				});
				uni.navigateBack();
			}
		},
		onLoad: function(e) {
			uni.showLoading({
				title:"加载中……"
			})
			this.userid = this.$SysUser.openid(); 
			this.type = e.type||""; 
			console.log(this.type);
			this.date = e.date||""; // today今天 |  yesterday昨天 | week本周  | month本月
			if (e.type == "product_order") {
				uni.setNavigationBarTitle({
					title: "本金收益"
				});
			} else if (e.type == "agent_commision") {
				uni.setNavigationBarTitle({
					title: "团队收益"
				});
			}
			this.loadDataLog();
		},
		onReachBottom: function() {
			if (this.loadingType !== 0) {
				return;
			}
			this.page = this.page + 1;
			this.loadDataLog();
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.loadDataLog("refresh");
		},
		onNavigationBarButtonTap: function(e) {//监听原生右侧按钮
			var type = this.type || "";
			uni.navigateTo({
				url: '/pages/ucenter/score/putforward?type=' + type
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
		overflow: hidden;
		white-space: nowrap;      /*超出的空白区域不换行*/
    overflow: hidden;         /*超出隐藏*/
    text-overflow: ellipsis;
	}
</style>

<template>
	<view class="s-page-wrapper">
		<view class="" v-if="close_earth_push">
			<view class="s-col is-col-24">
				<view class="s-list-title">地推任务</view>
				<view class="s-list" v-if="earth_push != 1 ">
					<view class="is-item">
						<view class="is-item-bd" v-if="earth_push == 0 " @tap="apply_earth_push">
							<view class="is-red">您还不是地推代理，点击申请地推代理</view>
							<view class="has-desc-color is-size-14">
							</view>
						</view>
						<view class="is-item-bd" v-if="earth_push == 2 ">
							<view class="has-desc-color">地推代理申请 审核中</view>
							<view class="has-desc-color is-size-14">
							</view>
						</view>
						<view class="is-item-bd" v-if="earth_push == 3 " @tap="apply_earth_push">
							<view class="is-red">您申请的地推代理已被拒绝，点击重新申请</view>
							<view class="has-desc-color is-size-14">
							</view>
						</view>
					</view>
				</view>
				<view class="s-row has-mgt-20" v-if="earth_push == 1 ">
					<view class="s-col is-col-24">
						<view class="s-list has-mgt-0">
							<view class="s-row-flex is-grey has-pdtb-15 has-borderb">
								<view class="s-col is-col-8 is-order-1 ">
									<view class="is-center">
										<view class="is-center">已接单数</view>
									</view>
								</view>
								<view class="s-col is-col-8 is-order-2">
									<view class="is-center">
										<view class="is-center">已完成交易额</view>
									</view>
								</view>
								<view class="s-col is-col-8 is-order-3 ">
									<view class="is-center">
										<view class="is-center">未完成交易额</view>
									</view>
								</view>
							</view>

							<view class="s-row-flex is-grey has-pdtb-20 has-borderb">
								<view class="s-col is-col-8 is-order-1 is-size-16">
									<view class="is-center">
										<view class="is-center is-black">{{earth_push_data.totalNum}}</view>
									</view>
								</view>
								<view class="s-col is-col-8 is-order-1 is-size-16">
									<view class="is-center">
										<view class="is-center is-black">{{earth_push_data.completeAmount}}</view>
									</view>
								</view>
								<view class="s-col is-col-8 is-order-1 is-size-16">
									<view class="is-center">
										<view class="is-center is-black">{{earth_push_data.surplusAmount}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="s-list-title">风险说明</view>
				<view class="s-list">
					<view class="is-item">
						<view class="is-item-bd">1.实际下单人需要后期可以联系到，避免退款造成损失。</view>
					</view>
					<view class="is-item">
						<view class="is-item-bd">2.若下单人拍下后退款等造成的损失应由您承担。</view>
					</view>
					<view class="is-item">
						<view class="is-item-bd">3.推荐下单人下载注册APP并完成首单垫付任务您可以获得奖励哦（注册时填写您的邀请码）。</view>
					</view>
				</view>
			</view>
			<view class="jiedan" v-if="earth_push == 1 " @tap="GetNewTask">
				<view class="is-size-16">接单</view>
				<view class="flash animated infinite"></view>
			</view>
		</view>
		<view class="" v-else>
			<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh">
				<i class="iconfont icon-busy"></i>
				<view class="has-desc-color is-size-16 has-mgt-20">管理未开启地推任务哦~</view>
				<view class="s-btn has-mgt-20">
					<navigator open-type="switchTab" url="/pages/index/index" class="is-btn is-btn-md  has-bg-blue">返回首页</navigator>
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
				close_earth_push: false,
				earth_push: 0,
				type: '',
				earth_push_data: {
					totalNum: 0,
					completeAmount: 0.00,
					surplusAmount: 0.00
				},
				location: {
					latitude: "",
					longitude: "",
				}
			};
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			this.close_earth_push = this.$Sysconf("close_earth_push");


			if (!userid) {
				uni.reLaunch({
					url: "/pages/ucenter/login",
				});
			} else {
				var that = this;
				that.userid = userid;
				uni.getLocation({
					success(e) {
						that.location = {
							latitude: e.latitude,
							longitude: e.longitude,
						};
						that.loadEarthGroup();
					},
					fail(err) {
						const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert'); 
						dcRichAlert.show({
							title: "提示信息",
							titleColor: '#303133',
							content: "获取定位信息失败\n地推任务必须开启定位权限，系统检测到您没有开启定位，请先开启定位",
							contentAlign: 'left',
							buttons: [{
									title: '查看教程',
									titleColor: '#409EFF'
								},
								{
									title: '不想开启',
									titleColor: '#303133'
								},
							]
						}, result => {
							if (result.index == 0) {
								uni.navigateTo({
									url: "/pages/help/index?typeid=4"
								})
							} else {
								uni.navigateBack({})
							}
						});
					}
				})
			}
		},
		methods: {
			loadEarthGroup: function() {
				this.$Request("member/loadEarthGroup", {
					uid: this.userid
				}).then(res => {
					if (res.code == 200) {
						this.earth_push_data = res.data.earth_push_data;
						this.earth_push = res.data.earth_push;
					}
				})
			},
			apply_earth_push: function() {
				this.$Request("member/apply_earth_push", {
					uid: this.userid
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: "none"
					});
					if (res.code == 8008) {
						// 未实名认证 
						setTimeout(function() {
							uni.navigateTo({
								url: "/pages/ucenter/security/buynumber"
							})
						}, 1500);
					} else if (res.code == 200) {
						this.earth_push = 2;
					}
				});
			},
			GetNewTask: function() {
				uni.showLoading({
					title: '接单中...'
				});
				this.$Request("task/taskInit", {
					uid: this.userid,
					type: "earth_push"
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						var app_message_push = this.$Cache.get("app_message_push"); 
						if( app_message_push['vshort'] == undefined || app_message_push['vshort'] == true ) {
							uni.vibrateShort({}); // 发生震动 
						}
						if( app_message_push['vmusic']  == undefined || app_message_push['vshort'] == true  ) {
							const bgAudioMannager = uni.getBackgroundAudioManager();
							bgAudioMannager.title = '来新订单啦';
							bgAudioMannager.singer = '来新订单啦';
							bgAudioMannager.src = 'http://static.diudanke.com/auto_task_new_order.mp3';
						}
						const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert'); 
						dcRichAlert.show({
							title: "来单啦",
							titleColor: '#303133',
							content: "恭喜您！接到了一个新订单，是否立即做单？",
							contentAlign: 'left',
							buttons: [{
									title: '去做单',
									titleColor: '#409EFF'
								},
								{
									title: '再接一单',
									titleColor: '#303133'
								},
							]
						}, result => {
							if (result.index == 0) {
								uni.switchTab({
									url: '/pages/task/index',
									fail: function(err) {
										console.log(JSON.stringify(err))
									},
									success: function(succ) {
										console.log("succccc")
									}
								});
							}
						});
					} else {
						uni.showToast({
							title: res.msg || "系统繁忙",
							icon: "none"
						})
					}
				}).catch(err => {
					uni.showToast({
						title: "大侠 手速太快 系统繁忙",
						icon: "none"
					})
				})
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";

	.jiedan {
		position: fixed;
		bottom: 7%;
		margin: 0 auto;
		background: @baseBackGroundColor;
		width: 150rpx;
		height: 150rpx;
		left: 40%;
		border-radius: 50%;
		color: #FFFFFF;
		text-align: center;
		line-height: 150rpx;
		font-size: 40rpx;
		z-index: 9999;
	}

	.icon-busy {
		color: #666;
		font-size: 150rpx;
	}
</style>

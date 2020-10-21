<template>
	<view class="content has-bg-white">
		<view class="">
			<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh" v-if="buyerlist.length < 1 ">
				<i class="iconfont icon-busy"></i>
				<view class="has-desc-color is-size-16 has-mgt-20" v-if="userid != '' ">亲，您还没有买号可以做任务</view>
				<view class="has-desc-color is-size-16 has-mgt-20" v-if="userid == '' ">您还没有登录，请先登录！</view>
				<view class="s-btn has-mgt-20">
					<navigator url="/pages/ucenter/security/buynumber" v-if="userid != '' " class="is-btn is-btn-md  has-bg-red">去绑定</navigator>
					<navigator url="/pages/ucenter/login" v-if="userid == '' " class="is-btn is-btn-md  has-bg-red">去登录</navigator>
					<navigator open-type="switchTab" url="/pages/index/index" class="is-btn is-btn-md  has-bg-blue">返回首页</navigator>
				</view>
			</view>

			<view class="s-col is-col-24" v-if="buyerlist.length > 0 ">
				<view class="has-bg-white has-pd-10 has-desc-color is-size-16">
					<navigator hover-class="" url="/pages/tool/task_rule"><text class="iconfont icon-hand is-size-24"></text>接单前务必查看接单规则，点击查看接单规则</navigator>
				</view>
				<view class="tab-tilte">
					<view class="s-list-title" :class="{active:threeactive==='dianfu'}" @tap="threeTab('dianfu')">垫付任务</view>
					<view class="s-list-title" :class="{active:threeactive==='liulan'}" @tap="threeTab('liulan')">浏览任务</view>
					<view class="s-list-title" :class="{active:threeactive==='yujiedan'}" @tap="threeTab('yujiedan')">预接单</view>
				</view>
				
				<view class="s-list">
					<checkbox-group @change="checkboxChange">
						<view class="is-item" v-for="(item,index) in buyerlist" :key="index">
							<view class="is-item-hd">
								<i class="iconfont icon-unie651" v-if="item.type == 'taobao'"></i>
								<i class="iconfont icon-jingdongbaitiao" v-if="item.type == 'jd'"></i>
								<i class="iconfont icon-unie651" v-if="item.type == 'tmall'"></i>
							</view>
							<view class="is-item-bd">
								<view>{{item.name}}</view>
								<view class="has-desc-color is-size-14">
									本月可接垫付{{item.num_now}}/{{item.max_num_month}}单，浏览{{item.view_num_now}}/{{item.member_max_view_month}}单；
								</view>
							</view>
							<div class="is-item-ft">
								<checkbox :value="item.value" :disabled="taskStatus" :checked="item.checked" color="#56aafb" />
							</div>
						</view>
					</checkbox-group>
				</view>
			</view>

			<view class="jiedan" v-if="buyerlist.length > 0 " @tap="GetNewTask">

				<view class="is-size-16">{{taskBtnText}}</view>
				<view class="taskStatus" v-if="taskStatus"></view>
				<view class="flash animated infinite"></view>

			</view>

			<view class="jiedan jiedanright" v-if="taskStatus" @tap="stopTask">
				<span>停止</span>
			</view>
		</view>

		<uni-popup :show="newTaskPopup" type="middle newTaskPopup" @hidePopup="hidePopup">

			<view class="has-pd-20 is-center">
				<view class="new-task-popup">
					<view class="has-pd-10 popup-image is-center">
						<image src="../../static/images/task/lamp@2x.png" mode="widthFix" class="is-response"></image>
					</view>
					<view class="has-pd-10 has-title-color is-bold is-size-20">
						来新任务啦~
					</view>
					<view class="has-bordert has-pdt-20 is-left has-title-color is-size-20" @tap="toTaskDetail">
						您已经接到了一个新的任务，请在<text class="is-blue">2小时内</text>完成并提交;<text class="is-blue iconfont icon-hand">点击去做任务</text>
					</view>
				</view>
			</view>

		</uni-popup>

		<navigator class="footer-help-mm" url="/pages/help/index" hover-class="">
			<image src="../../static/images/help/helpkefumeimei.png" mode="widthFix" class="is-response"></image>
		</navigator>

	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				userid: '',
				buyerlist: [],
				checkMall: [],
				page: 1,
				newTaskPopup: false,
				order_sn: "",
				type: '',
				indexintervalID: null,
				threeactive:'dianfu'
			}
		},
		computed: {
			...mapState(['taskBtnText', 'taskStatus', 'intervalID'])
		},
		components: {
			uniPopup
		},
		methods: {
			hidePopup: function() {
				this.newTaskPopup = !this.newTaskPopup;
			},
			toTaskDetail: function() {
				var order_sn = this.order_sn;
				this.hidePopup();
				uni.navigateTo({
					url: '/pages/index/detail?order_sn=' + order_sn
				});
			},
			loadBuyer: function() {
				this.$Request("member/loadBuyer", {
					uid: this.userid,
					type: this.type
				}).then(res => {
					if (res.code == 1001) {
						uni.showToast({
							title: "您还没有登录哦",
							icon: "none"
						})
					} else {
						this.buyerlist = [];
						if (res.data.buyer) {
							res.data.buyer.forEach(item => {
								this.buyerlist.push({
									name: item.name,
									value: item.id,
									type: item.type,
									num_now: item.num_now,
									max_num_month: item.max_num_month,
									view_num_now: item.view_num_now,
									member_max_view_month: item.member_max_view_month,
									checked: (item.jiedan_status > 0) ? true : false,
								})
							});
						}
						if (this.buyerlist.length < 1) {
							const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert'); 
							dcRichAlert.show({
								title: "温馨提示",
								titleColor: '#303133',
								content: "您还没有可用买号，是否立即前往绑定？",
								contentAlign: 'left',
								buttons: [{
										title: '立即绑定',
										titleColor: '#409EFF'
									},
									{
										title: '稍后再说',
										titleColor: '#303133'
									},
								]
							}, result => {
								if (result.index == 0) {
									uni.navigateTo({
										url: "/pages/ucenter/security/buynumber"
									})
								} else {
									uni.navigateBack({})
								}
							});
						}
					}
				})
			},
			checkboxChange: function(e) {
				this.checkMall = e.detail.value;
			},
			GetNewTask: function() {
				var checkMall = this.checkMall;
				this.task_clear();
				if (this.taskStatus == true) {
					return false;
				}
				if (checkMall.length < 1) {
					uni.showToast({
						title: "请选择买号！",
						icon: "none"
					})
					return false;
				}
				if (checkMall.length > 3) {
					uni.showToast({
						title: "最多可选择3个买号",
						icon: "none"
					})
					return false;
				}
				uni.showLoading({
					title: '接单中...'
				});
				// 抢单数据初始化 
				this.$Request("task/taskInit", {
					uid: this.userid,
					buyer: JSON.stringify(checkMall)
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						this.getTask();
						this.task({
							taskBtnText: "接单中..",
							taskStatus: true,
							taskTime: res.time,
						});
						this.taskStatus = true;
					} else {
						this.task_clear();
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				});
			},
			getTask: function() {
				this.$Request("task/getTask", {
					uid: this.userid
				}).then(req => {
					if (req.code == 200) {
						var order_sn = req.data.order_sn;
						this.task_clear();
						this.order_sn = order_sn;
						this.hidePopup();
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
					} else if (req.code == 400) {
						this.task({
							taskBtnText: "接单中..",
							taskStatus: true,
						});
						this.taskStatus = true;
						if (!this.indexintervalID) {
							var intervalID = setInterval(inc => {
								this.getTask();
							}, 60000);
							this.task({
								taskBtnText: "接单中..",
								taskStatus: true,
								taskTime: req.time,
								intervalID: intervalID
							});
							this.indexintervalID = intervalID;
						}
						var get_task_tips_wait = this.$Cache.get("get_task_tips_wait");
						if (get_task_tips_wait == false) {
							// 300秒 
							if ((req.data.wait_time + 10) < req.time) {
								clearInterval(this.indexintervalID);
								this.indexintervalID = null;
								this.task_clear();
								uni.showModal({
									title: '提示信息',
									content: '您已经等待超过5分钟了，系统还未匹配到合适您的订单，是否继续等待？',
									cancelText: "不等了",
									confirmText: "继续等待",
									success: (res => {
										if (res.confirm) {
											this.getTask();
											this.$Cache.put("get_task_tips_wait", true);
										} else if (res.cancel) {
											this.stopTask();
										}
									})
								});
							}
						}
					}
				});

			},
			stopTask: function() {

				this.$Request("task/stopTask", {
					uid: this.userid
				}).then(res => {

					if (res.code == 200) {
						this.task_clear();
						this.loadBuyer();
					}
				});
			},
			threeTab:function(type){
				this.threeactive=type;
				
			},
			...mapMutations(['task', 'task_clear', 'task_interval_clear']),
		},
		onHide: function() {
			this.indexintervalID && clearInterval(this.indexintervalID);
			this.indexintervalID = null;
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			this.userid = userid;
			this.loadBuyer();
			this.getTask();
		},
		onUnload: function() {
			this.task_interval_clear();
			this.checkMall = [];
			this.indexintervalID && clearInterval(this.indexintervalID);
			this.indexintervalID = null;
		},
		onLoad:function(option) {
			console.log(option.id)
			this.threeactive=option.id
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";

	.jiedan {
		position: fixed;
		bottom: 10%;
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

	.icon-hand {
		font-size: 36rpx;
		padding-right: 10upx;
	}

	.content .is-item-hd .iconfont {
		font-size: 40rpx;
		padding-right: 15rpx;
	}

	.content .is-item-hd .iconfont.icon-unie651 {
		color: #ff5000;
	}

	.content .is-item-hd .iconfont.icon-jingdongbaitiao {
		color: #f30213;
	}

	.icon-busy {
		color: #666;
		font-size: 150rpx;
	}

	.btnbg {
		background-color: @baseBackGroundColor;
	}

	.newTaskPopup {
		width: 80%;
		border-radius: 10rpx;
		height: 530rpx;

	}

	.jiedanright {
		right: -20%;
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		background: #1890ff;

	}

	.new-task-popup {
		width: 100%;
		height: 100%;
	}

	.new-task-popup .icon-hand {
		font-size: 30upx;
	}

	.new-task-popup .popup-image {
		display: block;
		width: 200upx;
		height: 200upx;
		text-align: center;
		margin: 0 auto;
	}

	.footer-help-mm {
		position: fixed;
		bottom: 0upx;
		right: 0upx;
		width: 100upx;
	}
	.tab-tilte{
		display:flex;
		justify-content: space-around;
		.active{
			color:#1890ff;
			border-bottom:9px solid #1890ff
		}
	}
	@keyframes namemf {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes namemf {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	@-ms-keyframes namemf {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>

<template>
	<view id="newTaskprogress">
		<!-- 垫付和预收任务进度显示 -->
		<view class="s-col is-col-24" v-if="order.model == 1 || order.model==4 ||order.model==5 ||order.model==6">
			<view class="s-list has-pdt-0 has-mgt-0">
				<view class="is-item has-pd-10">
					<view class="is-item-bd">
						<!-- 第一步 -->
						<view class="border-bottom-gray">
							<view class="step-progress-title">
								<span class="number-box has-mgr-10">1</span>接手任务<span class="is-size-14 is-grey">{{order.addtime_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>任务编号：<span>{{order.order_sn}}</span><span class="copy-btn" @tap="copy(order.order_sn)">复制</span></view>
								</view>
							</view>
							<view class="has-pdt-0 has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>下单买号：<span>{{order.buyer_name}}</span></view>
								</view>
							</view>
							<view class="has-pd-10 has-pdt-0 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>商品金额：<span>{{product.total_goods_price}}元</span></view>
								</view>
							</view>
						</view>
						
		
						<!-- 第二步 -->
						<view class="border-bottom-gray">
							<view v-if="order.orderid_time < 1" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">2</span>订单付款<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.orderid_time > 1" class="step-progress-title">
								<span class="number-box has-mgr-10">2</span>订单付款<span class="is-size-14 is-grey">{{order.orderid_time_str}}</span>
							</view>
									
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>订单编号：<span>{{order.orderid||"-"}}</span>
										<span class="copy-btn" v-if="order.status == 2 " @tap="editOrderSn(order.order_sn)">修改</span>
									</view>
								</view>
							</view>
									
							<view class="has-pd-10 has-pdt-0 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>付款金额：<span>{{order.pay_money||""}}元</span></view>
								</view>
							</view>
						</view>
						
		
						<!-- 第三步 -->
						<view class="border-bottom-gray">
							<view v-if="order.status <= 2" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">3</span>商家确认订单<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status > 2" class="step-progress-title">
								<span class="number-box has-mgr-10">3</span>商家确认订单<span class="is-size-14 is-grey">{{order.check_time_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10  left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款方式：<span>平台返款</span></view>
								</view>
							</view>
							<view class="has-pd-10 has-pdt-0 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款帐号：<span>{{webname}}本金账户</span></view>
								</view>
							</view>
							<view class="has-pd-10 has-pdt-0 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款金额：<span>{{product.total_goods_price}}元</span>
										<span class="copy-btn" v-if="order.status > 3 && order.hasten_refunds == 0" @tap="cuifankuan(order.order_sn)">催返款</span>
									</view>
								</view>
							</view>
						</view>
						
						<!-- 第四步 -->
						<view class="border-bottom-gray">
							<view v-if="order.status < 4" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">4</span>收货好评<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status >= 4" class="step-progress-title">
								<span class="number-box has-mgr-10">4</span>收货好评<span class="is-size-14 is-grey" v-if="modeltype!=1">{{order.evaluate_time_str}}</span>
							</view>
									
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 4  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>提示说明：<span>务必在物流显示签收后确认</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 4 ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>评价类型：<span>{{product.product_keywrods.modeltype_str}}</span>
										<span class="copy-btn tr-bg-pink is-white" v-if="order.status==3" @tap="evaluateSucc(order.order_sn,product.platform_name)">确认收货</span>
									</view>
								</view>
							</view>
									
							<!-- <block v-if="product.product_keywrods.modeltype != 1 ">
								<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 4  ? 'nostatus-box' : '']" @tap="toContentInfo()">
									<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
										<view class="is-red">该任务{{product.product_keywrods.modeltype_str}}，点击查看评价要求</view>
									</view>
								</view>
							</block> -->
						</view>
						
						<!-- 第五步 -->
						<view >
							<view v-if="order.status < 5" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">5</span>任务完成<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status >= 5" class="step-progress-title">
								<span class="number-box has-mgr-10">5</span>任务完成<span class="is-size-14 is-grey">{{order.commision>0?order.commision_time_str:''}}</span>
							</view>
									
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 5  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>获得佣金：<span>{{order.commision}}元</span></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 浏览任务进度显示 -->
		<view class="s-col is-col-24" v-if="order.model == 2 ">
			<view class="s-list has-pdt-0 has-mgt-0">
				<view class="is-item has-pd-10">
					<view class="is-item-bd">
						<!-- 第一步 -->
						<view class="border-bottom-gray">
							<view class="step-progress-title">
								<span class="number-box has-mgr-10">1</span>接手任务<span class="is-size-14 is-grey">{{order.addtime_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>任务编号：<span>{{order.order_sn}}</span><span class="copy-btn" @tap="copy(order.order_sn)">复制</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>任务账号：<span>{{order.buyer_name}}</span></view>
								</view>
							</view>
						</view>
						<!-- 第二步 -->
						<view class="border-bottom-gray">
							<view v-if="order.orderid_time < 1" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">2</span>提交任务<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.orderid_time > 1" class="step-progress-title">
								<span class="number-box has-mgr-10">2</span>提交任务<span class="is-size-14 is-grey">{{order.orderid_time_str}}</span>
							</view>
									
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>订单编号：<span>{{order.orderid||"-"}}</span>
										<span class="copy-btn" v-if="order.status == 2 " @tap="editOrderSn(order.order_sn)">修改</span>
									</view>
								</view>
							</view>
									
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>付款金额：<span>{{order.pay_money||""}}元</span></view>
								</view>
							</view>
						</view>
						
						<!-- 第三步 -->
						<view >
							<view v-if="order.status < 5" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">3</span>任务完成<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status >= 5" class="step-progress-title">
								<span class="number-box has-mgr-10">3</span>任务完成<span class="is-size-14 is-grey">{{order.refunds_time_str}}</span>
							</view>
									
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 5  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>获得佣金：<span>{{order.commision}}元</span></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 地推任务进度显示 -->
		<view class="s-col is-col-24" v-if="order.model == 3 ">
			<uni-popup :show="popupModal" type="middle newTaskPopup" @hidePopup="onClose">
				<view class="popup-content">
					<view class="popup-content-form has-pd-10">
						<input type="text" :value="buyerName" @input="bindInput" class="is-input" placeholder="请输入对方买号昵称" />
					</view>
					<view class="popup-content-btn">
						<view class="is-center confirm has-borderr" @tap="onSubmit">确认</view>
						<view class="is-center cancel" @tap="onClose">取消</view>
					</view>
					<view class="s-row"></view>
				</view>
			</uni-popup>
			<view class="s-list has-pdt-0 has-mgt-0">
				<view class="is-item has-pd-10">
					<view class="is-item-bd">
						<!-- 第一步 -->
						<view class="border-bottom-gray">
							<view class="step-progress-title">
								<span class="number-box has-mgr-10">1</span>接手任务<span class="is-size-14 is-grey">{{order.addtime_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>任务编号：<span>{{order.order_sn}}</span><span class="copy-btn" @tap="copy(order.order_sn)">复制</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>下单买号：<span>{{order.buyer_name||""}}</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>商品金额：<span>{{product.total_goods_price}}元</span></view>
								</view>
							</view>
						</view>
						
		
						<!-- 第二步 -->
						<view class="border-bottom-gray">
							<view v-if="order.orderid_time < 1" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">2</span>订单付款<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.orderid_time > 1" class="step-progress-title">
								<span class="number-box has-mgr-10">2</span>订单付款<span class="is-size-14 is-grey">{{order.orderid_time_str}}</span>
							</view>
									
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>订单编号：<span>{{order.orderid||"-"}}</span>
										<span class="copy-btn" v-if="order.status == 2 " @tap="editOrderSn(order.order_sn)">修改</span>
									</view>
								</view>
							</view>
									
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>付款金额：<span>{{order.pay_money||""}}元</span></view>
								</view>
							</view>
						</view>
						
		
						<!-- 第三步 -->
						<view class="border-bottom-gray">
							<view v-if="order.status <= 2" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">3</span>商家确认订单<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status > 2" class="step-progress-title">
								<span class="number-box has-mgr-10">3</span>商家确认订单<span class="is-size-14 is-grey">{{order.check_time_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款方式：<span>平台返款</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款帐号：<span>{{webname}}本金账户</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款金额：<span>{{product.total_goods_price}}元</span>
										<span class="copy-btn" v-if="order.status > 2 && order.hasten_refunds == 0" @tap="cuifankuan(order.order_sn)">催返款</span>
									</view>
								</view>
							</view>
						</view>
						
						<!-- 第4步 -->
						<view >
							<view v-if="order.status < 5" class="step-progress-title">
								<span class="number-box nostatus-box has-mgr-10">4</span>任务完成<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status >= 5" class="step-progress-title">
								<span class="number-box has-mgr-10">5</span>任务完成<span class="is-size-14 is-grey">{{order.refunds_time_str}}</span>
							</view>
									
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 5  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>获得佣金：<span>{{order.commision}}元</span></view>
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCountdown from "@/components/uni-countdown.vue"
	import uniPopup from "@/components/uni-popup.vue"
	export default{
		data(){
			return{
				userid:"",
				webname: "",
				popupModal: false,
				buyerName: "",
				"order": {
				},
				"product": {
				}
			}
		},
		components: {
			uniCountdown,
			uniPopup
		},
		onLoad(param) {
			this.order_sn = param.order_sn;
			this.webname = this.$Sysconf("webname");
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			if (!userid) {
				uni.navigateTo({
					url: '/pages/ucenter/login'
				})
			}
			this.userid = userid;
			this.loadData();
		},
		methods:{
			loadData: function() {
				var _self = this;
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request("task/getinfo", {
					order_sn: this.order_sn,
					uid: this.userid
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						var order = res.data.order;
						var product = res.data.product;
						this.isLoading = true;
						this.order = order;
						this.product = product;
						this.placeholder_text = "请输入" + product.platform_name + "订单编号";
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						setTimeout(function() {
							uni.redirectTo({
								url: '/pages/task/index'
							});
						}, 2000);
					}
				});
			},
			onSubmit: function() {
				uni.hideKeyboard();
				if (this.buyerName == "") {
					uni.showToast({
						title: "请输入买号名称",
						icon: "none"
					});
					return false;
				}
				uni.showLoading({
					mask: true,
					title: "验证中...",
				});
				this.$Request("task/checkBuyerEarth", {
					uid: this.userid,
					buyer_name: this.buyerName,
					order_sn: this.order_sn
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						var order_sn = this.order_sn;
						var links = "/pages/task/earthDetail?order_sn=" + order_sn + "&buyerName=" + this.buyerName;
						this.onClose();
						// 验证成功
						uni.navigateTo({
							url: links
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: "大侠 手速太快",
						icon: "none",
					})
				});
			},
			onClose: function() {
				this.popupModal = false;
				this.buyerName = "";
			},
			toContentInfo: function(orderid) {//查看要求
				var order_sn = this.order_sn;
				uni.navigateTo({
					url: '/pages/task/evaluateInfo?order_sn=' + order_sn
				});
			},
			evaluateSucc: function(orderid,platform_name) {//我已评价
				var that = this;
				uni.navigateTo({
					url: '/pages/task/submit_evaluation?order_sn=' + orderid +'&platform_name=' + platform_name
				});
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '您确定快递已经签收了吗？评价也必须要按照评价要求填写哦！',
			// 		success: function(res) {
			// 			if (res.confirm) {
			// 				uni.showLoading({
			// 					mask: true,
			// 					title: "请稍等...",
			// 				});
			// 				that.$Request("task/evaluateSucc", {
			// 					uid: that.userid,
			// 					order_sn: orderid
			// 				}).then(req => {
			// 					uni.hideLoading();
			// 					uni.showToast({
			// 						title: req.msg
			// 					})
			// 					if (req.code == 200) {
			// 						that.order.status = 4; // 更新状态 
			// 						that.order.evaluate_time_str = req['data']['refunds_time_str'];
			// 					}
			// 				}).catch(err => {
			// 					uni.hideLoading();
			// 					uni.showToast({
			// 						title: "系统繁忙"
			// 					});
			// 				});
			// 			} else {
			// 
			// 			}
			// 		}
			// 	});
			
			},
			cuifankuan: function(orderid) {//催返款
				this.$Request("task/hasten_refunds", {
					uid: this.userid,
					order_sn: orderid
				}).then(res => {
					if (res.code == 200) {
						this.order.hasten_refunds = 1;
						uni.showToast({ title: '已成功提醒商家尽快返款!', icon: 'none' });
					}
				});
			},
			copy: function(val) {//点击复制
				uni.setClipboardData({
					data: val,
					success: function() {
						uni.showToast({
							title: "复制成功！"
						})
					}
				});
			},
			editOrderSn: function(orderid) {
				var that = this;
				// 修改订单编号 
				plus.nativeUI.prompt("修改订单编号", function(e) {
					if (e.index == 0) {
						if (e.value == "") {
							uni.showToast({
								title: "未输入新订单编号"
							})
							return false;
						}
						that.$Request("task/update_ordersn", {
							order_sn: orderid,
							orderid: e.value,
							uid: that.userid,
						}).then(res => {
							uni.showToast({
								title: res.msg
							})
							if (res.code == 200) {
								that.order.orderid = e.value; //更新新订单编号
							}
						});
						console.log(e.value);
					}
				}, "", "请输入新订单编号", ["确定", "取消"]);
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "../../static/css/base.less";
	#newTaskprogress{
		.tr-bg-pink{
			background-color: #FF4B5E;
		}
		.border-bottom-gray{
			border-bottom: 10upx solid #E2E1DF;
		}
		.is-grey{
			color:#969799!important;			
		}

		.s-list{
			background-color: #ececec;
		}
		.newTaskPopup {
			width: 80%;
			border-radius: 10rpx;
			height: 230rpx;
		}
		.step-progress-title{
			padding-bottom: 15rpx;
			padding-top: 30rpx;
		}
		
		.step-progress-title>span:last-child{
			float: right;
		}
		.content .is-item-hd .iconfont {
			font-size: 40rpx;
			padding-right: 15rpx;
		}
		
		.content .iconfont.icon-unie651 {
			color: #ff5000;
		}
		
		.content .iconfont.icon-tianmao {
			color: #ff0036;
		}
		
		.content .iconfont.icon-jingdongbaitiao {
			color: #f30213;
		}
		
		.icon-busy {
			color: #666;
			font-size: 150rpx;
		}
		
		.is-item,
		.is-item-line {
			padding: 10rpx 20rpx;
		}
		
		.s-list2-title {
			margin-top: 18rpx !important;
		}
		
		.input-answer input {
			width: 75%;
			float: left;
			height: 70rpx;
			border: 1px solid #eee;
			line-height: 70rpx;
			padding-left: 6px;
			font-size: 30rpx;
		}
		
		.input-answer button {
			width: 20%;
			float: right;
			border: none;
			background: @baseBackGroundColor;
			color: #fff;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 30rpx;
		}
		
		.form-senddata {
			width: 100%;
		}
		
		.ordersnInf input {
			height: 90rpx;
			line-height: 70rpx;
			padding: 5rpx;
		}
		
		.task-opt .is-item-bd {
			width: 25%;
		}
		
		.task-opt .is-item-bd button {
			border: 2rpx solid @baseBackGroundColor;
			background: @baseBackGroundColor;
			color: #fff;
			line-height: 2;
		}
		
		.task-opt .is-item-bd button:after {
			border: none;
		}
		
		.task-opt .is-item-bd button[disabled] {
			border: 2rpx solid #ddd;
			background: #ddd;
			color: #fff;
		}
		
		.number-box {
			background: #FF9DA8;
			border-radius: 50%;
			color: #fff!important;
			font-size: 30rpx;
			height: 50rpx;
			width: 50rpx;
			display: inline-block;
			line-height: 50rpx;
			text-align: center;
		}
		
		.number-box.nostatus-box {
			background: #999999;
		}
		
		.left-num {
			// border-left: 10rpx solid #FF9DA8;
			padding: 0rpx!important;
			padding-left: 20rpx!important;
			margin-left: 20rpx!important;
			padding-top: 20rpx!important;
		}
		
		.nostatus-box.left-num {
			// border-left: 10rpx solid #999999;
		}
		
		.left-num .is-item-bd {
			padding-left: 30rpx;
		}
		
		.copy-btn {
			text-align: right;
			float: right;
			border: 2rpx solid #ddd;
			color: #999;
			padding: 10rpx 15rpx;
			border-radius: 5rpx;
			font-size: 25rpx;
			margin-top: -8px;
		}
		
		.copy-btn .has-bg-blue {
			border: none;
		}
		
		.popupMain {
			width: 90%;
		}
		
		.popupMain {
			width: 100%;
		}
		
		.popup-content {
			min-width: 100%;
		}
		
		.popup-content-btn {
			border-top: 1px solid #eee;
			height: 100rpx;
			line-height: 100rpx;
		}
		
		.popup-content-btn .confirm {
			width: 50%;
			float: left;
		}
		
		.popup-content-btn .cancel {
			width: 50%;
			float: right;
		}
		
		.popup-content .is-input {
			height: 95rpx;
			line-height: 75rpx;
		}
		
		.uni-countdown {
			-webkit-box-pack: left !important;
			-webkit-justify-content: left !important;
			justify-content: left !important;
		
		}
		
		.uni-countdown-numbers {
			border: none !important;
			font-size: 29rpx !important;
		
		}
	}
	
</style>
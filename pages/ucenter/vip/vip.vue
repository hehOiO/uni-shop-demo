<template>
	<view class="s-page-wrapper">
		<view class="vip-header">
			<image src="../../../static/images/vip/vipheader.png" mode="widthFix" class="is-response"></image>
		</view>
		<view class="user-info has-bg-white has-pd-10 s-row has-borderb">
			<view class="has-floatl is-col-1-5">
				<image :src="defaultAvatar" mode="widthFix" class="avatar"></image>
			</view>
			<view class="has-floatl is-col-1-8888 has-pdl-10">
				<view class="username is-bold has-title-color has-pdt-10 is-size-20">{{userinfo.phone}}</view>
				<view class="usergroup has-desc-color">{{userinfo.group_name}}</view>
			</view>
		</view>

		<view class="vip-group has-mgt-10 has-bg-white">
			<view class="is-flex is-justify-center is-align-center has-pd-10">
				<text class="e28-shaper"></text>
				<text class="has-title-color is-size-18 has-mglr-10 e26-title">开通VIP</text>
				<text class="e28-shapel"></text>
			</view>
			<view class="s-list2  has-bordertb">
				<view class="is-item2 has-bordertb has-pdtb-10" v-if="grouplist.length > 0" v-for="(item,index) in grouplist" :key="index">
					<view class="is-list2-info has-list2-tip">
						<view class="is-size-18">{{item.title}}</view>
						<view class="has-desc-color">
							<del>￥{{item.oprice}}</del>
						</view>
						<view class="is-list2-tip" @tap="buyVip(item.id)">
							<view class="buyBtn"><text>￥</text>{{item.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="vip-group has-mgt-10 has-bg-white">
			<view class="is-flex is-justify-center is-align-center has-pd-10">
				<text class="e28-shaper"></text>
				<text class="has-title-color is-size-18 has-mglr-10 e26-title">VIP特权介绍</text>
				<text class="e28-shapel"></text>
			</view>
			<view class="s-list2  has-bordertb has-pdtb-10">
				<view class="is-item has-right-icon has-pdtb-15">
					<view class="is-item-hd">
						<text class="iconfont icon-unie651 is-size-28"></text>
					</view>
					<view class="is-item-bd">
						<view class="has-pdl-5">11111</view>
					</view>
					<view class="is-item-ft">222222</view>
				</view>
			</view>
		</view>
		<dialog></dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: [],
				defaultAvatar: "",
				grouplist: [{
						title: "至尊VIP",
						id: 1,
						price: 168,
						oprice: 288,
					},
					{
						title: "超级VIP",
						id: 2,
						price: 98,
						oprice: 198,
					},
					{
						title: "普通VIP",
						id: 3,
						price: 68,
						oprice: 168,
					}
				],
			};
		},
		onLoad: function() {
			var userinfo = this.$SysUser.get();
			if (!userinfo) {
				uni.reLaunch({
					url: "/pages/ucenter/login",
				})
			}
			this.userinfo = userinfo;
			this.defaultAvatar = this.$Sysconf('imagelist.defaultAvatar');
		},
		methods: {
			buyVip: function(id) {
				uni.showLoading({
					title: "订单创建中",
				});
				this.$Request("vip/create_order", {
					id: id,
					uid: this.userinfo.openid
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						uni.showLoading({
							title: "支付中...",
						});
						let paymentData = res.data.paymentData; // 微信支付的信息 
						let orderinfo = res.data.orderinfo; // 订单信息
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: paymentData,
							success: (res)=> {
								uni.hideLoading()
								// 获取订单支付结果 
								this.$Request("vip/queryorder",{
									uid: this.userinfo.openid,
									order_sn : orderinfo.out_trade_no,
									trade_type:orderinfo.trade_type,
									time_expire : orderinfo.time_expire,
								}).then(query=>{
									uni.showToast({
										title:"订单支付成功",
										icon:"success",
									});
									//uni.hideLoading(); 
									//console.log("订单返回："+JSON.stringify(query)); 
								}).catch(qerror=>{
									uni.hideLoading();
									uni.showToast({
										title:"系统繁忙，请联系客服",
										icon:"none"
									});
								});
							},
							fail: (err)=> {
								uni.hideLoading()
								if(~err.errMsg.indexOf('-2')) {
									uni.showToast({
										title:"用户取消支付",
										icon:"none",
									})
								}else{
									uni.showToast({
										title:"系统繁忙，请重试",
										icon:"none",
									})
								}
							}
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: "系统繁忙",
						icon: "none"
					});
				})
			}
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";

	page {
		background: #f2f2f2;
	}

	.is-col-1-8888 {
		width: 60%;
	}

	.e28-shapel {
		background: url("data:image/png;base64,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");
		width: 39rpx;
		height: 24rpx;
	}

	.e28-shaper {
		background: url("data:image/png;base64,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");
		width: 39rpx;
		height: 24rpx;
	}

	.vip-header {
		height: 400upx;
		width: 100%;
	}

	.user-info .avatar {
		width: 128upx;
		height: 128upx;
		border: 1upx solid @baseBackColor;
		border-radius: 50%;
	}

	.buyBtn {
		text-align: center;
		width: 130upx;
		font-size: 36upx;
		border: 2upx solid @baseBackGroundColor;
		padding: 5upx 25upx;
		border-radius: 50upx;
		color: @baseBackGroundColor;
	}

	del {
		text-decoration: line-through;
	}
</style>

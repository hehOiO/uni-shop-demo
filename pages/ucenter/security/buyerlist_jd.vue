<template>
	<view class="content">
		<view class="s-page-wrapper">
			<view class="buyer-list-container">
				<view class="buyer-list-item-box" v-if="buyerlist.length > 0 " v-for="(item,index) in buyerlist" :key="index" @tap="toDetail(item.id)">
					<view class="buyer-item-left">
						<view class="buyer-name">
							{{item.name}}
						</view>
						<view class="buyer-address">
							{{item.province}}{{item.addres}}
						</view>
						<view class="buyer-phone">
							{{item.tel}}
						</view>
					</view>
					<view class="buyer-item-right" v-if="item.status==1">
						{{item.statusstr}}
					</view>
					<view class="buyer-item-right1" v-if="item.status==0">
						{{item.statusstr}}
					</view>
					<view class="buyer-item-right2" v-if="item.status==2">
						{{item.statusstr}}
					</view>
				</view>
			</view>
			<view class="is-flex is-justify-center is-align-center footer100" @tap="addBuyer">
				<view class="is-333"><text class="iconfont icon-xinzeng1" style="margin-right: 10rpx;"></text>添加买号</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				mode: '',
				buyerlist: [],
			}
		},
		methods: {
			getData(mode) {
				console.log(mode);
				this.$Request('member/getbuyerlist', {
					uid: this.userid,
					mode: mode
				}).then(res => {
					if (res['code'] == 200) {
						this.buyerlist = res.data;
					}
				});
				console.log(JSON.stringify(this.buyerlist));
			},
			addBuyer() {
				uni.navigateTo({
					url: '/pages/ucenter/security/bindBuyerJd?mode=' + this.mode
				});
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/ucenter/security/BuyerInfoJd?id=' + id
				});
			}
		},
		onLoad: function(e) {
			this.mode = e.mode;
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			if (!userid) {
				uni.navigateTo({
					url: '/pages/ucenter/login'
				});
				return false;
			}
			this.userid = userid;
			this.getData(this.mode);
			var title = "淘宝买号";
			if (this.mode === "jd") {
				title = "京东买号";
			} else if (this.mode === "pinduoduo") {
				title = "拼多多买号";
			}
			uni.setNavigationBarTitle({
				title: title + "列表"
			});
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";

	page {
		min-height: 100%;
		background-color: #F2F2F2;
	}
	.buyer-name{
		font-size: 30rpx;
		color: #000;
	}
	.buyer-address{
		font-size:24rpx;
		color: #969696;
	}
	.buyer-item-left>view:not(:last-child){
		margin-bottom: 8rpx;
	}
	.buyer-phone{
		font-size: 24rpx;
		color: #969696;
	}
	.buyer-item-right{
		font-size: 28rpx;
		color: #129D02;
	}
	.buyer-item-right1{
		font-size: 28rpx;
		color: #989898;
	}
	.buyer-item-right2{
		font-size: 28rpx;
		color: #FF0103;
	}
	.buyer-list-container{
		padding: 8rpx;
		margin-top: 30rpx;
		padding-bottom: 120rpx;
	}
	.buyer-list-item-box{
		background-color: #fff;
		padding: 24rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow:0px 2px 20rpx 2rpx #e2e2e2;
		margin-bottom:15rpx;
	}
	.h100vh {
		height: calc(100vh - 100rpx);
	}

	.footer100 {
		height: 80rpx;
		font-size:28rpx;
		background: #fff;
		color: #333;
		/*		width:50%;*/
		margin: 20px 0rpx;
		box-shadow:0px 2px 20rpx 2rpx #e2e2e2;
		border-radius: 10rpx;
		position: fixed;
		width: calc(100% - 16rpx);
		box-sizing: border-box;
		left: 8rpx;
		bottom: 10rpx;
	}

	.is-333 {
		color: #333;
	}

	.footer100 .iconfont {
		font-size: 30rpx;
	}
</style>

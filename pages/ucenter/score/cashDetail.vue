<template>
	<view class="s-page-wrapper">
		<view class="s-row ">
			<view class="s-col is-col-24" v-if="info">
				<view class="s-list has-mgt-0">

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">提现金额</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18">{{info.money}}</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">实际到账</view>
						</view>
						<view class="is-item-bd">
							<view class="is-size-20 is-red is-bold">{{info.amount}}</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">交易类型</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18">{{info.type}}</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">交易编号</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18">{{info.id}}</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">收款银行</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18">{{info.bank_account}}</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">创建时间</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18 ">{{info.addtime}}</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">交易状态</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18 is-grey" v-if="info.status == 0 ">待审核</view>
							<view class="is-size-18 is-green" v-if="info.status == 1 ">通过</view>
							<view class="is-size-18 is-red" v-if="info.status == 2 ">拒绝</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20" v-if="info.status == 2 ">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">拒绝原因</view>
						</view>
					</view>
					<view class="is-item is-a has-pdtb-20" v-if="info.status == 2 ">

						<view class="is-item-hd">
							<view class="is-size-18 ">{{info.cause}}</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">操作地址</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18 ">{{info.ip}}</view>
						</view>
					</view>

				</view>

			</view>
		</view>
	</view>
</template>

<script>
	var util = require('../../../common/util.js');
	export default {
		data() {
			return {
				userid: '',
				info: [],
			}
		},
		methods: {
			loadData(id) {
				this.$Request("member/loadcashInfo", {
					uid: this.userid,
					id: id
				}).then(res => {
					if (res.code == 200) {
						res.data.bank_account = util.FormatBankSpace(res.data.bank_account); // //四位数字一组，以空格分割 
						this.info = res.data
					} else {
						uni.navigateBack();
					}
				});
			}
		},
		onShow: function() {

		},
		onLoad: function(e) {
			var userid = this.$SysUser.openid();
			this.userid = userid;
			this.loadData(e.id);
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

	.is-size-20 {
		text-align: right;
		font-size: 64rpx;
	}
</style>

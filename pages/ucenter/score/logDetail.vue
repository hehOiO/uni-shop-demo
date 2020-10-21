<template>
	<view class="s-page-wrapper">
		<view class="s-row ">
			<view class="s-col is-col-24" v-if="info">
				<view class="s-list has-mgt-0">

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">交易金额</view>
						</view>
						<view class="is-item-bd">
							<view class="is-size-20 is-red is-bold" v-if="info.type == 1">-{{info.score}}</view>
							<view class="is-size-20 is-green is-bold" v-if="info.type == 2">+{{info.score}}</view>
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
							<view class="is-size-16 is-grey">交易类型</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18">{{info.action}}</view>
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
							<view class="is-size-16 is-grey">备注说明</view>
						</view>
					</view>
					<view class="is-item is-a has-pdtb-20">

						<view class="is-item-hd">
							<view class="is-size-18 ">{{info.content}}</view>
						</view>
					</view>


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
				info: [],
			}
		},
		methods: {
			loadData(id) {
				this.$Request("member/loadScorelogInfo", {
					uid: this.userid,
					id: id
				}).then(res => {
					if (res.code == 200) {
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
			var userid =  this.$SysUser.openid();
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

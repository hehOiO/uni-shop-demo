<template>
	<view class="s-page-wrapper">
		<view class="s-row ">
			<view class="s-col is-col-24" v-if="info">
				<view class="s-list has-mgt-0">

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">累计获利</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18">{{info.agent_total_score}}</view>
						</view>
					</view>

					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey" v-if="info.member_type == 1 ">完成任务</view>
							<view class="is-size-16 is-grey" v-if="info.member_type == 2">发布任务</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18">{{info.agent_max_order}}</view>
						</view>
					</view>


					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">注册时间</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18 ">{{info.createTime}}</view>
						</view>
					</view>


					<view class="is-item is-a has-pdtb-20">
						<view class="is-item-bd">
							<view class="is-size-16 is-grey">邀请人数</view>
						</view>
						<view class="is-item-hd">
							<view class="is-size-18 ">{{info.downline||0}}</view>
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
				agentuserid: '',
				info: [],
			}
		},
		methods: {
			loadData(agentuserid) {
				this.$Request("member/loadUnionDetail", {
					uid: this.userid,
					agentuserid: agentuserid
				}).then(res => {
					if (res.code == 200) {
						res.data['createTime'] = util.dateUtils.toDateString(res.data['createTime'] * 1000, "yyyy-MM-dd");
						this.info = res.data;
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
			this.loadData(e.userid);
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

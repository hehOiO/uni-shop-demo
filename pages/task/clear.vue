<template>
	<view class="page  has-bg-white">

		<view class="s-page-wrapper">
			<view class="page-security has-pdtb-20">
				<image src="../../../static/images/task/mark.user@2x.png" mode="widthFix" class="is-response"></image>
			</view>
		</view>

		<view class="has-pd-10 is-center has-borderb">
			<view class=" is-size-16 has-desc-color">
				今日已取消<text class="is-red">{{info.number}}</text> 次,当天取消超过{{info.num}}次则当天不给予派单
			</view>

		</view>

		<view class="has-pd-10">
			<view class="Explain">
				近期有用户频繁接单后撤销任务，占用任务资源导致其他用户可能无法接到该任务，为了保障所有用户和商家的公平权益，当天取消超过{{info.num}}次则当天不给予派单，请慎重撤销哦~
			</view>
		</view>


		<view class="s-row ">
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">
					<view class="uni-list has-bg-white">
						<radio-group @change="switchRadio">
							<label class="uni-list-cell uni-list-cell-pd has-bg-white" v-for="item in report" :key="item.value">
								<view>{{item.name}}</view>
								<view>
									<radio :value="item.name" checked="true" color="#56aafb" />
								</view>

							</label>
						</radio-group>
					</view>
				</view>
			</view>
		</view>


		<view class=" btnbox has-pd-10" @tap="submitSend">
			<button>申请取消并派给其它用户</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				sendData: {
					order_sn: '',
					typeid: '我不想做了',
				},
				report: [{
					'name': '商品找不到'
				}, {
					'name': '商品有运费'
				}, {
					'name': '商品没货'
				}, {
					'name': '达不到商家备注的要求'
				}, {
					'name': '我不想做了'
				}],
				info: {
					number: 0,
					num: 10,
					score: 0.1,
				}
			}
		},
		methods: {
			submitSend() {
				var sendData = this.sendData;
				if (sendData.typeid == "") {
					uni.showToast({
						title:"请选择取消原因",
						icon:"none"
					});
					return false;
				}
				sendData['uid'] = this.userid;
				
				var tmptext = '本次撤销免费';
				var info = this.info; 
				
				var leftnums = info['num']-info['number'];
				if(info['number'] >= info['num'] ){
					tmptext = "本次撤销扣除"+info['score']+"积分";
					leftnums = 0;
				}
				uni.showModal({
					title:"温馨提示",
					content:"今日还可以免费撤销"+leftnums+"次,超过后每次撤销扣除"+info['score']+"积分，"+tmptext,
					confirmText:"残忍撤销",
					cancelText:"我再想想",
					success:(e=>{
						if(e.cancel){
							uni.navigateBack({})
						}else if(e.confirm){
							this.$Request("task/clearorder", sendData).then(res => {
								if (res.code == 200) {
									uni.showToast({
										title: "取消成功！"
									});
									setTimeout(function(){
										uni.navigateBack({
											delta: 2
										});
										
										/*
										* 取消任务的，返回未完成任务列表，重新刷新列表
										* 
										* */ 
										setTimeout(function(){
											var pages=getCurrentPages();
											for(var i=0;i<pages.length;i++){
												if(pages[i].loadData){
													pages[i].loadData()
												}
											}
										},1000)	
									}, 2000);
								} else {
									uni.showToast({
										title: res.msg
									});
								}
							})
						}
					})
				})
				
				return false; 

			},
			switchRadio: function(e) {
				this.sendData.typeid = e.detail.value;
			},
			loadData:function(){
				this.$Request("task/cancelCount",{uid:this.userid}).then(res=>{
					if(res.code == 200 ){
						this.info = {
							number : res.data.totalCancel,
							num : res.data.cancelTasknum,
							score : res.data.cancelTaskScore,
						}
					}
				})
			}
		},
		onLoad: function(e) {
			this.sendData.order_sn = e.order_sn;
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
			this.loadData(); 
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	@import "../../common/uni.css";

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}

	.feedback-input {
		font-size: 30rpx;
		height: 60rpx;
		line-height: 50rpx;
	}

	.btnbox {
		background: #fff;
	}

	.btnbox button {
		width: 100%;
		background: @baseBackGroundColor;
		border: none;
		color: #fff;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		border-radius: 4rpx;
	}

	.uni-uploader-box2 {
		width: 100%;
		height: 100%;
	}

	.label-text {
		float: left;
		position: relative;
		font-size: 25rpx;
		color: #333;
		width: 160rpx;
		text-align: center;
	}

	input[disabled],
	input {
		color: #333;
	}

	.Explain {
		color: #ffb800;
		margin-top: 10upx;
		border: 2upx dashed #ffb800;
		padding: 10upx;
		font-size: 28upx;
		border-radius: 5upx;
	}

	.page-security {
		margin: 0 auto;
		text-align: center;
		width: 300upx;
	}
</style>

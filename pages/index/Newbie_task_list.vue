<template>
	<view id="newbieTaskList">
		<!-- <view class="list-newbie" @tap="toExamination">
			<view class="list-left">
				<view class="left-image-box">
					 <image src="../../static/images/task/kspng.png"></image>
				</view>
				<view class="left-text-box">
					新手考试
				</view>
			</view>
			<view class="font-pink">{{examStatus==1?'已完成':'未完成'}}</view>
		</view> -->
		<view class="list-newbie" @tap="toBind">
			<view class="list-left">
				<view class="left-image-box">
					 <image src="../../static/images/task/bdpng.png"></image>
				</view>
				<view class="left-text-box">
					新手绑定
				</view>
			</view>
			<view class="font-pink">{{bindStatus==1?'已完成':'未完成'}}</view>
		</view>
	</view>
</template>

<script>
	var base = require('../../common/lib/base.js');
	export default {
		data() {
			return {
				userid:"",
				bindStatus:"",
				examStatus:""
			}
		},
		methods: {
			toExamination(){
				uni.navigateTo({
					url:"/pages/index/new_Examination"
				})
			},
			toBind(){
				uni.navigateTo({
					url:"/pages/ucenter/security/buynumber"
				})
			},
			getStatus(){
				this.$Request("member/getBindStatus", {
					uid: this.userid,
				}).then(res => {
					if (res.code == 200) {
						this.examStatus = res.data.check_status;
						this.bindStatus = res.data.bind_status;
					} else {
				
					}
				})
			}
			
		},
		onLoad: function(param) {
			var userid = this.$SysUser.openid();
			this.userid = userid; 
			
		},
		onShow: function() {
			this.getStatus();
		},
		onUnload: function() {
			
		},
		
	}
</script>

<style lang="less">
	#newbieTaskList{
		color: #6B6B6B;
		font-size: 30rpx;
	}
	.left-image-box{
		width: 70rpx;
		height: 70rpx;
		background-color: #FF4B5D;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		margin-right:30upx;
		image{
			width: 50rpx;
			height: 50rpx;
		}
	}
	.list-left{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.list-newbie{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 24rpx;
		background-color: #F5F6F6;
		margin-top: 20upx;
	}
	.left-text-box{
		font-size: 32rpx;
	}
	.font-pink{
		color: rgb(251, 113, 128);
	}
</style>


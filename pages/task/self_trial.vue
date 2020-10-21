<template>
	<view id="selfTrial">
		<view class="trial-title">请上传所选账号的后台截图，等待商家审核通过</view>
		<view class="images-operation-cotainer">
			<view>
				<view class="up-operation-box" @tap="uploadPic" data-name="trial_one" v-if="sendData.trial_one == ''">
					<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
					<text>点击上传</text>
				</view>
				<view v-if="sendData.trial_one != ''"  @tap="uploadPic" data-name="trial_one">
					<image :src="sendData.trial_one" model="scaleToFill"></image>
				</view>
				<view class="image-ex">我的淘宝</view>
			</view>
			<view>
				<view class="up-operation-box" @tap="uploadPic" data-name="trial_two" v-if="sendData.trial_two == ''">
					<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
					<text>点击上传</text>
				</view>
				<view v-if="sendData.trial_two != ''"  @tap="uploadPic" data-name="trial_two">
					<image :src="sendData.trial_two" model="scaleToFill"></image>
				</view>
				<view class="image-ex">账户体验中心</view>
			</view>
			<view>
				<view class="up-operation-box" @tap="uploadPic" data-name="trial_three" v-if="sendData.trial_three == ''">
					<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
					<text>点击上传</text>
				</view>
				<view v-if="sendData.trial_three != ''"  @tap="uploadPic" data-name="trial_three">
					<image :src="sendData.trial_three" model="scaleToFill"></image>
				</view>
				<view class="image-ex">我的评价</view>
			</view>
		</view>
		<navigator url="/pages/detail/content?id=58" hover-class="navigator-hover"><view class="to-example" style="padding-top: 0px;">点击查看示例＞＞＞</view></navigator>
		<view class="explain-text">
			此任务为商家自审号任务，先提交商家需要的账户信息截图，然后等待商家审核通过，每次提交一个账号信息，每天可以提交不同的账号信息.
		</view>
		<view class="explain-text" style="background-color: #fff;">
			<view class="explain-label">图片要求：</view>
			<view class="explain-content has-mgb-15">
				• 所传图片均为实时图片，三张图片时间间隔不能超过20分钟.
			</view>
			<view class="explain-label">任务概况：</view>
			<view class="explain-content">
				• 请选择优质的淘宝账户，以免影响通过率.
			</view>
			<view class="explain-content">
				• 商家审核通过，系统会有短信及app新任务提醒.
			</view>
			<view class="explain-content">
				• 接到提醒后，需在2小时内提交订单任务信息.
			</view>
			<view class="explain-content">
				• 取消订单或者超时关闭会扣除信用分，影响派单.
			</view>
		</view>
		<view class="btn-box">
			<view @tap="cancel">取消</view>
			<view @tap="submitInfo">提交待商家审核</view>
		</view>
	</view>
</template>

<script>
	var upload = require('../../common/lib/upload.js');
	export default {
			data() {
				return {
					sendData:{//图片数据
						trial_one:"",
						trial_two:"",
						trial_three:""
					},
					userid:"",//userid
					type:"",//平台类型
					model:5,//订单类型
					buyerId:"",//买号id
					
				}
			},
			computed: {
			},
			
			methods: {
				cancel(e){//取消方法
					console.log(e);
					uni.showModal({
						content: "确认退出任务信息提交？",
						confirmText: "确定",
						cancelText: "取消",
						 success: function (res) {
							if (res.confirm) {
								uni.navigateBack({
								})
							} else if (res.cancel) {
								
							}
						}
					})
					
				},
				submitInfo(){
					let _this = this;
					if(this.sendData.trial_one==""||this.sendData.trial_two==""||this.sendData.trial_three==""){
						uni.showToast({
							title:"请上传三张后台截图",
							icon:"none"
						})
						return false;
					}
					this.$Request("task/taskInit",{
						uid:this.userid,
						model:this.model,
						type:this.type,
						buyer:this.buyerId,
						trial_one:this.sendData.trial_one,
						trial_two:this.sendData.trial_two,
						trial_three:this.sendData.trial_three,
					}).then(res=>{
						uni.showToast({title:res.msg,icon:'none'});
						if (res.code == 200 ) {
							_this.$Cache.put("trialStatus",1);
							setTimeout(function() {
								uni.navigateBack({
								})
							}, 2000);
						} 
					})
				},
				uploadPic:function(e){//上传图片方法
					var name = e.currentTarget.dataset.name;
					var that = this;
				    uni.chooseImage({
				        sourceType: ["camera", "album"],
				        sizeType: "compressed",
				        count: 1,
				        success: (res) => {
							console.log(JSON.stringify(res))
							uni.showLoading({
								title:"文件上传中",
								mask:true,
								duration:0
							})
							upload({
								filePath: res['tempFilePaths'][0],
								success: function(upres) {
									uni.hideLoading(); 
									uni.showToast({
										title:"文件上传成功",
										icon:"none"
									})
									if (upres.imageURL) {
										that.sendData[name] = upres['imageURL'];
										that.$mp.page.$getAppWebview().setStyle({
											softinputMode: 'adjustPan'
										})
									}
								},
								error: function(uperr) {
									uni.hideLoading(); 
									uni.showToast({
										title:"文件上传失败",
										icon:"none"
									})
									that.$mp.page.$getAppWebview().setStyle({
										softinputMode: 'adjustPan'
									})
								}
							})
				        }
				    })
				},
			},
			onHide: function() {
			},
			onShow: function() {
	 			
			},
			onUnload: function() {
	
			},
			onLoad:function(option) {
				var userid = this.$SysUser.openid();
				var type = this.$Cache.get('zhangHaoType');
				this.buyerId = option.buyerId
				this.userid = userid;
				this.type = type;
				console.log(this.userid + this.type);
				console.log(this.buyerId)
			}
		}
</script>

<style>
	#selfTrial{
		font-size: 30rpx;
	}
	.btn-box{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 24rpx;
		position: fixed;
		width: 100%;
		bottom: 0;
		box-sizing: border-box;
	}
	.btn-box view{
		height:66upx;
		line-height: 66upx;
		padding: 12upx 60upx;
		box-sizing: border-box;
		line-height: 42upx;
		color: #fff;
		border-radius: 10upx;
	}
	.btn-box view:first-child{
		background-color: #FF4B5E;
		
	}
	.btn-box view:last-child{
		background-color: #0099FF;
	}
	.explain-label{
		color: #333;
		margin-bottom: 10upx;
	}
	.explain-content{
		padding-left: 24rpx;
	}
	.explain-text{
		color: #888;
		padding: 24rpx;
		font-size: 28rpx;
	}
	.to-example{
		color: rgb(254, 98, 72);
		text-align: center;
		padding: 24rpx;
		background-color: #fff;
	}
	.image-ex{
		font-size: 28rpx;
		text-align: center;
		padding: 24rpx 0;
		color: #666;
	}
	.trial-title{
		color: #888;
		padding: 24rpx;
		text-align: center;
	}
	.up-operation-box{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 100%!important;
		height: 25vw;
		border: 2upx dotted #8a8a8a;
		border-radius: 10upx;
	}
	.up-operation-box text{
		font-size: 24rpx;
		color: #666;
	}
	.images-operation-cotainer{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 24rpx;
		background-color: #fff;
	}
	.images-operation-cotainer>view{
		width: 25vw;
		
	}
	.images-operation-cotainer view image{
		width: 100%;
		vertical-align: middle;
		height: 25vw;
	}
</style>

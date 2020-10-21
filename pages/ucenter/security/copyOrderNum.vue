<template>
	<view class="page" style="height: calc(100vh - 44px);">
		<view class="copy-box">
			<view><input type="text" v-model="copyOrderNum" disabled="disabled" placeholder="淘宝订单编号"></view>
			<view @tap="clipBoardTap">粘贴</view>
		</view>
		<view class="explain-box">
			请在此处填写任一淘宝订单的订单编号，在订单详情处可复制订单编号（如下图），订单编号的后四位为该淘宝号的专属编号，系统可以通过该编号核对是否串号。
		</view>
		<view style="flex-grow:1;margin-top: 20rpx;background-color: #fff;">
			<image src="/static/images/vip/bianhaoshili.png" mode="widthFix" style="width: 100%;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				copyOrderNum:"",
			}
		},
		components: {
			
		},
		methods: {
			clipBoardTap(){
				let _this = this;
				uni.getSystemInfo({
					success: function (res) {
						if(res.platform=="ios"){
							uni.getClipboardData({
								success: function (res) {
									console.log(res.data);
									_this.copyOrderNum = res.data;
									_this.$Cache.put("copyOrderNum",_this.copyOrderNum);
								}
							});
						}else{
							var Context = plus.android.importClass("android.content.Context");  
							var main = plus.android.runtimeMainActivity();  
							var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);  
							var result = typeof(plus.android.invoke(clip,"getText"));
							if(result == "string"){
								_this.copyOrderNum = plus.android.invoke(clip,"getText"); 
							}else{
								_this.copyOrderNum = plus.android.invoke(clip,"getText").toString(); 
							}
							_this.$Cache.put("copyOrderNum",_this.copyOrderNum);
						}
					}
				});
				
			}
		},
		onLoad: function(e) {
			
		},
		onShow: function() {

		},
		onUnload: function() {
			
		},
		onBackPress: function() {

		}
	}
</script>

<style lang="less">
	.page{
		display: flex;
		flex-direction: column;
		
	}
	.copy-box{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		padding: 24rpx;
		background-color: #fff;
		// border-bottom: 1upx solid #A4A4A4;
		position: relative;
	}
	.copy-box:after{
		content:"";
		display: block;
		height: 1rpx;
		width: calc(100% - 48rpx);
		bottom: 0px;
		background-color: #e4e4e4;
		position: absolute;
		left: 24rpx;
		
	}
	.copy-box>view:first-child{
		width: 70%;
	}
	.copy-box>view:last-child{
		color: #FA6D7B;
		border: 1px solid #FA6D7B;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		width: 80rpx;
		border-radius: 10rpx;
	}
	.explain-box{
		font-size: 28rpx;
		color: #919191;
		padding: 24rpx;
		padding-top: 50rpx;
		background-color: #fff;
		line-height: 1.8;
	}
</style>

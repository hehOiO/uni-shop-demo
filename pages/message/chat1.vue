<template>
	<view class="chat">
		<web-view :src="link">
		</web-view>
		<!-- <view style="width: 60%;margin:0 auto;margin-top: 60rpx;" @tap="previewImage('../../static/images/ucenter/1559035844.png')">
			<image src="../../static/images/ucenter/1559035844.png" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view style="color: rgb(150, 151, 153);padding: 24rpx;" >
			扫描二维码添加客服微信~（点击预览大图，长按保存图片）
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid:"",
				link:''
			}
		},
		computed: {
			
		},
		components: {
			
		},
		methods: {
			previewImage:function(imagesUrl){//预览图片方法
				var src = imagesUrl
				var urls = [];
				urls[0] = src; 
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage(urls,{
					onLongPress:function(e){	// 预览界面长按显示ActionSheet
						console.log('onLongPress: '+JSON.stringify(e));
						var imgUrl = e.url;
						var bts=[{title:"保存图片"}];
						plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
							function(e){
								console.log(e.index);
								if(e.index==1){
									plus.gallery.save( imgUrl, function () {
										uni.showToast({
											title:"保存图片成功",
											icon:"none"
										})
									});
								}
							}
						);
					}	
				});
				//#endif
			},
		
		},
		onHide: function() {
		
		},
		onShow: function() {
			
		},
		onUnload: function() {
			
		},
		onLoad:function(option) {
			var userid=this.$SysUser.openid();
			console.log(option.id);
			console.log(option.phone);
			this.userid = userid;
			this.link = 'https://ykf-webchat.7moor.com/wapchat.html?accessId=ad8b5c70-93c6-11e9-808d-8955ec0e8356&fromUrl=111.231.82.60&urlTitle=亿客拉&clientId='+ option.id +'&otherParams={"nickName":"'+option.id+'"}&customField={"userphone":"'+option.phone+'","ID":"'+ option.id +'"}';
		}
	}
</script>

<style>
</style>

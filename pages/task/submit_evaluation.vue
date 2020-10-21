<template>
	<view id="submit_evaluation" v-if="isLoading">	
		<view class="step-one-box">
			<view class="step-one-title">
				第一步：去{{platform_name}}评价并截图
			</view>
			<view class="step-one-content">
				<view>文字要求</view>
				<view @tap="clipTap">
					{{productInfo.remark?productInfo.remark:'该商家无指定文字要求'}}
				</view>
			</view>
			<view class="step-one-content example-img1" v-if="exampleImg.length>0">
				<view>图片要求（在{{platform_name}}中评价时需上传图片）</view>
				<view>
					<view v-for="(item , index) in exampleImg" @tap="previewImage(item)">
						<image :src="item" model="scaleToFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="step-one-box">
			<view class="step-one-title">
				第二步：上传评价及物流截图
			</view>
			<view class="step-one-content example-img">
				<view>
					<view style="margin-right: 6vw;">
						<view class="upload-img-box" v-if="sendData.evaluate_img" @tap="uploadPic" data-name="evaluate_img">
							<image :src="sendData.evaluate_img" model="scaleToFill"></image>
							<!-- <image class="clear-btn" src="../../static/images/task/clear.png"></image> -->
						</view>
						<view v-else class="up-operation-box" @tap="uploadPic" data-name="evaluate_img">
							<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
						</view>
						<view style="margin-top:20upx;text-align:center;color: rgb(255, 75, 94);font-size: 30rpx;">评价截图</view>
					</view>
					<view>
						<view class="upload-img-box" v-if="sendData.logistics_img" @tap="uploadPic" data-name="logistics_img">
							<image :src="sendData.logistics_img" model="scaleToFill"></image>
							<!-- <image class="clear-btn" src="../../static/images/task/clear.png"></image> -->
						</view>
						<view v-else class="up-operation-box" @tap="uploadPic" data-name="logistics_img">
							<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
						</view>
						<view style="margin-top:20upx;text-align:center;color: rgb(255, 75, 94);font-size: 30rpx;">物流截图</view>
					</view>
				</view>
			</view>
		</view>
		<view class="evalua-sumit" @tap="evalua_sumit">确认评价</view>
	</view>
</template>

<script>
	var upload = require('../../common/lib/upload.js');
	export default {
		data() {
			return {
				productInfo : [], 
				order_sn:"",
				sendData:{
					evaluate_img:"",
					logistics_img:""
				},
				exampleImg:[
				],
				platform_name:'',
				isLoading:false
			}
		},
		computed: {
			
		},
		components: {
			
		},
		methods: {
			evalua_sumit(){
				if(this.sendData.evaluate_img==""){
					uni.showToast({
						title:"请上传评价截图",
						icon:"none"
					})
					return false;
				}
				if(this.sendData.logistics_img==""){
					uni.showToast({
						title:"请上传物流截图",
						icon:"none"
					})
					return false;
				}
				this.$Request("task/evaluateSucc",{
					order_sn:this.order_sn,
					uid:this.userid,
					evaluate_img:this.sendData.evaluate_img,
					logistics_img:this.sendData.logistics_img
				}).then(res=>{
					if (res.code == 200 ) {
						uni.showToast({
							title:"提交成功",
							icon:"none"
						})
						uni.navigateBack();
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})	
					}
							
				});
			},
			clipTap(){
				uni.setClipboardData({
				    data: this.productInfo.comment,
				    success: function () {
				    	uni.showToast({
							title: "指定好评文字已复制",
							icon: "none"
						});
				    }
				});
			},
			loadData:function(){
				let _this = this;
				this.$Request("task/loadAssessInfo",{
					order_sn:this.order_sn,
					uid:this.userid
				}).then(res=>{
					if (res.code == 200 ) {
						_this.productInfo = res.data; 
						_this.exampleImg = res.data.picture;
					}
					_this.isLoading = true;
					uni.hideLoading();
				});
			},
			deleImg(index){//删除图片
				console.log(index);
				this.evalua_img.splice(index,1);
			},
			// uploadPic:function(e){//上传图片方法
			// 	var name = e.currentTarget.dataset.name;
			// 	var that = this;
			//     uni.chooseImage({
			//         sourceType: ["camera", "album"],
			//         sizeType: "compressed",
			//         count: 5 - that.evalua_img.length,
			//         success: (res) => {
			// 			uni.showLoading({
			// 				title:"文件上传中",
			// 				mask:true
			// 			})
			// 			upload({
			// 				isGroup:true,
			// 				files: res['tempFilePaths'],
			// 				success: function(upres) {
			// 					console.log(JSON.stringify(upres));
			// 					if (upres.imageURL) {
			// 						for(let i=0;i<upres['imageURL'].length;i++){
			// 							that.evalua_img.push(upres['imageURL'][i]);
			// 						}
			// 						
			// 						setTimeout(function(){
			// 							uni.hideLoading(); 
			// 						},1000)
			// 					}
			// 				},
			// 				error: function(uperr) {
			// 					uni.hideLoading(); 
			// 					uni.showToast({
			// 						title:"文件上传失败",
			// 						icon:"none"
			// 					})
			// 				}
			// 			})
			//         }
			//     })
			// },
			uploadPic:function(e){//上传图片方法
				var name = e.currentTarget.dataset.name;
				console.log(name);
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
									console.log(upres['imageURL']);
									that.sendData[name] = upres['imageURL'];
								}
							},
							error: function(uperr) {
								uni.hideLoading(); 
								uni.showToast({
									title:"文件上传失败",
									icon:"none"
								})
							}
						})
			        }
			    })
			},
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
			uni.showLoading({
				title:"加载中..."
			})
			var userid = this.$SysUser.openid();
			this.userid = userid; 
			this.order_sn = option.order_sn; 
			this.platform_name = option.platform_name;
			this.loadData();
		}
	}
</script>

<style>
	#submit_evaluation{
		font-size: 30rpx;
		color: #969799;
	}
	.evalua-sumit{
		background-color: #FF4B5E;
		color: #fff;
		width: 80%;
		margin: 0 auto;
		margin-top: 60rpx;
		text-align: center;
		position: relative;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 6rpx;
		
	}
	.step-one-title{
		color: #949392;
		padding: 24rpx;
		text-align: center;
	}
	.step-one-content{
		background-color: #ececec;
		padding: 18rpx 24rpx;
	}
	.step-one-content>view:first-child{
		padding-bottom: 12rpx;
		border-bottom: 1px solid #e4e4e4;
	}
	.step-one-content>view:last-child{
		padding: 18rpx 0;
	}
	.example-img1>view:last-child>view{
		height: 15vw;
		width: 15vw;
		margin-right: 3vw;
	}
	.example-img>view:last-child,.example-img1>view:last-child{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.example-img image,.example-img1 image{
		width: 100%;
		height: 100%;
	}
	.up-operation-box{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 20vw;
		height: 20vw;
		border: 2upx dotted #969799;
	}
	.upload-img-box{
		position: relative;
		width: 20vw;
		height: 20vw;
	}
	.clear-btn{
		width: 35rpx!important;
		height: 35rpx!important;
		position: absolute;
		top: -15rpx;
		right: -15rpx;
	}
</style>

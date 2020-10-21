<template>
	<view class="taskSubmit">
		<cu-custom @change="submitTap" bgColor="bg-black" :isBack="true"><block slot="backText">返回</block><block slot="content">提交作品</block><block slot="right" >提交</block></cu-custom>
		<view class="submit-content-container">
			<view class="task-content-container solid-bottom bg-white">
				<view class="task-item-container">
					<view class="task-item-title">任务要求</view>
					<view class="task-item-content text-sm">
						<view v-for="(item , index) in claim" :key="index">{{item}}</view>
					</view>
				</view>
				<view class="task-item-photo-container">
					<image mode="aspectFill" v-for="(item , index) in claim_images" :key="index" :src="item" @tap="ViewImage" :data-url="item"></image>
				</view>
			</view>
			<view class="solid-bottom">
				<form >
					<view class="form-item">
						<view class="release-task-label bg-white">
							作品描述
						</view>
						<view class="cu-form-group">
							<textarea maxlength="-1" style="height: 50px;"  v-model="remark" placeholder="行提供雇主要求的信息或作品的描述"></textarea>
						</view>
					</view>
				</form>
			</view>
			<view class="solid-bottom" v-if="refuse!=''">
				<form >
					<view class="form-item">
						<view class="release-task-label bg-white">
							拒绝理由
						</view>
						<view class="text-grey bg-white" style="padding: 24upx;">
							{{refuse}}
						</view>
					</view>
				</form>
			</view>
			<view class="upload-img-container bg-white">
				<view class="file-container margin-bottom">
					<view class="file-item-box margin-bottom" v-for="(item , index) in imgList1" :key="index" v-if="item!=''">
						<view class="file-image-box">
							<image mode="aspectFill" :src="item"></image>
						</view>
						<view class="text-cut" style="width: 70%;">{{item}}</view>
						<view class="text-sm text-blue"  @tap.stop="deleImgFile(index,item.type)">删除</view>
					</view>
					<view class="file-item-box margin-bottom" v-for="(item , index) in urls" :key="index" v-if="urls[0].name!=''">
						<view class="file-image-box">
							<image mode="aspectFill" :src="item.img"></image>
						</view>
						<view class="text-cut" style="width: 70%;">{{item.name}}</view>
						<view class="text-sm text-blue"  @tap.stop="deleImgFile1(index,item.type)">删除</view>
					</view>
				</view>
				<view class="upload-button-box">
					<button class="cu-btn bg-cyan margin-tb-sm round" @tap="chooseFile">添加附件/链接</button>
				</view>
				<!-- <view @tap="test">
					ceshianniu
				</view> -->
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请输入链接地址</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="">
					<view class="cu-form-group bg-gray" style="position: relative;">
						<textarea maxlength="-1" style="height: 50px;" v-model="linkUrl"  placeholder="请填写http://或https://"></textarea>
						<text class="text-blue" style="position: absolute;right: 10px;bottom: 10px;" @tap.stop="pasteTap">粘贴</text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end modal-button-container">
					<button class="cu-btn line-grey round" @tap="hideModal">取消</button>
					<button class="cu-btn bg-cyan margin-left round" @tap="hideModal('save')">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var upload = require('../../common/lib/upload1.js');
	export default{
		data(){
			return{
				imgList:[
					"../../static/bg-login.png",
					"../../static/bg-login.png",
					"../../static/bg-login.png"
				],
				imgList1:[],
				modalName: null,
				upLoadImg:[],
				linkUrl:"",
				remark:"",//作品描述
				orderid:"",
				urls:[],
				upUrls:[],//上传给后端的url
				claim:[],
				claim_images:[],
				taskDetail:{},//
				refuse:""
			}
		},
		onLoad(options) {
			console.log(options);
			this.orderid = options.orderid;
			this.claim = options.claim.split(',');
			this.claim_images = options.claim_images.split(',');
			this.getDetail();
		},
		methods:{
			submitTap(){
				let _this = this;
				this.$Request1('submit_order', {
					orderid:_this.orderid,
					remark:_this.remark,
					urls:_this.upUrls,
					images:_this.imgList1,
				}).then(request => {
					console.log(request);
					if (request['code'] == 1) {
						var data = request['data'];
						uni.showToast({
							title: '提交成功！',
							icon: 'none'
						});
						uni.navigateBack();
						
					} else if(request['code'] == -1) {
						uni.showToast({
							title: request['msg'],
							icon: 'none'
						});
						uni.reLaunch({
						    url: '../index/login'
						});
					}else{
						uni.showToast({
							title: request['msg'],
							icon: 'none'
						});
					
					}
				}).catch(err=>{
					console.log( JSON.stringify(err) );
				})
				
			},
			ViewImage(e){
				uni.previewImage({
					urls: this.claim_images,
					current: e.currentTarget.dataset.url
				});
			},
			deleImgFile(index,type){
				this.imgList1.splice(index,1);	
			},
			deleImgFile1(index,type){
				this.urls.splice(index,1);	
				this.upUrls.splice(index,1);	
			},
			pasteTap(){
				let _this = this;
				uni.getClipboardData({
				    success: function (res) {
				        if(res.data){
							_this.linkUrl = res.data;
						}
				    }
				});
			},
			chooseFile(){
				let _this = this;
				uni.showActionSheet({
				    itemList: ['从相册中上传', '拍照', '添加链接'],
				    success: function (res) {
				        if(res.tapIndex==0){
							uni.chooseImage({
								count: 9, //默认9
								sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: (res) => {
									uni.showLoading({
										title:"文件上传中",
										mask:true
									});
									upload({
										url:"multi_upload",
										files: res['tempFilePaths'],
										isGroup:true,
										success: function(upres) {
											console.log(upres["data"]);
											if (upres.data) {
												_this.imgList1 = _this.imgList1.concat(upres.data);
												setTimeout(function(){
													uni.showToast({
														title:upres.msg,
														icon:"none"
													})
													uni.hideLoading(); 
												},1000)
											}
										},
										error: function(uperr) {
											console.log(JSON.stringify(uperr));
											if(uperr){
												setTimeout(function(){
													uni.hideLoading();
													uni.showToast({
														title:uperr.msg,
														icon:"none"
													})
													if(uperr.status==-1){
														uni.reLaunch({
														    url: '../index/login'
														});
													}
												},1000)
											}
											
										}
									});
								}
							});
						}else if(res.tapIndex==1){
							uni.chooseImage({
								count: 9, //默认9
								sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['camera'], //从相册选择
								success: (res) => {
									uni.showLoading({
										title:"文件上传中",
										mask:true
									});
									upload({
										url:"multi_upload",
										files: res['tempFilePaths'],
										isGroup:true,
										success: function(upres) {
											console.log(upres["data"]);
											if (upres.data) {
												_this.imgList1 = _this.imgList1.concat(upres.data);
												setTimeout(function(){
													uni.showToast({
														title:upres.msg,
														icon:"none"
													})
													uni.hideLoading(); 
												},1000)
											}
										},
										error: function(uperr) {
											console.log(JSON.stringify(uperr));
											if(uperr){
												setTimeout(function(){
													uni.hideLoading();
													uni.showToast({
														title:uperr.msg,
														icon:"none"
													})
													if(uperr.status==-1){
														uni.reLaunch({
														    url: '../index/login'
														});
													}
												},1000)
											}
											
										}
									});
								}
							});
						}else if(res.tapIndex==2){
							_this.modalName = "DialogModal1"
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
				
			},
			hideModal(save){
				this.modalName = null;
				let _this = this;
				if(save=="save"){
					let obj = {
						name:_this.linkUrl,
						img:'../../static/link.png',
						type:'link'
					}
					this.urls.push(obj);
					this.upUrls.push(_this.linkUrl);
					console.log(this.urls);
				}
				_this.linkUrl = "";
			},
			getDetail(){
				let _this = this;
				this.$Request1('examine_order', {
					orderid:_this.orderid
				}).then(request => {
					if (request['code'] == 1) {
						var data = request['data'];
						// _this.taskDetail = data;
						if(data.images){
							_this.imgList1 = data.images;
						}
						if(data.urls[0]!=''){
							data.urls.forEach(item =>{
								let obj = {
									name:item,
									img:'../../static/link.png',
									type:'link'
								}
								_this.urls.push(obj);
								_this.upUrls.push(item);
							})
						}
						_this.remark = data.remark;
						_this.refuse = data.refuse;
						console.log(_this.refuse)
						
					} else if(request['code'] == -1) {
						uni.showToast({
							title: request['msg'],
							icon: 'none'
						});
						uni.reLaunch({
						    url: '../index/login'
						});
					}else{
						uni.showToast({
							title: request['msg'],
							icon: 'none'
						});
						
					}
					uni.hideLoading();
				}).catch(err=>{
					console.log( JSON.stringify(err) );
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style scoped>
	/*每个页面公共css */
	@import "../../colorui/main.css";
	@import "../../colorui/icon.css";
	@import "../../colorui/app.css";
	.taskSubmit{
		
	}
	.task-item-title{
		padding: 24upx;
	}
	.task-item-content{
		padding: 24upx;
		padding-top: 0px;
	}
	.task-item-photo-container{
		padding: 24upx;
	}
	.task-item-photo-container image{
		width: 100upx;
		height: 100upx;
		margin-right:24upx;
		margin-bottom: 24upx;
	}
	.file-image-box image{
		width: 80upx;
		height: 80upx;
		
	}
	.release-task-label{
		padding: 24upx;
		padding-bottom: 0;
	}
	.form-item{
		margin-bottom: 1px;
	}
	.upload-button-box button{
		width: 100%;
	}
	.upload-img-container{
		padding: 24upx;
	}
	.file-item-box{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.modal-button-container{
		padding: 24upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.modal-button-container button{
		width: 40%
	}
	</style>


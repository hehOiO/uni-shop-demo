<template>
	<view id="personalHeadSet">
		<view class="head-photo-box">
			<image v-if="headImg==''" src="../../static/images/common/defaultHead.png" mode="widthFix"></image>
			<image v-if="headImg!=''" :src="headImg" mode="aspectFill"></image>
			<view class="change-head" @tap="uploadPic" data-name="headImg">更换头像</view>
		</view>
		<view class="input-box">
			<view class="uni-form-item uni-column">
				<input type="text" v-model="nickName" placeholder="请输入昵称" @input="getInput">
			</view>
		</view>
	</view>
</template>

<script>
	var base = require('../../common/lib/base.js');
	var upload = require('../../common/lib/upload.js');
	export default {
		data() {
			return {
				headImg:"",
				nickName:"",
				userid:"",
			}
		},
		methods: {
			getInput(e){
				console.log(e.detail.value);
				this.nickName= e.detail.value;
			},
			loadDetail(){
				this.$Request("member/getUserInfo", {
					uid: this.userid,
				}).then(res => {
					if (res.code == 200) {
						this.nickName = res.data.username;
						this.headImg = res.data.head_icon;
					} else {
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				});
			},
			uploadPic:function(e){//上传图片方法
				var name = e.currentTarget.dataset.name;
				var that = this;
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 1,
			        success: (res) => {
						uni.showLoading({
							title:"文件上传中",
							mask:true
						})
						upload({
							filePath: res['tempFilePaths'][0],
							success: function(upres) {
								if (upres.imageURL) {
									that[name] = upres['imageURL'];
									setTimeout(function(){
										uni.hideLoading(); 
									},1000)
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
		},
		onLoad: function(param) {
			var userid = this.$SysUser.openid();
			this.userid = userid;
			this.loadDetail();
		},
		onShow: function() {
			
		},
		onUnload: function() {
			
		},
		onNavigationBarButtonTap: function(e) {//监听原生右侧按钮
			if(this.nickName==""){
				uni.showToast({
					title:"请输入用户名",
					icon:"none"
				})
				return false
			}
			if(this.headImg==""){
				uni.showToast({
					title:"请上传头像",
					icon:"none"
				})
				return false
			}
			this.$Request("member/setUserInfo", {
				uid: this.userid,
				head_icon:this.headImg,
				user_name:this.nickName
			}).then(res => {
				if (res.code == 200) {
					
				} else {
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}
			});
			uni.navigateBack();
		}
	}
</script>

<style lang="less">
	#personalHeadSet{
		.head-photo-box{
			background-color: #fff;
			text-align: center;
			padding: 40rpx 0;
			padding-top: 80rpx;
			image{
				width: 140rpx;
				height: 140rpx;
				border-radius: 100%;
			}
			.change-head{
				font-size: 30rpx;
				color: #4395ff;
				margin-top: 20rpx;
			}
		}
		.input-box{
			background-color: #fff;
			padding: 24rpx;
			margin-top: 30rpx;
		}
	}
</style>


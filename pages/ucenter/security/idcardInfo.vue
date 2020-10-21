<template>
	<view class="page">

		<view class="s-page-wrapper has-bg-white">
			<view class="page-security has-pdtb-20">
				<image src="../../../static/images/common/idcard-sf-icon.png" mode="widthFix" class="is-response"></image>
			</view>
		</view>


		<view class="" v-if="bindinfo.length === 0">
			<view class='feedback-title'>
				<view class="s-col is-col-24">
					<view class="s-list has-mgt-0">
						<view class="is-item-line has-borderb">
							<view class="is-item-bd  is-size-14 is-lh-18">
								<view class="has-desc-color has-mgt-5">根据国家网信办新规，平台进行实名安全工作，当您的账户出现风险时，在必要时系统会要求您进行更高级别的认证，我们承诺保障您账户的资金安全，且不会泄露您的个人隐私，请您积极配合。</view>
								<view class="has-desc-color has-mgt-10">·身份证务必拍摄清晰，如果不清晰的无法识别。</view>
								<view class="is-red has-mgt-5">·我们承诺绝对不会泄漏您的身份证信息</view>
								<view class="has-desc-color has-mgt-5" v-if="app_member_kefu_weixin != '' ">·如果您在使用中有任何问题可以联系在线客服</view>
								<view class="is-red is-lh-18 has-mgt-5 has-mgl-10" v-if="app_member_kefu_weixin != '' ">
									{{app_member_kefu_weixin}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class='feedback-title'>
				<text>身份证信息，我们承诺绝对不会泄漏您的身份证信息</text>
			</view>
			<view class="feedback-body feedback-uploader">
				<view class="uni-uploader">
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<view class="uni-uploader__file" v-if="idcardData.showpicpath">
								<image class="uni-uploader__img" :src="idcardData.showpicpath" @tap="chooseImg"></image>
							</view>
						</view>
						<view class="chooseImg has-pdtb-40" v-if="idcardData.showpicpath == '' " @tap="chooseImg">
							<image src="../../../static/images/common/idcard-icon.png" mode="widthFix" class="is-response"></image>
						</view>
					</view>
				</view>
			</view>
			<view class='feedback-title'>
				<view><text class="is-red">*</text>真实姓名</view>
			</view>
			<view class="feedback-body">
				<input class="feedback-input" v-model="idcardData.relname" placeholder="真实姓名（务必和身份证一致）" />
			</view>
			<view class='feedback-title'>
				<view><text class="is-red">*</text>身份证号码</view>
			</view>
			<view class="feedback-body">
				<input class="feedback-input" v-model="idcardData.number" placeholder="身份证号码（务必和身份证一致）" />
			</view>
			<view class="feedback-submit is-center has-pd-10 has-border-radius has-mgb-25" @tap="sendidcard">{{btnloading ? "提交中...":"提交"}}</view>

			<view class="s-row has-mgb-20"></view>
		</view>

 
		<!-- 已经绑定了数据 -->
		<view class="" v-if="bindinfo.auth_info">

			<view class="s-row">
				<view class="s-col is-col-24">
					<view class="s-list-title">我们承诺绝对不会泄漏您的身份证信息</view>
					<view class="s-list ">
						<view class="is-item is-a">
							<view class="is-item-bd">
								<view>真实姓名</view>
							</view>
							<view class="is-item-ft">{{bindinfo.auth_info.relname}}</view>
						</view>
						<view class="is-item is-a">
							<view class="is-item-bd">
								<view>身份证号码</view>
							</view>
							<view class="is-item-ft">{{bindinfo.auth_info.number}}</view>
						</view>
						<view class="is-item is-a">
							<view class="is-item-bd">
								<view>真实姓名</view>
							</view>
							<view class="is-item-ft">
								<p v-if="bindinfo.status == 0"><text class="is-blue">正在审核中</text></p>
								<p v-if="bindinfo.status == 1"><text class="is-green">审核通过</text></p>
								<p v-if="bindinfo.status == -1"><text class="is-red">被拒绝</text></p>
							</view>
						</view>
						<view class="is-item is-a" v-if="bindinfo.status == -1">
							<view class="is-item-bd">
								<view>拒绝原因</view>
							</view>
							<view class="is-item-ft">
								{{bindinfo.auth_info.cause}}
							</view>
						</view>
						
					</view>
				</view>
			</view>


		</view>
	</view>

	</view>
</template>

<script>
	var upload = require('../../../common/lib/upload.js');
	export default {
		data() {
			return {
				userid: '',
				mode: '',
				bindinfo: [],
				idcardData: {
					relname: '',
					imagepath: '',
					showpicpath: '',
					number: '',
				},
				currentWebviewId: '',
				app_member_kefu_weixin: "",
			}
		},
		onLoad: function() {
			this.mode = "idcard";
			var userid = this.$SysUser.openid();
			if (!userid) {
				uni.navigateTo({
					url: '/pages/ucenter/login'
				});
				return false;
			}
			this.app_member_kefu_weixin = this.$Sysconf("app_member_kefu_weixin");
			this.userid = userid;
			this.getData("idcard");
		},
		methods: {
			getData: function(mode) {
				this.$Request("member/" + mode + "Info", {
					uid: this.userid
				}).then(request => {
					if (request['code'] == -1) {
						uni.navigateTo({
							url: '/pages/ucenter/login'
						});
					} else if (request['code'] == 200) {
						if (mode === "idcard") {
							this.bindinfo = request['data'];
							
							// app 环境下 画右上角 解绑按钮 （需要后台开启解绑功能）
							var app_member_close_idcard = this.$Sysconf("app_member_close_idcard"); 
							if (request['data']['id']  && app_member_close_idcard == 1 ) {
								var pages = getCurrentPages();
								var page = pages[pages.length - 1];
								// #ifdef APP-PLUS
								var currentWebview = page.$getAppWebview();
								this.currentWebviewId = currentWebview.id;
								currentWebview.setStyle({
									titleNView: {
										buttons: [{
											"text": "解绑",
											"fontSize": "16px",
											"color": "#ffffff",
											"onclick": (ores => {
												this.clearIdcard();
											})
										}],
										"padding-right": "10px"
									}
								});
								// #endif
							}

						}
					}
				});
			},
			clearIdcard: function() {

				uni.showModal({
					title: "解绑说明",
					content: "解绑后会删除您的银行卡信息、身份证信息、买号信息，请慎重解绑；\n解绑后您可以重新绑定身份证等信息",
					cancelText: "取消",
					confirmText: "解绑",
					success: (e => {
						if (e.confirm) {
							uni.navigateTo({
								url: "/pages/ucenter/security/clearIdcard",
							})
						}
					})

				})

			},
			sendUpdate: function(data) {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				if (this.btnloading) {
					return false;
				}
				data['uid'] = this.userid;
				data['action'] = 'update';
				var mode = this.mode;
				uni.showLoading({
					title:"正在分析",
					mask:true,
					duration:0
				})
				this.btnloading = true;
				var that = this;
				this.$Request("member/" + mode + "Info", data).then(request => {
					uni.hideLoading()
					that.btnloading = false;
					if (request['code'] == -1) {
						uni.navigateTo({
							url: '/pages/ucenter/login'
						});
					} else {
						uni.showToast({
							title: request['msg'],
							icon: "none"
						});
						if (request['code'] == 200) {
							setTimeout(function() {
								uni.navigateBack()
							}, 2000);
							//this.getData(this.mode); 
						}
					}
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						title: "操作失败",
						icon: "none"
					});
				})
			},
			sendidcard: function() {
				var data = this.idcardData;
				if (data.imagepath == "") {
					uni.showToast({
						title: "请上传身份证图片",
						icon: "none"
					});
					return false;
				}
				if (data.relname == "") {
					uni.showToast({
						title: "请输入真实姓名",
						icon: "none"
					});
					return false;
				}
				if (data.number == "") {
					uni.showToast({
						title: "请输入身份证号码",
						icon: "none"
					});
					return false;
				}
				this.sendUpdate(data);
			},
			chooseImg: function() { //选择图片
				var that = this;
				uni.chooseImage({
					sourceType: ["camera"],
					sizeType: "compressed",
					count: 1,
					success: (res) => {
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
									title: "文件上传成功",
									icon: "none"
								});
 
								if (upres.imageURL && that.mode === "idcard") {
									that.idcardData.imagepath = upres['imageURL'];
									that.idcardData.showpicpath = upres['imageURL'];
								}
							},
							error: function(uperr) {
								uni.hideLoading(); 
								uni.showToast({
									title: "文件上传失败",
									icon: "none"
								});
							}
						})
					}
				})
			},
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";
	@import "../../../common/uni.css";

	page {
		min-height: 100%;
		background-color: @baseBackColor;
	}

	.feedback-submit {
		background: @baseBackGroundColor;
	}

	.van-cell {
		padding: 15px 15px;
	}

	.van-field__input--disabled {
		color: #333 !important;
	}

	.page-security {
		margin: 0 auto;
		text-align: center;
		width: 300upx;
	}

	.chooseImg {
		margin: 0 auto;
		text-align: center;
		width: 300upx;
	}
	.input-placeholder{
		color:#C9C9C9; 
		font-size: 22upx;
	}
</style>

<template>
	<view class="page">
		<!-- 注意事项 -->
		<view class="has-bg-white">
			<view class='feedback-title' style="background-color: #D7D7D6;margin-top: 20rpx;">
				<text class="iconfont icon-xiaoxi" style="font-size: 28rpx;color: #232424;"> 注意事项</text>
			</view>
			<view class="has-pd-10" style="color: #747474;font-size: 28rpx;line-height: 1.8;background-color: #E2E1E0;">
				帐号审核时间<text class="is-red">周一至周五9:00 - 17:00</text>，帐号提交后客服会在{{app_bind_check_day}}个工作日内完成审核，如遇到周末或节假日顺延，审核工作人工进行，用户请耐心等待，新手务必查看下方<text
				 class="is-red">绑定要求</text>！
			</view>
			<navigator url="/pages/detail/content?id=91" style="background-color: #8FC4D9;font-size: 30rpx;letter-spacing: 4rpx;" class="has-button-small">点击查看绑定要求</navigator>
		</view>
		<!-- 账号信息 -->
		<view class='feedback-title'>
			<text style="font-size: 28rpx;color: #232424;">帐号信息</text>
		</view>
		<!-- 买号名称 -->
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="text" placeholder-style="color:#c9c9c9" v-model="sendData.real_name" placeholder="请输入抖音号" />
		</view>
		<!-- 收货人 -->
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="text" placeholder-style="color:#c9c9c9" v-model="sendData.name" placeholder="请输入抖音昵称" />
		</view>
		<!-- 收货电话 -->
		<view class="feedback-body has-borderb">
			<input class="feedback-input" maxlength="11" v-model="sendData.tel" placeholder-style="color:#c9c9c9" type="number" placeholder="请输入手机号码" />
		</view>
		<!-- 所在地区 -->
		<view class="feedback-body has-borderb" @tap="showMulLinkageThreePicker">
			<view class="feedback-input is-greys" v-if="sendData.province ==''">请选择所在地区</view>
			<view class="feedback-input" v-if="sendData.province !=''">{{sendData.province}}</view>
		</view>
		<!-- 地址选择组件 -->
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		<!-- 买号属性 -->
		<view class='feedback-title'>
			<text style="font-size: 28rpx;color: #232424;">买号属性</text>
		</view>
		<!-- 年龄 -->
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="number" placeholder-style="color:#c9c9c9" v-model="sendData.age" placeholder="年龄" />
		</view>
		<!-- 年龄选择 -->
		<view class="feedback-body has-borderb">
			<picker @change="bindPickerChange" :value="sendData.sex" :range="sexRange">
				<view class="feedback-input feedback-input-view is-greys" v-if="sendData.sex ==''">点击选择性别</view>
				<view class="feedback-input feedback-input-view" v-if="sendData.sex !=''">{{sexRange[sendData.sex]}}</view>
			</picker>
		</view>
		<view class="upload-img-container">
			<view class="upload-img-item-box">
				<view class="upload-img-before-box" @tap="uploadPic" v-if="sendData.credit_pic==''">
					<image src="../../../static/images/common/uploadImgPng.png" mode="widthFix"></image>
					<text>点击上传图片</text>
				</view>
				<view class="upload-img-before-box" @tap="showImages(sendData.credit_pic)" v-if="sendData.credit_pic!=''">
					<image style="width: 100%;height: 100%;vertical-align:bottom;" :src="sendData.credit_pic" mode="scaleToFill"></image>
					<image @tap="deleImg('credit_pic')" src="../../../static/images/task/clear.png" mode="widthFix" style="width: 40rpx;position:absolute;right: -25rpx;top: -25rpx;"></image>
				</view>
				<view class="upload-text-bottom">
					个人中心
				</view>
			</view>
			<view class="upload-img-item-box">
				<view class="upload-img-before-box" @tap="uploadPic1" v-if="sendData.real_pic==''">
					<image src="../../../static/images/common/uploadImgPng.png" mode="widthFix"></image>
					<text>点击上传图片</text>
				</view>
				<view class="upload-img-before-box" @tap="showImages(sendData.real_pic)" v-if="sendData.real_pic!=''">
					<image style="width: 100%;height: 100%;vertical-align:bottom;" :src="sendData.real_pic" mode="scaleToFill"></image>
					<image @tap="deleImg('real_pic')" src="../../../static/images/task/clear.png" mode="widthFix" style="width: 40rpx;position:absolute;right: -25rpx;top: -25rpx;"></image>
				</view>
				<view class="upload-text-bottom">
					账户信息
				</view>
			</view>
		</view>
		<view class="has-mgb-40 has-pbd-40">
			<view class="feedback-submit is-center has-pd-10 has-border-radius" @tap="submitSend">{{btnloading ? "提交中...":"提交"}}</view>
		</view>
		<view class="s-row has-mgb-20"></view>
	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../../common/lib/city.data.js';
	var upload = require('../../../common/lib/upload.js');
	var base = require('../../../common/lib/base.js');
	export default {
		data() {
			return {
				userid: '',//userid
				itemid: '',//买号id 用于获取详情（审号不通过时修改）
				mode: '',//平台， 淘宝天猫、京东、拼多多
				cityPickerValueDefault: [0, 0, 1],//收货地址默认选中项
				themeColor: '#007AFF',
				sexRange: ['男', '女'],//选择性别数据
				sendData: {//提交的数据
					type: '',//平台类型
					real_name: '',//抖音号
					name: '',//抖音昵称
					tel: '',//手机号码
					province: '',//所在地区
					sex: '',//性别
					age: '',//年龄
					credit_pic: '',//个人中心
					real_pic: '',//账号安全截图
				},
				btnloading: false,
				app_bind_check_day: '1',//审核时长
			}
		},
		components: {
			mpvueCityPicker,
			mpvuePicker,
		},
		methods: {
			deleImg(name){
				this.sendData[name] = "";
			},
			getData: function() {// 读取修改数据 
				var itemid = this.itemid;
				if (itemid) {
					// 读取修改数据 
					this.$Request("member/getBuyerInfo", {
						id: itemid,
						uid: this.userid
					}).then(res => {
						if (res.code == 200) {
							this.sendData = {
								type: res['data']['type'],
								real_name: res['data']['real_name'],
								name: res['data']['name'],
								tel: res['data']['tel'],
								province: res['data']['province'],
								sex: res['data']['sex'],
								age: res['data']['age'],
								credit_pic: res['data']['credit_pic'],
								real_pic: res['data']['real_pic'],
							}
						} else {
							uni.navigateBack({});
						}
					});
				}
			},
			submitSend: function() {//提交表单
				var data = this.sendData;
				console.log(data.name)
				if (data.real_name == "") {
					uni.showToast({
						title: "抖音号不能为空",
						icon: "none"
					});
					return false;
				}
				if (data.name == "") {
					uni.showToast({
						title: "请输入抖音昵称",
						icon: "none"
					});
					return false;
				}
				if (data.tel == "") {
					uni.showToast({
						title: "手机号码不能为空",
						icon: "none"
					});
					return false;
				}
				if (data.province == "") {
					uni.showToast({
						title: "请选择所在地区",
						icon: "none"
					});
					return false;
				}
				if (data.sex == "") {
					uni.showToast({
						title: "请选择性别",
						icon: "none"
					});
					return false;
				}
				if (data.age == "" || data.age < 1) {
					uni.showToast({
						title: "年龄输入不正确",
						icon: "none"
					});
					return false;
				}
				if (data.credit_pic == "") {
					uni.showToast({
						title: "请上传抖音个人中心截图",
						icon: "none"
					});
					return false;
				}
				if (data.real_pic == "") {
					uni.showToast({
						title: "请上传账号信息截图",
						icon: "none"
					});
					return false;
				}
				if (this.btnloading) {
					return false;
				}
				if (this.itemid != "") {
					data['itemid'] = this.itemid;
				}else{
					data['itemid'] = '';
				}
				data['uid'] = this.userid;
				if(data['sex']==0){
					data['sex']=1;
				}else{
					data['sex']=2;
				}
				var app_day = this.app_bind_check_day;
				uni.showModal({
					title: "温馨提示",
					content: "您确定输入信息无误且提交审核？提交前请务必核对好信息，确保信息输入正确，客服会在" + app_day + "个工作日完成审核",
					confirmText: "确认无误",
					cancelText: "我再看看",
					success: (midalE => {
						if (midalE.confirm) {
							uni.showLoading({
								title: '绑定中...',
								mask: true
							});
							this.btnloading = true;
							this.$Request("member/bindBuynumber", data).then(res => {
								uni.hideLoading();
								uni.showToast({
									title: res['msg'],
									icon: "none"
								});
								this.btnloading = false;
								if (res['code'] == 200) {
									setTimeout(function() {
										uni.navigateBack({});
									}, 1500);
								}
							}).catch(err => {
								uni.hideLoading();
								uni.showToast({
									title: "提交失败，请重试",
									icon: "none"
								});
							});
						} else {
							// 取消 
						}
					})
				})

			},
			showImages:function(pic , model) {//预览图片
				var src = pic
				var urls = [];
				urls[0] = src; 
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage(urls);
				//#endif
			},
			uploadPic: function() {
				this.uploadPicture("credit_pic");
			},
			uploadPic1: function() {
				this.uploadPicture("real_pic");
			},
			uploadPicture: function(name) {//上传图片
				var that = this;
				uni.chooseImage({
					sourceType: ["album"],
					sizeType: "compressed",
					count: 1,
					success: (res) => {
						uni.showLoading({
							title: '上传中...',
							mask: true
						});
						upload({
							filePath: res['tempFilePaths'][0],
							success: function(upres) {
								uni.hideLoading()
								uni.showToast({
									title: "文件上传成功",
									icon: "none"
								})
								if (upres.imageURL) {
									that.sendData[name] = upres['imageURL'];
								}
							},
							error: function(uperr) {
								uni.hideLoading()
								uni.showToast({
									title: "文件上传失败",
									icon: "none"
								})
							}
						})
					}
				})
			},
			previewImage: function(e) {//预览图片
				var name = e.currentTarget.dataset.name;
				var src = this.sendData[name]
				if (src) {
					uni.previewImage({
						current: src,
						urls: [src],
					})
				}

			},
			bindPickerChange: function(e) {//选择性别
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				this.sendData.sex = e.detail.value;
			},
			showMulLinkageThreePicker: function() {//选择收货地址
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm: function(e) {
				this.sendData.province = e.label;
			},
		},
		onLoad: function(e) {
			this.mode = e.mode;
			this.itemid = e.itemid || "";
			this.sendData.type = this.mode;
			this.app_bind_check_day = this.$Sysconf("app_bind_check_day");
			var userid = base.user.openid();
			if (!userid) {
				uni.navigateTo({
					url: '/pages/ucenter/login'
				});
				return false;
			}
			this.userid = userid;
			this.getData(this.mode);
		},
		onShow: function() {
			var title = "绑定抖音号";
			uni.setNavigationBarTitle({
				title: title
			});
		},
		onUnload: function() {
			try{
				this.$refs.mpvueCityPicker.pickerCancel()
			}catch(e){
				
			}
		},
		onBackPress: function() {

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
	.upload-text-bottom{
		color: #5E5D5D;
		font-size:24rpx;
		margin-top: 10rpx;
	}
	.upload-img-container{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding:30rpx;
	}
	.upload-img-item-box{
		width: 20vw;
		text-align: center;
		margin-right: 30rpx;
	}
	.upload-img-before-box{
		border: 2rpx solid #0098E1;
		background-color: #EEEFF0;
		width: 20vw;
		height: 20vw;
		line-height: 20vw;
		position: relative;
	}
	.upload-img-before-box text{
		font-size: 22rpx;
		color: #0098E1;
		position: absolute;
		width: 100%;
		left: 0;
	}
	.upload-img-item-box image{
		vertical-align: middle;
	}
	.upload-img-before-box image{
		width: 15vw;
		vertical-align: middle;
	}
	.feedback-body{
		background: #F5F6F6!important;
	}
	.feedback-submit{
		background: #FA707E!important;
		color: #fff!important;
		margin: 0!important;
		margin-top: 30rpx!important;
	}
	input::-webkit-input-placeholder{
		font-size: 28rpx;
		color: #C9C9C9!important;
	}    /* 使用webkit内核的浏览器 */
	input:-moz-placeholder{
		font-size: 28rpx;
		color: #C9C9C9!important;
	}                  /* Firefox版本4-18 */
	input::-moz-placeholder{
		font-size: 28rpx;
		color: #C9C9C9!important;
	}                  /* Firefox版本19+ */
	input:-ms-input-placeholder{
		font-size: 28rpx;
		color: #C9C9C9!important;
	}           /* IE浏览器 */
	.feedback-input {
		font-size: 30rpx;
		height: 80rpx;
		line-height: 60rpx;
		padding-left: 40rpx;
	}

	.feedback-input-view {
		line-height: 80rpx;
	}

	.feedback-input:before {
		position: absolute;
		left: 10upx;
		content: "*";
		color: red;
		margin-top: 10upx;
	}

	.input-placeholder,
	.is-greys {
		color: #C9C9C9;
	}

	.btnbox {
		background: #fff;
	}

	.feedback-submit {
		background: @baseBackGroundColor;
	}

	.btnbox button {
		width: 100%;
		background: @baseBackGroundColor;
		border: none;
		color: #fff;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 26rpx;
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

	.has-button-small {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		color: #FFFFFF;
		text-align: center;
		margin: 0 auto;
		background: #e6a23c;
	}

	.example {
		max-width:35%;
		text-align: center;
		display: block;
	}

	.chooseImg {

		margin: 20rpx auto;
		text-align: center;
		width: 154rpx;
	}

	.example .uimages {
		width: 154rpx;
		height: 154rpx;
		text-align: center;
		margin: 0 auto;
	}

	.uni-uploader__input-box,
	.uni-uploader__files {
		min-width:65%;
	}
</style>


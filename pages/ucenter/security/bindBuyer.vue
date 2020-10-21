<template>
	<view class="page">
		<view class="has-bg-white">
			<view class='feedback-title' style="background-color: #D7D7D6;margin-top: 20rpx;">
				<text class="iconfont icon-xiaoxi" style="font-size: 28rpx;color: #232424;"> 注意事项</text>
			</view>
			<view class="has-pd-10" style="color: #747474;font-size: 28rpx;line-height: 1.8;background-color: #E2E1E0;">
				帐号审核时间<text class="is-red">周一至周五9:00 - 17:00</text>，帐号提交后客服会在{{app_bind_check_day}}个工作日内完成审核，如遇到周末或节假日顺延，审核工作人工进行，用户请耐心等待，新手务必查看下方<text
				 class="is-red">绑定要求</text>！
			</view>
			<navigator url="/pages/detail/content?id=8" style="background-color: #8FC4D9;font-size: 30rpx;letter-spacing: 4rpx;" class="has-button-small">点击查看绑定要求</navigator>
		</view>

		<view class='feedback-title'>
			<text sstyle="font-size: 28rpx;color: #232424;">帐号信息</text>
		</view>
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="text" placeholder-style="color:#c9c9c9" v-model="sendData.name" placeholder="请输入买家帐号" />
		</view>
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="text" placeholder-style="color:#c9c9c9" v-model="sendData.real_name" placeholder="收货人" />
		</view>
		<view class="feedback-body has-borderb">
			<input class="feedback-input" maxlength="11" v-model="sendData.tel" placeholder-style="color:#c9c9c9" type="number" placeholder="收货电话" />
		</view>
		<view class="feedback-body has-borderb" @tap="showMulLinkageThreePicker">
			<view class="feedback-input is-greys" v-if="sendData.province ==''">收货地址</view>
			<view class="feedback-input" v-if="sendData.province !=''">{{sendData.province}}</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="text" placeholder-style="color:#c9c9c9" v-model="sendData.addres" placeholder="详细地址" />
		</view>
		<view class='feedback-title'>
			<text style="font-size: 28rpx;color: #232424;">买号属性</text>
		</view>
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="number" placeholder-style="color:#c9c9c9" v-model="sendData.age" placeholder="年龄" />
		</view>
		<view class="feedback-body has-borderb">
			<picker @change="bindPickerChange" :value="sendData.sex" :range="sexRange">
				<view class="feedback-input feedback-input-view is-greys" v-if="sendData.sex ==''">点击选择性别</view>
				<view class="feedback-input feedback-input-view" v-if="sendData.sex !=''">{{sexRange[sendData.sex]}}</view>
			</picker>
		</view>
		<view class="feedback-body has-borderb">
			<picker @change="bindlevePickerChange" :value="sendData.blevel" :range="blevelRange">
				<view class="feedback-input feedback-input-view is-greys" v-if="sendData.blevel ==''">点击选择信誉等级</view>
				<view class="feedback-input feedback-input-view" v-if="sendData.blevel !=''">{{blevelRange[sendData.blevel]}}</view>
			</picker>
		</view>
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="number" placeholder-style="color:#c9c9c9"  v-model="sendData.taoqi" placeholder="请输入淘气值" />
		</view>
		<view class="feedback-body has-borderb">
			<input class="feedback-input" type="number" placeholder-style="color:#c9c9c9"  v-model="sendData.credit_score" placeholder="请输入芝麻信用分" />
		</view>
		<view class='feedback-title'>
			<text style="font-size: 28rpx;color: #232424;">购物类目（选择后不可以修改）</text>
		</view>
		<navigator url="/pages/ucenter/security/category" class="feedback-body has-borderb" hover-class="navigator-hover">
			<view class="feedback-input feedback-input-view is-greys" v-if="sendData.categoryName ==''">点击选择购物类目</view>
			<view class="feedback-input feedback-input-view" v-if="sendData.categoryName !=''">{{sendData.categoryName}}</view>
		</navigator>
		<view class="upload-img-container">
			<view class="upload-img-item-box">
				<view class="upload-img-before-box" @tap="uploadPic" v-if="sendData.credit_pic==''">
					<image src="../../../static/images/common/uploadImgPng.png" mode="widthFix"></image>
					<text>点击上传图片</text>
				</view>
				<view class="upload-img-before-box" @tap="showImages(sendData.credit_pic)" v-if="sendData.credit_pic!=''">
					<image style="width: 100%;height: 100%;vertical-align:bottom;" :src="sendData.credit_pic" mode="scaleToFill"></image>
					<image @tap.stop="deleImg('credit_pic')" src="../../../static/images/task/clear.png" mode="widthFix" style="width: 40rpx;position:absolute;right: -25rpx;top: -25rpx;"></image>
				</view>
				<view class="upload-text-bottom">
					信誉等级
				</view>
			</view>
			<view class="upload-img-item-box">
				<view class="upload-img-before-box" @tap="uploadPic1" v-if="sendData.huabei_pic==''">
					<image src="../../../static/images/common/uploadImgPng.png" mode="widthFix"></image>
					<text>点击上传图片</text>
				</view>
				<view class="upload-img-before-box" @tap="showImages(sendData.huabei_pic)" v-if="sendData.huabei_pic!=''">
					<image style="width: 100%;height: 100%;vertical-align:bottom;" :src="sendData.huabei_pic" mode="scaleToFill"></image>
					<image @tap.stop="deleImg('huabei_pic')" src="../../../static/images/task/clear.png" mode="widthFix" style="width: 40rpx;position:absolute;right: -25rpx;top: -25rpx;"></image>
				</view>
				<view class="upload-text-bottom">
					花呗截图
				</view>
			</view>
			<view class="upload-img-item-box">
				<view class="upload-img-before-box" @tap="uploadPic2" v-if="sendData.taoqi_pic==''">
					<image src="../../../static/images/common/uploadImgPng.png" mode="widthFix"></image>
					<text>点击上传图片</text>
				</view>
				<view class="upload-img-before-box" @tap="showImages(sendData.taoqi_pic)" v-if="sendData.taoqi_pic!=''">
					<image style="width: 100%;height: 100%;vertical-align:bottom;" :src="sendData.taoqi_pic" mode="scaleToFill"></image>
					<image @tap.stop="deleImg('taoqi_pic')" src="../../../static/images/task/clear.png" mode="widthFix" style="width: 40rpx;position:absolute;right: -25rpx;top: -25rpx;"></image>
				</view>
				<view class="upload-text-bottom">
					淘气值截图
				</view>
			</view>
			<view class="upload-img-item-box">
				<view class="upload-img-before-box" @tap="uploadPic3" v-if="sendData.credit_score_pic==''">
					<image src="../../../static/images/common/uploadImgPng.png" mode="widthFix"></image>
					<text>点击上传图片</text>
				</view>
				<view class="upload-img-before-box" @tap="showImages(sendData.credit_score_pic)" v-if="sendData.credit_score_pic!=''">
					<image style="width: 100%;height: 100%;vertical-align:bottom;" :src="sendData.credit_score_pic" mode="scaleToFill"></image>
					<image @tap.stop="deleImg('credit_score_pic')" src="../../../static/images/task/clear.png" mode="widthFix" style="width: 40rpx;position:absolute;right: -25rpx;top: -25rpx;"></image>
				</view>
				<view class="upload-text-bottom">
					芝麻信用
				</view>
			</view>
			<view class="upload-img-item-box" style="margin-top: 20rpx;">
				<view class="upload-img-before-box" @tap="uploadPic4" v-if="sendData.real_pic==''">
					<image src="../../../static/images/common/uploadImgPng.png" mode="widthFix"></image>
					<text>点击上传图片</text>
				</view>
				<view class="upload-img-before-box" @tap="showImages(sendData.real_pic)" v-if="sendData.real_pic!=''">
					<image style="width: 100%;height: 100%;vertical-align:bottom;" :src="sendData.real_pic" mode="scaleToFill"></image>
					<image @tap.stop="deleImg('real_pic')" src="../../../static/images/task/clear.png" mode="widthFix" style="width: 40rpx;position:absolute;right: -25rpx;top: -25rpx;"></image>
				</view>
				<view class="upload-text-bottom">
					实名认证
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
				userid: '',
				itemid: '',
				mode: '',
				pickerValueArray: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				sexRange: ['男', '女'],
				blevelRange: ['2心', '3心', '4心', '5心', '1钻', '2钻', '3钻及以上'],
				categoryList: [],
				sendData: {
					type: '',
					real_name: '',
					name: '',
					tel: '',
					province: '',
					addres: '',
					sex: '',
					blevel: '',
					taoqi:"",//淘气值
					credit_score:'',//芝麻信用分
					age: '',
					categoryName: '',
					categoryId: '',
					credit_pic: '',//信用等级
					real_pic: '',//实名认证
					huabei_pic: '',//花呗截图
					taoqi_pic:'',//淘气值图片
					credit_score_pic:'',//芝麻信用截图
				},
				btnloading: false,
				creditPicture: "http:\/\/img.cdn.yunkeclub.com\/product\/52cbd6930277afa48572a9e2f08b852ca8dbc7f4\/29f67e587344102f40696b88305ae239c06b769a.jpg",
				realPicture: "http:\/\/img.cdn.yunkeclub.com\/product\/16507abd18237fc13efd397d12e16e529dbc944e\/06febf19e8d0299fadbb183d12177765117dc96f.jpg",
				huabeiPicture: "http:\/\/img.cdn.yunkeclub.com\/product\/bc643cfbd97f22f6e47466aae063829840917b1c\/18f7732e66eb67701c832d4c6bdfc6ed68b45e0f.jpg",
				app_bind_check_day: '1',
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
			copyOrderNum(){
				uni.navigateTo({
					url:"/pages/ucenter/security/copyOrderNum"
				})
			},
			// searchPhoneAddress(e){//查询号码归属地
			// 	// console.log(JSON.stringify(e.detail));
			// 	
			// },
			getData: function() {
				// 读取修改数据 
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
								addres: res['data']['addres'],
								sex: res['data']['sex'],
								blevel: res['data']['blevel'],
								taoqi:res['data']['taoqi'],
								credit_score:res['data']['credit_score'],
								age: res['data']['age'],
								categoryName: res['data']['categoryName'],
								categoryId: res['data']['categoryId'],
								credit_pic: res['data']['credit_pic'],
								real_pic: res['data']['real_pic'],
								taoqi_pic:res['data']['taoqi_pic'],
								huabei_pic: res['data']['huabei_pic'],
								credit_score_pic:res['data']['credit_score_pic']
								// order_number:res['data']['order_number']
							}
						} else {
							uni.navigateBack({});
						}
					});
				}
			},
			submitSend: function() {
				var data = this.sendData;
				if (data.real_name == "") {
					uni.showToast({
						title: "收货人不能为空",
						icon: "none"
					});
					return false;
				}
				if (data.name == "") {
					uni.showToast({
						title: "请输入买号名称",
						icon: "none"
					});
					return false;
				}
				if (data.tel == "") {
					uni.showToast({
						title: "收货人电话不能为空",
						icon: "none"
					});
					return false;
				}
				if (data.province == "") {
					uni.showToast({
						title: "收货地址不能为空",
						icon: "none"
					});
					return false;
				}
				if (data.addres == "") {
					uni.showToast({
						title: "收货详细地址不能为空",
						icon: "none"
					});
					return false;
				}
				if (data.sex == "") {
					uni.showToast({
						title: "请选择买号性别",
						icon: "none"
					});
					return false;
				}
				if (data.taoqi == "") {
					uni.showToast({
						title: "请输入淘气值",
						icon: "none"
					});
					return false;
				}
				if (data.credit_score == "") {
					uni.showToast({
						title: "请输入芝麻信用分",
						icon: "none"
					});
					return false;
				}
				if (data.blevel == "") {
					uni.showToast({
						title: "请选择买号等级",
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

				if (data.categoryId == "") {
					uni.showToast({
						title: "请选择买号分类",
						icon: "none"
					});
					return false;
				}
				if (data.credit_pic == "") {
					uni.showToast({
						title: "请上传信誉截图",
						icon: "none"
					});
					return false;
				}
				if (data.real_pic == "") {
					uni.showToast({
						title: "请上传实名认证图",
						icon: "none"
					});
					return false;
				}
				if (data.huabei_pic == "") {
					uni.showToast({
						title: "请上传花呗截图",
						icon: "none"
					});
					return false;
				}
				if (data.credit_score_pic == "") {
					uni.showToast({
						title: "请上传芝麻信用截图",
						icon: "none"
					});
					return false;
				}
				if (data.taoqi_pic == "") {
					uni.showToast({
						title: "请上传淘气值截图",
						icon: "none"
					});
					return false;
				}

				if (this.btnloading) {
					return false;
				}
				if (this.itemid != "") {
					data['itemid'] = this.itemid;
				}
				data['uid'] = this.userid;
				if(data['sex']==0){
					data['sex']=1;
				}else{
					data['sex']=2;
				}
				data['blevel'] = parseInt(data['blevel']);
				data['taoqi'] = parseInt(data['taoqi']);
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

									base.fetchTool.cache.remove("buyer_product_cate");
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
			showImages:function(pic , model) {
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
				this.uploadPicture("huabei_pic");
			},
			uploadPic2: function() {
				this.uploadPicture("taoqi_pic");
			},
			uploadPic3: function() {
				this.uploadPicture("credit_score_pic");
			},
			uploadPic4: function() {
				this.uploadPicture("real_pic");
			},
			uploadPicture: function(name) {
				var that = this;
				uni.chooseImage({
					sourceType: ["album"],
					sizeType: ['compressed'],
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
			previewImage: function(e) {
				var name = e.currentTarget.dataset.name;
				var src = this.sendData[name]
				if (src) {
					uni.previewImage({
						current: src,
						urls: [src],
					})
				}

			},
			bindPickerChange: function(e) {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				console.log(e.detail.value);
				this.sendData.sex = e.detail.value;
				console.log(this.sexRange[this.sendData.sex])
			},
			bindlevePickerChange: function(e) {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				console.log(e.detail.value)
				this.sendData.blevel = e.detail.value;
			},
			buyer_product_cate: function() {
				var buyer_product_cate = base.fetchTool.cache.get("buyer_product_cate");
				if (buyer_product_cate) {
					this.sendData.categoryName = "";
					this.sendData.categoryId = "";
					for (var i = 0; i < buyer_product_cate.length; i++) {
						this.sendData.categoryName = this.sendData.categoryName + buyer_product_cate[i]['title'] + "/";
						this.sendData.categoryId = this.sendData.categoryId + buyer_product_cate[i]['id'] + ",";
					}
				}
			},
			showMulLinkageThreePicker: function() {
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
			// var copyOrderNum = this.$Cache.get('copyOrderNum');
			// console.log(copyOrderNum);
			// if(copyOrderNum&&copyOrderNum.length==18){
			// 	this.sendData.order_number = copyOrderNum.substring(copyOrderNum.length-4);
			// 	console.log(this.sendData.order_number);
			// }else if(copyOrderNum){
			// 	uni.showToast({
			// 		title:"请复制正确的淘宝订单编号~",
			// 		icon:"none"
			// 	})
			// }
			var title = "绑定淘宝买号";
			if (this.mode === "jd") {
				title = "绑定京东买号";
			} else if (this.mode === "pinduoduo") {
				title = "绑定拼多多买号";
			}
			this.buyer_product_cate()
			uni.setNavigationBarTitle({
				title: title
			});
		},
		onUnload: function() {
			try{
				this.$refs.mpvueCityPicker.pickerCancel()
			}catch(e){
				
			}
			this.$Cache.remove('copyOrderNum');
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
		justify-content: space-between;
		flex-wrap: wrap;
		padding:30rpx;
	}
	.upload-img-item-box{
		width: 20vw;
		text-align: center;
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

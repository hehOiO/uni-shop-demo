<template>
	<view class="page">

		<view class="" v-if="mode == 'banks'">
			<view class="font-size:30rpx">
				<!-- <view class='feedback-title'>
					<text>银行卡信息，点击下方图片上传银行卡照片可以自动识别哦~</text>
				</view> -->
				<view class='feedback-title'>
					<view><text class="is-red">*</text>银行卡卡号</view>
				</view>
				<view class="feedback-body">
					<input class="feedback-input" type="number" v-model="banksData.bank_account"  placeholder="请输入银行卡卡号" />
				</view>

				<view class='feedback-title'>
					<view><text class="is-red">*</text>开户人姓名</view>
				</view>
				<view class="feedback-body">
					<input class="feedback-input" type="text" v-model="banksData.real_name" placeholder="银行卡开户人 请和实名认证姓名一致" />
				</view>

				<view class='feedback-title'>
					<view><text class="is-red">*</text>所属开户行</view>
				</view>
				<view class="feedback-body" @tap="showMulLinkageKaiHuPicker">
					<input class="feedback-input" disabled="disabled" type="text" v-model="banksData.bank_name" placeholder="所属开户行，不清楚打电话咨询银行" />
				</view>

				<view class='feedback-title'>
					<view><text class="is-red">*</text>开户行支行</view>
				</view>
				<view class="feedback-body">
					<input class="feedback-input" type="text" v-model="banksData.sub_branchTip" placeholder="开户行支行，不清楚打电话咨询银行" />
				</view>
				<view class='feedback-title'>
					<view><text class="is-red">*</text>开户行所在地</view>
				</view>
				<view class="feedback-body" @tap="showMulLinkageThreePicker">
					<view class="feedback-input" style="color: #999;font-size: 26rpx;" v-if="banksData.addresinfo ==''" >开户行所在地，不清楚打电话咨询银行</view>
					<view class="feedback-input" v-if="banksData.addresinfo !=''">{{banksData.addresinfo}}</view>
				</view>
				
				<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
				 @onConfirm="onConfirm"></mpvue-city-picker>

				<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="selector" :deepLength="1" pickerValueDefault="0"
				 @onConfirm="onYinConfirm" :pickerValueArray="kaihuhang"></mpvue-picker>

				<view class="feedback-submit is-center has-pd-10 has-border-radius" @tap="sendbanks">{{btnloading ? "保存中...":"保存"}}</view>

				<view class='feedback-title'>
					<text>请务必确保银行卡信息正确。</text>
				</view>

			</view>

			 

		</view>

		<view class="" v-if="mode == 'qq'">
			<view class="">
				<view class='feedback-title'>
					<text>微信号</text>
				</view>
				<view class="feedback-body">
					<input class="feedback-input" v-model="qqData.number" placeholder="微信号" />
				</view>
				<view class="feedback-submit is-center has-pd-10 has-border-radius" @tap="sendQQinfo">{{btnloading ? "提交中...":"提交"}}</view>
				<view class='feedback-title'>
					<text>请务必输入正确的微信号，输入错误的微信号会导致无法接单。</text>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../../common/lib/city.data.js';
	var upload = require('../../../common/lib/upload.js');
	var banks = require("../../../common/lib/banks.js");
	export default {
		data() {
			return {
				userid: '',
				mode: '',
				bindinfo: [],
				pickerValueDefault: [0, 0],
				pickerValueArray: cityData,
				cityPickerValueDefault: [0, 0, 1],
				kaihuhang: [{
						label: '中国工商银行'
					},
					{
						label: '中国农业银行'
					},
					{
						label: '中国建设银行'
					},
					{
						label: '中国银行'
					},
					{
						label: '交通银行'
					},
					{
						label: '招商银行'
					},
					{
						label: '平安银行'
					},
					{
						label: '中信银行'
					},
					{
						label: '兴业银行'
					},
					{
						label: '民生银行'
					},
					{
						label: '光大银行'
					},
					{
						label: '中国邮政储蓄银行'
					},
					{
						label: '上海浦东发展银行'
					},
					{
						label: '广发银行'
					},
					{
						label: '浙商银行'
					},
					{
						label: '杭州银行'
					},
					{
						label: '北京银行'
					},
					{
						label: '南京银行'
					},
					{
						label: '上海银行'
					}
				],
				themeColor: '#007AFF',
				pickerText: '',
				banksData: {
					addresinfo: '',
					bank_name: '',
					bank_account: '',
					sub_branchTip: '',
					province: '',
					city: '',
					real_name: '',
					id: '',
					showpicpath: ''
				},
				qqData: {
					number: ''
				},
				btnloading: false,
			}
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		methods: {
			inputBankNum(e){
				let _this = this;
				console.log(e.detail.value);
				banks.getBankBin(e.detail.value,function(err,data){
					console.log(data);
					if(data){
						_this.banksData.bank_name = data.bankName
					}
				})
			},
			banksDatareal_name: function(e) {
				var detail = e.detail;
				this.banksData.real_name = detail;
			},
			banksDatbank_account: function(e) {
				var detail = e.detail;
				this.banksData.bank_account = detail;
			},
			banksDatsub_branchTip: function(e) {
				var detail = e.detail;
				this.banksData.sub_branchTip = detail;
			},

			sendbanks: function() {
				var banksData = this.banksData;
				if (banksData['bank_name'] == "") {
					uni.showToast({
						title: "未选择开户行类型",
						icon: "none"
					});
					return false;
				}
				if (banksData['real_name'] == "") {
					uni.showToast({
						title: "银行卡开户人姓名不能为空",
						icon: "none"
					});
					return false;
				}
				if (banksData['bank_account'] == "") {
					uni.showToast({
						title: "银行卡卡号不能为空",
						icon: "none"
					});
					return false;
				}
				if (banksData['sub_branchTip'] == "") {
					uni.showToast({
						title: "开户行支行名称不能为空",
						icon: "none"
					});
					return false;
				}
				if(banksData['city']==""){
					uni.showToast({
						title: "开户行所在地不能为空",
						icon: "none"
					});
					return false;
				}
				uni.showModal({
					title: "温馨提示",
					content: "请务必仔细核对银行卡帐号以及银行卡开户人信息，若输入错误会导致提现时转账失败哦~",
					cancelText: "再看看",
					confirmText: "很确定",
					success: (e => {
						if (e.confirm) {
							this.sendUpdate(banksData);
						}
					})

				})

			},
			onClickIcon: function() {
				var that = this;
				// 拍照或选择相册中的银行卡信息读取
				uni.chooseImage({
					count: 1,
					sizeType: 'compressed',
					success: function(res) {
						var file_path = res.tempFilePaths[0];
						uni.showLoading({
							title: "文件上传中",
							mask: true,
							duration: 0
						})

						upload({
							filePath: file_path,
							success: function(upres) {
								uni.hideLoading();
								uni.showLoading({
									title: "正在分析",
									mask: true,
									duration: 0
								})

								// 分析上传的文件
								that.$Request("upload/bankcard", {
									uid: that.userid,
									image: upres.imageURL,
								}).then(upreq => {
									uni.hideLoading();
									uni.showToast({
										title: upreq['msg'],
										icon: "none"
									})
									if (upreq['code'] == 200) {
										that.banksData.bank_account = upreq['data']['bank_card_number'].replace(/\s*/g, "");
										that.banksData.bank_name = upreq['data']['bank_name'];

									}
								}).catch(err => {
									uni.hideLoading();
									uni.showToast({
										title: "分析失败",
										icon: "none"
									})
								})

							},
							error: function(uperr) {
								uni.hideLoading();
								uni.showToast({
									title: "文件上传失败",
									icon: "none"
								})
							}
						})

					}
				});
			},

			sendQQinfo: function() {
				var data = this.qqData;
				if (data.number == "") {
					uni.showToast({
						title: "请输入微信号",
						icon: "none"
					});
					return false;
				}
				this.sendUpdate(data);
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
				if (mode == "idcard") {
					uni.showLoading({
						title: "正在分析",
						mask: true,
						duration: 0
					})
				} else {
					uni.showLoading({
						title: "请稍等",
						mask: true,
						duration: 0
					})
				}
				this.btnloading = true;
				var that = this;
				this.$Request("member/" + mode + "Info", data).then(request => {
					uni.hideLoading();
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
						}
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: "操作失败",
						icon: "none"
					});
				})
			},
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
						} else if (mode === "banks") {
							if(request['data'].is_authentication==0){
								uni.showToast({
									title:"请先实名认证后，再绑定银行卡~",
									icon:"none"
								})
								setTimeout(function(){
									uni.navigateTo({
										url:"/pages/ucenter/security/idcardInfo"
									})
								},1000)
							}
							var data = request['data']['member'];
							this.banksData = {
								addresinfo: data['province'] + data['city'],
								bank_account: data['bank_account'],
								sub_branchTip: data['sub_branchTip'],
								province: data['province'],
								city: data['city'],
								bank_name: data['bank_name'],
								real_name: data['real_name'],
								id: data['id'],
							};
						} else if (mode == "qq") {
							this.qqData.number = request['data'] || "";
						}
					}else if(request['code'] == 100){
						if(mode =='banks'){
							if(request['data'].is_authentication==0){
								uni.showModal({
									title: "温馨提示",
									content: "您还未实名认证，请在绑定银行卡请先前往认证身份信息",
									showCancel: false,
									confirmText: "确定",
									success: function (res) {
										if (res.confirm) {
											uni.redirectTo({
												url:"/pages/ucenter/security/idcardInfo"
											})
										} 
									}
								})
							}
						}
					}
				});
			},
			showMulLinkageThreePicker: function() {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				this.$refs.mpvueCityPicker.show();
			},
			showMulLinkageKaiHuPicker() {
				uni.hideKeyboard()
				this.$refs.mpvuePicker.show();
			},
			
			onConfirm(e) {
				console.log(e);
				var info = e.label.split("-");
				this.banksData.addresinfo =info[0] + '-' +info[1];
				this.banksData.province = info[0] || "";
				this.banksData.city = info[1] || "";
				console.log(this.banksData.city + this.banksData.province)
			},
			onYinConfirm: function(e) {
				this.banksData.bank_name = e.label;
			}
		},
		onLoad: function(e) {
			console.log(JSON.stringify(e));
			this.mode = e.mode || "qq";
			var userid = this.$SysUser.openid();
			if (!userid) {
				uni.navigateTo({
					url: '/pages/ucenter/login'
				});
				return false;
			}
			if (this.mode == "banks") {
				uni.setNavigationBarTitle({
					title: "银行卡绑定"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "联系方式绑定"
				})
			}
			this.userid = userid;
			
		},
		onShow(){
			this.getData(this.mode);
		},
		onUnload() {
			if (this.mode == "banks") {
				try {
					if (this.$refs.mpvuePicker.showPicker) {
						this.$refs.mpvuePicker.pickerCancel()
					}
					if (this.$refs.mpvueCityPicker.showPicker) {
						this.$refs.mpvueCityPicker.pickerCancel()
					}
				} catch (e) {

				}
			}

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

	.chooseImg {
		margin: 0 auto;
		text-align: center;
		width: 300upx;
	}

	.input-placeholder {
		color: #C9C9C9;
		font-size: 26upx;
	}
</style>

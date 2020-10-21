<template>
	<view class="page">
		<view v-if="buyerinfo">
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">
					<!-- 头部审核状态 -->
					<view class="is-item is-a">
						<view class="is-item-bd">
							<view>{{buyerinfo.name}}</view>
						</view>
						<view class="is-item-ft is-grey" v-if="buyerinfo.status == 0 ">审核中</view>
						<view class="is-item-ft is-green" v-if="buyerinfo.status == 1 ">审核通过</view>
						<view class="is-item-ft is-red" v-if="buyerinfo.status == 2 ">审核拒绝</view>
					</view>
					<!-- 如果审核拒绝显示修改按钮 -->
					<view class="is-center has-bordert has-pd-10" v-if=" buyerinfo.status == 2" @tap="editBuyer">
						<view class="is-blue ">点击修改</view>
					</view>
				</view>
				<view class="s-list-title">帐号信息</view>
				<!-- 收货人信息 可修改 -->
				<view class="s-list ">
					<view class="is-item is-a">
						<view class="is-item-bd edit-label">
							<view>收货人</view>
						</view>
						<view class="is-item-ft edit-input"><input type="text" :disabled="isedit" v-model="buyerinfo.real_name"></view>
					</view>
					<view class="is-item is-a">
						<view class="is-item-bd edit-label">
							<view>手机</view>
						</view>
						<view class="is-item-ft edit-input"><input type="text" :disabled="isedit" v-model="buyerinfo.tel"></view>
					</view>
					<view class="is-item is-a" @tap="showMulLinkageThreePicker">
						<view class="is-item-bd edit-label">
							<view>收货地址</view>
						</view>
						<view class="is-item-ft edit-input" >{{buyerinfo.province}}</view>
					</view>
					<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
					 @onConfirm="onConfirm"></mpvue-city-picker>
					<view class="is-item is-a">
					 	<view class="is-item-bd edit-label">
					 		<view>详细地址</view>
					 	</view>
					 	<view class="is-item-ft edit-input" ><input type="text" :disabled="isedit" v-model="buyerinfo.addres"></view>
					 </view>
				</view>
				<!-- 账号信息 通过后不可修改 -->
				<view class="s-list-title">帐号属性</view>
				<view class="s-list ">
					<view class="is-item is-a">
						<view class="is-item-bd">
							<view>性别</view>
						</view>
						<view class="is-item-ft">{{sexRange[buyerinfo.sex]}}</view>
					</view>
					<view class="is-item is-a">
						<view class="is-item-bd">
							<view>年龄</view>
						</view>
						<view class="is-item-ft">{{buyerinfo.age}}</view>
					</view>
					<view class="is-item is-a">
						<view class="is-item-bd">
							<view>信誉</view>
						</view>
						<view class="is-item-ft">{{blevelRange[buyerinfo.blevel]}}</view>
					</view>
					<view class="is-item is-a">
						<view class="is-item-bd">
							<view>京享值</view>
						</view>
						<view class="is-item-ft">{{buyerinfo.taoqi}}</view>
					</view>
					<view class="is-item is-a">
						<view class="is-item-bd">
							<view>小白信用积分</view>
						</view>
						<view class="is-item-ft">{{buyerinfo.credit_score}}</view>
					</view>
					<view class="upload-img-container">
						<view>
							<view class="upload-img-item-box" @tap="previewImage(buyerinfo.acount_pic)">
								<view class="upload-img-before-box">
									<image :src="buyerinfo.acount_pic" style="width: 100%;height: 100%;vertical-align:bottom;"></image>
								</view>
								<view class="is-center upload-text-bottom">账号用户名</view>
							</view>

							<view class="upload-img-item-box" @tap="previewImage(buyerinfo.level_pic)">
								<view class="upload-img-before-box">
									<image :src="buyerinfo.level_pic" style="width: 100%;height: 100%;vertical-align:bottom;"></image>
								</view>
								<view class="is-center upload-text-bottom">账户等级</view>
							</view>
							<view class="upload-img-item-box" @tap="previewImage(buyerinfo.taoqi_pic)">
								<view class="upload-img-before-box">
									<image :src="buyerinfo.taoqi_pic" style="width: 100%;height: 100%;vertical-align:bottom;"></image>
								</view>
								<view class="is-center upload-text-bottom">小白信用分</view>
							</view>
							<view class="upload-img-item-box" @tap="previewImage(buyerinfo.white_pic)">
								<view class="upload-img-before-box">
									<image :src="buyerinfo.white_pic" style="width: 100%;height: 100%;vertical-align:bottom;"></image>
								</view>
								<view class="is-center upload-text-bottom">白条信息</view>
							</view>
							
							<view class="upload-img-item-box" @tap="previewImage(buyerinfo.real_pic)">
								<view class="upload-img-before-box">
									<image :src="buyerinfo.real_pic" style="width: 100%;height: 100%;vertical-align:bottom;"></image>
								</view>
								<view class="is-center upload-text-bottom">京东实名认证</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../../components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		data() {
			return {
				themeColor: '#007AFF',
				userid: '',
				itemid: '',
				mode: '',
				buyerinfo: [],
				sexRange: ['--', '男', '女'],
				cityPickerValueDefault: [0, 0, 1],
				blevelRange:  ['注册用户', '铜牌用户', '银牌用户', '金牌用户', '钻石用户'],//京东信誉等级数据
				isedit:false
			}
		},
		components: {
			mpvueCityPicker,
			mpvuePicker,
		},
		methods: {
			getData(id) {
				// 读取修改数据 
				this.$Request("member/getBuyerInfo", {
					id: id,
					uid: this.userid
				}).then(res => {
					if (res.code == 200) {
						this.buyerinfo = res.data;
					} else {
						uni.navigateBack({});
					}
				});
				
			},
			showMulLinkageThreePicker: function() {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord();
				//#endif
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm: function(e) {
				this.buyerinfo.province = e.label;
			},
			previewImage(src) {
				var srclist = [];
				srclist[0] = this.buyerinfo.acount_pic;
				srclist[1] = this.buyerinfo.level_pic;
				srclist[2] = this.buyerinfo.taoqi_pic;
				srclist[3] = this.buyerinfo.white_pic;
				srclist[4] = this.buyerinfo.real_pic;
				if (src) {
					uni.previewImage({
						current: src,
						urls: srclist,
					})
				}
			},
			editBuyer() {
				var mode = this.buyerinfo.type;
				var itemid = this.buyerinfo.id;
				uni.navigateTo({
					url: '/pages/ucenter/security/bindBuyerJd?mode=' + mode + "&itemid=" + itemid
				});
			}
		},
		onLoad: function(e) {
			this.itemid = e.id || "";
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			if (!userid) {
				uni.navigateTo({
					url: '/pages/ucenter/login'
				});
				return false;
			}
			this.userid = userid;
			this.getData(this.itemid);
		},
		onNavigationBarButtonTap: function(e) {
			let _this = this;
			this.$Request("member/buyer_basics_info_edit", {
				buyer_id:_this.itemid,
				uid: _this.userid,
				consignee : _this.buyerinfo.real_name,
				receiving_telephone : _this.buyerinfo.tel,
				receiving_address : _this.buyerinfo.province,
				summary_address : _this.buyerinfo.addres
			}).then(res => {
				uni.showToast({
					title:res.msg,
					icon:"none"
				})
				if (res.code == 200) {
					setTimeout(function() {
						uni.navigateBack();
					}, 1500);
				}
			})
			
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
	.upload-img-container>view{
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
	.upload-img-item-box image{
		vertical-align: middle;
	}
	.upload-img-before-box image{
		width: 15vw;
		vertical-align: middle;
	}
	.upload-text-bottom{
		color: #5E5D5D;
		font-size:24rpx;
		margin-top: 10rpx;
	}
	.edit-label{
		width: 30%!important;
	}
	.edit-input{
		width: 70%;
	}
</style>

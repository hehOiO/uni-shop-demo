<template>
	<view class="s-page-wrapper">
		<view class="s-row">
			<view class="has-bg-white has-pd-10 is-left is-black" v-show="app_member_kefu_weixin != ''&&isLoading ">
				客服{{app_member_kefu_weixin}}
			</view>
			<view class="s-col is-col-24" v-show="isLoading">
				<view class="s-list-title">账户信息</view>
				<view class="s-list ">
					<view class="is-item has-right-icon has-pdtb-15" v-if="bind_info.length > 0" v-for="(nav,index) in bind_info" :key="index"
					 @tap="JumpModel" :data-icon="nav.icon" data-type="info">
						<view class="is-item-hd"></view>
						<view class="is-item-bd">
							<view>{{nav.title}}</view>
						</view>
						<view class="is-item-ft">{{nav.status}}</view>
					</view>
				</view> 
				<view class="s-list-title">买号绑定</view>
				<view class="s-list ">
					<view class="is-item has-right-icon has-pdtb-15" v-if="bind_buyer.length > 0" v-for="(nav,index) in bind_buyer" :key="index"
					 @tap="JumpModel" :data-icon="nav.icon" data-type="buyer">
						<image src="../../../static/images/common/taobao.png" mode="widthFix" v-if="nav.icon=='taobao'" style="width: 60rpx;margin-right: 20rpx;"></image>
						<image src="../../../static/images/common/jingdong.png" mode="widthFix" v-if="nav.icon=='jd'" style="width: 60rpx;margin-right: 20rpx;"></image>
						<image src="../../../static/images/common/pincircle.png" mode="widthFix" v-if="nav.icon=='pinduoduo'" style="width: 60rpx;margin-right: 20rpx;"></image>
						<image src="../../../static/images/common/douyin.png" mode="widthFix" v-if="nav.icon=='douyin'" style="width: 60rpx;margin-right: 20rpx;border-radius: 50%;"></image>
						<view class="is-item-bd">
							<view class="has-pdl-5">{{nav.title}}<text class="is-red is-size-12">*必填</text></view>
						</view>
						<view class="is-item-ft">{{nav.status}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var cardContent = "根据国家网信办新规，平台进行实名安全工作，当您的账户出现风险时，在必要时系统会要求您进行更高级别的认证，我们承诺保障您账户的资金安全，且不会泄露您的个人隐私，请您积极配合。";
	export default {
		data() {
			return {
				userid: '',
				bind_info: [],
				bind_buyer: [],
				idcard: "",
				qqstatus: false,
				bankstatus: false,
				app_member_kefu_weixin: "",
				member_idcard_bind:0,
				type:'',
				isLoading:false
			}
		},
		methods: {
			getData: function() {
				let _this = this;
				this.$Request('member/buynumber', {
					uid: this.userid
				}).then(res => {
					if (res['code'] == 200) {
						this.bind_info = res.data.info;
						this.bind_buyer = res.data.buyer;
						this.idcard = res.data.idcard;
						this.qqstatus = res.data.qqstatus;
						this.bankstatus = res.data.bankstatus;
						try {
							if (res.data.idcard == "未绑定") {
								this.alertRealName();
								return false; 
							}
						} catch (e) {
							console.log("errrrrrr");
						}

					} else {
						uni.navigateTo({
							url: '/pages/ucenter/login'
						});
					}
					uni.hideLoading();
					setTimeout(function(){
						_this.isLoading = true;
					},200)
					
				});
			},
			
			JumpModel: function(param) {
				console.log(param.currentTarget.dataset.icon);
				var icon = param.currentTarget.dataset.icon;
				var type = param.currentTarget.dataset.type;
				if (type == "info") {
					if (icon == "idcard") {
						uni.navigateTo({
							url: '/pages/ucenter/security/idcardInfo?mode=idcard'
						});
					} else {
						uni.navigateTo({
							url: '/pages/ucenter/security/securityinfo?mode=' + icon
						});
					}
				} else {
					if(icon=="taobao"){
						// 绑定账户页面 
						uni.navigateTo({
							url: '/pages/ucenter/security/buyerlist?mode=' + icon
						});
					}
					if(icon=="jd"){
						// 绑定账户页面 
						uni.navigateTo({
							url: '/pages/ucenter/security/buyerlist_jd?mode=' + icon
						});
					}
					if(icon=="pinduoduo"){
						console.log('go pinduoduo')
						// 绑定账户页面 
						uni.navigateTo({
							url: '/pages/ucenter/security/buyerlist_pinduoduo?mode=' + icon
						});
					}
					if(icon=="douyin"){
						// 绑定账户页面 
						console.log('go douyin')
						uni.navigateTo({
							url: '/pages/ucenter/security/buyerlist_douyin?mode=' + icon
						});
					}
					
				}
			},
			alertRealName:function(){
				if(this.member_idcard_bind != "1" ){
					return false; 
				}
				const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert'); 
				dcRichAlert.show({
					title: "温馨提示",
					titleColor: '#303133',
					content: cardContent,
					contentAlign: 'left',
					buttons: [{
							title: '立即认证',
							titleColor: '#409EFF'
						},
						{
							title: '暂不认证',
							titleColor: '#303133'
						},
					]
				}, result => {
					if (result.index == 0) {
						uni.navigateTo({
							url: '/pages/ucenter/security/idcardInfo?mode=idcard'
						});
					} else {
						uni.navigateBack({})
					}
				});
			}
			
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			this.app_member_kefu_weixin = this.$Sysconf("app_member_kefu_weixin");
			this.member_idcard_bind = this.$Sysconf("member_idcard_bind"); 
			this.userid = userid;
			this.getData();
		},
		onLoad(option){
			uni.showLoading({
				title: '加载中...'
			});
			this.type=option.type;
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
	.is-size-28{
		font-size: 54upx;
	}
	.icon-unie651{
		color: rgb(255, 85, 0);
	}
</style>

<template>
	<view class="s-page-wrapper" v-if="banksInfo.bank_account&&isLoading">
		<view class="cash-withdrawal-header-box" >
			<navigator url="/pages/detail/content?id=9"><view class="see-rules">点击查看提现规则</view></navigator>
			<view class="user-bank-info" @tap="goBanksInfo">
				<view class="user-bank-name">
					{{banksInfo.bank_name}}
				</view>
				<view class="user-bank-content">
					<view style="margin-right: 20rpx;">卡号：{{banksInfo.bank_account}}</view>
					<view>{{banksInfo.real_name}}</view>
				</view>
			</view>
		</view>
		<view>
			<view class="banks-type-tab-box">
				<view :class="[tabShow==1?'tab-active':'']" @tap="tabTap(1)">本金提现</view>
				<view :class="[tabShow==2?'tab-active':'']" @tap="tabTap(2)">个人收益提现</view>
				<view :class="[tabShow==3?'tab-active':'']" @tap="tabTap(3)">团队收益提现</view>
				<view :class="[tabShow==4?'tab-active':'']" @tap="tabTap(4)">众包收益提现</view>
			</view>
			<view class="banks-type-content-container" v-show="tabShow==1">
				<view >可用金额</view>
				<view class="available-amount">
					￥{{banksInfo.member_score}}
				</view>
				<view class="banks-type-action">
					本金、个人收益、团队收益提现次数每天各一次
				</view>
				<view class="banks-input-box">
					 <view class="uni-form-item uni-column" style="border-bottom:1px solid #eee;position: relative;">
						 <view style="position: absolute;left: 0;color: #ADADAD;font-size: 40rpx;bottom:6px ;">￥</view>
						<input style="text-align:left;padding-left: 50rpx;" class="uni-input" disabled="disabled" placeholder="点击输入提现金额" v-model="banksInfo.member_score" placeholder-style="font-size:26rpx;color:#B5B5B5;"/>
					</view>
					<view class="uni-form-item uni-column" style="border-bottom:1px solid #eee">
						<input style="text-align:left;padding-left: 50rpx;" type="password" class="uni-input" placeholder="请输入账户登录密码" placeholder-style="font-size:26rpx;color:#B5B5B5;"  data-val="sendData|pwd" v-model="sendData.pwd"/>
					</view>
				</view>
				<view class="is-item-bd s-btn" @tap="submitTask">
					<view class="is-btn-lg has-bg-base">{{loadingtext}}</view>
				</view>
			</view>
			<view class="banks-type-content-container" v-show="tabShow==2">
				<view >可用金额</view>
				<view class="available-amount">
					￥{{banksInfo.member_score}}
				</view>
				<view class="banks-type-action">
					本金、个人收益、团队收益提现次数每天各一次
				</view>
				<view class="banks-input-box">
					 <view class="uni-form-item uni-column" style="border-bottom:1px solid #eee;position: relative;">
						 <view style="position: absolute;left: 0;color: #ADADAD;font-size: 40rpx;bottom:6px ;">￥</view>
						<input style="text-align:left;padding-left: 50rpx;" class="uni-input" disabled="disabled" placeholder="点击选择提现金额" @tap="selectMoney" v-model="sendData.money_label" placeholder-style="font-size:26rpx;color:#B5B5B5;"/>
					</view>
					
					<view class="uni-form-item uni-column" style="border-bottom:1px solid #eee">
						<input style="text-align:left;padding-left: 50rpx;" type="password" class="uni-input" placeholder="请输入账户登录密码" placeholder-style="font-size:26rpx;color:#B5B5B5;" data-val="sendData|pwd" v-model="sendData.pwd"/>
					</view>
				</view>
				<view class="is-item-bd s-btn" @tap="submitTask">
					<view class="is-btn-lg has-bg-base">{{loadingtext}}</view>
				</view>
			</view>
			<view class="banks-type-content-container" v-show="tabShow==3">
				<view >可用金额</view>
				<view class="available-amount">
					￥{{banksInfo.member_score}}
				</view>
				<view class="banks-type-action">
					本金、个人收益、团队收益提现次数每天各一次
				</view>
				<view class="banks-input-box">
					 <view class="uni-form-item uni-column" style="border-bottom:1px solid #eee;position: relative;">
						 <view style="position: absolute;left: 0;color: #ADADAD;font-size: 40rpx;bottom:6px ;">￥</view>
						<input style="text-align:left;padding-left: 50rpx;" class="uni-input" disabled="disabled" placeholder="点击选择提现金额" @tap="selectMoney" v-model="sendData.money_label" placeholder-style="font-size:26rpx;color:#B5B5B5;"/>
					</view>
					
					<view class="uni-form-item uni-column" style="border-bottom:1px solid #eee">
						<input style="text-align:left;padding-left: 50rpx;" type="password" class="uni-input" placeholder="请输入账户登录密码" placeholder-style="font-size:26rpx;color:#B5B5B5;" data-val="sendData|pwd" v-model="sendData.pwd"/>
					</view>
				</view>
				<view class="is-item-bd s-btn" @tap="submitTask">
					<view class="is-btn-lg has-bg-base">{{loadingtext}}</view>
				</view>
			</view>
		</view>
		<view class="banks-type-content-container" v-show="tabShow==4">
			<view >可用金额</view>
			<view class="available-amount">
				￥{{zbscore}}
			</view>
			<view class="banks-type-action">
				众包收益提现不限金额，每天可提现一次
			</view>
			<view class="banks-input-box">
				 <view class="uni-form-item uni-column" style="border-bottom:1px solid #eee;position: relative;">
					 <view style="position: absolute;left: 0;color: #ADADAD;font-size: 40rpx;bottom:6px ;">￥</view>
					<input style="text-align:left;padding-left: 50rpx;" class="uni-input" disabled="disabled" placeholder="点击输入提现金额" v-model="zbscore" placeholder-style="font-size:26rpx;color:#B5B5B5;"/>
				</view>
				<view class="uni-form-item uni-column" style="border-bottom:1px solid #eee">
					<input style="text-align:left;padding-left: 50rpx;" type="password" class="uni-input" placeholder="请输入账户登录密码" placeholder-style="font-size:26rpx;color:#B5B5B5;"  data-val="sendData|pwd" v-model="sendData.pwd"/>
				</view>
			</view>
			<view class="is-item-bd s-btn" @tap="submitTask" v-if="tabShow!=4">
				<view class="is-btn-lg has-bg-base">{{loadingtext}}</view>
			</view>
			<view class="is-item-bd s-btn" @tap="submitTask1" v-if="tabShow==4">
				<view class="is-btn-lg has-bg-base">确认</view>
			</view>
		</view>
		<!-- <view class="s-col is-col-24 has-pd-10" v-if="banksInfo.member_score > 1 ">
			<navigator class="is-p" url="/pages/detail/content?id=9">
				请选择提现金额，并输入{{webname}}登录密码。<text class="is-blue">点击查看提现规则</text>
			</navigator>

			<view class="is-p has-mgb-0 has-bg-white" v-if="type == 'product_order'">
				<view class="is-p has-mgb-0">本金提现说明：</view>
				<view class="is-p is-size-16 has-mgb-0">1、本金提现每次都必须全额提出。</view>
				<view class="is-p is-size-16 has-mgb-0">2、7天内第一次提现不管任何金额都免手续费。</view>
			</view>
		</view> -->
		<!-- <view v-if="banksInfo.member_score > 1 ">
			<view class="s-col is-col-24 ordersnInf">
				<view class="s-list has-mgt-0">
					<view class="is-item-line has-pd-20">
						<view class="is-item-bd">
							可用余额：￥{{banksInfo.member_score}}
						</view>
					</view>
					<view class="is-item-line has-pd-20" v-if="type == 'agent'">
						<view class="is-item-bd">
							最大可提现：￥{{banksInfo.max_member_score}}
						</view>
					</view>
					<view class="is-item-line has-pd-20">
						<view class="is-item-bd">
							{{banksInfo.bank_name}} {{banksInfo.real_name}} {{banksInfo.bank_account}}
						</view>
					</view>

					<view class="is-item-line" v-if="type == 'agent_commision' ">
						<view class="is-item-bd">
							<input type="number" :value="sendData.max_member_score" placeholder="输入提现金额" @input="BindInput" data-val="sendData|money">
						</view>
					</view>

					<view class="is-item-line" v-if="type == 'product_commision' ">

						<view class="is-item-bd" @tap="selectMoney">
							<view class="is-grey money-input" v-if="sendData.money_label == '' ">
								{{sendData.money_label||"点击选择提现金额"}}
							</view>
							<view class="money-input" v-if="sendData.money_label !== '' ">
								{{sendData.money_label||"点击选择提现金额"}}
							</view>
						</view>

						<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="selector" :deepLength="1" pickerValueDefault="0"
						 @onConfirm="onYinConfirm" :pickerValueArray="amount_list"></mpvue-picker>
					</view>


					<view class="is-item-line ">
						<view class="is-item-bd">
							<input type="password" :value="sendData.pwd" placeholder="请输入账户登录密码" @input="BindInput" data-val="sendData|pwd">
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<!-- <view class="" v-if="banksInfo.member_score > 1 ">
			<view class="s-col is-col-24 ordersnInf">
				<view class="s-list">
					<view class="is-item-line ">
						<view class="is-item-bd s-btn" @tap="submitTask">
							<view class="is-btn-lg has-bg-base">{{loadingtext}}</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->

		<!-- <view class="is-flex is-column is-justify-center is-align-center has-bg-white" v-if="banksInfo.member_score <= 1 "
		 style="height: 100vh">
			<i class="iconfont icon-busy"></i>
			<view class="has-desc-color is-size-16 has-mgt-20">您的余额{{banksInfo.member_score}}，赶快做任务挣钱吧！</view>
			<view class="s-btn has-mgt-20">
				<navigator open-type="switchTab" url="/pages/index/index" class="is-btn is-btn-md  has-bg-base">返回首页</navigator>
			</view>
		</view> -->
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="selector" :deepLength="1" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onYinConfirm" :pickerValueArray="amount_list"></mpvue-picker>
	</view>

	<view v-else-if="!banksInfo.bank_account&&isLoading" class="s-page-wrapper">
		<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh">
			<i class="iconfont icon-busy"></i>
			<view class="has-desc-color is-size-16 has-mgt-20" v-if="userid != '' ">您还没有绑定银行卡，赶快去绑定吧</view>
			<view class="has-desc-color is-size-16 has-mgt-20" v-if="userid == '' ">您还没有登录，请先登录！</view>
			<view class="s-btn has-mgt-20">
				<navigator url="/pages/ucenter/security/securityinfo?mode=banks" v-if="userid != '' " class="is-btn is-btn-md  has-bg-red">去绑定</navigator>
				<navigator url="/pages/ucenter/login" v-if="userid == '' " class="is-btn is-btn-md  has-bg-red">去登录</navigator>
				<navigator open-type="switchTab" url="/pages/index/index" class="is-btn is-btn-md  has-bg-base">返回首页</navigator>
			</view>

		</view>
	</view>

</template>

<script>
	import mpvuePicker from '../../../components/mpvue-picker/mpvuePicker.vue';
	var util = require('../../../common/util.js');
	export default {
		data() {
			return {
				tabShow:1,
				userid: '',
				webname: '',
				banksInfo: [],
				loadingtext: "确认",
				isLoading: false,
				sendData: {
					money_label: '',
					money: '',
					pwd: '',
					bank_account: "",
					moneyIndex: "",
				},
				pickerValueDefault: [0],
				type: "",
				amount_list: [],
				themeColor: '#007AFF',
				zbscore:0
			}
		},
		components: {
			mpvuePicker
		},
		methods: {
			goBanksInfo(){
				uni.navigateTo({
					url: '/pages/ucenter/security/securityinfo?mode=banks'
				});
			},
			tabTap(num){//切换tab方法
				this.tabShow = num;
				if(num==1){
					this.type = "product_order";
					uni.setNavigationBarTitle({
						title: "本金提现"
					});
				}
				if(num==2){
					this.type = "product_commision";
					uni.setNavigationBarTitle({
						title: "佣金收益提现"
					});
				}
				if(num==3){
					this.type = "agent_commision";
					uni.setNavigationBarTitle({
						title: "团队收益提现"
					});
				}
				this.sendData.moneyIndex = "";
				this.sendData.money = "";
				this.sendData.money_label = "";
				this.sendData.BindInput = "";
				this.sendData.pwd = "";
				this.loadData();
			},
			loadData: function() {//加载数据
				this.$Request("member/banksInfo", {
					uid: this.userid,
					type: this.type,
				}).then(res => {
					if (res.code == 200) {
						var bank_account = util.FormatBankSpace(res.data.member.bank_account); //银行卡号 四位数字一组，以空格分割 
						var real_name = util.hide_relname(res.data.member.real_name, 1, 1);//真实姓名
						res['data']['member']['bank_account'] = bank_account;
						res['data']['member']['real_name'] = real_name;
						this.banksInfo = res.data.member
						this.sendData.bank_account = res.data.member.id;
						if (this.type == "agent_commision") {
							this.sendData.money = res.data.member.max_member_score;
						} else {
							this.sendData.money = res.data.member.member_score;
						}
						// 提现金额类别 
						this.amount_list = res.data.amount_list;
						this.isLoading = true;
					} else {
						this.banksInfo = [];
						this.isLoading = true;
					}
					uni.hideLoading();
				});
			},
			BindInput: function(e) {
				// 监听INPUT 事件
				console.log(e);
				var dataval = e.currentTarget.dataset.val;
				var dataval = dataval.split("|"); //字符分割  
				var value = e.detail.value;
				var model = dataval[0],
					type = dataval[1];
				if (model == "sendData") {
					var data = this.sendData;
					data[type] = value;
					this.sendData = data;
				}
			},
			selectMoney: function() {
				// 弹出选择提现金额 
				this.$refs.mpvuePicker.show();
			},
			onYinConfirm: function(e) {
				console.log(e);
				if (parseInt(e.value[0]) > parseInt(this.banksInfo.member_score)) {
					uni.showToast({
						title: "可用余额不足，请选择其他选项。",
						icon:"none"
					});
					return false;
				}
				this.sendData.moneyIndex = e.index;
				this.sendData.money_label = e.value[0];
				this.sendData.money = e.value[0];
			},
			submitTask: function() {
				uni.hideKeyboard(); 
				var data = this.sendData;
				if (data.money == "") {
					uni.showToast({
						title: "请输入提现金额",
						icon:"none"
					});
					return false;
				}
				if(data.money==0){
					uni.showToast({
						title: "提现金额不能为0",
						icon:"none"
					});
					return false;
				}
				if (data.pwd == "") {
					uni.showToast({
						title: "请输入登录密码",
						icon:"none"
					});
					return false;
				}
				this.loadingtext = "请稍等...";
				this.isLoading = true;
				data['uid'] = this.userid;
				data['type'] = this.type;
				this.$Request("member/member_put_cash", data).then(res => {
					
					this.loadingtext = "确认";
					uni.showToast({
						title: res.msg,
						icon:"none"
					});
					if (res.code == 200) {
						this.isLoading = false;
						setTimeout(function() {
							uni.navigateBack();
						}, 1500);
					}
				})
			},
			submitTask1(){
				console.log("提现");
				let _this = this;
				this.$Request1("withdraw_from_app",{
					money:_this.zbscore,
					bankname:_this.banksInfo.bank_name,
					realname:_this.banksInfo.real_name,
					cardno:_this.banksInfo.bank_account.replace(/\s+/g,""),
					subbanch:_this.banksInfo.sub_branchTip,
					provice:_this.banksInfo.province,
					city:_this.banksInfo.city
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title:"提现成功，请耐心等待银行到账",
							icon:"none"
						});
						setTimeout(function(){
							uni.navigateBack();
						},1000)
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				})
			},
			getInfo(){
				let _this = this;
				this.$Request1("get_user_info",{
				}).then(res => {
					if (res.code == 1) {
						_this.zbscore = res.data.score;
						console.log(_this.zbscore)
					}
				})
			}
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			this.userid = userid || "";
			this.loadData();
			this.getInfo();
		},
		onLoad: function(e) {
			uni.showLoading({
				title:"加载中……"
			})
			this.webname = this.$Sysconf("webname");//获取app名称
			this.type = "product_order";
		},
		onNavigationBarButtonTap: function(e) {
			uni.navigateTo({
				url: '/pages/ucenter/score/forwardlist'
			})
		},
		onUnload: function() {
			try{
				if (this.type == "product_commision") {
					if (this.banksInfo['id'] ) {
						if( this.$refs.mpvuePicker.showPicker ){
							this.$refs.mpvuePicker.pickerCancel()
						}
					}
				}
			}catch(e){
				console.log(e); 
			}
			this.isLoading = false;
			this.loadingtext = "确认";
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";
	@import "../../../common/uni.css";
	@import "../../../common/icon.css";

	page {
		min-height: 100%;
		background-color: #fff;
	}
	.is-btn-lg{
		width: 70%;
		margin: 0 auto;
		margin-top: 150rpx;
		border-radius: 15rpx;
	}
	.banks-input-box{
		padding-top: 30rpx;
		margin-top: 30rpx;
		border-top: 1px solid #eee;
	}
	.input-placeholder{
		font-size: 22rpx;
		color: #B5B5B5;
	}
	.banks-type-action{
		font-size:22rpx;
		color: #B2B2B2;
		margin-top:20rpx;
	}
	.banks-type-content-container{
		background-color: #fff;
		padding: 24rpx;
	}
	.banks-type-content-container>view:first-child{
		font-size: 30rpx;
		color: #333;
		text-align:center;
	}
	.banks-type-content-container>view{
		text-align: center;
	}
	.available-amount{
		font-size: 80rpx;
		color: #363636;
		margin-top: 20rpx;
		font-weight: 600;
	}
	.tab-active{
		background-color: #1F9EFF!important;
		color: #fff!important;
	}
	.banks-type-tab-box{
		background-color: #fff;
		padding: 24rpx;
		padding-top: 120rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.banks-type-tab-box>view{
		width: 33%;
		text-align:center;
		font-size:24rpx;
		color: #6C6C6C;
		background-color:#E8E8E8;
		padding: 20rpx 0px;
	}
	.user-bank-info{
		background-color: #fff;
		padding: 24rpx;
		border-radius: 10rpx;
		position: absolute;
		height: 140rpx;
		width: calc(100% - 48rpx);
		left: 24rpx;
		box-sizing: border-box;
		bottom: -73rpx;
		box-shadow: 0px 5px 13px -4px #ccc;
	}
	.user-bank-info:after{
		content: " ";
		display: inline-block;
		height: 14rpx;
		width: 14rpx;
		border-width: 2px 2px 0 0;
		border-color: #c8c8cd;
		border-style: solid;
		-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		-ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
		position: relative;
		top: -2px;
		position: absolute;
		top: 50%;
		margin-top: -4px;
		right: 20rpx;
	}
	.user-bank-name{
		color: #515151;
		font-size: 28rpx;
		margin-bottom: 5rpx;
	}
	.user-bank-content{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 24rpx;
		color: #B5B5B5;
	}
	.cash-withdrawal-header-box{
		background-color: rgb(251, 113, 128);
		padding: 24rpx;
		padding-bottom: 73rpx;
		position: relative;
	}
	.cash-withdrawal-header-box .see-rules{
		height: 60rpx;
		line-height:60rpx;
		color: #fff;
		font-size: 28rpx;
		text-align: right;
	}
	.is-size-20 {
		text-align: right;
		font-size: 64rpx;
	}

	.ordersnInf input,
	.ordersnInf .money-input {
		height: 80rpx;
		line-height: 60rpx;
		padding: 10rpx;
	}

	.icon-busy {
		color: #666;
		font-size: 150rpx;
	}
</style>

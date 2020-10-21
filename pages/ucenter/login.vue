<template>
	<view class="s-page-wrapper is-100vh">
		
		<view class="login-content-bg">
		<view class="is-30vh has-pdt-20">
			<view class="is-flex is-column is-justify-center  is-align-center is-height-100">
				<image src="../../static/images/common/87.png" mode="aspectFit" class="logoimg"></image>
			</view>
		</view>
		<view class="logincontent is-50vh">
			<view class="has-mglr-10 ">
				<view class=" has-mgtb-10 ">
					<input type="number" maxlength="11" :value="login.phone" placeholder="请输入手机号" @input="BindInput" data-val="login|phone"
					 class="is-input1 " />
				</view>
				<view class=" has-radius has-mgtb-10">
					<input :value="login.password" placeholder="请输入登录密码" :password="login.showpwd" @input="BindInput" data-val="login|password"
					 class="is-input1" />
					<view class="iconfont" v-if="login.password.length > 0 " :class="[!login.showpwd?'icon-visibilityoff':'icon-visibility']"
					 @click="changePassword" data-val="login|showpwd"></view>
				</view>
				
				<view class=" has-radius has-mgtb-10 s-row">
					<navigator url="/pages/ucenter/security/findPassword" class=" has-radius has-floatl is-grey has-mgl-10" hover-class="">
						<text>忘记密码？</text>
					</navigator>
					<navigator url="/pages/ucenter/register" class=" has-radius has-floatr is-56aafb is-right has-mgr-10" hover-class="">
						<text class="member">注册会员</text>
					</navigator>
				</view>
				<view class=" loginbtn has-radius has-mgtb-20">
					<button :loading="login.loading" @tap="defaultHandlerLogin"> {{ login.loading ? "登录中...":"登 录"}} </button>
				</view>
			</view>
		</view>
		</view>

	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			current: 0,
			login: {
				phone: '',
				password: '',
				showpwd: true,
				loading: false
			}
		};
	},
	computed: mapState(['forcedLogin']),
	methods: {
		BindInput: function(e) {
			var dataval = e.currentTarget.dataset.val,
				dataval = dataval.split('|'); //字符分割
			var value = e.detail.value;
			var model = dataval[0],
				type = dataval[1];
			if (model == 'login') {
				var data = this.login;
				data[type] = value;
				this.login = data;
			} else {
				var data = this.register;
				data[type] = value;
				this.register = data;
			}
		},
		clearInput: function(e) {
			var dataval = e.currentTarget.dataset.val,
				dataval = dataval.split('|'); //字符分割
			var model = dataval[0],
				type = dataval[1];
			if (model == 'login') {
				var data = this.login;
				data[type] = '';
				this.login = data;
			} else {
				var data = this.register;
				data[type] = '';
				this.register = data;
			}
		},
		changePassword: function(e) {
			uni.hideKeyboard();
			var dataval = e.currentTarget.dataset.val,
				dataval = dataval.split('|'); //字符分割
			var model = dataval[0],
				type = dataval[1];
			if (model == 'login') {
				this.login.showpwd = !this.login.showpwd;
			} else {
				this.register[type] = !this.register[type];
			}
		},
		defaultHandlerLogin: function() {
			uni.hideKeyboard();
			var clientid = '',
				token = '';
			//#ifdef APP-PLUS
			var inf = plus.push.getClientInfo();
			clientid = inf.clientid;
			if (plus.os.name == 'iOS') {
				token = inf.token;
			}
			//#endif
			// 登录帐号
			let _self = this,
				password = _self.login.password,
				phone = _self.login.phone;
			if (phone == '') {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return false;
			}
			if (phone.toString().length < 11) {
				uni.showToast({
					title: '请输入11位以上的手机号',
					icon: 'none'
				});
				return false;
			}
			if (password == '') {
				uni.showToast({
					title: '请输入登录密码',
					icon: 'none'
				});
				return false;
			}
			uni.showLoading({
				title: '登录中..',
				mask: true
			});
			_self.login.loading = true;
			this.$Request('member/loginv1', {
				tel: phone,
				pwd: password,
				clientid: clientid,
				clientid_token: token
			}).then(request => {
				uni.hideLoading();
				_self.login.loading = false;
				if (request['code'] == 200) {
					_self.$SysUser.addUser(request['data']);
					_self.$Request1('get_relation_token',{
						userid:request['data'].uid,
						phone:request['data'].phone
					}).then(request1 => {
						console.log(request1)
						if(request1['code'] == 1){
							uni.setStorage({
							    key: 'zbdata',
							    data: JSON.stringify(request1['data']),
							    success: function (rs) {
									console.log(rs);
							       
							    },
								fail:function(err){
									console.log(err);
								}
							});
						}
					}).catch(err=>{
						console.log( JSON.stringify(err) );
					})
					uni.showToast({
						title: request['msg'],
						icon: 'none'
					});
					setTimeout(function() {
						if (_self.forcedLogin) {
							uni.reLaunch({
								url: '/pages/index/index'
							});
						} else {
							uni.navigateBack();
						}
					}, 1500);
				} else {
					uni.showToast({
						title: request['msg'],
						icon: 'none'
					});
				}
			}).catch(err=>{
				console.log( JSON.stringify(err) );
			})
		},
		clearData: function() {
			this.login = {
				phone: '',
				password: '',
				showpwd: true,
				loading: false
			};
		},
		findPassword: function() {
			uni.navigateTo({
				url: '/pages/ucenter/security/findPassword'
			});
		}
	},
	onShow: function() {
		uni.getClipboardData({
			success: data => {
				if (data.data) {
					data.data.replace(/￥(\S*)￥/, res => {
						if (res) {
							// 解析后的邀请码 请求服务器校验 邀请码是否存在
							var code = res.replace('￥', '').replace('￥', '');
							this.$Request('member/get_passcode_status', {
								code: code
							}).then(res => {
								if (res.code == 200) {
									this.$Cache.put('app_invitation_code', res.data.code);
								}
							});
						}
					});
				}
			}
		});
	},
	onUnload: function() {
		this.timerId && clearInterval(this.timerId);
		this.clearData();
	},
	onNavigationBarButtonTap: function() {
		uni.navigateTo({
			url: '/pages/ucenter/register'
		});
	}
};
</script>

<style lang="less">
@import '../../common/uni.css';
@import '../../common/icon.css';
@import '../../static/css/base.less';
@import '../../static/css/base64.less';
page {
	max-height: 100%;
	width: 100%;
	background: #ffffff;
}
.s-page-wrapper {
	max-height: 100%;
	width: 100%;
	background: url('/static/images/ucenter/login-bg.png');
	background-size: 100%;
}
.login-content-bg {
}
.logincontent {
	width: 85%;
	margin: 0 auto;
	.member{
		color:#358de5;
	}
}

.logoimg {
	width: 200rpx;
	height: 200rpx;
	border-radius: 50%;
}

.is-input1 {
	height: 88rpx;
	width: 100%;
	line-height: 88rpx;
	padding: 12rpx;
	color: #353535;
	font-size: 32rpx;
	box-sizing: border-box;
	appearance: none;
	border: 2rpx solid #e5e5e5;
	box-shadow: none;
	border-radius: 44rpx;
	outline: 0;
	display: block;
	padding-left: 30rpx;
	margin: 0;
	font-family: inherit;
	background: #fff;
	resize: none;
}

.iconfont {
	position: absolute;
	font-size: 40rpx;
	right: 12%;
	z-index: 999;
	width: 105rpx;
	text-align: center;
	color: #353535;
	margin-top: -11%;
	background: #fff;
	border-top-right-radius: 44rpx;
	border-bottom-right-radius: 44rpx;
	height: 80rpx;
	line-height: 80rpx;
}

.loginbtn button {
	margin-top: 20rpx;
	height: 88rpx;
	width: 100%;
	line-height: 88rpx;
	color: #ffffff;
	font-size: 32rpx;
	border-radius: 44rpx;
	outline: 0;
	display: block;
	margin: 0;
	font-family: inherit;
	background: @baseBackGroundColor;
	opacity: 0.8;
	background: #358de5;
}

button:after {

}

.is_xieyi {
	color: @baseBackGroundColor;
}
</style>

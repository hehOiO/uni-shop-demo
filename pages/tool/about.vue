<template>
	<view class="">
		<view class="content">
			<view class="has-pdt-20">
				<view class=" is-center is-height-100">
					<image src="../../static/images/common/87.png" mode="aspectFit" class="logoimg"></image>
				</view>
			</view>
			<view class="webname has-mgt-10 is-center" style="font-size: 34rpx;color: #666;">
				{{webname}}
			</view>
			<view class="is-center has-mgt-15" style="color: rgb(184, 184, 184); font-size: 28rpx;">
				客服{{app_member_kefu_weixin}}
			</view>
			<view class="desc is-center has-mgt-10" style="color: rgb(184, 184, 184);font-size: 28rpx;">
				{{aboutInfo}}
			</view>
		</view>
		<view class="version" style="color: rgb(184, 184, 184);font-size: 28rpx;">
			当前版本：{{version}}
		</view>
	</view>
</template>

<script>

	export default {
		data(){
			return {
				version:'',
				imagelist:'',
				webname:'',
				aboutInfo : '',
				app_member_kefu_weixin:""
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.version   =  plus.runtime.version;
			// #endif
			// #ifdef MP-WEIXIN
			this.version = this.$Sysconf("appversion");
			// #endif
			this.webname   = this.$Sysconf('webname'); 
			this.aboutInfo = this.$Sysconf('aboutInfo'); 
			this.app_member_kefu_weixin = this.$Sysconf("app_member_kefu_weixin");
		},
		methods:{

		}
	}
</script>

<style>

	page {
		/* min-height: 100%; */
		background: #FFFFFF;
	}

	.content{
		width: 90%;
		margin: 0 auto;
		text-align: center;
	}
	.version{
		height: 80rpx;
		line-height: 80rpx;
		color: #ccc;
		position: absolute;
		left: 0upx;
		right: 0upx;
		text-align: center;
		margin: 0 auto;
		bottom: 10upx;
	}

	.logoimg {
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
	}
	
</style>

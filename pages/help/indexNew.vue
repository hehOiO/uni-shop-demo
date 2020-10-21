<template>
	<view>
		<view class="seatch-input-box">
			<view class="input-box">
				<input type="text" confirm-type="search" placeholder="简单完整输入你的问题,如'找回密码'" placeholder-style="font-size:24rpx;color:#6F6F6F;" v-model="keywords">
			</view>
			<view class="search-button" @tap="searchData">
				提问
			</view>
		</view>
		<view class="self-help-container">
			<view class="self-help-title">自助问答</view>
			<view class="self-help-item">
				<view class="help-item-box" @tap="goDetail(help_list[0].id)">
					<view class="item-title">{{help_list[0].title}}</view>
					<view class="item-text">注册等新用户常见问题</view>
					<view class="item-button">点击进入</view>
				</view>
				<view @tap="goDetail(help_list[1].id)" class="help-item-box" style="background-color: #F4D3BD;background-image:url('../../static/images/common/help-edit.png');background-position:calc(100% - 20rpx); background-size: 120rpx 120rpx;">
					<view class="item-title" style="color: rgb(192,92,11);">{{help_list[1].title}}</view>
					<view class="item-text" style="color: #EC8325;">操作任务遇到的问题</view>
					<view class="item-button" style="background-color: #F1A25C;">点击进入</view>
				</view>
				<view @tap="goDetail(help_list[2].id)" class="help-item-box" style="background-color:#F5B7C1 ;background-image:url('../../static/images/common/help-manage.png');background-position:calc(100% - 20rpx); background-size: 120rpx 120rpx;">
					<view class="item-title" style="color: #960816;">{{help_list[2].title}}</view>
					<view class="item-text" style="color: #D7595C;">返款类相关问题</view>
					<view class="item-button" style="background-color: #F06D79;">点击进入</view>
				</view>
				<view @tap="goDetail(help_list[3].id)" class="help-item-box" style="background-color: #CCE69B;background-image:url('../../static/images/common/help-file.png');">
					<view class="item-title" style="color: #508006;">{{help_list[3].title}}</view>
					<view class="item-text" style="color: #69991D;">推广、网赚等相关问题</view>
					<view class="item-button" style="background-color: #9BC649;">点击进入</view>
				</view>
			</view>
		</view>
		<view class="service-online">
			<view class="self-help-title">在线客服</view>
			<view class="service-container" @tap="contactService">
				<view class="service-text-box">
					如自助回复无法回答你的问题，可以咨询在线客服，<text style="color: #2C8DE7;">客服工作时间为周日至周五9:30-18：30</text>，其他时间无人在线，在线咨询需排队，请耐心等待哦（排队等待时直接说明你的问题客服接入时就能看到可以提高处理效率哦！）
				</view>
				<view class="service-button-box">
					<view style="text-align: center;">
						<image src="../../static/images/common/kefufu.png" mode="widthFix"></image>
					</view>
					<view class="enter-button">
						点击进入
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var util = require('../../common/util.js');
	export default {
		data() {
			return {
				id:'',
				phone:'',
				userid: '',
				loglist: [],
				help_list:[],
				page: 1,
				loadingType: 0,
				keywords:"",
				typeid: "",
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		methods: {
			goDetail(id){
				console.log(id);
				uni.navigateTo({
					url: '/pages/help/helpDetail?id='+id
				});
			},
			contactService(){
				uni.navigateTo({
					url: '/pages/message/chat1?id='+this.id+'&phone='+this.phone,
				});
			},
			loadData(){
				let _this = this;
				this.$Request("task/get_help_center", {
					level:1
				}).then(res => {
					if (res.code == 200) {
						_this.help_list = res.data;
					} else {
					}
				});
			},
			searchData(){//搜索
				let _this = this;
				uni.navigateTo({
					url: '/pages/help/helpDetailContent?keywords='+this.keywords+'&type=search',
				});
			}
		},
		onLoad: function(e) {
			console.log(e);
			this.id = e.id;
			this.phone = e.phone;
			this.loadData();
		},
		
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	@import "../../common/uni.css";
	@import "../../common/icon.css";

	page {
		min-height: 100%;
		background-color: #F5F6F6;
		font-size: 30rpx;
	}
	// 头部搜索
	.self-help-container{
		padding: 24rpx;
	}
	.seatch-input-box{
		padding: 24rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.seatch-input-box>.input-box{
		width: calc(100% - 80rpx);
		margin-right: 30rpx;
		border: 1rpx solid #A0A0A1;
		border-radius: 10rpx;
	}
	.input-box>input{
		background-color: #fff;
		height: 40rpx;
		padding: 10rpx;
		border-radius: 10rpx;
	}
	.search-button{
		color: #fff;
		background-color:rgb(251, 113, 128);
		font-size: 24rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		width: 80rpx;
		border-radius: 10rpx;
	}
	// 自助问答
	.self-help-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.self-help-title{
		padding-bottom: 24rpx;
		font-size: 40rpx;
		font-weight: 900;
	}
	.help-item-box{
		width: 48%;
		position: relative;
		background-color:#CAE5F5;
		padding: 24rpx;
		box-sizing: border-box;
		height: 210rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-image:url(../../static/images/common/help-personal.png);
		background-repeat: no-repeat;
		background-position: right;
		background-size: 140rpx 140rpx;
		margin-bottom:30rpx;
		border: 2rpx solid #A3C2D2;
		border-radius: 10rpx;
	}
	// .help-item-box image{
	// 	width: 130rpx;
	// 	position: absolute;
	// 	right: 0;
	// 	top: 24rpx;
	// 	z-index: 0;
	// }
	.item-title{
		color: rgb(11,91,152);
		font-size:34rpx;
		font-weight:900;
	}
	.help-item-box .item-text{
		font-size: 28rpx;
		color: #0972C2;
	}
	.item-button{
		background-color:#6DBEF0;
		color: #fff;
		font-size: 24rpx;
		width: 120rpx;
		height: 50rpx;
		text-align:center;
		line-height: 50rpx;
		border-radius: 10rpx;
	}
	.service-online{
		padding: 24rpx;
	}
	
	// 在线客服
	.service-container{
		padding: 24rpx;
		background-color: #EBE8F1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border: 2rpx solid #B1B1B2;
		border-radius: 10rpx;
	}
	.service-button-box{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.service-button-box image{
		width: 100rpx;
	}
	.service-text-box{
		font-size: 24rpx;
		width: 78%;
		color: #484747;
	}
	.enter-button{
		background-color: #B7A3DE;
		color: #fff;
		font-size: 24rpx;
		width: 120rpx;
		text-align: center;
		height: 42rpx;
		line-height: 42rpx;
		border-radius: 10rpx;
	}
</style>


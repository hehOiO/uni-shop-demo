<template>
	<view class="help-detail">
		<view class="help-detail-item" v-for="(help,index) in list" v-bind:key="index">
			<view class="detail-title">{{help.title}}</view>
			<view class="detail-child-box" >
				<view class="detail-child-item" v-for="item in help.children" v-bind:key="index" @tap="getContent(item.id)">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	// var util = require('../../common/util.js');
	export default {
		data() {
			return {
				list:[
				],
			}
		},
		methods: {
			getContent(id){
				uni.navigateTo({
					url: '/pages/help/helpDetailContent?id='+id,
				});
			},
			loadData(){
				let _this = this;
				this.$Request("task/get_help_center", {
					parent_id:_this.id,
					level:2
				}).then(res => {
					if (res.code == 200) {
						_this.list = res.data;
					} else {
					}
				});
			}
		},
		onLoad: function(e) {
			console.log(e.id);
			this.id = e.id;
			this.loadData();
		}
		
	}
</script>

<style>
	
	page {
		min-height: 100%;
		background-color: #F5F6F6;
		font-size: 30rpx;
	}
	.help-detail{
		padding: 24rpx;
	}
	.detail-title{
		padding: 15rpx 10rpx;
		color: #333;
		background-color: rgb(251, 113, 128);
		font-weight: 900;
		font-size: 32rpx;
	}
	.detail-child-box{
		padding-bottom: 30rpx;
		color: #565656;
		font-size: 26rpx;
		display: flex;
		flex-direction: row;
		align-items:center;
		flex-wrap: wrap;
		
	}
	.detail-child-item{
		width: 20%;
		border: 1rpx solid #C9C9CA;
		text-align: center;
		margin-right: 4%;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 20rpx;
		font-size:24rpx ;
		margin-top: 30rpx;
	}
</style>

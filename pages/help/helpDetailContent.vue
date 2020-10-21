<template>
	<view class="help-detail-content">
		<view class="seatch-input-box">
			<view class="input-box">
				<input type="text" confirm-type="search" placeholder="简单完整输入你的问题,如'找回密码'" v-model="keywords" placeholder-style="font-size:24rpx;color:#6F6F6F;">
			</view>
			<view class="search-button" @tap="searchData">
				提问
			</view>
		</view>
		<view class="uni-collapse-container" v-if="mark==1">
			<view class="collapse-item-box" v-for="(item,index) in list" @tap="collapseTap(index)" >
				<view class="collapse-title">
					{{index+1+'、'}}{{item.title}}
					<view class="arrow-down" v-if="!item.show"></view>
					<view class="arrow-up" v-if="item.show"></view>
				</view>
				<view class="collaose-content-box" v-show="item.show">
					{{item.content}}
				</view>
			</view>
		</view>
		<view style="padding:24rpx;" v-if="mark==0">
			暂无此类内容
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					
				],
				keywords:"",
				mark:1
			}
		},
		methods: {
			collapseTap(index){
				if(this.list[index].show){
					this.list[index].show = false;
				}else{
					this.list[index].show = true;
				}
			},
			loadData(){
				let _this = this;
				this.$Request("task/get_help_center", {
					parent_id:_this.id,
					level:3
				}).then(res => {
					if (res.code == 200) {
						if(res.data.length>0){
							for(let i=0;i<res.data.length;i++){
								if(i==0){
									res.data[i].show=false;
								}else{
									res.data[i].show=false;
								}
							}
							_this.list = res.data;
							_this.mark = 1;
						}else{
							_this.mark = 0;
						}
						
					} else {
					}
				});
			},
			searchData(){
				let _this = this;
				this.$Request("task/search_help_center", {
					keywords:this.keywords
				}).then(res => {
					if (res.code == 200) {
						if(res.data.length>0){
							for(let i=0;i<res.data.length;i++){
								if(i==0){
									res.data[i].show=false;
								}else{
									res.data[i].show=false;
								}
							}
							_this.list = res.data;
							_this.mark= 1;
						}else{
							_this.mark = 0;
						}
						
					} else {
					}
				});
			}
		},

		onLoad: function(e) {
			this.id = e.id;
			if(e.type){
				this.keywords = e.keywords;
				this.searchData();
				
			}else{
				this.loadData();
			}
			
		}
		
	}
</script>

<style>
	page {
		min-height: 100%;
		background-color: #F5F6F6;
		font-size: 30rpx;
	}
	/* 头部搜索 */
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
	/* 收缩菜单 */
	.uni-collapse-container{
		padding: 24rpx;
		font-size: 28rpx;
	}
	.collapse-item-box{
		margin-bottom: 20rpx;
	}
	.collapse-title{
		background-color: #F6BEC4;
		position: relative;
		padding: 10rpx;
		font-size: 26rpx;
	}
	.arrow-down:after{
		content: " ";
		display: inline-block;
		height: 15rpx;
		width: 15rpx;
		border-width: 1px 1px 0 0;
		border-color: #92989B;
		border-style: solid;
		-webkit-transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
		-ms-transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
		transform: matrix(0.71, 0.71, 0.71, -0.71, 0, 0);
		position: relative;
		top: -1px;
		position: absolute;
		top: 50%;
		margin-top: -10rpx;
		right: 20rpx;
	}
	.arrow-up:after{
		content: " ";
		display: inline-block;
		height: 15rpx;
		width: 15rpx;
		border-width: 1px 1px 0 0;
		border-color: #92989B;
		border-style: solid;
		-webkit-transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
		-ms-transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
		transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
		position: relative;
		top: -1px;
		position: absolute;
		top: 50%;
		margin-top: -5rpx;
		right: 20rpx;
	}
	.collaose-content-box{
		font-size: 24rpx;
		color:#B5B6B6;
		padding: 24rpx;
	}
</style>

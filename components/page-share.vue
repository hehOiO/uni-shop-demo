<template name="page-share">
	<view class="page">
		<view class="mask" v-show="showShare" @tap="btnshowShare">
			
		</view>
		
		<view class="popup popup-bottom" v-show="showShare" v-bind:style="{ height: shareHeight }">
			<view class="popup-content">
				<view class="share-title" >{{title}}</view>
				<view class="share-content">
					<swiper  class="uni-grid-9">
						<swiper-item v-for="(itemswiper,indexkey) in providerList" :key="swiperkey">
							<view class="uni-grid-9-item" v-for="(item,index) in itemswiper" :key="swiperkey1" @click="shareClick('111')">
								<image class="uni-grid-9-image" :src="item.icon"></image>
								<text class="uni-grid-9-text">{{item.name}}</text>
							</view>
						</swiper-item>
					</swiper>

					<swiper class="uni-grid-9 list-v2">
						<swiper-item>
							<view class="uni-grid-9-item" v-for="(item,index) in providerList2" :key="swiperkey2" @click="shareClick('111')">
								<image class="uni-grid-9-image" :src="item.icon"></image>
								<text class="uni-grid-9-text">{{item.name}}</text>
							</view>
						</swiper-item>
					</swiper>


				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	// 使用方法可以参考    \pages\detail\info.vue    
	var base = require('../common/lib/base.js');
	export default {
		name: "page-share",
		props: {
			providerList:[], 
			providerList2:[],
			showShare:false,
			shareHeight : {
				type: String,
				default: '40%'
			}, 
			info:[],
			title: {
				type: String,
				default: '分享'
			},
		},
		methods:{
			shareClick:function(evt){
				console.log(evt)
			},
			btnshowShare:function(){
				this.showShare = !this.showShare
			},
			getproviderList:function(){
				let _self = this; 
				var sharelist = base.fetchTool.config("sharelist"); 
				uni.getProvider({
					service: "share",
					success:function(e){
						let data = []
						for (let i = 0; i < e.provider.length; i++) {
							switch (e.provider[i]) {
								case 'weixin':
									data.push({name: '微信好友',type:'weixin_friend',icon : sharelist['share_weixin_friend'],sort:1})
									data.push({name: '朋友圈',type: 'weixin_circle',icon : sharelist['share_weixin_circle'], sort:2})
									break;
								case 'sinaweibo':
									data.push({name: '新浪微博',type: 'sinaweibo',icon:sharelist['share_weibo'], sort:3})
									break;
								case 'qq':
									data.push({name: 'QQ好友',type: 'qq',icon : sharelist['share_qq'], sort:4})
									break;
								default:
									break;
							}
						}
						data.push({name: '浏览器',type: 'browser',icon : sharelist['share_safar_android'], sort:5})
						data.push({name: '复制连接',type: 'copylink',icon : sharelist['share_copylink'], sort:5})
						data = data.sort((x,y) => {
							return x.sort - y.sort
						});

						let providerList2 = []; 
						providerList2.push({name: '收藏',type: 'like',icon : sharelist['share_like'], sort:0});
						providerList2.push({name: '举报',type: 'jubao',icon : sharelist['share_jubao'], sort:0});

						var providerList = []; // 分配结果集 四个一组 
						for (var i = 0, len = data.length; i < len; i += 4) {
	         		 		providerList.push(data.slice(i, i + 4))
	        			}
						_self.providerList = providerList;
						_self.providerList2 = providerList2;
					}
				});
			}
		},
		onLoad:function(){
			this.getproviderList(); 
		}
	}
</script>
<style>
@import "../common/uni.css";
	.mask {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.popup {
		position: fixed;
		z-index: 1001;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30px rgba(0, 0, 0, .1);
		box-shadow: 0 0 30px rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 400px;
		height: 400px;
		border-radius: 10px;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}

	.popup-content{
		height: 100%;
	}
	.popup-content-active {
  		-webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
	}
	.popup-bottom {
		bottom: 0;
		width: 100%;
		text-align: center;
	}

	.popup-bottom text {
		margin-top: 10rpx;
		line-height: 50rpx;
		font-size: 30rpx;
		color: #666;
	}
	.popup .popup-content .share-title{
	    position: relative;
	    -webkit-flex: 1;
	    flex: 1;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: center;
	    justify-content: center;
	    height: 50rpx;
	    line-height: 50rpx;
	    padding-top: 20rpx;
	    border-bottom: 2rpx solid #eee;
	    padding-bottom: 20rpx;
	    color: #333;
	}
	.uni-grid-9{
		width:auto;
		background: #ffffff;
		border-top: 0rpx;
		margin-top: 35rpx;
		height: 130rpx;
		overflow: hidden;
		overflow-x: scroll;
	}
	.uni-grid-9.list-v2{
		border-top: 2rpx solid #f8f8f8;
		height: 150rpx;
	}
	.uni-grid-9.list-v2 swiper-item{
		padding-top: 25rpx;
	}
	.uni-grid-9-item{
		width: 187.5rpx;
		border:none;
		height: 130rpx;
		float: left;
	}
	.grid-hover {
		background: none;
	}
	.uni-grid-9-image {
		width: 70rpx;
		height: 70rpx;
	}
</style>
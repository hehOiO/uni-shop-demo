<template>
	<view class="page">
		<view class="head has-bg-white" v-if="showbar ">
			<segmented-control :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></segmented-control>
		</view>
		<view v-if="current==0">
			<scroll-view class="list" scroll-y @scrolltolower="loadMore(current)" :style="'height: '+scrollHeight+'px'">
				<view class="msg-list" v-for="(item,index) in msgData[0].list" :key="index" @tap="toDetail(item.id)">
					<view class="is-size-14 text-ellipse">
						{{item.content}}
						<view class="is-size-14 is-grey has-mgt-6">{{item.addtime}}</view>
					</view>
					<view v-if="item.status==0" class="is-read"></view>
				</view>
				<view class="s-col is-col-24" v-if="msgData[0].list.length > 0">
					<load-more :loadingType="msgData[0].loadingType" :contentText="contentText"></load-more>
				</view>
				<view class="is-flex is-column is-justify-center is-align-center has-bg-white" :style="'height: '+scrollHeight+'px'" v-if="msgData[0].list.length < 1&&isLoading">
					<i class="iconfont icon-huodongyebucunzai has-desc-color" style="font-size: 280rpx;color: #DDDDDD"></i>
					<view class="has-desc-color is-size-16">暂无更多</view>
				</view>
			</scroll-view>
			
		</view>
		<view v-if="current==1">
			<scroll-view class="list" scroll-y @scrolltolower="loadMore(current)" :style="'height: '+scrollHeight+'px'">
				<view class="msg-list" v-for="(item,index) in msgData[1].list" :key="index" @tap="toDetail(item.id)">
					<view class="is-size-14 text-ellipse">
						{{item.content}}
						<view class="is-size-14 is-grey has-mgt-6">{{item.add_time}}</view>
					</view>
					<view v-if="item.is_read==0" class="is-read"></view>
				</view>
				<view class="s-col is-col-24" v-if="msgData[1].list.length > 0">
					<load-more :loadingType="msgData[1].loadingType" :contentText="contentText"></load-more>
				</view>
				<view class="is-flex is-column is-justify-center is-align-center has-bg-white" :style="'height: '+scrollHeight+'px'" v-if="msgData[1].list.length < 1&&isLoading">
					<i class="iconfont icon-huodongyebucunzai has-desc-color" style="font-size: 280rpx;color: #DDDDDD"></i>
					<view class="has-desc-color is-size-16">暂无更多</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import segmentedControl from '../../components/segmented-control.vue';
	var util = require('../../common/util.js');
	export default {
		data(){
			return {
				msgData:[
					{
						page:1,
						loadingType: 0,
						list:[
							
						]
					},
					{
						page:1,
						loadingType: 0,
						list:[
							
						]
					}
				],
				tasklist:[],
				showbar:true,
                status : 1,
                items: [
					{
						text:'站内消息',
						dotNum:0
					},
					{
						text:'用户消息',
						dotNum:0
					}
				],
				current: 0,
				activeColor: '#FA707E',
				styleType: 'text',
				userid : "", 
				scrollHeight:0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				isLoading:false
			}
		},
		components: {
			segmentedControl
		},
		onLoad:function(param) {
			var userid = this.$SysUser.openid();
			this.userid = userid;
			
		},
		onShow:function(){
			let _this = this;
			uni.getSystemInfo({//获取当前设备可用高度
				success: function (res) {
					if(res.platform=="ios"){
						_this.scrollHeight = res.windowHeight - 130;
					}else{
						_this.scrollHeight = res.windowHeight - 54;
					}
					console.log(_this.scrollHeight);
					var index = _this.current;
					_this.msgData[index].page =1;
					_this.loadData();
					_this.showTabBarDotInfo();
					_this.getTopNum();
				}
			});
		},
		onHide:function(){
			this.isLoading = false;
		},
		methods:{
			onClickItem:function(index){
				if (this.current !== index) {
					this.current = index;
				}
				if(this.current==0){
					this.msgData[0].page=1;
					this.msgData[0].loadingType = 1;
					this.loadData();
				}else{
					this.msgData[0].page=1;
					this.msgData[0].loadingType = 1;
					this.loadData();
				}
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/ucenter/security/messageDetail?id=' + id +"&type=" + this.current
				});
			},
			loadMore(e) {
				if (this.msgData[e].loadingType != 0) {
					return;
				}
				if(e==0){
					this.msgData[e].page = this.msgData[e].page + 1;
					this.loadData();
				}
				
			},
			getTopNum(){
				let _this = this;
				this.$Request("chat/msg_bar", {
					uid: this.userid,
				}).then(res => {
					if (res.code == 200) {
						_this.items = [
							{
								text:'站内消息',
								dotNum:res.data.msg
							},
							{
								text:'用户消息',
								dotNum:res.data.sys
							}
						]
					} else {
						
					}
					
				});
			},
			loadData() {
				var index = this.current;
				this.msgData[index].loadingType = 1;
				if (this.msgData[index].page == 1) {
					this.msgData[index].list = [];
				}
				if(index==0){
					this.$Request("member/loadMessage", {
						uid: this.userid,
						page: this.msgData[index].page
					}).then(res => {
						if (res.code == 200) {
							this.msgData[index].loadingType = 0;
							var data = res.data;
							data.forEach(item => {
								item['addtime'] = util.dateUtils.toDateString(item['addtime'] * 1000);
								this.msgData[index].list.push(item);
							})
						} else {
							this.msgData[index].loadingType = 2;
						}
						this.isLoading = true;
					});
				}else{
					this.$Request("chat/systemMessage", {
						uid: this.userid,
						page: this.msgData[index].page
					}).then(res => {
						if (res.code == 200) {
							this.msgData[index].loadingType = 0;
							var data = res.data;
							data.forEach(item => {
								item['add_time'] = util.dateUtils.toDateString(item['add_time'] * 1000);
								this.msgData[index].list.push(item);
							})
							console.log(this.msgData[1].list);
						} else {
							this.msgData[index].loadingType = 2;
						}
						this.isLoading = true;
					});
					
				}
				
			},
			showTabBarDotInfo: function() {
				this.$Request('task/getTabbarDot', {
					uid: this.userid,
					
				}).then(res => {
					if (res.code == 200) {
						if (res.data.length > 0) {
							res.data.forEach(item => {
								if (item.type == 'Dot') {
									uni.showTabBarRedDot({
										index: item.index
									});
								} else if (item.type == 'Badge') {
									if(item.num>=1){
										uni.setTabBarBadge({
											index: item.index,
											text: item['num'].toString()
										});
									}else{
										uni.removeTabBarBadge({
										  index: item.index,
										})
									}
								}
							});
						}else{
							
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
@import "../../static/css/base.less";
.is-read{
	width: 10rpx;
	height: 10rpx;
	background-color: rgb(255, 75, 93);
	border-radius: 100%;
	position: absolute;
	right: 24rpx;
	top: 26rpx;
}
.text-ellipse{
	white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
.segmented-control-item{
	line-height: 100rpx!important;
}
.msg-list{
	background-color: #ececec;
	// background-color: #fff;
	padding: 24rpx;
	position: relative;
	color: #646464;
}
.msg-list:after{
	content:"";
	position: absolute;
	height: 2rpx;
	width:calc(100% - 24rpx);
	left:24rpx;
	bottom: 0;
	background-color: #E2E1E0;
}
</style>

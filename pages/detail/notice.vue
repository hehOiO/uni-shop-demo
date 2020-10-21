<template>
	<view class="s-page-wrapper">
        <view class="s-row ">
            <view class="s-col is-col-24">
                <view class="s-list has-mgt-0">

                    <view class="is-item is-a has-pdtb-10" v-for="(item,index) in loglist" :key="index" @tap="toDetail(item.id)" style="background-color:rgb(243, 244, 239);">
                        <view class="is-item-bd is-oneline ">
                            <view style="font-size: 30rpx;color: rgb(59, 60, 55);">
                            	{{item.title}}
                            	<view style="color:rgb(184, 184, 184);font-size: 28rpx;margin-top: 10upx;">{{item.addtime}}</view>
                            </view>
                        </view>
                    </view>

                </view>
				<view class="s-col is-col-24" v-if="loglist.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
            </view>
        </view>
    </view>
</template>

<script>
    var util = require('../../common/util.js');
	export default {
		data(){
			return {
				userid : '', 
				loglist:[],
				page :1, 
				loadingType: 0,
					contentText: {
						contentdown: "上拉显示更多",
						contentrefresh: "正在加载...",
						contentnomore: "没有更多数据了"
					}
			}
		},
		methods:{
			loadData(type){
				
				this.loadingType = 1; 
				if (this.page == 1 ) {
					this.loglist = []; 
				}
				this.$Request("task/loadContentList",{page:this.page}).then(res=>{
					if (type=="refresh") {
						uni.stopPullDownRefresh()
					}
					if (res.code == 200 ) {
						this.loadingType = 0; 
						var data = res.data.data;
						data.forEach(item=>{
							item['addtime'] = util.dateUtils.toDateString(item['addtime']*1000,"yyyy-MM-dd");
							this.loglist.push(item);
						})
					}else{
						this.loadingType = 2; 
					}
				});
			},
			toDetail(id){
				uni.navigateTo({url:'/pages/detail/content?id='+id});
			}
		},
		onLoad:function(){
			this.loadData();
		},
		onReachBottom:function(){
			if (this.loadingType !== 0) {
				return;
			}
			this.page = this.page+1; 
			this.loadData(); 
		},
		onPullDownRefresh:function(){
			this.page = this.page+1; 
			this.loadData("refresh"); 
		},
		onNavigationBarButtonTap:function(e){
			// uni.navigateTo({url:'/pages/ucenter/score/putforward'})
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	@import "../../common/uni.css";
	@import "../../common/icon.css";
	page {
		min-height: 100%;
		background-color: @baseBackColor;
	}
	.is-oneline view{
		max-width: 90%!important;
	}
.is-p image {
	width: 100%;
	max-width: 100%;
}
</style>

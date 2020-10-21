<template>
	<view class="page">
		<view class="head has-bg-white" v-if="showbar ">
			<segmented-control :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></segmented-control>
		</view>
		
		<!-- 未接任务 -->
		<view class="s-page-wrapper" style="height: 80vh;" v-if="tasklist.length < 1">
		    <view class="is-flex is-justify-center is-align-center" style="height: calc(80vh );">
		        <view class="has-content-color is-center">您还没有接任务哦</view>
		    </view>
		</view>
		
		<view class="s-col is-col-24" v-if="tasklist.length > 0"  v-for="(item,index) in tasklist" :key="index">
			<view class="s-list2 has-bordertb" @tap="toDetail(item.order.order_sn,item.order.status)">
                <view class="is-item2 is-a">
                    <view class="is-list2-img" @longtap.stop="previewImage" :data-src="item.product.goods_picture">
                        <image :src="item.product.goods_picture" style="width:200rpx;height:200rpx;margin-right:5px;display:block;"></image>
                    </view>
                    <view class="is-list2-info has-bordert">
                        <view class="is-size-14 has-borderb has-pdb-6">{{item.order.order_sn}}<span class="has-floatr is-size-12 is-grey">{{item.order.addtime}}</span>
                        </view>	
                        <view class="has-desc-color is-size-12 has-pdt-10 is-blue is-bold">预估收入<text class="is-size-18">{{item.order.commision}}</text>元</view>
                        <view class="has-desc-color is-size-12 has-pdt-10">垫资{{item.product.goods_price*item.product.goods_num}}元
                        	<span class="has-pdl-5 is-gold">平台返款</span>
                        	<span class="has-button-view" v-if="item.order.status == 1">待操作</span>
                        	<span class="has-button-view" v-if="item.order.status == 2">待返款</span>
                        	<span class="has-button-view" v-if="item.order.status == 3">待评价</span>
                        	<span class="has-button-view" v-if="item.order.status == 5">待确认</span>
                    	</view>
                    </view>
                </view>
            </view>
		</view>


		
		<view class="s-col is-col-24" v-if="tasklist.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
	</view>
</template>

<script>
	import segmentedControl from '../../components/segmented-control.vue';
 
	export default {
		data(){
			return {
				tasklist:[],
				showbar:false,
                status : 1,
                page:1,
                items: [
					'待操作',
					'待返款',
					'发货中',
					'待确认',
				],
				current: 0,
				activeColor: '#fe6248',
				styleType: 'text',
				userid : "", 
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				buyerName: "",
				popupModal:true,
				order_sn:"",
			}
		},
		components: {
			segmentedControl
		},
		onLoad:function(param) {
            uni.setNavigationBarTitle({
                title: param.title||"任务列表"
            });
            this.status = param.status
            if (param.type) {
            	this.showbar = true; 
            }else{
            	this.showbar = false; 
            }
            var userid = this.$SysUser.openid();
            this.userid = userid; 
			this.loadData(); 
		},
		onShow:function(){
			var userid = this.$SysUser.openid();
			if(!userid){
				uni.showToast({
					title:"您还未登录！",
					icon:"none"
				});
				uni.navigateBack();
			}
		},
		onReachBottom:function(){
			if (this.loadingType !== 0) {
				return;
			}
			this.page = this.page+1; 
			this.loadData(); 
		},
		onNavigationBarButtonTap:function(e){
			uni.navigateTo({url:'/pages/task/search'})
		},
		onPullDownRefresh :function(){
			this.page = 1; 
			this.loadData(); 
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods:{
			onClickItem:function(index){
				// 0已关闭，关闭原因参考close_type；1已生成订单；2已提交待审核；3已发货，待评价（已返款）；4已评价（待商家确认）；5已确认并返还佣金；6申诉中；7申诉完结（待确认） 6，已确认 订单完成 
				var status = [1,2,3,4,6]; // 对应数据库字段值 
				if (this.current !== index) {
					this.current = index;
				}
				this.status = status[index]; 
				this.page = 1; 
				uni.showLoading({title: '加载中...'});
				this.loadData(true);
			},
			previewImage:function(e){
				var src = e.currentTarget.dataset.src; 
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage([src]);
				//#endif
			},
			loadData:function(hideload){
				this.loadingType = 1; 
				if (this.page == 1 ) {
					this.tasklist = []; 
				}
				
				this.$Request("task/getTasklist",{status:this.status,uid:this.userid,page:this.page,model:3}).then(res=>{
					hideload && uni.hideLoading();
					if (res.code == 200 ) {
						this.loadingType = 0; 
						var data = res.data.data;
						data.forEach(item=>{
							this.tasklist.push(item);
						})
					}else{
						this.loadingType = 2; 
					}
				});
			},
			toDetail:function(order_sn,status){
				uni.navigateTo({url:'/pages/task/order_info?order_sn='+order_sn}); 
			}
		}
	}
</script>

<style lang="less">
@import "../../static/css/base.less";
	.newTaskPopup {
		width: 80%;
		border-radius: 10rpx;
		height: 230rpx;
	}
.segmented-control-item{
	line-height: 100rpx!important;
}
.has-button-view{
	position: relative;
	right: -100rpx;
	top: -40rpx;
	width: 30%!important;
	border:none;
	background: #108ee9;
	color: #fff;
	height: 70rpx;
	line-height: 70rpx;
	font-size: 26rpx;
	padding: 10rpx 40rpx;
	border-radius: 5rpx;
}
.has-button-view:nth-child(1){
	background: #108ee9;
}
.has-button-view:nth-child(2){
	background: #FF5722;
}
.has-button-view:nth-child(3){
	background: #f48c02;
}
.has-button-view:nth-child(4){
	background: #2F4056;
}
.popupMain{
	width: 100%;
}
.popup-content{
	min-width:100%;
}
.popup-content-btn{
	border-top: 1px solid #eee;
	height: 100rpx;
	line-height: 100rpx;
}
.popup-content-btn .confirm{
	width: 50%;
	float: left;
}
.popup-content-btn .cancel{
	width: 50%;
	float: right;
}
.popup-content .is-input{
	height: 95rpx;
	line-height: 75rpx;
}
</style>

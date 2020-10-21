<template>
	<view class="page">

		<view class="s-col is-col-24" style="position: fixed;z-index: 9999;">
			<view class="s-list" style="margin-top: 0upx;">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 搜索 -->
	                		<view class="input-answer">
	                			<input type="text" :value="keywords" @input="BindInput" focus placeholder="输入订单编号或关键词">
	                			<button @tap="loadData">搜索</button>
	                		</view>
							<!-- 搜索 -->
						</view>
                    </view>
				</view>
            </view>
		</view>


		<view style="padding-top: 150rpx;">
			<view class="s-col is-col-24" v-if="tasklist.length > 0"  v-for="(item,index) in tasklist" :key="index" >
				<view class="s-list2 has-bordertb"  @tap="toDetail(item.order.order_sn)">
			        <view class="is-item2 is-a">
			            <view class="is-list2-img" @longtap="previewImage" :data-src="item.product.goods_picture">
			                <image :src="item.product.goods_picture" style="width:200rpx;height:200rpx;margin-right:5px;display:block;"></image>
			            </view>
			            <view class="is-list2-info has-bordert">
			                <view class="is-size-14 has-borderb has-pdb-6">{{item.order.buyer_name}}<span class="has-floatr is-size-12 is-grey">{{item.order.addtime}}</span>
			                </view>	
			                <view class="has-desc-color is-size-18 has-pdt-10 is-blue is-bold">￥{{item.product.product_keywrods.basic_amount}}</view>
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
			<view class="s-col is-col-24" >
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
		</view>
		
		<!-- <view class="s-col is-col-24" v-if="contentText.contentdown=='输入关键词进行搜索'" style="margin-top: 300rpx;">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view> -->
		
	</view>
</template>

<script>
	import segmentedControl from '../../components/segmented-control.vue';
	export default {
		data(){
			return {
				tasklist:[],
                page:1,
				userid : "", 
				loadingType: 0,
				contentText: {
					contentdown: "输入关键词进行搜索",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				keywords:"",
			}
		},
		components: {
			segmentedControl
		},
		onLoad(param) {
			var userid = this.$SysUser.openid();
            this.userid = userid; 
		},
		onShow:function(){
			var userid = this.$SysUser.openid();
			if(!userid){
				uni.navigateTo({url:'/pages/ucenter/login'})
			}
		},
		onReachBottom:function(){
			if (this.loadingType == 2) {
				return;
			}
			this.page = this.page+1; 
			this.loadData(); 
		},
		methods:{
			previewImage:function(e){
				var src = e.currentTarget.dataset.src; 
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage([src]);
				//#endif
			},
			BindInput:function(e){
				var value   = e.detail.value;
				this.keywords = value; 
			},
			loadData:function(){
				if (this.page == 1&&this.keywords!="") {
					this.tasklist = []; 
				}
				if (this.keywords == "") {
					uni.showToast({
						title:"输入订单编号或关键词在进行搜索",
						icon:"none"
					});
					return false; 
				}
				this.loadingType = 1; 
				this.$Request("task/getTasklist",{keywords:this.keywords,uid:this.userid,page:this.page,platform:'pinduoduo'}).then(res=>{
					if (res.code == 200 ) {
						if(res.data.data.length==0){
							this.loadingType = 2; 
						}else{
							this.loadingType = 1; 
							var data = res.data.data;
							data.forEach(item=>{
								this.tasklist.push(item);
							})
						}
						
					}else{
						this.loadingType = 2; 
					}
				});
			},
			toDetail:function(order_sn){
				uni.navigateTo({url:'/pages/task/order_info?order_sn='+order_sn}); 
			}
		}
	}
</script>

<style lang="less">
@import "../../static/css/base.less";
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
.input-answer input{
	width: 75%;float: left;
	height: 70rpx;
	border:1px solid #eee;
	line-height: 70rpx;
	padding-left:6px;
	font-size: 30rpx;
}
.input-answer button{
	width: 20%;float: right;
	border:none;
	background: @baseBackGroundColor;
	color: #fff;
	height: 70rpx;
	line-height: 70rpx;
	font-size: 30rpx;
}
.form-senddata{
	width: 100%;
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
</style>

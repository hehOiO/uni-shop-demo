<template>
	<view class="page">
		<view class="head" style="background-color: rgb(245, 247, 246);border-bottom: 2rpx solid #E2E1E0;" v-if="showbar ">
			<segmented-control :values="items" @clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor"></segmented-control>
		</view>
		<view class="is-flex is-column is-justify-center is-align-center" style="height: 90vh;background-color: rgb(245, 247, 246);" v-if="tasklist.length < 1&&isLoading">
			<i class="iconfont icon-huodongyebucunzai has-desc-color" style="font-size: 280rpx;color: #DDDDDD"></i>
			<view class="has-desc-color is-size-16">暂无更多</view>
		</view>
		<view class="s-col is-col-24" v-if="tasklist.length > 0&&isLoading"  v-for="(item,index) in tasklist" :key="index">
			<view class="s-list2 has-bordertb" @tap="toDetail(item.order.order_sn)">
                <view class="is-item2 is-a" style="background-color: #F5F7F6;">
                    <view class="is-list2-img" :data-src="item.product.goods_picture">
                        <image :src="item.product.goods_picture" style="width:200rpx;height:200rpx;margin-right:5px;display:block;"></image>
                    </view>
                    <view class="is-list2-info has-bordert" style="padding-right: 20rpx;justify-content: space-between;">
						<view style="display: flex;align-items: center;justify-content: space-between;padding-bottom: 10rpx;border-bottom: 1px solid #DBDDDC;">
							<view class="" style="width:50%;color: #828483;font-size: 30rpx;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">{{item.order.buyer_name}}</view>	
							<view class="has-floatr" style="color: #B5B7B6;font-size: 28rpx;width: 40%;text-align: right;">{{item.order.addtime}}</view>
						</view>
						<view >
							<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
								<view style="font-size: 42rpx;color: #EC7F8B;">￥{{item.order.commision}}</view>
								<view>
									<span class="has-button-view" v-if="item.order.status == 1">待操作</span>
									<span class="has-button-view" v-if="item.order.status == 2">待返款</span>
									<span class="has-button-view" v-if="item.order.status == 3">待评价</span>
									<span class="has-button-view" v-if="item.order.status == 4">待确认</span>
								</view>
							</view>
							<view style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
								<view class="">
									<span style="color: #9C9D9F;font-size: 24rpx;">垫资{{item.product.goods_price*item.product.goods_num}}元</span>
									<span style="color: #C97388;font-size: 24rpx;padding-left: 10rpx;">平台返款</span>
								</view>
								<view v-show="item.order.status==1"><span style="font-size: 24rpx;color:#922F3E;">提交倒计时:{{h}}:{{i}}:{{s}}</span></view>
							</view>
						</view>
                    </view>
                </view>
            </view>
		</view>
		<view class="s-col is-col-24" v-if="tasklist.length > 0&&isLoading">
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
				h: '00',
				i: '00',
				s: '00',
				leftTime: 0,
				setTime: null,
				showbar:false,
                status : 1,
                page:1,
                items: [
					{text:"待操作"},// {text:"待操作","dotNum":5}, 
					'待返款',
					'发货中',
					'待确认',
				],
				current: 0,
				activeColor: '#FB7180',
				styleType: 'text',
				userid : "", 
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				model:'',
				isLoading:false,
				
			}
		},
		components: {
			segmentedControl
		},
		onLoad:function(param) {
            uni.setNavigationBarTitle({
                title: param.title
            });
            this.status = param.status
			this.model=param.model;
            if (param.type) {
            	this.showbar = true; 
            }else{
            	this.showbar = false; 
            }
            var userid = this.$SysUser.openid();
            this.userid = userid; 
			
		},
		onShow:function(){
			this.isLoading = false;
            var userid = this.$SysUser.openid();
			if(!userid){
				uni.showToast({
					title:"您还未登录！",
					icon:"none"
				});
				uni.navigateBack();
			}else{
				uni.showLoading({title: '加载中...'});
				this.loadHeaderDot(); 
				this.loadData(); 
				
			}
			
		},
		onHide:function(){
			this.isLoading = false;
		},
		onReachBottom:function(){
			if (this.loadingType !== 0) {
				return;
			}
			this.page = this.page+1; 
			this.loadData(); 
		},
		onNavigationBarButtonTap:function(e){
			uni.navigateTo({url:'/pages/task/searchJd'})
		},
		onPullDownRefresh :function(){
			this.page = 1; 
			this.loadData(); 
			this.loadHeaderDot(); 
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		beforeDestroy() {
			clearInterval(this.setTime)
		},
		methods:{
			resetTimer:function(){
				var timer = this.tasklist[0].order.order_expire_time_str;
				// var timer = "2019-05-27 17:35:44";
				var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
				var res = timer.match(reg);
				if (res == null) {
					console.log('时间格式错误');
					return false;
				} else {
					var year = parseInt(res[1]);
					if (year < 1000) {
						console.log('时间格式错误');
						return false;
					}
					var month = parseInt(res[2]);
					var day = parseInt(res[3]);
					var h = parseInt(res[4]);
					if (h < 0 || h > 24) {
						console.log('时间格式错误');
						return false;
					}
					var i = parseInt(res[5]);
					if (i < 0 || i > 60) {
						console.log('时间格式错误');
						return false;
					}
					var s = parseInt(res[6]);
					if (s < 0 || s > 60) {
						console.log('时间格式错误');
						return false;
					}
					var leftTime = new Date(year, month - 1, day, h, i, s);
					this.leftTime = leftTime;
					this.countDown(this);
					this.setInterValFunc(this);
				}
			},
			setInterValFunc: function(obj) {
				this.setTime = setInterval(function() {
					obj.countDown(obj);
				}, 1000);
			},
			countDown: function(self) {
				var leftTime = self.leftTime - new Date();
				if (leftTime > 0) {
					var hours = parseInt(leftTime / 1000 / 60 / 60, 10);
					var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
					var seconds = parseInt(leftTime / 1000 % 60, 10);
				} else {
					var hours = 0,
						minutes = 0,
						seconds = 0;
				}
				if (hours < 10) {
					hours = '0' + hours;
				}
				if (minutes < 10) {
					minutes = '0' + minutes;
				}
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				self.h = hours;
				self.i = minutes;
				self.s = seconds;
			},
			onClickItem:function(index){
				// 0已关闭，关闭原因参考close_type；1已生成订单；2已提交待审核；3已发货，待评价（已返款）；4已评价（待商家确认）；5已确认并返还佣金；6申诉中；7申诉完结
				var status = [1,2,3,4,6]; // 对应数据库字段值 
				if (this.current !== index) {
					this.current = index;
				}
				this.status = status[index]; 
				this.page = 1; 
				uni.showLoading({title: '加载中...'});
				this.loadData(true);
			},
			loadData:function(hideload){
				let _this = this;
				this.loadingType = 1; 
				if (this.page == 1 ) {
					this.tasklist = []; 
				}
				this.$Request("task/getTasklist",{status:this.status,uid:this.userid,page:this.page,model:this.model,platform:'jd'}).then(res=>{
					hideload && uni.hideLoading();
					if (res.code == 200 ) {
						this.loadingType = 0; 
						var data = res.data.data;
						data.forEach(item=>{
							this.tasklist.push(item);
						})
						if(this.tasklist.length>0){
							this.resetTimer();
						}
					}else{
						this.loadingType = 2; 
					}
					uni.hideLoading();
					_this.isLoading = true;
				});
			},
			toDetail:function(order_sn){
				// uni.navigateTo({url:'/pages/task/order_info?order_sn='+order_sn})
				 uni.navigateTo({
				 	url: '/pages/index/new_detailJd?order_sn='+order_sn
				 });
			},
			loadHeaderDot:function(){
				if(!this.showbar ){
					return false; 
				}
				this.$Request("task/getTaskHeadDotNum",{
					uid:this.userid,
					model:this.model,
					platform:'jd'
				}).then(res=>{
					if(res.code==200){
						var dotData = [];
						if(res.data['status1'] > 0 ){
							dotData.push({text:"待操作",dotNum:res.data['status1']}); 
						}else{
							dotData.push({text:"待操作"}); 
						}
						if(res.data['status2'] > 0 ){
							dotData.push({text:"待返款",dotNum:res.data['status2']}); 
						}else{
							dotData.push({text:"待返款"}); 
						}
						if(res.data['status3'] > 0 ){
							dotData.push({text:"发货中",dotNum:res.data['status3']}); 
						}else{
							dotData.push({text:"发货中"}); 
						}
						if(res.data['status4'] > 0 ){
							dotData.push({text:"待确认",dotNum:res.data['status4']}); 
						}else{
							dotData.push({text:"待确认"}); 
						}
						this.items =  dotData;
					}
				})
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
	width: 30%!important;
	border:none;
	background: #108ee9;
	color: #fff;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 26rpx;
	padding: 10rpx 40rpx;
	border-radius: 10rpx;
}
.has-button-view:nth-child(1){
	background: #FA707F;
}
.has-button-view:nth-child(2){
	background: #FA707F;
}
.has-button-view:nth-child(3){
	background: #FA707F;
}
.has-button-view:nth-child(4){
	background: #FA707F;
}
</style>

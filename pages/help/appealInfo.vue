<template>
	<view class="s-page-wrapper">
		<view class="order-info" v-if="product">
			<view class="s-col is-col-24" >
				<view class="s-list2 has-bordertb">
					<view class="is-item2 is-a" @tap="toOrderInfo(order.order_sn)">
						<view class="is-list2-img">
							<image :src="product.goods_picture" style="width:200rpx;height:200rpx;margin-right:5px;display:block;"></image>
						</view>
						<view class="is-list2-info has-bordert">
							<view class="has-desc-color is-size-16" @tap="copyOrderSn(info.id,'申诉编号')">申诉编号：<span class="is-blue has-pdr-5">{{info.id}}</span></view>
							<view class="has-desc-color is-size-16">小二介入：<span class="is-blue has-pdr-5">
								<text class="is-red" v-if="info.step == 2 ">已介入</text>
								<text class="is-black" v-if="info.step == 1 ">未介入</text>
								</span>
							</view>
							<view class="has-desc-color is-size-16">申诉状态：<span class="is-blue has-pdr-5">
								<text class="is-red" v-if="info.status == 0 ">申诉中</text>
								<text class="is-black" v-if="info.status == 1 ">申诉结束</text>
								</span>
							</view>
							<view class="has-desc-color is-grey is-size-12 has-mgt-5">
								Ps：点击右上角可以申请平台小二介入或回复新证据哦~
							</view>
						</view>
					</view>
					<view class="is-item has-pdtb-10" @tap="copyOrderSn(order.order_sn,'订单编号')">
						<view class="is-item-hd has-desc-color is-size-14">
							<view>订单编号：</view>
						</view>
						<view class="is-item-ft is-right is-black">
							{{order.order_sn}}
						</view>
					</view>
					<!-- <view class="is-item has-pdtb-10" @tap="contactMall()">
						<view class="is-item-hd has-desc-color is-size-14">
							<view>店铺名称：</view>
						</view>
						<view class="is-item-ft is-right is-black">
							{{product.store_name}}<text class="is-size-12 is-grey">（点击可联系商家）</text>
						</view>
					</view> -->
					<view class="is-item has-pdtb-10" v-if="info.status == 1 ">
						<view class="is-item-hd has-desc-color is-size-14">
							<view>申诉结果：</view>
						</view>
						<view class="is-item-ft is-right is-black">
							{{info.info_desc}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="order-chat" v-if="messages">
			<view class="layim-chat-main" v-for="(message,index) in messages" :key="index">
				<view class="layim-chat-li" v-if="message.send_message_type == 'mall' ">
					<view class="layim-chat-user">
						<image :src="defaultAvatar"></image>
						<text v-if="message.system == 1 ">平台小二</text>
						<text v-if="message.system == 0 ">商家</text>
					</view>
					<view class="layim-chat-text layim-chat-system" v-if="message.system == 1 ">
						<view class="">{{message.content}}</view>
						<view class="layim-chat-image" v-if="message.attach.length > 0 ">
							<block  v-for="(pic,picindex) in message.attach" :key="picindex">
								<image v-if="pic != ''" @tap="previewimage(index,pic)" :src="pic" mode="widthFix" class="is-response"></image>
							</block>
						</view>
					</view>
					<view class="layim-chat-text" v-if="message.system == 0 ">
						{{message.content}}
						<view class="layim-chat-image" v-if="message.attach.length > 0 ">
							<block  v-for="(pic,picindex) in message.attach" :key="picindex">
								<image v-if="pic != ''" @tap="previewimage(index,pic)" :src="pic" mode="widthFix" class="is-response"></image>
							</block>
						</view>
					</view>
				</view>
				<view class="layim-chat-li layim-chat-mine" v-if="message.send_message_type == 'my' ">
					<view class="layim-chat-user">
						<image :src="defaultAvatar"></image>
						<text v-if="message.system == 1 ">平台小二</text>
						<text v-if="message.system == 0 ">我</text>
					</view>
					<view class="layim-chat-text layim-chat-system" v-if="message.system == 1 ">
						<view class="">{{message.content}}</view>
						<view class="layim-chat-image" v-if="message.attach.length > 0 ">
							<block  v-for="(pic,picindex) in message.attach" :key="picindex">
								<image v-if="pic != ''" @tap="previewimage(index,pic)" :src="pic" mode="widthFix" class="is-response"></image>
							</block>
						</view>
					</view>
					<view class="layim-chat-text" v-if="message.system == 0 ">
						{{message.content}}
						<view class="layim-chat-image" v-if="message.attach.length > 0 ">
							<block  v-for="(pic,picindex) in message.attach" :key="picindex">
								<image v-if="pic != ''" @tap="previewimage(index,pic)" :src="pic" mode="widthFix" class="is-response"></image>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 新手提示 -->
		<view class="new-user-tips" v-if="show_tips_mask" @tap="closeTipsMask">
			<view class="tips-mask"></view>
			<view class="push-add-applea">
				<image src="../../static/images/task/push-add-applea.png" mode="widthFix" class="is-response"></image>
			</view>
			<view class="push-add-applea-tips">
				<image src="../../static/images/task/push-add-applea-tips.png" mode="widthFix" class="is-response"></image>
			</view>
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_sn:"",
				userid :  "",
				info:[],
				order:[],
				product:[],
				defaultAvatar : '',
				messages:[],
				show_tips_mask:false,
				topNav:{
					show:false
				},
				page:1,
				itemid:"",
			};
		},
		onLoad:function(e){
			this.order_sn = e.order_sn; 
			this.itemid = e.itemid; 
			var userid = this.$SysUser.openid();
			if(!userid){
				uni.navigateTo({url:'/pages/ucenter/login'})
			}
			var show_tips_mask = this.$Cache.get("show_appeal_tips_mask");
			this.show_tips_mask = !show_tips_mask; 
			this.defaultAvatar = this.$Sysconf('imagelist.defaultAvatar'); 
			this.userid = userid; 
			
		},
		onShow:function(){
			this.loadData();
		},
		onNavigationBarButtonTap:function(){
			if(this.info.status == 1){
				uni.showToast({
					title:"申诉已结束",
					icon:"none" 
				})
				return false;
			}
			// 申请平台小二介入 
			this.topNavClose(); 
		},
		onReachBottom:function(){
			if (this.loadingType !== 0) {
				return;
			}
			this.page = this.page+1; 
			this.loadDataMessage(); 
		},
		methods:{
			copyOrderSn:function(order_sn,text){
				uni.setClipboardData({
					data:order_sn.toString(),
					success:function(){
						uni.showToast({
							title:text+"复制成功",
							icon:"none",
						});
					}
				})
			},
			push_new_comment:function(){
				var order_sn = this.info.order_sn; 
				var itemid = this.info.id; 

				// 发布新证据
				uni.navigateTo({
					url:"/pages/task/appeal?order_sn="+order_sn+"&type=comment&itemid="+itemid,
				})
			},
			contactMall:function(){
				var mall_id = this.info.mall_id; 
				uni.navigateTo({
					url:"/pages/message/chat?userid="+mall_id,
				})
			},
			topNavClose:function(){
				uni.showActionSheet({
					itemList:['我有话说','小二介入','撤销投诉'],
					success:(res=>{
						console.log(res.tapIndex );
						if(res.tapIndex == 0 ){
							this.push_new_comment();
						}else if(res.tapIndex == 1) {
							this.appeal_task_waiter();
						}else if(res.tapIndex == 2){
							this.appeal_task_clear(); 
						}
					})
				}); 
			},
			closeTipsMask:function(){
				this.$Cache.put("show_appeal_tips_mask",true);
				this.show_tips_mask = false; 
			},
			toOrderInfo:function(order_sn){
				uni.navigateTo({
					url:"/pages/index/new_detail?order_sn="+order_sn
				})
			},
			loadDataMessage:function(){
				this.loadData("yes");
			},
			loadData:function(action){
				this.$Request("task/appeal_detail",{
					uid:this.userid,
					order_sn:this.order_sn||"",
					load_log:action||"",
					page:this.page,
					itemid:this.itemid||"",
				}).then(res=>{
					if(res.code == 200 ){
						if(action == "yes"){
							var logs = res.data.product_appeal_log;
							logs.forEach(item=>{
								this.messages.push(item); 
							});
						}else{
							this.info = res.data.info;
							this.order = res.data.order;
							this.product = res.data.product;
							this.messages = res.data.product_appeal_log; 
						}
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						});
						setTimeout(function(){
							uni.navigateBack({})
						},1500);
					}
				}).catch(err=>{
					uni.navigateBack({})
				}); 
			},
			appeal_task_waiter:function(){
				if(this.info.step == 2){
					uni.showToast({
						title:"您已申请小二介入了，不要重复申请",
						icon:"none"
					})
					return false;
				}
				
				uni.showModal({
					title:"申请小二介入",
					content: '申请小二介入前请先和商家沟通解决，如实在无法沟通解决再申请小二介入，小二进行仲裁解决会对错误方进行处罚，多次胡乱占用平台资源的用户将会被限制登录哦~',
					confirmText:"确定申请",
					cancelText:"我再想想",
					success:(er=>{
						if(er.confirm){
							this.$Request("task/appeal_task_waiter",{
								uid:this.userid,
								itemid:this.info.id,
							}).then(req=>{
								uni.showToast({
									icon:"none",
									title:req.msg,
								})
								if(req.code == 200 ){
									this.info.step = 2; 
								}
							}).catch(err=>{
								uni.showToast({
									title:"系统繁忙，请稍后再试",
									icon:"none"
								})
							})
						}
					})
				})
				

			},
			appeal_task_clear:function(){
				if(this.info.position == 1){
					uni.showModal({
						title:"取消投诉",
						content: '该投诉是商家发起的，您无权取消，若您和商家已达成协议，可以申请商家取消~',
						confirmText:"我知道了",
						showCancel:false,
					})
					return false; 
				}
				uni.showModal({
					title:"取消投诉",
					content:  '您确定和商家达成协议并取消投诉？ 若商家未兑现承诺，取消投诉后您还可以再次申请投诉哦~',
					showCancel:true,
					success:(em=>{
						if(em.confirm){
							this.$Request("task/appeal_task_clear",{
								uid:this.userid,
								itemid:this.info.id,
							}).then(req=>{
								uni.showToast({
									icon:"none",
									title:req.msg,
								})
								if(req.code == 200 ){
									this.info.status = 1; 
									this.info.info_desc = "买手主动取消投诉"; 
								}
							}).catch(err=>{
								uni.showToast({
									title:"系统繁忙，请稍后再试",
									icon:"none"
								})
							})
						}
					})
				})

			},
			previewimage:function(index,src){
				// 预览图片 
				var info = this.messages[index];
				try{
					var image = [];
					info['attach'].forEach((item)=>{
						if(item != ""){
							image.push(item);
						}
					});
					if(image){
						// uni.previewImage({
						// 	current:src,
						// 	urls:image,
						// 	loop:true,
						// 	indicator:"default",
						// })
						plus.nativeUI.previewImage(image,{
							current:index
						});
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>
.new-user-tips{
	position: fixed;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 200;
}
.new-user-tips .tips-mask{
	width: 100%;
	height: 100%;
	background: #333333;
	opacity: 0.9;
}
.new-user-tips .push-add-applea{
	width: 267upx;
	height: 212upx;
	position: absolute;
	right: 5upx;
	top: -6upx;
}
.new-user-tips .push-add-applea-tips{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 99;
}
.topNavClose{
	position: fixed!important;
	top: 136upx!important;
	right: 10upx!important;
	border-radius: 10upx;
}

.order-info{
	position: fixed;
	top: 0px;
	width: 100%;
	max-height: 200upx;
	z-index: 100;
}
.order-chat{
	margin-top: 520upx;
}
.layim-chat-main {
    width: 100%;
    bottom: 85px;
    padding: 15px;
    -webkit-box-sizing: border-box!important;
    -moz-box-sizing: border-box!important;
    box-sizing: border-box!important;
}
.layim-chat-main .layim-chat-li {
    position: relative;
    font-size: 0;
    margin-bottom: 20rpx;
    padding-left: 120rpx;
    min-height: 140rpx;
}
.layim-chat-main .layim-chat-li-image{
/*    max-height: 210rpx; */
}
.layim-chat-text, .layim-chat-user {
    display: inline-block;
    vertical-align: top;
    font-size: 30rpx;
}
.layim-chat-user {
    position: absolute;
    left: 6rpx;
}
.layim-chat-user text {
    position: absolute;
    left: 0upx;
    top: 76upx;
    width: 80rpx;
    line-height: 48upx;
    font-size: 24upx;
    white-space: nowrap;
    color: #999;
    text-align: center;
    font-style: normal;
}
.layim-chat-user image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 100%;
}
.layim-chat-text {
    position: relative;
    min-height: 44rpx;
    line-height: 44rpx;
    padding: 16rpx 30rpx;
    background-color: #fff;
    border-radius: 6rpx;
    color: #333;
    word-break: break-all;
    max-width: 70%;
}
.layim-chat-system{
    background-color: #FF5722!important;	
	color: #FFFFFF;
}

.layim-chat-image{
	width: 200upx;
	height: auto;
/* 	max-height: 200upx; */
	padding: 0rpx;
	overflow:hidden;
    padding: 10rpx;
    background-color: #fff;
    border-radius: 6rpx;
    color: #333;
    word-break: break-all;
    max-width: 70%;
}
.layim-chat-image image{
	max-height: 190upx!important;
}
.layim-chat-text:after {
    content: '';
    position: absolute;
    left: -20rpx;
    top: 26rpx;
    width: 0;
    height: 0;
    border-style: solid dashed dashed;
    border-color: #fff transparent transparent;
    overflow: hidden;
    border-width: 20rpx;
}
.layim-chat-system:after{
    border-color: #FF5722 transparent transparent!important;
}
.layim-chat-image:after{
/* 	border: none; */
}
.layim-chat-main .layim-chat-mine {
    text-align: right;
    padding-left: 0;
    padding-right: 120rpx;
}
.layim-chat-mine .layim-chat-user {
    left: auto;
    right: 6rpx;
}
.layim-chat-mine .layim-chat-text {
    margin-left: 0;
    text-align: left;
    background-color: #5FB878;
    color: #fff;
}
.layim-chat-mine .layim-chat-text:after {
    left: auto;
    right: -20rpx;
    border-top-color: #5FB878;
}
.layim-chat-image-face{
	width: 44upx!important;
	height: 44upx!important;
	padding:16rpx 30rpx;
	background-color:#fff;
	border-radius:6rpx;
	color:#333;
	word-break:break-all;
	max-width:70%;
}
</style>

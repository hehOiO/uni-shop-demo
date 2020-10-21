<template>
	<view>
		<view id="newDetailContainer" v-show="order.status > 0&&isLoading">
			<view class="tab-bar-container">
				<view :class="show==1?'active':''" @tap="chooseTab(1)">商家信息</view>
				<view :class="show==3?'active':''" @tap="chooseTab(3)">注意事项</view>
			</view>
			<view class="tab-container-box" v-if="show==1">
				<view class="product-info-box">
					<image :src="product.goods_picture" mode="scaleToFill"></image>
					<view class="info-text" style="font-size: 30rpx;">
						<view class="ellipsis" ><span>抖音昵称：</span>
							{{product.video_user_name?product.video_user_name:'-'}}
						</view>
						<view class="ellipsis" ><span>抖音号码：</span>{{product.video_user_id?product.video_user_id:'-'}}</view>
						<view class="ellipsis"><span>任务编号：</span>{{order.order_sn}}</view>
						<view class="ellipsis" ><span>可得佣金：</span>
							<span style="color: #FF4B5E;padding-right:6upx;">{{order.commision}}</span>元
						</view>
					</view>
				</view>
				<view class="goods-title" style="margin-top: 0;border-top:12rpx solid #E2E1E0">
					<span>视频标题：</span>
					<view>{{product.goods_title}}</view>
				</view>
				<view class="goods-title" v-if="order.model!=6">
					<span>查找途径：</span> <view style="font-weight: 900;color: #FF4B5E;">{{product.video_search_type==0?'视频链接':'抖音码'}}</view>
				</view>
				<view class="goods-title" >
					<span>商家要求：</span>
					<view style="color: #FF4B5E;">
						{{product.remark?product.remark:"此商家没有额外的要求"}}
					</view>
				</view>
				<view class="goods-title" style="border-top:12rpx solid #E2E1E0">
					<span>下单信息：</span>
					<view class="get-order-info">
						<view style="font-weight: 900;">{{product.platform_name}}{{product.product_platform}} <span style="color:rgb(255, 75, 94);padding-left: 20rpx;"></span></view>
						<view class="order-buyer-name" v-if="order.model!=2">
							<span>单件价格：</span>
							<view><span style="color: #FF4B5E;padding-right:6upx;">{{product.total_goods_price}}</span>元</view>
						</view>
						<view class="order-buyer-name">
							<span>下单买号：</span>
							<view>
								<span style="color: #FF4B5E;margin-right: 10rpx;">{{order.buyer_name}}</span>
							</view>
						</view>
						<view class="order-buyer-name" v-if="order.model!=2">
							<span>需拍件数：</span>
							<view><span style="color: #FF4B5E;padding-right:6upx;">{{product.goods_num}}</span>件</view>
						</view>
					</view>
				</view>
				<view class="goods-title" style="border-top:12rpx solid #E2E1E0" v-if="order.model!=2">
					<span>评价要求：</span>
					<view>
						<view>{{product.product_keywrods.modeltype_str}}</view>
					</view>
				</view>
				<view style="border-top:12rpx solid #E2E1E0;padding:30rpx 24rpx;background-color:#ececec;" v-if="isLoading&&order.status<2&&order.order_expire_time > 0">
					<view class="is-item timer-box" style="justify-content: center;" >
						<view class="is-item-hd" style="font-size: 34rpx;font-weight: 900;" v-if="order.check_time==0">
							上传凭证时间:
						</view>
						<view class="is-item-hd" style="font-size: 34rpx;font-weight: 900;" v-if="order.check_time>0&&nowDate<order.submit_time">
							预售时间（不可下单）:
						</view>
						<view class="is-item-hd" style="font-size: 34rpx;font-weight: 900;" v-if="order.check_time>0&&nowDate>=order.submit_time">
							距离任务关闭:
						</view>
						<view>
							<uni-countdown ref="countdownView" font-color="#fff" splitor-color="#333" show-hide="none" bgr-color="#333" border-color="#fffff" splitorTextl=":"
							 splitorTextr=":" :timer="order.order_expire_time_str"></uni-countdown>
						</view>
					</view>
				</view>
			</view>
			<view class="tab-container-box note-box" v-if="show==3">
				<view>1、平台中接收任务的抖音号必须和抖音实际浏览视频的帐号一致。</view>
				<view>2、注意查看任务要求，按照视频连接或是抖音码查找到指定视频，请勿浏览错误视频。</view>
				<view>3、视频需要关注和评论的，请自由发挥评论，不得少于15个字。</view>
				<view>4、严禁在下方评论“刷单”、“信誉”、“任务”平台名称等敏感词语，有问题可以发起申诉。</view>
				<view>5、恶意提交与任务无关的图片将根据刷手处罚规则进行处罚。</view>
			</view>
			<view id="footer">
				<view v-if="order.status<=1" :class="[order.status > 1?'disabledBtn':'']" @tap="clearOrder">取消</view>
				<view v-if="order.status==1" :class="[order.status!=1?'disabledBtn':'']"   @tap="submitOrder">点击去做单</view>
				
				<!-- 如果订单状态是已经提交过的任务 且未申诉的任务 可以申诉 -->
				<view v-if="order.status > 1 && order.apply_status ==0 && order.apply_time == 0 " @tap="appealOrder">申述任务</view>
				<!-- 如果订单状态是已经提交过的任务 且已完成的申诉如买手对申诉不满意可以再次发起申诉 -->
				<view v-if="order.status > 1 && order.apply_status ==0 && order.apply_time > 0 " @tap="appealOrder">再次申诉</view>
				<!-- 申诉中的任务可查看详情 -->
				<view v-if="order.apply_status == 1" @tap="appealInfo">申诉详情</view>
				<view v-if="order.status>1" @tap="toProgress(order.order_sn)">任务进度</view>
			</view>
			<uni-popup :show="popupModal" type="middle newTaskPopup" @hidePopup="onClose">
				<view class="popup-content">
					<view class="popup-content-form has-pd-10">
						<input type="text" :value="buyerName" @input="bindInput" class="is-input" placeholder="请输入对方买号昵称" />
					</view>
					<view class="popup-content-btn">
						<view class="is-center confirm has-borderr" @tap="onSubmit">确认</view>
						<view class="is-center cancel" @tap="onClose">取消</view>
					</view>
					<view class="s-row"></view>
				</view>
				
			</uni-popup>
		</view>
		
		<view v-show="order.status<=0&&isLoading">
			<view class="content s-page-wrapper">
				<view class="s-col is-col-24">
					<view class="s-list-title"><span class="iconfont icon-shop2 is-size-17 has-pdr-5"></span>店铺名称</view>
					<view class="s-list">
						<view class="is-item">
							<view class="is-item-hd">
								<i class="iconfont icon-tianmao" v-if="product.platform == 'taobao'"></i>
								<i class="iconfont icon-jingdongbaitiao" v-if="product.platform == 'jd'"></i>
								<i class="iconfont icon-tianmao" v-if="product.platform == 'tmall'"></i>
							</view>
							<view class="is-item-bd">
								<view>{{product.store_name}}</view>
							</view>
						</view>
					</view>
				</view>
		
				<view class="s-col is-col-24">
					<view class="s-list2-title"><span class="iconfont icon-tongcheng is-size-17 has-pdr-5"></span>目标商品</view>
					<view class="s-list2 has-bordertb" @tap="previewImage">
						<view class="is-item2 is-a">
							<view class="is-list2-img">
								<image :src="product.goods_picture" style="width:200rpx;height:200rpx;margin-right:5px;display:block;"></image>
							</view>
							<view class="is-list2-info has-bordert">
								<view class="has-mgb-3">{{product.goods_title}}</view>
								<view class="has-desc-color is-size-12">商家ID：{{order.mall_id}}</view>
								<view class="has-desc-color is-size-12">订单编号：{{order.order_sn}}</view>
							</view>
						</view>
					</view>
				</view>
		
				<view class="s-col is-col-24">
					<view class="s-list">
						<view class="is-item has-pd-10">
							<view class="is-item-bd">
								<view>接单时间</view>
							</view>
							<view class="is-item-ft">
								{{order.addtime_str}}
							</view>
						</view>
						<view class="is-item has-pd-10">
							<view class="is-item-bd">
								<view>撤销时间</view>
							</view>
							<view class="is-item-ft">
								{{order.order_close_time_str}}
							</view>
						</view>
						<view class="is-item has-pd-10">
							<view class="is-item-bd">
								<view>撤销原因</view>
							</view>
							<view class="is-item-ft">
								{{order.close_type}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import segmentedControl from '../../components/segmented-control.vue';
	import uniPopup from "@/components/uni-popup.vue"
	import uniCountdown from "@/components/uni-countdown.vue"
	export default {
		data() {
			return {
				show:1,
				isLoading : false, 
				popupModal: false,
				nowDate:new Date().getTime(),//当前时间时间戳
				product : {
					"id": "",
					"orderid": "",
					"userid": "",
					"platform": "",
					"model": "",
					"typeid": "",
					"storeid": "",
					"goods_title": "",
					"goods_link": "",
					"goods_picture": "",
					"goods_price": "0",
					"goods_num": "1",
					"goods_search_price": "0",
					"goods_post": "1",
					"goods_taoke": "1",
					"goods_postage": "0.00",
					"goods_sort": "销量",
					"goods_position": "1",
					"search_keywords": "目*答*",
					"minprice": "0.00",
					"maxprice": "500.00",
					"message": "阿道夫",
					"isaddgoodcom": "0",
					"istextgoodcom": "0",
					"ispicgoodcom": "1",
					"goods_deposit": "428.00",
					"back_amount_model": "1",
					"back_amount": "1.00",
					"upaddress": "广州",
					"addtime": "1559201179",
					"update_time": "1559301966",
					"start_time": "1559301960",
					"step": "5",
					"status": "1",
					"update_ip": "115.195.120.230",
					"is_deposit": "1",
					"is_disabled": "1",
					"remark": "阿道夫",
					"refunds_amount": "0.00",
					"refunds_commision": "0.00",
					"deposit_total": "3431.00",
					"deposit_brush": "52.00",
					"cause": null,
					"total_num": "1",
					"complete_num": "0",
					"starthour": "0",
					"endhour": "0",
					"interval_time": "0",
					"last_send_time": "0",
					"intestatistics": "0",
					"deposit_settle_time": "0",
					"sub_storeName": null,
					"is_subweb": "0",
					"sub_userid": "0",
					"sub_orderid": null,
					"sub_push_status": "0",
					"order_days": "0",
					"product_channel": "0",
					"special_remark": "",
					"special_dispose_info": [],
					"product_keywrods": {
						"id": "9",
						"model": "5",
						"product_id": "8",
						"keywords": "1212",
						"task_num": "1",
						"complete_num": "0",
						"applay_num": "1",
						"basic_amount": "3000.00",
						"isanswer": "1",
						"islike": "0",
						"islikestore": "0",
						"iscart": "0",
						"favflow_view": "0",
						"complete_favflow": "0",
						"apply_favflow": "0",
						"favflow_view_amount": "0.00",
						"comment": "",
						"comment_amount": "1.00",
						"picture": "array (\n  0 => 'http:\/\/img.cdn.yunkeclub.com\/product\/comment\/a39beccebad204ef1a3800a3ba5efef9b08f08e8\/c566f4d835e37fdebadd9ce98ffc2ab7dff5f0f8.jpg',\n)",
						"remark": "阿道夫",
						"modeltype": "3",
						"isArea": "0",
						"areaInfo": null,
						"isAge": "0",
						"isSex": "0",
						"isCredit": "0",
						"isCategory": null,
						"isBuylevel": "0",
						"isVideo": "0",
						"isLocation": "0",
						"isOrder": "0",
						"isSelectBuyer": "0",
						"addtime": "1559201226",
						"status": "1",
						"kstatus": "1",
						"modeltype_str": ""
					},
					"store_name": "",
					"shopkeeper": "",
					"product_model": "手机淘宝任务 （用户在手机淘宝app下单）",
					"product_platform": "自审任务",
					"platform_name": "淘宝",
					"product_url_sheme": "taobao:\/\/",
					"search_keywords_length": 4,
					"total_goods_price": 428,
					"start_time_str": "2019-05-31 19:26:00"
				}, 
				order_sn:"",
				buyerName: "",
				userid:"",
				order:{
					"id": "",
					"model": "",
					"userid": "",
					"produc_id": "",
					"keywords_id": "",
					"keywords_name": "",
					"order_sn": "",
					"product_source": "",
					"mall_id": "",
					"addtime": "",
					"storeid": "",
					"latitude": "",
					"longitude": "",
					"product_currencies": [],
					"product_target": [],
					"attach_picture": [],
					"attach_video": [],
					"orderid": null,
					"currencies_time": "0",
					"target_time": "0",
					"orderid_time": "0",
					"order_expire_time": "",
					"order_close_time": "0",
					"order_step": "0",
					"buyer_id": "",
					"buyer_name": "",
					"buyer_last_time": "0",
					"status": "1",
					"close_type": null,
					"close_position": "1",
					"pay_money": "0.00",
					"refunds_money": "0.00",
					"modeltype": "3",
					"check_time": "0",
					"refunds_time": "0",
					"evaluate_time": "0",
					"evaluate_images": [],
					"finish_time": "0",
					"search_amount": "428.00",
					"apply_status": "0",
					"apply_time": "0",
					"hasten_refunds": "0",
					"hasten_collect": "0",
					"order_remark": "",
					"commision": "0",
					"commision_mall": "0.00",
					"commision_spongeman": "0",
					"commision_s": "0",
					"commision_time": "0",
					"auto_callback_money_time": "0",
					"auto_callback_commision_time": "0",
					"is_notice": "0",
					"islike": "0",
					"iscart": "0",
					"islikestore": "0",
					"isVideo": "0",
					"isOrder": "0",
					"update_ip": null,
					"addtime_str": "2019-05-31 19:27:43",
					"order_status": "待操作",
					"orderid_time_str": "1970-01-01 08:00:00",
					"check_time_str": "1970-01-01 08:00:00",
					"evaluate_time_str": "1970-01-01 08:00:00",
					"refunds_time_str": "1970-01-01 08:00:00",
					"commision_time_str": "1970-01-01 08:00:00",
					"order_close_time_str": "1970-01-01 08:00:00",
					"buyer_last_time_str": "1970-01-01 08:00:00",
					"order_expire_time_str": "2019-05-31 21:27:43"
				}
			}
		},
		components: {
			segmentedControl,
			uniCountdown,
			uniPopup
		},
		onLoad(param) {
			uni.showLoading({
				title:"加载中"
			})
			this.order_sn = param.order_sn; 
		},
		onShow:function(){
			var userid = this.$SysUser.openid();
			if(!userid){
				uni.navigateTo({url:'/pages/ucenter/login'})
			}
			this.userid = userid; 
			this.loadData(); 
		},
		methods: {
			previewImage: function() {
				var src = this.product.goods_picture;
				var urls = [];
				urls[0] = src;
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage([src]);
				//#endif
			},
			toProgress(order_sn){//去任务进度
				uni.navigateTo({
					url: '/pages/index/new_task_progress?order_sn='+order_sn
				});
			},
			appealInfo: function() {
				// 申诉详情
				var order_sn = this.order_sn;
				uni.navigateTo({
					url: '/pages/help/appealInfo?order_sn=' + order_sn
				});
			},
			onSubmit: function() {
				uni.hideKeyboard();
				if (this.buyerName == "") {
					uni.showToast({
						title: "请输入买号名称",
						icon: "none"
					});
					return false;
				}
				uni.showLoading({
					mask: true,
					title: "验证中...",
				});
				this.$Request("task/checkBuyerEarth", {
					uid: this.userid,
					buyer_name: this.buyerName,
					order_sn: this.order_sn
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						var order_sn = this.order_sn;
						var links = "/pages/task/earthDetail?order_sn=" + order_sn + "&buyerName=" + this.buyerName;
						this.onClose();
						// 验证成功
						uni.navigateTo({
							url: links
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				}).catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: "大侠 手速太快",
						icon: "none",
					})
				});
			},
			appealOrder: function() {// 去申诉任务
				var order_sn = this.order_sn;
				uni.navigateTo({
					url: '/pages/task/appeal?order_sn=' + order_sn
				});
			},
			chooseTab(num){
				this.show = num
			},
			onClose: function() {//关闭pop
				this.popupModal = false;
				this.buyerName = "";
			},
			bindInput: function(e) {
				this.buyerName = e.detail.value;
			},
			submitOrder: function() {//去做任务
				if(this.order.status!=1){
					return false
				}
				var order_sn = this.order_sn;
				if (this.order.model == 3) {
					this.popupModal = true;
				} else {
					// 去操作任务
					uni.navigateTo({
						url: '/pages/index/task_operationDouyin?order_sn=' + order_sn
					});
				}
			},
			clearOrder: function() {//取消任务
				if(this.order.status > 1){
					return false
				}
				// 取消任务 
				var order_sn = this.order_sn;
				uni.navigateTo({
					url: '/pages/task/clear?order_sn=' + order_sn
				});
			},
			loadData:function(){
				var _self = this; 
				this.$Request("task/getinfo",{order_sn:this.order_sn,uid:this.userid}).then(res=>{
					if (res.code == 200 ) {
						var order = res.data.order;
						var product = res.data.product;
						var like_text_view = "";
						this.order = order;
						this.product = product;
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						uni.navigateBack({})
					}
					setTimeout(function(){
						_self.isLoading   = true; 
						uni.hideLoading();
					},500)
				}); 
			},
			openPlatformApp:function(){//复制到粘贴板
				// 打开平台APP 
				var platform_name = this.product.platform_name; 
				var title =  "请先安装" + platform_name + "客户端"; 
				var product_url_sheme = this.product.product_url_sheme;
				var product_keywrods  = this.product.product_keywrods.keywords;
				uni.setClipboardData({
				    data: product_keywrods,
				    success: function () {
				    	uni.showToast({
							title: "关键词已复制，请打开"+platform_name+"客户端完成任务",
							icon: "none"
						});
				    	/*setTimeout(function() {
							//#ifdef APP-PLUS
							plus.runtime.openURL(product_url_sheme,function(err){
								uni.showToast({
								    title: title,
								    icon: "none"
								});
							});
							//#endif
							//#ifdef MP-WEIXIN 
							uni.showToast({
								title: "请打开"+platform_name+"APP搜索",
								icon : "none", 
							});
							//#endif 
				    	}, 2000); */
				    }
				}); 
			},
		}
	}
</script>

<style >
	.get-order-info>view:not(:last-child){
		margin-bottom: 18rpx;
	}
	.order-buyer-name{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.product-one-info{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.product-one-info>view{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 40%;
		position: relative;
	}
	.product-one-info>view:first-child{
		width: 60%!important;
	}
	
	.product-one-info>view>view{
		color: #aeaeae;
	}
	
	.note-box>view{
		font-size: 30rpx;
		color: #999;
		padding: 24rpx;
	}
	.note-box{
		padding-bottom: 110rpx!important;
	}
	.uni-countdown {
		-webkit-box-pack: left !important;
		-webkit-justify-content: left !important;
		justify-content: left !important;
	
	}
	
	.uni-countdown-numbers {
		border: none !important;
		font-size: 29rpx !important;
	
	}
	.popup-content {
		min-width: 100%;
	}
	.content .is-item-hd .iconfont {
		font-size: 40rpx;
		padding-right: 15rpx;
	}
	
	.content .iconfont.icon-unie651 {
		color: #ff5000;
	}
	
	.content .iconfont.icon-tianmao {
		color: #ff0036;
	}
	
	.content .iconfont.icon-jingdongbaitiao {
		color: #f30213;
	}
	.popup-content-btn {
		border-top: 1px solid #eee;
		height: 100rpx;
		line-height: 100rpx;
	}
	
	.popup-content-btn .confirm {
		width: 50%;
		float: left;
	}
	
	.popup-content-btn .cancel {
		width: 50%;
		float: right;
	}
	
	.popup-content .is-input {
		height: 95rpx;
		line-height: 75rpx;
	}
	.disabledBtn{
		background-color: #ddd!important;
		background-image: none!important;
	}
	.order-ask{
		font-size: 34rpx;
		color: #999;
	}
	.order-ask>view{
		padding: 20rpx 10rpx;
		margin-bottom: 0;
		/* background-color: #f2f2f2; */
	}
	.goods-title{
		padding: 18rpx 24rpx;
		color: #969799;
		border-top: 2px solid #E2E1E0;
		font-size: 30rpx;
		display: flex;
	}
	.goods-title>span{
		color: #C9C9C9;
		width: 26%;
	}
	.goods-title>view{
		width: 74%;
	}
	.store-ask-text{
		padding: 60rpx 40rpx!important;
	}
	.ellipsis{
		white-space: nowrap;      /*超出的空白区域不换行*/
		overflow: hidden;         /*超出隐藏*/
		text-overflow: ellipsis;
	}
	#newDetailContainer{
		margin-bottom: 90rpx;
	}
	#newDetailContainer>.tab-bar-container{
		display: flex;
		flex-direction: row;
		position: fixed;
		width: 100%;
		z-index: 9999;
		border-bottom: 10upx solid rgb(226, 225, 224);
		top:0;
	}
	.tab-container-box{
		background-color: #ececec;
		margin-top: 12rpx;
		padding-top: 92upx;
		padding-bottom:90rpx ;
		
	}
	.tab-bar-container>view{
		width:50%;
		text-align: center;
		line-height: 92upx!important;
		background-color: #ececec;
		color: rgb(51, 51, 51);
		position: relative;
	}
	.middle-tab{
		position: relative;
	}
	/* .middle-tab:before{
		content:"";
		height:40px;
		background-color: #ccc;
		position: absolute;
		left: 0;
		width: 2px;
		top: 50%;
		margin-top: -20px;
	}
	.middle-tab:after{
		content:"";
		height:40px;
		background-color: #ccc;
		position: absolute;
		right: 0;
		width: 2px;
		top: 50%;
		margin-top: -20px;
	} */
	.active{
		color:#FF4B5E!important;
	}
	.active:before{
		content:"";
		position: absolute;
		height: 2rpx;
		width: 40%;
		bottom: 8rpx;
		left: 50%;
		margin-left: -20%;
		background-color: #ff6248;
	}
	#footer{
		box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 998;
	display: flex;
	align-items: center;
	}
	#footer>view{
		line-height: 90rpx;
		text-align: center;
	}
	#footer>view:first-child{
		background-image: -webkit-linear-gradient(left, #FF9DA8, #fe6248);
		background-image: linear-gradient(to right, #FF9DA8, #fe6248);
		color: #fff;
		width: 30%;
	}
	#footer>view:last-child{
		background-image: -webkit-linear-gradient(left, #fe6248 0, #fd2282 100%);
		background-image: linear-gradient(to left, #fe6248 0, #fd2282 100%);
		color: #fff;
		width: 70%;
	}
	.product-info-box{
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		padding: 24rpx;
	}
	.product-info-box>view{
		width: 56vw;
		margin-left: 3vw;
	}
	.product-info-box>view>view{
		
		font-size: 30rpx;
		color: #969799;
	}
	.product-info-box>view>view:not(:last-child){
		margin-bottom: 12rpx;
	}
	.product-info-box>view>view>span{
		margin-right: 10rpx;
		color: #C9C9C9;
		font-size: 30rpx;
	}
	.product-info-box image{
		width: 30vw;
		height: 28vw;
	}
	
</style>


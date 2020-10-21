<template>
	<view id="taskOpeartion">
		<view class="key-word-box" @tap="openPlatformApp">
			<view>搜索关键词：{{product.product_keywrods.keywords}}（点击可复制）</view>
			<view>请按商家提供的关键词搜索产品进行任务</view>
		</view>
		<view>	
			<navigator url="/pages/detail/content?id=4" hover-class="navigator-hover" class="is-size-16 is-gold"><view class="step-title">第一步：货比三家 <text class="is-blue" style="margin-left: 20rpx;"> →点击查看示例</text></view></navigator>
			<view>
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
				        <view class="">
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 请确认<span style="color:#FF0000;">{{order.buyer_name}}</span>账号是否登录手机{{product.platform_name}}APP</view>
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 打开{{product.platform_name}}客户端请手动输入搜索关键词，关键词且勿自定修改并在目标商品的详情中找到以下问题的答案。</view>
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 请勿随意更改任务要求的搜索筛选条件</view>
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 在当前关键词搜索下，随机点击2-3个相关的产品进行货比浏览</view>
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 进入商品页请至上而下缓缓浏览2分钟以上</view>
				        </view>
				    </view>
				</view>
			</view>
			<view class="upImg-title is-gold">凭证截图（需要两张）</view>
			<view class="images-operation-cotainer">
				<view @tap="previewImage(sendData.zuji1)" ><image src="../../static/images/rule/banner@2x.png" mode="scaleToFill"></image></view>
				<view><image src="../../static/images/rule/banner@2x.png" mode="scaleToFill"></image></view>
				<view>
					<view class="up-operation-box"  @tap="uploadPic" data-name="zuji1" v-if="sendData.zuji1 == ''">
						<image src="../../static/images/common/sub.png"  style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
						<text>点击上传</text>
					</view>
					<view v-if="sendData.zuji1 != ''"  @tap="uploadPic" data-name="zuji1">
						<image :src="sendData.zuji1" model="scaleToFill"></image>
					</view>
				</view>
				<view>
					<view  class="up-operation-box" @tap="uploadPic" data-name="zuji2" v-if="sendData.zuji2 == ''">
						<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
						<text>点击上传</text>
					</view>
					<view v-if="sendData.zuji2 != ''" @tap="uploadPic" data-name="zuji2">
						<image :src="sendData.zuji2" model="scaleToFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view>
			<navigator url="/pages/detail/content?id=5" hover-class="navigator-hover" class="is-size-16 is-gold"><view class="step-title">第二步：进入并浏览目标店铺 <text class="is-blue" style="margin-left: 20rpx;"> →点击查看示例</text></view></navigator>
			<view>
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
				        <view class="">
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 在搜索关键词下，根据主图、价格、名称等找到目标商品</view>
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 进入店铺后，浏览店铺中任意2个商品，至少浏览1分钟</view>
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 再次回到目标商品，根据目标答案提示至上而下浏览详情，找到正确答案</view>
				        </view>
				    </view>
				</view>
			</view>
			 <navigator url="/pages/detail/content?id=6" hover-class="navigator-hover" class="is-size-16 is-gold"><view class="upImg-title">凭证截图及验证<text class="is-blue" style="margin-left: 20rpx;"> →点击查看示例</text></view></navigator>
			<view class="s-col is-col-24" v-if="isLoading && product.product_keywrods.isanswer==1">
				<view class="s-list has-bordertb has-mgtb-0">
					<view class="is-item">
						<view class="is-list2-info has-list2-tip ">
							<view class="form-senddata">
								<view style="font-size: 30rpx;padding: 10upx 0;">请在商品详情页找到商家提供的字句进行验证</view>
			        			<view class="" style="font-size: 30rpx;padding: 10upx 0;">关键字句:{{product.search_keywords}} （{{product.search_keywords_length}}个字符）</view>
			        			<view class="input-answer has-mgt-10">
			        				<input type="text" :value="sendData.answer" :focus="focus.answer" @input="BindInput" data-val="sendData|answer" placeholder="请输入正确的目标答案">
			        				<button @tap="checkAnswer">验证</button>
			        			</view>
			        			<!-- 目标关键词 -->
							</view>
			            </view>
					</view>
			    </view>
			</view>
			<view class="images-operation-cotainer">
				<view @tap="previewImage(sendData.shop_goods_link1)" ><image src="../../static/images/rule/banner@2x.png" mode="scaleToFill"></image></view>
				<view><image src="../../static/images/rule/banner@2x.png" mode="scaleToFill"></image></view>
				<view>
					<view class="up-operation-box"  @tap="uploadPic" data-name="shop_goods_link1" v-if="sendData.shop_goods_link1 == ''">
						<image src="../../static/images/common/sub.png"  style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
						<text>点击上传</text>
					</view>
					<view v-if="sendData.shop_goods_link1 != ''"  @tap="uploadPic" data-name="shop_goods_link1">
						<image :src="sendData.shop_goods_link1" model="scaleToFill"></image>
					</view>
				</view>
				<view>
					<view  class="up-operation-box" @tap="uploadPic" data-name="shop_goods_link2" v-if="sendData.shop_goods_link2 == ''">
						<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
						<text>点击上传</text>
					</view>
					<view v-if="sendData.shop_goods_link2 != ''" @tap="uploadPic" data-name="shop_goods_link2">
						<image :src="sendData.shop_goods_link2" model="scaleToFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view>
			<navigator url="/pages/detail/content?id=7" hover-class="navigator-hover" class="is-size-16 is-gold"><view class="step-title">第三步：提交下单信息 <text class="is-blue" style="margin-left: 20rpx;"> →点击查看示例</text></view></navigator>
			<view>
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
				        <view class="">
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 根据要求确认好下单件数、规格、价格、将商品加入购物车</view>
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 下单付款前仔细核对购买账号、收货信息，确认订单无误后再付款</view>
							<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">• 下单后请填写实际付款金额与正确的订单编号</view>
				        </view>
				    </view>
				</view>
			</view>
			<view class="filed-two-box" v-if="isLoading">
			    <view class="s-col is-col-24 ">
			        <view class="s-list">
			            <view class="is-item-line">
			                <view class="is-item-bd">
			                    <input class="uni-input"type="number" :value="sendData.paymoney"  placeholder="请输入实际付款金额" @input="BindInput" data-val="sendData|paymoney" >
			                </view>
			            </view>
			            <view class="is-item-line ">
			                <view class="is-item-bd">
			                    <input class="uni-input" type="number" :value="sendData.ordersn"  :placeholder="'请输入'+product.platform_name+'订单编号'"  @input="BindInput" data-val="sendData|ordersn" >
			                </view>
			            </view>					
			        </view>
			    </view>
			</view>
		</view>
		<view style="padding: 24rpx;">
			<view :class="[btnLoading?'activeBtn':'','submit-task-button']" @tap="submitTask">{{btnLoading?'提交中...':'提交任务'}}</view>
		</view>
	</view>
</template>

<script>
	var upload = require('../../common/lib/upload.js');
	export default {
		data(){
			return {
				order_sn:"",
				userid:"",
				isLoading : true, 
				btnLoading : false, 
				"order": {
					"id": 713,
					"model": 1,
					"userid": 5929,
					"produc_id": 306,
					"keywords_id": 558,
					"keywords_name": "ss",
					"order_sn": "D767592955813",
					"product_source": "taobao",
					"mall_id": 5928,
					"addtime": "2019.05.09",
					"storeid": 84,
					"latitude": "",
					"longitude": "",
					"product_currencies": [],
					"product_target": [],
					"attach_picture": [],
					"attach_video": [],
					"orderid": null,
					"currencies_time": 0,
					"target_time": 0,
					"orderid_time": 0,
					"order_expire_time": 1557402887,
					"order_close_time": 1557403204,
					"order_step": 0,
					"buyer_id": 767,
					"buyer_name": "13276116673",
					"buyer_last_time": 0,
					"status": 0,
					"close_type": "超时未提交，系统自动关闭",
					"close_position": 1,
					"pay_money": "0.00",
					"refunds_money": "0.00",
					"modeltype": 1,
					"check_time": 0,
					"refunds_time": 0,
					"evaluate_time": 0,
					"search_amount": "50.00",
					"apply_status": 0,
					"apply_time": 0,
					"hasten_refunds": 0,
					"hasten_collect": 0,
					"order_remark": "",
					"commision": "5.70",
					"commision_mall": "0.00",
					"commision_spongeman": "0",
					"commision_s": "4.30",
					"commision_time": 0,
					"auto_callback_money_time": 0,
					"auto_callback_commision_time": 0,
					"is_notice": 1,
					"islike": 0,
					"iscart": 0,
					"islikestore": 0,
					"isVideo": 0,
					"isOrder": 0,
					"update_ip": null,
					"addtime_str": "2019-05-09 17:54:47",
					"order_status": "已关闭",
					"orderid_time_str": "1970-01-01 08:00:00",
					"check_time_str": "1970-01-01 08:00:00",
					"evaluate_time_str": "1970-01-01 08:00:00",
					"refunds_time_str": "1970-01-01 08:00:00",
					"commision_time_str": "1970-01-01 08:00:00",
					"order_close_time_str": "2019-05-09 20:00:04",
					"buyer_last_time_str": "1970-01-01 08:00:00",
					"order_expire_time_str": "2019-05-09 19:54:47"
				},
				"product": {
					"id": 306,
					"orderid": "A303592884880",
					"userid": 5928,
					"platform": "taobao",
					"model": 1,
					"typeid": "taoapp",
					"storeid": 84,
					platform_name:"淘宝",
					"goods_title": "R*I*W*N*假*件*织*衣*女*古*淡*c*i*秋*打*气*初*裙*",
					"goods_link": "https:\/\/item.taobao.com\/item.htm?spm=a217f.8051907.312171.31.49c33308WKTkSL&id=576582610029",
					"goods_picture": "http:\/\/pq1if3xn0.bkt.clouddn.com\/product\/picture\/8502841aeec6a5a33795006723fb6ab3660d105b\/8670adec18b7f539c9e2bbcd9d953a8b0919d76c.jpg",
					"goods_price": "50.00",
					"goods_num": 1,
					"goods_search_price": "50.00",
					"goods_post": 1,
					"goods_taoke": 1,
					"goods_postage": "0.00",
					"goods_sort": "销量",
					"goods_position": "1.00",
					"search_keywords": "1*1*",
					'search_keywords_length':"4",
					"minprice": "0.00",
					"maxprice": "0.00",
					"message": "",
					"isaddgoodcom": 1,
					"istextgoodcom": 0,
					"ispicgoodcom": 0,
					"goods_deposit": "50.00",
					"back_amount_model": 1,
					"back_amount": "10.00",
					"upaddress": "全国",
					"addtime": 1557135818,
					"update_time": 1557390723,
					"start_time": 1557390696,
					"step": 4,
					"status": 1,
					"update_ip": "127.0.0.1",
					"is_deposit": 1,
					"is_disabled": 1,
					"remark": null,
					"refunds_amount": "0.00",
					"refunds_commision": "0.00",
					"deposit_total": "68.00",
					"deposit_brush": "57.00",
					"cause": null,
					"total_num": 1,
					"complete_num": 0,
					"starthour": 0,
					"endhour": 0,
					"interval_time": 0,
					"last_send_time": 1557404694,
					"intestatistics": 0,
					"deposit_settle_time": 0,
					"sub_storeName": null,
					"is_subweb": 0,
					"sub_userid": 0,
					"sub_orderid": null,
					"sub_push_status": 0,
					"product_keywrods": {
						"id": 558,
						"model": 1,
						"product_id": 306,
						"keywords": "ss",
						"task_num": 1,
						"complete_num": 0,
						"applay_num": 0,
						"basic_amount": "10.00",
						"isanswer": 0,
						"islike": 0,
						"islikestore": 0,
						"iscart": 0,
						"favflow_view": 0,
						"complete_favflow": 0,
						"apply_favflow": 0,
						"favflow_view_amount": "0.00",
						"comment": "",
						"comment_amount": "0.00",
						"picture": "",
						"remark": "",
						"modeltype": 1,
						"isArea": 0,
						"areaInfo": null,
						"isAge": 0,
						"isSex": 0,
						"isCredit": 0,
						"isCategory": null,
						"isBuylevel": 0,
						"isVideo": 0,
						"isLocation": 0,
						"isOrder": 0,
						"addtime": 1557136451,
						"status": 1,
						"kstatus": 1,
						"modeltype_str": "普通好评"
					}
				},
				sendData : {
					instore_keywords : '',  // 进店关键词
					compare_goods_link1 : '', // 货比商品1
					compare_goods_link2 : '', // 货比商品2
					shop_goods_link1 : '', // 店内商品1
					shop_goods_link2 :'', // 店内商品2
					answer : '', // 目标答案 
					answer_status : false, // 答案验证状态 
					paymoney : '', // 实际付款金额 
					ordersn : '' , // 下单订单编号 
					likegoods : '',
					cartgoods : '',
					likeStore : '', 
					longitude:"",
					latitude:"", 
					zuji1:"",// 足迹1 货比三家1
					zuji2:'',//足迹2 货比三家2
					collect_img:"",
					cart_img:''
				},
				focus:{
					instore_keywords : false,  // 进店关键词
					compare_goods_link1 : false, // 货比商品1
					compare_goods_link2 : false, // 货比商品2
					shop_goods_link1 : false, // 店内商品1
					shop_goods_link2 :false, // 店内商品2
					answer : false, // 目标答案 
					answer_status : false, // 答案验证状态 
					paymoney : false, // 实际付款金额 
					ordersn : false , // 下单订单编号 
				},
			}
		},	
		onLoad(param) {
			this.order_sn = param.order_sn; 
			console.log(param)
		},
		onShow:function(){
			var userid = this.$SysUser.openid();
			if(!userid){
				uni.navigateTo({url:'/pages/ucenter/login'})
			}
			this.userid = userid; 
			this.loadData(); 
		},
		methods:{
			checkAnswer:function(){
				// 验证问题答案。 
				var answer = this.sendData.answer;
				if (answer == "") {
					uni.showToast({title:"请输入问题答案",icon:'none'})
				}else if(answer.length != this.product.search_keywords_length){
					uni.showToast({title:"答案输入错误",icon:'none'})
				}else{
					this.$Request("task/checkAnswer",{product_id:this.product.id,answer:answer}).then(res=>{
						uni.showToast({title:res.msg})
						if (res.code == 200 ) {
							this.sendData.answer_status = true; 
						}
					});
				}
			},
			loadData:function(){
				var _self = this; 
				this.$Request("task/getinfo",{order_sn:this.order_sn,uid:this.userid}).then(res=>{
					if (res.code == 200 ) {
						var order        = res.data.order;
						var product      = res.data.product;
						var like_text_view = "";
						this.time=product.start_time;
						if (order.islike == 1||order.islike==0) {
							like_text_view += "第二步    收藏商品";
						}
						if (order.iscart == 1||order.iscart==0) {
							like_text_view += "、加入购物车";
						}
						if (order.islikestore == 1) {
							like_text_view += "、收藏店铺";
						}
						order['like_text_view'] = like_text_view;
						this.isLoading   = true; 
						this.order   = order;
						this.product = product;
						this.placeholder_text = "请输入"+product.platform_name+"订单编号"; 
						console.log(order,product)
					}else{
			
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						uni.navigateBack({})
					}
				}); 
			},
			getLocation: function() {
				var that = this;
			
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						that.sendData.longitude = res.longitude;
						that.sendData.latitude = res.latitude;
					},
					fail: function(err) {
						
					}
				});
			},
			clearFocus:function(){
// 				this.focus = {
// 					instore_keywords : false,  // 进店关键词
// 					compare_goods_link1 : false, // 货比商品1
// 					compare_goods_link2 : false, // 货比商品2
// 					shop_goods_link1 : false, // 店内商品1
// 					shop_goods_link2 :false, // 店内商品2
// 					answer : false, // 目标答案 
// 					answer_status : false, // 答案验证状态 
// 					paymoney : false, // 实际付款金额 
// 					ordersn : false , // 下单订单编号 
// 				}
			},
			openPlatformApp:function(){
				// 打开平台APP 
				var platform_name = this.product.platform_name; 
				var title             =  "请先安装" + platform_name + "客户端"; 
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
			submitTask:function(){// 任务提交 
				var data = this.sendData;
				// if (data['instore_keywords'] != this.product['product_keywrods']['keywords']) {
				// 	uni.showToast({title:"进店关键词和商家要求不一致"});
				// 	this.focus.instore_keywords = true; 
				// 	return false;
				// }
				if (this.order.model == 1 ) {
					if(data['paymoney'] == "") {
						uni.showToast({title:"请输入实际付款金额",icon:'none'}) 
						this.focus.paymoney = true; 
						return false;
					}
					if(data['ordersn'] == ""){
						uni.showToast({title:"请输入下单订单编号",icon:'none'}) 
						this.focus.ordersn = true; 
						return false;
					}
					if(data['paymoney']>this.product.total_goods_price){
						uni.showToast({title:"实际付款金额不得大于返款金额",icon:'none'});
						return false
					}
					if(data['zuji1']==""&&data["zuji2"]==""){
						uni.showToast({title:"货比三家图片至少上传一张",icon:'none'});
						return false
					}
					if(data['zuji1']!=""&&data["zuji2"]!=""&&(data['zuji1']==data["zuji2"])){
						uni.showToast({title:"货比三家图片不能一样",icon:'none'});
						return false
					}
					if(data['shop_goods_link1']&&""&&data["shop_goods_link2"]==""){
						uni.showToast({title:"目标商品图至少上传一张",icon:'none'});
						return false
					}
					if(data['shop_goods_link1']!=""&&data["shop_goods_link2"]!=""&&(data['shop_goods_link1']==data["shop_goods_link2"])){
						uni.showToast({title:"目标商品图不能一样",icon:'none'});
						return false
					}
					if(this.product.product_keywrods.isanswer==1){
						if(data['answer'] == "") {
							uni.showToast({title:"请输入目标答案",icon:'none'}) 
							// this.focus.answer = true; 
							return false;
						}
						if(data['answer_status'] == false) {
							uni.showToast({title:"目标答案未验证通过",icon:'none'}) 
							// this.focus.answer = true; 
							return false;
						}
					}
				}else if(this.order.model==2){
					if(data['answer'] == "") {
						uni.showToast({title:"请输入目标答案",icon:'none'}) 
						this.focus.answer = true; 
						return false;
					}
					if(data['answer_status'] == false) {
						uni.showToast({title:"目标答案未验证通过",icon:'none'}) 
						this.focus.answer = true; 
						return false;
					}
					if (this.order.islike == 1 && data['likegoods'] == "") {
						uni.showToast({title:"请上传收藏商品图片",icon:'none'});
						return false;
					}
					if (this.order.iscart == 1 && data['cartgoods'] == "") {
						uni.showToast({title:"请上传加入购物车图片,icon:'none'"});
						return false;
					}
					if ( this.order.islikestore == 1 && data['likeStore'] == "") {
						uni.showToast({title:"请上传收藏店铺图片",icon:'none'});
						return false;
					} 
				}else if(this.order.model==4){
					if (this.order.islike == 0 && data['zuji1'] == "") {
						uni.showToast({title:"请上传浏览商品图片",icon:'none'});
						return false;
					}
					if (this.order.islike == 0 && data['zuji2'] == "") {
						uni.showToast({title:"请上传浏览商品图片",icon:'none'});
						return false;
					}
					if (this.order.islike == 0 && data['collect_img'] == "") {
						uni.showToast({title:"请上传收藏商品图片",icon:'none'});
						return false;
					}
					if (this.order.iscart == 0 && data['cart_img'] == "") {
						uni.showToast({title:"请上传加入购物车图片",icon:'none'});
						return false;
					}
// 					if ( this.order.islikestore == 0 && data['likeStore'] == "") {
// 						uni.showToast({title:"请上传收藏店铺图片"});
// 						return false;
// 					} 
					if(data['answer'] == "") {
						uni.showToast({title:"请输入目标答案",icon:'none'}) 
						this.focus.answer = true; 
						return false;
					}
					if(data['answer_status'] == false) {
						uni.showToast({title:"目标答案未验证通过",icon:'none'}) 
						this.focus.answer = true; 
						return false;
					}
					if(data['paymoney'] == "") {
						uni.showToast({title:"请输入实际付款金额",icon:'none'}) 
						this.focus.paymoney = true; 
						return false;
					}
					if(data['ordersn'] == ""){
						uni.showToast({title:"请输入下单订单编号",icon:'none'}) 
						this.focus.ordersn = true; 
						return false;
					}
					data['compare_goods_link1']=true;
					data['compare_goods_link2']=true;
					
				}
				if (this.btnLoading) {
					return false; 
				}
				
				// if(this.order.model==4){
					// let nowtime=new Date().getTime();
					// 后端返回的时间 time
// 					let time=(nowtime/1000-this.time)/(60*60)
// 					if(time<0){
// 						uni.showToast({
// 							title:'预约时间未到,不能提交',
// 							icon:'none'
// 						})
// 						return 
// 					}
// 					if(time>2){
// 						uni.showToast({
// 							title:'超过了提交时间的范围,不能提交'
// 						})
// 						return
// 					}
				// }
				data['product_id'] = this.product.id;
				data['order_sn'] = this.order.order_sn; 
				data['uid'] = this.userid; 
				this.clearFocus(); 
				this.btnLoading = true; 
				var posturl = (this.order.model == 1  )? "task/submitTask" : "task/submitTaskView"; 
				if(this.order.model==4){
					posturl="task/submitTaskOrder"
				}
				this.$Request(posturl,data).then(res=>{
					this.btnLoading = false; 
					uni.showToast({title:res.msg,icon:'none'});
					if (res.code == 200 ) {
						setTimeout(function() {
							uni.navigateBack({
							})
						}, 2000);
					} 
				});
				
			},
			BindInput:function(e){
				// 监听INPUT 事件
				var dataval = e.currentTarget.dataset.val , dataval = dataval.split("|"); //字符分割  
				var value   = e.detail.value;
				var model   = dataval[0] , type = dataval[1];
				if (model == "sendData") {
					var data = this.sendData;
					data[type] = value; 
					this.sendData = data; 
				}
			},
			uploadPic:function(e){//上传图片方法
				var name = e.currentTarget.dataset.name;
				console.log(JSON.stringify(name))
				var that = this;
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 1,
			        success: (res) => {
						console.log(JSON.stringify(res))
						uni.showLoading({
							title:"文件上传中",
							mask:true,
							duration:0
						})
						upload({
							filePath: res['tempFilePaths'][0],
							success: function(upres) {
								uni.hideLoading(); 
								uni.showToast({
									title:"文件上传成功",
									icon:"none"
								})
								if (upres.imageURL) {
									that.sendData[name] = upres['imageURL'];
									console.log(that.sendData[name])
								}
							},
							error: function(uperr) {
								uni.hideLoading(); 
								uni.showToast({
									title:"文件上传失败",
									icon:"none"
								})
							}
						})
			        }
			    })
			},
			previewImage:function(imagesUrl){//预览图片方法
				var src = imagesUrl
				var urls = [];
				urls[0] = src; 
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage(urls);
				//#endif
			},
		}
	}
</script>

<style>
	.activeBtn:before{
		background: rgba(0,0,0,0) url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU3Mzc1Njc4NDA3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0NTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjAuMDE0IDU0Mi4zODVjMC0zNy45ODIgMzAuMzg1LTY4LjM2NyA2OC4zNjctNjguMzY3IDQ1LjU3OCAwIDc1Ljk2NCAzMC4zODUgNzUuOTY0IDY4LjM2NyAwIDQ1LjU3OC0zMC4zODUgNzUuOTY0LTc1Ljk2NCA3NS45NjQtMzcuOTgyIDAtNjguMzY3LTMwLjM4NS02OC4zNjctNzUuOTY0ek0xNTEuMTcxIDI3Ni41MTJ2MGMwLTUzLjE3NSAzNy45ODItOTguNzUzIDkxLjE1Ny05OC43NTNzOTguNzUzIDQ1LjU3OCA5OC43NTMgOTguNzUzdjBjMCA1My4xNzUtNDUuNTc4IDkxLjE1Ny05OC43NTMgOTEuMTU3cy05MS4xNTctMzcuOTgyLTkxLjE1Ny05MS4xNTd2MHpNMTg5LjE1MyA4MTUuODU2djBjMC0zMC4zODUgMjIuNzg5LTUzLjE3NSA1My4xNzUtNTMuMTc1czUzLjE3NSAyMi43ODkgNTMuMTc1IDUzLjE3NXYwYzAgMzAuMzg1LTIyLjc4OSA1My4xNzUtNTMuMTc1IDUzLjE3NXMtNTMuMTc1LTIyLjc4OS01My4xNzUtNTMuMTc1ek00NTUuMDI3IDkyOS44MDJ2MGMwLTM3Ljk4MiAyMi43ODktNjAuNzcyIDYwLjc3Mi02MC43NzJzNjAuNzcyIDIyLjc4OSA2MC43NzIgNjAuNzcydjBjMCAzNy45ODItMjIuNzg5IDYwLjc3Mi02MC43NzIgNjAuNzcyLTM3Ljk4MiAwLTYwLjc3Mi0yMi43ODktNjAuNzcyLTYwLjc3MnpNNzUxLjI4NyA4MTUuODU2YzAtMjIuNzg5IDE1LjE5My0zNy45ODIgMzcuOTgyLTM3Ljk4MnMzNy45ODIgMTUuMTkzIDM3Ljk4MiAzNy45ODJjMCAyMi43ODktMTUuMTkzIDM3Ljk4Mi0zNy45ODIgMzcuOTgyLTIyLjc4OSAwLTM3Ljk4Mi0xNS4xOTMtMzcuOTgyLTM3Ljk4MnpNODM0Ljg0NyA1NDIuMzg1YzAtMzAuMzg1IDMwLjM4NS02MC43NzIgNjguMzY3LTYwLjc3MiAzMC4zODUgMCA2MC43NzIgMzAuMzg1IDYwLjc3MiA2MC43NzIgMCAzNy45ODItMzAuMzg1IDY4LjM2Ny02MC43NzIgNjguMzY3LTM3Ljk4MiAwLTY4LjM2Ny0zMC4zODUtNjguMzY3LTY4LjM2N3pNNjYwLjEzIDI3Ni41MTJjMC03NS45NjQgNjAuNzcyLTEyOS4xMzkgMTI5LjEzOS0xMjkuMTM5czEyOS4xMzkgNTMuMTc1IDEyOS4xMzkgMTI5LjEzOWMwIDY4LjM2Ny02MC43NzIgMTI5LjEzOS0xMjkuMTM5IDEyOS4xMzktNjguMzY3IDAtMTI5LjEzOS02MC43NzItMTI5LjEzOS0xMjkuMTM5ek0zODYuNjYgMTYyLjU2NmMwLTY4LjM2NyA2MC43NzItMTI5LjEzOSAxMjkuMTM5LTEyOS4xMzlzMTI5LjEzOSA2MC43NzIgMTI5LjEzOSAxMjkuMTM5YzAgNjguMzY3LTYwLjc3MiAxMjkuMTM5LTEyOS4xMzkgMTI5LjEzOS02OC4zNjcgMC0xMjkuMTM5LTYwLjc3Mi0xMjkuMTM5LTEyOS4xMzl6IiBwLWlkPSI0NDU4IiBmaWxsPSIjY2RjZGNkIj48L3BhdGg+PC9zdmc+) no-repeat;
		content: " ";
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		-webkit-animation: haha1 1s steps(12) infinite;
		animation: haha1 1s steps(12) infinite;
		background-size: 100%;
		margin-right: 10rpx;
	}
	@-webkit-keyframes haha1{
	 
		0%{-webkit-transform:rotate(0deg);}
	 
		25%{-webkit-transform:rotate(90deg);}
	 
		50%{-webkit-transform:rotate(180deg);}
	 
		75%{-webkit-transform:rotate(270deg);}
	 
		100%{-webkit-transform:rotate(360deg);}
	 
	}
	#taskOpeartion .filed-two-box:after{
		content:"";
		display: block;
		clear: both;
	}
	#taskOpeartion .submit-task-button{
		width: 100%;
		text-align: center;
		background-color: #108ee9 ;
		color: #fff;
		height: 80upx;
		line-height: 80upx;
		font-size: 30rpx;
		border-radius: 5px;
		margin: 0 auto;
		position: relative;
		
	}
	.input-answer input{
		min-width: 75%;
		float: left;
		height: 70rpx;
		border:1px solid #999;
		line-height: 70rpx;
		padding-left:12upx;
		font-size: 30rpx;
		border-radius: 5upx;
	}
	.input-answer button{
		width: 20%;float: right;
		border:none;
		background:rgb(254, 98, 72);
		color: #fff;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
	}
	.form-senddata{
		width: 100%;
	}
	.up-operation-box{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 100%!important;
		height: 20vw;
		border: 2upx dotted #8a8a8a;
		
	}
	.images-operation-cotainer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx;
		background-color: #fff;
	}
	.images-operation-cotainer>view{
		width: 20vw;
		height: 20vw;
	}
	.images-operation-cotainer view image{
		width: 100%;
		vertical-align: middle;
		height: 20vw;
	}
	.step-title{
		padding: 20rpx;
		text-align: center;
		color:#4A90E2;
		font-size: 30rpx;
	}
	.upImg-title{
		text-align: center;
		padding: 24rpx;
		font-size: 30rpx;
	}
	.is-item{
		background-color: #fff;
	}
	#taskOpeartion{
		font-size: 30rpx;
		color: #333;
	}
	#taskOpeartion .key-word-box{
		background-color: #fff;
		padding: 30rpx;
		text-align: center;
		
	}
	.key-word-box>view:last-child{
		font-size: 26rpx;
		color: #999;
	}
</style>

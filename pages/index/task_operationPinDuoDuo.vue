<template>
	<view id="taskOpeartion" >
		<!-- 垫付任务 -->
		<view v-show="(order.model==1&&isLoading)||(order.model==5&&isLoading)">
			<!-- 倒计时 -->
			<view style="padding: 24rpx;background-color:#ececec;text-align: center;padding-bottom: 0px;">
				<view class="is-item timer-box" style="background-color: #ececec;" v-if="order.status<2&&order.order_expire_time > 0">
					<view class="is-item-hd" style="font-size: 36rpx;font-weight: 900;">
						距离提交任务：
					</view>
					<view>
						<uni-countdown ref="countdownView" font-color="#fff" splitor-color="#333" show-hide="none" bgr-color="#333" border-color="#fffff" splitorTextl=":"
						 splitorTextr=":" :timer="order.order_expire_time_str"></uni-countdown>
					</view>
				</view>
			</view>
			<!-- 第一步 -->
			<view style="margin-top: 20rpx;background-color:#ececec;" >	
				<view class="step-title" ><view class="step-fake-btn">1</view><view class="" style="padding: 12rpx;margin-left: 20rpx;font-size: 32rpx;">货比三家及找到目标商品</view></view>
				<view class="step-content" style="padding: 18rpx 24rpx;">
					<view>请确认<span style="color: #FF4B5E;margin:0 10upx;">{{order.buyer_name}}</span>账号是否登录手机{{product.platform_name}}APP</view>
					<view>打开<span style="color: rgb(255, 75, 94);margin: 0px 5px">{{product.platform_name}}</span>APP手动输入关键词 <span style="color: rgb(255, 75, 94);margin: 0px 5px">{{product.product_keywrods.keywords}}</span></view>
					<view style="background-color: #ececec!important;">
						<uni-collapse style="background-color: #ececec;">
							<uni-collapse-item title="任务要点" animation="inner" style="background-color: #ececec;!important">
								<view style="background-color: #ececec;">
									<view class="" style="background-color: #ececec;">
										<view class="is-list2-info has-list2-tip ">
									        <view class="" style="padding: 18rpx 24rpx;">
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-15">请手动输入搜索关键词，关键词且勿自定修改并在目标商品的详情中找到以下问题的答案。</view>
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-15">请勿随意更改任务要求的搜索筛选条件</view>
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-15">在当前关键词搜索下，找到<span style="font-weight: 900;color:#fe6248">目标商品</span>的同时随机点击2-3个相关的产品进行货比浏览,<span style="color:#fe6248">并在目标商品详情中找到以下问题的答案</span> <navigator url="/pages/detail/content?id=84" hover-class="navigator-hover">。<span class="is-blue">→点击查看示例</span></navigator></view>
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-15">进入目标商品与货比商品详情页至上而下缓缓浏览2分钟以上</view>
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-15">随机选择1-2款货比产品进行收藏与加购</view>
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-15">在目标商品店铺，随机选择店铺几款产品进行浏览。<navigator url="/pages/detail/content?id=85" hover-class="navigator-hover"><span class="is-blue">→点击查看示例</span></navigator></view>
									        </view>
									    </view>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
				</view>
				
			</view>
			
			<!-- 第二步 -->
			<view style="margin-top: 20rpx;" class="step-two" >
				<view class="step-title" ><view class="step-fake-btn">2</view><view class="" style="padding: 12rpx;margin-left: 20rpx;font-size: 32rpx;">上传凭证</view></view>
				<!-- 标签 -->
				<view style="padding: 18rpx 24rpx;background-color: #fff;">
					<view class='tag-box-title' style="display: flex;align-items: center;">
						<image src="../../static/images/common/jinggaopng.png" mode="widthFix" style="width: 30rpx;margin-right: 10rpx;"></image>
						<view style="font-size: 30rpx;color: #333;">下单方式</view>
					</view>
					<view style="display: flex;align-items: center;flex-wrap: wrap;padding-left: 40rpx;">
						<view class="tag-item-ll" v-if="product.order_mode==1">有团参团，无团再开</view>
						<view class="tag-item-ll" v-if="product.order_mode==2">一键拼团</view>
						<view class="tag-item-ll" v-if="product.order_mode==3">单独购买</view>
					</view>
				</view>
				<!-- 说明 -->
				<view class="step-content" style="padding: 18rpx 24rpx;">
					<view >凭证上传可截图或手机拍照图片均可</view>
					<view >请上传目标商品搜索页面、货比足迹、收藏夹及购物车图</view>
					<view>请根据示例图参考，至少上传3张截图</view>
					<navigator url="/pages/detail/content?id=86" hover-class="navigator-hover"><view style="color:#FF6600;font-size: 28rpx;">点击查看示例>>></view></navigator>
					<!-- 图片上传 -->
					<view class="images-operation-cotainer">
						<view>
							<view class="up-operation-box"  @tap="uploadPic" data-name="zuji1" v-if="sendData.zuji1 == ''">
								<image src="../../static/images/common/sub.png"  style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
							</view>
							<view v-if="sendData.zuji1 != ''"  @tap="uploadPic" data-name="zuji1">
								<image :src="sendData.zuji1" model="scaleToFill"></image>
							</view>
						</view>
						<view>
							<view  class="up-operation-box" @tap="uploadPic" data-name="zuji2" v-if="sendData.zuji2 == ''">
								<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
							</view>
							<view v-if="sendData.zuji2 != ''" @tap="uploadPic" data-name="zuji2">
								<image :src="sendData.zuji2" model="scaleToFill"></image>
							</view>
						</view>
						<view>
							<view class="up-operation-box"  @tap="uploadPic" data-name="shop_goods_link1" v-if="sendData.shop_goods_link1 == ''">
								<image src="../../static/images/common/sub.png"  style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
							</view>
							<view v-if="sendData.shop_goods_link1 != ''"  @tap="uploadPic" data-name="shop_goods_link1">
								<image :src="sendData.shop_goods_link1" model="scaleToFill"></image>
							</view>
						</view>
						<view>
							<view  class="up-operation-box" @tap="uploadPic" data-name="shop_goods_link2" v-if="sendData.shop_goods_link2 == ''">
								<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
							</view>
							<view v-if="sendData.shop_goods_link2 != ''" @tap="uploadPic" data-name="shop_goods_link2">
								<image :src="sendData.shop_goods_link2" model="scaleToFill"></image>
							</view>
						</view>
					</view>
					<!-- 目标答案验证 -->
					<view class=""  v-if="product.product_keywrods.isanswer==1">
						<view class="s-list has-bordertb has-mgtb-0" style="background-color: #ececec;">
							<view class="is-item" style="padding:0px;background-color: #ececec;">
								<view class="is-list2-info has-list2-tip " style="">
									<view class="form-senddata">
										<view style="font-size: 28rpx;padding: 10upx 0;color: #969799;">请在商品详情页找到商家提供的字句进行验证</view>
					        			<view class="" style="font-size: 28rpx;padding: 10upx 0;color: #969799;">关键字句:{{product.search_keywords}} （{{product.search_keywords_length}}个字符）</view>
					        			<view class="input-answer has-mgt-10">
					        				<input placeholder-style="font-size:28rpx" style="border-color: #ccc;background-color: #fff;" type="text" :value="sendData.answer" :focus="focus.answer" @input="BindInput" data-val="sendData|answer" placeholder="请输入正确的目标答案">
					        				<button @tap="checkAnswer" style="background-color: #FF4B5E;font-size: 30rpx;">验证</button>
					        			</view>
									</view>
					            </view>
							</view>
					    </view>
					</view>
					<!-- 店铺验证 -->
					<view class=""  >
						<view class="s-list has-bordertb has-mgtb-0" style="background-color: #ececec;">
							<view class="is-item" style="padding:0px;background-color: #ececec;">
								<view class="is-list2-info has-list2-tip " style="padding: 0px;">
									<view class="form-senddata">
										<view style="font-size: 28rpx;padding: 10upx 0;color: #969799;">请在商品所在的店铺名称进行验证</view>
					        			<view class="" style="font-size: 28rpx;padding: 10upx 0;color: #969799;">店铺名称:{{product.store_name}} （{{product.store_name_length}}个字符）</view>
					        			<view class="input-answer has-mgt-10">
					        				<input placeholder-style="font-size:28rpx" style="border-color: #ccc;background-color: #fff;" type="text" :value="sendData.storeName"  @input="BindInput" data-val="sendData|storeName" placeholder="请输入正确的店铺名称">
					        				<button @tap="checkStoreName" style="background-color: #FF4B5E;font-size: 30rpx;">验证</button>
					        			</view>
									</view>
					            </view>
							</view>
					    </view>
					</view>
					<navigator url="/pages/detail/content?id=6" hover-class="navigator-hover"><view style="color:#FF6600;font-size: 28rpx;">点击查看示例>>></view></navigator>
				</view>
			</view>
			<!-- 第三步 -->
			<view style="margin-top: 20rpx;" >
				<view class="step-title" ><view class="step-fake-btn">3</view><view class="" style="padding: 12rpx;margin-left: 20rpx;font-size: 32rpx;">提交订单信息</view></view>
				<view class="step-content" style="padding: 18rpx 24rpx;">
					<view >请确认好下单件数、规格、价格、将商品加入购物车</view>
					<view >付款前核对购买账号、收货信息，确认订单无误后再付款</view>
					<view >下单后请填写实际付款金额与正确的订单编号</view>
					<view>
						<navigator url="/pages/detail/content?id=87" hover-class="navigator-hover" ><view style="color:#FF6600">点击查看示例>>></view></navigator>
					</view>
					<view style="display: flex;align-items: flex-start;justify-content: space-between;">
						<view class="images-operation-cotainer" style="padding: 0;">
							<view style="margin-right: 0;width: 21vw;">
								<view class="up-operation-box" style="height: 21vw;" @tap="uploadPic" data-name="payment_img" v-if="sendData.payment_img == ''">
									<image src="../../static/images/common/sub.png"  style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
								</view>
								<view v-if="sendData.payment_img != ''"  @tap="uploadPic" data-name="payment_img">
									<image :src="sendData.payment_img" model="scaleToFill"></image>
								</view>
								<view style="margin-top:10upx;font-size: 22rpx;color:rgb(255, 75, 94);text-align:center;">付款凭证</view>
							</view>
						</view>
						<view class="filed-two-box" style="width: calc(100% - 25vw);">
						    <view class="s-col is-col-24">
						        <view class="" style="margin-top: 0px!important;background-color: #ececec;">
									<view class="is-item-line "  style="padding:5rpx 24rpx;border-radius: 15rpx;background-color: #fff;">
									    <view class="is-item-bd">
											<view class="uni-form-item uni-column" style="width: 100%;">
												<input placeholder-style="font-size:28rpx" style="height:5vw;" class="uni-input" type="number" :value="sendData.postage_money"  placeholder="请输入实际付款邮费金额"  @input="BindInput" data-val="sendData|postage_money" :disabled="product.goods_post==1?'disabled':false">
											</view>
										</view>
									</view>		
						            <view class="is-item-line" style="">
						                <view class="uni-form-item uni-column" style="width: 100%;border-radius: 15rpx;" >
						                    <input placeholder-style="font-size:28rpx" style="border-radius: 15rpx;height: 5vw;" class="uni-input" type="number" :value="sendData.paymoney"  placeholder="请输入实际付款金额" @input="BindInput" data-val="sendData|paymoney" >
						                </view>
						            </view>
						            <view class="is-item-line "  style="padding:5rpx 24rpx;border-radius: 15rpx;background-color: #fff;">
						                <view class="is-item-bd">
											<view class="uni-form-item uni-column" style="width: 100%;">
												<input placeholder-style="font-size:28rpx" style="height:5vw;" class="uni-input" type="text" :value="sendData.ordersn"  :placeholder="'请输入'+product.platform_name+'订单编号'"  @input="BindInput" data-val="sendData|ordersn" >
											</view>
										</view>
						            </view>			
						        </view>
						    </view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单提交 -->
			<view>
				<view :class="[btnLoading?'activeBtn':'','submit-task-button']" @tap="submitTask" >{{btnLoading?'提交中...':'提交任务'}}</view>
			</view>
		</view>
		<!-- 浏览任务 -->
		<view v-show="order.model==2&&isLoading">
			<!-- 倒计时 -->
			<view style="padding: 24rpx;background-color:#ececec;text-align: center;padding-bottom: 0px;">
				<view class="is-item timer-box" style="background-color: #ececec;" v-if="order.status<2&&order.order_expire_time > 0">
					<view class="is-item-hd" style="font-size: 36rpx;font-weight: 900;">
						距离提交任务：
					</view>
					<view>
						<uni-countdown ref="countdownView" font-color="#fff" splitor-color="#333" show-hide="none" bgr-color="#333" border-color="#fffff" splitorTextl=":"
						 splitorTextr=":" :timer="order.order_expire_time_str"></uni-countdown>
					</view>
				</view>
			</view>
			<!-- 第一步 -->
			<view style="margin-top: 20rpx;background-color:#ececec;">	
				<view class="step-title" ><view class="step-fake-btn">1</view><view class="" style="padding: 12rpx;margin-left: 20rpx;font-size: 32rpx;">找到目标商品</view></view>
				<view class="step-content" style="padding: 18rpx 24rpx;">
					<view>请确认<span style="color: #FF4B5E;margin:0 10upx;">{{order.buyer_name}}</span>账号是否登录手机{{product.platform_name}}APP</view>
					<view>打开<span style="color: rgb(255, 75, 94);margin: 0px 5px">{{product.platform_name}}</span>APP手动输入关键词 <span style="color: rgb(255, 75, 94);margin: 0px 5px">{{product.product_keywrods.keywords}}</span></view>
					<view style="background-color: #ececec!important;">
						<uni-collapse style="background-color: #ececec;">
							<uni-collapse-item title="任务要点" animation="inner" style="background-color: #ececec;!important">
								<view style="background-color: #ececec;">
									<view class="" style="background-color: #ececec;">
										<view class="is-list2-info has-list2-tip " >
									        <view class="">
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">请手动输入关键词找到商品，关键词且勿自定修改。</view>
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">进入目标商品详情页至上而下缓缓浏览2分钟以上，并在目标商品中找到目标答案的关键字句。</view>
												<view class="has-mgt-10 has-mgb-10 is-grey is-size-14">根据商家要求进行收藏加购即可。</view>

									        </view>
									    </view>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</view>
				</view>
			</view>
			<!-- 第二步 -->
			<view style="margin-top: 20rpx;" class="step-two">
				<view class="step-title" ><view class="step-fake-btn">2</view><view class="" style="padding: 12rpx;margin-left: 20rpx;font-size: 32rpx;">上传凭证</view></view>
				<!-- 说明 -->
				<view class="step-content" style="padding: 18rpx 24rpx;">
					<view >凭证上传可截图或手机拍照图片均可</view>
					<view >请根据示例图参考，按照要求上传图片</view>
					<navigator url="/pages/detail/content?id=86" hover-class="navigator-hover"><view style="color:#FF6600;font-size: 28rpx;">点击查看示例>>></view></navigator>
					<!-- 图片上传 -->
					<view class="images-operation-cotainer1">
						<view>
							<view class="up-operation-box1"  @tap="uploadPic" data-name="searchGoods" v-if="sendData.searchGoods == ''">
								<image src="../../static/images/common/sub.png"  style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
							</view>
							<view v-if="sendData.searchGoods != ''"  @tap="uploadPic" data-name="searchGoods">
								<image :src="sendData.searchGoods" model="scaleToFill"></image>
							</view>
							<view style="margin-top:10upx;font-size: 22rpx;color:rgb(255, 75, 94);text-align:center;">搜索页面</view>
						</view>
						<view v-if="product.product_keywrods.isanswer==0">
							<view  class="up-operation-box1" @tap="uploadPic" data-name="productMain" v-if="sendData.productMain == ''">
								<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
								<!-- <text>点击上传</text> -->
							</view>
							<view v-if="sendData.productMain != ''" @tap="uploadPic" data-name="productMain">
								<image :src="sendData.productMain" model="scaleToFill"></image>
							</view>
							<view style="margin-top:10upx;font-size: 22rpx;color:rgb(255, 75, 94);text-align:center;">宝贝主图</view>
						</view>
						<view v-if="order.islike==1">
							<view  class="up-operation-box1" @tap="uploadPic" data-name="likegoods" v-if="sendData.likegoods == ''">
								<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
							</view>
							<view v-if="sendData.likegoods != ''" @tap="uploadPic" data-name="likegoods">
								<image :src="sendData.likegoods" model="scaleToFill"></image>
							</view>
							<view style="margin-top:10upx;font-size: 22rpx;color:rgb(255, 75, 94);text-align:center;">收藏商品</view>
						</view>
						<view v-if="order.iscart==1">
							<view class="up-operation-box1"  @tap="uploadPic" data-name="cartgoods" v-if="sendData.cartgoods == ''">
								<image src="../../static/images/common/sub.png"  style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
								<!-- <text>点击上传</text> -->
							</view>
							<view v-if="sendData.cartgoods != ''"  @tap="uploadPic" data-name="cartgoods">
								<image :src="sendData.cartgoods" model="scaleToFill"></image>
							</view>
							<view style="margin-top:10upx;font-size: 22rpx;color:rgb(255, 75, 94);text-align:center;">加入购物车</view>
						</view>
						<view v-if="order.islikestore==1">
							<view  class="up-operation-box1" @tap="uploadPic" data-name="likeStore" v-if="sendData.likeStore == ''">
								<image src="../../static/images/common/sub.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill"></image>
								<!-- <text>点击上传</text> -->
							</view>
							<view v-if="sendData.likeStore != ''" @tap="uploadPic" data-name="likeStore">
								<image :src="sendData.likeStore" model="scaleToFill"></image>
							</view>
							<view style="margin-top:10upx;font-size: 22rpx;color:rgb(255, 75, 94);text-align:center;">收藏店铺</view>
						</view>
						
					</view>
					<!-- 目标答案验证 -->
					<view class=""  v-if="order.check_time<=0&&product.product_keywrods.isanswer==1">
						<view class="s-list has-bordertb has-mgtb-0" style="background-color: #ececec;">
							<view class="is-item" style="padding:0px;background-color: #ececec;">
								<view class="is-list2-info has-list2-tip " style="padding: 0px;">
									<view class="form-senddata">
										<view style="font-size: 28rpx;padding: 10upx 0;color: #969799;">请在商品详情页找到商家提供的字句进行验证</view>
					        			<view class="" style="font-size: 28rpx;padding: 10upx 0;color: #969799;">关键字句:{{product.search_keywords}} （{{product.search_keywords_length}}个字符）</view>
					        			<view class="input-answer has-mgt-10">
					        				<input placeholder-style="font-size:28rpx" style="border-color: #ccc;background-color: #fff;" type="text" :value="sendData.answer" :focus="focus.answer" @input="BindInput" data-val="sendData|answer" placeholder="请输入正确的目标答案">
					        				<button @tap="checkAnswer" style="background-color: #FF4B5E;font-size: 30rpx;">验证</button>
					        			</view>
									</view>
					            </view>
							</view>
					    </view>
					</view>
					<navigator v-if="product.product_keywrods.isanswer==1" url="/pages/detail/content?id=6" hover-class="navigator-hover"><view v-if="order.check_time<=0&&isLoading" style="color:#FF6600;font-size: 28rpx;">点击查看示例>>></view></navigator>
				</view>
				
			</view>
			<!-- 订单提交 
			*  -->
			<view >
				<view :class="[btnLoading?'activeBtn':'','submit-task-button']" @tap="submitTask" >{{btnLoading?'提交中...':'提交任务'}}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	var upload = require('../../common/lib/upload.js');
	import uniCountdown from "@/components/uni-countdown.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		data(){
			return {
				order_sn:"",//订单编号
				nowDate:new Date().getTime(),//当前时间时间戳
				userid:"",//用户id
				isLoading : false, //页面加载状态
				btnLoading : false, //按钮提交状态
				tag_list:[],
				"order": {
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
				},
				exampleImg:[
					"http:\/\/img.cdn.yunkeclub.com\/product\/picture\/ccde53a1c902d5fd4d5f41799bfce63f7f766867\/7f685b5fd572c412cf38e1e7cd2e7ec94311ad85.jpg",
					"http:\/\/img.cdn.yunkeclub.com\/product\/picture\/ccde53a1c902d5fd4d5f41799bfce63f7f766867\/7f685b5fd572c412cf38e1e7cd2e7ec94311ad85.jpg",
					"http:\/\/img.cdn.yunkeclub.com\/product\/picture\/ccde53a1c902d5fd4d5f41799bfce63f7f766867\/7f685b5fd572c412cf38e1e7cd2e7ec94311ad85.jpg",
					"http:\/\/img.cdn.yunkeclub.com\/product\/picture\/ccde53a1c902d5fd4d5f41799bfce63f7f766867\/7f685b5fd572c412cf38e1e7cd2e7ec94311ad85.jpg",
					"http:\/\/img.cdn.yunkeclub.com\/product\/picture\/ccde53a1c902d5fd4d5f41799bfce63f7f766867\/7f685b5fd572c412cf38e1e7cd2e7ec94311ad85.jpg",
					
				],
				"product": {
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
				sendData : {//提交数据
					instore_keywords : '',  // 进店关键词
					compare_goods_link1 : '', // 货比商品1
					compare_goods_link2 : '', // 货比商品2
					shop_goods_link1 : '', // 店内商品1
					shop_goods_link2 :'', // 店内商品2
					payment_img:"",//付款凭证
					additional_one:"",//附加图片1
					additional_two:"",//附加图片2
					additional_three:"",//附加图片3
					additional_four:"",//附加图片4
					answer : '', // 目标答案 
					answer_status : false, // 答案验证状态 
					storeName: '',//验证的店铺名称
					store_status : false, // 店铺名称验证状态 
					paymoney : '', // 实际付款金额 
					ordersn : '' , // 下单订单编号 
					postage_money:'',//实际付款邮费
					searchGoods:"",//搜索商品图
					productMain:"",//宝贝主图
					likegoods : '',//收藏商品图
					cartgoods : '',//加入购物车图
					likeStore : '', //收藏店铺图
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
					additional_one:"",//附加图片1
					additional_two:"",//附加图片2
					additional_three:"",//附加图片3
					additional_four:"",//附加图片4
				},
			}
		},	
		onLoad(param) {
			uni.showLoading({
				title: '加载中...'
			});
			this.order_sn = param.order_sn; 
			var userid = this.$SysUser.openid();
			if(!userid){//userid 不存在返回登录页
				uni.navigateTo({url:'/pages/ucenter/login'})
			}
			this.userid = userid; 
			this.loadData(); 
		},
		components: {
			uniCollapse,
			uniCollapseItem,
			uniCountdown
			
		},
		onShow:function(){
			
		},
		methods:{
			toHHmmss(data) {//时间戳转时分秒
				var s;
				var hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = (data % (1000 * 60)) / 1000;
				s = (hours < 10 ? ('0' + hours) : hours) + '小时' + (minutes < 10 ? ('0' + minutes) : minutes) + '分' + (seconds < 10 ? ('0' + parseInt(seconds)) : parseInt(seconds)) + '秒';
				return s;
			},
			submitImage(index){//提交每日图片
				let _this = this;
				if(this.order.submit_time == 0){
					uni.showToast({
						title:"请先提交第二步凭证信息~",icon:'none'
					})
					return false;
				}
				if((this.nowDate - (this.order.check_time*1000)) < 43200000){
					let timer =(this.order.check_time*1000 + 43200000) - this.nowDate;
					let timer_text = this.toHHmmss(timer);
					uni.showToast({
						title:"请于"+timer_text+"后提交~",icon:'none'
					})
					return false;
					
				}
				if(index==1){
					if(this.order.product_target.additional_one){
						uni.showToast({title:"不可重复提交",icon:'none'}) 
						return false;
					}
					if(this.sendData.additional_one==""&&!this.order.product_target.additional_one){
						uni.showToast({title:"上传凭证不能为空",icon:'none'}) 
						return false;
					}
					
					this.$Request("task/submitTaskOrderStepTwo",
						{
							uid:this.userid,
							additional_one:this.sendData.additional_one,
							order_sn:this.order_sn
						})
						.then(res=>{
						if (res.code == 200 ) {
							uni.showToast({title:res.msg,icon:'none'}) ;
							_this.sendData.additional_one = "";
							_this.loadData(); 
						}else{
							
						}
					}); 
				}else if(index==2){
					if(this.order.product_target.additional_two){
						uni.showToast({title:"不可重复提交",icon:'none'}) 
						return false;
					}
					if(this.sendData.additional_two==""&&!this.order.product_target.additional_two){
						uni.showToast({title:"上传凭证不能为空",icon:'none'}) 
						return false;
					}
					
					this.$Request("task/submitTaskOrderStepTwo",
						{
							uid:this.userid,
							additional_two:this.sendData.additional_two,
							order_sn:this.order_sn
						})
						.then(res=>{
						if (res.code == 200 ) {
							_this.sendData.additional_two = "";
							uni.showToast({title:res.msg,icon:'none'}) ;
							_this.loadData(); 
						}else{
							
						}
					}); 
				}else if(index==3){
					if(this.order.product_target.additional_three){
						uni.showToast({title:"不可重复提交",icon:'none'}) 
						return false;
					}
					if(this.sendData.additional_three==""&&!this.order.product_target.additional_three){
						uni.showToast({title:"上传凭证不能为空",icon:'none'}) 
						return false;
					}
					
					this.$Request("task/submitTaskOrderStepTwo",
						{
							uid:this.userid,
							additional_three:this.sendData.additional_three,
							order_sn:this.order_sn
						})
						.then(res=>{
						if (res.code == 200 ) {
							_this.sendData.additional_three = "";
							uni.showToast({title:res.msg,icon:'none'}) ;
							_this.loadData(); 
						}else{
							
						}
					}); 
				}else if(index==4){
					if(this.order.product_target.additional_four){
						uni.showToast({title:"不可重复提交",icon:'none'}) 
						return false;
					}
					if(this.sendData.additional_four==""&&!this.order.product_target.additional_four){
						uni.showToast({title:"上传凭证不能为空",icon:'none'}) 
						return false;
					}
					
					this.$Request("task/submitTaskOrderStepTwo",
						{
							uid:this.userid,
							additional_four:this.sendData.additional_four,
							order_sn:this.order_sn
						})
						.then(res=>{
						if (res.code == 200 ) {
							_this.sendData.additional_four = "";
							uni.showToast({title:res.msg,icon:'none'}) ;
							_this.loadData(); 
						}else{
							uni.showToast({title:res.msg,icon:'none'}) ;
						}
					}); 
				}
				
			},
			checkAnswer:function(){// 验证问题答案。 
				var answer = this.sendData.answer;
				if (answer == "") {
					uni.showToast({title:"请输入问题答案",icon:'none'})
				}else{
					this.$Request("task/checkAnswer",{product_id:this.product.id,answer:answer}).then(res=>{
						uni.showToast({title:res.msg,icon:'none'})
						if (res.code == 200 ) {
							this.sendData.answer_status = true; 
						}
					});
				}
			},
			checkStoreName:function(){//验证店铺名称
				var storeName = this.sendData.storeName;
				if (storeName == "") {
					uni.showToast({title:"请输入店铺名称",icon:'none'})
				}else{
					this.$Request("task/checkStoreName",{product_id:this.product.id,store_name:storeName}).then(res=>{
						uni.showToast({title:res.msg,icon:'none'})
						if (res.code == 200 ) {
							this.sendData.store_status = true;
						}
					});
				}
			},
			loadData:function(){//加载详情数据
				var _self = this; 
				this.$Request("task/getinfo",{order_sn:this.order_sn,uid:this.userid}).then(res=>{
					if (res.code == 200 ) {
						var order = res.data.order;
						var product = res.data.product;
						this.time=product.start_time;
						this.order  = order;
						if(product.goods_post==1){
							this.sendData.postage_money = 0;
						}
						this.product = product;
						this.placeholder_text = "请输入"+product.platform_name+"订单编号"; 
						
					}else{
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
						uni.navigateBack();
					}
					setTimeout(function(){
						_self.isLoading = true; 
						uni.hideLoading();
					},500)
					
				}); 
			},
			getLocation: function() {//获取经纬度
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
			format(shijianchuo){	//shijianchuo是整数，否则要parseInt转换
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth()+1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
			},
			openPlatformApp:function(){// 打开平台APP 
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
				    }
				}); 
			},
			clipBoardLink(link){//复制淘口令
				var platform_name = this.product.platform_name;
				uni.setClipboardData({
				    data: link,
				    success: function () {
				    	uni.showToast({
							title: "淘口令链接以复制，请打开"+platform_name+"客户端完成任务",
							icon: "none"
						});
				    }
				}); 
			},
			submitTask:function(){// 任务提交 
				var data = this.sendData;
				if (this.order.model == 1 ) {//垫付任务，实际付款金额，订单编号，实际付款金额必须小于返款金额，图片至少上传3张，验证目标答案		
					if(this.product.product_keywrods.isanswer==1){
						if(data['answer'] == "") {
							uni.showToast({title:"请输入目标答案",icon:'none'}) 
							return false;
						}
						if(data['answer_status'] == false) {
							uni.showToast({title:"目标答案未验证通过",icon:'none'}) 
							return false;
						}
					}else{
						
					}
					if(data['storeName'] == "") {
						uni.showToast({title:"请输入店铺名称",icon:'none'}) 
						return false;
					}
					if(data['store_status'] == false) {
						uni.showToast({title:"店铺名称未验证通过",icon:'none'})  
						return false;
					}
					if(data['postage_money'] === "") {
						uni.showToast({title:"请输入邮费",icon:'none'}) 
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
					if(data['payment_img'] == ""){
						uni.showToast({title:"请上传付款凭证截图",icon:'none'}) 
						return false;
					}
					if(data['paymoney']>this.product.total_goods_price){
						uni.showToast({title:"实际付款金额不得大于返款金额",icon:'none'});
						return false
					}
					var imgArr = [data['zuji1'],data["zuji2"],data["shop_goods_link2"],data['shop_goods_link1']];
					let arr = [];
					for(let i=0;i<imgArr.length;i++){
						if(imgArr[i]!=""){
							arr.push(imgArr[i]);
						}
					}
					if(arr.length<3){
						uni.showToast({title:"图片凭证至少上传3张~",icon:'none'});
						return false
					}
					
				}else if(this.order.model==2){//浏览单 判断目标答案和四张图片凭证， 其中搜索商品图为必传
					if(this.product.product_keywrods.isanswer==1){
						if(data['answer'] == "") {
							uni.showToast({title:"请输入目标答案",icon:'none'}) 
							return false;
						}
						if(data['answer_status'] == false) {
							uni.showToast({title:"目标答案未验证通过",icon:'none'}) 
							return false;
						}
					}else{
						if(data['productMain']==""){
							uni.showToast({title:"请上传宝贝主图",icon:'none'});
							return false;
						}
					}
					if(data['searchGoods']==""){
						uni.showToast({title:"请上传搜索商品图片",icon:'none'});
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
				}
				if (this.btnLoading) {
					return false; 
				}
				
				data['product_id'] = this.product.id;
				data['order_sn'] = this.order.order_sn; 
				data['uid'] = this.userid; 
				this.clearFocus(); 
				this.btnLoading = true; 
				var posturl = (this.order.model == 1||this.order.model==5  )? "task/submitTask" : "task/submitTaskView"; 
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
			BindInput:function(e){// 监听INPUT 事件
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
				var that = this;
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 1,
			        success: (res) => {
						uni.showLoading({
							title:"文件上传中",
							mask:true
						})
						upload({
							filePath: res['tempFilePaths'][0],
							success: function(upres) {
								if (upres.imageURL) {
									that.sendData[name] = upres['imageURL'];
									setTimeout(function(){
										uni.hideLoading(); 
									},1000)
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
		}
	}
</script>

<style>
	.tag-item-ll{
		background-color: #EB6100;
		color: #fff;
		font-size: 22rpx;
		text-align: center;
		padding: 5rpx 10rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}
	.tag-item-ls{
		background-color: #008AFF;
		color: #fff;
		font-size: 22rpx;
		text-align: center;
		padding: 5rpx 10rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}
	.advanve-task-explain{
		display: flex;
		
	}
	.advanve-task-explain>view:first-child{
		font-size: 28rpx;
		width: 40rpx;
		text-align: center;
	}
	.advanve-task-explain>view:last-child{
		width: calc(100% - 40rpx);
	}
	.advanve-task-explain{
		font-size: 22rpx;
	}
	.advanve-task-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.advanve-task-item-box{
		width: 31%;
		font-size: 22rpx;
		text-align:center;
		color: #3D3D3D;
	}
	.advanve-task-item-box>view:last-child{
		font-size: 26rpx;
		border-radius: 10rpx;
		margin-top: 5rpx;
	}
	.example-img-cotainer{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.example-img-box{
		width: 15vw;
		height: 15vw;
		margin-right: 3vw;
	}
	.example-img-box>image{
		width: 15vw;
		height: 15vw;
	}
	.tao-link-box{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.tao-link-box>view:first-child{
		width: 75%;
		white-space: nowrap;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		background-color: #fff;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 10rpx;
		border:2upx solid rgb(204, 204, 204);
		
	}
	.tao-link-box>view:last-child{
		width: 20%;
		background-color: rgb(255, 75, 94);
		color: #fff;
		text-align: center;
		border-radius: 10upx;
		height: 60rpx;
		line-height: 60rpx;
	}
	.is-item-line{
		padding:5rpx 24rpx;
		border-radius: 15rpx;
		background-color: #fff;
		width: 80%;
		margin-bottom: 20rpx;
	}
	.step-content{
		font-size: 26rpx;
		background-color: #ececec;
	}
	.step-content>view{
		font-size: 26rpx;
		padding: 12rpx;
		color: #969799;
	}
	.ys-show{
		/* padding:18rpx 24rpx; */
		background-color:#ececec;
	}
	.ys-show>view{
		/* margin-left: 75rpx;
		padding: 12rpx;
		color: #969799; */
	}
	.mg-left-cn>view{
	/* 	margin-left: 87rpx; */
		font-size: 26rpx;
		padding: 12upx 0;
	}
	.not-ready{
		color: #fff!important;
		background-color: #999!important;
	}
	.advance-title{
		color: #fff!important;
		background-color: #4A90E2;
		text-align: center;
		padding: 18rpx 24rpx;
	}
	.advance-info{
		padding:24rpx;
	}
	.step-two .img-sm{
		color: #666;
		background-color: #fff;
	}
	.img-sm{
		text-align: center;
		margin-top: 14rpx;
		color: #fff;
		background-color: #108ee9;
		border-radius: 10upx;
	}
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
	#taskOpeartion .timer-box{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
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
	#taskOpeartion .gray-task-button{
		width: 100%;
		text-align: center;
		background-color: #999 ;
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
		border: 2upx dotted #969799;
		
	}
	.up-operation-box1{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		width: 100%!important;
		height: 15vw;
		border: 2upx dotted #969799;
		
	}
	.images-operation-cotainer{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 18rpx 24rpx;
		background-color: #ececec;
	}
	.images-operation-cotainer1{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 18rpx 24rpx;
		background-color: #ececec;
	}
	.images-operation-cotainer1>view{
		width: 15vw;
		margin-right: 3vw;
	}
	.images-operation-cotainer1 view image{
		width: 100%;
		vertical-align: middle;
		height: 15vw;
	}
	.images-operation-cotainer>view{
		width: 20vw;
		margin-right: 3vw;
	}
	.images-operation-cotainer view image{
		width: 100%;
		vertical-align: middle;
		height: 20vw;
	}
	.step-title{
		padding:18rpx 24rpx;
		text-align: center;
		/* color:#4A90E2; */
		font-size: 30rpx;
		display:flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		background-color: #ececec;
		border-bottom: 1px solid #ddd;
		color: #333;
	}
	.step-title>.step-fake-btn{
		background-color: #FF9DA8;
		color: #fff;
		height: 50rpx;
		width: 50rpx;
		line-height: 50rpx;
		border-radius: 100%;
	}
	.upImg-title{
		text-align: center;
		padding: 24rpx;
		font-size: 30rpx;
	}
	.is-item{
		/* background-color: #fff; */
	}
	#taskOpeartion{
		font-size: 30rpx;
		color: #969799;
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
	#taskOpeartion .uni-collapse-cell__title{
		background-color: #f8f8f8!important;
	}
</style>

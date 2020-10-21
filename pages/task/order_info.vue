<template>
	<view v-if="isLoading && order.status > 0 ">
		<view class="content s-page-wrapper">
			<view class="s-col is-col-24">
				<view class="s-list-title" v-if="product.platform == 'taobao'">
					<span class="iconfont icon-unie651 is-size-17 has-pdr-5"></span>商家信息
					<text class="is-size-12 has-floatr is-red iconfont icon-liaotian" @tap="contactMall()"> 联系我们</text>
				</view>
				<view class="s-list-title" v-if="product.platform == 'jd'">
					<span class="iconfont icon-jingdongbaitiao is-size-17 has-pdr-5"></span>商家信息
					<text class="is-size-12 has-floatr is-red iconfont icon-liaotian" @tap="contactMall()"> 联系我们</text>
				</view>
				<view class="s-list-title" v-if="product.platform == 'tmall'">
					<span class="iconfont icon-tianmao is-size-17 has-pdr-5"></span>商家信息
					<text class="is-size-12 has-floatr is-red iconfont icon-liaotian" @tap="contactMall()"> 联系我们</text>
				</view>

				<view class="s-list">
					<view class="is-item has-pdtb-10">
						<view class="is-item-hd has-desc-color is-size-14">
							<view>店铺名称：</view>
						</view>
						<view class="is-item-ft is-right is-black">
							{{product.store_name}}
						</view>
					</view>
					<view class="is-item has-pdtb-10">
						<view class="is-item-hd has-desc-color is-size-14">
							<view>掌柜名称：</view>
						</view>
						<view class="is-item-ft is-right is-black">
							{{product.shopkeeper}}
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
							<view class="has-desc-color is-size-12">搜索展示 价：<span class="is-blue is-bold has-pdr-5">{{product.goods_search_price}}</span>元</view>
							<view class="has-desc-color is-size-12">商品成交 价：<span class="is-blue is-bold has-pdr-5">{{product.goods_price*product.goods_num}}</span>元</view>
							<view class="has-desc-color is-size-12">拍下件数/单：<span class="is-blue is-bold has-pdr-5">{{product.goods_num}}</span>件</view>
						</view>
					</view>
				</view>
			</view>

			<view class="s-col is-col-24">
				<view class="s-list-title"><span class="iconfont icon-yemianbucunzai is-size-17 has-pdr-5"></span>任务状态</view>
				<view class="s-list">

					<view class="is-item has-pd-10">
						<view class="is-item-hd">
							任务状态：
						</view>
						<view class="is-item-bd is-red">
							<view>{{order.order_status}}</view>
						</view>
					</view>
					<view class="is-item has-pd-10" v-if="order.buyer_last_time > 0  && product.model != 4">
						<view class="is-item-hd">
							开始时间：
						</view>
						<view class="is-item-bd">
							<text class=" is-red">{{order.buyer_last_time_str}}</text>开始
						</view>
					</view>
					<view class="is-item has-pd-10" v-if="order.order_expire_time > 0 && product.model != 4">
						<view class="is-item-hd">
							剩余完成时间：
						</view>
						<view class="is-item-bd">
							<uni-countdown font-color="red" splitor-color="red" bgr-color="#FFFFFF" border-color="#fffff" splitorTextl=":"
							 splitorTextr=":" :timer="order.order_expire_time_str"></uni-countdown>
						</view>
					</view>
					<!-- 新增预约任务时间显示 -->
					<view class="is-item has-pd-10" v-if="product.model == 4">
						<view class="is-item-hd">
							预约开始时间：
						</view>
						<view class="is-item-bd">
							<!-- <uni-countdown font-color="red" splitor-color="red" bgr-color="#FFFFFF" border-color="#fffff" splitorTextl=":"
							 splitorTextr=":" :timer="product.start_time_str"></uni-countdown> -->
							 {{product.start_time_str}}
						</view>
						
						
					</view>
					<view class="is-item has-pd-10" v-if="product.model == 4">
						<view class="is-item-hd">
							任务描述：
						</view>
						<view class="is-item-bd is-size-12 is-red">
							 该任务为预约任务，任务时间之后才可提交任务。  提交任务的时间在预约开始时间到之后的两小时之内
						</view>
					</view>
					<view class="is-item has-pd-10">
						<view class="is-item-hd">
							商家要求：
						</view>
						<view class="is-item-bd is-gold">
							<view>{{product.remark||"此商家没有额外的要求"}}</view>
						</view>
					</view>
					<view class="is-item has-pd-10">
						<view class="is-item-hd">
							订单留言：
						</view>
						<view class="is-item-bd is-gold">
							<view>{{product.message||"无需留言"}}</view>
						</view>
					</view>
					<view class="is-item has-pd-10 has-pdb-20 task-opt">
						<view class="is-item-bd">
							<button v-if="order.status == 1" class="has-bg-base" @tap="submitOrder">去做任务</button>
							<button disabled="" v-if="order.status != 1">去做任务</button>
						</view>
						<view class="is-item-bd has-pdl-10">
							<!-- 如果订单状态是已经提交过的任务 且未申诉的任务 可以申诉 -->
							<button v-if="order.status > 1 && order.apply_status ==0 && order.apply_time == 0 " @tap="appealOrder">申述任务</button>

							<!-- 如果订单状态是已经提交过的任务 且已完成的申诉如买手对申诉不满意可以再次发起申诉 -->
							<button v-if="order.status > 1 && order.apply_status ==0 && order.apply_time > 0 " @tap="appealOrder">再次申诉</button>

							<!-- 申诉中的任务可查看详情 -->
							<button v-if="order.apply_status == 1" @tap="appealInfo">申诉详情</button>
							<button disabled="" v-if="order.status <= 1">申述任务</button>
						</view>
						<view class="is-item-bd has-pdl-10">
							<button v-if="order.status <= 1 " @tap="clearOrder">取消任务</button>
							<button disabled="" v-if="order.status > 1">取消任务</button>
						</view>
					</view>
				</view>
			</view>

			<view class="s-col is-col-24" v-if="order.model == 1 || order.model==4 ">
				<view class="s-list has-pdt-0 has-mgt-0">
					<view class="is-item has-pd-10">
						<view class="is-item-bd">
							<!-- 第一步 -->
							<view>
								<span class="number-box has-mgr-5">1</span>接手任务<span class="is-size-14 is-grey">{{order.addtime_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>任务编号：<span>{{order.order_sn}}</span><span class="copy-btn" @tap="copy(order.order_sn)">复制</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>下单买号：<span>{{order.buyer_name}}</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>商品金额：<span>{{product.total_goods_price}}元</span></view>
								</view>
							</view>

							<!-- 第二步 -->
							<view v-if="order.orderid_time < 1">
								<span class="number-box nostatus-box has-mgr-5">2</span>订单付款<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.orderid_time > 1">
								<span class="number-box has-mgr-5">2</span>订单付款<span class="is-size-14 is-grey">{{order.orderid_time_str}}</span>
							</view>

							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>订单编号：<span>{{order.orderid||""}}</span>
										<span class="copy-btn" v-if="order.status == 2 " @tap="editOrderSn(order.order_sn)">修改</span>
									</view>
								</view>
							</view>

							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>付款金额：<span>{{order.pay_money||""}}元</span></view>
								</view>
							</view>

							<!-- 第三步 -->
							<view v-if="order.status <= 2">
								<span class="number-box nostatus-box has-mgr-5">3</span>商家确认订单<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status > 2">
								<span class="number-box has-mgr-5">3</span>商家确认订单<span class="is-size-14 is-grey">{{order.check_time_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款方式：<span>平台返款</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款帐号：<span>{{webname}}本金账户</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款金额：<span>{{product.total_goods_price}}元</span>
										<span class="copy-btn" v-if="order.status > 3 && order.hasten_refunds == 0" @tap="cuifankuan(order.order_sn)">催返款</span>
									</view>
								</view>
							</view>

							<!-- 第四步 -->
							<view v-if="order.status < 4">
								<span class="number-box nostatus-box has-mgr-5">4</span>收货好评<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status >= 4">
								<span class="number-box has-mgr-5">4</span>收货好评<span class="is-size-14 is-grey">{{order.evaluate_time_str}}</span>
							</view>

							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 4  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>提示说明：<span>务必在物流显示签收后确认</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 4 ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>评价类型：<span>{{product.product_keywrods.modeltype_str}}</span>
										<span class="copy-btn has-bg-blue is-white" v-if="order.status==3" @tap="evaluateSucc(order.order_sn)">我已评价</span>
									</view>
								</view>
							</view>

							<block v-if="product.product_keywrods.modeltype != 1 ">
								<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 4  ? 'nostatus-box' : '']" @tap="toContentInfo()">
									<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
										<view class="is-red">该任务{{product.product_keywrods.modeltype_str}}，点击查看评价要求</view>
									</view>
								</view>
							</block>

							<!-- 第五步 -->
							<view v-if="order.status < 5">
								<span class="number-box nostatus-box has-mgr-5">5</span>任务完成<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status >= 5">
								<span class="number-box has-mgr-5">5</span>任务完成<span class="is-size-14 is-grey">{{order.refunds_time_str}}</span>
							</view>

							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 5  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>获得佣金：<span>{{order.commision}}元</span></view>
								</view>
							</view>


						</view>
					</view>
				</view>
			</view>

			<view class="s-col is-col-24" v-if="order.model == 2 ">
				<view class="s-list has-pdt-0 has-mgt-0">
					<view class="is-item has-pd-10">
						<view class="is-item-bd">
							<!-- 第一步 -->
							<view>
								<span class="number-box has-mgr-5">1</span>接手任务<span class="is-size-14 is-grey">{{order.addtime_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>任务编号：<span>{{order.order_sn}}</span><span class="copy-btn" @tap="copy(order.order_sn)">复制</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>下单买号：<span>{{order.buyer_name}}</span></view>
								</view>
							</view>


							<!-- 第二步 -->
							<view v-if="order.orderid_time < 1">
								<span class="number-box nostatus-box has-mgr-5">2</span>提交任务<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.orderid_time > 1">
								<span class="number-box has-mgr-5">2</span>提交任务<span class="is-size-14 is-grey">{{order.orderid_time_str}}</span>
							</view>

							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>订单编号：<span>{{order.orderid||""}}</span>
										<span class="copy-btn" v-if="order.status == 2 " @tap="editOrderSn(order.order_sn)">修改</span>
									</view>
								</view>
							</view>

							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>付款金额：<span>{{order.pay_money||""}}元</span></view>
								</view>
							</view>

							<!-- 第三步 -->
							<view v-if="order.status < 5">
								<span class="number-box nostatus-box has-mgr-5">5</span>任务完成<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status >= 5">
								<span class="number-box has-mgr-5">5</span>任务完成<span class="is-size-14 is-grey">{{order.refunds_time_str}}</span>
							</view>

							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 5  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>获得佣金：<span>{{order.commision}}元</span></view>
								</view>
							</view>


						</view>
					</view>
				</view>
			</view>

			<view class="s-col is-col-24" v-if="order.model == 3 ">
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
				<view class="s-list has-pdt-0 has-mgt-0">
					<view class="is-item has-pd-10">
						<view class="is-item-bd">
							<!-- 第一步 -->
							<view>
								<span class="number-box has-mgr-5">1</span>接手任务<span class="is-size-14 is-grey">{{order.addtime_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>任务编号：<span>{{order.order_sn}}</span><span class="copy-btn" @tap="copy(order.order_sn)">复制</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>下单买号：<span>{{order.buyer_name||""}}</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num  is-grey">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>商品金额：<span>{{product.total_goods_price}}元</span></view>
								</view>
							</view>

							<!-- 第二步 -->
							<view v-if="order.orderid_time < 1">
								<span class="number-box nostatus-box has-mgr-5">2</span>订单付款<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.orderid_time > 1">
								<span class="number-box has-mgr-5">2</span>订单付款<span class="is-size-14 is-grey">{{order.orderid_time_str}}</span>
							</view>

							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>订单编号：<span>{{order.orderid||""}}</span>
										<span class="copy-btn" v-if="order.status == 2 " @tap="editOrderSn(order.order_sn)">修改</span>
									</view>
								</view>
							</view>

							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['orderid_time'] < 1  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>付款金额：<span>{{order.pay_money||""}}元</span></view>
								</view>
							</view>

							<!-- 第三步 -->
							<view v-if="order.status <= 2">
								<span class="number-box nostatus-box has-mgr-5">3</span>商家确认订单<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status > 2">
								<span class="number-box has-mgr-5">3</span>商家确认订单<span class="is-size-14 is-grey">{{order.check_time_str}}</span>
							</view>
							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款方式：<span>平台返款</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款帐号：<span>{{webname}}本金账户</span></view>
								</view>
							</view>
							<view class="has-pd-10 left-num is-grey" v-bind:class="[order['status'] <=2  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>返款金额：<span>{{product.total_goods_price}}元</span>
										<span class="copy-btn" v-if="order.status > 2 && order.hasten_refunds == 0" @tap="cuifankuan(order.order_sn)">催返款</span>
									</view>
								</view>
							</view>
							<!-- 第4步 -->
							<view v-if="order.status < 5">
								<span class="number-box nostatus-box has-mgr-5">4</span>任务完成<span class="is-size-14 is-grey"></span>
							</view>
							<view v-if="order.status >= 5">
								<span class="number-box has-mgr-5">5</span>任务完成<span class="is-size-14 is-grey">{{order.refunds_time_str}}</span>
							</view>

							<view class="has-pdt-20 has-pd-10 left-num is-grey" v-bind:class="[order['status'] < 5  ? 'nostatus-box' : '']">
								<view class="is-item-bd is-size-14 has-borderb has-pdb-10">
									<view>获得佣金：<span>{{order.commision}}元</span></view>
								</view>
							</view>


						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>

	<view v-else>
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
</template>

<script>
	import uniCountdown from "@/components/uni-countdown.vue"
	import uniPopup from "@/components/uni-popup.vue"
	export default {
		data() {
			return {
				order_sn: "",
				userid: "",
				order: [],
				product: [],
				isLoading: false,
				webname: "",
				buyerName: "",
				popupModal: false,
			}
		},
		components: {
			uniCountdown,
			uniPopup
		},
		onLoad(param) {
			this.order_sn = param.order_sn;
			this.webname = this.$Sysconf("webname");
		},
		onShow: function() {
			var userid = this.$SysUser.openid();
			if (!userid) {
				uni.navigateTo({
					url: '/pages/ucenter/login'
				})
			}
			this.userid = userid;
			this.loadData();
		},
		methods: {
			loadData: function() {
				var _self = this;
				uni.showLoading({
					title: '加载中...'
				});
				this.$Request("task/getinfo", {
					order_sn: this.order_sn,
					uid: this.userid
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						var order = res.data.order;
						var product = res.data.product;
						this.isLoading = true;
						this.order = order;
						this.product = product;
						console.log(this.product)
						this.placeholder_text = "请输入" + product.platform_name + "订单编号";
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						setTimeout(function() {
							uni.redirectTo({
								url: '/pages/task/index'
							});
						}, 2000);
					}
				});
			},
			previewImage: function() {
				var src = this.product.goods_picture;
				var urls = [];
				urls[0] = src;
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage([src]);
				//#endif
			},
			submitOrder: function() {
				var order_sn = this.order_sn;
				if (this.order.model == 3) {
					this.popupModal = true;
				} else {
					// 去操作任务
					console.log(order_sn)
					uni.navigateTo({
						url: '/pages/index/detail?order_sn=' + order_sn
					});
				}
			},
			contactMall: function() {
				console.log(this.order)
				var mall_id = this.order.mall_id;
// 				uni.navigateTo({
// 					url: "/pages/message/chat?userid=" + mall_id,
// 				})
				// ysf('url')
// 				uni.navigateTo({
// 					url: "http://92game.yiyunwangluo.cn/test.html",
// 				})
				 // location.href="http://92game.yiyunwangluo.cn/test.html";
				uni.navigateTo({
					url: "/pages/message/chat1?userid=" + mall_id,
				})
			},
			appealOrder: function() {
				// 去申诉任务
				var order_sn = this.order_sn;
				uni.navigateTo({
					url: '/pages/task/appeal?order_sn=' + order_sn
				});
			},
			appealInfo: function() {
				// 申诉详情
				var order_sn = this.order_sn;
				uni.navigateTo({
					url: '/pages/help/appealInfo?order_sn=' + order_sn
				});
			},
			clearOrder: function() {
				// 取消任务 
				var order_sn = this.order_sn;
				uni.navigateTo({
					url: '/pages/task/clear?order_sn=' + order_sn
				});
			},
			copy: function(val) {
				uni.setClipboardData({
					data: val,
					success: function() {
						uni.showToast({
							title: "复制成功！"
						})
					}
				});
			},
			toContentInfo: function(orderid) {
				var order_sn = this.order_sn;
				uni.navigateTo({
					url: '/pages/task/evaluateInfo?order_sn=' + order_sn
				});
			},
			cuifankuan: function(orderid) {
				this.$Request("task/hasten_refunds", {
					uid: this.userid,
					order_sn: orderid
				}).then(res => {
					if (res.code == 200) {
						this.order.hasten_refunds = 1;
						uni.showToast({ title: '已成功提醒商家尽快返款!', icon: 'none' });
					}
				});
			},
			editOrderSn: function(orderid) {
				var that = this;
				// 修改订单编号 
				plus.nativeUI.prompt("修改订单编号", function(e) {
					if (e.index == 0) {
						if (e.value == "") {
							uni.showToast({
								title: "未输入新订单编号"
							})
							return false;
						}
						this.$Request("task/update_ordersn", {
							order_sn: orderid,
							orderid: e.value,
							uid: that.userid,
						}).then(res => {
							uni.showToast({
								title: res.msg
							})
							if (res.code == 200) {
								that.order.orderid = e.value; //更新新订单编号
							}
						});
						console.log(e.value);
					}
				}, "", "请输入新订单编号", ["确定", "取消"]);
			},
			evaluateSucc: function(orderid) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '您确定快递已经签收了吗？评价也必须要按照评价要求填写哦！',
					success: function(res) {
						if (res.confirm) {
							uni.showLoading({
								mask: true,
								title: "请稍等...",
							});
							that.$Request("task/evaluateSucc", {
								uid: that.userid,
								order_sn: orderid
							}).then(req => {
								uni.hideLoading();
								uni.showToast({
									title: req.msg
								})
								if (req.code == 200) {
									that.order.status = 4; // 更新状态 
									that.order.evaluate_time_str = req['data']['refunds_time_str'];
								}
							}).catch(err => {
								uni.hideLoading();
								uni.showToast({
									title: "系统繁忙"
								});
							});
						} else {

						}
					}
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
			onClose: function() {
				this.popupModal = false;
				this.buyerName = "";
			},
			bindInput: function(e) {
				this.buyerName = e.detail.value;
			}
		},
		onUnload: function() {
			// this.sendData =  {
			// 		instore_keywords : '',  // 进店关键词
			// 		compare_goods_link1 : '', // 货比商品1
			// 		compare_goods_link2 : '', // 货比商品2
			// 		answer : '', // 目标答案 
			// 		answer_status : false, // 答案验证状态 
			// 		paymoney : '', // 实际付款金额 
			// 		ordersn : '' , // 下单订单编号 
			// }
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

	.icon-busy {
		color: #666;
		font-size: 150rpx;
	}

	.is-item,
	.is-item-line {
		padding: 10rpx 20rpx;
	}

	.s-list2-title {
		margin-top: 18rpx !important;
	}

	.input-answer input {
		width: 75%;
		float: left;
		height: 70rpx;
		border: 1px solid #eee;
		line-height: 70rpx;
		padding-left: 6px;
		font-size: 30rpx;
	}

	.input-answer button {
		width: 20%;
		float: right;
		border: none;
		background: @baseBackGroundColor;
		color: #fff;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
	}

	.form-senddata {
		width: 100%;
	}

	.ordersnInf input {
		height: 90rpx;
		line-height: 70rpx;
		padding: 5rpx;
	}

	.task-opt .is-item-bd {
		width: 25%;
	}

	.task-opt .is-item-bd button {
		border: 2rpx solid @baseBackGroundColor;
		background: @baseBackGroundColor;
		color: #fff;
		line-height: 2;
	}

	.task-opt .is-item-bd button:after {
		border: none;
	}

	.task-opt .is-item-bd button[disabled] {
		border: 2rpx solid #ddd;
		background: #ddd;
		color: #fff;
	}

	.number-box {
		padding: 5rpx 20rpx;
		background: @baseBackGroundColor;
		border-radius: 8rpx;
		color: #ffff;
		font-size: 30rpx;
	}

	.number-box.nostatus-box {
		background: #999999;
	}

	.left-num {
		border-left: 10rpx solid @baseBackGroundColor;
		padding-left: 33rpx;
		margin-left: 20rpx
	}

	.nostatus-box.left-num {
		border-left: 10rpx solid #999999;
	}

	.left-num .is-item-bd {
		padding-left: 15rpx;
	}

	.copy-btn {
		text-align: right;
		float: right;
		border: 2rpx solid #ddd;
		color: #999;
		padding: 10rpx 15rpx;
		border-radius: 5rpx;
		font-size: 25rpx;
		margin-top: -8px;
	}

	.copy-btn .has-bg-blue {
		border: none;
	}

	.popupMain {
		width: 90%;
	}

	.popupMain {
		width: 100%;
	}

	.popup-content {
		min-width: 100%;
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

	.uni-countdown {
		-webkit-box-pack: left !important;
		-webkit-justify-content: left !important;
		justify-content: left !important;

	}

	.uni-countdown-numbers {
		border: none !important;
		font-size: 29rpx !important;

	}
</style>

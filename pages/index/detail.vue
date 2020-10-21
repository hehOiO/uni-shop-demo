<template>

	<view class="content s-page-wrapper">
		<view class="s-col is-col-24" v-if="isLoading">
            <view class="s-list-title" v-if="product.platform == 'taobao'">
            	<span class="iconfont icon-unie651 is-size-17 has-pdr-5"></span>商家信息
            </view>
            <view class="s-list-title" v-if="product.platform == 'jd'">
            	<span class="iconfont icon-jingdongbaitiao is-size-17 has-pdr-5"></span>商家信息
            </view>
            <view class="s-list-title" v-if="product.platform == 'tmall'">
            	<span class="iconfont icon-tianmao is-size-17 has-pdr-5"></span>商家信息
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

		<view class="s-col is-col-24" v-if="isLoading">
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


		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-wuxianzhi is-size-17 has-pdr-5"></span>任务要点</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item" v-if="order.model == 1 ||order.model==4">
					<view class="is-list2-info has-list2-tip ">
                        <view class="is-list2-tip">任务类型</view>
                        <view class="is-gold">{{product.platform_name}}{{product.product_platform}}</view>
                    </view>
				</view>
				<view class="is-item" v-if="order.model == 1 || order.model==4">
					<view class="is-list2-info has-list2-tip ">
                        <view class="is-list2-tip">评价要求</view>
                        <view class="is-gold">{{product.product_keywrods.modeltype_str}}</view>
                    </view>
				</view>
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="is-list2-tip">收货人数</view>
                        <view class="is-gold">≈{{product.goods_position}}人</view>
                    </view>
				</view>
				<view class="is-item is-a" @tap="openPlatformApp">
					<view class="is-list2-info has-list2-tip">
                        <view class="is-list2-tip">搜索关键词<text class="is-red">（点击可复制）</text></view>
                        <view class="is-gold is-size-16">{{product.product_keywrods.keywords}}</view>
                    </view>
				</view>
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="is-list2-tip">排序方式</view>
                        <view class="is-gold">{{product.goods_sort}}</view>
                    </view>
				</view>
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="is-list2-tip">价格区间</view>
                        <view class="is-gold" v-if="product.minprice > 0 && product.maxprice > 0">{{product.minprice}}~{{product.maxprice}}</view>
                        <view class="is-gold" v-else>无需价格筛选</view>
                    </view>
				</view>
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="is-list2-tip">商品所在地</view>
                        <view class="is-gold">{{product.upaddress||"全国"}}</view>
                    </view>
				</view>
            </view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-weiwancheng is-size-17 has-pdr-5"></span>商家额外的要求</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="is-gold">{{product.remark||"此商家没有额外的要求"}}</view>
                    </view>
				</view>
            </view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-zhuyishixiang is-size-18 has-pdr-5"></span>注意事项</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class=""  v-if="order.model == 1 ">
                        	<view class="has-mgb-15 is-grey is-size-12">平台中接收任务的买号必须和{{product.platform_name}}实际浏览商品的买号一致。</view>
                        	<view class="has-mgb-15 is-grey is-size-12">注意查看任务要求，选择正确的排序或搜索方式，请勿随意增加搜索条件。商家要求聊天的，请围绕商品询问至少4个相关的问题，不得一次性复制4个问题给客服，如果客服不在线，等待超过10分钟的可以直接下单。</view>
                        	<view class="has-mgb-15 is-grey is-size-12">严禁和卖家旺旺聊天提到“刷单”、“信誉”、“任务”平台名称等敏感词语，有问题可以发起申诉。</view>

                        	<view class="has-mgb-15 is-grey is-size-12">{{product.platform_name}}上实际绑定的下单地址必须和平台接任务的帐号绑定的地址一致。如收货信息有变更请先修改信息后再接任务。</view>
                        	<view class="has-mgb-15 is-grey is-size-12">{{product.platform_name}}不允许使用信用卡、花呗等任何信用类方式付款，不允许使用集分宝、淘金币、天猫积分等积分抵扣付款金额，否则将从本金中扣除购物金额。</view>
                        	<view class="has-mgb-15 is-grey is-size-12">一定要等到快递真实签收后才能确认收货并按任务的评价要求给予5分好评。</view>
                        	<view class="has-mgb-15 is-grey is-size-12">恶意提交与任务无关的图片将根据买手处罚规则进行处罚。</view>
                        </view>

                        <view class="" v-else>
                        	<view class="has-mgb-15 is-grey is-size-12">平台中接收任务的买号必须和{{product.platform_name}}实际浏览商品的买号一致。</view>
                        	<view class="has-mgb-15 is-grey is-size-12">注意查看任务要求，选择正确的排序或搜索方式，请勿随意增加搜索条件</view>
                        	<view class="has-mgb-15 is-grey is-size-12">严禁和卖家旺旺聊天提到“刷单”、“信誉”、“任务”平台名称等敏感词语，有问题可以发起申诉。</view>
                        	<view class="has-mgb-15 is-grey is-size-12">恶意提交与任务无关的图片将根据买手处罚规则进行处罚。</view>
                        </view>
                    </view>
				</view>
            </view>
		</view>

	<block v-if="order.model == 1 ">
		<!-- 垫付任务 -->
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-visibility is-size-18 has-pdr-5"></span>任务步骤</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="">
                			<navigator url="/pages/detail/content?id=4" hover-class="navigator-hover" class="is-size-16 is-gold">第一步 货比三家 <text class="is-blue">点击查看示例</text></navigator>

                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-14">请确认使用<text class="is-gold">{{order.buyer_name}} </text>账户登录手机{{product.platform_name}}应用</view>

                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-14">打开{{product.platform_name}}客户端后请手动输入搜索关键词，关键词不可自定修改</view>

                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-14">按要求筛选搜索条件，请勿随意增加搜索条件，进入商品至上而下缓缓浏览，至少浏览三分钟。并在目标商品的详情中找到以下问题的答案。</view>
                        </view>
                    </view>
				</view>
            </view>
		</view>


		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list-title has-mgtb-1 is-red">浏览足迹截图<text class="is-black">请上传浏览足迹截图(点击图片可以修改)</text></view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 浏览足迹上传截图 -->
                			<view class="input-answer has-mgt-10 has-mgb-15" @tap="uploadPic" data-name="zuji1">
                				<view class="upload is-center">
									<image :src="sendData.zuji1" style="max-width: 200px;max-height: 200px;" v-if="sendData.zuji1 != ''"></image>
                					<text class="iconfont icon-xiazai is-size-28" v-if="sendData.zuji1 == ''"></text>
                				</view>
                			</view>
							<!-- 浏览足迹上传截图1 -->
						</view>
                    </view>
				</view>
            </view>
		</view>



		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list has-bordertb has-mgtb-0  has-mgt-10">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="">
                			<navigator url="/pages/detail/content?id=5" hover-class="navigator-hover" class="is-size-16 is-gold">第二步 浏览店铺<text class="is-blue">点击查看示例</text></navigator>

                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">根据主图、价格、名称等找到目标商品，点击进入店铺。</view>
                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">浏览店铺任意2个商品，至少浏览1分钟，复制并上传分享链接。</view>
                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">回到目标商品，至上而下至少浏览3分钟，在目标商品中找到以下答案。</view>
                        </view>
                    </view>
				</view>
            </view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list-title has-mgtb-1 is-red">浏览足迹截图<text class="is-black">请上传浏览店铺后的足迹截图(点击图片可修改)</text></view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 浏览足迹上传截图 -->
							<view class="input-answer has-mgt-10 has-mgb-15" @tap="uploadPic" data-name="zuji2">
								<view class="upload is-center">
									<image :src="sendData.zuji2" style="max-width: 200px;max-height: 200px;" v-if="sendData.zuji2 != ''"></image>
									<text class="iconfont icon-xiazai is-size-28" v-if="sendData.zuji2 == ''"></text>
								</view>
							</view>
							<!-- 浏览足迹上传截图1 -->
						</view>
                    </view>
				</view>
            </view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading && product.search_keywords != '' ">
			<view class="s-list-title has-mgtb-1 is-red">目标答案</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 目标关键词 -->
                			<navigator url="/pages/detail/content?id=6" hover-class="navigator-hover" class="is-size-16 is-gold">请在<text class="is-red">目标商品详情 </text>中找到以下答案 <text class="is-blue">如何找答案</text></navigator>

                			<view class="has-pdt-10 has-mgt-10 has-bordert">问题：{{product.search_keywords}} （{{product.search_keywords_length}}个字符）</view>
						
                			<view class="input-answer has-mgt-10">
                				<input type="text" :value="sendData.answer" :focus="focus.answer" @input="BindInput" data-val="sendData|answer" placeholder="请输入问题答案">
                				<button @tap="checkAnswer">验证</button>
                			</view>
                			<!-- 目标关键词 -->
						</view>
                    </view>
				</view>
            </view>
		</view>


		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-weiwancheng is-size-17 has-pdr-5"></span>订单留言</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="is-gold">{{product.message||""}}</view>
                    </view>
				</view>
            </view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list has-bordertb has-mgtb-10">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="">
                			<navigator url="/pages/detail/content?id=7" hover-class="navigator-hover" class="is-size-16 is-gold">第三步 聊天下单并提交付款<text class="is-blue">点击查看示例</text></navigator>

                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">点击联系客服按钮，和商家客服至少4个问题的互动</view>
                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">确认好件数、颜色尺寸、将商品加入购物车</view>
                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">下单付款前仔细核对购买账号、收货信息以及留言，确认订单无误后付款。</view>
                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">下单后填写实际付款金额与正确的订单编号。</view>

                			<view class="has-mgt-10 has-mgb-15 is-black is-size-14">应付款金额参考：{{product.goods_price*product.goods_num}}元（请按照实际付款金额填写）订单编号可在{{product.platform_name}}订单详情中查询。</view>
                			<view class="has-mgt-10 has-mgb-15 is-black is-size-12">
                				<navigator url="/pages/detail/content?id=10" hover-class="navigator-hover" class="is-size-16 is-gold">如何获取订单编号？<text class="is-blue">点击查看示例</text></navigator>
                			</view>
                        </view>
                    </view>
				</view>
            </view>
		</view>

		<view class="" v-if="isLoading">
            <view class="s-col is-col-24 ordersnInf">
                <view class="s-list">
                    <view class="is-item-line">
                        <view class="is-item-bd">
                            <input type="number" :value="sendData.paymoney" :focus="focus.paymoney" placeholder="请输入实际付款金额" @input="BindInput" data-val="sendData|paymoney" >
                        </view>
                    </view>
                    <view class="is-item-line ">
                        <view class="is-item-bd">
                            <input type="number" :value="sendData.ordersn" :focus="focus.ordersn" :placeholder="placeholder_text"  @input="BindInput" data-val="sendData|ordersn" >
                        </view>
                    </view>
                </view>
            </view>
        </view>

		<view class="" v-if="isLoading">
            <view class="s-col is-col-24 ordersnInf">
                <view class="s-list">
                    <view class="is-item-line ">
                        <view class="is-item-bd s-btn" @tap="submitTask">
                            <view class="is-btn-lg has-bg-blue">
                            	{{btnLoading ? '提交中...':'提交任务'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </block>

	<block  v-if="order.model == 2 ">
		<!-- 浏览任务区域 -->
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-visibility is-size-18 has-pdr-5"></span>任务步骤</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
                        <view class="">
                			<navigator url="/pages/detail/content?id=12" hover-class="navigator-hover" class="is-size-16 is-gold">浏览任务 <text class="is-blue">点击查看示例</text></navigator>

                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">请确认使用<text class="is-gold">{{order.buyer_name}} </text>账户登录手机{{product.platform_name}}应用</view>

                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">打开{{product.platform_name}}客户端后请手动输入搜索关键词，关键词不可自定修改</view>

                			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">按要求筛选搜索条件，请勿随意增加搜索条件，进入商品至上而下缓缓浏览，至少浏览三分钟。并在目标商品的详情中找到以下问题的答案。</view>
                        </view>
                    </view>
				</view>
            </view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list-title has-mgtb-1 is-red"><navigator url="/pages/detail/content?id=13" hover-class="navigator-hover" class="is-size-16 is-gold">进店关键词 <text class="is-blue">点击查看示例</text></navigator></view>
			<view class="s-list has-bordertb has-mgtb-10">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 进店关键词 -->
	                		<view class="input-answer">
	                			<input type="text" :value="sendData.instore_keywords" :focus="focus.instore_keywords" @input="BindInput" data-val="sendData|instore_keywords" placeholder="进店关键词">
	                			<button @tap="pasteVal" data-val="sendData|instore_keywords">粘贴</button>
	                		</view>
							<!-- 进店关键词 -->
						</view>
                    </view>
				</view>
            </view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list-title has-mgtb-1 is-red">目标答案</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 目标关键词 -->
                			<navigator url="/pages/detail/content?id=6" hover-class="navigator-hover" class="is-size-16 is-gold">请在<text class="is-red">目标商品详情 </text>中找到以下答案 <text class="is-blue">如何找答案</text></navigator>

                			<view class="has-pdt-10 has-mgt-10 has-bordert">问题：{{product.search_keywords}} （{{product.search_keywords_length}}个字符）</view>
						
                			<view class="input-answer has-mgt-10">
                				<input type="text" :value="sendData.answer" :focus="focus.answer" @input="BindInput" data-val="sendData|answer" placeholder="请输入问题答案">
                				<button @tap="checkAnswer">验证</button>
                			</view>
                			<!-- 目标关键词 -->
						</view>
                    </view>
				</view>
            </view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading ">
			<view class="s-list-title has-mgtb-1 is-red">
				<navigator url="/pages/detail/content?id=14" class="is-size-16 is-gold">{{order.like_text_view}}<text class="is-blue">点击查看示例</text>
				</navigator>
			</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<view class="feedback-body feedback-uploader">
								<view class="uni-uploader-body">
									<view class="uni-uploader__input-box" v-if="order.islike == 1 ">
										<view class="uni-uploader-box2" @tap="uploadPic" data-name="likegoods" @longpress="previewImage" >
											<image :src="sendData.likegoods" mode="aspectFit" style="width:100%;height: 100%" />
										</view>
									</view>
									<view class="uni-uploader__input-box" v-if="order.iscart == 1 " @tap="uploadPic" data-name="cartgoods" @longpress="previewImage" >
										<view class="uni-uploader-box2">
											<image :src="sendData.cartgoods" mode="aspectFit" style="width:100%;height: 100%" />
										</view>
									</view>
									<view class="uni-uploader__input-box" v-if="order.islikestore  == 1 " @tap="uploadPic" data-name="likeStore" @longpress="previewImage" >
										<view class="uni-uploader-box2">
											<image :src="sendData.likeStore" mode="aspectFit" style="width:100%;height: 100%" />
										</view>
									</view>
								</view>
								<view class="uni-uploader-body">
									<view class="label-text" v-if="order.islike == 1 ">
										<text>收藏目标商品</text>
									</view>
									<view class="label-text" v-if="order.iscart == 1 ">
										<text>加入购物车</text>
									</view>
									<view class="label-text" v-if="order.islikestore == 1 ">
										<text>收藏店铺</text>
									</view>
								</view>
							</view>

						</view>
                    </view>
				</view>
            </view>
		</view>


		<view class="" v-if="isLoading">
            <view class="s-col is-col-24 ordersnInf">
                <view class="s-list">

                    <view class="is-item-line ">
                        <view class="is-item-bd s-btn" @tap="submitTask">
                            <view class="is-btn-lg has-bg-blue">
                            	{{btnLoading ? '提交中...':'提交任务'}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>

	</block>
	
	
	<block v-if="order.model==4">
		<!-- 预售任务 -->
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-visibility is-size-18 has-pdr-5"></span>任务步骤</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
		                <view class="">
		        			<navigator url="/pages/detail/content?id=12" hover-class="navigator-hover" class="is-size-16 is-gold">浏览任务 <text class="is-blue">点击查看示例</text></navigator>
		
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">请确认使用<text class="is-gold">{{order.buyer_name}} </text>账户登录手机{{product.platform_name}}应用</view>
		
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">打开{{product.platform_name}}客户端后请手动输入搜索关键词，关键词不可自定修改</view>
		
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">按要求筛选搜索条件，请勿随意增加搜索条件，进入商品至上而下缓缓浏览，至少浏览三分钟。并在目标商品的详情中找到以下问题的答案。</view>
		                </view>
		            </view>
				</view>
		    </view>
		</view>
		
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list-title has-mgtb-1 is-red"><navigator url="/pages/detail/content?id=13" hover-class="navigator-hover" class="is-size-16 is-gold">进店关键词 <text class="is-blue">点击查看示例</text></navigator></view>
			<view class="s-list has-bordertb has-mgtb-10">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 进店关键词 -->
		            		<view class="input-answer">
		            			<input type="text" :value="sendData.instore_keywords" :focus="focus.instore_keywords" @input="BindInput" data-val="sendData|instore_keywords" placeholder="进店关键词">
		            			<button @tap="pasteVal" data-val="sendData|instore_keywords">粘贴</button>
		            		</view>
							<!-- 进店关键词 -->
						</view>
		            </view>
				</view>
		    </view>
		</view>
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-visibility is-size-18 has-pdr-5"></span>任务步骤</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
		                <view class="">
		        			<navigator url="/pages/detail/content?id=4" hover-class="navigator-hover" class="is-size-16 is-gold">第一步 货比三家 <text class="is-blue">点击查看示例</text></navigator>
		
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-14">请确认使用<text class="is-gold">{{order.buyer_name}} </text>账户登录手机{{product.platform_name}}应用</view>
		
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-14">打开{{product.platform_name}}客户端后请手动输入搜索关键词，关键词不可自定修改</view>
		
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-14">按要求筛选搜索条件，请勿随意增加搜索条件，进入商品至上而下缓缓浏览，至少浏览三分钟。并在目标商品的详情中找到以下问题的答案。</view>
		                </view>
		            </view>
				</view>
		    </view>
		</view>
		
		
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list-title has-mgtb-1 is-red">浏览足迹截图<text class="is-black">请上传浏览足迹截图(点击图片可以修改)</text></view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 浏览足迹上传截图 -->
		        			<view class="input-answer has-mgt-10 has-mgb-15" @tap="uploadPic" data-name="zuji1">
		        				<view class="upload is-center">
									<image :src="sendData.zuji1" style="max-width: 200px;max-height: 200px;" v-if="sendData.zuji1 != ''"></image>
		        					<text class="iconfont icon-xiazai is-size-28" v-if="sendData.zuji1 == ''"></text>
		        				</view>
		        			</view>
							<!-- 浏览足迹上传截图1 -->
						</view>
		            </view>
				</view>
		    </view>
		</view>
		
		
		
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list has-bordertb has-mgtb-0  has-mgt-10">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
		                <view class="">
		        			<navigator url="/pages/detail/content?id=5" hover-class="navigator-hover" class="is-size-16 is-gold">第二步 浏览店铺<text class="is-blue">点击查看示例</text></navigator>
		
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">根据主图、价格、名称等找到目标商品，点击进入店铺。</view>
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">浏览店铺任意2个商品，至少浏览1分钟，复制并上传分享链接。</view>
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">回到目标商品，至上而下至少浏览3分钟，在目标商品中找到以下答案。</view>
		                </view>
		            </view>
				</view>
		    </view>
		</view>
		
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list-title has-mgtb-1 is-red">浏览足迹截图<text class="is-black">请上传浏览店铺后的足迹截图(点击图片可修改)</text></view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 浏览足迹上传截图 -->
							<view class="input-answer has-mgt-10 has-mgb-15" @tap="uploadPic" data-name="zuji2">
								<view class="upload is-center">
									<image :src="sendData.zuji2" style="max-width: 200px;max-height: 200px;" v-if="sendData.zuji2 != ''"></image>
									<text class="iconfont icon-xiazai is-size-28" v-if="sendData.zuji2 == ''"></text>
								</view>
							</view>
							<!-- 浏览足迹上传截图1 -->
						</view>
		            </view>
				</view>
		    </view>
		</view>
			<view class="s-col is-col-24" v-if="isLoading ">
		
			<view class="s-list-title has-mgtb-1 is-red">
				<navigator url="/pages/detail/content?id=14" class="is-size-16 is-gold">{{order.like_text_view}}<text class="is-blue">点击查看示例</text>
				</navigator>
			</view>
		
		 
		
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
		
							<view class="feedback-body feedback-uploader">
								<view class="uni-uploader-body">
									<view class="uni-uploader__input-box" v-if="order.islike == 1||order.islike==0 ">
										<view class="uni-uploader-box2" @tap="uploadPic" data-name="collect_img" @longpress="previewImage" >
											<image :src="sendData.collect_img" mode="aspectFit" style="width:100%;height: 100%" />
										</view>
									</view>
									<view class="uni-uploader__input-box" v-if="order.iscart == 1 || order.iscart==0 " @tap="uploadPic" data-name="cart_img" @longpress="previewImage" >
										<view class="uni-uploader-box2">
											<image :src="sendData.cart_img" mode="aspectFit" style="width:100%;height: 100%" />
										</view>
									</view>
								</view>
								<view class="uni-uploader-body">
									<view class="label-text" v-if="order.islike == 1 ||order.islike==0">
										<text>收藏目标商品</text>
									</view>
									<view class="label-text" v-if="order.iscart == 1||order.iscart==0 ">
										<text>加入购物车</text>
									</view>
								
								</view>
							</view>
		
						</view>
		            </view>
				</view>
		    </view>
		</view>
		
		<view class="s-col is-col-24" v-if="isLoading && product.search_keywords != '' ">
			<view class="s-list-title has-mgtb-1 is-red">第三步&nbsp;&nbsp;目标答案</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 目标关键词 -->
		        			<navigator url="/pages/detail/content?id=6" hover-class="navigator-hover" class="is-size-16 is-gold">请在<text class="is-red">目标商品详情 </text>中找到以下答案 <text class="is-blue">如何找答案</text></navigator>
			
		        			<view class="has-pdt-10 has-mgt-10 has-bordert">问题：{{product.search_keywords}} （{{product.search_keywords_length}}个字符）</view>
						
		        			<view class="input-answer has-mgt-10">
		        				<input type="text" :value="sendData.answer" :focus="focus.answer" @input="BindInput" data-val="sendData|answer" placeholder="请输入问题答案">
		        				<button @tap="checkAnswer">验证</button>
		        			</view>
		        			<!-- 目标关键词 -->
						</view>
		            </view>
				</view>
		    </view>
		</view>
			<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list2-title"><span class="iconfont icon-weiwancheng is-size-17 has-pdr-5"></span>订单留言</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
		                <view class="is-gold">{{product.message||""}}</view>
		            </view>
				</view>
		    </view>
		</view>
		
		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list has-bordertb has-mgtb-10">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
		                <view class="">
		        			<navigator url="/pages/detail/content?id=7" hover-class="navigator-hover" class="is-size-16 is-gold">第三步 聊天下单并提交付款<text class="is-blue">点击查看示例</text></navigator>
		
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">点击联系客服按钮，和商家客服至少4个问题的互动</view>
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">确认好件数、颜色尺寸、将商品加入购物车</view>
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">下单付款前仔细核对购买账号、收货信息以及留言，确认订单无误后付款。</view>
		        			<view class="has-mgt-10 has-mgb-15 is-grey is-size-12">下单后填写实际付款金额与正确的订单编号。</view>
		
		        			<view class="has-mgt-10 has-mgb-15 is-black is-size-14">应付款金额参考：{{product.goods_price*product.goods_num}}元（请按照实际付款金额填写）订单编号可在{{product.platform_name}}订单详情中查询。</view>
		        			<view class="has-mgt-10 has-mgb-15 is-black is-size-12">
		        				<navigator url="/pages/detail/content?id=10" hover-class="navigator-hover" class="is-size-16 is-gold">如何获取订单编号？<text class="is-blue">点击查看示例</text></navigator>
		        			</view>
		                </view>
		            </view>
				</view>
		    </view>
		</view>
		
		<view class="" v-if="isLoading">
		    <view class="s-col is-col-24 ordersnInf">
		        <view class="s-list">
		            <view class="is-item-line">
		                <view class="is-item-bd">
		                    <input type="number" :value="sendData.paymoney" :focus="focus.paymoney" placeholder="请输入实际付款金额" @input="BindInput" data-val="sendData|paymoney" >
		                </view>
		            </view>
		            <view class="is-item-line ">
		                <view class="is-item-bd">
		                    <input type="number" :value="sendData.ordersn" :focus="focus.ordersn" :placeholder="placeholder_text"  @input="BindInput" data-val="sendData|ordersn" >
		                </view>
		            </view>
		        </view>
		    </view>
		</view>
		
		<view class="" v-if="isLoading">
		    <view class="s-col is-col-24 ordersnInf">
		        <view class="s-list">
		            <view class="is-item-line ">
		                <view class="is-item-bd s-btn" @tap="submitTask">
		                    <view class="is-btn-lg has-bg-blue">
		                    	{{btnLoading ? '提交中...':'提交任务'}}
		                    </view>
		                </view>
		            </view>
		        </view>
		    </view>
		</view>
	</block>
	</view>
</template>

<script>
	var upload = require('../../common/lib/upload.js');
	export default {
		data(){
			return {
				order_sn : "", 
				userid : "", 
				order : [],
				product :[], 
				isLoading : false, 
				btnLoading : false, 
				placeholder_text : "",
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
					zuji1:"",// 足迹1
					zuji2:"", // 足迹2
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
				time:''
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
			previewImage:function(){
				var src = this.product.goods_picture; 
				var urls = [];
				urls[0] = src; 
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage([src]);
				//#endif
			},
			uploadPic:function(e){
				var name = e.currentTarget.dataset.name;
				console.log(JSON.stringify(name))
				var that = this;
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    sizeType: "compressed",
                    count: 1,
                    success: (res) => {
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
			pasteVal:function(e){
				// 监听粘贴点击事件 
				var dataval = e.currentTarget.dataset.val , dataval = dataval.split("|"); //字符分割  
				var model   = dataval[0] , type = dataval[1];
				var _self = this; 
				uni.getClipboardData({
				    success:function(res){
						if (model == "sendData") {
							var data = _self.sendData;
							data[type] = res.data; 
							_self.sendData = data; 
		 				}

						uni.setClipboardData({
						    data: '',
						});

				    },
				    error:function(e){
				    	uni.showToast({title:"未复制任何内容",icon:'none'})
				    }
				});
			},
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
			submitTask:function(){
				// 任务提交 
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
				console.log(JSON.stringify(data))
				console.log(posturl)
				this.$Request(posturl,data).then(res=>{
					this.btnLoading = false; 
					console.log(JSON.stringify(res))
					uni.showToast({title:res.msg,icon:'none'});
					if (res.code == 200 ) {
						setTimeout(function() {
							uni.navigateBack({
								
							})
						}, 2000);
					} 
				});
				
			}
		},
		onUnload:function(){
			this.clearFocus(); 
		}
	}
</script>
<style lang="less">
	@import "../../static/css/base.less";
	@import "../../common/uni.css";
	@import "../../common/icon.css";
.content .is-item-hd .iconfont{
	font-size: 40rpx;
	padding-right: 15rpx;
}
.content .iconfont.icon-unie651{
	color: #ff5000 ;
}
.content .iconfont.icon-tianmao{
	color: #ff0036;
}
.content .iconfont.icon-jingdongbaitiao{
	color: #f30213;
}
.icon-busy{
	color: #666;
	font-size: 150rpx;
}
.is-item, .is-item-line{
	padding: 10rpx 20rpx;
}
.s-list2-title{
	margin-top: 18rpx!important;
}
.input-answer input{
	min-width: 75%;
	float: left;
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
.ordersnInf input{
	height: 90rpx;
	line-height: 70rpx;
	padding:5rpx;
}
.label-text{
	float:left;
	position:relative;
	font-size:25rpx;
	color:#333;
	width:160rpx;
	text-align:center;
}
.uni-uploader-box2{
	width:100%;
	height:100%;
}
.upload .iconfont.icon-xiazai{
	font-size: 120rpx;
	text-align: center;
	color: #666;
}
</style>

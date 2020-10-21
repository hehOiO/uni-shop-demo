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
				<view class="is-item has-pdtb-10" @tap="contactMall()">
					<view class="is-item-hd has-desc-color is-size-14">
						<view>店铺名称：</view>
					</view>
					<view class="is-item-ft is-right is-black">
						{{product.store_name}}<text class="is-size-12 is-grey">（点击可联系商家）</text>
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
				<view class="is-item" v-if="order.model == 0 ">
					<view class="is-list2-info has-list2-tip ">
						<view class="is-list2-tip">任务类型</view>
						<view class="is-gold">{{product.platform_name}}{{product.product_platform}}</view>
					</view>
				</view>
				<view class="is-item" v-if="order.model == 0 ">
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
			<view class="s-list-title has-mgtb-1 is-red">目标答案</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 目标关键词 -->
							<navigator url="/pages/detail/content?id=6" hover-class="navigator-hover" class="is-size-16 is-gold">请在<text
								 class="is-red">目标商品详情 </text>中找到以下答案 <text class="is-blue">如何找答案</text></navigator>

							<view class="has-pdt-10 has-mgt-10 has-bordert">问题：{{product.search_keywords}} （{{product.search_keywords_length}}个字符）</view>

							<view class="input-answer has-mgt-10">
								<input type="text" :value="sendData.answer" :focus="focus.answer" @input="BindInput" data-val="sendData|answer"
								 placeholder="请输入问题答案">
								<button @tap="checkAnswer">验证</button>
							</view>
							<!-- 目标关键词 -->
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading">
			<view class="s-list-title has-mgtb-1 is-red">拍照做单流程</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 拍照做单流程 -->
							<navigator url="/pages/detail/content?id=18" hover-class="navigator-hover" class="is-size-16 is-gold">请拍下用户付款订单编号，<text
								 class="is-blue">如何拍照？</text></navigator>
							<view class="feedback-body feedback-uploader">
								<view class="uni-uploader-body">
									<view class="uni-uploader__input-box" @tap="uploadPic" data-name="picture">
										<view class="uni-uploader-box2">
											<image :src="sendData.picture" mode="aspectFit" style="width:100%;height: 100%" />
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="s-col is-col-24" v-if="isLoading && order.isVideo == 1 ">
			<view class="s-list-title has-mgtb-1 is-red">拍摄视频做单流程</view>
			<view class="s-list has-bordertb has-mgtb-0">
				<view class="is-item">
					<view class="is-list2-info has-list2-tip ">
						<view class="form-senddata">
							<!-- 拍摄视频做单流程 -->
							<navigator url="/pages/detail/content?id=51" hover-class="navigator-hover" class="is-size-16 is-gold">请拍摄用户做单流程的视频
								<text class="is-blue">如何拍摄？</text></navigator>
							<view class="feedback-body feedback-uploader">
								<view class="uni-uploader-body">
									<view class="uni-uploader__input-box" @tap="shotVideo" data-name="picture">
										<view class="uni-uploader-box2">

										</view>
									</view>
								</view>
							</view>
							<!-- 拍摄视频做单流程 -->
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="" v-if="isLoading && order.isOrder == 1 ">
			<view class="s-col is-col-24 ordersnInf">
				<view class="s-list-title has-mgtb-1 is-red">请输入拍下的订单编号</view>
				<view class="s-list has-bordertb has-mgtb-0">
					<view class="is-item-line ">
						<view class="is-item-bd">
							<input type="number" :value="sendData.ordersn" :focus="focus.ordersn" :placeholder="placeholder_text" @input="BindInput"
							 data-val="sendData|ordersn">
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="" v-if="isLoading">
			<view class="s-col is-col-24 ordersnInf has-mgt-10">
				<view class="s-list-title has-mgtb-1 is-red">请输入实际付款金额</view>
				<view class="s-list has-bordertb has-mgtb-0">
					<view class="is-item-line ">
						<view class="is-item-bd">
							<input type="number" :value="sendData.paymoney" placeholder="请输入实际付款金额" @input="BindInput" data-val="sendData|paymoney">
						</view>
					</view>
				</view>
			</view>
		</view>
 
		<view class="" v-if="isLoading">
			<view class="s-col is-col-24 ordersnInf">
				<view class="s-list has-mgtb-5">
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

	</view>
</template>

<script>
	var upload = require('../../common/lib/upload.js');
	export default {
		data() {
			return {
				order_sn: "",
				userid: "",
				order: [],
				product: [],
				isLoading: false,
				placeholder_text: "请输入订单编号",
				btnLoading: false,
				sendData: {
					answer_status: false, // 答案验证状态 
					answer: "",
					longitude: "", //经度地址
					latitude: "", // 纬度地址 
					picture: "", // 做单拍照 
					video: "",
					ordersn: "", // 订单编号 
					buyerName: "",
					paymoney: "", //实际付款金额
				},
				focus: {
					answer: false,
				}
			}
		},
		methods: {
			loadData: function() {
				var _self = this;
				this.$Request("task/getinfo", {
					order_sn: this.order_sn,
					uid: this.userid
				}).then(res => {
					if (res.code == 200) {
						var order = res.data.order;
						var product = res.data.product;
						this.isLoading = true;
						this.order = order;
						this.product = product;
						this.placeholder_text = "请输入" + product.platform_name + "订单编号";
						this.getLocation(); 
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
			openPlatformApp: function() {
				// 复制关键词 
				var product_keywrods = this.product.product_keywrods.keywords;
				uni.setClipboardData({
					data: product_keywrods,
					success: function() {
						uni.showToast({
							title: "关键词已复制",
							icon: "none"
						});
					}
				});
			},
			checkAnswer: function() {
				// 验证问题答案。 
				var answer = this.sendData.answer;
				if (answer == "") {
					uni.showToast({
						title:"请输入问题答案",
						icon:"none"
					});
				} else if (answer.length != this.product.search_keywords_length) {
					uni.showToast({
						title: "答案输入错误",
						icon:"none"
					});
				} else {
					this.$Request("task/checkAnswer", {
						product_id: this.product.id,
						answer: answer
					}).then(res => {
						uni.showToast({
							title: res.msg
						})
						if (res.code == 200) {
							this.sendData.answer_status = true;
						}
					});
				}
			},
			previewImage: function() {
				var src = this.product.goods_picture;
				var urls = [];
				urls[0] = src;
				//#ifdef APP-PLUS
				plus.nativeUI.previewImage([src]);
				//#endif
			},
			BindInput: function(e) {
				var dataval = e.currentTarget.dataset.val,
					dataval = dataval.split("|"); //字符分割  
				var value = e.detail.value;
				var model = dataval[0],
					type = dataval[1];
				if (model == "sendData") {
					var data = this.sendData;
					data[type] = value;
					this.sendData = data;
				}
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
						uni.showModal({
							title: "提示",
							content: "获取地理位置失败，请先授权允许访问位置",
							showCancel: false,
							confirmText: "去设置",
							success: function(res) {
								var os = plus.os.name;
								// 打开设置页面
								if (os == "iOS") {
									var UIApplication = plus.ios.import("UIApplication");
									var NSURL = plus.ios.import("NSURL");
									var setting = NSURL.URLWithString("app-settings:");
									var application = UIApplication.sharedApplication();
									application.openURL(setting);
									plus.ios.deleteObject(setting);
									plus.ios.deleteObject(application);
								} else {
									var main = plus.android.runtimeMainActivity(); //获取activity
									var Intent = plus.android.importClass('android.content.Intent');
									var Settings = plus.android.importClass('android.provider.Settings');
									var intent = new Intent(Settings.ACTION_APPLICATION_SETTINGS); //可设置表中所有Action字段
									main.startActivity(intent);
								}
							}
						});
					}
				});
			},
			uploadPic(e) {
				var name = e.currentTarget.dataset.name;
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
			shotVideo: function() {
				var that = this;
				if (that.sendData.video != "") {
					uni.showToast({
						title: "您已经上传过视频了，无法再次上传",
						icon: "none"
					});
					return false;
				}
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					maxDuration: 60,
					success: function(res) {
						uni.showModal({
							title: '   ',
							content: '您确定使用该视频吗？上传后无法修改~',
							cancelText: "重新拍摄",
							confirmText: "确定使用",
							success: function(modal) {
								if (modal.cancel) {
									that.shotVideo(); // 重新拍摄 
								} else if (modal.confirm) {
									uni.showLoading({
										mask:true,
										title:"文件上传中"
									})
									upload({
										filePath: res.tempFilePath,
										success: function(upres) {
											uni.hideLoading();
											uni.showToast({
												title:"文件上传成功",
												icon:"success",
											})
											if (upres.imageURL) {
												that.sendData["video"] = upres['imageURL'];
											}
										},
										error: function(uperr) {
											uni.hideLoading();
											uni.showToast({
												title:"文件上传失败",
												icon:"none",
											})
										}
									})
								}
							}
						});

					}
				});
			},
			submitTask: function() {
				var data = this.sendData;
				if (data['answer'] == "") {
					uni.showToast({
						title: "请输入目标答案",
						icon: "none"
					})
					return false;
				}
				if (data['answer_status'] == false) {
					uni.showToast({
						title: "目标答案未验证通过",
						icon: "none"
					})
					return false;
				}
				if (data['picture'] == "") {
					uni.showToast({
						title: "请上传用户做单流程照片",
						icon: "none"
					})
					return false;
				}
				if (data['paymoney'] == "") {
					uni.showToast({
						title: "请输入实际付款金额",
						icon: "none"
					})
					return false;
				}
				if (this.btnLoading) {
					return false;
				}
				data['product_id'] = this.product.id;
				data['order_sn'] = this.order.order_sn;
				data['uid'] = this.userid;
				this.btnLoading = true;
				var posturl = "task/submitTaskVideo";
				this.$Request(posturl, data).then(res => {
					this.btnLoading = false;
					uni.showToast({
						title: res.msg
					});
					if (res.code == 200) {
						setTimeout(function() {
							uni.navigateBack({})
						}, 2000);
					}
				});
			},
			contactMall:function(){
				var mall_id = this.order.mall_id; 
				uni.navigateTo({
					url:"/pages/message/chat?userid="+mall_id,
				})
			},
		},
		onLoad(param) {
			this.order_sn = param.order_sn;
			this.sendData.buyerName = param.buyerName;
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
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	@import "../../common/uni.css";
	@import "../../common/icon.css";

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

	.label-text {
		float: left;
		position: relative;
		font-size: 25rpx;
		color: #333;
		width: 160rpx;
		text-align: center;
	}

	.uni-uploader-box2 {
		width: 100%;
		height: 100%;
	}

	.uni-uploader__input-box {
		width: 99%;
	}

	.videoBtn {
		float: initial !important;
		width: 99% !important;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
</style>

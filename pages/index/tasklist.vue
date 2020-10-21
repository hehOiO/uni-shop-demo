<template>
	<view class="content" style style="height: 100%;background-color: #f2f2f2;">
		<view class="">
			<view class="list-container">
				<view class="has-pd-10 has-desc-color is-size-16" style="background-color: #E2E1E0;">
					<navigator hover-class="" url="/pages/tool/task_rule"><text class="iconfont icon-hand is-size-24"></text>接单前务必查看接单规则，点击查看接单规则</navigator>
				</view>
				<view class="tab-tilte" >
					<view class="s-list-title is-width" :class="{active:threeactive==='taobao'}" @tap="threeTab('taobao')">淘宝/天猫</view>
					<view class="s-list-title is-width" :class="{active:threeactive==='jd'}" @tap="threeTab('jd')">京东</view>
					<view class="s-list-title is-width" :class="{active:threeactive==='pinduoduo'}" @tap="threeTab('pinduoduo')">拼多多</view>
				</view>
				<view  v-if="threeactive==='taobao'" style="border-top: 30upx solid #E2E1E0;">
					<view class="s-col is-col-8 is-a is-write" @tap="go(1)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">垫付任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">今日任务 今日完成</view>
					</view>
					<view class="s-col is-col-8 is-a is-write" @tap="go(2)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">浏览任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">货比收藏 无需付款</view>
					</view>
					<view class="s-col is-col-8 is-a is-write" @tap="go(4)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">预售任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">今日任务 改日下单</view>
					</view>
					<view class="s-col is-col-12 is-a is-write" @tap="go(5)">
						<view class="is-flex  is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">商家自审任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">提交实时买号截图 由商家自选</view>
					</view>
					<view class="s-col is-col-12 is-a is-write" @tap="go(6)">
						<view class="is-flex  is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">特殊路径任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">商家提供商品路径 买手直接下单</view>
					</view>
				</view>
				<view  v-if="threeactive==='jd'" style="border-top: 30upx solid #E2E1E0;">
					<view class="s-col is-col-8 is-a is-write" @tap="go(1)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">垫付任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">今日任务 今日完成</view>
					</view>
					<view class="s-col is-col-8 is-a is-write" @tap="go(2)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">浏览任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">货比收藏 无需付款</view>
					</view>
					<view class="s-col is-col-8 is-a is-write" @tap="go(4)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">预售任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">今日任务 改日下单</view>
					</view>
					<view class="s-col is-col-12 is-a is-write" @tap="go(5)">
						<view class="is-flex  is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">商家自审任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">提交实时买号截图 由商家自选</view>
					</view>
					<view class="s-col is-col-12 is-a is-write" @tap="go(6)">
						<view class="is-flex  is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">特殊路径任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">商家提供商品路径 买手直接下单</view>
					</view>
				</view>
				<view  v-if="threeactive==='pinduoduo'" style="border-top: 30upx solid #E2E1E0;">
					<view class="s-col is-col-8 is-a is-write" @tap="go(1)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">垫付任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">今日任务 今日完成</view>
					</view>
					<view class="s-col is-col-8 is-a is-write" @tap="go(2)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">浏览任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">货比收藏 无需付款</view>
					</view>
					<view class="s-col is-col-8 is-a is-write" @tap="go(4)">
						<view class="is-flex is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">预售任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">今日任务 改日下单</view>
					</view>
					<view class="s-col is-col-12 is-a is-write" @tap="go(5)">
						<view class="is-flex  is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">商家自审任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">提交实时买号截图 由商家自选</view>
					</view>
					<view class="s-col is-col-12 is-a is-write" @tap="go(6)">
						<view class="is-flex  is-justify-center is-align-center has-pdt-25">
							<!-- <view class="Taskimages">
								<image src="../../static/images/common/taobao.png" mode="widthFix" class="is-response"></image>
							</view> -->
							<view class=" has-desc-color is-size-18">特殊路径任务</view>
						</view>
						<view class="has-pdb-25 has-mgt-5" style="font-size:24rpx;color:#969799;text-align: center;">商家提供商品路径 买手直接下单</view>
					</view>
				</view>
			</view>
			
			<navigator url="/pages/detail/content?id=60" hover-class="navigator-hover"><view style="font-size: 26rpx;color: #aaa;padding: 24rpx;margin-top: 20rpx;">如何选择亿客拉平台任务？</view></navigator>
		</view>
		<navigator class="footer-help-mm" url="/pages/help/index" hover-class="">
			<image src="../../static/images/help/helpkefumeimei.png" mode="widthFix" class="is-response"></image>
		</navigator>

	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup.vue"
	export default {
		data() {
			return {
				userid: '',
				buyerlist: [],
				checkMall: [],
				page: 1,
				newTaskPopup: false,
				order_sn: "",
				type: '',
				indexintervalID: null,
				threeactive:'taobao',
				id:""
			}
		},
		computed: {
		},
		
		methods: {
			onClick(e){
				console.log('点击grid:' + JSON.stringify(e));
			},
			threeTab:function(type){
				this.threeactive=type;
				
			},
			go:function(id){
				let type=this.threeactive;
				if(type=='taobao'){
					uni.navigateTo({
						url: '/pages/index/zhanghao?id='+id+'&type='+type
					}); 
				}else{
					uni.showToast({
						title:"暂未开放",
						icon:"none"
					})
				}
				
			},
		},
		onHide: function() {
		},
		onShow: function() {
 			
		},
		onUnload: function() {

		},
		onLoad:function(option) {
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	uni-page-body{
		height: 100%;
	}
	.list-container:after{
		content:"";
		display: block;
		clear:both;
		
	}
	.has-desc-color{
		color: #6B6B6B;
	}
	.s-list-title{
		margin-bottom: 0px; 
		font-size: 30rpx;
		position: relative;
		margin-top: 0px!important;
		padding: 25rpx;
	}
	.s-row{
		margin-top: 30rpx;
	}
	.is-write{
		background-color: #f2f2f2!important;
		margin-top: 0!important;
	}
	.jiedan {
		position: fixed;
		bottom: 10%;
		margin: 0 auto;
		background: @baseBackGroundColor;
		width: 150rpx;
		height: 150rpx;
		left: 40%;
		border-radius: 50%;
		color: #FFFFFF;
		text-align: center;
		line-height: 150rpx;
		font-size: 40rpx;
		z-index: 9999;
	}

	.icon-hand {
		font-size: 36rpx;
		padding-right: 10upx;
	}

	.content .is-item-hd .iconfont {
		font-size: 40rpx;
		padding-right: 15rpx;
	}

	.content .is-item-hd .iconfont.icon-unie651 {
		color: #ff5000;
	}

	.content .is-item-hd .iconfont.icon-jingdongbaitiao {
		color: #f30213;
	}

	.icon-busy {
		color: #666;
		font-size: 150rpx;
	}

	.btnbg {
		background-color: @baseBackGroundColor;
	}

	.newTaskPopup {
		width: 80%;
		border-radius: 10rpx;
		height: 530rpx;

	}

	.jiedanright {
		right: -20%;
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 26rpx;
		background: #1890ff;

	}

	.new-task-popup {
		width: 100%;
		height: 100%;
	}

	.new-task-popup .icon-hand {
		font-size: 30upx;
	}

	.new-task-popup .popup-image {
		display: block;
		width: 200upx;
		height: 200upx;
		text-align: center;
		margin: 0 auto;
	}

	.footer-help-mm {
		position: fixed;
		bottom: 0upx;
		right: 0upx;
		width: 100upx;
	}
	.tab-tilte{
		background-color: #f2f2f2;
		display:flex;
		justify-content: space-around;
		.active{
			color:rgb(251, 113, 128);
		}
		.active:after{
			content:"";
			position:absolute;
			display: block;
			bottom: 0px;
			height: 4rpx;
			width: 100%;
			left: 0;
			background-color: rgb(251, 113, 128);
		}
	}
	.is-write{
		border-top: 0!important;
		border-right: 0!important;
	}
	.is-write:after{
		    content: '';
		position: absolute;
		z-index: 1;
		-webkit-transform-origin: center;
		-ms-transform-origin: center;
		transform-origin: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		top: -50%;
		left: -50%;
		right: -50%;
		bottom: -50%;
		border-color: #c8c7cc;
		border-style: solid;
		border-width: 1px;
		-webkit-transform: scale(.5);
		-ms-transform: scale(.5);
		transform: scale(.5);
		border-top-width: 0;
		border-left-width: 0;
	}
	.is-list{
		padding-top:30px;
		.is-list-l{
			padding-top:10px;
			padding-bottom:10px;
			color: #888888;
			padding-left:30px;
			background:#FFFFFF;
			margin-bottom:10px;
			margin-top:10px;
		}
	}
	.Taskimages {
		width: 42rpx;
		height: 42rpx;
		margin-right: 10rpx;
	}
	.is-write{
		background:#FFFFFF;
		border-right:2upx solid #c8c7cc;
		border-top:2upx solid #c8c7cc;
		margin-top:50px;
	}
	.is-write:last-child{
		border-right: none;
	}
	.is-width{
		width:30%;
		text-align:center;
	}
	@keyframes namemf {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes namemf {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	@-ms-keyframes namemf {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>

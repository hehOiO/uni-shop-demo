<template>
	<view class="about">
 
	</view>
</template>

<script>

	export default {
		data(){
			return {
				version:'',
 
			}
		},
		onLoad() {
			// var pages = getCurrentPages();
			// var page = pages[pages.length - 1];
			// // #ifdef APP-PLUS
			// var currentWebview = page.$getAppWebview();
			// // #endif
			// var barcode = plus.barcode.create('barcode', [plus.barcode.QR], {
			//     top:'0px',
			//     left:'0px',
			//     width: '100%',
			//     height: '100%',
			//     position: 'static',
			//     frameColor : '#e94d4d',
			//     scanbarColor : '#e94d4d',
			// });
			// //注意扫码区域需为正方形，否则影响扫码识别率
			// currentWebview.append(barcode);
			// barcode.start();

			
		},
		methods:{

		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}

	page {
		min-height: 100%;
		background-color: #FFFFFF;
	}
	image{
		max-width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
	}
	.about{
		flex-direction: column;
		flex: 1;
	}
	.content{
		flex: 1;
		padding: 30px;
		flex-direction: column;
	}
	.desc{
		margin-top: 30rpx;
		display: block;
		text-align: center;
	}
	.code{
		color: #e96900;	
		background-color: #f8f8f8;
	}
	button{
		width: 100%;
		margin-top: 40rpx;
	}
	.version{
		height: 80rpx;
		line-height: 80rpx;
		justify-content: center;
		color: #ccc;
	}
	.webname {
		display: block;
		text-align: center;
		margin-top: 60rpx;
	}
</style>

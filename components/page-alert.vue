<template name="page-share">
	<view class="page">
 
	</view>
</template>

<script>
	var base = require('../common/lib/base.js');
	export default {
		data:{
			providerList : [],
		},
		name: "page-alert",
		props: {
			showShare:{
				default : false, 
			},
			title: {
				type: String,
				default: ""
			}
		},
		methods:{
			share:function(e){
				console.log(e)
			}
		}
	}
</script>
<style>
	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30px rgba(0, 0, 0, .1);
		box-shadow: 0 0 30px rgba(0, 0, 0, .1);
	}

	.popup-middle {
		width: 400px;
		height: 400px;
		border-radius: 10px;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}


	.popup-bottom {
		bottom: 0;
		width: 100%;
/*		height: 100px;*/
		text-align: center;
	}

	.popup-bottom text {
		line-height: 100px;
		font-size: 32px;
	}
	.popup .popup-content .share-title{
	    position: relative;
	    -webkit-flex: 1;
	    flex: 1;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: center;
	    justify-content: center;
	    line-height: 44rpx;
	    padding-top: 20rpx;
	    border-bottom: 2rpx solid #eee;
	    padding-bottom: 20rpx;
	}
	.share-row {
    position: relative;
    -webkit-flex: 1;
    flex: 1;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    height: 180rpx;
	}
	.share-row .share-valign-middle{
    position: relative;
    min-width: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
        align-items: center;
        -webkit-justify-content: center;
    justify-content: center;
        height: 180rpx;
	}
	.share-row .share-valign-middle .share-row-content{
    height: 180rpx;
	}
	.share-row .share-valign-middle .share-image-container{
	    position: relative;
    overflow: hidden;
    width: 60rpx;

	}
	.share-row .share-valign-middle .share-image-container image{
		display: block;
		width: 60rpx;
		height: 60rpx;
	}
</style>
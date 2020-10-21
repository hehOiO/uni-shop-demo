<template>
	<view class="bottom-line text-center text-grey">
		我是有底线的
	</view>
</template>

<script>
</script>

<style scoped>
	.bottom-line{
		position: relative;
		height: 40px;
		line-height: 40px;
	}
	.bottom-line:before{
		content:"";
		display: block;
		width: 30%;
		background-color: #8799a3;
		height: 1upx;
		position: absolute;
		top: 50%;
		left: 5%;
	}
	.bottom-line:after{
		content:"";
		display: block;
		width: 30%;
		background-color: #8799a3;
		height: 1upx;
		position: absolute;
		top: 50%;
		right: 5%;
	}
</style>

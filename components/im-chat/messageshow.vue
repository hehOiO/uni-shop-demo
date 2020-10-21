<template>
<view class="layim-chat-box" :id="'message'+id">
	<!-- 好友发送的消息 -->
	<view class="layim-chat-li" v-if="message.type == 'friends' " v-bind:class="[ message.messagetype == 'image' ? 'layim-chat-li-image' : '']">
		<view class="layim-chat-user">
			<image :src="message.avatar"></image>
		</view>
		<view class="layim-chat-text" v-if="message.messagetype == 'text'">{{message.content}}</view>
		<view class="layim-chat-text layim-chat-image" v-if="message.messagetype == 'image'">
			<image :src="message.content" mode="widthFix" class="is-response"></image>
		</view>
	</view>
	
	<!-- 我发送的消息 -->
	<view class="layim-chat-li layim-chat-mine" v-if="message.type == 'own' " v-bind:class="[ message.messagetype == 'image' ? 'layim-chat-li-image' : '']">
		<view class="layim-chat-user">
			<image :src="message.avatar"></image>
		</view>
		<view class="layim-chat-text" v-if="message.messagetype == 'text'">{{message.content}}</view>
		<view class="layim-chat-text layim-chat-image" v-if="message.messagetype == 'image'" @tap="previewimage(message.content)">
			<image :src="message.content" mode="widthFix" class="is-response"></image>
		</view>
	</view>
</view>
</template>

<script>
	export default {
		props: ['message', 'id'],
		methods: {
			previewimage:function(image) {
				console.log(image)
				this.$emit('preview-image', {
					type: 'preview-image',
					content: image
				});
			}
		},
	}
</script>

<style>
.layim-chat-main {
    width: 100%;
    bottom: 85px;
    padding: 15px;
    -webkit-box-sizing: border-box!important;
    -moz-box-sizing: border-box!important;
    box-sizing: border-box!important;
}
.layim-chat-main .layim-chat-li {
    position: relative;
    font-size: 0;
    margin-bottom: 20rpx;
    padding-left: 120rpx;
    min-height: 140rpx;
}
.layim-chat-main .layim-chat-li-image{
    max-height: 210rpx;
}
.layim-chat-text, .layim-chat-user {
    display: inline-block;
    vertical-align: top;
    font-size: 30rpx;
}
.layim-chat-user {
    position: absolute;
    left: 6rpx;
}
.layim-chat-user image {
    width: 80rpx;
    height: 80rpx;
    border-radius: 100%;
}
.layim-chat-text {
    position: relative;
    min-height: 44rpx;
    line-height: 44rpx;
    padding: 16rpx 30rpx;
    background-color: #fff;
    border-radius: 6rpx;
    color: #333;
    word-break: break-all;
    max-width: 70%;
}
.layim-chat-image{
	width: 200upx;
	height: 200upx;
	padding: 0rpx;
	max-height: 200upx;
	overflow:hidden;
}
.layim-chat-text:after {
    content: '';
    position: absolute;
    left: -20rpx;
    top: 26rpx;
    width: 0;
    height: 0;
    border-style: solid dashed dashed;
    border-color: #fff transparent transparent;
    overflow: hidden;
    border-width: 20rpx;
}
.layim-chat-image:after{
	border: none;
}
.layim-chat-main .layim-chat-mine {
    text-align: right;
    padding-left: 0;
    padding-right: 120rpx;
}
.layim-chat-mine .layim-chat-user {
    left: auto;
    right: 6rpx;
}
.layim-chat-mine .layim-chat-text {
    margin-left: 0;
    text-align: left;
    background-color: #5FB878;
    color: #fff;
}
.layim-chat-mine .layim-chat-text:after {
    left: auto;
    right: -20rpx;
    border-top-color: #5FB878;
}

</style>

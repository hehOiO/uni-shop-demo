<template>
	<view class="s-page-wrapper">

		<view class="s-list2  has-bordertb has-pdtb-10">
			<view class="is-item2">
				<view class="is-list2-info has-bordert has-list2-tip ">
					<view>
						<text>接单震动提醒（需要打开APP）</text>
						<view class="has-desc-color is-size-12">开启震动提醒，有新订单会发送震动</view>
					</view>
					<view class="is-list2-tip has-pdt-5">
						<switch :checked="messagePush.vshort" :color="color" @tap="setMessagePush" data-type="vshort"></switch>
					</view>
				</view>
			</view>
			<view class="is-item2">
				<view class="is-list2-info has-bordert has-list2-tip ">
					<view>
						<text>接单语音提醒（需要打开APP）</text>
						<view class="has-desc-color is-size-12">开启语音提醒，有新订单会播放语音提示！</view>
					</view>
					<view class="is-list2-tip has-pdt-5">
						<switch :checked="messagePush.vmusic" :color="color" @tap="setMessagePush" data-type="vmusic"></switch>
					</view>
				</view>
			</view>
			<view class="is-item2">
				<view class="is-list2-info has-bordert has-list2-tip ">
					<view>
						<text>接单手机保持常亮</text>
						<view class="has-desc-color is-size-12">开启后接单中手机会保持常亮状态</view>
					</view>
					<view class="is-list2-tip has-pdt-5">
						<switch :checked="messagePush.wakelock" :color="color" @tap="setMessagePush" data-type="wakelock"></switch>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: "#e94d4d",
				messagePush: {
					vshort: true,
					vmusic: true,
					wakelock:false, 
				}
			}
		},
		methods: {
			setMessagePush: function(e) {
				var type = e.currentTarget.dataset.type;
				var messagePush = this.messagePush;
				messagePush[type] = !messagePush[type]; 
				this.$Cache.put("app_message_push",messagePush); 
			}
		},
		onShow: function() {
			var app_message_push = this.$Cache.get("app_message_push"); 
			if(app_message_push != false ){
				this.messagePush = app_message_push; 
			}
		},
		onLoad:function(){

		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";
	@import "../../../common/uni.css";
	@import "../../../common/icon.css";

	page {
		min-height: 100%;
		background-color: @baseBackColor;
	}
</style>

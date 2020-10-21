<template>
	<view class="uni-column">
		<view class=""></view>
		<view class="content" id="content" :style="{height:style.contentViewHeight+'px'}">
			<scroll-view id="scrollview" scroll-y="true" :style="{height:style.contentViewHeight+'px'}" :scroll-with-animation="true"
			    :scroll-top="scrollTop" >

			    <view class="layim-chat-main">
					<message-show v-for="(message,index) in messages" :key="index" :message="message" :id="index" @preview-image="previewImage"></message-show>
			    </view>
				
				<view id="bottom"></view>
			</scroll-view>
		</view>
		<view class="foot">
			<chat-input @send-message="getInputMessage" @close-image="onCloseImage" :facelist="faceList" @focus="inputGetFocus"></chat-input>
		</view>
		
		<simpleAlert :show="sAlert.show" :msg="sAlert.msg" :icon="sAlert.icon"></simpleAlert>

		<simpleActionSheet :show="sAction.show" :actions="sAction.actions" @close="onCloseImage" @cancel="onCloseImage" @select="onSelectImage"></simpleActionSheet>
		
		<simpleDialog></simpleDialog>
		
	</view>
</template>

<script>
	import simpleActionSheet from '../../components/simple-pro/action-sheet.vue';
	import simpleAlert from '../../components/simple-pro/alert.vue';
	import simpleDialog from '../../components/simple-pro/dialog.vue';
	import chatInput from '../../components/im-chat/chatinput.vue';
	import messageShow from '../../components/im-chat/messageshow.vue';
	var upload = require('../../common/lib/upload.js');
	import chat from '../../common/chat/index'; 
	export default {
		data() {
			return {
				userid:'',
				touserid :'',
				portrait_bg : '',
				onSocketStatus:false,
				style: {
					pageHeight: 0,
					contentViewHeight: 0,
					footViewHeight: 90,
					mitemHeight: 0,
				},
				sAlert:{
					show:false,
					msg:"",
					icon:"msg", 
				},
				sAction:{
					actions:[
						{name:"拍摄照片",value:"camera"},
						{name:"选择照片",value:"album",}
					],
					show:false,
				},
				scrollTop: 0,
				messages: [],
				loadMessageTimer : null, 
				faceList:[], 
			}
		},
		components: {
			chatInput,
			messageShow,
			simpleAlert,
			simpleActionSheet,
			simpleDialog
		},
		onLoad: function (e) {
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
			this.touserid = e.userid; 
			chat.Init(this); //初始化消息服务器 并传入当前页面指针
			// console.log( simpleDialog.alert() ); 
		},
		onShow:function(){
			this.userid = this.$SysUser.openid(); 
 			this.portrait_bg = this.$Sysconf('imagelist.defaultAvatar');
 			this.loadMessage(); 
		},
		onHide:function(){
			this.loadMessageTimer && clearInterval(this.loadMessageTimer);  
		},
		onUnload:function(){
			chat.unloadChat(this); 
		},
		methods: {
			getInputMessage: function (message) { //获取子组件的输入数据
				//uni.hideKeyboard();
				if(!this.onSocketStatus){
					uni.showToast({
						title:"消息服务器连接中",
						icon:"none"
					});
					return false;
				}
				message['uid']   = this.userid;
				message['touserid'] = this.touserid;
				chat.sendMessage(this,"text",message.content); 
				this.addMessage(message.content,"own","text", 0 );
				setTimeout(res=>{
					this.scrollToBottom()
				},200)
			},
			onCloseImage:function(){
				uni.hideKeyboard();
				this.sAction.show = !this.sAction.show; 
			},
			onSelectImage:function(e){
				if(!this.onSocketStatus){
					uni.showToast({
						title:"消息服务器连接中",
						icon:"none"
					});
					return false;
				}
				var type = e.value;
				var that = this; 
				this.onCloseImage();
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [type], //从相册选择
					success: function (res) {
						uni.showLoading({
							title:"上传中...",
						});
						upload({
							filePath: res['tempFilePaths'][0],
							success: function(upres) {
								uni.hideLoading()
								if (upres.imageURL) {
									chat.sendMessage(that,"image",upres['imageURL']); 
									that.addMessage(upres['imageURL'],"own","image", 0 );
								}
							},
							error: function(uperr) {
								uni.hideLoading()
								uni.showToast({
									title:"文件上传失败",
									icon:"none"
								})
							}
						})
					}
				});
			},
			previewImage:function(image){
				uni.previewImage({
					urls: [image['content']]
				});
			},
			addMessage: function ( content, type, messagetype , id) {
				// type  = friends 则为好友发送  own=则为我发送 
				var that = this;
				that.messages.push({
					avatar : that.portrait_bg,
					content : content,
					type : type,
					messagetype : messagetype,
					messageId : id,
				})
			},
			scrollToBottom: function () {
				var that = this;
				var query = uni.createSelectorQuery();
				query.selectAll('.layim-chat-box').boundingClientRect();
				query.exec(function (res) {
					that.style.mitemHeight = 0;
					if (res[0]) {
						res[0].forEach(function (rect) {
							that.style.mitemHeight = that.style.mitemHeight + rect.height + 20;
						});
					}
					if (that.style.mitemHeight > that.style.contentViewHeight) {
						that.scrollTop = that.style.mitemHeight - that.style.contentViewHeight;
					}
				}); 
			},
			loadMessage:function(){

			}
		}
	}
</script>

<style>
	.uni-column {
		display: flex;
		flex-direction: column;
	}
	.asz-chat {
		padding-left: 30rpx;
		text-align: left!important;
	}
	.content {

		display: flex;
		flex: 1;
		margin-bottom: 100upx;
	}

	.foot {
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: 0upx;
		overflow: hidden;
	}
</style>

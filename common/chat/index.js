/**
 * 聊天服务器简单脚本
 * _self = 当前页面指针
 * that = 实际page页面的指针 
 */
import base from '../../common/lib/base'
var Socket; 
var chat = {
	connectSocket:function(that){
		var _self = this; 
		// that 页面指针 
		Socket = uni.connectSocket({
		    url: that.$Sysconf("wsSocket.url"),
			header: {
				'content-type': that.$Sysconf("wsSocket.contentType")
			},
			method:"POST",
			
		});
		that.sAlert = {
			show:true,
			msg:"正在连接消息服务器...",
			icon:"msg",
		}
		// 监听连接成功
		uni.onSocketOpen(function (res) {
			that.sAlert = {
				show:false,
				msg:"消息服务器连接成功...",
				icon:"right",
			}
			that.onSocketStatus = true; 
			console.log('WebSocket连接已打开！');
		});
		// 监听连接错误
		uni.onSocketError(function (res) {
			that.sAlert = {
				show:true,
				msg:"糟糕，消息服务器连接失败",
				icon:"error",
			}
			console.log('WebSocket连接打开失败，请检查！');
		});
		// 断开了连接 
		uni.onSocketClose(function (res) {
			that.onSocketStatus = false;
			_self.connectSocket(that); 
			console.log('WebSocket 已关闭！');
		});
	},
	Init : function(that){
		var _self = this; 
		_self.connectSocket(that); 
		// 监听收到服务器信息 
		uni.onSocketMessage(function (e) {
			var data =  JSON.parse(e.data); 
			try{
				switch (data.type){
					case "init":
						_self.bindPutGroup(data.client_id,that); // 绑定当前用户日的房间 
						_self.hasfaces(that);
						break;
					case 'speak':
						var content = (data.content||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;');
						if(content.match(/face\[([^\s\[\]]+?)\]/g)){
							content.replace(/face\[([^\s\[\]]+?)\]/g, function(face){  //转义表情
								var alt = face.replace(/^face/g, '');
								var images = that.faceList[alt]; 
								if(images){
									that.addMessage(images,"friends","face",data.addtime);
									_self.scrollToBottom(that);
								}else{
									that.addMessage(data.content,"friends",data.model,data.addtime);
									_self.scrollToBottom(that);
								}
							})
						}else{
							that.addMessage(data.content,"friends",data.model,data.addtime);
							_self.scrollToBottom(that);
						}
						break;
					case 'message_list':
						var message = data.data.data; 
 						for (var i = message.length - 1; i >= 0; i--) {
 							var item = message[i];
							var content = (item.content||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;');
							if(content.match(/face\[([^\s\[\]]+?)\]/g)){
								content.replace(/face\[([^\s\[\]]+?)\]/g, function(face){  //转义表情
									var alt = face.replace(/^face/g, '');
									var images = that.faceList[alt]; 
									console.log(alt); 
									if(images){
										that.addMessage(images,item.model,"face",item.addtime);
										_self.scrollToBottom(that);
									}else{
										that.addMessage(item.content,item.model,item.type,item.addtime);
										_self.scrollToBottom(that);
									}
								})
							}else{
								that.addMessage(item.content,item.model,item.type,item.addtime);
								_self.scrollToBottom(that);
							}
 						}

						break;
					default:
						break;
				}
			}catch(e){
				//TODO handle the exception
				console.log("接收到了不合法的数据 不处理")
				console.log(e); 
			}
		});
	},
	scrollToBottom:function(that){
 		setTimeout(function() {
 			that.scrollToBottom()
 		}, 200);
	},
	bindPutGroup:function(client_id,that){
		var _self = this; 
		var post = {
			type:"bind",
			client_id:client_id,
			appkey:that.$Sysconf("appkey"),
			appsecret:that.$Sysconf("appsecret"),
			uid:that.userid,
			userid:that.touserid,
			form:"app", 
			device_type:base.IS_IOS? "ios":"android",
		};
		uni.sendSocketMessage({
			data:JSON.stringify(post),
			success:function(res){
				console.log("bindPutGroup："+JSON.stringify(res)); 
			}
		})
	},
	sendMessage:function(that,model,content){
		var _self = this; 
		var post = {
			type:"sendMessage",
			appkey:that.$Sysconf("appkey"),
			appsecret:that.$Sysconf("appsecret"),
			uid:that.userid,
			userid:that.touserid,
			form:"app", 
			device_type:base.IS_IOS? "ios":"android",
			content:content,
			model:model,
		};
		uni.sendSocketMessage({
			data:JSON.stringify(post),
			success:function(res){
				console.log("sendMessage："+JSON.stringify(res)); 
			}
		});
	},
	unloadChat:function(that){
		console.log("执行关闭")
		// 关闭
		try{
			uni.closeSocket();
			uni.onSocketClose(function (res) {
				console.log('WebSocket 已关闭！');
			});
		}catch(e){
			//TODO handle the exception
			console.log("关闭失败")
		}

	},
	loadFriends:function(that){
		
	},
	hasfaces:function(that){
		// 初始化表情，并把表情放再当前data中，显示时 直接使用 that.faceList[[可爱]]; 
		var alt = ["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"], arr = []; 
		var APPHOST = that.$Sysconf("APPHOST"); 
		alt.forEach(function(item,index){
			arr[item] = APPHOST + "static/plugs/layui/images/face/"+index+ ".gif";
		}); 
		that.faceList = arr; 
		return true; 
	}
}

module.exports = chat;
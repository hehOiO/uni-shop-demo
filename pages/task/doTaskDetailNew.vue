<template>
	<view id="doTaskDetailNew">
		<cu-custom @change="complaintTap(taskDetail.order_id,taskDetail.id)"  bgColor="bg-black" :isBack="true"><block slot="backText">返回</block><block slot="content"></block><block v-if="taskDetail.is_receive!=0" slot="right">投诉</block></cu-custom>
		<view>
			<view class="bg-black light" style="padding: 24upx;">
				<view class="task-title text-bold" style="padding-bottom: 16upx;">{{taskDetail.title}}</view>
				<view class="task-middle-info text-cyan" style="padding-bottom: 16upx;">
					<text class="text-xl">{{taskDetail.order_price}}元 / 次</text>
				</view>
				<view class="task-bottom-explain text-sm">
					{{taskDetail.surplus_num}}人后截止 · 剩余{{taskDetail.surplus_day}}天 <!-- <text>· 项目结束</text> -->
				</view>
			</view>
			<view class="account-guarantee text-white text-sm">
				<text class="cuIcon-sponsor text-white margin-right"></text>雇主资金已托管，猎人赚钱有保障
			</view>
			<view class="tag-container bg-white solid-bottom"> 
				<button class="cu-btn line-grey sm">每位猎人可以做{{taskDetail.limit_num}}次</button>
				<button class="cu-btn line-grey sm">奖励{{taskDetail.examine_limit}}小时内审核</button>
				<button class="cu-btn line-grey sm">猎人需{{taskDetail.submit_limit}}小时内完成</button>
			</view>
			<view class="user-info-container bg-white solid-bottom">
				<view class="cu-avatar round" v-if="taskDetail.user_head_icon!=''" :style="'background-image:url('+taskDetail.user_head_icon+');'"></view>
				<view class="cu-avatar round" v-if="taskDetail.user_head_icon==''" :style="'background-image:url('+headerDefault+');'"></view>
				<view class="user-info-content-box margin-left">
					<view style="margin-bottom: 5px;font-size: 22upx;">{{taskDetail.user_name?taskDetail.user_name:'未知生物'}}</view>
					<view class="text-gray text-xs">ID:{{taskDetail.user_id}}</view>
				</view>
			</view>
			<view class="task-content-container solid-bottom bg-white">
				<view class="task-item-container">
					<view class="task-item-title">任务描述</view>
					<view class="task-item-content text-sm">
						<view>{{taskDetail.remark}}</view>
					</view>
					<view class="task-item-photo-container">
						<image mode="aspectFill" v-for="(item , index) in taskDetail.remark_images" :key="index" :src="item" data-name="remark_images" @tap="ViewImage" :data-url="item"></image>
					</view>
				</view>
			</view>
			<view class="task-content-container solid-bottom bg-white" v-if="taskDetail.urls[0]!=''">
				<view class="task-item-container">
					<view class="task-item-title">任务相关链接</view>
					<view class="task-item-content text-sm text-blue" >
						<view v-for="(item , index) in taskDetail.urls" :key="index" @tap="openLink(item)">{{item}}</view>
					</view>
				</view>
			</view>
			<view class="task-content-container solid-bottom bg-white">
				<view class="task-item-container">
					<view class="task-item-title">任务要求</view>
					<view class="task-item-content text-sm">
						<view v-for="(item , index) in taskDetail.claim" :key="index" >{{item}}</view>
					</view>
				</view>
				<view class="task-item-photo-container">
					<image mode="aspectFill" v-for="(item , index) in taskDetail.claim_images" :key="index" :src="item" data-name="claim_images" @tap="ViewImage" :data-url="item"></image>
				</view>
			</view>
			<view class="submit-history solid-bottom bg-white" @tap="goHistory" v-if="taskDetail.is_receive==2||taskDetail.is_receive==3||taskDetail.is_receive==4">
				<view>
					提交历史
				</view>
				<view class="text-gray cuIcon-right">
					
				</view>
			</view>
			<view class="users-group bg-white">
				<view class="cu-avatar-group">
					<view class="cu-avatar round" v-for="(item,index) in taskDetail.complete_headers" :key="index" :style="[{ backgroundImage:'url(' + taskDetail.complete_headers[index] + ')' }]"></view>
				</view>
				<view class="text-black text-xs">
					等{{taskDetail.complete_num}}位猎人已经完成
				</view>
			</view>
		</view>
		<view class="submit-button-container" v-show="taskDetail.is_receive==0" @tap="getTask">
			接受任务
		</view>
		<view class="submit-button-container1" v-show="taskDetail.is_receive==1" @tap="submitTap">
			<view>提交作品</view>
			<view>
				<view class="uni-countdownls">
					<view class="uni-countdown-numbers" >{{h}}</view>
					<view class="uni-countdown-splitor">:</view>
					<view class="uni-countdown-numbers">{{i}}</view>
					<view class="uni-countdown-splitor">:</view>
					<view class="uni-countdown-numbers">{{s}}</view>
				</view>
			</view>
		</view>
		<view class="submit-button-container2" v-show="taskDetail.is_receive==2||taskDetail.is_receive==3">
			任务领取去次数已达上限
		</view>
		<view class="submit-button-container3" v-show="taskDetail.is_receive==4">
			提交资料未被采纳
		</view>
		<view class="submit-button-container3" v-show="taskDetail.is_receive==5">
			已放弃
		</view>
	</view>
</template>

<script>
	var util = require('../../common/lib/util.js');
	export default{
		data(){
			return{
				headerDefault:'../../static/headerdefault.png',
				imgList:[
					"../../static/bg-login.png",
					"../../static/bg-login.png",
					"../../static/bg-login.png"
				],
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				],
				status:1,
				order_expire_time_str:"",
				productid:'',
				taskDetail:{},
				orderid:"",
				userid:"",
				setTime: null,
				h: '00',
				i: '00',
				s: '00',
				leftTime: 0
			}
		},
		components: {
		},
		onLoad(options) {
			
			this.productid = options.productid;
			
		},
		onShow(){
			this.getDetail();
		},
		methods:{
			ViewImage(e){
				console.log(this.$refs.countdownView);
				let name = e.currentTarget.dataset.name;
				console.log(name);
				if(name == "remark_images"){
					uni.previewImage({
						urls: this.taskDetail.remark_images,
						current: e.currentTarget.dataset.url
					});
				}else{
					uni.previewImage({
						urls: this.taskDetail.claim_images,
						current: e.currentTarget.dataset.url
					});
				}
				
			},
			countDown: function(self) {
				var leftTime = self.leftTime - new Date();
				if (leftTime > 0) {
					var hours = parseInt(leftTime / 1000 / 60 / 60, 10);
					var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);
					var seconds = parseInt(leftTime / 1000 % 60, 10);
				} else {
					var hours = 0,
						minutes = 0,
						seconds = 0;
				}
				if (hours < 10) {
					hours = '0' + hours;
				}
				if (minutes < 10) {
					minutes = '0' + minutes;
				}
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				self.h = hours;
				self.i = minutes;
				self.s = seconds;
			},
			setInterValFunc: function(obj) {
				this.setTime = setInterval(function() {
					obj.countDown(obj);
				}, 1000);
			},
			openLink(url) { //打开外部链接
				plus.runtime.openURL(url, function(res) {  
					console.log(res);  
				});  
			},  
			goHistory(){
				let _this = this;
				console.log(_this.taskDetail.is_receive);
				if(_this.taskDetail.is_receive==4){
					uni.navigateTo({
						url:"../task/taskSubmit?orderid=" + _this.taskDetail.order_id +"&claim="+_this.taskDetail.claim+'&claim_images='+_this.taskDetail.claim_images
					})
				}else{
					uni.navigateTo({
						url:'../task/taskHistory?orderid='+ _this.taskDetail.order_id
					})
				}
				
			},
			getTask(){//接受任务
				console.log('11111');
				let _this = this;
				uni.getStorage({
				    key: 'zbdata',
				    success: function (res) {
						console.log(res.data);
						_this.userid = JSON.parse(res.data).user.id;
						if(_this.userid == _this.taskDetail.user_id){
							uni.showToast({
								title:"不能接取自己发布的任务",
								icon:'none'
							})
						}else{
							_this.$Request1('create_order', {
								product_id:_this.productid
							}).then(request => {
								console.log(request);
								if (request['code'] == 1) {
									var data = request['data'];
									_this.status = Number(_this.status) + 1;
									_this.getDetail();
									// _this.order_expire_time_str = util.dateUtils.toDateString(data.expire_time * 1000);
									// // console.log(_this.order_expire_time_str);
									// // _this.order_expire_time_str = "2019-12-09 22:42:31"
									// var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
									// var res = this.order_expire_time_str.match(reg);
									// var year = parseInt(res[1]);
									// var month = parseInt(res[2]);
									// var day = parseInt(res[3]);
									// var h = parseInt(res[4]);
									// var i = parseInt(res[5]);
									// var s = parseInt(res[6]);
									// var leftTime = new Date(year, month - 1, day, h, i, s);
									// _this.leftTime = leftTime;
									// _this.countDown(_this);
									// _this.setInterValFunc(_this);
								} else if(request['code'] == -1) {
									uni.showToast({
										title: request['msg'],
										icon: 'none'
									});
									uni.reLaunch({
									    url: '../index/login'
									});
								}else{
									uni.showToast({
										title: request['msg'],
										icon: 'none'
									});
									
								}
							}).catch(err=>{
								console.log( JSON.stringify(err) );
							})
						}
				    }
				});
				
			},
			submitTap(){
				let _this = this;
				
				uni.navigateTo({
					url:"../task/taskSubmit?orderid=" + _this.taskDetail.order_id +"&claim="+_this.taskDetail.claim+'&claim_images='+_this.taskDetail.claim_images
				})
			},
			complaintTap(orderid,productid){
				
				uni.navigateTo({
					url:"../task/complaintTask?orderid=" + orderid + '&productid=' + productid
				})
			},
			getDetail(){
				let _this = this;
				uni.showLoading();
				this.$Request1('task_detail', {
					productid:_this.productid
				}).then(request => {
					console.log(request);
					if (request['code'] == 1) {
						var data = request['data'];
						data.remark_images = data.remark_images.split(",");
						data.claim = data.claim.split('\n');
						data.claim_images = data.claim_images.split(',');
						data.urls = data.urls.split(',');
						_this.taskDetail = data;
						if(_this.taskDetail.is_receive==1){//领取后，未提交
							_this.status = 2;
							_this.order_expire_time_str = util.dateUtils.toDateString(data.expire_time * 1000);
							// console.log(_this.order_expire_time_str);
							// _this.order_expire_time_str = "2019-12-09 22:42:31"
							var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
							var res = this.order_expire_time_str.match(reg);
							var year = parseInt(res[1]);
							var month = parseInt(res[2]);
							var day = parseInt(res[3]);
							var h = parseInt(res[4]);
							var i = parseInt(res[5]);
							var s = parseInt(res[6]);
							var leftTime = new Date(year, month - 1, day, h, i, s);
							_this.leftTime = leftTime;
							_this.countDown(_this);
							_this.setInterValFunc(_this);
						}else if(_this.taskDetail.is_receive==2){//已提交
							
						}else if(_this.taskDetail.is_receive==3){//奖励已发放
							
						}else if(_this.taskDetail.is_receive==4){//被拒绝
							
						}else if(_this.taskDetail.is_receive==5){//放弃
							
						}
						
					} else if(request['code'] == -1) {
						uni.showToast({
							title: request['msg'],
							icon: 'none'
						});
						uni.reLaunch({
						    url: '../index/login'
						});
					}else{
						uni.showToast({
							title: request['msg'],
							icon: 'none'
						});
						
					}
					uni.hideLoading();
				}).catch(err=>{
					console.log( JSON.stringify(err) );
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style scoped>
	/*每个页面公共css */
	@import "../../colorui/main.css";
	@import "../../colorui/icon.css";
	@import "../../colorui/app.css";
	page{
		height: 100vh;
		background-color: #fff;
		font-size: 30upx;
	}
	
	.task-middle-info{
		padding-top: 0;
	}
	.task-bottom-explain{
		padding-top:0 ;
	}
	.account-guarantee{
		background-image: url('https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg');
		height: 90upx;
		width: 100%;
		line-height: 90upx;
		text-align: center;
	}
	.cuIcon-sponsor{
		font-size: 48upx;
	}
	.tag-container{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 24upx;
		flex-wrap: wrap;
	}
	.tag-container button{
		/* margin-right: 10px; */
		padding-left: 5upx;
		padding-right: 5upx;
		font-size: 18upx;
	}
	.user-info-container{
		padding: 24upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.task-item-title{
		padding: 24upx;
	}
	.task-item-content{
		padding: 24upx;
		padding-top: 0px;
	}
	.task-item-photo-container{
		padding: 24upx;
	}
	.task-item-photo-container image{
		width: 100upx;
		height: 100upx;
		margin-right:24upx;
		
	}
	.users-group{
		padding: 24upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 174upx;
	}
	.submit-button-container{
		position: fixed;
		width: 100%;
		bottom: 0px;
		text-align: center;
		height: 150upx;
		line-height: 150upx;
		color: #fff;
		background-color: #1cbbb4;
	}
	.submit-button-container1{
		position: fixed;
		width: 100%;
		bottom: 0px;
		text-align: center;
		height: 150upx;

		color: #fff;
		background-color: #0081ff;
	}
	.submit-button-container1 .uni-countdownls{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.submit-button-container2{
		position: fixed;
		width: 100%;
		bottom: 0px;
		text-align: center;
		height: 150upx;
		line-height: 150upx;
		color: #333;
		background-color: #f0f0f0;
	}
	.submit-button-container3{
		position: fixed;
		width: 100%;
		bottom: 0px;
		text-align: center;
		height: 150upx;
		line-height: 150upx;
		color: #333;
		background-color: #f0f0f0;
	}
	.submit-button-container,.submit-button-container1,.submit-button-container2,.submit-button-container3{
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		padding-top: 15upx;
	}
	.submit-history{
		padding: 24upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>

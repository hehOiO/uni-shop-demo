<template>
	<view class="content has-bg-white" id="zhanghao">
		<view class="">
			<view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh" v-if="mark==0 ">
				<i class="iconfont icon-busy"></i>
				<view class="has-desc-color is-size-16 has-mgt-20" v-if="userid != '' ">亲，您还没有买号可以做任务</view>
				<view class="has-desc-color is-size-16 has-mgt-20" v-if="userid == '' ">您还没有登录，请先登录！</view>
				<view class="s-btn has-mgt-20">
					<navigator :url="'/pages/ucenter/security/buynumber?type='+type"  v-if="userid != '' " class="is-btn is-btn-md  has-bg-red">去绑定</navigator>
					<navigator url="/pages/ucenter/login" v-if="userid == '' " class="is-btn is-btn-md  has-bg-red">去登录</navigator>
					<navigator open-type="switchTab" url="/pages/index/index" class="is-btn is-btn-md  has-bg-blue">返回首页</navigator>
				</view>
			</view>
			
			<view class="s-col is-col-24" v-if="mark==1">
				<view v-show="modelid=='more'" style="color:#5F5F5F;padding:24rpx 30rpx;font-size:28rpx;">设置接单类型</view>
				<view style="background-color:#fff;padding:24rpx 30rpx;" v-show="modelid=='more'">
					<view class="mode-operation-box">
						<view class="mode-operation-item-text">
							<view>浏览任务</view>
							<view class="mode-operation-small">（货比收藏，无需付款）</view>
						</view>
						<switch style="transform:scale(0.7)" color="#F29F14" data-model="2" @change="switchChange" checked/>
					</view>
					<view class="mode-operation-box">
						<view class="mode-operation-item-text">
							<view>垫付任务</view>
							<view class="mode-operation-small">（当天任务，当天完成）</view>
						</view>
						<switch style="transform:scale(0.7)" color="#F29F14" data-model="1" @change="switchChange" checked/>
					</view>
				</view>
				<view style="color:#5F5F5F;padding:24rpx 30rpx;font-size:28rpx;">选择接单账号（必选）</view>
				<view style="padding:24rpx 30rpx;background-color:#fff;">
					<view v-for="(item,index) in buyerlist" :key="index" class="buyer-item-container">
						<view :class="['buyer-account',item.checked?'text-orange':'']">
							<view :class="['iconfont','icon-unie651','icon-box',item.checked?'text-orange':'']" v-if="item.type == 'taobao'"></view>
							<view :class="['iconfont', 'icon-jingdongbaitiao', 'icon-box',item.checked?'text-orange':'']" v-if="item.type == 'jd'"></view>
							<view :class="['iconfont', 'icon-pinduoduo' ,'icon-box',item.checked?'text-orange':'']" v-if="item.type == 'pinduoduo'"></view>
							<view>{{item.name}}</view>
						</view>
						<view class="buyer-item-status">{{item.status==1?'正常接单':'审核中'}}</view>
						<view class="img-button" @tap="checkboxChange" :data-disable="item.status" :data-index="index" :data-value="item.value">
							<image :src="item.checked?'../../static/images/common/task-choosed.png':'../../static/images/common/task-choose.png'" mode="widthFix"></image>
						</view>
					</view>
				</view>
				
			</view>

			<view class="jiedan" v-if="mark==1 " @tap="GetNewTask">
				<view class="is-size-16">{{taskBtnText}}</view>
				<view class="taskStatus" v-if="taskStatus"></view>
				<view class="flash animated infinite"></view>

			</view>

			<view class="jiedan jiedanright" v-if="taskStatus" @tap="stopTask">
				<span>停止</span>
			</view>
		</view>
		
		<uni-popup :show="newTaskPopup" type="middle newTaskPopup" @hidePopup="hidePopup">
			<view class="has-pd-20 is-center">
				<view class="new-task-popup">
					<view class="has-pd-10 popup-image is-center">
						<image src="../../static/images/task/lamp@2x.png" mode="widthFix" class="is-response"></image>
					</view>
					<view class="has-pd-10 has-title-color is-bold is-size-20">
						来新任务啦~
					</view>
					<view class="has-bordert has-pdt-20 is-left has-title-color is-size-20" @tap="toTaskDetail">
						您已经接到了一个新的任务，请在<text class="is-blue">{{task_submit_time}}内</text>完成并提交;<text class="is-blue iconfont icon-hand">点击去做任务</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex';
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
				taskkind:[2,1,4,6],//2浏览 1 垫付 4预约
				mark:1,
				task_type:"",//任务类型
				modelid:"",
				task_submit_time:"",//做任务时间
			}
		},
		computed: {
			...mapState(['taskBtnText', 'taskStatus', 'intervalID'])
		},
		components: {
			uniPopup
		},
		methods: {
			switchChange(e){//任务模式开关
				console.log(e.currentTarget.dataset.model)
				console.log(e.detail)
				if(e.detail.value){
					this.taskkind.push(parseInt(e.currentTarget.dataset.model));
				}else{
					for(let i=0;i<this.taskkind.length;i++){
						if(e.currentTarget.dataset.model== this.taskkind[i]){
							this.taskkind.splice(i,1);
						}
					}
				}
				console.log(this.taskkind)
			},
			toRules(){//跳转规则页面
				uni.navigateTo({
					url: '/pages/tool/task_rule'
				});
			},
			hidePopup: function() {//隐藏接到任务弹窗
				this.newTaskPopup = !this.newTaskPopup;
			},
			toTaskDetail: function() {//去做任务跳转
				var order_sn = this.order_sn;
				this.hidePopup();
				uni.navigateTo({
					url: '/pages/index/new_detailPinDuoDuo?order_sn='+order_sn
				});
			},
			loadBuyer: function() {//加载买手列表
				let _this = this;
				this.$Request("member/loadBuyer", {
					uid: this.userid,
					type: this.type
				}).then(res => {
					if (res.code == 1001) {//未登陆状态
						uni.showToast({
							title: "您还没有登录哦",
							icon: "none"
						})
					} else {
						this.buyerlist = [];	
						if (res.data.buyer) {
							res.data.buyer.forEach(item => {
								if(_this.taskkind != 5){//非自审任务
									this.buyerlist.push({
										name: item.name,
										value: String(item.id),
										type: item.type,
										status:item.status,
										checked: (item.jiedan_status > 0) ? true : false,
									})
								}else{//自审任务
									this.buyerlist.push({
										name: item.name,
										value: String(item.id),
										type: item.type,
										status:item.status,
										checked: false,
									})
								}
								
							});
						}
						if (this.buyerlist.length < 1) {//如果买号列表未空
							this.mark = 0;
							const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert'); //原生插件
							dcRichAlert.show({
								title: "温馨提示",
								titleColor: '#303133',
								content: "您还没有可用买号，是否立即前往绑定？",
								contentAlign: 'left',
								buttons: [{
										title: '立即绑定',
										titleColor: '#409EFF'
									},
									{
										title: '稍后再说',
										titleColor: '#303133'
									},
								]
							}, result => {
								if (result.index == 0) {
									uni.navigateTo({
										url: "/pages/ucenter/security/buynumber"
									})
								} else {
									uni.navigateBack({})
								}
							});
						}
					}
					uni.hideLoading();
				})
			},
			checkboxChange: function(e) {//选择买号方法
				console.log(e.currentTarget.dataset.index);//下标
				console.log(this.buyerlist[e.currentTarget.dataset.index].checked);//是否选中
				console.log(e.currentTarget.dataset.disable);
				if(e.currentTarget.dataset.disable==1){
					if(this.buyerlist[e.currentTarget.dataset.index].checked){
						this.buyerlist[e.currentTarget.dataset.index].checked = false;
						for(let i=0;i<this.checkMall.length;i++){
							if(this.checkMall[i]==this.buyerlist[e.currentTarget.dataset.index].value){
								this.checkMall.splice(i,1);
							}
						}
					}else{
						this.buyerlist[e.currentTarget.dataset.index].checked = true;
						this.checkMall.push(e.currentTarget.dataset.value);
					}
					console.log(this.checkMall)
				}else{
					uni.showToast({
						title:"审核中的买号无法接单~",
						icon:"none"
					})
				}
			},
			GetNewTask: function() {//初始化接单
				let _this = this;
				var checkMall = this.checkMall;
				this.task_clear();
				console.log(this.taskStatus)
				if (this.taskStatus == true) {
					return false;
				}
				if (checkMall.length < 1) {
					uni.showToast({
						title: "请选择买号！",
						icon: "none"
					})
					return false;
				}
				if(this.modelid=='zs'){//如果为自审单
					if (checkMall.length > 1) {
						uni.showToast({
							title: "只能选择一个买号",
							icon: "none"
						})
						return false;
					}
					uni.navigateTo({
						url: '/pages/task/self_trial?buyerId='+this.checkMall[0],
					});
					for(let i=0;i<this.buyerlist.length;i++){
						this.buyerlist[i].checked = false;
						this.checkMall = [];
					}
				}else{
					if (checkMall.length > 3) {
						uni.showToast({
							title: "最多可选择3个买号",
							icon: "none"
						})
						return false;
					}
					uni.showLoading({
						title: '接单中...'
					});
					// 抢单数据初始化 
					_this.$Request("task/multitask_mode", {
						uid: _this.userid,
						buyer: JSON.stringify(checkMall),
						model:JSON.stringify(_this.taskkind),
						type:_this.type
					}).then(res => {
						uni.hideLoading();
						if (res.code == 200) {
							_this.getTask();
							_this.task({
								taskBtnText: "接单中..",
								taskStatus: true,
								taskTime: res.time,
							});
							_this.taskStatus = true;
						} else {
							_this.task_clear();
							uni.showToast({
								title: res.msg,
								icon: "none"
							})
						}
					});
				}
				
			},
			getTask: function() {
				if(this.taskkind !=5){
					this.$Request("task/getTask", {
						uid: this.userid,
						model:JSON.stringify(this.taskkind),
						type:this.type,
					}).then(req => {
						if (req.code == 200) {
							this.task_submit_time = req.data.task_submit_time;
							var order_sn = req.data.order_sn;
							this.task_clear();
							this.order_sn = order_sn;
							this.hidePopup();
							var app_message_push = this.$Cache.get("app_message_push"); 
							if( app_message_push['vshort'] == undefined || app_message_push['vshort'] == true ) {
								uni.vibrateShort({}); // 发生震动 
							}
							if( app_message_push['vmusic']  == undefined || app_message_push['vshort'] == true  ) {
								const bgAudioMannager = uni.getBackgroundAudioManager();
								bgAudioMannager.title = '来新订单啦';
								bgAudioMannager.singer = '来新订单啦';
								bgAudioMannager.src = 'http://static.diudanke.com/auto_task_new_order.mp3';
							}
						} else if (req.code == 400) {
							this.task_submit_time = req.data.task_submit_time;
							this.task({
								taskBtnText: "接单中..",
								taskStatus: true,
							});
							this.taskStatus = true;
							if (!this.indexintervalID) {
								var intervalID = setInterval(inc => {
									this.getTask();
								}, 15000);
								this.task({
									taskBtnText: "接单中..",
									taskStatus: true,
									taskTime: req.time,
									intervalID: intervalID
								});
								this.indexintervalID = intervalID;
							}
							var get_task_tips_wait = this.$Cache.get("get_task_tips_wait");
							if (get_task_tips_wait == false) {
								// 300秒 
								if ((parseInt(req.data.wait_time) + 300) <= req.time) {
									clearInterval(this.indexintervalID);
									this.indexintervalID = null;
									this.task_clear();
									uni.showModal({
										title: '提示信息',
										content: '您已经等待超过5分钟了，系统还未匹配到合适您的订单，是否继续等待？',
										cancelText: "不等了",
										confirmText: "继续等待",
										success: (res => {
											if (res.confirm) {
												this.getTask();
												this.$Cache.put("get_task_tips_wait", true);
											} else if (res.cancel) {
												this.stopTask();
											}
										})
									});
								}
							}
						}else{
							this.task_submit_time = req.data.task_submit_time;
						}
					});
				}
			},
			stopTask: function() {
				this.$Request("task/stopTask", {
					uid: this.userid,
					type:this.type,
					model:this.taskkind
				}).then(res => {
					if (res.code == 200) {
						this.task_clear();
						this.loadBuyer();
						this.checkMall = [];
					}
				});
			},
			...mapMutations(['task', 'task_clear', 'task_interval_clear']),
		},
		onHide: function() {
			
			this.indexintervalID && clearInterval(this.indexintervalID);
			this.indexintervalID = null;
		},
		onShow: function() {
			
		},
		
		onUnload: function() {
			let _this = this;
			this.task_interval_clear();
			this.checkMall = [];
			this.indexintervalID && clearInterval(this.indexintervalID);
			this.indexintervalID = null;
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			var prevPage = pages[pages.length - 2]; //上一个页面
			this.$Cache.put("zhangHaoId",this.taskkind);
			this.$Cache.put("zhangHaoType",this.type);
		},
		onLoad(options){
			uni.showLoading({
				title: '加载中...'
			});
			console.log(options.type)
			this.type=options.type;
			this.modelid = options.id;
			var userid = this.$SysUser.openid();
			this.userid = userid;
			// this.taskkind=options.id;
			this.loadBuyer();
			this.getTask();
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	.text-orange{
		color: #E02E24!important;
	}
	.buyer-item-container{
		background-color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.buyer-item-container:not(:last-child){
		padding-bottom: 5px;
		margin-bottom: 5px;
		border-bottom: 0.5px solid #EAEAEA;
	}
	.buyer-item-status{
		color: #BBBBBB;
		font-size:28rpx;
	}
	.img-button{
		width: 50rpx;
		height: 50rpx;
	}
	.img-button image{
		width: 100%;
	}
	.icon-box{
		font-size: 42rpx;
		color: #BBBBBB;
		margin-right: 15rpx;
	}
	.buyer-account{
		color: #626262;
		font-size: 28rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 35%;
	}
	.mode-operation-item-text{
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size:28rpx;
		color: #9C9C9C;
	}
	
	.mode-operation-small{
		font-size: 22rpx;
		color: #D0D0D0;
	}
	.mode-operation-box{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.mode-operation-box:not(:last-child){
		padding-bottom: 10rpx;
		margin-bottom:10rpx;
		border-bottom: 1px solid #EAEAEA;
	}
	#zhanghao .footer{
		display: flex;
		position: fixed;
		width: 100%;
		align-items: center;
		bottom: 0;
		left: 0;
		background-color: #032A51;
		height: 100rpx;
		padding: 20rpx;
		box-sizing: border-box;
		justify-content: space-between
	}
	#zhanghao .footer>view:first-child,#zhanghao .footer>view:last-child{
		width: 25%;
		background-color: #043867;
		text-align:center;
		height: 100%;
		line-height: 60rpx;
		color: #fff;
		border-radius: 20rpx;
	}
	#zhanghao .footer-middle{
		width: 40%;
		height: 70rpx!important;
		line-height: 70rpx!important;
		background-color: #FF7D00!important;
		color:#fff!important;
		border-radius: 20rpx!important;
		font-size: 36rpx!important;
		font-weight: 900!important;
		text-align: center;
		position: relative;
	}
	#zhanghao .footer-middle.activeBtn:before{
		background: rgba(0,0,0,0) url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU3Mzc1Njc4NDA3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0NTciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjAuMDE0IDU0Mi4zODVjMC0zNy45ODIgMzAuMzg1LTY4LjM2NyA2OC4zNjctNjguMzY3IDQ1LjU3OCAwIDc1Ljk2NCAzMC4zODUgNzUuOTY0IDY4LjM2NyAwIDQ1LjU3OC0zMC4zODUgNzUuOTY0LTc1Ljk2NCA3NS45NjQtMzcuOTgyIDAtNjguMzY3LTMwLjM4NS02OC4zNjctNzUuOTY0ek0xNTEuMTcxIDI3Ni41MTJ2MGMwLTUzLjE3NSAzNy45ODItOTguNzUzIDkxLjE1Ny05OC43NTNzOTguNzUzIDQ1LjU3OCA5OC43NTMgOTguNzUzdjBjMCA1My4xNzUtNDUuNTc4IDkxLjE1Ny05OC43NTMgOTEuMTU3cy05MS4xNTctMzcuOTgyLTkxLjE1Ny05MS4xNTd2MHpNMTg5LjE1MyA4MTUuODU2djBjMC0zMC4zODUgMjIuNzg5LTUzLjE3NSA1My4xNzUtNTMuMTc1czUzLjE3NSAyMi43ODkgNTMuMTc1IDUzLjE3NXYwYzAgMzAuMzg1LTIyLjc4OSA1My4xNzUtNTMuMTc1IDUzLjE3NXMtNTMuMTc1LTIyLjc4OS01My4xNzUtNTMuMTc1ek00NTUuMDI3IDkyOS44MDJ2MGMwLTM3Ljk4MiAyMi43ODktNjAuNzcyIDYwLjc3Mi02MC43NzJzNjAuNzcyIDIyLjc4OSA2MC43NzIgNjAuNzcydjBjMCAzNy45ODItMjIuNzg5IDYwLjc3Mi02MC43NzIgNjAuNzcyLTM3Ljk4MiAwLTYwLjc3Mi0yMi43ODktNjAuNzcyLTYwLjc3MnpNNzUxLjI4NyA4MTUuODU2YzAtMjIuNzg5IDE1LjE5My0zNy45ODIgMzcuOTgyLTM3Ljk4MnMzNy45ODIgMTUuMTkzIDM3Ljk4MiAzNy45ODJjMCAyMi43ODktMTUuMTkzIDM3Ljk4Mi0zNy45ODIgMzcuOTgyLTIyLjc4OSAwLTM3Ljk4Mi0xNS4xOTMtMzcuOTgyLTM3Ljk4MnpNODM0Ljg0NyA1NDIuMzg1YzAtMzAuMzg1IDMwLjM4NS02MC43NzIgNjguMzY3LTYwLjc3MiAzMC4zODUgMCA2MC43NzIgMzAuMzg1IDYwLjc3MiA2MC43NzIgMCAzNy45ODItMzAuMzg1IDY4LjM2Ny02MC43NzIgNjguMzY3LTM3Ljk4MiAwLTY4LjM2Ny0zMC4zODUtNjguMzY3LTY4LjM2N3pNNjYwLjEzIDI3Ni41MTJjMC03NS45NjQgNjAuNzcyLTEyOS4xMzkgMTI5LjEzOS0xMjkuMTM5czEyOS4xMzkgNTMuMTc1IDEyOS4xMzkgMTI5LjEzOWMwIDY4LjM2Ny02MC43NzIgMTI5LjEzOS0xMjkuMTM5IDEyOS4xMzktNjguMzY3IDAtMTI5LjEzOS02MC43NzItMTI5LjEzOS0xMjkuMTM5ek0zODYuNjYgMTYyLjU2NmMwLTY4LjM2NyA2MC43NzItMTI5LjEzOSAxMjkuMTM5LTEyOS4xMzlzMTI5LjEzOSA2MC43NzIgMTI5LjEzOSAxMjkuMTM5YzAgNjguMzY3LTYwLjc3MiAxMjkuMTM5LTEyOS4xMzkgMTI5LjEzOS02OC4zNjcgMC0xMjkuMTM5LTYwLjc3Mi0xMjkuMTM5LTEyOS4xMzl6IiBwLWlkPSI0NDU4IiBmaWxsPSIjY2RjZGNkIj48L3BhdGg+PC9zdmc+) no-repeat;
		content: " ";
		display: inline-block;
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		-webkit-animation: haha1 1s steps(12) infinite;
		animation: haha1 1s steps(12) infinite;
		background-size: 100%;
		margin-right: 10rpx;
	}
// 	#zhanghao .footer-middle{
// 		width: 40%;
// 	}
// 	#zhanghao .footer-middle uni-button[type=primary]{
// 		height: 70rpx!important;
// 		line-height: 70rpx!important;
// 		background-color: #FF7D00!important;
// 		color:#fff!important;
// 		border-radius: 20rpx!important;
// 		font-size: 36rpx!important;
// 		font-weight: 900!important;
// 	}
	#zhanghao .footer>view.no-stop{
		background-color: #bcbcbc!important;
	}
	.jiedan {
		position: fixed;
		bottom: 10%;
		margin: 0 auto;
		background: rgb(251, 113, 128);
		width: 150rpx;
		height: 150rpx;
		left: 40%;
		border-radius: 50%;
		color: #FFFFFF;
		text-align: center;
		line-height: 150rpx;
		font-size: 40rpx;
		z-index: 99;
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
	@-webkit-keyframes haha1{
 
		0%{-webkit-transform:rotate(0deg);}
 
		25%{-webkit-transform:rotate(90deg);}
 
		50%{-webkit-transform:rotate(180deg);}
 
		75%{-webkit-transform:rotate(270deg);}
 
		100%{-webkit-transform:rotate(360deg);}
 
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


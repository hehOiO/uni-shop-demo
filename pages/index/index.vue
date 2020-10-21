<template>
	<view class="content index-content">
		<view class="s-page-wrapper has-pdt-20 has-pdb-20 home-info">
			<view class="s-row-flex " v-if="amount">
				<navigator class="s-col is-col-8 has-borderr" url="/pages/ucenter/score/log?type=product_commision">
					<view class="has-pdl-20">
						<view class="has-desc-color is-white is-size-14  ">我的收益<span class="is-size-12">（元）</span></view>
						<view class="  is-size-24 is-white ">{{ amount.task_score }}</view>
					</view>
				</navigator>
				<navigator class="s-col is-col-8 has-borderr" url="/pages/ucenter/score/log?type=agent_commision">
					<view class="has-pdl-20">
						<view class="has-desc-color is-white is-size-14  ">团队收益<span class="is-size-12">（元）</span></view>
						<view class="  is-size-24 is-white ">{{ amount.agent_score }}</view>
					</view>
				</navigator>
				<navigator class="s-col is-col-8" url="/pages/ucenter/score/log?type=product_order">
					<view class="has-pdl-20">
						<view class="has-desc-color is-white is-size-14 ">本金总计<span class="is-size-12">（元）</span></view>
						<view class="  is-size-24 is-white ">{{ amount.score }}</view>
					</view>
				</navigator>
			</view>
		</view>
		<view class="s-row-flex has-pdtb-12" style="background-color: #FF4B5D;color: #fff;">
			<view class="is-col-8 is-size-12 is-center">今日收入</view>
			<navigator class="is-col-8 is-size-12 is-center" url="/pages/ucenter/score/log?type=product_commision&date=today">
				<view >任务收益{{ amount.product_commision }}元</view>
			</navigator>
			<navigator class="is-col-8 is-size-12 is-center" url="/pages/ucenter/score/log?type=agent_commision&date=today">
				<view >团队收益{{ amount.agent_total }}元</view>
			</navigator>
		</view>
		<view class="s-row notice-box" >
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">
					<view class="is-item " style="background-color: #f2f2f2;padding: 12rpx;">
						<view class="is-item-hd is-56aafb has-pdr-5"><image src="../../static/images/task/laba.png" mode="widthFix"></image></view>
						<view class="is-item-bd is-oneline " v-if="notice.id" @tap="toDetail(notice.id)">
							<view class="is-size-14 msg-word" style="color:#969799!important">{{ notice.title }}</view>
						</view>
					</view>
					<view class="banner" style="width: 100%;" v-if="app_home_ad_banner_close" @tap="adBannerClick">
						<image :src="app_home_ad_banner_picture" mode="widthFix" class="is-response"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="border-top: 20rpx solid #E2E1E0;">
			<view class="new-user-task" @tap="toHighTask">
				<view><image src="../../static/images/task/order.png"></image></view>
				<view>
					<view>众包任务</view>
					<view>佣金高，审核快，无需垫付任何金额</view>
				</view>
			</view>
			<view class="new-user-task" @tap="toRecived">
				<view><image src="../../static/images/task/order.png"></image></view>
				<view>
					<view>已接众包任务</view>
					<view>当前已接的众包任务</view>
				</view>
			</view>
			<view class="new-user-task" @tap="toNewbieTask">
				<view><image src="../../static/images/task/order.png"></image></view>
				<view>
					<view>众包收益</view>
					<view>已获得的众包收益</view>
				</view>
			</view>
			<view class="new-user-task" @tap="toNewbieTeach">
				<view><image src="../../static/images/task/book.png"></image></view>
				<view>
					<view>新手教学</view>
					<view>学习新手教学后再做任务哦！</view>
				</view>
			</view>
		</view>
		<uni-popup :show="newTaskPopup" type="middle newTaskPopup" @hidePopup="hidePopup">
			<view class="has-pd-20 is-center">
				<view class="new-task-popup">
					<view class="has-pd-10 popup-image is-center"><image src="../../static/images/task/lamp@2x.png" mode="widthFix" class="is-response"></image></view>
					<view class="has-pd-10 has-title-color is-bold is-size-20">来新任务啦~</view>
					<view class="has-bordert has-pdt-20 is-left has-title-color is-size-20" @tap="toTaskDetail">
						您已经接到了一个新的任务，请在
						<text class="is-blue">{{amount.task_submit_time}}内</text>
						完成并提交;
						<text class="is-blue iconfont icon-hand">点击去做任务</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<view class="jiedan" @tap="getNewTask">
			<view class="btn">{{ taskBtnText }}</view>
			<view class="taskStatus" v-if="taskStatus"></view>
			<view class="flash animated infinite"></view>
		</view>
		<view class="jiedan jiedanright" v-if="taskStatus" @tap="stopTask"><span>停止</span></view>
		<!-- 弹出层 -->
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
		    <view class="qiandao-box" style="background-color: #FF8C99;">
				<view style="font-size: 48rpx;color: #fff;display: flex;align-items: center;width: calc(100% - 100rpx);justify-content: center;"><image style="width: 50rpx;height: 50rpx;margin-right: 15rpx;" src="../../static/images/common/right.png" mode="widthFix"></image> <view>签到成功</view></view>
				<view style="width: 100rpx;height: 100rpx;">
					<image src="../../static/images/common/zuanshi.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="qiandao-content-box">
				
				<view class="text-explain-box">
					<view style="font-size: 52rpx;">+{{qiandao_money}}</view>
					<view style="font-size: 24rpx;">每日签到得奖励,您已累计签到{{qiandao_days}}天</view>
				</view>
				<view class="qiandao-button" @tap="closeQd">
					确定
				</view>
			</view>
		</view>
		<view class="alert-img" v-if="alertShow" @tap="closeShow">
			<image :src="alertImage" mode="widthFix"></image>
		</view>
		<view class="uni-mask" v-if="bannerShow||alertShow||chooseShow" @tap="closeShow"></view>
		<view :class="['choose-box',chooseShow?'choose-show':'']">
			<view class="choose-box-title-nav" >
				<view v-for="(item , index) in chooseTab" :class="item.active?'title-nav-active':''" @tap="chooseTitleTap(index)">{{item.name}}</view>
			</view>
			<view class="choose-box-content-container" v-show="chooseContainerShow==0">
				<view class="choose-container-item" @tap="modelsTaskTap('taobao')">
					<view class="choose-item-text">
						<view style="margin-bottom: 5rpx;">多任务类型模式</view>
						<view>浏览单、垫付单、预售单、特殊路径单可以设置同时接单</view>
					</view>
					<view class="right-icon-box">
						<image src="../../static/images/common/right-icon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="choose-container-item" style="margin-bottom: 30rpx;" @tap="zsTaskTap">
					<view class="choose-item-text">
						<view  style="margin-bottom: 5rpx;">商家自审选号任务</view>
						<view>买手提供买号实时截图，商家选定进行派单</view>
					</view>
					<view class="right-icon-box">
						<image src="../../static/images/common/right-icon.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="choose-box-content-container" v-show="chooseContainerShow==1">
				<view class="choose-container-item" @tap="modelsTaskTap('jd')">
					<view class="choose-item-text">
						<view style="margin-bottom: 5rpx;">多任务类型模式</view>
						<view>浏览单、垫付单可以设置同时接单</view>
					</view>
					<view class="right-icon-box">
						<image src="../../static/images/common/right-icon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="choose-container-item" style="margin-bottom: 30rpx;opacity:0;" >
					<view class="choose-item-text">
						<view  style="margin-bottom: 5rpx;">商家自审选号任务</view>
						<view>买手提供买号实时截图，商家选定进行派单</view>
					</view>
					<view class="right-icon-box">
						<image src="../../static/images/common/right-icon.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="choose-box-content-container" v-show="chooseContainerShow==2">
				<view class="choose-container-item" @tap="modelsTaskTap('pinduoduo')">
					<view class="choose-item-text">
						<view style="margin-bottom: 5rpx;">多任务类型模式</view>
						<view>浏览单、垫付单可以设置同时接单</view>
					</view>
					<view class="right-icon-box">
						<image src="../../static/images/common/right-icon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="choose-container-item" style="margin-bottom: 30rpx;opacity:0;" >
					<view class="choose-item-text">
						<view  style="margin-bottom: 5rpx;">商家自审选号任务</view>
						<view>买手提供买号实时截图，商家选定进行派单</view>
					</view>
					<view class="right-icon-box">
						<image src="../../static/images/common/right-icon.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="choose-box-content-container" v-show="chooseContainerShow==3">
				<view class="choose-container-item" @tap="modelsTaskTap('douyin')">
					<view class="choose-item-text">
						<view style="margin-bottom: 5rpx;">抖音任务</view>
						<view>无需付款，快捷，方便，量大！</view>
					</view>
					<view class="right-icon-box">
						<image src="../../static/images/common/right-icon.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="choose-container-item" style="margin-bottom: 30rpx;opacity:0;" >
					<view class="choose-item-text">
						<view  style="margin-bottom: 5rpx;">商家自审选号任务</view>
						<view>买手提供买号实时截图，商家选定进行派单</view>
					</view>
					<view class="right-icon-box">
						<image src="../../static/images/common/right-icon.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup.vue';
// import RemoteJs from '@/components/RemoteJs'// 导入组件
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			userid: '',//userid
			chooseShow:false,//接单选择任务模式container显示判断字段
			chooseContainerShow:0,//淘宝京东拼多多 显示判断
			chooseTab:[
				{
					name:"淘宝/天猫",
					active:true
				},
				{
					name:"京东",
					active:false
				},
				{
					name:"拼多多",
					active:false
				},
				{
					name:"抖音 ",
					active:false
				}
			],
			alertImage:"",//每日首次进入首页弹出活动提醒图片
			notice: {},
			bannerShow:false,//新手任务上方banner广告图片显示字段
			alertShow:false,//每日首次进入首页弹出活动是否弹出字段
			qiandao_money:0,//签到金额
			qiandao_days:0,//签到天数
			amount: {//首页统计数据
				amount: '0.00',
				score: '0.00',//本金总计
				is_novice_course: 0,
				total_money_count: 0,
				agent_total: '0.00',//今日团队收益
				product_commision: '0.00',//今日佣金收益
				task_score: '0.00',//我的收益
				agent_score: '0.00',//团队的收益
				score_total: '0.00'
			},
			location: {//经纬度数据
				longitude: '',
				latitude: ''
			},
			indextipJiedan: false,
			indexintervalID: null,
			newTaskPopup: false,//是否弹出接到任务弹窗
			order_sn: '',//订单编号
			app_home_ad_banner_close: false,
			app_home_ad_banner_picture: '',
			app_home_ad_banner_links: '',
			id:"",//记录选择刷单账号页面的id
			type:"",//记录选择刷单账号页面的type
			trialStatus:0,//自审任务提醒状态
		};
	},
	components: {
		uniPopup
		// RemoteJs
	},
	computed: {
		...mapState(['taskBtnText', 'taskStatus', 'intervalID', 'forcedLogin'])
	},
	methods: {
		...mapMutations(['task', 'task_clear', 'task_interval_clear']),
		adBannerClick: function() {
			// this.$NavTarge(this.app_home_ad_banner_links);
			uni.navigateTo({
				url:"/pages/ucenter/activity/union"
			})
		},
		loadRongJs() {
			// 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
			console.log(RongIMLib) //eslint-disable-line
		},
		toHighTask(){
			uni.navigateTo({
				url:'../task/doTaskNew'
			})
		},
		toRecived(){
			uni.navigateTo({
				url:'../task/taskMangeNew'
			})
		},
		chooseTitleTap(index){
			console.log(index);
			
			for(let i=0;i<this.chooseTab.length;i++){
				if(index==i){
					this.chooseTab[i].active = true;
				}else{
					this.chooseTab[i].active = false;
				}
			}
			this.chooseContainerShow = index;		
		},
		hidePopup: function() {
			this.newTaskPopup = !this.newTaskPopup;
		},
		getAlertShow(){
			let _this  = this;
			this.$Request('chat/advert', {
				uid: this.userid
			}).then(res => {
				if (res.code == 200) {
					_this.alertImage = res.data.url;
					if(res.data.status == 0){
						_this.alertShow = true;
					}
				} else {
					
				}
			});
		},
		closeShow(){
			this.bannerShow = false;
			this.alertShow = false;
			this.chooseShow = false;
		},
		toNewbieTask(){
			uni.navigateTo({
				url: '/pages/ucenter/score/zblog',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toNewbieTeach(){
			uni.navigateTo({
				url: '/pages/index/Newbie_task_teach',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		toTaskDetail: function() {
			var order_sn = this.order_sn;
			this.hidePopup();
			if(this.platform=="taobao"){
				uni.navigateTo({
					url: '/pages/index/new_detail?order_sn='+order_sn
				});
			}else if(this.platform=="jd"){
				uni.navigateTo({
					url: '/pages/index/new_detailJd?order_sn='+order_sn
				});
			}else if(this.platform=="pinduoduo"){
				uni.navigateTo({
					url: '/pages/index/new_detailPinDuoDuo?order_sn='+order_sn
				});
			}else{
				uni.navigateTo({
					url: '/pages/index/new_detailDouyin?order_sn='+order_sn
				});
			}
			
		},
		stopTask: function() {
			this.$Request('task/stopTask', {
				uid: this.userid
			}).then(res => {
				if (res.code == 200) {
					this.task_clear();
				}
			});
		},
		loadNotice: function() {
			this.$Request('task/loadNotice', {
				num: 1
			}).then(res => {
				if (res.code == 200) this.notice = res.data;
			});
		},
		loadData: function() {
			this.$Request('member/loadMemberAmount', {
				uid: this.userid
			}).then(res => {
				if (res.code == 200) {
					this.amount = res.data;
				} else {
					this.amount = {
						amount: '0.00',
						score: '0.00',
						is_novice_course: 0,
						total_money_count: 0,
						agent_total: '0.00',
						product_commision: '0.00',
						task_score: '0.00',
						agent_score: '0.00',
						score_total: '0.00',
					};
				}
			});
		},
		getTrial:function(){
			let _this = this;
			if(this.trialStatus==1){
				this.$Request('task/getTrialStatus', {
					uid: this.userid
				}).then(res => {
					if (res.code == 200) {
						if(res.data.status ==1){
							var order_sn = res.data.order_sn;
							_this.order_sn = order_sn;
							_this.hidePopup();
							var app_message_push = _this.$Cache.get('app_message_push');
							if (app_message_push['vshort'] == undefined || app_message_push['vshort'] == true) {
								uni.vibrateShort({}); // 发生震动
							}
							if (app_message_push['vmusic'] == undefined || app_message_push['vshort'] == true) {
								const bgAudioMannager = uni.getBackgroundAudioManager();
								bgAudioMannager.title = '来新订单啦';
								bgAudioMannager.singer = '来新订单啦';
								bgAudioMannager.src = 'http://static.diudanke.com/auto_task_new_order.mp3';
							}
							_this.showTabBarDotInfo();
							_this.$Cache.put("trialStatus",0);
							_this.trialStatus = 0;
						}

					} else {
						
					}
				});
			}
		},
		toDetail: function(id) {
			uni.navigateTo({
				url: '/pages/detail/notice'
			});
		},
		getTask: function() {
			let _this = this;
			if(this.id!=5){
				this.$Request('task/get_task_new', {
					uid: this.userid,
					// model:this.id,
					// type:this.type,
				}).then(req => {
					if (req.code == 200) {
						var order_sn = req.data.order_sn;
						var platform = req.data.platform;
						_this.task_clear();
						clearInterval(_this.indexintervalID);
						_this.indexintervalID = null;
						_this.order_sn = order_sn;
						_this.platform = platform;
						_this.hidePopup();
						var app_message_push = _this.$Cache.get('app_message_push');
						if (app_message_push['vshort'] == undefined || app_message_push['vshort'] == true) {
							uni.vibrateShort({}); // 发生震动
						}
						if (app_message_push['vmusic'] == undefined || app_message_push['vshort'] == true) {
							const bgAudioMannager = uni.getBackgroundAudioManager();
							bgAudioMannager.title = '来新订单啦';
							bgAudioMannager.singer = '来新订单啦';
							bgAudioMannager.src = 'http://static.diudanke.com/auto_task_new_order.mp3';
						}
						_this.showTabBarDotInfo();
					} else if (req.code == 400) {
						_this.task({
							taskBtnText: '接单中..',
							taskStatus: true
						});
						_this.taskStatus = true;
						if (!_this.indexintervalID) {
							var intervalID = setInterval(inc => {
								_this.getTask();
							}, 15000);
							_this.indexintervalID = intervalID;
							_this.task({
								taskBtnText: '接单中..',
								taskStatus: true,
								taskTime: req.time,
								intervalID: intervalID
							});
						}
						var get_task_tips_wait = _this.$Cache.get('get_task_tips_wait');
						if (get_task_tips_wait == false) {
							// 300秒
							if (parseInt(req.data.wait_time) + 1800 < req.time) {
								clearInterval(_this.indexintervalID);
								_this.indexintervalID = null;
								_this.task_clear();
								const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
								dcRichAlert.show(
									{
										title: '温馨提示',
										titleColor: '#303133',
										content: '您已经等待超过30分钟了，系统还未匹配到合适您的订单，是否继续等待？',
										contentAlign: 'left',
										buttons: [
											{
												title: '继续等待',
												titleColor: '#409EFF'
											},
											{
												title: '不等了',
												titleColor: '#303133'
											}
										]
									},
									result => {
										if (result.index == 0) {
											_this.getTask();
											_this.$Cache.put('get_task_tips_wait', true);
										} else {
											_this.stopTask();
										}
									}
								);
							}
						}
					} else {
						clearInterval(this.indexintervalID);
						this.indexintervalID = null;
						this.task_clear();//清空接单按钮状态
					}
				});
			}else{
				
			}
			
		},
		getNewTask: function() {
			let _this = this;
			if(!this.taskStatus){
				uni.showLoading({
					title: '接单中...'
				});
				// 抢单数据初始化 
				_this.$Request("task/multitask_mode_new", {
					uid: _this.userid,
					// buyer: JSON.stringify(checkMall),
					// model:JSON.stringify(_this.taskkind),
					// type:_this.type
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
			
			// var url = '/pages/index/zhanghao';
			// var close_earth_push = this.$Sysconf('close_earth_push');//是否开启地推任务 暂时未用到
			// if(this.type=="taobao"){
			// 	if (!this.taskStatus) {//如果接单按钮非活跃状态，跳转到挑选任务类型
			// 			this.chooseShow = true;
			// 	} else {//如果为正在接单状态，跳转到正在接单的页面
			// 		uni.navigateTo({
			// 			url: '/pages/index/zhanghao?id=more&type=taobao'
			// 		});
			// 	}
			// }else if(this.type=="jd"){
			// 	if (!this.taskStatus) {//如果接单按钮非活跃状态，跳转到挑选任务类型
			// 			this.chooseShow = true;
			// 	} else {//如果为正在接单状态，跳转到正在接单的页面
			// 		uni.navigateTo({
			// 			url: '/pages/index/zhanghaoJd?id=more&type=jd'
			// 		});
			// 	}
			// }else if(this.type=="pinduoduo"){
			// 	if (!this.taskStatus) {//如果接单按钮非活跃状态，跳转到挑选任务类型
			// 			this.chooseShow = true;
			// 	} else {//如果为正在接单状态，跳转到正在接单的页面
			// 		uni.navigateTo({
			// 			url: '/pages/index/zhanghaoPinDuoDuo?id=more&type=pinduoduo'
			// 		});
			// 	}
			// }else{
			// 	if (!this.taskStatus) {//如果接单按钮非活跃状态，跳转到挑选任务类型
			// 			this.chooseShow = true;
			// 	} else {//如果为正在接单状态，跳转到正在接单的页面
			// 		uni.navigateTo({
			// 			url: '/pages/index/zhanghaoDouyin?id=more&type=douyin'
			// 		});
			// 	}
			// }
			
		},
		modelsTaskTap(type){
			if(type=="taobao"){
				uni.navigateTo({
					url: '/pages/index/zhanghao?id=more'+'&type=taobao'
				});
			}else if(type=="jd"){
				uni.navigateTo({
					url: '/pages/index/zhanghaoJd?id=more'+'&type=jd'
				});
			}else if(type =="pinduoduo"){
				uni.navigateTo({
					url: '/pages/index/zhanghaoPinDuoDuo?id=more'+'&type=pinduoduo'
				});
			}else{
				uni.navigateTo({
					url: '/pages/index/zhanghaoDouyin?id=more'+'&type=douyin'
				});
			}
			
			this.chooseShow = false;
		},
		zsTaskTap(){
			uni.navigateTo({
				url: '/pages/index/zhanghao?id=zs'+'&type=taobao'
			});
			this.chooseShow = false;
		},
		sendUpdateLogin: function() {
			var userid = this.$SysUser.openid();
			if (userid) {
				var clientid = '',
					token = '';
				//#ifdef APP-PLUS
				var inf = plus.push.getClientInfo();
				clientid = inf.clientid;
				if (plus.os.name == 'iOS') {
					token = inf.token;
				}
				//#endif
				var location = this.location;
				this.$Request('member/update_login_time', {
					uid: userid,
					clientid: clientid,
					clientid_token: token,
					longitude: location.longitude,
					latitude: location.latitude
				})
					.then(res => {
						console.log('更新登录时间成功');
						if (res.code == 100) {
							this.$SysUser.loginout(); //如果服务器登录失效 或其它原因 导致失败返回 则退出当前帐号信息
						} else if (res.code == 200) {
							this.$SysUser.save(res.data); // 更新用户的信息
						}
					})
					.catch(err => {
						console.log('啊哦~ 上传登录信息失败');
					});
			}
		},
		getCurrentPosition: function() {
			var that = this;
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	geocode:true,
			// 	success: function(res) {
			// 		console.log(JSON.stringify(res));
			// 		that.location.longitude = res.longitude;
			// 		that.location.latitude = res.latitude;
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 		console.log(res.address);
			// 	},
			// 	fail: function(err) {
			// 		// uni.showToast({
			// 		// 	title: '为了更精准的给您派发任务，请打开定位功能',
			// 		// 	icon: 'none'
			// 		// });
			// 	}
			// });
			plus.geolocation.getCurrentPosition(function(p){
				console.log('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
				console.log(JSON.stringify(p.address));
			}, function(e){
				console.log('Geolocation error: ' + e.message);
			} );
		},
		closeIndextipJiedan: function() {
			this.$Cache.put('indextipJiedan', true);
			this.indextipJiedan = false;
		},
		showTabBarDotInfo: function() {
			this.$Request('task/getTabbarDot', {
				uid: this.userid,
				
			}).then(res => {
				if (res.code == 200) {
					if (res.data.length > 0) {
						res.data.forEach(item => {
							if (item.type == 'Dot') {
								uni.showTabBarRedDot({
									index: item.index
								});
							} else if (item.type == 'Badge') {
								if(item.num>=1){
									uni.setTabBarBadge({
										index: item.index,
										text: item['num'].toString()
									});
								}else{
									uni.removeTabBarBadge({
									  index: item.index,
									})
								}
							}
						});
					}else{
						
					}
				}
			});
		},
		closeQd(){
			this.loadData();
			 this.bannerShow = false;
		},
		getPhoneContacts:function(){//获取手机SIM卡通讯录
			plus.contacts.getAddressBook( plus.contacts.ADDRESSBOOK_SIM, 
			function(addressbook ){
				addressbook.find(["displayName","phoneNumbers"],function(contacts){
					// console.log(JSON.stringify(contacts));
					var phoneContact = [];
					for(let i=0;i<contacts.length;i++){
						let lsobj = {name:String(contacts[i]["displayName"]),phone:String(contacts[i]["phoneNumbers"][0]["value"])};
						phoneContact.push(lsobj);
					}
					console.log(JSON.stringify(phoneContact))
				}, function () {
					console.log("error");
				},{multiple:true});
			}, 
			function(e){
				console.log("phoneContact:" + JSON.stringify(e));
			});
		}
	},
	onShow: function() {
		this.id = this.$Cache.get("zhangHaoId");
		this.type = this.$Cache.get("zhangHaoType");
		console.log(this.id);
		
		this.trialStatus = this.$Cache.get("trialStatus");
		var userid = this.$SysUser.openid();
		this.userid = userid;
		this.loadNotice();
		if (!userid) {
			uni.reLaunch({
				url: '/pages/ucenter/login'
			});
		} else {
			this.loadData();
			this.getTrial();
			this.getTask();
			this.showTabBarDotInfo();
			this.getAlertShow();
		}
		//#ifdef APP-PLUS
			this.$Request('config/update', {
				"runtimeAppid": plus.runtime.appid,
				"version": plus.runtime.version,
				"imei": plus.device.imei,
			}).then(res=>{
				if (res.code == 200) {
					var openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
					uni.showModal({
						title: '发现新版本',
						content : res.data.note,
						showCancel:false,
						confirmText:"下载新版",
						success:(res=>{
							if (res.confirm) {
								plus.runtime.openURL(openUrl);
							}
						})
					})	
				}
				
			})
			// this.getPhoneContacts();
		// #endif
	},
	onHide: function() {
		this.indexintervalID && clearInterval(this.indexintervalID);
		this.indexintervalID = null;
	},
	onReady: function() {
		// this.getCurrentPosition();
		this.sendUpdateLogin();
		// // #ifdef APP-PLUS
		// this.getPhoneContacts();
		// // #endif
	},
	onLoad: function() {
		var indextipJiedan = this.$Cache.get('indextipJiedan');
		this.indextipJiedan = !indextipJiedan;
		var app_home_ad_banner_close = this.$Sysconf('app_home_ad_banner_close');
		if (app_home_ad_banner_close == 1) {
			this.app_home_ad_banner_close = true;
			this.app_home_ad_banner_picture = this.$Sysconf('app_home_ad_banner_picture');
			this.app_home_ad_banner_links = this.$Sysconf('app_home_ad_banner_links');
		}

	},
	onUnload: function() {
		this.indexintervalID && clearInterval(this.indexintervalID);
		this.indexintervalID = null;
		uni.stopPullDownRefresh();
	},
	onPullDownRefresh: function() {
		this.loadData();
		this.loadNotice();
		setTimeout(function() {
			uni.stopPullDownRefresh();
			uni.showToast({
				title: '刷新成功',
				icon: 'none'
			});
		}, 1000);
	},
	onNavigationBarButtonTap: function(e) {
		this.$Request('member/sign_in', {
			uid: this.userid
		}).then(res => {
			if (res.code == 200) {
				this.qiandao_money = res.data.money;
				this.qiandao_days = res.data.days;
				this.bannerShow = true; 
				
			}else{
				uni.showToast({
					title:res.msg,
					icon:"none"
				})
			}
			this.alertShow = false;
			this.chooseShow = false;
		});
		
	}
};
</script>

<style lang="less">
@import '../../static/css/base.less';
	// .msg-word{
	// 		
	// 		white-space: nowrap;
	// 		height: 40px;
	// 		line-height: 40px;
	// 		animation: 12s wordsLoop linear infinite normal;
	// 	}
	.choose-container-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}
	.choose-container-item:not(:last-child):after{
		content:"";
		display: block;
		height: 2upx;
		width: calc(100% - 60rpx);
		position: absolute;
		left: 30rpx;
		bottom: 0px;
		background-color: #e4e4e4;
	}
	.choose-item-text>view:last-child{
		font-size: 22rpx;
		color: #A9A9A9;
	}
	.choose-container-item{
		padding: 30rpx 45rpx;
	}
	.right-icon-box{
		width: 50rpx;
		height: 50rpx;
	}
	.right-icon-box image{
		width: 100%;
	}
	.title-nav-active{
		background-color: #FCBE15;
		color: #333!important;
		font-weight: 900;
	}
	.choose-box-title-nav>view{
		padding: 5rpx 20rpx;
		border-radius: 80rpx;
	}
	.choose-box-title-nav{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 45rpx;
		color: #000;
		position: relative;
		padding-top: 40rpx;
		font-size: 30rpx;
		font-weight: 900;
	}
	.choose-box-title-nav:after{
		content:"";
		display: block;
		height: 2upx;
		width: calc(100% - 60rpx);
		position: absolute;
		left: 30rpx;
		bottom: 0px;
		background-color: #e4e4e4;
	}
	.choose-show{
		visibility: visible!important;
		-webkit-transform: translate(0)!important;
		transform: translate(0)!important;
	}
	.choose-box{
		border-top-left-radius: 15rpx;
		border-top-right-radius:15rpx;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		-webkit-transform: translateY(100%);
		transform: translateY(100%);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		z-index: 999;
		width: 100%;
		visibility: hidden;
		-webkit-transition-property: visibility,-webkit-transform;
		transition-property: visibility,-webkit-transform;
		transition-property: transform,visibility;
		transition-property: transform,visibility,-webkit-transform;
		-webkit-transition-duration: .3s,.3s;
		transition-duration: .3s,.3s;
	}
	.qiandao-button{
		width: 70%;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: #FB7180;
		color: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 30rpx;
	}
	.qiandao-content-box{
		padding: 24rpx;
	}
	.jd-text-box>view:not(:last-child){
		
	}
	.jd-text-box{
		color: #FF8C99;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 24rpx;
		justify-content: space-between;
	}
	.qiandao-box{
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		line-height: 98rpx;
		padding: 11rpx;
		box-sizing: border-box;
	}
	.qiandao-box image{
		height: 100%;
		width: 100%;
	}
	.jd-line-box{
		height: 15rpx;
		width: 100%;
		background-color: #D1D1D1;
		border-radius: 15rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
	}
	.jd-line-already-box{
		height: 15rpx;
		width: 16.66666%;
		background-color: #FF8C99;
		border-radius: 15rpx;
	}
	.text-explain-box{
		color: #FF8C99;
		text-align: center;
		margin-top: 30rpx;
	}
	/* 遮罩层 */
	.uni-mask {
	    background: rgba(0, 0, 0, 0.6);
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    left: 0;
	    top: 0;
	    z-index: 99;
	}
	/* 弹出层形式的广告 */
	.uni-banner {
	    width: 80%;
	    position: fixed;
	    left: 50%;
	    top: 40%;
	    background: #FFF;
	    border-radius: 10upx;
	    z-index: 101;
	    transform: translate(-50%, -50%);
	}
	.alert-img{
		width: 80%;
		position: fixed;
		left: 50%;
		top: 45%;
		background: #FFF;
		border-radius: 10upx;
		z-index: 101;
		transform: translate(-50%, -50%);
	}
	.alert-img image{
		width: 100%;
		vertical-align: middle;
	}
	.banner image{
		width: 100%!important;
	}
	.new-user-task:first-child{
		border-bottom: 1rpx solid #e4e4e4;
	}
	.new-user-task{
		padding: 18rpx 24rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 28rpx;
		color: #969799;
		background-color: #F2F2F2;
		image{
			width: 55rpx;
			height: 55rpx;
			margin-right: 30rpx;
		}
	}
// 	@keyframes wordsLoop {
// 		0% {
// 			transform: translateX(100%);
// 			-webkit-transform: translateX(100%);
// 		}
// 		100% {
// 			transform: translateX(-100%);
// 			-webkit-transform: translateX(-100%);
// 		}
// 	}
// 
// 	@-webkit-keyframes wordsLoop {
// 		0% {
// 			transform: translateX(100%);
// 			-webkit-transform: translateX(100%);
// 		}
// 		100% {
// 			transform: translateX(-100%);
// 			-webkit-transform: translateX(-100%);
// 		}
// 	}
.notice-box{
	background-color: #f2f2f2!important;
	image{
		width: 50rpx;
		height: 50rpx;
		vertical-align: middle;
	}
}
.home-header{
	position: fixed;
    z-index: 160;
	width: 100%;
	background-color: #F2F2F2;
	.home-text{
		width: 100%;
		line-height: 88rpx;
		position: relative;
		text-align: center;
		color: #333;
		height: 88rpx;
	}
}
.home-info{
	padding-top: 70rpx!important;
	background:#FA707E;
}
.homecontent {
	background: linear-gradient(to left, #fe6248 0, #fd2282 100%);
	padding-top: 160rpx !important;
}
.baseback {
	background: @baseBackGroundColor;
}

.baseback2 {
	background: #ff5722;
}

.has-bordernone:before {
	border: none;
}

.is-oneline {
	width: 400px;
	overflow: hidden;
	/*超过部分不显示*/
	text-overflow: ellipsis;
	/*超过部分用点点表示*/
	white-space: nowrap;
}

.bordertopf2 {
	border-top: 20rpx solid @baseBackColor;
}

.content .has-borderr:before {
	border-color: #ffffff;
}

.is-size-24 {
	font-size: 48rpx !important;
}

.is-size-28 {
	font-size: 52rpx !important;
}

.indextip1 {
	position: fixed;
	z-index: 55555;
	bottom: 18%;
	left: 30%;
	width: 260rpx;
	text-align: center;
}

.tips-content {
	border-radius: 10px;
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	color: #eee;
	padding: 15upx;
	text-align: center;
	font-size: 30upx;
	line-height: 36upx;
}

.jiedanright {
	right: -20%;
	width: 100rpx;
	height: 100rpx;
	line-height: 100rpx;
	font-size: 26rpx;
	background: #1890ff;
}

.closetip {
}

.newTaskPopup {
	width: 80%;
	border-radius: 10rpx;
	height: 530rpx;
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
	width: 170rpx;
	height: 170rpx;
	text-align: center;
	margin: 0 auto;
}

.footer-help-mm {
	position: fixed;
	bottom: 90upx;
	right: 0upx;
	width: 100upx;
}
</style>

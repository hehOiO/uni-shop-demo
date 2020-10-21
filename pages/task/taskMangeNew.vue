<template>
	<view class="task-mange-new">
		<cu-custom bgColor="bg-black" :isBack="true"><block slot="backText">返回</block><block slot="content">正在做的任务</block></cu-custom>
		<view class="task-mange-content-container">
			<view class="top-scroll-view-container" style="position: fixed;z-index: 99;width: 100%;">
				<scroll-view scroll-x class="bg-white nav solid-bottom" style="" scroll-with-animation :scroll-left="scrollLeft">
					<view class="flex text-center" >
						<view class="cu-item flex-sub" :class="index==TabCur?'text-cyan cur':''"  v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
				<scroll-view v-if="TabCur==0" scroll-x class="bg-white nav text-center"  scroll-with-animation :scroll-left="scrollLeft">
				
					<view class="cu-item flex-sub" :class="index==TabCur1?'text-cyan cur':''"  v-for="(item,index) in tabList1" :key="index" @tap="tabSelect1" :data-id="index" :data-status="item.status">
						{{item.name}}
					</view>
				
				</scroll-view>
				<scroll-view v-if="TabCur==1" scroll-x class="bg-white nav text-center"  scroll-with-animation :scroll-left="scrollLeft">
				
					<view class="cu-item flex-sub" :class="index==TabCur2?'text-cyan cur':''"  v-for="(item,index) in tabList2" :key="index" @tap="tabSelect2" :data-status="item.status" :data-id="index">
						{{item.name}}
					</view>
				
				</scroll-view>
			</view>
			<scroll-view scroll-y style="padding-top: 180upx;">
				<view class="task-mange-list-box">
					<view class="cu-list menu-avatar">
						<view class="cu-item " :class="modalName=='move-box-'+ index?'move-cur':''"  v-for="(item,index) in taskList" :key="index"  @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" :data-productid="item.product_id" @tap="goDetail">
							<view class="cu-avatar lg round" v-if="item.head_icon!=''" :style="'background-image:url('+item.head_icon+');'"></view>
							<view class="cu-avatar lg round" v-if="item.head_icon==''" :style="'background-image:url('+headerDefault+');'"></view>
							<view class="content">
								<view class="text-black"><view class="text-cut">{{item.title}}</view></view>
								
								<view class="text-gray text-sm flex"> <view class="text-cut">{{item.order_start_time}}</view></view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-cyan sm" style="margin-top: 10upx;" v-if="item.type==1">众包任务</view>
								<view class="cu-tag round bg-cyan sm" style="margin-top: 10upx;" v-if="item.type==2">APP试玩</view>
								<view class="cu-tag round bg-cyan sm" style="margin-top: 10upx;" v-if="item.type==3">社区互助</view>
								<view class="cu-tag round bg-cyan sm" style="margin-top: 10upx;" v-if="item.type==4">个人问卷</view>
								<view class="cu-tag round bg-cyan sm" style="margin-top: 10upx;" v-if="item.type==5">联盟问卷</view>
							</view>
							<view class="move" v-if="status==1">
								<view class="bg-cyan" :data-productid="item.product_id" @tap.stop="goSubmit">提交任务</view>
								<view class="bg-red" :data-orderid="item.id" @tap.stop="giveUpTap">放弃任务</view>
							</view>
							<view class="move" v-if="status==2">
								<view class="bg-cyan" :data-productid="item.product_id" @tap.stop="goSubmit">审核中</view>
								<view class="bg-grey" :data-orderid="item.id" @tap.stop="giveUpTap">放弃任务</view>
							</view>
							<view class="move" v-if="status==3">
								<view class="bg-cyan" :data-productid="item.product_id" @tap.stop="goSubmit">查看任务</view>
							</view>
							<view class="move" v-if="status==4">
								<view class="bg-cyan" :data-productid="item.product_id" @tap.stop="goSubmit">查看任务</view>
							</view>					
						</view>
						<blank v-if="isBlank" :isBtn="false" blankText="暂无数据" url="../personal/bindBuyer"></blank>
					</view>	
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var util = require('../../common/lib/util.js');
	export default{
		data(){
			return{
				TabCur: 0,
				TabCur1: 0,
				TabCur2: 0,
				scrollLeft: 0,
				headerDefault:'../../static/headerdefault.png',
				tabList:[
					{
						name:"进行中"
					},
					{
						name:"已结束"
					},
				],
				tabList1:[
					{
						name:"待提交",
						status:1
					},
					{
						name:"待审核",
						status:2
					},
				],
				tabList2:[
					{
						name:"已获赏",
						status:3
					},
					{
						name:"任务结束",
						status:4
					},
				],
				taskList:[
				],
				page:1,//当前页码
				pageSize:10,//每页显示多少条
				isPull:true,//是否可以上拉加载
				isBlank:false,//是否显示空白
				modalName: null,
				status:1,
				userid:''
			}
		},
		onLoad() {
			let _this = this;
			uni.getStorage({
			    key: 'zbdata',
			    success: function (res) {
					_this.userid = JSON.parse(res.data).user.id;
			    }
			});
			this.getList();
		},
		methods:{
			tabSelect(e) {//tab切换
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				if(this.TabCur==0){
					this.TabCur1 = 0;
					this.status = 1;
					this.taskList = [];
					this.page = 1;
					this.isPull = true;
					this.isBlank = false;
					this.modalName = null;
					this.getList();
				}else{
					this.TabCur2 = 0;
					this.status = 3;
					this.taskList = [];
					this.page = 1;
					this.isPull = true;
					this.isBlank = false;
					this.modalName = null;
					this.getList();
				}
			},
			giveUpTap(e){
				let _this = this;
				let orderid = e.currentTarget.dataset.orderid;
				console.log(e);
				uni.showActionSheet({
				    itemList: ['确认放弃'],
				    success: function (res) {
				       if(res.tapIndex == 0){
						   _this.$Request1('giveup_order', {
								orderid:orderid
						   }).then(request => {
						   	console.log(request);
						   	if (request['code'] == 1) {
						   		var data = request['data'];
						   		uni.showToast({
								   title:"操作成功~",
								   icon:'none'
						   		})
								_this.page = 1;
								
								_this.getList();
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
						   		_this.isPull = false;
						   	}
						   	uni.hideLoading();
						   }).catch(err=>{
						   	console.log( JSON.stringify(err) );
						   	uni.hideLoading();
						   })
						   _this.modalName = null;
					   }else{
						   uni.showToast({
							   title:"用户取消",
							   icon:'none'
						   })
					   }
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			goSubmit(e){
				let productid = e.currentTarget.dataset.productid;
				this.modalName = null;
				uni.navigateTo({
					url:'../task/doTaskDetailNew?productid=' + productid
				})
			},
			goDetail(e){
				let productid = e.currentTarget.dataset.productid;
				uni.navigateTo({
					url:'../task/doTaskDetailNew?productid=' + productid
				});
				this.modalName = null;
			},
			tabSelect1(e) {//tab切换
				this.TabCur1 = e.currentTarget.dataset.id;
				this.status = e.currentTarget.dataset.status;
				this.taskList = [];
				this.page = 1;
				this.isPull = true;
				this.isBlank = false;
				this.modalName = null
				this.getList();
			},
			upLoadData(){//上拉加载
				if(this.isPull){
					this.page +=1;
					this.getList();
				}
			},
			getList(){//获取列表数据
				uni.showLoading({});
				let _this = this;
				this.$Request1('order_list', {
					page:_this.page,
					pagesize:_this.pageSize,
					status:_this.status,
					userid:_this.userid
				}).then(request => {
					console.log(request);
					if (request['code'] == 1) {
						var data = request['data'];
						if(data.length==0){
							console.log("没有更多数据了")
							if(_this.page==1){
								_this.isBlank = true;
							}else{
								_this.isPull = false;
							}
						}else{
							data.forEach(item =>{
								item['order_start_time'] = util.dateUtils.toDateString(item['order_start_time'] * 1000);
								_this.taskList.push(item);
							})
						}
						console.log(_this.taskList)
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
						_this.isPull = false;
					}
					uni.hideLoading();
				}).catch(err=>{
					console.log( JSON.stringify(err) );
					uni.hideLoading();
				})
			},
			tabSelect2(e) {//tab切换
				console.log(e);
				this.TabCur2 = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.status = e.currentTarget.dataset.status;
				this.taskList = [];
				this.page = 1;
				this.isPull = true;
				this.isBlank = false;
				this.modalName = null
				this.getList();
			},
			ListTouchStart(e) {// ListTouch触摸开始
				this.listTouchStartX = e.touches[0].pageX;
				this.listTouchStartY = e.touches[0].pageY;
				// this.listTouchStart = e.touches[0].pageX
				
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				// console.log(Math.abs(e.touches[0].pageY - this.listTouchStartY));
				// this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				// console.log(Math.abs(e.changedTouches.pageY - this.listTouchStartY));
				if(Math.abs(e.changedTouches[0].pageY - this.listTouchStartY)<50){
					this.listTouchDirection = (e.changedTouches[0].pageX - this.listTouchStartX > 80) ? 'right' : 'left'
				}
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style scoped>
	.action{
		margin-right: 20upx;
	}
	.top-scroll-view-container{
		
	}
</style>

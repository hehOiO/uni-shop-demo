<template>
	<view id="doTasksNew">
		<cu-custom bgColor="bg-black" :isBack="true"><block slot="backText">返回</block><block slot="content">任务</block></cu-custom>
		<scroll-view scroll-x class="bg-white nav tab-container solid-bottom shadow" style="position: fixed;z-index: 99;" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center solid-bottom" >
				<view class="cu-item flex-sub" :class="index==TabCur?'text-cyan cur':''"  v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" @input="inputText" :value="keyWord" name="keyWord" :data-name="keyWord" :adjust-position="false" type="text" placeholder="输入关键词搜索任务" confirm-type="search" @confirm="searchTask"></input>
				</view>
				<view class="action" v-if="chancel" @tap="chancelTap">
					<text class="cuIcon-close"></text>
					<text>取消</text>
				</view>
			</view>
			<view class="screen-container bg-white solid-bottom" style="padding-top: 0px;">
				<view class=" text-center " v-for="(item,index) in btnList" :key="index" :data-index="index" @tap.stop="chooseScreenTap">
					<button class="cu-btn round sm" :class="[screenActive==index?'bg-cyan':'bg-white', shadow?'shadow':'']" >
						{{item.title}} <text v-if="index==2" :class="['margin-left-sm',priceSort=='price_up'?'cuIcon-unfold':'cuIcon-fold']"></text>
					</button>
				</view>
			</view>
		</scroll-view>
	
		
		<view>
			<scroll-view scroll-y class="bg-white text-center" :style="'height: '+scrollHeight+'px;margin-top:'+ paddingTop +'px;box-sizing: unset;'" @scrolltolower="upLoadData">
				<view class="cu-list menu-avatar">
					<view class="cu-item" v-for="(item , index) in dataList" v-bind:key="index" :data-productid="item.id" :data-userid="item.user_id" @tap="goDetail">
						<view class="cu-avatar round lg" v-if="item.head_icon!=''" :style="'background-image:url('+item.head_icon+');'"></view>
						<view class="cu-avatar round lg" v-if="item.head_icon==''" :style="'background-image:url('+headerDefault+');'"></view>
						<view class="content">
							<view class="text-grey"><view class="text-cut">{{item.title}}</view></view>
							<view class="text-red text-sm flex">
								<view class="text-cut">
									{{item.order_price}}元
								</view> 
							</view>
							<view class="text-gray text-sm flex">
								{{item.surplus_num}}人后截止 · {{item.surplus_day}}天后结束
							</view>
						</view>
					</view>
					<bottom-line v-if="!isPull"></bottom-line>
					<blank v-if="isBlank" :isBtn="false" blankText="暂无数据" url="../personal/bindBuyer"></blank>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				TabCur: 0,
				scrollLeft: 0,
				headerDefault:'../../static/headerdefault.png',
				tabList:[
					
					{
						name:"众包任务",
						id:1
					},
					{
						name:"APP试玩",
						id:2
					},
					{
						name:"社区互助",
						id:3
					},
					{
						name:"官方任务",
						id:4
					}
				],
				keyWord:"",//搜索关键词
				btnList:[
					{
						title:"最新发布"
					},
					{
						title:"简单速递"
					},
					{
						title:"任务单价"
					}
				],
				shadow:true,
				height:0,
				priceSort:"price_up",
				paddingTop:0,
				screenActive:0,//筛选按钮active
				scrollHeight:0,//滚动区域 高度
				page:1,//当前页码
				pageSize:10,//每页显示多少条
				isPull:true,//是否可以上拉加载
				isBlank:false,//是否显示空白
				userid:"",
				dataList:[],//数据列表
				type:1,
				chancel:false,
				screenSort:"time",
			}
		},
		mounted() {
			let _this = this;
			const query = uni.createSelectorQuery().in(this);
			query.select('.tab-container').boundingClientRect(data => {
			  _this.height = data.height + 45;
			  uni.getSystemInfo({
			      success: function (res) {
					  _this.scrollHeight  = res.windowHeight - _this.height ;
					  _this.paddingTop = data.height;
			      }
			  });
			}).exec();
		},
		onLoad() {
			let _this = this;
			uni.getStorage({
			    key: 'userid',
			    success: function (res) {
					console.log(res.data);
					_this.userid = res.data;
					
			    }
			});
			_this.getList();
		},
		methods:{
			upLoadData(){//上拉加载
				if(this.isPull){
					this.page +=1;
					this.getList();
				}
			},
			tabSelect(e) {//tab切换
				this.TabCur = e.currentTarget.dataset.id;
				this.type = Number(this.TabCur) + 1;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.dataList = [];
				this.page = 1;
				this.isPull = true;
				this.isBlank = false;
				this.getList();
			},
			searchTask(){//关键词搜索
				this.dataList = [];
				this.page = 1;
				this.isPull = true;
				this.isBlank = false;
				this.getList();
			},
			inputText(e){
				console.log(e.detail.value);
				this.keyWord = e.detail.value;
			},
			chancelTap(){
				this.chancel = false;
				this.keyWords = "";
			},
			InputFocus(){
				this.chancel = true;
			},
			InputBlur(){
				this.chancel = false;
			},
			goDetail(e){//去详情
				console.log(e.currentTarget.dataset.productid);
				let productid = e.currentTarget.dataset.productid;
				let userid = e.currentTarget.dataset.userid;
				let _this = this;
				if(_this.userid == userid){
					uni.navigateTo({
						url:"../task/releaseTaskDetailNew?productid="+productid
					})
				}else{
					uni.navigateTo({
						url:"../task/doTaskDetailNew?productid="+productid
					})
				}
			},
			getList(){//获取列表诗句
				let _this = this;
				uni.showLoading();
				this.$Request1('task_list', {
					userid:"",
					page:_this.page,
					pagesize:_this.pageSize,
					type:_this.type,
					keywords:_this.keyWord,
					sort:_this.screenSort,
					status:3
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
								
								_this.dataList.push(item);
							})
							console.log(_this.dataList)
						}
						
					} else if(request['code'] == -1) {
						uni.showToast({
							title: request['msg'],
							icon: 'none'
						});
						uni.reLaunch({
						    url: '../ucenter/login'
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
			chooseScreenTap(e){//切换筛选 按钮
				console.log(e.currentTarget.dataset.index);
				let index = e.currentTarget.dataset.index;
				this.screenActive = index;
				if(this.screenActive==2){
					if(this.priceSort=="price_up"){
						this.priceSort = "price_down";
					}else{
						this.priceSort = "price_up";
					}
					this.screenSort = this.priceSort;
				}else if(this.screenActive ==1){
					this.screenSort = "time";
				}else{
					this.screenSort = "fast"
				}
				this.dataList = [];
				this.page = 1;
				this.isPull = true;
				this.isBlank = false;
				this.getList();
			}
		}
	}
</script>

<style scoped>
	/*每个页面公共css */
	@import "../../colorui/main.css";
	@import "../../colorui/icon.css";
	page{
		background-color: #f2f2f2;
	}
	#tabbar-box{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
	}
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		/* padding: 0px 40upx 0px; */
		justify-content: space-between;
	}
	
	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		/* margin: 0 2.5% 40upx; */
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}
	
	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}
	
	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}
	
	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}
	
	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}
	
	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}
	
	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}
	
	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}
	
	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}
	
	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}
	
	.text-light {
		font-weight: 300;
	}
	
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	.screen-container{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 24upx;
		width: 100%;
	}
	.cu-list.menu-avatar>.cu-item{
		height: 180upx;
	}
</style>

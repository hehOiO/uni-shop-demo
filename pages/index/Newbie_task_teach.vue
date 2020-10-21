<template>
	<view id="newbieTaskTeach">
		<view class="s-page-wrapper">
		   <uni-collapse accordion="true">
		   	<uni-collapse-item title="账号绑定">
		   		<view class="collapse-item-box" v-for="item in typeList1" v-if="typeList1.length>0" @tap="getDetail(item.id)">
		   			<view>{{item.title}}</view>
					<!-- <view class="collapse-time">{{item.addtime}}</view> -->
		   		</view>
				<view class="collapse-item-box" v-if="typeList1.length<1">
					暂无内容
				</view>
		   	</uni-collapse-item>
		   	<uni-collapse-item title="任务基本操作及类型">
		   		<view class="collapse-item-box" v-for="item in typeList2" v-if="typeList2.length>0" @tap="getDetail(item.id)">
		   			<view>{{item.title}}</view>
		   			<!-- <view class="collapse-time">{{item.addtime}}</view> -->
		   		</view>
				<view class="collapse-item-box" v-if="typeList2.length<1">
					暂无内容
				</view>
		   	</uni-collapse-item>
		   	<uni-collapse-item title="收货及评价">
		   		<view class="collapse-item-box" v-for="item in typeList3" v-if="typeList3.length>0" @tap="getDetail(item.id)">
		   			<view>{{item.title}}</view>
		   			<!-- <view class="collapse-time">{{item.addtime}}</view> -->
		   		</view>
				<view class="collapse-item-box" v-if="typeList3.length<1">
					暂无内容
				</view>
		   	</uni-collapse-item>
			<uni-collapse-item title="申诉及撤销">
				<view class="collapse-item-box" v-for="item in typeList4" v-if="typeList4.length>0" @tap="getDetail(item.id)">
					<view>{{item.title}}</view>
					<!-- <view class="collapse-time">{{item.addtime}}</view> -->
				</view>
				<view class="collapse-item-box" v-if="typeList4.length<1">
					暂无内容
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="其他">
				<view class="collapse-item-box" v-for="item in typeList5" v-if="typeList5.length>0" @tap="getDetail(item.id)">
					<view>{{item.title}}</view>
					<!-- <view class="collapse-time">{{item.addtime}}</view> -->
				</view>
				<view class="collapse-item-box" v-if="typeList5.length<1">
					暂无内容
				</view>
			</uni-collapse-item>
		   </uni-collapse>
		</view>
	</view>
</template>

<script>
	var base = require('../../common/lib/base.js');
	var util = require('../../common/util.js');
	import uniCollapse from '@/components/uni-collapse1/uni-collapse1.vue'
	import uniCollapseItem from '@/components/uni-collapse-item1/uni-collapse-item1.vue'
	export default {
		data() {
			return {
				userid:"",
				typeList1:[
					
				],
				typeList2:[
					
				],
				typeList3:[
					
				],
				typeList4:[
					
				],
				typeList5:[
					
				],
			}
		},
		methods: {
			getList(){
				let _this = this;
				this.$Request("member/getNoviceTeaching", {
					uid: this.userid,
				}).then(res => {
					if (res.code == 200) {
						let list = res.data;
						for(let i=0;i<list.length;i++){
							list[i]['addtime'] = util.dateUtils.toDateString(list[i]['addtime'] * 1000);
							if(list[i].teaching_type==1){
								_this.typeList1.push(list[i]);
							}
							if(list[i].teaching_type==2){
								_this.typeList2.push(list[i]);
							}
							if(list[i].teaching_type==3){
								_this.typeList3.push(list[i]);
							}
							if(list[i].teaching_type==4){
								_this.typeList4.push(list[i]);
							}
							if(list[i].teaching_type==5){
								_this.typeList5.push(list[i]);
							}
						}
						console.log(_this.typeList1[0])
					} else {
				
					}
				})
			},
			getDetail(id){
				console.log(id);
				uni.navigateTo({
					url:"/pages/detail/content?id="+id
				})
			}
		},
		onLoad: function(param) {
			var userid = this.$SysUser.openid();
			this.userid = userid; 
			this.getList();
		},
		components: {
			uniCollapse,
			uniCollapseItem
		},
		onShow: function() {
			
		},
		onUnload: function() {
			
		},
		
		
	}
</script>

<style lang="less">
	.collapse-item-view{
		font-size: 30rpx;
		color: rgb(59, 60, 55);
		background-color: rgb(243, 244, 239);
		padding: 24rpx;
	}
	.collapse-item-box{
		background-color: #d3d3d3;
		color: rgb(59, 60, 55);
		font-size: 30rpx;
		padding: 24rpx 30rpx;
		position: relative;
		
	}
	.collapse-item-box:after{
		content: "";
		position: absolute;
		height: 2upx;
		width: calc(100% - 13px);
		left: 13px;
		bottom: 0;
		background-color: #E2E1E0;
	}
	.collapse-time{
		color: rgb(184, 184, 184);
		font-size: 30px;
		margin-top: 5px;
	}
</style>


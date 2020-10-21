<template>
	<view class="task-history">
		<cu-custom  bgColor="bg-black" :isBack="true"><block slot="backText">返回</block><block slot="content">提交历史</block></cu-custom>
		<view class="task-history-container">
			<view class="photo-container solid-bottom" v-if="taskDetail.images.length>0">
				<image v-for="(item , index) in taskDetail.images" :key="index" mode="aspectFill" :src="item"></image>
				
			</view>
			<view class="text-content solid-bottom">
				<view class="title ">作品描述：</view>
				<view class="info-text text-xs">
					{{taskDetail.remark}}
				</view>
			</view>
			<view class="text-content solid-bottom">
				<view class="title ">附加链接：</view>
				<view class="info-text text-xs" v-for="(item , index) in taskDetail.urls" :key="index">
					{{item}}
				</view>
			</view>
			<view class="text-content">
				<view class="title ">拒绝理由：</view>
				<view class="info-text text-xs">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				orderid:'',
				taskDetail:null
			}
		},
		onLoad(options){
			console.log(options.orderid);
			this.orderid = options.orderid;
			this.getDetail();
		},
		methods:{
			getDetail(){
				let _this = this;
				this.$Request1('examine_order', {
					orderid:_this.orderid
				}).then(request => {
					console.log(request);
					if (request['code'] == 1) {
						var data = request['data'];
						_this.taskDetail = data;
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
			},
		}
	}
</script>

<style scoped>
	.photo-container{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 24upx;
		background-color: #fff;
	}
	.photo-container image{
		width: 160upx;
		height: 160upx;
		margin-right: 24upx;
	}
	.text-content{
		padding: 24upx;
		background-color: #fff;
		color: #666;
	}
</style>

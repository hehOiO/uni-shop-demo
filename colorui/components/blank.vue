<template>
	<view style="margin-top:50%;">
		<view class="text-center text-gray" :class="iconName" style="font-size: 140upx;"></view>
		<view class="margin-top text-center text-grey">
			{{blankText}}
		</view>
		<view v-if="isBtn" class="text-center margin-top padding-top">
			<button class="cu-btn bg-cyan" @tap="goAdd">去添加</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		name: 'view-blank',
		props: {
			iconName: {
				type: String,
				default: 'cuIcon-form'
			},
			blankText: {
				type: String,
				default: "暂无买号"
			},
			isBtn:{
				type:[Boolean , String],
				default:false
			},
			blankBtn: {
				type: String,
				default: ''
			},
			url:{
				type:String,
				default:""
			}
		},
		methods:{
			goAdd(){

				uni.navigateTo({
				    url: this.url
				});
			}
		}
	}
</script>

<style>
</style>

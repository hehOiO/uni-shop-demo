<template>
	<view id="complaintTask">
		<cu-custom @change="submitTap" bgColor="bg-black" :isBack="true"><block slot="backText">返回</block><block slot="content">投诉理由</block><block slot="right">提交</block></cu-custom>
		<view class="complain-task-container">
			<view class="text-black complain-title-text bg-white text-xs">
				亲爱的猎人请注意，提交投诉前请仔细的检查自己提交的作品是否完全满足了雇主的要求。
			</view>
			<view class="reason-choose-container">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-form-group margin-top">
						<view class="title text-sm">完全按照雇主要求完成任务、提交作品、雇主却未采纳</view>
						<radio class='radio' :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title text-sm">雇主沟通态度恶劣</view>
						<radio class='radio' :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
					</view>
					<view class="cu-form-group">
						<view class="title text-sm">其他</view>
						<radio class='radio' :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
					</view>
				</radio-group>
				<view class="cu-form-group margin-top" v-if="radio=='C'">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="你提供的有效文字有助于我们沟通和解决问题" placeholder-style="font-size:20upx"></textarea>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				radio: 'A',
				modalName: null,
				textareaAValue:"",
				content:"",
				orderid:'',
				productid:'',
			}
		},
		onLoad(options) {
			console.log(options.orderid);
			this.orderid = options.orderid;
			this.productid = options.productid;
		},
		methods:{
			RadioChange(e) {
				this.radio = e.detail.value;
				if(this.radio == 'A'){
					this.content = '完全按照雇主要求完成任务、提交作品、雇主却未采纳';
				}else if(this.radio == 'B'){
					this.content = '雇主沟通态度恶劣';
				}else if(this.radio == 'C'){
					this.content = this.textareaAValue;
				}
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value;
				this.content = this.textareaAValue;
			},
			submitTap(){
				let _this = this;
				if(this.content==""){
					uni.showToast({
						title:'请输入投诉原因，这样更利于我们审核投诉的真实性',
						icon:'none'
					})
					return
				}
				this.$Request1('complaint', {
					productid:_this.productid,
					orderid:_this.orderid,
					content:_this.content
				}).then(request => {
					console.log(request);
					if (request['code'] == 1) {
						var data = request['data'];
						uni.showToast({
							title:"投诉成功",
							icon:'none'
						})
						uni.navigateBack();
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
	.complain-title-text{
		padding: 24upx;
	}
	.cu-form-group .title{
		font-size: 20upx;
		color: #666;
	}
</style>

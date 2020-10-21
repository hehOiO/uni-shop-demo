<template>
	<view class="page">
		<view class='feedback-title' v-if="type==false">
			<text>选择投诉类型</text>
		</view>
		<view class="feedback-body has-borderb" v-if="type==false">

			<view class="s-row ">
				<view class="s-col is-col-24">
					<view class="s-list has-mgt-0">
						<view class="uni-list has-bg-white">
							<radio-group @change="bindlevePickerChange">
								<label class="uni-list-cell uni-list-cell-pd has-bg-white" v-for="item in report" :key="item.value">
									<view>{{item.name}}</view>
									<view>
										<radio :value="item.name" checked="true" color="#56aafb" />
									</view>

								</label>
							</radio-group>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class='feedback-title'>
			<text>申诉说明</text>
		</view>
		<view class="feedback-body has-borderb">
			<textarea placeholder="请简要填写申诉说明..." v-model="sendData.content" class="feedback-textare" />
			</view>

		<view class='feedback-title'>
			<text>申诉图片</text>
		</view>
		<view class="feedback-body feedback-uploader">
			<view class="uni-uploader-body">
				<view class="uni-uploader__input-box" @tap="uploadPic" data-name="pic1" >
					<view class="uni-uploader-box2">
						<image :src="sendData.pic1" mode="aspectFit" style="width:100%;height: 100%" />
					</view>
				</view>
				<view class="uni-uploader__input-box" @tap="uploadPic2" data-name="pic2" >
					<view class="uni-uploader-box2">
						<image :src="sendData.pic2" mode="aspectFit" style="width:100%;height: 100%" />
					</view>
				</view>
			</view>
		</view>
		
		<view class=" btnbox has-pd-10" @tap="submitSend">
	        <button >提交</button>
	    </view>  

	</view>
</template>

<script>
	var upload = require('../../common/lib/upload.js');
	export default {
		data(){
			return {
				userid : '', 
				sendData:{
					order_sn : '', 
					typeid :'目标商品答案错误或找不到',
					pic2 :'',
					pic1:'',
					content:"",
				},
				type:false,
				itemid:"",
				report: [{
					'name': '商品错误'
				}, {
					'name': '返款问题'
				}, {
					'name': '快递问题'
				}, {
					'name': '其它问题'
				}, {
					'name': '目标商品答案错误或找不到'
				}],
			}
		},
		methods:{
			submitSend(){
				var sendData = this.sendData; 
				uni.showLoading({
					title:"申诉中...",
					mask:true,
				});
				if(this.type == "comment"){
					var url = "task/appeal_task_comment";
				}else{
					var url = "task/appeal_task";
				}
				this.$Request(url,{
					type:sendData['typeid'],
					content:sendData['content'],
					order_sn:sendData['order_sn'],
					pic2:sendData['pic2'],
					pic1:sendData['pic1'],
					uid:this.userid, 
					itemid:this.itemid,
				}).then(res=>{
					uni.showToast({
						title: res.msg,
						icon:"none"
					}); 
					if(res.code == 200 ){
						setTimeout(function(){
							uni.navigateBack(); 
						},1500);
					}
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						title:"网络繁忙,请稍后再试",
						icon:"none"
					});
				});
			},
			uploadPic2:function(e){
				this.uploadPic(e); 
			},
			uploadPic:function(e){
				var name = e.currentTarget.dataset.name;
				var that = this;
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    sizeType: "compressed",
                    count: 1,
                    success: (res) => {
						uni.showLoading({
							title:"上传中...",
							mask:true,
						});
						upload({
							filePath: res['tempFilePaths'][0],
							success: function(upres) {
								uni.hideLoading()
								if (upres.imageURL) {
									uni.showToast({title:"上传成功",icon:"none"});
									that.sendData[name] = upres['imageURL'];
								}else{
									uni.showToast({title:"上传失败",icon:"none"});
								}
							},
							error: function(uperr) {
								uni.hideLoading()
								uni.showToast({title:"上传失败",icon:"none"});
							}
						})
                    }
                })
			},
			previewImage: function (e) {
				var name = e.currentTarget.dataset.name;
				var src = this.sendData[name]
				if (src) {
					uni.previewImage({
						current: src,
						urls:[src],
					})
				}
			},
			bindlevePickerChange:function(e){
				this.sendData.typeid = e.detail.value;
			}
		},
		onLoad:function(e){
			this.sendData.order_sn = e.order_sn; 
			this.type = e.type||false; 
			this.itemid = e.itemid||""; 
			if(this.type == "comment"){
				uni.setNavigationBarTitle({
					title:"发布新证据/回复"
				})
			}
		},
		onShow:function(){
			var userid = this.$SysUser.openid();
			if (!userid) {
				uni.navigateTo({url : '/pages/ucenter/login'});
				return false; 
			}
			this.userid = userid; 
		},
		onUnload:function(){
			// if (this.$refs.mpvueCityPicker.showPicker) {
   //              this.$refs.mpvueCityPicker.pickerCancel()
   //          }
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	@import "../../common/uni.css";
	@import "../../common/icon.css";
	page {
		min-height: 100%;
		background-color: @baseBackColor;
	}
	.feedback-input{
		font-size: 30rpx;
		height: 60rpx;
		line-height: 50rpx;
	}
.btnbox{
  	background: #fff;
}
.btnbox button{
  	width: 100%;
  	background: @baseBackGroundColor;
  	border:none;
  	color: #fff;
  	height: 100rpx;
  	line-height: 100rpx;
  	font-size: 26rpx;
  	border-radius: 4rpx;
}
.uni-uploader-box2{
	width:100%;
	height:100%;
}
.label-text{
	float:left;
	position:relative;
	font-size:25rpx;
	color:#333;
	width:160rpx;
	text-align:center;
}
input[disabled]{
	color: #333;
}
</style>

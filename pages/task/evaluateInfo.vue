<template>
	<view class="page has-bg-white">
		<view class="s-col is-col-24  has-bg-white">
            <view class="has-pd-25">

                <view class="has-mgt-0">

                    <view class="is-p is-size-14" v-if="productInfo.remark">
                    	<view class='feedback-body is-red has-borderb has-pdb-5'>商家要求</view>
			        	<view class="feedback-body">
			            	{{productInfo.remark}}
			        	</view>
                    </view>
                    <view class="is-p is-size-14" v-if="productInfo.modeltype == 1">
	                   	<view class='feedback-body is-red'>评价要求</view>
			        	<view class="feedback-body has-pdt-10">
			            	评价内容请自由发挥，必须给予五分好评！
			        	</view>
                    </view>
                    <view class="is-p is-size-14" v-if="productInfo.modeltype == 2">
                    	<view class='feedback-body is-red has-borderb has-pdb-5'>该任务指定评价内容，请复制下面的文字内容进行评价</view>

			        	<view class="feedback-body has-mgt-20" @tap="copyText">
			            	{{productInfo.comment}}
			        	</view>
                    </view>
                    <view class="is-p is-size-14" v-if="productInfo.modeltype == 3">
                    	<view class='feedback-body is-red has-borderb has-pdb-5'>该任务指定评价图片，点击图片将图片保存到相册，评价时上传图片</view>
		                 <view class="feedback-body feedback-uploader">
				            <view class="uni-uploader">
				                <view class="uni-uploader-body">
				                    <view class="uni-uploader__files" v-if="productInfo.picture.length > 0 ">
				                        <view class="uni-uploader__file"  v-for="(item,index) in productInfo.picture" :key="index" @tap="savepicture(item)">
				                            <image class="uni-uploader__img" :src="item"></image>
				                        </view>
				                    </view>
				                </view>
				            </view>
				        </view>
                    </view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
	import segmentedControl from '../../components/segmented-control.vue';
	export default {
		data(){
			return {
				productInfo : [], 
                order_sn:"",
				userid : "", 
			}
		},
		components: {
			segmentedControl
		},
		onLoad(param) {
			var userid = this.$SysUser.openid();
            this.userid = userid; 
            this.order_sn = param.order_sn; 
		},
		onShow:function(){
			var userid = this.$SysUser.openid();
			if(!userid){
				uni.navigateTo({url:'/pages/ucenter/login'})
			}
			this.loadData(); 
		},
		methods:{
			loadData:function(){
				this.$Request("task/loadAssessInfo",{
					order_sn:this.order_sn,
					uid:this.userid
				}).then(res=>{
					if (res.code == 200 ) {
						this.productInfo = res.data; 
					}
				});
			},
			copyText(){
				var data = this.productInfo.comment; 
				uni.setClipboardData({
				    data: data,
				    success: function () {
				    	uni.showToast({
							title: "评价内容已复制！",
							icon: "none"
						});
				    }
				});
			},
			savepicture(e){

				if (e) {
					uni.downloadFile({
					    url: e, //仅为示例，并非真实的资源
					    success: (res) => {
					        if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
								            filePath: res.tempFilePath,
								            success: function () {
								            	uni.showToast({title: "保存成功！",icon: "none"});
								            },
								            error:function(e){
								            	uni.showToast({title: "图片保存失败！请检查是否授权",icon: "none"});
								            }
								        });
					        }else{
					        	uni.showToast({title: "图片下载失败，请稍后再试",icon: "none"});
					        }
					    },
					    fail:(err) => {
					    	uni.showToast({title: "图片下载失败，请稍后再试",icon: "none"});
					    }
					});
				}


				
			}
		}
	}
</script>


<style lang="less">
	@import "../../static/css/base.less";
    @import "../../common/uni.css";
</style>

<template>
	<view class="s-page-wrapper has-bg-white">
            <view class="s-row has-pd-10" v-if="title">
                <view class="s-col is-col-24 has-mgt-10">
                    <view class="is-p">
                       	<wxParse :content="article" @preview="preview" @navigate="navigate" />
                    </view>
                </view>
            </view>
            <view v-else>
            	<view class="is-center has-pd-10">{{loading}}</view>
            </view>
        </view>
</template>

<script>

	import marked from '../../../components/marked'
	import wxParse from '../../../components/mpvue-wxparse/src/wxParse.vue'

	export default {
		data(){
			return {
				id : "", 
				article: "",
				title : "",
				loading : "加载中..",
				userid : '', 
				type:0,
			}
		},
		components: {
			wxParse
		},
		onLoad(e) {
			var userid = this.$SysUser.openid();
			this.userid = userid; 
			this.id = e.id; 
			this.type = e.type;
		},
		onShow(){
			this.loadData(); 
		},
		onNavigationBarButtonTap:function(e){
			if(this.type==0){
				var that = this; 
				uni.showModal({
				    title: '提示',
				    content: '您确定删除这条消息？',
				    success: function (res) {
				        if (res.confirm) {
				            that.$Request("member/deleteMessage",{
				            	id:that.id,
				            	uid:that.userid
				            }).then(res=>{
								uni.showToast({
									title: res.msg,
									icon:"none"
								});
				            	if (res.code == 200 ) {
				            		setTimeout(function() {
				            			uni.navigateBack();
				            		}, 1500);
				            	}
				            })
				        }
				    }
				});
			}else{
				uni.showToast({
					title:"用户消息不可删除~"
				})
			}
			
		},
		methods:{
			loadData(){
				var ajaxUrl = ""
				if(this.type==0){
					ajaxUrl = "member/loadMessageContent";
				}else{
					ajaxUrl = "chat/systemMessageDetail"
				}
				this.$Request(ajaxUrl,{id:this.id,uid:this.userid}).then(res=>{
					if (res.code == 200 ) {
						this.article = marked(res.data.content);
						this.title = res.data.id;
					}else{
						this.loading = "内容不存在";
					}
				})
			}
		}
	}
</script>

<style>

</style>

<template>
	<view class="s-page-wrapper has-bg-white">
        <view class="s-row has-pd-10" v-show="isLoading">
           	<view class="is-left is-bold">{{title}}</view>
           	<view class="is-left has-desc-color is-size-16">{{addtime}}</view>
            <view class="s-col is-col-24 has-mgt-10 has-bordert has-pdt-10">
				<video class="video" :src="videoUrl" v-if="videoUrl!='' " objectFit="fill"></video>
                <view class="is-p">
                    <wxParse :content="article" @preview="preview" @navigate="navigate" />
                </view>
            </view>
        </view>
        <view v-show="!isLoading">
	        <view class="is-flex is-column is-justify-center is-align-center has-bg-white" style="height: 100vh" >
	            <i class="iconfont icon-huodongyebucunzai has-desc-color" style="font-size: 280rpx;color: #DDDDDD"></i>
	            <view class="has-desc-color is-size-16">{{loading}}</view>
	        </view>
        </view>
    </view>
</template>

<script>

	import marked from '../../components/marked'
	import wxParse from '../../components/mpvue-wxparse/src/wxParse.vue'
	var util = require('../../common/util.js');
	export default {
		data(){
			return {
				id : "", 
				article: "",
				title : "",
				loading : "加载中..",
				addtime : '', 
				videoUrl:'',
				isLoading:false
			}
		},
		components: {
			wxParse
		},
		onLoad(e) {
			this.id = e.id; 
			this.loadData(); 
		},
		onShow(){
		},
		methods:{
			loadData:function(){
				let _this = this;
				this.$Request("task/loadContent",{id:this.id}).then(res=>{
					if (res.code == 200 ) {
						var addtime = util.dateUtils.toDateString(res.data['addtime']*1000,"yyyy-MM-dd");
						this.article = marked(res.data.content);
						this.title = res.data.title;
						this.addtime = addtime
						this.videoUrl= res.data.videoUrl || ""; 
					}else{
						this.loading = "内容不存在";
					}
					setTimeout(function(){
						_this.isLoading = true;
					},500)
				})
			},
			navigate:function(e){
				this.$NavTarge(e); // 打开连接 支持APP内页面 
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
page{
	background: @baseBackColor;
}
.is-p image {
	width: 100%;
	max-width: 100%;
}
.video{
	width: 100%;
}
.is-p a{
	color: #0782C1!important;
}
</style>

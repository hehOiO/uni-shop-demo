<template>
	<view class="about">
  		<web-view :src="link" @message="postMessage" :webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				link:'',
				webviewStyles:{
					progress:{
						color: '#00FF00'
					}
				}
			} 
		},
		onLoad:function(e) {
			var setNavJson = {}
			if(e.bg) setNavJson['backgroundColor'] = e.bg; 
			if(e.barcolor) setNavJson['frontColor'] = e.barcolor; 
			if( setNavJson ){
				uni.setNavigationBarColor(setNavJson); 
			}
			if(e.progress){
				this.webviewStyles.progress.color = e.progress; 
			}
			if(e.link){
				this.link = decodeURI(e.link);
			}else{
				uni.navigateBack()
			}
		},
		onNavigationBarButtonTap:function(e){
			if(e.index == 1){
				uni.navigateTo({
					url:"/pages/help/index"
				})
			}else{
				uni.navigateBack()
			}
			
		},
		methods:{
			postMessage:function(e){
				//console.log(JSON.stringify(e));
			}
		}
	}
</script>

<style>

</style>

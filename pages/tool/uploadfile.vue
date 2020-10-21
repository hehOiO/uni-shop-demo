<template>
	<view>
		<view class="clickMYupLoad" @tap="clickMYupLoad">点击上传图片</view>
	</view>
</template>

<script>
	var upload = require('../../common/lib/upload.js');

	export default {
		data() {
			return {
				
			};
		},
		onLoad:function(){

		},
		methods: {

			clickMYupLoad:function(e){

				var that = this;
				uni.chooseImage({
					sourceType: ["camera", "album"],
					sizeType: "compressed",
					count: 1,
					success: (res) => {
						upload({
							filePath : res['tempFilePaths'][0],
							success:function(upres){
								console.log(upres);
							},
							error:function(uperr){
								console.log(uperr);
							},
							progress:function(uppro){
								console.log(uppro);
							}
						})
// 						console.log("1222222："+res['tempFilePaths'][0].split('//')[1]);
// 
// 						console.log("文件上传中`````")
// 						base.fetchTool.uploadQiniu(res['tempFilePaths'][0]).then(upres=>{
// 
// 							console.log("上传成功`````")
// 
// 							console.log(JSON.stringify(upres))
// 						}).catch(er=>{
// 							console.log("文件上传失败`````")
// 						})
					}
				})
			},
		},
	}
</script>

<style>
.clickMYupLoad{
	width: 100%;
	height: 300upx;
	background: #f35;
	color: #fff;;
}
</style>

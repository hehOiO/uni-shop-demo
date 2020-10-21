<template>
	<view class="s-page-wrapper">

		<swiper :indicator-dots="true" :autoplay="false" indicator-color="#ffffff" :circular="true" @change="posterCurr"
		 v-bind:style="{ height: (windowHeight+20)+'px' }">
			<view class="poster">
				<swiper-item v-for="item in posterList" :key="item">
					<view class="poster-items" v-bind:style="{ height:  windowHeight+'px' }">
						<image :src="item.image" mode="widthFix" class="is-response"></image>
					</view>
				</swiper-item>
			</view>
		</swiper>
		<view class="footer-btn" @click="createPoster">点击生成海报</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userid: '',
				posterList: [],
				windowHeight: '',
				current: 0,
			};
		},
		onLoad: function() {
			this.userid = this.$SysUser.openid();
			this.windowHeight = uni.getSystemInfoSync().windowHeight - 20;
			console.log(this.windowHeight);
			this.loadData();
		},
		methods: {
			loadData: function() {
				this.$Request("member/loadPoster", {
					uid: this.userid
				}).then(res => {
					if (res.code == 200) {
						this.posterList = res.data;
					}
				})
			},
			posterCurr: function(e) {
				var current = e.detail.current;
				this.current = current;
			},
			createPoster: function() {
				uni.showLoading({
					title: '海报制作中..'
				});
				this.$Request("member/createPoster", {
					uid: this.userid,
					currentIndex: this.current
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						uni.showLoading({
							title: '图片下载中..'
						});
						uni.downloadFile({
							url: res.data, //仅为示例，并非真实的资源
							success: (dres) => {
								uni.hideLoading();
								if (dres.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: dres.tempFilePath,
										success: function() {
											uni.showToast({
												title:"图片保存成功",
												icon:"success"
											});
											uni.vibrateShort(); 
										},
										fail:(error)=>{
											uni.showToast({
												title:"保存文件失败",
												icon:"none"
											})
										},
										complete:(del)=>{
											this.deletePoster(res.data)
										}
									})
								}
							},
							fail:(error)=>{
								this.deletePoster(res.data)
								uni.hideLoading();
								uni.showToast({
									title:"下载图片失败",
									icon:"none"
								})
							}
						});

						
					} else {
						uni.showToast({
							title: res.msg||"图片生成失败",
							icon: "none"
						})
					}
					//console.log( res.data ); 
				}).catch(err => {
					uni.hideLoading();
				})
			},
			deletePoster:function(path){
				// 执行删除海报缓存图片 
				this.$Request("member/deletePoster",{uid:this.userid,path:path}).then(res=>{
					
				});
			}
			
		},
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";

	page {
		background: @baseBackGroundColor;
	}

	swiper {
		width: 100%;
	}

	.poster {
		width: 100%;
		margin: 0 auto;
	}

	.poster .poster-items {
		height: 100%;
	}

	.footer-btn {
		text-align: center;
		color: #FFFFFF;
		padding-top: var(--status-bar-height);
// 		position: fixed;
// 		bottom: 0;
// 		height: 100upx;
// 		width: 100%;
// 		background: @baseBackGroundColor;
// 		color: #FFFFFF;
// 		text-align: center;
// 		line-height: 100upx;
	}
</style>

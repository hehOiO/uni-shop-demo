<template>
	<view class="s-page-wrapper">
		<view class="invite-user-main has-pdb-50">
			<view class="invite-user-info-view">
				<view class="banner">
					<image src="../../../static/images/common/tgzj.jpg" mode="widthFix" class="is-response"></image>
				</view>
				<view class="invite-user-button" @tap="shareApp">点击邀请好友</view>
			</view>
			<view>
				<view class="union-ranking-container">
					<view class="union-ranking-title">邀请排行榜 TOP10</view>
				</view>
				<view class="union-ranking-box">
					<view class="union-table-rank-title">您当前直接邀请<span style="color: #FB3802;"> {{agent_count}} </span>人</view>
					<view class="union-table-rank-box">
						<view class="union-table-rank-nav">
							<view>排行</view>
							<view>号码</view>
							<view>邀请数</view>
						</view>
						<view class="union-table-rank-content">
							<view class="union-table-rank-item" v-for="(item,index) in top10" :key="index">
								<view v-if="index==0">
									<image style="width: 40rpx;" src="../../../static/images/common/gold.png" mode="widthFix"></image>
								</view>
								<view v-if="index==1">
									<image style="width: 40rpx;" src="../../../static/images/common/selver.png" mode="widthFix"></image>
								</view>
								<view v-if="index==2">
									<image style="width: 40rpx;" src="../../../static/images/common/tong.png" mode="widthFix"></image>
								</view>
								<view v-if="index>2">{{index+1}}</view>
								<view>{{item.agent_nickname}}</view>
								<view>{{item.agent_count}}人</view>
							</view>
						</view>
					</view>
				</view>
				<view>
					<view class="union-ranking-title1">
						活动规则
					</view>
					<view class="union-explain-container">
						<view class="union-explain-item-box">
							<view class="union-explain-item-top">
								<view class="union-explain-item">1</view>
								<view>
									分享好友
								</view>
							</view>
							<view class="union-explain-item-bottom">
								点击"立即邀请好友"复制APP下载链接，通过微信、QQ、等工具发送朋友，让好友下载APP并注册账号。
							</view>
						</view>
						<view class="union-explain-item-box">
							<view class="union-explain-item-top">
								<view class="union-explain-item">2</view>
								<view>
									获得奖励
								</view>
							</view>
							<view class="union-explain-item-bottom">
								好友注册并绑定下单账号，您将获得平台现金奖励（以平台活动为准）
							</view>
						</view>
						<view class="union-explain-item-box">
							<view class="union-explain-item-top">
								<view class="union-explain-item">3</view>
								<view>
									团队分佣
								</view>
							</view>
							<view class="union-explain-item-bottom">
								好友做任务，直接邀请人有任务分成，好友邀请的人，您作为间接邀请人也能获得相应的佣金。
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="invite-guide">
				<image src="../../../static/images/union/invite_guide.png" mode="widthFix" class="is-response"></image>
			</view> -->
			<!-- <view class="invite-user-tabs-container">
				<view class="tab-buttons">
					<view class="tab-button" @tap="switchTap('my')">我的邀请<view class="border-active-wrapper">
							<view class="border-active" v-if="curr == 'my'"></view>
						</view>
					</view>
					<view class="tab-button active" @tap="switchTap('list')">排行榜<view class="border-active-wrapper">
							<view class="border-active" v-if="curr == 'list'"></view>
						</view>
					</view>
				</view>
				<view class="tab-contents" v-if="curr == 'list'">
					<view class="content-rank">

						<view class="rank-list">
							<view class="rank-line has-borderb has-pdt-10" v-for="(item,index) in top10" :key="index">
								<view class="rank-no">{{index+1}}</view>
								<view class="rank-avatar">
									<image :src="defaultAvatar" class="is-response" mode="widthFix"></image>
								</view>
								<view class="rank-name">{{item.agent_nickname}}</view>
								<view class="rank-count">邀请{{item.agent_count}}名好友</view>
							</view>
						</view>

					</view>
				</view>

				<view class="tab-contents" v-if="curr == 'my'">
					<view class="content-invited">
						<view class="my-info">
							<view class="avatar">
								<image :src="defaultAvatar" class="is-response" mode="widthFix"></image>
							</view>
							<view class="name">{{user_name}}</view>
							<view class="count">邀请{{agent_count}}名好友</view>
						</view>
						<view class="invited-avatars"></view>
					</view>
				</view>
			</view> -->

			<!-- <view class="invite-guide">
				<view class="has-pd-10 is-left">
					<view class="is-size-18">邀请说明：</view>
					<view class="is-size-15 has-mgt-3">1、邀请好友做任务您可以获得提成哦~</view>
					<view class="is-size-15 has-mgt-3">2、被邀请人若出现跑单情况您将全责承担哦~</view>
					<view class="is-size-15 has-mgt-3">3、尽量邀请自己认为可靠的人</view>
					<view class="is-size-15 has-mgt-3">活动最终解释权归本平台所有</view>
				</view>
			</view> -->

			<uni-popup :show="share.show" type="button sharePopup" @hidePopup="shareApp">
				<view style="width: 100%;height: 100%;">
					<view class="popup-title has-pd-15 is-center has-borderb">
						分享给好友 <text class="has-floatr iconfont icon-close" @tap="shareApp"></text>
					</view>
					<view class="popup-content">
						<view class="share-content has-pdb-20">
							<swiper class="uni-grid-9">
								<swiper-item>
									<view class="uni-grid-9-item" @click="shareClick('weixin://','com.tencent.mm')">
										<view class="iconfont icon-weixin"></view>
										<text class="uni-grid-9-text">微信好友</text>
									</view>
									<view class="uni-grid-9-item" @click="shareClick('mqq://','com.tencent.mobileqq')">
										<view class="iconfont icon-qq"></view>
										<text class="uni-grid-9-text">QQ好友</text>
									</view>
									<view class="uni-grid-9-item" @click="shareClick('sinaweibo://','com.sina.weibo')">
										<view class="iconfont icon-weibo"></view>
										<text class="uni-grid-9-text">微博</text>
									</view>
									<view class="uni-grid-9-item" @click="shareClick('none','none')">
										<view class="iconfont icon-fenxiang"></view>
										<text class="uni-grid-9-text">复制邀请码</text>
									</view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</uni-popup>

		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup.vue"
	export default {
		data() {
			return {
				userid: '',
				defaultAvatar: '',
				share: {
					show: false,
				},
				top10: [],
				top3: [],
				myunion: [],
				curr: "my",
				agent_count: 0,
				agent_score: 0.00,
				user_name: '',
			}
		},
		components: {
			uniPopup
		},
		methods: {
			switchTap: function(curr) {
				console.log(curr);
				this.curr = curr;
			},
			shareApp: function() {
				this.share.show = !this.share.show;
			},
			shareClick: function(link,pname) {
				var that = this;

				uni.showLoading({
					mask: true,
					title: '获取中...'
				})
				var webname = that.$Sysconf("webname");
				var APPHOST = that.$Sysconf("APPHOST");
				that.$Request("member/getNewInvitnCode", {
					uid: that.userid,
				}).then(res => {
					uni.hideLoading();
					if (res.code == 200) {
						var invit_code = res.data.code;
						var invit_link = APPHOST + "?agent_id=" + invit_code;
						var content = that.$Sysconf("app_invitation_describe");
						if (content == "" || content == false) {
							content = "赶快加入" + webname +
								"吧，在这里做任务可以挣零花钱哦~ 邀请好友做任务还可以获得好友任务提成，APP下载连接 {{link}} ，下载后注册的时候记得输入我的邀请码哦~ 我的邀请码是：{{code}}";
						}
						var nickname = that.$SysUser.get("phone");
						content = content.replace("{{link}}", invit_link);
						content = content.replace("{{code}}", invit_code);
						content = content.replace("{{nickname}}", nickname);

						uni.setClipboardData({
							data: content,
							success: (coypres => {
								uni.showToast({
									title: "邀请码复制成功",
									icon: "none"
								});
								that.sendWithSystem(link,pname); 
							})
						})
					} else {
						uni.showToast({
							title: res['msg'] || "获取邀请码失败",
							icon: "none"
						});
					}
				})
				that.shareApp();
			},
			loadData() {
				this.$Request('member/InvitationData', {
					userid: this.userid
				}).then(res => {
					if (res['code'] == 200) {
						console.log(res);
						//this.userinv_count = res.data.user
						this.top10 = res.data.top10;
						this.top3 = res.data.top3;
						this.myunion = res.data.myunion;
						this.agent_count = res.data.agent_count;
						this.agent_score = res.data.agent_score;
					}
				});
			},
			sendWithSystem:function(link,pname){
				console.log(link + pname)
				if(link=="none"){
					
				}else{
					//#ifdef APP-PLUS
						// 判断平台
						if (plus.os.name == 'Android') {
							plus.runtime.launchApplication(
								{
									pname: pname
								},
								function(e) {
									console.log('Open system default browser failed: ' + e.message);
								}
							);
						} else if (plus.os.name == 'iOS') {
							plus.runtime.launchApplication({ action: link }, function(e) {
								console.log('Open system default browser failed: ' + e.message);
							});
						}
					//#endif
				}
				
			}
		},
		onLoad: function(e) {
			var user = this.$SysUser.get();
			this.userid = user.openid;
			this.user_name = user.phone;
			this.defaultAvatar = this.$Sysconf('imagelist.defaultAvatar');
			this.loadData();

		},
		onNavigationBarButtonTap: function(index) {
			this.shareApp();
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";
	@import "../../../common/uni.css";
	@import "../../../common/icon.css";

	page {
		min-height: 100%;
		background-color: @baseBackColor;
	}
	.union-explain-item-box{
		margin-bottom: 30rpx;
	}
	.union-explain-item{
		background-color: #f78233;
		color: #fff;
		width: 35rpx;
		height: 35rpx;
		line-height: 35rpx;
		text-align:center;
		border-radius: 50%;
		font-size: 26rpx;
		margin-right:10rpx;
	}
	.union-explain-item-bottom{
		font-size: 22rpx;
		color: #898989;
		padding-left:50rpx;
	}
	.union-explain-item-top>view:last-child{
		font-size:28rpx;
		color: #000;
	}
	.union-explain-item-top{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.union-explain-container{
		width: 90%;
		margin: 0 auto;
		background-color:#fff;
		padding:40rpx 34rpx;
		border-radius: 15rpx;
		box-sizing: border-box;
	}
	.union-ranking-title1{
		width: fit-content;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid #fff;
		margin: 0 auto;
		color: #fff;
		margin-top: 60rpx;
	}
	.union-table-rank-item:nth-child(odd){
		background-color: #FFF5F3;
	}
	.union-table-rank-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
	}
	.union-table-rank-item>view{
		width: 30%;
		font-size: 26rpx;
		text-align: center;
	}
	.union-table-rank-box{
		padding: 24rpx;
		background-color: #fff;
	}
	.union-table-rank-nav{
		display:flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
	}
	.union-table-rank-nav>view{
		width: 30%;
		text-align:center;
		font-size: 26rpx;
	}
	.union-ranking-box{
		width: 90%;
		margin: 0 auto;
		margin-top:30rpx;
		
	}
	.union-table-rank-title{
		text-align: center;
		background-color:#fff;
		font-size: 24rpx;
		padding: 30rpx 0;
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
		color: #808080;
	}
	.union-ranking-container{
		padding-bottom: 5rpx;
		border-bottom: 1rpx dotted #fff;
		width: 60%;
		width: 60%;
		margin: 0 auto;
		margin-top: 40rpx;
	}
	.union-ranking-title{
		color: #fff;
		
		text-align:center;
		padding-bottom: 10rpx;
		border-bottom: 1rpx solid #fff;
		
	}
	.sharePopup {
		width: 100% !important;
		//height: 200upx!important;
		position: fixed !important;
		bottom: 0upx !important;
	}

	.popup-content {
		height: 100%;

	}

	.popup-content .iconfont {
		font-size: 64upx;
	}

	.popup-content .iconfont.icon-weixin {
		color: rgb(19, 206, 102);
	}

	.popup-content .iconfont.icon-qq {
		color: rgb(0, 159, 232);
	}

	.popup-content .iconfont.icon-weibo {
		color: rgb(217, 73, 69);
	}

	.popup-content .iconfont.icon-fenxiang {
		color: #909399;
	}

	.popup-content text {
		margin-top: 10rpx;
		line-height: 50rpx;
		font-size: 30rpx;
		color: #666;
	}

	.popup-title .icon-close {
		font-size: 32upx;
	}

	.uni-grid-9 {
		width: auto;
		background: #FFFFFF;
		border-top: 0rpx;
		margin-top: 35rpx;
		height: 150rpx;
		overflow: hidden;
		overflow-x: scroll;
	}

	.uni-grid-9.list-v2 {
		border-top: 2rpx solid #FFFFFF;
		height: 150rpx;
	}

	.uni-grid-9.list-v2 swiper-item {
		padding-top: 25rpx;
	}

	.uni-grid-9-item {
		width: 187.5rpx;
		border: none;
		height: 130rpx;
		float: left;
	}

	.grid-hover {
		background: none;
	}

	.uni-grid-9-image {
		width: 70rpx;
		height: 70rpx;
	}

	.is-size-28 {
		font-size: 56upx;
	}

	.invite-user-main {
		width: 100%;
		height: 100%;
		background: rgb(247, 130, 51) no-repeat;
		margin-left: auto;
		margin-right: auto;
		color: #666;
		line-height: 1.4;
	}

	.invite-user-info-view {
		background-color: rgb(247, 130, 51);
		position: relative;
		padding-bottom: 10upx;
	}

	.invite-user-button {
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		color: #333;
		width: 300upx;
		height: 60upx;
		line-height: 60upx;
		font-size: 28upx;
		font-weight: bolder;
		background-color: #fff;
		border-radius: 30upx;
		margin-top: 10upx;
		position: absolute;
		bottom: 60rpx;
		left: 50%;
		margin-left: -150upx;
	}

	.invite-guide {
		margin: 10upx 15upx 0;
		border: 2upx solid #39383c;
		border-radius: 12upx;
		text-align: center;
		padding: 0upx 5upx;
	}

	.invite-guide image {

		text-align: center;
		margin-top: 20upx;
		margin-bottom: 15upx;
	}

	.invite-user-tabs-container {
		margin: 15upx 15upx 2upx;
		border: 2upx solid #39383c;
		border-radius: 15upx;
		background-color: #fff;
	}

	.invite-user-tabs-container .tab-buttons {
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		-webkit-align-items: center;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		-webkit-flex-direction: row;
		border-bottom: 2upx solid #d2d2d2;
	}

	.invite-user-tabs-container .tab-buttons .tab-button {
		display: block;
		color: #39383c;
		font-weight: bolder;
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		width: 50%;
		text-align: center;
		position: relative;
	}

	.border-active-wrapper {
		position: absolute;
		height: 10rpx;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.border-active {
		width: 40upx;
		height: 5upx;
		background-color: #ffc334;
		display: inline-block;
		vertical-align: top;
	}

	.tab-contents {
		margin-bottom: 50upx;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium {
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		-webkit-align-items: center;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		flex-direction: row;
		-webkit-flex-direction: row;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium .podium-item {
		position: relative;
		width: 33.33%;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium .podium-item .rank-avatar {
		position: relative;
		margin-left: 81rpx;
		height: 140rpx;
		margin-top: 15rpx;
		// margin-bottom: -9rpx;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium .podium-item .rank-avatar .user-avatar {
		position: absolute;
		z-index: 36rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		top: 33rpx;
		margin-left: 0rpx;



	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium .podium-item .rank-avatar .the-crown {
		position: absolute;
		top: 14rpx;
		z-index: 2;
		width: 111rpx;
		height: 119rpx;

	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium .podium-item .rank-name {
		height: 26rpx;
		line-height: 26rpx;
		font-size: 24rpx;
		color: #39383c;
		text-align: center;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium .podium-item .rank-count {
		text-align: center;
		height: 27rpx;
		line-height: 33rpx;
		color: #767676;
		font-size: 22rpx;
		margin: 0 auto 3rpx;

	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium .podium-item .rank-money {
		text-align: center;
		margin: 0 auto;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-podium .podium-item .rank-money .rank-money-text {
		display: inline-block;
		text-align: center;
		padding-left: 8rpx;
		padding-right: 5rpx;
		height: 16rpx;
		line-height: 16rpx;
		font-size: 20rpx;
		color: #d4a500;
		background-color: #ffdb34;
		border-radius: 8rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		margin-top: 10rpx;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-list {
		padding-left: 10upx;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-list .rank-line {
		height: 120rpx;
		position: relative;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-list .rank-line .rank-avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		left: 50rpx;
		top: 20rpx;
		position: absolute;
		overflow: hidden;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-list .rank-line .rank-name,
	.invite-user-tabs-container .tab-contents .content-rank .rank-list .rank-line .rank-no {
		position: absolute;
		top: 0;
		left: 150rpx;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 32rpx;
		color: #39383c;
	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-list .rank-line .rank-count {
		text-align: right;
		position: absolute;
		top: 42rpx;
		right: 25rpx;
		width: 200rpx;
		height: 16rpx;
		color: #767676;
		font-size: 23rpx;

	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-list .rank-line .rank-money {
		text-align: center;
		position: absolute;
		top: 70rpx;
		right: 18rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		height: 33rpx;
		line-height: 33rpx;
		font-size: 22rpx;
		color: #d4a500;
		background-color: #ffdb34;
		border-radius: 10rpx;


	}

	.invite-user-tabs-container .tab-contents .content-rank .rank-list .rank-line .rank-no {
		left: 10upx;
	}

	.invite-user-tabs-container .tab-contents .content-invited .my-info {
		text-align: center;
	}

	.invite-user-tabs-container .tab-contents .content-invited .my-info .avatar {
		width: 120rpx;
		height: 120rpx;
		border: 2upx solid #ffd634;
		border-radius: 50%;
		overflow: hidden;
		margin: 26rpx auto 0;
	}

	.invite-user-tabs-container .tab-contents .content-invited .my-info .name {
		font-size: 32rpx;
		margin-top: 6rpx;
		color: #39383c;
	}

	.invite-user-tabs-container .tab-contents .content-invited .my-info .count {
		color: #767676;
		font-size: 31rpx;
	}

	.invite-user-tabs-container .tab-contents .content-invited .my-info .money {
		margin-top: 6rpx;
		text-align: center;
	}

	.invite-user-tabs-container .tab-contents .content-invited .my-info .money .money-text {
		height: 30rpx;
		line-height: 30rpx;
		font-size: 22rpx;
		border-radius: 6rpx;
		color: #d4a500;
		background-color: #ffdb34;
		display: inline-block;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-top: 5rpx;
		padding-bottom: 5rpx;

	}
</style>

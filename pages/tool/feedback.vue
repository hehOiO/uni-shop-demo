<template>
	<view class="page">
		<view class='feedback-title'>
			<text>问题和意见</text>
			<text class="feedback-quick" @tap="chooseMsg">快速选择</text>
		</view>
		<view class="feedback-body">
			<textarea placeholder="请在此输入您的反馈意见..." v-model="sendDate.content" class="feedback-textare" />
			</view>
		<view class='feedback-title'>
			<text>图片(选填,提供问题截图,总大小10M以下)</text>
		</view>
		<view class="feedback-body feedback-uploader">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">点击预览、删除</view>
					<view class="uni-uploader-info">{{imageList.length}}/9</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageList" :key="index">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" @tap="previewImage(index)" @longtap="deleteImg(index)"></image>
							</view>
						</block>
					</view>
					<view class="uni-uploader__input-box" v-if="imageList.length < 9 ">
						<view class="uni-uploader__input" @tap="chooseImg"></view>
					</view>
				</view>
			</view>
		</view>
		<view class='feedback-title'>
			<text>QQ/邮箱</text>
		</view>
		<view class="feedback-body">
			<input class="feedback-input" v-model="sendDate.contact" placeholder="(选填,方便我们联系你 )" />
		</view>
		<view class='feedback-title feedback-star-view'>
			<text>应用评分</text>
			<view class="feedback-star-view">
				<text class="feedback-star" v-for="(value,key) in stars" :key="key" :class="key < sendDate.score ? 'active' : ''" @tap="chooseStar(value)"></text>
			</view>
		</view>
		<button type="primary" class="feedback-submit" @tap="send">提交</button>
		<view class='feedback-title'>
			<text>您的宝贵建议是我们前进的动力，真诚感谢您！</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			msgContents: ['界面显示错乱', '启动缓慢，卡出翔了', 'UI无法直视，丑哭了', '偶发性崩溃'],
			stars: [1, 2, 3, 4, 5],
			imageList: [],
			sendDate: {
				score: 0,
				content: '',
				contact: ''
			}
		};
	},
	onUnload() {
		this.imageList = [];
		this.sendDate = {
			score: 0,
			content: '',
			contact: ''
		};
	},
	onLoad() {
		let deviceInfo = {
			appid: plus.runtime.appid,
			imei: plus.device.imei, //设备标识
			p: plus.os.name === 'Android' ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os: plus.os.version,
			net: '' + plus.networkinfo.getCurrentType()
		};
		this.sendDate = Object.assign(deviceInfo, this.sendDate);
	},
	methods: {
		chooseMsg() {
			//快速输入
			uni.showActionSheet({
				itemList: this.msgContents,
				success: res => {
					this.sendDate.content = this.msgContents[res.tapIndex];
				}
			});
		},
		chooseImg() {
			//选择图片
			uni.chooseImage({
				sourceType: ['camera', 'album'],
				sizeType: 'compressed',
				count: 9,
				success: res => {
					this.imageList = res.tempFilePaths;
				}
			});
		},
		chooseStar(e) {
			//点击评星
			this.sendDate.score = e;
		},
		previewImage(index) {
			//预览图片
			var _self = this,
				current = _self.imageList[index];

			uni.showActionSheet({
				itemList: ['预览', '删除'],
				success: function(res) {
					if (res.tapIndex == 0) {
						uni.previewImage({
							current: current,
							urls: _self.imageList
						});
					} else {
						_self.deleteImg(index);
					}
				}
			});
		},
		deleteImg: function(index) {
			var current = this.imageList[index];
			if (current) {
				var imglist = this.imageList;
				imglist.splice(index, 1);
				this.imageList = imglist;
			}
		},
		send() {
			//发送反馈
			var imgs;
			if (this.imageList.length > 0) {
				var imgs = this.imageList.map(value => {
					return {
						name: 'uni-app.feedback',
						uri: value
					};
				});
			} else {
				uni.showToast({ title: '请上传反馈图片!', icon: 'none' });
				return false;
			}

			if (this.sendDate['content'] == '') {
				uni.showToast({ title: '请输入您的反馈意见!', icon: 'none' });
				return false;
			}
			uni.uploadFile({
				url: 'https://service.dcloud.net.cn/feedback',
				files: imgs,
				formData: this.sendDate,
				success: res => {
					uni.showToast({ title: '已提交，感谢您反馈!', icon: 'none' });
					this.imageList = [];
					this.sendDate = {
						score: 0,
						content: '',
						contact: ''
					};
				},
				fail: res => {
					console.log(res);
				}
			});
		}
	}
};
</script>
<style lang="less">
@import '../../static/css/base.less';
@import '../../common/uni.css';
page {
	background-color: @baseBackColor;
	background: @baseBackColor;
}

.input-view {
	font-size: 28px;
}
</style>

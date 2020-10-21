<template>
	<view class="s-page-wrapper ">

		<view class="s-page-wrapper has-bg-white has-pdb-15">

			<block v-if="status == 0 ">
				<view class="s-row has-pd-10">
					<view class="is-center">接手任务考试</view>
					<view class="s-col is-col-24 has-mgt-10 has-bordert has-pdt-10">
						<view class="is-p">
							<text class="has-pdl-20">您好！为了您的财产安全以及避免新手在用户试用过程中出现操作问题带来不必要的麻烦，平台规定在使用此应用前需要完成新手考试后才能开始接手任务，请您认真完成以下选择题（如果在具体的操作中遇到其它问题建议您先去帮助中心寻找答案哦~）。</text>
						</view>
					</view>
				</view>
				<view class="s-btn" v-if="status == 0 ">
					<text class="is-btn-md has-bg-blue" @tap="startExam">开始考试</text>
				</view>
			</block>

			<block v-if="status == 1 ">
				<view class="s-row has-pd-10">
					<view class="is-center is-grey ">第{{checknum+1}}题，总{{total_subject}}题</view>

					<block v-for="(subject,sindex) in subject_list" :key="svkey" v-if="!showTest">
						<view class="s-col is-col-24 has-mgt-10 has-pdt-10" v-if="checknum == sindex">

							<view class="is-p">{{sindex+1}}.{{subject.title}}</view>
							<view class="is-p">
								<view class="page-section">
									<view class="uni-list">
										<radio-group @change="radioChange" :data-index="sindex" v-if="!showTest">
											<label class="uni-list-cell uni-list-cell-pd is-size-14" v-for="(item,vindex) in subject.list" :key="vkey">
												<view>
													<radio :value="item.value" :checked="(subject.checked == item.value) ? true :false " />
												</view>
												<view>{{item.name}}</view>
											</label>
										</radio-group>

									</view>
								</view>
							</view>
						</view>
					</block>

					<block v-for="(subject,sindex) in subject_list" :key="svkey" v-if="showTest">
						<view class="s-col is-col-24 has-mgt-10 has-pdt-10">

							<view class="is-p">{{sindex+1}}.{{subject.title}}</view>
							<view class="is-p">
								<view class="page-section">
									<view class="uni-list">
										<radio-group @change="radioChange" :data-index="sindex" v-if="showTest">
											<label class="uni-list-cell uni-list-cell-pd is-size-14" v-for="(item,vindex) in subject.list" :key="vkey">
												<view v-if="subject.answer == item.value">
													<radio disabled color="#42b983" :value="item.value" :checked="(subject.answer == item.value) ? true:false" />
												</view>
												<view v-else>
													<radio disabled color="#ff3355" :value="item.value" />
												</view>
												<view v-if="subject.answer == item.value" style="color: #42b983">{{item.name}}</view>
												<view v-else style="color: #ff3355">{{item.name}}</view>
											</label>
										</radio-group>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
				<view class="s-row is-center" style="width: 100%;margin: 0 auto;" v-if="!showTest">
					<text class="is-blue has-pdr-5" @tap="upperSubject">{{upperSubjectText}}</text>
					<text class="is-blue has-pdl-5" @tap="nextSubject">{{nextSubjectText}}</text>
				</view>
				<view class="s-row is-center" style="width: 100%;margin: 0 auto;" v-else>
					<text class="is-blue has-pdr-5" @tap="resetSubject">重新考试</text>
				</view>

			</block>
		</view>

	</view>
</template>

<script>
	var subjectData = require('../../common/lib/subjectData.js');
	export default {
		data() {
			return {
				status: 0,
				checknum: 0,
				total_subject: 3,
				subject_list: [],
				upperSubjectText: "上一题",
				nextSubjectText: '下一题',
				userid: '',
				showTest: false,
			}
		},
		onLoad(e) {
			this.total_subject = subjectData.data.length;
			this.subject_list = subjectData.data;
			this.userid = this.$SysUser.openid();
		},
		onUnload() {
			this.subject_list = [];
			this.status = 0;
			this.checknum = 0;
			this.total_subject = 3;
			this.upperSubjectText = "上一题";
			this.nextSubjectText = '下一题';
		},
		onShow() {
			if (!this.$SysUser.openid()) {
				uni.navigateBack({});
			}
		},
		methods: {
			startExam() {
				this.status = 1;
			},
			resetSubject() {
				// 重新考试
				uni.navigateBack({});
			},
			upperSubject() {
				var check = this.checknowNumCheck();
				if (!check) {
					return false;
				}
				if (this.checknum > 0) {
					this.checknum = this.checknum - 1;
				}
			},
			nextSubject() {
				var check = this.checknowNumCheck();
				if (!check) {
					return false;
				}
				if (this.checknum + 1 < this.total_subject) {

					this.checknum = this.checknum + 1;
					if (this.checknum + 1 == this.total_subject) {
						this.nextSubjectText = "提交";
					} else {
						this.nextSubjectText = "下一题";
					}
				} else {
					this.submitTest();
				}
			},
			submitTest() {
				if (this.showTest) {
					return false;
				}
				// 考试答案提交 
				var subject = this.subject_list;
				// 计算用户错了多少题 
				var error = 0;
				var succe = 0;
				subject.forEach(item => {
					if (parseInt(item.answer) != parseInt(item.checked)) {
						error++;
					} else {
						succe++;
					}
				});
				if (error > subjectData.maxError) {
					this.showTest = true;
					uni.showToast({ title: '抱歉！您本次的考试没有通过！', icon: 'none' });
					return false;
				} else {
					this.$Request("member/noviceCourse", {
						uid: this.userid,
						Fraction: succe
					}).then(res => {
						if (res.code == 200) {
							uni.showToast({ title: '恭喜！您已通过本次考试', icon: 'none' });
							setTimeout(function() {
								uni.navigateBack({})
							}, 2000);
						} else {
							uni.showToast({ title: '评分失败。', icon: 'none' });
						}
					});
				}
			},
			radioChange(e) {
				var subject = this.subject_list;
				var index = e.currentTarget.dataset.index;
				var subjectInfo = subject[index]; // 当前选中的index
				var val = e.detail.value;
				var subjectDetil = subjectInfo['list'][val]; //当前选中的答案详情 
				this.subject_list[index]['checked'] = val; // 设置当前用户选中的答案 
			},
			checknowNumCheck() {
				// 验证当前的题目是否选中 
				var subject = this.subject_list;
				var subjectInfo = subject[this.checknum]; // 当前选中的index
				if (subjectInfo.checked === -1) {
					uni.showToast({ title: '至少选中一个答案', icon: 'none' });
					return false;
				}
				return true;
			}
		}
	}
</script>

<style lang="less">
	@import "../../common/uni.css";

	.uni-list-cell {
		justify-content: flex-start
	}

	.w50b {
		width: 200rpx !important;
		float: left;
	}

	.nextSubject {
		border-top-right-radius: 5rpx;
		border-bottom-right-radius: 5rpx;
	}

	.upperSubject {
		border-top-left-radius: 5rpx;
		border-bottom-left-radius: 5rpx;
		border-right: 2rpx solid #fff;
	}
</style>

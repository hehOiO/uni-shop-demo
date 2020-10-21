<template>
	<view class="s-page-wrapper has-bg-white">

		<view class="s-row bordertopf2">
			<view class="s-col is-col-24">
				<view class="s-list has-mgt-0">
					<view class="is-item has-pd-20" @tap="noviceTest">
						<view class="is-item-hd  has-pdr-5">
							<view class="iconfont icon-bianji is-size-18"></view>
						</view>
						<view class="is-item-bd is-oneline">
							<view>新手考试<text class="is-grey is-size-14">(奖励10信用分)</text></view>
						</view>
						<view class="is-item-hd">
							<view class="is-grey is-size-16" v-if="is_novice_course == 0 ">未完成</view>
							<view class="is-grey is-size-16" v-if="is_novice_course == 1 ">已完成</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>

	export default {
		data() {
			return {
				is_novice_course: 0,
				article: "",
				title: "",
				loading: "加载中..",
			}
		},

		onLoad(e) {
			this.is_novice_course = e.is_novice_course;
		},
		methods: {
			noviceTest() {
				if (this.is_novice_course == 0) {
					uni.navigateTo({
						url: '/pages/detail/noviceTest'
					});
				}
			}
		}
	}
</script>

<style>

</style>

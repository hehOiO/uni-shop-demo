<template>
	<view class="s-page-wrapper has-bg-white ">
		<view class="s-row has-borderb">
			<view class="s-col is-col-24" v-if="categoryList.length > 0 ">
				<view class="s-grids">
					<view class="is-grid is-grid-3 is-a is-center has-pd-25" v-for="(item,index) in categoryList" :key="index"
					 v-bind:class="item.class" @tap="selectCate(index)">
						<view class="">
							{{item.title}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="has-pd-10 has-mgt-20">
			<view class="feedback-submit is-center has-pd-10 has-border-radius is-white" @tap="defaultHandler">选好了，返回</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [],
			}
		},
		methods: {
			cateData() {
				this.$Request("product/category", {
					action: 'all'
				}).then(res => {
					if (res.code == 200) {
						var data = res.data;
						this.categoryList = data;
					}
				});
			},
			selectCate(e) {
				var categoryList = this.categoryList;
				if (categoryList[e]['class'] == "border_select") {
					categoryList[e]['class'] = "";
				} else {
					// add
					var select_length = 0;
					for (var i = 0; i < categoryList.length; i++) {
						if (categoryList[i]['class'] == "border_select") {
							select_length++;
						}
					}
					if ((select_length + 1) > 3) {
						uni.showToast({
							title: "最多选择三个",
							icon: "none"
						});
					} else {
						categoryList[e]['class'] = "border_select"
					}
				}
				this.categoryList = []
				this.categoryList = categoryList;
			},
			defaultHandler: function() {
				uni.navigateBack({});
			},
			getselectData: function() {
				var categoryList = this.categoryList;
				var data = [];
				for (var i = 0; i < categoryList.length; i++) {
					if (categoryList[i]['class'] == "border_select") {
						data.push(categoryList[i]);
					}
				}
				return data;
			}
		},
		onShow: function() {
			this.cateData();
		},
		onUnload: function() {
			var data = this.getselectData();
			this.$Cache.put("buyer_product_cate", data, 600);
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/base.less";

	page {
		min-height: 100%;
		background-color: @baseBackColor;
	}

	.s-grids .is-grid.border_select view {
		color: @baseBackGroundColor;
	}

	.feedback-submit {
		background: @baseBackGroundColor;
	}
</style>

<template>
	<view class="s-page-wrapper" v-if="isLoading">
		<view class='task-index-tab'>
			<view :class="[tabShow==1?'active':'']" @tap="changeTabTap(1)">淘宝/天猫<span v-if="tabDotNum.taobao>0">({{tabDotNum.taobao}})</span></view>
			<view :class="[tabShow==2?'active':'']" @tap="changeTabTap(2)">京东<span v-if="tabDotNum.jd>0">({{tabDotNum.jd}})</span></view>
			<view :class="[tabShow==3?'active':'']" @tap="changeTabTap(3)">拼多多<span v-if="tabDotNum.pinduoduo>0">({{tabDotNum.pinduoduo}})</span></view>
			<view :class="[tabShow==4?'active':'']" @tap="changeTabTap(4)">抖音<span v-if="tabDotNum.douyin>0">({{tabDotNum.douyin}})</span></view>
		</view>
		<view v-show="tabShow==1" style="margin-top: 100rpx;">
			<view class="s-page-wrapper has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接垫付任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/list?status=1&title=未完成的任务&type=showbar&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="total.nostatus_total > 0">{{total.nostatus_total}}</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/list?status=5&title=已完成的任务&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/list?status=0&title=已撤销的任务&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="has-borderb"></view>
			<view class="s-page-wrapper has-mgt-10 has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接浏览任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/browse?status=1&title=未完成的任务&type=showbar" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="browse.nostatus_total > 0">{{browse.nostatus_total}}</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/browse?status=5&title=已完成的任务" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/browse?status=0&title=已撤销的任务" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
			
			<!-- 新增预约单任务 -->
			<view class="s-page-wrapper has-mgt-10 has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接预售任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/list?status=1&title=未完成的任务&type=showbar&model=4" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="order.nostatus_total > 0">{{order.nostatus_total}}</view>						
						</view>
					</navigator>
			
					<navigator url="/pages/task/list?status=5&title=已完成的任务&model=4" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/list?status=0&title=已撤销的任务&model=4" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
			<!-- 新自审单任务 -->
			<!-- <view class="s-page-wrapper has-mgt-10 has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接自审任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/list?status=1&title=未完成的任务&type=showbar&model=5" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="trial.nostatus_total > 0">{{trial.nostatus_total}}</view>						
						</view>
					</navigator>
			
					<navigator url="/pages/task/list?status=5&title=已完成的任务&model=5" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/list?status=0&title=已撤销的任务&model=5" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view> -->
			<!-- 特别任务 -->
			<view class="s-page-wrapper has-mgt-10 has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接特殊路径任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/list?status=1&title=未完成的任务&type=showbar&model=6" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="special.nostatus_total > 0">{{special.nostatus_total}}</view>						
						</view>
					</navigator>
			
					<navigator url="/pages/task/list?status=5&title=已完成的任务&model=6" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/list?status=0&title=已撤销的任务&model=6" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
			<!-- 地推 -->
			<!-- <view class="has-borderb" v-if="close_earth_push && earth_push == 1 "></view>
			<view class="s-page-wrapper has-bg-white has-mgt-10" v-if="close_earth_push && earth_push == 1 ">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接地推任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/earthpush?status=1&title=未完成的任务&type=showbar" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="earthpush.nostatus_total > 0">{{earthpush.nostatus_total}}</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/earthpush?status=5&title=已完成的任务" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/earthpush?status=0&title=已撤销的任务" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view> -->
		</view>
		
		<view v-show="tabShow==2" style="margin-top: 100rpx;">
			<view class="s-page-wrapper has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接垫付任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/listJd?status=1&title=未完成的任务&type=showbar&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="total.nostatus_total > 0">{{total.nostatus_total}}</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/listJd?status=5&title=已完成的任务&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/listJd?status=0&title=已撤销的任务&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="has-borderb"></view>
			<view class="s-page-wrapper has-mgt-10 has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接浏览任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/browseJd?status=1&title=未完成的任务&type=showbar" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="browse.nostatus_total > 0">{{browse.nostatus_total}}</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/browseJd?status=5&title=已完成的任务" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/browseJd?status=0&title=已撤销的任务" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<view v-show="tabShow==3" style="margin-top: 100rpx;">
			<view class="s-page-wrapper has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接垫付任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/listPinDuoDuo?status=1&title=未完成的任务&type=showbar&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="total.nostatus_total > 0">{{total.nostatus_total}}</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/listPinDuoDuo?status=5&title=已完成的任务&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/listPinDuoDuo?status=0&title=已撤销的任务&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="has-borderb"></view>
			<view class="s-page-wrapper has-mgt-10 has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接浏览任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/browsePinDuoDuo?status=1&title=未完成的任务&type=showbar" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="browse.nostatus_total > 0">{{browse.nostatus_total}}</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/browsePinDuoDuo?status=5&title=已完成的任务" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/browsePinDuoDuo?status=0&title=已撤销的任务" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<view v-show="tabShow==4" style="margin-top: 100rpx;">
			<view class="s-page-wrapper has-bg-white">
				<view class="is-size-14 has-pd-10 has-borderb">
					已接抖音任务
				</view>
				<view class="s-row">
					<navigator url="/pages/task/browseDouyin?status=1&title=未完成的任务&type=showbar&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_1.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">未完成</view>
							<view class="layui-badge-dot" v-if="browse.nostatus_total > 0">{{browse.nostatus_total}}</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/browseDouyin?status=5&title=已完成的任务&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_2.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已完成</view>
						</view>
					</navigator>
			
					<navigator url="/pages/task/browseDouyin?status=0&title=已撤销的任务&model=1" hover-class="navigator-hover" class="s-col is-col-8 is-a">
						<view class="is-flex is-column is-justify-center is-align-center has-pdlr-25 has-pdtb-8">
							<view class=" is-h1 Taskimages">
								<image src="../../static/images/task/task_3.png" mode="widthFix" class="is-response"></image>
							</view>
							<view class="has-mgt-5 has-desc-color is-size-14">已撤销</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="has-borderb"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabShow:1,
				total: {//垫付
					appeal_total: 0,
					close_total: 0,
					nostatus_total: 0,
					success_total: 0,
				},
				browse: {//浏览
					appeal_total: 0,
					close_total: 0,
					nostatus_total: 0,
					success_total: 0,
				},
				order: {//预约
					appeal_total: 0,
					close_total: 0,
					nostatus_total: 0,
					success_total: 0,
				},
				earthpush: {//地推
					appeal_total: 0,
					close_total: 0,
					nostatus_total: 0,
					success_total: 0,
				},
				trial: {
					success_total: 0,
					nostatus_total: 0,
					close_total: 0,
					appeal_total: 0
				},
				special: {
					success_total: 0,
					nostatus_total: 0,
					close_total: 0,
					appeal_total: 0
				},
				douyin: {
					success_total: 0,
					nostatus_total: 0,
					close_total: 0,
					appeal_total: 0
				},
				close_earth_push: false,
				earth_push: 0,
				userid:"",
				platform:'taobao',
				isLoading:false,
				tabDotNum:{
					taobao:0,
					jd:0,
					pinduoduo:0,
					douyin:0
				}
			}
		},
		onLoad(options) {
			uni.showLoading({
				title:"加载中"
			})
			this.close_earth_push = this.$Sysconf("close_earth_push");
			/*
			* 处理TabBarRedDot更新
			* 
			* */ 
			var userid=this.$SysUser.openid();
			this.loadData();
			console.log(userid)
			if(userid){
				this.showTabBarDotInfo();
				this.loadTabNumber();
			}
		},
		onShow() {
			
			
		},
		onPullDownRefresh: function() {
			this.loadData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			loadTabNumber(){
				let _this = this;
				var userid = this.$SysUser.openid();
				this.$Request("task/get_unfinish_tab", {
					uid: userid,
				}).then(res => {
					if (res.code == 200) {
						_this.tabDotNum = res.data;
					}
					
				});
			},
			changeTabTap(num){
				this.tabShow = num;
				if(num==1){
					this.platform = "taobao";
				}else if(num==2){
					this.platform = "jd";
				}else if(num==3){
					this.platform = "pinduoduo";
				}else{
					this.platform = "douyin"
				}
				this.loadData();
			},
			loadData: function() {
				let _this = this;
				var userid = this.$SysUser.openid();
				if (userid) {
					this.$Request("task/totalTask", {
						uid: userid,
						platform:_this.platform
					}).then(res => {
						if (res.code == 200) {
							this.total = res.data.total;//垫付
							this.browse = res.data.browse;//浏览
							this.order = res.data.order;//预约
							this.trial = res.data.trial;//自审
							this.special = res.data.special;//特别
							this.earthpush = res.data.earthpush;//地推
							this.isLoading = true;
						}
						uni.hideLoading();
					});
				}
			},
			
			/*
			* 解决TabBarRedDot无法更新变化
			* 
			* 
			* */ 
			showTabBarDotInfo: function() {
				var userid=this.$SysUser.openid()
				this.$Request('task/getTabbarDot', {
					uid: userid,
					form: 'home'
				}).then(res => {
					if (res.code == 200) {
						if (res.data.length > 0) {
							res.data.forEach(item => {
								if (item.type == 'Dot') {
									uni.showTabBarRedDot({
										index: item.index
									});
								} else if (item.type == 'Badge') {
									if(item.num>=1){
										uni.setTabBarBadge({
											index: item.index,
											text: item['num'].toString()
										});
									}else{
										uni.removeTabBarBadge({
										  index: item.index,
										})
									}
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/css/base.less";
	.active{
		color: #FA707E!important;
	}
	.active:after{
		content:"";
		display: block;
		width: 60%;
		height: 2rpx;
		position: absolute;
		bottom: 0px;
		background-color: #FA707E;
		left: 50%;
		margin-left: -30%;
	}
	.is-size-14{
		font-size: 24rpx!important;
	}
	.task-index-tab{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 999;
		border-bottom: 2rpx solid #eee;
	}
	.task-index-tab>view{
		width: 30%;
		text-align:center;
		font-size: 24rpx;
		color: #333;
		height: 100rpx;
		line-height: 100rpx;
		position: relative;
	}
	.has-bg-white{
		background-color: rgb(245, 247, 246)!important;
	}
	.layui-badge-dot {
		position: absolute;
		top: 20rpx;
		right: 60rpx;
		width: 40rpx;
		height: 40rpx;
		font-size: 20rpx;
		line-height: 40rpx;
		text-align: center;
		background: #FF5722;

	}

	.s-row .iconfont {
		color: @baseBackGroundColor;
		font-size: 60upx;
	}

	.Taskimages {
		width: 72rpx;
		height: 72rpx;
	}
</style>

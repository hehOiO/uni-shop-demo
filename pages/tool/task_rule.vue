<template>
	<view class="s-page-wrapper">
		<image src="../../static/images/rule/banner@2x.png" mode="widthFix" class="is-response"></image>
		<view class="has-mgt-10">
			<image src="../../static/images/rule/Orders.rules@2x.png" mode="widthFix" class="is-response"></image>
			<view class="has-pd-10">
				<view class="is-p is-size-16">平台采用派单机制，用户打开并登录APP后，需开启接单模式，等待系统派单;当系统有订单时，会根据如下规则综合后选择用于派单：</view>
				<view class="has-mgt-10 has-mgl-15">
					<view class="is-p">
						<view class="is-size-14">1、开启接单模式的用户</view>
						<view class="is-size-14">2、符合商家对账号的要求</view>
						<view class="is-size-14">3、符合平台对时间间隔和订单数量的要求</view>
						<view class="is-size-14">4、优先给完成率高、被投诉率低、接单少量的用户</view>
					</view>
				</view>
			</view>
			<image src="../../static/images/rule/rate@2x.png" mode="widthFix" class="is-response"></image>
			<view class="has-pd-10 has-mgt-20">
				<view class="is-p is-size-16">完成率是指你最近30天内所有完成的订单数占所有系统派送给你的订单总数百分比。</view>
				<view class="has-mgt-10 has-mgl-15">
					<view class="is-p">
						<view class="is-size-14">1、系统派单之后不操作，造成超时系统自动取消订单</view>
						<view class="is-size-14">2、用户自行取消订单</view>
						<view class="is-size-14">3、管理员撤销的订单</view>
					</view>
				</view>
			</view>
			<view class="has-pd-10 has-mgt-20">
				<view class="is-p has-base-color">维持高完成率可以保持有收入平台对商家和用户的可靠性，也会增加系统派送订单给你的优先级。</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style>
page{
	background: #FFFFFF;
}
</style>

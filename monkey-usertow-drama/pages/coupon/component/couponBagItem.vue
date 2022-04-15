<template>
	<view class="coupon-item flex" @click="handleDetail">
		<view class="flex justify-between" style="width: 100%;">
			<view class="tip-1" style='font-size: 12px;'>{{couponItem.title}}</view>
			<view class="tip-2">查看详情></view>
		</view>
		<text style='color: #F7931E;font-size: 24px;margin-top: 14px;'>价值{{couponItem.oriPrice}}元</text>
		<text style='margin-top: 11px;'>共{{couponItem.couponCount || 0}}张券</text>
		<view class="flex" style='color: #fff; margin-top: auto; flex-direction: column;padding-bottom: 20px;'>
			<view style="font-size: 14px;">
				<text style="margin-left: -16px;">￥</text>
				<text style='font-size: 34px;'>{{couponItem.price}}</text>
			</view>
			<text style="position: absolute;right: 4px;bottom: 40px;" >剩余{{couponItem.monthPurchasesNumber}}次</text>
			<text>有效期：{{couponItem.validityStartTime}}-{{couponItem.validityEndTime}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			couponItem: {
				type: Object,
				default: () => {}
			},
		},
		methods: {
			handleDetail(){
				this.$emit('detail', this.couponItem)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-item {
		margin: 30px auto 0;
		width: 164px;
		height: 200px;
		font-size: 10px;
		padding-top: 1px;
		flex-direction: column;
		color: #666;
		position: relative;
		background: url(https://monkeyoss-prod.oss-cn-hangzhou.aliyuncs.com/monkeyoss-prod/2021-11-03/70adcdd45f134efdbb0feff58ef2bb1c/按钮@2x.png) no-repeat;
		background-size: contain;

		.tip-1{
			margin: 9px 0 0 20px;
		}
		.tip-2{
			margin: 9px 10px 0 0;
			color: #999;
		}
	}
</style>

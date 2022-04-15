<template>
	<view class="flex align-center" :style="{margin: margin}">
		<view class="line"></view>
		<view class="title">{{ title }}</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String
		},
		margin:{
			type: String
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	flex: 500rpx;
	padding-left: 15rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #333333;
	line-height: 40rpx;
}
</style>

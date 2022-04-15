<template>
	<view class="other">
		<view class="flex mb-2 other-item" v-for="item in list" :key="item.productId" @click="signUp(item.productId)">
			<view class="btn" @click.stop="signUp(item.productId)"></view>
			<view class="mr-3 image"><u-image lazy-load width="224rpx" height="190rpx" border-radius="20" :src="item.product.pic"></u-image></view>
			<view class="p2 left">
				<view class="ellipsis-main ellipsis-2 title">{{item.product.prodName}}</view>
				<view class="my-1 money">￥{{item.product.price}} 起</view>
				<view class="flex">
					<view class="mr-1 label" v-for="(lable, index) in item.product.tagName.split(',')" :key="index">{{ lable }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	methods:{
		// 去报名
		signUp(id){
			uni.navigateTo({
				url:`/pages/product/EventProductsDetail/EventProductsDetail?product_id=${id}&type=3&productType=1`
			})
		}
	},
};
</script>

<style lang="scss" scoped>
.other {
	.other-item {
		position: relative;
		width: 100%;
		height: 214rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-other.png) no-repeat;
		background-size: 100% 214rpx;
		padding: 12rpx;

		.btn {
			position: absolute;
			z-index: 999;
			width: 100rpx;
			height: 100rpx;
			// background: red;
			top: 30rpx;
			right: 12rpx;
		}
	}

	.image {
		width: 224rpx;
		height: 190rpx;
		border-radius: 20rpx;
	}

	.left {
		.title {
			width: 288rpx;
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #333333;
			line-height: 32rpx;
		}

		.money {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #f7931e;
			line-height: 40rpx;
		}

		.label {
			flex: 0 0 100rpx;
			width: 100rpx;
			height: 32rpx;
			font-size: 20rpx;
			font-weight: 500;
			color: #ffffff;
			line-height: 32rpx;
			text-align: center;
			text-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.05), 0px 0px 4rpx #ff6730;

			&:nth-of-type(odd) {
				background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/lable2.png) no-repeat;
				background-size: 100rpx 32rpx;
			}
			&:nth-of-type(even) {
				background: url(../../static/home/lable1.png) no-repeat;
				background-size: 100rpx 32rpx;
			}
		}
	}
}
</style>

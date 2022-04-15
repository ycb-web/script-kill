<template>
	<view class="subActivityContainer" :class="[!!notShowType ? 'heightShort' : 'heightLong']">
		<view class="u-image_z" :style="{height:(!!notShowType?'290rpx':'274rpx')}">
			<image class="u-image" :src=" item.product.pic || item.pic || item.product.showImg" mode="widthFix"></image>
		</view>
		<view class="flex justify-between px-2 my-1"
			v-if="(item.status !== 1 && item.product === undefind) || (item.product !== undefind && item.status)">
			<view class="money">已满员</view>
			<view class="number">仅剩 0 份</view>
		</view>
		<view class="flex justify-between px-2 my-1" v-else>
			<view class="money moneyNum"><text
					class="payImg">￥</text>{{item.product.price || item.price || item.lowPrice  || 0}}.00
			</view>
			<!-- <view class="number">仅剩 {{(item.product.totalStocks - (item.product.soldNum || 0)) || item.totalStocks - item.soldNum || 0 }} 份</view> -->
			<view class="number" v-if="item.product">已售：{{item.product.actualTotalStocks }} </view>
			<view class="number" v-else>已售: {{item.actualTotalStocks }} </view>
		</view>
		<view class="ellipsis-main ellipsis-2 px-2 title" style="color: #8B8B94; margin-bottom: 14rpx;">
			{{item.prodName || item.product.title || item.product.prodName}}
		</view>
		<!-- <view class="flex px-2" v-if="item.product && item.product.tagName">
			<view class=" label ellipsis-1" v-for="(label, index) in product_label(item.product.tagName)" :key="index">
				{{label}}
			</view>
		</view> -->
		<view class="flex px-2 goodType" v-if="!notShowType">
			<view class=" label ellipsis-1" v-for="(label, index) in tagNameList" :key="index">
				{{label}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item', 'notShowType'],
		data() {
			return {
				tagNameList: ['古风', '悬疑', '商战'],
			}
		},
		computed: {
			product_label() {
				return label => {
					const data = label.split(',').filter((item, index) => {
						return index < 2
					})
					return data
				}
			},
		},
		methods: {
			//商品类型：1:活动2:实物3:门票（购物车下单时默认为2）
			goActivity(product_id, curr_price, product_type) {
				let nextPage = 'EventProductsDetail'
				if (product_type == 15) {
					uni.navigateTo({
						url: `/pagesA/tickets/tickets?product_id=${product_id}&type=3&productType=${product_type}`
					});
					return
				}
				// switch (product_type) {
				// 	case 1:
				// 		nextPage = 'EventProductsDetail';
				// 		break;
				// 	case 2:
				// 		nextPage = 'GoodsProductDtails';
				// 		break;
				// 	case 3:
				// 		nextPage = 'TicketProductDetails';
				// 		break;
				// }
				uni.navigateTo({
					url: `/pages/product/${nextPage}/${nextPage}?product_id=${product_id}&type=3&productType=${product_type}`
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.heightLong {
		height: 492rpx;
	}

	.heightShort {
		height: 438rpx!important;
	}

	.goodType {
		position: absolute;
		bottom: 16rpx;
		left: 0rpx;
	}

	.moneyNum {
		font-family: DINAlternate-Bold;
		font-size: 36rpx;
		font-weight: normal;
		line-height: 28rpx;
		color: #FF5F17;
	}

	.payImg {
		font-family: DINAlternate-Bold;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		color: #FF5F17;
	}

	.subActivityContainer {
		position: relative;
		flex: 0 0 330rpx;
		width: 331rpx;

		// height: 492rpx;
		border-radius: 20rpx;
		background: linear-gradient(0deg, #070000 0%, #070000 0%, #121632 100%, #121632 100%), #D7D7D7;

		padding-bottom: 20rpx;
		box-shadow: 0 0 12rpx 0px rgba(0, 0, 0, 0.05);
		overflow: hidden;

		.u-image_z {
			width: 332rpx;
			// height: 290rpx;
			position: relative;
			overflow: hidden;
			border-radius: 20rpx 20rpx 0 0;
			overflow: hidden;

			.u-image {
				border-radius: 20rpx 20rpx 0 0;
				position: absolute;
				width: 100%;
				// height: 290rpx;
			}
		}

		.money {
			font-weight: 500;
			color: #FF5F25;
			line-height: 40rpx;
			text-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.05);
		}

		.number {
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			font-weight: normal;
			line-height: 24rpx;
			color: #FFC17A;
		}

		.title {
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			font-weight: normal;
			line-height: 40rpx;
			letter-spacing: 0px;
			color: #FFFFFF !important;
		}

		.label {
			margin-right: 10rpx;
			text-align: center;
			width: 80rpx;
			height: 32rpx;
			border-radius: 10rpx;
			background: rgba(255, 193, 122, 0.25);
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			font-weight: normal;
			line-height: 32rpx;
			text-align: center;
			color: #FFC17A;
			// &:nth-of-type(odd) {
			// 	background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/lable2.png) no-repeat;
			// 	background-size: 100rpx 32rpx;
			// }

			// &:nth-of-type(even) {
			// 	background: url(../../static/home/lable1.png) no-repeat;
			// 	background-size: 100rpx 32rpx;
			// }
		}
	}
</style>

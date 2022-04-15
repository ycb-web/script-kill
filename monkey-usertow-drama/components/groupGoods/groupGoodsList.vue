<template>
	<view>
		<view class="flex listBox mb-3" v-for="(item, index) in list" :key="item.id">
			<view class="item-image"><u-image lazy-load width="224rpx" height="224rpx" border-radius="20" :src="item.logo"></u-image></view>
			<view class="item-word px-2 pt-1">
				<view class="item-title ellipsis-main ellipsis-2">{{ item.zone_product.product.title || '' }}</view>
				<!-- {{ item.zone_product.product.product_type }} -->
				<view class="flex justify-between mt-4">
					<view>
						<view class="btn-bj mb-1">{{ item.spell_group_people || 1 }}人团</view>
						<view class="item-money">
							<text class="price mr">￥</text>
							<text class="price mr-1">{{ item.zone_product.spell_price || 0 }}</text>
							<text class="purchase mr text-line-through">￥</text>
							<text class="purchase text-line-through">{{ item.zone_product.curr_price || 0 }}</text>
						</view>
					</view>
					<view class="item-btn" @click="toGoodsInfo(item, index)">
						<text>{{ item.zone_product.product.sales || 0 }}已售</text>
						<text>马上拼</text>
					</view>
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
	data() {
		return {};
	},
	methods: {
		toGoodsInfo(item) {
			if (item.status === 0) {
				uni.showToast({
					title: '当前拼团未开始',
					icon: 'none'
				});
				return;
			}
			this.navTo(item.zone_product.product.product_type, item.zone_product.product.id, item.zone_product.activity_id);
		},
		navTo(product_type, product_id, id) {
			// if (product_type === 1) {
				// 活动
				uni.navigateTo({
					url: `/pages/product/EventProductsDetail/EventProductsDetail?product_id=${product_id}&id=${id}&type=2&productType=${product_type}`
				});
			// 	return;
			// }
			// if (product_type === 2) {
			// 	// 商品
			// 	uni.navigateTo({
			// 		url: `/pages/product/GoodsProductDtails/GoodsProductDtails?product_id=${product_id}&id=${id}&type=2`
			// 	});
			// 	return;
			// }
			// if (product_type === 3) {
			// 	// 门票
			// 	uni.navigateTo({
			// 		url: `/pages/product/TicketProductDetails/TicketProductDetails?product_id=${product_id}&id=${id}&type=2`
			// 	});
			// 	return;
			// }
		}
	}
};
</script>

<style lang="scss" scoped>
.listBox {
	width: 690rpx;
	// height: 224rpx;
	background: #ffffff;
	box-shadow: 0px 0px 12rpx 0rpx rgba(0, 0, 0, 0.07);
	border-radius: 20rpx;
}
.item-image {
	flex: 0 0 224rpx;
	width: 224rpx;
	height: 224rpx;
	border-radius: 20rpx;
	// image {
	// 	width: 224rpx;
	// 	height: 224rpx;
	// 	border-radius: 20rpx;
	// }
}
.item-word {
	flex: 0 0 446rpx;
}
.item-title {
	font-size: 28rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #333333;
	line-height: 40rpx;
}

.btn-bj {
	width: 104rpx;
	height: 32rpx;
	background: #fff6eb;
	border-radius: 17rpx;
	border: 2rpx solid #ffe5c7;
	font-size: 20rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #f7931e;
	line-height: 32rpx;
	text-align: center;
}

.item-money {
	.price {
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #e03c3c;
		line-height: 40rpx;
	}

	.purchase {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 34rpx;
	}
}
.mr {
	margin-right: 5rpx;
}

.item-btn {
	width: 144rpx;
	height: 70rpx;
	background: url(../../static/goods-button.png);
	background-size: 144rpx 70rpx;
	text {
		display: block;
		text-align: center;
		&:first-child {
			font-size: 18rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #ffefdd;
			line-height: 26rpx;
		}
		&:last-child {
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #ffffff;
			line-height: 34rpx;
		}
	}
}
</style>

<template>
	<view class="boxList">
		<view class="flex mb-2 list" v-for="item in list" :key="item.id">
			<view class="mr-2 image"><image lazy-load class="u-image"  :src="item.product.show_img"></image></view>
			<view class="p-2 w-100">
				<view class="ellipsis-1 title">{{ item.product.title }}</view>
				<view class="money my-2">
					<text class="mr-1">¥ {{ item .productDetails.seconds_kill_price || 0 }}</text>
					<text class="text-line-through">¥ {{ item .productDetails.curr_price || 0 }}</text>
				</view>
				<view class="flex justify-between mt-2">
					<view class="progress">
						<u-line-progress active-color="#FFAF3D" inactive-color="#FFEFDD" :percent="percent(item)" striped-active round :show-percent="false"></u-line-progress>
						<view class="number">
							数量：{{ item .productDetails.seconds_kill_num || 0 }}/{{
								item .productDetails.seconds_kill_stock || 0
							}}
						</view>
					</view>
					<view class="btn" @click="navTo(item.product, item.activity_id)"><view class="btn_Z">立即抢购</view></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import lzButton from '@/components/common/button.vue';
export default {
	components: { lzButton },
	props: {
		list: {
			type: Array,
			default: () => []
		},
		// 时间段状态：0:未开始1:进行中2:已结束
		status:{
			type:Number
		},
		// 结束时间
		end_time:{
			type: String
		}
	},
	computed: {
		percent() {
			return item => {
				return item .productDetails.seconds_kill_num / item .productDetails.seconds_kill_stock * 100;
			};
		}
	},
	methods: {
		navTo(product, id) {
			if (this.status === 0) {
				uni.showToast({
					title:'秒杀暂未开始',
					icon:'none'
				})
				return
			}
			if (this.status === 2) {
				uni.showToast({
					title:'秒杀已结束',
					icon:'none'
				})
				return
			}
			const product_type = product.product_type
			const product_id = product.id
			// if (product_type === 1) {
				// 活动
				uni.navigateTo({
					url: `/pages/product/EventProductsDetail/EventProductsDetail?product_id=${product_id}&type=1&id=${id}&end_time=${this.end_time}&productType=${product_type}`
				});
				// return;
			// }
			// if (product_type === 2) {
			// 	// 商品
			// 	uni.navigateTo({
			// 		url: `/pages/product/GoodsProductDtails/GoodsProductDtails?product_id=${product_id}&type=1&id=${id}&end_time=${this.end_time}`
			// 	});
			// 	return;
			// }
			// if (product_type === 3) {
			// 	// 门票
			// 	uni.navigateTo({
			// 		url: `/pages/product/TicketProductDetails/TicketProductDetails?product_id=${product_id}&type=1&id=${id}&end_time=${this.end_time}`
			// 	});
			// 	return;
			// }
		}
	}
};
</script>

<style lang="scss" scoped>
	.u-image{
		border-radius: 20rpx;
		width:224rpx; 
		height:224rpx;
	}
	.btn_Z{
		width: 160rpx;
		height: 54rpx;
		line-height: 54rpx;
		text-align: center;
		background: url(../../static/icon2.png);
		background-size: 100% 100%;
		font-size: 24rpx;
		color: #FFFFFF;
	}
.boxList {
	font-family: PingFangSC-Regular, PingFang SC;
	.w-100 {
		width: 100%;
	}
	.image {
		width: 224rpx;
		height: 224rpx;
	}
	.list {
		width: 690rpx;
		height: 224rpx;
		background: #ffffff;
		border-radius: 20rpx;
	}
	.title {
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
	}
	.money {
		text {
			font-family: PingFangSC-Regular, PingFang SC;
			&:first-child {
				font-size: 32rpx;
				font-weight: 500;
				color: #e03c3c;
				line-height: 40rpx;
			}

			&:last-child {
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				line-height: 34rpx;
			}
		}
	}

	.progress {
		width: 170rpx;
	}

	.number {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #666666;
		line-height: 28rpx;
		margin-top: 5rpx;
	}

	.btn {
		width: 160rpx;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 24rpx;
	}
}
</style>

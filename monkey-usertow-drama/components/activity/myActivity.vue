<template>
	<view class="myActivity">
		<view class="box-shadow flex mb-2" v-for="item in list" :key="item.id">
			<view class="image">
				<u-image lazy-load width="224rpx" height="190rpx" border-radius="20" :src="item.pic"></u-image>
			</view>
			<view class="flex direction-column align-start justify-between p-2 left"
				@click="navTo(`/pagesA/order/activeOrderDet?ids=${item.orderNumber}&type=${item.status}`)">
				<view class="flex justify-between title">
					<view class="ellipsis-main ellipsis-2">{{item.orderItemDtos[0].prodName.split(' ')[0]}}</view>
					<view class="white-space">{{filter.orderStatus(item.status)}}</view>
				</view>
				<view class="adderss">
					<view>{{item.orderItemDtos[0].prodName.split(' ')[1]}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import filter from "../../filters/index.js";
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				filter,
			};
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.myActivity {
		.image {
			width: 224rpx;
			height: 190rpx;
			border-radius: 20rpx;
		}

		.left {
			height: 190rpx;

			.title {
				// flex: 0 0 450rpx;
				width: 420rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;

				view {
					&:last-child {
						font-size: 24rpx;
						font-weight: 500;
						color: #E03C3C;
						line-height: 34rpx;
					}
				}
			}

			.adderss {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #999999;
				line-height: 34rpx;
			}
		}
	}
</style>

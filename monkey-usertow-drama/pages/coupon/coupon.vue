<template>
	<view class="m_app">
		<loading v-if="loadUp" status="loading" />
		<view class="main" v-if="list.length > 0">
			<view class="coupon-item flex" v-for="item in list" @tap="getCouPon(item)" :key="item.id">
				<view class="coupon-item-left " v-if="item.discountType == 0">
					<view class="coupon-item-left_z  flex align-end">
						<view class="price ellipsis-1">
							¥
							<text class="price_Z">{{item.couponPrice}}</text>
						</view>
					</view>
					<view class="FullReduction">满{{item.useMinPrice}}元可用</view>
				</view>
				<view class="coupon-item-left " v-else style="color: #f8b62d;">
					<text class="left_z ellipsis-main ellipsis-1" style="color: #f8b62d;font-size: 48rpx;font-weight: 600;">{{item.discountValue}}</text>折
				</view>
				<view class="coupon-item-right flex justify-between">
					<view class="coupon-item-right_left">
						<view class="coupon-item-title  ellipsis-main ellipsis-1">{{item.name}}</view>
						<view class="coupon-item-date" :class="{'coupon-item-date_act': item.status !== 0}">{{item.useEndTime.split('T')[0]}}至{{item.useEndTime.split('T')[0]}}</view>
						<view class="coupon-item-desc" :class="{'coupon-item-date_act': item.status !== 0}">{{item.prodRule === 0 ? '全场通用' : '指定商品可用'}}</view>
					</view>
					<view class="coupon-item-right_right">立即使用</view>
				</view>
			</view>
		</view>
		<u-empty v-else src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
		<loading status="loading"  v-if="loadDown" />
		<loading status="noMore" v-if="noMore" />
	</view>
</template>

<script>
import loading from '@/components/loading/uni-load-more.vue';
export default {
	components: {
		loading
	},
	data() {
		return {
			coupon_show: false,
			page: {
				pageNum: 1,
				pageSize: 10,
				total: 0,
			},
			loadUp: true, // 刷新
			loadDown: false, // 下拉
			noMore: false, // 无数据
			status: 'loading', // 下面猴子状态
			list: [],
			ids:0,
		};
	},
	
	onLoad(e) {
    this.get_my_coupons(e.ids);
	},
	methods: {
		getCouPon(item){
			if(item.coupons_type == 2 && item.full > uni.getStorageSync("shopCarorderPrice")){
				
				uni.showToast({
					icon:'none',
					title:'商品金额不足，无法使用优惠券'
				})
			}else{
				uni.setStorageSync("useCarCoupon",item)
				uni.navigateBack()
			}
		},
		get_my_coupons(num) {
			this.$api.get_product_details_coupons_list({
				merchantId: uni.getStorageSync('merchantId'),
				productId: num
			}).then(res => {
				this.list = res.data
			}).finally(() => {
				this.loadDown = false;
				this.loadUp = false;
			});
		}
	}
};



</script>

<style lang="scss" scoped>
.m_app{
	background-color: #F7F7F7;
	overflow: hidden;
	height: 100vh;
}
.coupon-item {
	margin: 20rpx auto;
	width: 690rpx;
	height: 188rpx;
	background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-coupon-background.png) no-repeat;
	background-size: 690rpx 188rpx;
	.coupon-item-left {
		width: 243rpx;
		text-align: center;
		.coupon-item-left_z {
			width: 180rpx;
			margin: 0 auto;
			color: #f7931e;
			// .Symbol{
			// 	font-size:28rpx;
			// }
			.price {
				margin: 0 auto;
				.price_Z {
					font-size: 48rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
				}
				margin-bottom: 10rpx;
			}
		}
		.coupon-item-left_z_act {
			color: #ffc27a;
		}
		.FullReduction {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #f7931e;
		}
		.FullReduction_act {
			color: #ffc27a;
		}
	}
	.coupon-item-right {
		width: 400rpx;
		margin-left: 20rpx;
		.coupon-item-right_left {
			width: 250rpx;
			.coupon-item-title {
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #333333;
			}
			.coupon-item-title_act {
				color: #999999;
			}
			.coupon-item-date {
				margin: 5rpx 0;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
			}
			.coupon-item-date_act {
				color: #999999;
			}
			.coupon-item-desc {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #f8b62d;
			}
			.coupon-item-desc_act {
				color: #ffefdd;
			}
		}
		.coupon-item-right_right {
			width: 118rpx;
			height: 48rpx;
			line-height: 48rpx;
			text-align: center;
			background: url(../../static/icon2.png) no-repeat;
			background-size: 118rpx 48rpx;
			color: #fff;
			font-size: 20rpx;
		}
		.coupon-item-right_right_act {
			width: 118rpx;
			height: 48rpx;
			line-height: 48rpx;
			text-align: center;
			background: url(../../static/mini-button-act.png) no-repeat;
			background-size: 118rpx 48rpx;
			color: #ffc27a;
			font-size: 20rpx;
		}
	}
}
</style>

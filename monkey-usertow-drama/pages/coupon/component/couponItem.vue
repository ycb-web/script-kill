<template>
	<view class="coupon-item flex"
		:style="{backgroundImage: 'url(' + (!!toReceive ? imageURL[0] : imageURL[couponItem.status]) + ')'}">
		<view class="coupon-item-left " v-if="couponItem.discountType === 0">
			<view class="coupon-item-left_z  flex align-end"
				:class="{'coupon-item-left_z_act': couponItem.status !== 0}">
				<view class="price ellipsis-1">
					¥
					<text class="price_Z">{{couponItem.couponPrice}}</text>
				</view>
			</view>
			<view class="FullReduction  " :class="{'FullReduction_act': couponItem.status !== 0}">
				满{{couponItem.useMinPrice}}元可用</view>
		</view>
		<view class="coupon-item-left " v-else style="color: #f8b62d;">
			<text class="left_z ellipsis-main ellipsis-1"
				style="color: #f8b62d;font-size: 48rpx;font-weight: 600;">{{couponItem.couponInfo.discount}}</text>折
		</view>
		<view class="coupon-item-right  ">
			<view class="coupon-item-right_left">
				<view class="coupon-item-title  ellipsis-main ellipsis-1"
					:class="{'coupon-item-title_act': couponItem.status !== 0}" style="color: #FFFFFF;">
					{{couponItem.title}}</view>
				<view class="flex justify-between align-end pt-2 ">
					<view class="">
						<view class="coupon-item-date" v-if="toReceive"
							:class="{'coupon-item-date_act': couponItem.status !== 0}">{{couponItem.receiveEndTime}}
						</view>
						<view class="coupon-item-date" v-else
							:class="{'coupon-item-date_act': couponItem.status !== 0}">有效期：{{couponItem.useEndTime}}
						</view>
						<!-- <view class="coupon-item-desc" :class="{'coupon-item-date_act': couponItem.status !== 0}">
							{{couponItem.prodRule === 0 ? '全场通用' : '指定商品可用'}}</view> -->
					</view>
					<view class="" style="height: auto;">
						<view class="coupon-item-right_right" v-if="toReceive" @click="receive">领取</view>
						<view class="coupon-item-right_right" v-else-if="couponItem.status === 0"
							@click="navTo(`/pages/coupon/couponGoods?id=${couponItem.couponId}`)">立即使用</view>
						<view class="coupon-item-right_right_act" v-else-if="couponItem.status === 1">已使用</view>
						<view class="coupon-item-right_right_act" v-else>已过期</view>
					</view>
				</view>
			</view>

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
			toReceive: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				imageURL: [
					'../../../static/personal/coupon-no-use.png',
					'../../../static/personal/coupon-used.png'
				]
			}
		},
		methods: {
			navTo(url) {
				console.log(url)
				uni.navigateTo({
					url
				})
			},
			async receive() {
				const param = {}
				if (this.couponItem.userRule == 2 && this.couponItem.couponUserId) {
					param.couponUserIds = [this.couponItem.couponUserId]
				} else {
					param.couponIds = [this.couponItem.id]
				}
				const res = await this.$api.manual_coupon_collection(param)
				if (res.status === 200) {
					uni.showToast({
						title: '领取成功',
						icon: 'success'
					})
					this.$emit('received', this.couponItem.id)
				} else {
					uni.showToast({
						title: res.message || '领取失败',
						icon: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-item {
		position: relative;
		margin: 30rpx auto;
		width: 690rpx;
		height: 188rpx;
		// background: url(../../../static/personal/coupon-no-use.png.png) no-repeat;
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
					font-family: PingFangSC-Medium;
					font-weight: 500;
					line-height: NaNpx;
					text-align: center;
					letter-spacing: 0px;
					color: #FF5F17;

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
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				font-weight: normal;
				letter-spacing: 0px;
				color: #FFC17A;
			}

			.FullReduction_act {
				color: #ffc27a;
			}
		}

		.coupon-item-right {
			width: 400rpx;
			margin-left: 20rpx;

			.coupon-item-right_left {

				// width: 250rpx;
				.coupon-item-title {
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					font-weight: normal;
					letter-spacing: 0px;
					color: #FFFFFF;
				}

				.coupon-item-title_act {
					color: #999999;
				}

				.coupon-item-date {
					margin: 5rpx 0;
					font-family: PingFangSC-Regular;
					font-size: 20rpx;
					font-weight: normal;
					letter-spacing: 0px;
					color: #A4A4A4;
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
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 36rpx;
				height: 160rpx;
				text-align: center;
				// background: url(../../../static/coupon_btn.png) no-repeat;
				background-size: 118rpx 48rpx;
				font-size: 28rpx;
				color: #FFFFFF;
				letter-spacing: 14rpx;
				writing-mode: vertical-lr;
			}

			.coupon-item-right_right_act {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 36rpx;
				text-align: center;
				height: 160rpx;
				// background: url(../../../static/mini-button-act.png) no-repeat;
				background-size: 118rpx 48rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				color: #757575;
				writing-mode: vertical-lr;
				letter-spacing: 14rpx;
			}
		}
	}
</style>

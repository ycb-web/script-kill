<template>
	<view class="m_app">
		<Header title='我的优惠券'></Header>
		<view class="header">
			<!-- <view class="header-inp flex">
				<view class="header-inp-left">口令：</view>
				<input class="header-inp-input" placeholder-style="color:#88CCA8;font-size: 24rpx;" type="text"
					v-model="password" placeholder="请输入口令" />
				<view class="header-inp-btn" @click="password_exchange_coupon">兑换</view>
			</view> -->
			<view class="header-switch flex justify-around">
				<view class="switch-item" :class="switch_index == index ? 'switch-item-act' : ''"
					v-for="(item, index) in header_switch" @click="click_switch(index)" :key="index">
					{{ item }}
				</view>
			</view>
		</view>
		<view class="main" v-if="availableCoupons.length > 0">
			<couponItem v-for="(item,index) in availableCoupons" :couponItem="item" :toReceive="switch_index === 0"
				:key="item.id" @received='handleReceived' />
		</view>
		<u-empty v-if="loading == 'onMore'&&availableCoupons.length == 0"
			src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据"
			icon-size="230" color="#333">
		</u-empty>
		<u-mask :show="coupon_show" @click="coupon_show = false">
			<view class="exchange">
				<image class="exchange_img" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/coupon-exchange.png"
					mode=""></image>
				<view class="exchange-top">
					<view class="exchange-top-title">兑换成功</view>
					<view class="exchange-top-main">恭喜你！成功兑换优惠券</view>
					<view class="exchange-top-Tips">「{{coupon_name}}」</view>
				</view>
				<view class="exchange-btn">关闭</view>
			</view>
		</u-mask>
		<!-- <loading :status="loading" v-if="!(list.length == 0 && loading == 'onMore')" /> -->
	</view>
</template>

<script>
	import loading from '@/components/loading/uni-load-more.vue';
	import couponItem from './component/couponItem.vue';
	export default {
		components: {
			couponItem,
			loading
		},
		computed: {
			availableCoupons() {
				if (!this.list) return this.list
				return this.list.filter(item => item.status != 3)
			}
		},
		data() {
			return {
				password: '', // 优惠券口令
				coupon_show: false,
				switch_index: 0, //切换的索引
				header_switch: ['可使用', '已使用', '已过期', ], //切换的数据
				page: {
					pageNum: 1,
					pageSize: 10,
					total: 0,
				},
				loadUp: true, // 刷新
				loadDown: false, // 下拉
				noMore: false, // 无数据
				loading: 'loading', // 下面猴子状态
				list: [],
				coupon_name: '', // 兑换的优惠券名称
				merchantId: '', //商户ID
				pageSize1: 20,
				pageNum1: 1,
			};
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.list = []
			this.loading = "loading"
			this.page.pageNum = 1
			if (this.switch_index === 0) {
				this.getRecieve();
			} else {
				this.get_my_coupons()
			}
		},
		onReachBottom() {
			if (this.page.total <= this.list.length) return;

			this.loading = 'loading'
			this.page.pageNum++
			if (this.switch_index === 0) {
				this.getRecieve();
			} else {
				this.get_my_coupons()
			}
		},
		onLoad(e) {
			this.merchantId = uni.getStorageSync('merchantId') || null;
			this.page.pageNum1 = 1;
			const index = e.index
			if (index) {
				this.click_switch(index)
			} else {
				this.getRecieve();
			}
		},
		methods: {
			// 切换事件
			click_switch(index) {
				this.switch_index = index;
				this.list = [];
				this.loading = "loading";
				if (index === 0) {
					this.page.pageNum1 = 1;
					this.getRecieve();
				} else {
					this.page.pageNum = 1;
					this.get_my_coupons()
				}
			},
			handleReceived(item) {
				this.list = []
				this.getRecieve()
			},
			getRecieve() {
				this.$api.get_not_received_coupons({
					rows: this.pageSize1,
					start: (this.pageNum1 - 1) * this.pageSize1,
					merchantId: this.merchantId,
				}).then(res => {
					this.page.total = res.data.total;
					if (this.page.pageNum1 - 1 === 1) {
						this.list = res.data.record
					} else {
						this.list.push(...res.data.record)
					}
					if (res.data.record.length < this.page.pageSize1 || !this.page.pageSize1) {
						this.loading = "onMore"
					} else {
						this.loading = "more"
					}
				}).finally(() => {
					this.loadDown = false;
					this.loadUp = false;
				});
			},
			get_my_coupons() {
				this.$api.get_my_coupons({
					rows: this.page.pageSize,
					start: (this.page.pageNum - 1) * this.page.pageSize,
					isExpire: this.switch_index == 2 ? 1 : 0,
					status: this.switch_index - 1
				}).then(res => {
					this.page.total = res.data.total
					if (this.page.pageNum === 1) {
						this.list = res.data.record
					} else {
						this.list.push(...res.data.record)
					}
					if (res.data.record.length < this.page.pageSize) {
						this.loading = "onMore"
					} else {
						this.loading = "more"
					}
				}).finally(() => {
					this.loadDown = false;
					this.loadUp = false;
				});
			},
			password_exchange_coupon() {
				this.$api.password_exchange_coupon({
					couponId: this.password
				}).then(res => {
					if (res.status === 200) {
						this.coupon_name = res.data.coupon_name;
						this.coupon_show = true
						this.get_my_coupons();
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.m_app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f7f7f7;
		background: linear-gradient(0deg, #1F113F 3%, #1F113F 3%, #121632 100%, #121632 100%);
		padding-top: 170rpx;

		.header {
			width: 750rpx;
			// height: 228rpx;
			overflow: hidden;
			// background: url(../../static/coupon-topbackground.png) no-repeat;
			border-top: 0.5rpx solid rgba(165, 168, 255, 0.2);
			border-bottom: 0.5rpx solid rgba(165, 168, 255, 0.2);
			.header-inp {
				position: relative;
				margin: 30rpx auto;
				width: 690rpx;
				height: 85rpx;
				background-color: #078944;
				border-radius: 100rpx;

				.header-inp-left {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
					margin-left: 25rpx;
				}

				.header-inp-input {
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #88cca8;
				}

				.header-inp-btn {
					position: absolute;
					right: 6rpx;
					width: 152rpx;
					height: 56rpx;
					text-align: center;
					line-height: 56rpx;
					background: #ffffff;
					border-radius: 44rpx;
					color: #038e45;
				}
			}

			.header-switch {
				padding-top: 8px;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #ffffff;
				background-color: transparent;
				.switch-item {
					padding-bottom: 26rpx;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					font-weight: normal;
					line-height: 20px;
					text-align: center;
					letter-spacing: 0px;
					color: #E7E7E7;
				}

				.switch-item-act {
					font-size: 35rpx;
					background: url(../../static/coupon-stars.png) no-repeat;
					background-position: 50% 60rpx;
					font-family: PingFangSC-Medium;
					font-size: 16px;
					font-weight: 500;
					line-height: 22px;
					letter-spacing: 0px;
					color: #FFFFFF;
				}
			}
		}

		.main {
			// min-height: 100vh;
			overflow: hidden;
		}

		.exchange {
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 574rpx;
			height: 768rpx;

			.exchange_img {
				width: 574rpx;
				height: 768rpx;
			}

			.exchange-btn {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 70rpx;
				width: 300rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: url(../../static/big-button.png) no-repeat;
				background-size: 300rpx 80rpx;
				color: #ffffff;
			}

			.exchange-top {
				position: absolute;
				top: 140rpx;
				left: 50%;
				transform: translateX(-50%);
				text-align: center;

				.exchange-top-title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.exchange-top-main {
					margin: 10rpx 0;
					width: 442rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #f7931e;
				}

				.exchange-top-Tips {
					width: 442rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}
			}
		}
	}
</style>

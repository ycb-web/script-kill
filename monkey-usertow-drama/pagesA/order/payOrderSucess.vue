<template>
	<view class="app">
		<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-order-icon41.png" mode="aspectFit" class="sucessImg"></image>
		<div class="payTit">订单支付成功</div>
		<div class="payPrice ta-c pt-20">¥{{ money }}</div>
		<view class="btns flex justSb">
			<div class="orderBtn f24 c-fff ta-c" @tap="toOrder()">查看订单</div>
			<div class="orderBtn f24 c-fff ta-c nosucess" @tap="onAround()">再去逛逛</div>
		</view>
		<!-- <view class="love mr-b30"><image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/love.png" mode=""></image></view> -->
		<!-- <view class="bs-bb p30"><activity-list v-if="activityData.length > 0" :list="activityData"></activity-list></view> -->
	</view>
</template>

<script>
import activityList from '@/components/activity/activityList.vue';
export default {
	components: { activityList },
	data() {
		return {
			// 活动数据
			activityData: [],
			money: 0,
			id: '', // 订单id
			type: '',
			orderNumber: '',
			product_type:1,
			page: {
				pageNum: 1,
				pageSize: 12
			}
		};
	},
	onLoad({ money, id, type ,product_type, orderNumber}) {
		this.money = money;
		this.orderNumber = orderNumber
		this.id = id;
		this.type = type;
		console.log(this.id);
		this.product_type = product_type
		// this.get_product_list();
	},
	methods: {
		turnTo(urls) {
			uni.navigateTo({
				url: urls
			});
		},
		// 获取活动商品
		get_product_list() {
			this.$api
				.get_product_list({
					range: [this.page.pageNum, this.page.pageSize],
					city_id: uni.getStorageSync('chooseCity').id,
					// nav_one_cate_id: this.nav_one_cate_id,
					product_type: 1 // 商品类型：1:活动2:实物（好物） 3:门票
				})
				.then(res => {
					this.activityData = res.data.data;
				});
		},
		toOrder() {
			if (this.product_type == 2) {
				uni.navigateTo({
					url: `/pagesA/order/activeOrderDet?ids=${this.orderNumber}&type=0`
				});
			} else {
				uni.navigateTo({
					url: `/pagesA/order/activeOrderDet?ids=${this.orderNumber}&type=0`
				});
			}
		},
		onAround(){
			uni.getStorageSync('type', this.type)
			uni.switchTab({
				url:"/pages/seek/seek"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.love {
	text-align: center;
	image {
		width: 278rpx;
		height: 40rpx;
	}
}
.btns {
	padding: 50rpx 100rpx;
	.orderBtn {
		width: 214rpx;
		border-radius: 32rpx;
		height: 64rpx;
		line-height: 64rpx;
		background: #ccc;
		color: #666666;
		background: url(../../static/icon43.png) top center no-repeat;
		background-size: 100% 100%;
		color: #ffffff;
		&.nosucess {
			color: #f7931e;
			background: url(../../static/icon44.png) top center no-repeat;
			background-size: 100% 100%;
		}
	}
}
.app {
	background-color: #ffffff;
	border-top: 1px solid #eeeeee;
	.sucessImg {
		width: 326rpx;
		height: 256rpx;
		display: block;
		margin: 100rpx auto 70rpx;
	}
	.payTit {
		font-size: 32rpx;
		text-align: center;
		font-weight: 500;
		color: #333333;
		line-height: 44rpx;
	}
	.payPrice {
		font-size: 24rpx;
		font-weight: 500;
		color: #e03c3c;
		line-height: 34rpx;
	}
}
</style>

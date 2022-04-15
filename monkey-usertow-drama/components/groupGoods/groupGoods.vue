<template>
	<view>
		<view class="flex listBox mb-3 p-2 border-box" v-for="item in list" :key="item.id">
			<view class="item-image"><u-image lazy-load width="184rpx" height="184rpx" border-radius="20" :src="item.show_img"></u-image></view>
			<view class="item-word px-2 pt-1">
				<view class="item-title ellipsis-main ellipsis-2">{{ item.title }}</view>
				<view class="flex justify-between mt-4">
					<view>
						<text class="btn-bj mb-1 px-2">已拼{{item.sales}}</text>
						<view class="item-money">
							<text class="price mr">￥</text>
							<text class="price mr-1">{{item.skuData.price.spell_group_price || 0}}</text>
							<!-- <text class="purchase mr text-line-through">￥</text> -->
							<text class="purchase">单价买 {{item.skuData.price.curr_price || 0}}</text>
						</view>
					</view>
					<!-- <view class="item-btn" @click="toGoodsInfo(item.id)">
						<text>1242已售</text>
						<text>马上拼</text>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array
		}
	},
	data(){
		return{}
	},
	methods:{
		toGoodsInfo(){
			uni.navigateTo({
				url:'/pages/groupGoods/goodsInfo'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.listBox {
	width: 690rpx;
	height: 224rpx;
	background: #ffffff;
	box-shadow: 0px 0px 12rpx 0rpx rgba(0, 0, 0, 0.07);
	border-radius: 20rpx;
}
.item-image {
	flex: 0 0 184rpx;
	width: 184rpx;
	height: 184rpx;
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
	// width: 150rpx;
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

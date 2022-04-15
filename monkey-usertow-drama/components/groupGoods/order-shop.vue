<template>
	<view class="box-shadow shop">
		<view class="flex header p-2 border-bottom">
			<image class="mr-2" :src="shop_goods.skuData.store_info.avatar" mode=""></image>
			<text>{{shop_goods.skuData.store_info.name}}</text>
		</view>
		<view class="body flex p-2 border-bottom">
			<view class="image mr-2"><image :src="shop_goods.show_img" mode=""></image></view>
			<view class="flex direction-column justify-between align-start info">
				<view class="title ellipsis-main ellipsis-2">
					{{ shop_goods.title }}
				</view>
				<view class="select">已选： {{ shop_goods.skuData.selectSkuText }}，{{ shop_goods.skuData.number }}个</view>
				<view class="flex justify-between moneyBox">
					<view class="money">¥ {{ price }}</view>
					<view class="number">x{{ shop_goods.skuData.number }}</view>
				</view>
			</view>
		</view>
		<!-- <view class="flex justify-between p-2 footer">
			<view>配送服务</view>
			<view>某某快递</view>
		</view> -->
	</view>
</template>

<script>
	export default{
		props:{
			shop_goods:{
				type: Object,
				default: () => {}
			},
			type:{
				type:String | Number
			}
		},
		computed:{
			price(){
				if (this.type == 3) {
					return this.shop_goods.skuData.price.curr_price
				} else {
					return this.shop_goods.skuData.price.spell_group_price
				}
			}
		},
		mounted() {
			console.log(this.shop_goods);
		}
	}
</script>

<style lang="scss" scoped>
.shop {
	.header {
		image {
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
		}
		text {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}
	}

	.body {
		.image {
			flex: 0 0 156rpx;
			width: 156rpx;
			height: 156rpx;
			border-radius: 20rpx;
			overflow: hidden;
			image {
				width: 156rpx;
				height: 156rpx;
			}
		}

		.info {
			height: 144rpx;
			.title {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #25252f;
				line-height: 34rpx;
			}
			.select {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 28rpx;
			}
			.moneyBox {
				width: 474rpx;
				.money {
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #e03c3c;
					line-height: 34rpx;
				}
				.number {
					display: block;
					min-width: 36rpx;
					height: 36rpx;
					padding: 0 6rpx;
					border-radius: 10rpx;
					border: 1rpx solid #979797;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 36rpx;
					text-align: center;
				}
			}
		}
	}
	
	.footer{
		view{
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 34rpx;
			
			&:last-child{
				color: #666666;
			}
		}
	}
}
// .px6{
// 	padding: 0 10rpx;
// }
</style>

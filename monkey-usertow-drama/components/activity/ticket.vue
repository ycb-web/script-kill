<template>
	<view class="activityBox">
		<view class="flex mb-3 item" v-for="item in list" :key="item.prodId" @click="goActivity(item.prodId, item.price)">
			<u-image lazy-load width="224rpx"  border-radius="20"  height="190rpx" :src="item.pic"></u-image>
			<view>
				<view class="ellipsis-main ellipsis-2 mb-2 px-2 title">
					{{item.prodName}}
				</view>
				<view class="flex justify-between px-2 my-1">
					<view class="money">￥{{item.price || 0}} 起</view>
					<!-- <view class="number">仅剩 {{item.product_attr_details_has_one.stock || 0}} 份</view> -->
				</view>
<!--				<view class="flex px-2">-->
<!--					<view class="label ellipsis-1" v-for="(lable, index) in product_label(item.product_label)" :key="lable.id">-->
<!--						{{lable}}-->
<!--					</view>-->
<!--				</view>-->
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
	// computed:{
	// 	product_label(){
	// 		return label => {
	// 			console.log(label,'labellabellabel');
	// 			const data = label.split(',').filter((item, index) => {
	// 				return index < 2
	// 			})
	// 			return data
	// 		}
	// 	},
	// },
	// mounted() {
	// 	console.log(this.list,'ticketDataticketDataticketDataticketData');
	// },
	methods:{
		goActivity(product_id, curr_price){
			// console.log(product_id);
			uni.navigateTo({
				url: `/pages/product/EventProductsDetail/EventProductsDetail?product_id=${product_id}&type=3&productType=3`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.activityBox {
	font-family: PingFangSC-Medium, PingFang SC;
	.item {
		// flex: 0 0 330rpx;
		// width: 330rpx;
		// height: 510rpx;
		background: #FFFFFF;
		box-shadow: 0 0 12rpx 0px rgba(0, 0, 0, 0.05);
		border-radius: 20rpx;
		overflow: hidden;
		
		.money{
			font-size: 28rpx;
			font-weight: 500;
			color: #FF5F25;
			line-height: 40rpx;
			text-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.05);
		}
		.number{
			font-size: 20rpx;
			color: #999999;
			line-height: 28rpx;
			text-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.05);
		}
		.title{
			line-height: 32px;
			font-size: 22rpx;
			color: #333333;
			line-height: 32rpx;
			text-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.05);
		}
		
		.label{
			margin-right: 10rpx;
			flex: 0 0 100rpx;
			width: 100rpx;
			height: 32rpx;
			font-size: 20rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 32rpx;
			text-align: center;
			text-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.05), 0px 0px 4rpx #FF6730;
			
			&:nth-of-type(odd) {
				background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/lable2.png) no-repeat;
				background-size: 100rpx 32rpx ;
			}
			&:nth-of-type(even) {
				background: url(../../static/home/lable1.png) no-repeat;
				background-size: 100rpx 32rpx ;
			}
		}
	}
}
</style>

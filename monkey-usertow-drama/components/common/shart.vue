<template>
	<view class="shert">
		<u-popup v-model="show" mode="bottom" safe-area-inset-bottom border-radius="20" closeable>
			<view class="p-2 box">
				<view class="py-1 text-center title">分享</view>
				<view class="border-bottom"></view>
				<view class="flex justify-around tabs">
					<view @click="onclick(0)">
						<image src="../../static/goods/wx.png" mode=""></image>
						<view>微信好友</view>
						<button type="default" open-type="share"></button>
					</view>
					<view @click="onclick(1)">
						<image src="../../static/goods/img.png" mode=""></image>
						<view>图片</view>
					</view>
					<!-- <view @click="onclick(2)">
						<image src="../../static/goods/wxq.png" mode=""></image>
						<view>朋友圈</view>
						<button type="default" open-type="share"></button>
					</view> -->
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			// path: '', // 分享路径
		};
	},
	// // 分享
	// onShareAppMessage() {
	// 	console.log('onShareAppMessageonShareAppMessage');
	// 	let path = ''
	// 	if (this.type == 1) { // 活动
	// 		path = `/pages/product/EventProductsDetail/EventProductsDetail?product_id=${this.id}&id=${this.activity_id}&type=2`
	// 	} else if (this.type == 2) { // 实物
	// 		path =  `/pages/product/GoodsProductDtails/GoodsProductDtails?product_id=${this.id}&id=${this.activity_id}&type=2`
	// 	} else {
	// 		path = `/pages/product/TicketProductDetails/TicketProductDetails?product_id=${this.id}&id=${this.activity_id}&type=2`
	// 	}
	// 	console.log(path,'this.paththis.paththis.paththis.paththis.paththis.path');
	// 	return {
	// 		// title: '分享标题',
	// 		path:  path
	// 	};
	// },
	methods:{
		onOpen(){
			this.show = true
		},
		onClose(){
			this.show = false
		},
		onclick(index){
			this.$emit('click', index)
		}
	}
};
</script>

<style lang="scss" scoped>
.shert {
	.title {
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 50rpx;
	}

	.tabs {
		height: 294rpx;
		image {
			width: 80rpx;
			height: 80rpx;
			text-align: center;
		}
		view {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 34rpx;
			text-align: center;
			position: relative;
			button{
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 999;
				opacity: 0;
			}
		}
	}
}
</style>

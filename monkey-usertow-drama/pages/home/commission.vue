<template>
	<view class="commissionBox">
		<!-- <image :src="imgUrl" mode="widthFix" class="image"></image> -->
		<u-image width="100%" class="image" :show-menu-by-longpress="true" mode="widthFix" :src="imgUrl"></u-image>
		<!-- <lz-button class="button" open-type="contact">芝麻客服</lz-button> -->
		<button open-type="contact">点击定制</button>
	</view>
</template>

<script>
	import lzButton from '@/components/common/button.vue';

	export default {
		data() {
			return {
				imgUrl: ''
			}
		},
		components: {
			lzButton
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				const linkUrl = '/pages/home/commission';
				const region = uni.getStorageSync("chooseCity").id;
				this.$api.query_commission_img(linkUrl, region).then(res => {
					this.imgUrl = res.data.record[0].url;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commissionBox {
		// position: relative;
		padding-bottom: 140rpx;
		min-height: 100vh;
		button {
			position: fixed;
			bottom: 40rpx;
			width: calc(100% - 60rpx);
			height: 80rpx;
			margin: auto 30rpx;
			text-align: center;
			line-height: 80rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #ffffff;
			background: url(../../static/button.png);
			background-size: 100% 80rpx;
		}
		
		button::after {
			display: none;
		}
	}
</style>

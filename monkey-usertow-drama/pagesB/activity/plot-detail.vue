<template>
	<view class="out-view">
		<Header title="剧场详情"></Header>
		<!-- <view class="navBar">剧场详情</view> -->
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/plot-detail.png" mode="widthFix">
			</image>
		</view>
		<view class="plot-detail" v-for="(item, index) in data" :key="item.id">
			<view class="plot-detail-img-father">
				<!-- <image style="background-color: #FFFFFF;" :src="item.backgroundImage" class="plot-detail-img"></image> -->
				<view class="plot-detail-img" :style="{backgroundImage:'url('+item.backgroundImage+')'}"></view>
			</view>
			<view class="plot-detail-box">
				<view class="plot-detail-title-f">
					<image src="../../static/plotDitail/title-bgimage.png"></image>
					<view class="plot-detail-title">
						{{item.title || '剧情'}}
					</view>
				</view>
				<view class="plot-detail-info">
					{{item.introduction || '剧情'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stage: 0,
				data: []
			}
		},
		onLoad({
			stage
		}) {
			this.stage = stage || 0
			const mainPageInfo = uni.getStorageSync('mainPageInfo')
			const data = mainPageInfo.dramaActiveDetailDTO.activeStageList[stage].plotList
			this.data = data || []
		},
		methods: {

		}
	}
</script>
<style>
	/* 页面背景 */
	/* page {
		background-color: #1D0F95;
	} */
</style>

<style lang="scss" scoped>
	.navBar {
		position: fixed;
		top: 104rpx;
		left: 50%;
		font-size: 34rpx;
		transform: translateX(-50%);
		color: white;
	}

	.out-view {
		padding-top: 152rpx;
	}

	.bg {
		position: fixed;
		width: 100%;
		// height: auto;
		left: 0;
		top: 0;
		z-index: -2;
	}

	//剧情
	.plot-detail {
		position: relative;
		margin-bottom: 40rpx;
		width: 686rpx;
		height: 452rpx;
		margin: 54rpx auto 0;

	}

	.plot-detail:last-child {
		margin-bottom: 50rpx;
	}

	.plot-detail-img-father {
		width: 686rpx;
		height: 100%;

		.plot-detail-img {
			width: 100%;
			height: 100%;
			border-radius: 25rpx;
			background-size: 100% auto;
			overflow: hidden;
			background-repeat: no-repeat;
		}
	}


	.plot-detail-box {
		position: absolute;
		width: 686rpx;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		.plot-detail-title-f {
			position: absolute;
			top: 0;
			left: 28rpx;

			.plot-detail-title {
				padding: 0rpx 20rpx 10rpx;
				margin-top: -70rpx;
				color: #635B4E;
				font-size: 38rpx;
			}

			image {
				width: 100%;
				height: 70rpx !important;
			}
		}

	}

	.plot-detail-info {
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 101%;
		padding: 32rpx;
		background: linear-gradient(0deg, #070000 -72%, #070000 -72%, #121632 100%, #121632 100%);
		border-radius: 20rpx 20rpx 0 0;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 36rpx;
		color: rgba(255, 255, 255, 0.8);
	}
</style>

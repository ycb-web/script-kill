<template>
	<view>
		<view class="bg">
			<image style="height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/ready.png" mode="heightFix">
			</image>
		</view>
		<view class="bg-mask">
		</view>
		
		<view :style="{paddingTop:top+'px',height:height+'px'}">
			<view class="back" ></view>
		</view>
		<view class="title">
			我的活动
		</view>
		
		<view class="first">
			欢迎来到
		</view>
		<view class="second">
			xxx剧本杀
		</view>
		<view class="fourth">
			热门活动推荐
		</view>
		<view class="third">
			<image class="third" src="../../static/album-topbg.jpg" mode="aspectFill"></image>
		</view>

		<!-- <view class="fifth">
			<view class="fifth-text">
				loading...
			</view>
			<u-line-progress :percent="percent" inactive-color="transparent" activeColor="#56C0E4" height="30"
				:show-percent="false"></u-line-progress>
		</view> -->
		<view class="progress">
			<view class="fifth-text">
				loading...
			</view>
			<view class="progress-son">
				<image class="progress-boder" src="../../static/loading/progress.png" mode="widthFix"></image>
				<view class="progress-color"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				percent: 0,
				top: 0,
				height: 0,
			}
		},
		onLoad(opt) {
			uni.setStorageSync('isLoginToActivityIndex',true)
			this.getMenuButtonBoundingClientRect();
			// var that = this;
			// setTimeout(function() {
			// 	that.percent = 100;
			// }, 1000); //-----------------------------------这里是1秒记得调回去
			setTimeout(function() {
				uni.reLaunch({
					url: '/pages/activity/index'
				})
				//uni.navigateTo({
				//	url: '/pagesB/activity/index'
				//})
				// uni.switchTab({
				//     url: '/pagesB/activity/index'
				// });
			}, 1500);
		},
		//-----------------------------------------------上面三个跳转，只有第一个是展示状态
		methods: {
			getMenuButtonBoundingClientRect() {
				let info = uni.getMenuButtonBoundingClientRect();
				this.top = info.top;
				this.height = info.height;
			},
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes progressGo {
		from {
			width: 0rpx;
		}

		to {
			width: 576rpx;
		}
	}

	.progress {
		position: absolute;
		top: 900rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 630rpx;
		margin: 100rpx auto 0;

		.progress-son {
			position: relative;

			.progress-boder {
				width: 100%;
				height: auto;
			}

			.progress-color {
				position: absolute;
				background: linear-gradient(to right, #3C7ED9, #5BDEFF);
				/* 标准的语法 */
				// width: 576rpx;
				// width: 350rpx;
				height: 28rpx;
				top: 30rpx;
				left: 28rpx;
				border-radius: 14rpx;
				// overflow: hidden;
				animation: progressGo .4s linear 1s;
				animation-fill-mode: forwards;
			}
		}

	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.navBar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: transparent !important;
	}

	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: -2;
	}

	.bg-mask {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: -1;
	}

	.title {
		color: white;
		font-weight: bold;
		text-align: center;
		font-size: 32rpx;
		margin-top: 10rpx;
		margin-bottom: 54rpx;
	}
	.back{
		color: white;
		padding: 10rpx 30rpx;
		width: 200rpx;
		font-size: 32rpx;
	}

	// 文本1
	.first,
	.second {
		text-align: center;
		font-size: 82rpx;
		color: white;
		margin-top: 120rpx;
		font-weight: 700;
	}

	// 文本2
	.second {
		margin: 18rpx 0 100rpx;
	}

	// 图片
	.third {
		width: 630rpx;
		height: 255rpx;
		margin: 16rpx auto 0;
		object-fit: cover;
		border-radius: 20rpx;
	}

	// 文本3
	.fourth {
		text-align: center;
		color: white;
		// margin-top: 30rpx;
		font-size: 30rpx;
	}

	//进度
	.fifth {
		position: absolute;
		top: 900rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 630rpx;
		margin: 100rpx auto 0;
	}

	.fifth-text {
		text-align: right;
		color: white;
		margin-bottom: -10rpx;
	}

	.fifth /deep/ .u-progress {
		border: 2rpx solid #C9C9C9;
		border-radius: 15rpx !important;
	}

	.fifth /deep/ .u-active {
		border-radius: 15rpx !important;
	}
</style>

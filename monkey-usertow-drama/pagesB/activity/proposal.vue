<template>
	<view>
		<Header title="邀请"></Header>
		<view class="title">
			邀请
		</view>
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/marry/bg1.png">
			</image>
		</view>
		<view class="center-wrap">
			<view class="center-bg">
				<image style="width: 100%;height: 100%;"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/marry/box3.png"
					mode="widthFix">
				</image>
			</view>
			<view class="avatar">
				<image :src="roleInfo.roleLogo" style="width: 100%;height: 100%;object-fit: cover;border-radius: 100%;"
					mode="aspectFill"></image>
				<image class="avatar-boder" src="../../static/marry/9.png" mode="widthFix"></image>
			</view>
			<view class="name">
				{{roleInfo.roleName}}
			</view>
			<view class="scan-img">
				<canvas canvas-id="myQrcode"></canvas>
				<view class="qr-code-mode" v-if="marryInfo.status === 1"></view>
			</view>
			<view class="examine" v-if="marryInfo.status === 1">
				<view class="examine-bg">
					<image style="width: 100%;height: 100%;" src="../../static/marry/8.png" mode="widthFix">
					</image>
				</view>
				<view class="examine-text">
					<image class="examine-clock" src="../../static/marry/10.png" mode="widthFix"></image>
					审核中
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import drawQrcode from '@/utils/weapp.qrcode.esm.js'
	export default {
		data() {
			return {
				roleInfo: uni.getStorageSync('mainPageInfo').dSramaActiveRoleDetailDto,
				userInfo: uni.getStorageSync('userInfo'),
				activeId: uni.getStorageSync('activeId'),
				marryInfo: {
					status: 0,
				},
			}
		},
		onLoad() {
			this.getMarryInfo()
			const data = {
				activeId: this.activeId,
				applyId: this.userInfo.id
			}
			console.log(data)
			this.$nextTick(function() {
				drawQrcode({
					width: 124,
					height: 124,
					canvasId: 'myQrcode',
					// ctx: wx.createCanvasContext('myQrcode'),
					text: JSON.stringify(data),
					// v1.0.0+版本支持在二维码上绘制图片
				})
			})
		},
		methods: {
			async getMarryInfo() {
				const res = await this.$api.getMarryInfo({
					activityId: uni.getStorageSync('activeId')
				})
				console.log("res", res);
				if (!res || res.status !== 200) return
				if (res.data) {
					this.marryInfo = res.data
					this.marrySuccess = true
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.center-bg {
		position: absolute;
		width: 100%;
		height: auto;
		top: 100rxp;
	}

	.title {
		color: transparent;
		font-weight: bold;
		text-align: center;
		font-size: 32rpx;
		margin-top: 10rpx;
		margin-bottom: 54rpx;
	}

	// 头像
	.avatar {
		position: relative;
		width: 164rpx;
		height: 164rpx;
		border-radius: 100%;
		margin: 94rpx auto 0;
	}

	.avatar-boder {
		position: absolute;
		top: -1rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 176rpx;
		height: auto;
	}

	// 姓名
	.name {
		font-size: 28rpx;
		font-weight: bold;
		text-align: center;
		color: #913437;
		margin-top: 16rpx;
	}

	// 欢迎1
	.text {
		margin-top: 40rpx;
		text-align: center;
		color: white;
	}

	// 二维码
	.scan-img {
		position: relative;
		width: 144px;
		height: 144px;
		margin: 54rpx auto 0;
		border: 20rpx #F7B7AF solid;

		canvas {
			margin: auto;
		}
	}

	.qr-code-mode {
		position: absolute;
		top: -21rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 146px;
		height: 146px;
		background-color: #CACACA;
		opacity: 0.4;
	}

	.center-wrap {
		position: relative;
		margin: 112px auto;
		display: flex;
		flex-direction: column;
		width: 600rpx;
		height: 740rpx;
	}

	.myQrcode {
		width: 100rpx;
		height: 1rpx;
	}

	.examine {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 664rpx;
		width: 220rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		text-align: center;
		color: white;

		.examine-clock {
			width: 30rpx;
			padding-bottom: 5rpx;
			padding-right: 10rpx;
			vertical-align: middle;
		}

		.examine-text {
			margin-top: -51rpx;
		}
	}
</style>

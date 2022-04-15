<template>
	<view class="outPage">
		<Header :title="isgetData && marryInfo.status !== 1 ? '成功':'结婚'"></Header>
		<view class="title">
			{{isgetData && marryInfo.status !== 1 ? '成功':'结婚'}}
		</view>
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/marry/bg2.png">
			</image>
		</view>
		<view class="marry-info">
			<view class="bg-boder">
				<image style="width: 100%;height: 100%;"
					:src="isgetData && marryInfo.status !== 1 ? 'https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/marry/box4.png':'https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/marry/box5.png'"
					mode="widthFix">
				</image>
			</view>
			<view class="marry-info-man">
				<block v-if='!marrySuccess'>
					<view class="marry-info-man-son">
						<view class="marry-info-man-son-avatar">
							<image style="width: 100%;height: 100%; object-fit: cover;border-radius: 100%;"
								:src="roleInfo.roleLogo" mode="aspectFill"></image>
							<image class="avatar-boder-left" src="../../static/marry/9.png" mode="widthFix"></image>
						</view>
						<view class="role-name">
							{{roleInfo.roleName}}
						</view>
					</view>
					<view class="marry-info-man-son">
						<view class="marry-info-man-son-avatar">
							<image style="width: 100%;height: 100%;object-fit: cover;border-radius: 100%;"
								src='https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/marry.png'
								mode="aspectFill"></image>
						</view>
						<view class="role-name">
						</view>
					</view>
				</block>
				<block v-else>
					<view class="marry-info-man-son">
						<image class="success-love" src="../../static/marry/6.png" mode="widthFix" v-if="marrySuccess">
						</image>
						<view class="marry-info-man-son-avatar">
							<image
								style="width: 120%;height: 120%;object-fit: cover;border-radius: 100%;margin-left: 14rpx;"
								:src="marryInfo.icon1" mode="aspectFill"></image>
							<image class="avatar-boder" src="../../static/marry/9.png" mode="widthFix"></image>
						</view>
						<view class="role-name" v-if="!marrySuccess">
							{{marryInfo.roleName1}}
						</view>
					</view>
					<view class="marry-info-man-son">
						<view class="marry-info-man-son-avatar">
							<image
								style="width: 120%;height: 120%;object-fit: cover;border-radius: 100%;margin-left: -40rpx;"
								:src="marryInfo.icon2" mode="aspectFill"></image>
							<image class="avatar-boder-right" src="../../static/marry/9.png" mode="widthFix"></image>
						</view>
						<view class="role-name" v-if="!marrySuccess">
							{{marryInfo.roleName2}}
						</view>
					</view>
				</block>
			</view>
			<view class="marry-info-buttons" v-if='!marrySuccess'>
				<view class="marry-info-button" @click="navTo('/pagesB/activity/proposal')">
					邀请你的另一半
				</view>
				<view class="marry-info-button" @click="handleAccept">
					接受另一半的邀请
				</view>
			</view>
			<view class="" v-else>
				<view class="marry-info-button-points">
					领取积分
				</view>
			</view>
			<!-- <view class="marry-info-buttons" v-else>
				<view class="marry-info-button">
					{{marryInfo.status === 1? '待审核': '已结婚'}}
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		scanCode
	} from '@/common/util.js'
	export default {
		data() {
			return {
				roleInfo: uni.getStorageSync('mainPageInfo').dSramaActiveRoleDetailDto,
				marryInfo: {},
				isgetData: false,
				marrySuccess: false,
			}
		},
		onLoad() {
			const that = this
			this.timer = setTimeout(() => {
				// that.getMarryInfo()
			}, 3000)
			that.getMarryInfo()
		},
		methods: {
			async getMarryInfo() {
				const res = await this.$api.getMarryInfo({
					activityId: uni.getStorageSync('activeId')
				})
				if (!res || res.status !== 200) return;
				if (!res.data) return;
				this.isgetData = true
				this.marryInfo = res.data
				if (res.data.status !== 1) {
					this.marrySuccess = true
					clearTimeout(this.timer)
				}
			},
			handleBack() {
				uni.navigateBack()
			},
			async handleAccept() {
				const resCode = await scanCode()
				const res = await this.$api.acceptMarry({
					activityId: uni.getStorageSync('activeId'),
					applyId: resCode.applyId
				})
				if (res.data) {
					uni.showToast({
						title: res.message
					})
					this.getMarryInfo()
				}
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		color: transparent;
		font-weight: bold;
		text-align: center;
		font-size: 32rpx;
		margin-top: 10rpx;
		margin-bottom: 54rpx;
	}

	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: -2;
	}

	.bg-boder {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: -2;
	}

	.back {
		color: white;
		margin: 10rpx 20rpx;
	}

	.xi {
		margin: 105rpx auto 0;
		width: 328rpx;
		height: 190rpx;
	}

	// 结婚详情
	.marry-info {
		width: 656rpx;
		border-radius: 20rpx;
		padding-bottom: 78rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 270rpx;
		width: 780rpx;
		height: 1200rpx;


	}

	.marry-info-title {
		color: #1D0F95;
		text-align: center;
		font-weight: bold;
		font-size: 38rpx;
		padding-top: 35rpx;
	}

	.marry-info-desc {
		font-weight: bold;
		color: #1D0F95;
		margin-top: 55rpx;
		padding: 0 30rpx;
	}

	.marry-info-man {
		position: absolute;
		top: 240rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 70%;
		height: 190rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 60rpx;
	}

	.success-love {
		position: absolute;
		top: 66rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 500rpx;
		height: auto;
	}

	.avatar-boder-left {
		position: absolute;
		top: 16rpx;
		left: 51rpx;
		width: 150rpx;
		height: auto;
	}

	.avatar-boder {
		position: absolute;
		top: 14rpx;
		left: 57rpx;
		width: 180rpx;
		height: auto;
	}

	.avatar-boder-right {
		position: absolute;
		top: 14rpx;
		left: 306rpx;
		width: 180rpx;
		height: auto;
	}

	.marry-info-man-son {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.role-name {
		margin-top: 10rpx;
		font-weight: 500;
		color: #913437;
	}

	.marry-info-man-son-icon {
		width: 55rpx;
		height: 55rpx;
	}

	.marry-info-man-son-avatar {
		width: 132rpx;
		height: 132rpx;
		margin-top: 20rpx;
	}

	.marry-info-buttons {
		margin: 690rpx 0 0;
	}

	.marry-info-button {
		width: 370rpx;
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 18rpx;
		padding: 0 28rpx;
		color: white;
		margin: 0 auto 30rpx;
		background-image: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/invite-marry.png);
		background-position: center center;
		background-repeat: no-repeat;
	}
	.marry-info-button-points {
		width: 370rpx;
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 18rpx;
		padding: 0 28rpx;
		color: white;
		margin: 40vh auto 30rpx;
		background-image: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/invite-marry.png);
		background-position: center center;
		background-repeat: no-repeat;
	}
</style>

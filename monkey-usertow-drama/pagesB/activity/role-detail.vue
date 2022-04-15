<template>
	<view class="role-page">
		<Header title="详情"></Header>
		<view class="bg">
		</view>
		<view class="role-detail-type">
			<view class="role-type-box">
				身份：「{{roleInfo.roleTypeEnum}}」
				<image class="button-bg" src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/title-bg1.png" mode="">
			</view>
		</view>
		<view class="role-detail">
			<image style="background-color: #FFFFFF;" :src="roleInfo.roleLogo" class="role-detail-img"></image>
			<view class="role-detail-title">
				<view class="second-right-text">
					{{roleInfo.roleName}}
				</view>
			</view>
		</view>
		<view class="role-detail-info">
			<view class="info-title">
				角色介绍：
			</view>
			{{roleInfo.roleDesc || ''}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainPageInfo: uni.getStorageSync('mainPageInfo'),
				roleInfo: {}
			}
		},
		created() {
			this.roleInfo = this.mainPageInfo.dSramaActiveRoleDetailDto || {}
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
	.role-page{
		color: #fff;
	}
	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: -2;
		background-color: #333;
	}
	.role-detail-type{
		text-align: center;
		text-align: center;
		margin-top: 200rpx;
	}
	.role-type-box{
		margin: 42rpx auto;
		font-size: 32rpx;
		min-width: 176rpx;
		display: inline-block;
		position: relative;
		padding: 8rpx 92rpx;
	}
	.button-bg{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
	//剧情
	.role-detail {
		width: 496rpx;
		margin: 54rpx auto 0;
		position: relative;
	}
	
	.role-detail:last-child {
		margin-bottom: 50rpx;
	}
	
	.role-detail-img {
		width: 100%;
		height: 456rpx;
		border-radius: 25rpx;
	}
	
	.role-detail-title {
		color: #333;
		font-weight: bold;
		font-size: 36rpx;
		position: absolute;
		min-width: 172rpx;
		height: 68rpx;
		line-height: 68rpx;
		right: 32rpx;
		bottom: -34rpx;
		background-size: 100% 100%;
		text-align: center;
		padding: 0 12rpx;
		background-image: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/invite-bg.png);
	}
	.role-detail-info {
		width: 496rpx;
		font-size: 24rpx;
		margin: 54rpx auto 0;
		position: relative;
	}
	.info-title{
		font-size: 28rpx;
	}
</style>

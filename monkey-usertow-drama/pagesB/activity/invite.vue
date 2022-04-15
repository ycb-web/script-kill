<template>
	<view>
		<Header title="邀请小伙伴"></Header>
		
		<!-- <view class="navBar"></view> -->
		<!-- <view class="title">邀请小伙伴</view> -->
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/invite.png">
			</image>
		</view>
		<view class="avatar">
			<image :src='roleInfo.roleLogo' style="width: 100%;height: 100%;object-fit: cover;border-radius: 100%;"
				mode=""></image>
		</view>
		<view class="name">
			{{roleInfo.roleName}}
		</view>
		<view class="middle-content">
			<view class="text">
				邀请您的小伙伴一起加入《{{mainPageInfo.dramaActiveDetailDTO.name}}》剧本杀吧
			</view>
			<view class="scan-img">
				<canvas class="erweima" canvas-id="myQrcode"></canvas>
				<!-- <image src="../../static/album-topbg.jpg" style="width: 100%;height: 100%;object-fit: cover;" mode=""></image> -->
			</view>
			<view class="step-player">
				<view class="step-player-divider">
					<view class="divider-text">当前已加入玩家({{roleData.length}}/{{totalRoles}})</view>
				</view>
				<view class="step-player-roles">
					<view class="step-player-role" v-for="(item, index) in roleData" :key="index">
						<view class="step-player-role-img-v">
							<image class="step-player-role-img" :src="item.roleLogo" mode=""></image>
						</view>
						<view class="step-player-role-name" :style="{color: item}">
							{{item.roleName}}
						</view>
					</view>
					
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
				mainPageInfo: uni.getStorageSync('mainPageInfo'),
				userInfo: uni.getStorageSync('userInfo'),
				activeId: uni.getStorageSync('activeId'),
				totalRoles: 0,
				roleInfo: {},
				roleData: []
			}
		},
		created() {
			this.roleInfo = this.mainPageInfo.dSramaActiveRoleDetailDto
		},
		onShow() {
			this.getRoleList()
			this.drawInvite()
		},
		methods: {
			async getRoleList(){
				const resRole = await this.$api.getActiveRoleList({
					activeTeamId: this.roleInfo.activeTeamId || 1,
				})
				if(resRole.status !== 200) return
				this.totalRoles = resRole.data.listBind.length + resRole.data.listUnBind.length
				this.roleData = resRole.data.listBind
			},
			drawInvite(){
				// const data = {
				// 	activeTeamId: this.roleInfo.activeTeamId || 1
				// }
				const url =
					`https://customer-qa.enjoyu.com/script-kill?activeId=${this.activeId}&activeTeamId=${this.roleInfo.activeTeamId}`
				this.$nextTick(function(){
					drawQrcode({
						width: 124,
						height: 124,
						canvasId: 'myQrcode',
						text: url,
						// v1.0.0+版本支持在二维码上绘制图片
					})
				})
			}
		}
	}
</script>

<style>
	/* 页面背景 */
	page {
		background-color: #1D0F95;
	}
</style>

<style lang="scss" scoped>
	.title {
		color: white;
		font-weight: bold;
		text-align: center;
		font-size: 32rpx;
		margin-top: 10rpx;
		margin-bottom: 54rpx;
	}
	.navBar {
		position: fixed;
		top: 104rpx;
		left: 50%;
		font-size: 34rpx;
		transform: translateX(-50%);
		color: white;
	}

	// 头像
	.avatar {
		width: 160rpx;
		height: 160rpx;
		border-radius: 100%;
		border: 4rpx solid white;
		margin: 150rpx auto 34rpx;
	}

	// 姓名
	.name {
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
		color: #E7E6EA;
		margin-top: 20rpx;
		padding-bottom: 100rpx;
	}

	.middle-content {
		// position: fixed;
		// width: 100%;
		// height: 100%;
		// top: 36%;
	}

	// 欢迎
	.text {
		font-weight: bold;
		margin-top: 80rpx;
		text-align: center;
		color: #686A7A;
		font-size: 24rpx;
	}
	
	// 二维码
	.scan-img {
		width: 164px;
		height: 164px;
		padding: 10px;
		background-color: white;
		border: 10px solid #172252;
		margin: 32rpx auto 0;
	}

	.erweima {
		width: 124px;
		height: 124px;
		border-radius: 100rpx;
		object-fit: cover;
		margin: 0 auto;
	}

	// 选择队员
	.step-player {
		margin-top: 50rpx;
		padding-bottom: 60rpx;
		color: #C6C7C7;
	}
	.divider-text{
		background-color: none;
		width: 100%;
		height: 55rpx;
		line-height: 55rpx;
		text-align: center;
		padding-bottom: 20rpx;
	}
	.step-player-roles {
		position: absolute;
		width: 600rpx;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		overflow-x: auto;
	}
	
	.step-player-role {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-right: 30rpx;
	}
	
	.step-player-role-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 100%;
		border: 2rpx solid #596FA7;
	}
	
	.step-player-role-name {
		font-size: 24rpx;
		margin-top: 16rpx;
		margin-bottom: 10rpx;
		text-align: center;
		color: #9B98A8;
	}
	
	.step-player-text {
		text-align: center;
		color: white;
		// font-weight: bold;
		font-size: 40rpx;
		margin-top: 34rpx;
	}
	
	.step-player-img {
		margin: 34rpx auto;
		width: 565rpx;
		height: 640rpx;
	}
	
	.step-player-info {
		margin: 65rpx auto;
		width: 565rpx;
		color: white;
	}
</style>

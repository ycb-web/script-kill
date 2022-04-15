<template>
	<view>
		<Header class="headerBar" :title="'排行榜'"></Header>
		<!-- title="排行榜" -->
		<view class="title">
			<view class="title-text">排行榜</view>
		</view>
		<view class="bg">
			<image style="width: 100%;height: 100%;filter: brightness(0.5);"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/ready.png" mode="heightFix">
			</image>
		</view>
		<view class="bg2"></view>
		<view class="top-bg flex align-center justSa">
			<view class="title">
				排行榜
			</view>
			<view class="icon">
				<image class="icon-img"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/gold-medal.png" mode="">
				</image>
			</view>
		</view>
		<view class="header-switch">
			<view class="header-switch-son" :class="{active: type == 1}" @click="handleSwitchAll">
				总排行榜
			</view>
			<view class="header-switch-son" :class="{active: type == 2}" @click="handleSwitchTeamIn">
				队内排行榜
			</view>
			<view class="header-switch-son" :class="{active: type == 3}" @click="handleSwitchTeam">
				团队排行榜
			</view>
		</view>
		<view class="list-one" style="margin-top: 0;" v-if='myInfo'>
			<view class="list-son-left">
				<view class="list-son-left-avatar">
					<image style="width: 100%;height: 100%;object-fit: cover;border-radius: 100%;"
						:src="type===3?myInfo.teamLogo : logo" mode=""></image>
					<image class="roleSexImgMe" :src="myInfo.roleSex==1?SexImg[0]:SexImg[1]" mode="widthFix"></image>
				</view>
				<view class="list-son-left-info">
					<view class="list-son-left-info-first">
						<view class="list-son-left-info-first-name" v-if="type == 3">
							{{myInfo.teamName || ''}}
						</view>
						<view class="list-son-left-info-first-name" v-else>
							{{myInfo.nickname || ''}}
						</view>
						<!-- <view class="list-son-left-info-first-icon">
							<image style="width: 100%;height: 100%;" src="../../static/logo.png" mode=""></image>
						</view> -->
					</view>
					<!-- <view class="list-son-right-text-name">
						{{myInfo.roleName}}
					</view> -->
					<view class="list-son-left-info-second" style="margin-top: 20rpx;margin-left: 10rpx;">
						财富值：{{myInfo.pointValue || 0}}
					</view>
				</view>
			</view>
			<view class="list-son-right">
				<view class="list-son-right-text-one" style=" vertical-align: middle;">
					<view>排名：</view>
					<view style="color: #FFDCAB; font-size: 52rpx;"> {{rank}}</view>
				</view>
			</view>
		</view>
		<scroll-view class="list" scroll-y>

			<view class="list-son" :id="'item-'+index" v-for="(item, index) in list" :key="index">
				<!-- :style="{backgroundColor: userInfo.id == item.userId ? '#121632' : ''}" 楼上切出来的 -->
				<view class="list-son-left">
					<view class="list-son-left-avatar">
						<image style="width: 100%;height: 100%;object-fit: cover;border-radius: 100%;"
							:src="type===3?item.teamLogo : item.roleLogo" mode=""></image>
						<image class="roleSexImg" :src="item.roleSex==1?SexImg[0]:SexImg[1]" mode="widthFix"></image>
					</view>
					<view class="list-son-left-info">
						<view class="list-son-left-info-first">
							<view class="list-son-left-info-first-name" v-if="type == 3">
								{{item.teamName || ''}}
							</view>
							<view class="list-son-left-info-first-name" v-else>
								{{item.nickname || ''}}
							</view>
							<view class="list-son-right-text" v-if="type == 3">
								(队长：{{item.roleName}})
							</view>
							<view class="list-son-right-text" v-else>
								({{item.roleName}})
							</view>
							<view class="list-son-left-info-first-icon">
								<!-- <image style="width: 100%;height: 100%;" src="../../static/logo.png" mode=""></image> -->
								<image class="rank-img" :src="rankImg[index]" mode="widthFix"></image>
							</view>
						</view>
						<view class="list-son-left-info-second">
							财富值：{{item.pointValue || 0}}
						</view>
					</view>
				</view>

				<view class="list-son-right">
					<!-- <view class="list-son-right-text" v-if="type == 3">
						队长：{{item.roleName}}
					</view> -->
					<!-- <view class="list-son-right-text" v-else>
						角色：{{item.roleName}}
					</view> -->
					<!-- <view class="list-son-right-text" v-else>
						{{item.roleName}}
					</view> -->
					<view class="list-son-right-text">
						<view class="">排名：</view>
						<view class="text-num">{{index + 1}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				mainPageInfo: uni.getStorageSync('mainPageInfo'),
				type: 1,
				scrollToView: 0,
				list: [],
				rank: 0,
				logo: '',
				rankImg: ['../../static/ranking/gold.png', '../../static/ranking/silver.png',
					'../../static/ranking/bronze.png'
				],
				SexImg: ['../../static/ranking/male.png', '../../static/ranking/female.png']
			}
		},
		onShow() {
			this.activeId = uni.getStorageSync('activeId')
			this.getList();
		},
		computed: {
			myInfo() {
				const info = this.list[this.rank - 1]
				return info
			}
		},
		methods: {
			scrollTo() {
				this.scrollToView = `item-${this.rank}`
				setTimeout(() => {
					// 重置, 使下次点击能再触发
					this.scrollToView = `-1`
				})
			},
			handleSwitchAll() {
				this.type = 1
				this.getList()
			},
			handleSwitchTeam() {
				this.type = 3
				this.getRankingTeam()
			},
			handleSwitchTeamIn() {
				this.type = 2
				this.getRankingTeamRole()
			},
			getList() {
				this.$api.getRankingAll({
					activeId: this.activeId
				}).then(res => {
					console.log(res)
					this.list = res.data.list;
					this.rank = res.data.rank;
					this.logo = res.data.logo;
				})
			},
			getRankingTeam() {
				this.$api.getRankingTeam({
					activeId: this.activeId
				}).then(res => {
					console.log(res)
					this.list = res.data.list;
					this.rank = res.data.rank;
					this.logo = res.data.logo;
				})
			},
			getRankingTeamRole() {
				this.$api.getRankingTeamRole({
					activeId: this.activeId,
					teamId: this.mainPageInfo.dSramaActiveRoleDetailDto.teamId,
				}).then(res => {
					console.log(res)
					this.list = res.data.list;
					this.rank = res.data.rank;
					this.logo = res.data.logo;
				})
			},

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
	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: -2;
	}

	.bg2 {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 900rpx;
		z-index: -1;
		background: #121632;
	}

	.title {
		color: transparent;
		font-weight: bold;
		text-align: center;
		font-size: 32rpx;
		height: 42rpx;
		width: 300rpx;
		margin-top: 10rpx;
		margin-bottom: 54rpx;

		.title-text {
			position: fixed;
			top: 106rpx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 999;
		}
	}

	// banner
	.top-bg {
		height: 390rpx;

		.title {
			font-size: 72rpx;
			color: white;
			font-weight: bold;
		}

		.icon {
			.icon-img {
				margin-top: 24rpx;
				width: 280rpx;
				height: 266rpx;
			}
		}
	}

	// 排行榜切换
	.header-switch {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		color: #333;
		padding: 0 32rpx;
		height: 108rpx;
		background: linear-gradient(180deg, #FFF3DB 0%, #F3BD73 100%);
		position: relative;
	}

	.header-switch-son {
		position: relative;
		font-weight: 600;

		&.active {
			font-size: 36rpx;

			&::after {
				// border-bottom: 18rpx #333 solid;
				// border-right: 16rpx #ffffff00 solid;
				// border-left: 16rpx #ffffff00 solid;
				border-left: 18rpx solid transparent;
				border-right: 18rpx solid transparent;
				border-bottom: 18rpx solid #0D1421;
				content: "";
				position: absolute;
				right: 0;
				width: 0;
				z-index: 99;
				bottom: -34rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}

	// 排名列表
	.list {
		// border-top: 1rpx dashed grey;
		margin-top: 16rpx;
		margin-bottom: 50rpx;
		padding-top: 14rpx;
		background:#121632;
	}

	.list-one {
		margin: 0 auto;
		padding: 0 38rpx;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: white;
		background: linear-gradient(0deg, #1F113F 3.35%, #121632 100%);

		.list-son-left-avatar {
			position: relative;

			.roleSexImgMe {
				position: absolute;
				width: 34rpx;
				height: auto;
				top: 58rpx;
				left: 64rpx;
			}
		}
	}

	.list-son {
		position: relative;
		width: 90%;
		margin: 0 auto;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: white;
		border-bottom: 2rpx solid #D7D7D7;
		background:#121632;
	}

	.list-son-left {
		display: flex;

		.rank-img {
			width: 34rpx;
			height: auto;
			vertical-align: middle;
			margin-top: 13rpx;
		}
	}

	.list-son-left-avatar {
		width: 94rpx;
		height: 94rpx;
		border-radius: 100%;
		border: 4rpx solid white;

		.roleSexImg {
			position: absolute;
			width: 34rpx;
			height: auto;
			top: 86rpx;
			left: 64rpx;

		}
	}

	.list-son-left-info {
		margin-left: 14rpx;
	}

	.list-son-left-info-first {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: flex-start;
	}

	.list-son-right-text-one {
		width: 106rpx;
		height: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		vertical-align: middle;
	}

	.list-son-right-text-name {
		font-weight: bold;
		font-size: 30rpx;
		color: white !important;
	}

	.list-son-left-info-first-name {
		font-size: 32rpx;
		line-height: 32rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #FFFFFF;
	}

	.list-son-left-info-first-icon {
		width: 58rpx;
		height: 58rpx;
		margin-left: 24rpx;
	}

	.list-son-left-info-second {
		font-weight: bold;
		margin-top: 6rpx;
		color: #BAB6C3;
		margin-left: 10rpx;
	}

	.list-son-right-text {
		display: flex;
		justify-content: flex-start;
		flex-wrap: nowrap;
		flex-direction: row;
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		letter-spacing: 0px;
		color: #FFFFFF;
	}

	.list-son-right-text-one {
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		text-align: center;
		letter-spacing: 0px;
		color: #FFFFFF;
	}

	.text-num {
		font-family: PingFangSC-Medium;
		font-size: 44rpx;
		font-weight: 500;
		line-height: 44tpx;
		text-align: right;
		color: #FFFFFF;
	}

	.list-son-right-text:nth-child(2) {
		font-family: PingFangSC-Medium;
		font-size: 32rpx;
		font-weight: 500;
		line-height: 32rpx;
		color: #FFFFFF !important;
	}

	.list-son:last-child {
		border-bottom: none !important;
	}
</style>

<template>
	<view class="my-app">
		<Header title="邀请好友"></Header>
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/invite.png">
			</image>
		</view>
		<view class="avatar">
			<image :src='userInfo.icon'
				style="width: 144rpx;height: 144rpx;object-fit: cover;border-radius: 100%; border: 1px solid #FFFFFF;"
				mode=""></image>
		</view>
		<view class="name">
			{{userInfo.nickname}}
		</view>
		<!-- <view class="header"></view>	 -->
		<view class="main p-2">
			<view class="QRcode-box" style="color: white;">
				<view class="title-one">
					成功邀请用户并完成注册建立邀请关系
				</view>
				<view class="title-two">
					新用户可<text style="color: #F7931E;">获取优惠券</text>
				</view>
				<view class="QRcode">
					<view class="QRcode_z">
						<image :src="QRcode" mode="widthFix"></image>
					</view>
				</view>
				<!-- <view class="btn" @click="show = true">
					立即邀请
				</view> -->
			</view>
			<view class="list">
				<view class="list_title flex align-center justify-center">
					<view class="left_dian flex ">
						<view class="left"></view>
						<view class="right"></view>
					</view>
					<view class="text">
						邀请记录
						<image class="inviteBgImg" src="../../static/inviteBgimg.png" mode="widthFix"></image>
					</view>
					<view class="right_dian flex">
						<view class="left"></view>
						<view class="right"></view>
					</view>
				</view>
				<view class="item flex justify-between" v-for="(item,index) in inviteInfo" v-if="inviteInfo.length > 0"
					:key="index">
					<view class="item_left flex align-center">
						<u-avatar class="u-avatar" :src="item.newParticipantsIcon" size="54"></u-avatar>
						<text style="color: white;" class="sl-1">{{item.newParticipantsName}}</text>
					</view>
					<view class="item_right " style="color: #ccc;">
						{{item.createTime}}
					</view>
				</view>
			</view>
			<!-- <view class="inviteRole">
				<view class="" v-for="item in inviteInfo">
					<view class="roleItem">
						<image :src="item.roleImg" mode="widthFix"></image>
						<view class="">{{invite.name}}</view>
					</view>
					<view class="">item.time</view>
				</view>
			</view> -->
		</view>
		<!-- <loading :status="loading" /> -->

		<!-- <ShareModal :show="show" :imageUrl="QRcode" @close-share-modal="show = false"></ShareModal> -->
	</view>
</template>

<script>
	import loading from '@/components/loading/uni-load-more-tow.vue';
	import ShareModal from '@/components/my/shareModal.vue'
	export default {
		components: {
			loading,
			ShareModal
		},
		data() {
			return {
				// inviteInfo: [{
				// 	newParticipantsIcon: '../../static/avatar.png',
				// 	newParticipantsName: '玛卡巴卡',
				// 	createTime: '2021-12-12'
				// }, {
				// 	newParticipantsIcon: '../../static/avatar.png',
				// 	newParticipantsName: '玛卡巴卡',
				// 	createTime: '2021-12-12'
				// }, {
				// 	newParticipantsIcon: '../../static/avatar.png',
				// 	newParticipantsName: '玛卡巴卡',
				// 	createTime: '2021-12-12'
				// }],
				userInfo: {},
				show: false,
				list: [],
				page: 1,
				pageSize: 10,
				is_stop: false,
				loading: 'loading',
				QRcode: '',
			}
		},
		onShow() {
			uni.showLoading({})
			this.get_intvitation_log()
			this.list = []
			this.user_qr_code()
			this.getUserinfo();
		},
		methods: {
			async getUserinfo() {
				const res = await this.$api.get_user_info();
				const data = res.data;
				this.userInfo = data;
				// uni.setStorageSync('userInfo', data)
				// uni.setStorageSync('open_id', data.openId)
			},
			user_qr_code() {
				this.$api.user_qr_code({
						merchantId: uni.getStorageSync('merchantId')
					})
					.then(res => {
						if (res.status == 200) {
							let nowUrls1 = res.data
							if(!res.data) return uni.showToast({
									title: "二维码配置有误，请查看后台配置",
									icon: 'none',
								});
							this.QRcode = res.data
							if (nowUrls1.split(':')[0] == 'http') {
								nowUrls1 = 'https:' + QRcode.split(':')[1];
								this.QRcode = nowUrls1
							}

							uni.hideLoading()
						}
					})
			},
			get_intvitation_log() {
				let {
					page,
					pageSize
				} = this;
				this.$api.get_intvitation_log({
						pageNum: page,
						pageSize,
						merchantId: uni.getStorageSync('merchantId')
					})
					.then(res => {
						if (res.status == 200) {
							let data = res.data.records;
							this.list.push(...data)
							if (data.length < pageSize) {
								this.is_stop = true
								this.loading = "noMore"
							} else {
								this.is_stop = false
								this.loading = "more"
							}
						}
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.roleItem {
		image {
			width: 50rpx;
			height: auto;
		}
	}

	// 头像
	.avatar {
		width: 144rpx;
		height: 144rpx;
		border-radius: 100%;
		// border: 4rpx solid white;
		margin: 14vh auto 34rpx;
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

	.canvas {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -60%);
	}

	// .my-app{
	// 	background-color: #F2F3F5;
	// 	min-height: 100vh;
	// }
	.header {
		width: 750rpx;
		height: 352rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey_invitation_bg.png) no-repeat;
		background-size: 750rpx 352rpx;
	}

	.main {
		transform: translateY(-100rpx);
		margin-top: 11vh;

		.QRcode-box {
			margin: 0 auto;
			text-align: center;
			width: 630rpx;
			height: 440rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;

			.QRcode {
				margin: 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 350rpx;
				height: 350rpx;

				.QRcode_z {
					width: 288rpx;
					height: 288rpx;
					border: 24rpx solid #152155;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.btn {
				margin: 0 auto;
				margin-top: 40rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				width: 392rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: url(../../pagesA/static/btn_392.png)no-repeat;
				background-size: 392rpx 80rpx;

			}
		}

		.list {
			.item {
				margin: 20rpx 0rpx;
			}

			.list_title {
				position: relative;
				margin: 0 auto;
				width: 380rpx;
				height: 60rpx;
				margin-bottom: 30rpx;

				.text {
					color: white;
					margin: 0 10rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;

					.inviteBgImg {
						position: absolute;
						top: 0rpx;
						left: 0rpx;
						width: 380rpx;
						height: 60rpx;
						z-index: -1;
					}
				}

				.left_dian {
					.left {
						width: 12rpx;
						height: 12rpx;
						background: radial-gradient(79% 79% at 42% 29%, #56D6FF 0%, #56D6FF 0%, #417EED 100%, #417EED 100%), #7396E1;
						border-radius: 6rpx;
					}

					.right {
						margin-left: -6rpx;
						width: 12rpx;
						height: 12rpx;
						border-radius: 6rpx;
						background: #CE84FF;
					}
				}

				.right_dian {
					.left {
						width: 12rpx;
						height: 12rpx;
						background: #CE84FF;
						margin-right: -6rpx;
						border-radius: 6rpx;
						z-index: 2;
					}

					.right {
						z-index: 1;
						width: 12rpx;
						height: 12rpx;
						background: radial-gradient(79% 79% at 42% 29%, #56D6FF 0%, #56D6FF 0%, #417EED 100%, #417EED 100%), #7396E1;
						border-radius: 6rpx;
					}
				}
			}

			.item {
				margin: 20rpx 0;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #D7D7D7;

				.item_left {
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;

					.u-avatar {
						margin-right: 10rpx;
					}

					p {
						max-width: 15em;
					}
				}
			}
		}
	}
</style>

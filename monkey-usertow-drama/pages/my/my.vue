<template>
	<view class="app">
		<view class="bj">
			<!-- <view class="bg">
				<image style="width: 100%;height: 100%;"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/invite.png">
				</image>
			</view> -->
			<view class="title-bar" :style="{paddingTop:top+'px',height:height+'px'}">
				<view class="personal-title" style="height: 66rpx;line-height: 66rpx;">个人中心</view>
			</view>
			<view class="avatar">
				<view class="avatarInfo">
					<u-avatar :src="userInfo.icon" size="144"></u-avatar>
					<view class="userInfo">
						<!-- <view>Hi～</view> -->
						<view class="userName">{{ userInfo.nickname }}</view>
					</view>
					<view class="code flex userInfo_personal" @click="turnTo('/pagesA/my/userInfo')">
						<view class="personalData">个人资料</view>
						<u-icon class="personal-icon" name="arrow-right" color="rgba(255, 255, 255, 0.8)" size="20">
						</u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<!-- <view class="list" @click="turnTo('/pages/FamilyCircle/FamilyCircle')">
					<view><image src="/static/my-FamilyCircle.png" mode=""></image></view>
					<view>家庭圈</view>
				</view> -->
			<!-- 				<view class="list" @click="turnTo('/pagesA/my/family')">
					<view><image src="/static/my-family.png" mode=""></image></view>
					<view>我的家人</view>
				</view> -->
			<view class="mian-title  justify-between">
				<!-- <view class="mian-title  justify-between" :style="'margin-top:'+orderTop+'px;'"> -->
				<view class="mian-title-left flex">
					<view class="title">我的订单</view>
				</view>
			</view>
			<view class="main_o_list flex justify-between flex-wrap">
				<view class="main_z_item text-center" @tap="turnTo('/pagesA/order/order?type=3&orderNav=0')">
					<image class="main_z_item_img" src="/static/personal/order.png" mode="widthFix"></image>
					<view class="main_z_item_text">全部订单</view>
				</view>
				<view class="main_z_item text-center" @tap="turnTo('/pagesA/order/order?type=3&orderNav=1')">
					<image class="main_z_item_img" src="/static/personal/payment.png" mode="widthFix"></image>
					<view class="main_z_item_text">待付款</view>
				</view>
				<view class="main_z_item text-center" @tap="turnTo('/pagesA/order/order?type=1&orderNav=2')">
					<image class="main_z_item_img" src="/static/personal/use.png" mode="widthFix"></image>
					<view class="main_z_item_text">待使用</view>
				</view>
				<view class="main_z_item text-center" @tap="turnTo('/pagesA/order/order?type=2&orderNav=3')">
					<image class="main_z_item_img" src="/static/personal/evaluate.png" mode="widthFix"></image>
					<view class="main_z_item_text">待评价</view>
				</view>
			</view>
		</view>
		<!-- banner -->
		<view class="u-swiper" v-if="list.length>0">
			<u-swiper :list="list" @click="swiper_click" height="200" border-radius="20" mode="none" name="banner_url">
			</u-swiper>
		</view>
		<!-- <view class="u-swiper_z" v-else>
			<image src="../../static/banner.png" mode="widthFix"></image>
		</view> -->
		<view class="ul main">
			<view class="main_z">
				<!-- 				<view class="mian-title flex justify-between">
					<view class="mian-title-left flex">
						<view class="line"></view>
						<view class="title">我的订单</view>
					</view>
				</view> -->

				<!-- <view class="main_z_list flex justify-between flex-wrap" >
					<view class="main_z_item text-center"  @tap="turnTo('/pagesA/order/order?type=3&orderNav=0&title=门票订单')">
						<image class="main_z_item_img" src="/static/my-ToBePaid.png" mode="widthFix"></image>
						<view class="main_z_item_text">门票订单</view>
					</view>
					<view class="main_z_item text-center" @tap="turnTo('/pagesA/order/order?type=1&orderNav=0&title=活动订单')">
						<image class="main_z_item_img" src="/static/my-ToBeUsed.png" mode="widthFix"></image>
						<view class="main_z_item_text">活动订单</view>
					</view>
					<view class="main_z_item text-center"  @tap="turnTo('/pagesA/order/order?type=2&orderNav=0&title=购物订单')">
						<image class="main_z_item_img" src="/static/icon100.png" mode="widthFix"></image>
						<view class="main_z_item_text">购物订单</view>
					</view>
					<view class="main_z_item text-center"></view>
				</view> -->
				<view class="mian-title  justify-between">
					<view class="mian-title-left flex">
						<view class="title">工具</view>
					</view>
				</view>
				<view class="main_z_list flex justify-between flex-wrap">
					<!-- <view class="main_z_item text-center" @click="turnTo('/pages/coupon/couponBags')">
						<image class="main_z_item_img" src="/static/personal/couponGiftBar .png" mode="widthFix">
						</image>
						<view class="main_z_item_text">优惠券礼包</view>
						<image v-if='new_coupon_show' src="../../static/my/tabs/mark.png" mode="" class="mark"></image>
					</view> -->
					<view class="main_z_item text-center" @click="turnTo('/pages/coupon/my-coupon')">
						<image class="main_z_item_img" src="/static/personal/coupon.png" mode="widthFix"></image>
						<view class="main_z_item_text">优惠券</view>
					</view>
					<!-- <view class="main_z_item text-center" @click="turnTo('/pages/distribution/distribution')">
						<image class="main_z_item_img" src="/static/fenxiao.png" mode="widthFix"></image>
						<view class="main_z_item_text">我的分销</view>
					</view> -->
					<view class="main_z_item text-center" @click="turnTo('/pagesA/collection/collection')">
						<image class="main_z_item_img" src="/static/personal/Collection.png" mode="widthFix"></image>
						<view class="main_z_item_text">我的收藏</view>
					</view>
					<view class="main_z_item text-center"></view>
					<view class="main_z_item text-center"></view>
				</view>
			</view>
		</view>
		<view style="padding: 32rpx;margin-top: -30rpx;">
			<view class="mian-title  justify-between">
				<view class="mian-title-left flex">
					<view class="title">服务帮助</view>
				</view>
			</view>
			<view class="main_z_list flex justify-between flex-wrap">
				<view class="main_z_item text-center" @tap="callMe()">
					<image class="main_z_item_img" src="/static/personal/resourcesOne.png" mode="widthFix"></image>
					<view class="main_z_item_text">客服</view>
				</view>
				<view class="main_z_item text-center" @click="turnTo(`/pagesA/invitation/invitation`)">
					<image class="main_z_item_img" src="/static/personal/resourcesTwo.png" mode="widthFix"></image>
					<view class="main_z_item_text">邀请好友</view>
				</view>


				<view class="main_z_item text-center"></view>
				<view class="main_z_item text-center"></view>
			</view>
		</view>
		<u-popup v-model="MembershipCode_show" mode="bottom">
			<view>会员码</view>
		</u-popup>
		<!-- <pop-tip ref='poptip'></pop-tip> -->
	</view>
</template>

<script>
	import PopTip from '@/components/popTip/popTip.vue';
	export default {
		components: {
			PopTip
		},
		data() {
			return {
				top: 0,
				height: 0,
				orderTop: 0,
				new_coupon_show: false,
				MembershipCode_show: false,
				list: [],
				userInfo: '' // 用户信息
			};
		},
		onShow() {
			this.getBanner(uni.getStorageSync('chooseCity').id)
			if (uni.getStorageSync("token")) {
				this.getUserinfo();
			} else {
				uni.navigateTo({
					url: '../login/index'
				})
			}
			this.getCouPon()
			// this.$refs.poptip.getMsg()
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: `快来啊!来大猴小猴开启'爱的陪伴,共同成长'亲子旅程!`,
				path: '/pages/home/home',
				imageUrl: 'https://shop666.oss-cn-hangzhou.aliyuncs.com/front/Monkey-ShareCards.png'
			}
		},
		// 分享到朋友圈
		onShareTimeline() {
			return {
				title: `快来啊!来大猴小猴开启'爱的陪伴,共同成长'亲子旅程!`,
				path: '/pages/home/home?inviteCode=${this.userInfo.inviteCode}',
				imageUrl: 'https://shop666.oss-cn-hangzhou.aliyuncs.com/front/Monkey-ShareCards.png',
			};
		},
		onLoad() {
			this.getMenuButtonBoundingClientRect();
		},
		methods: {
			//获取优惠券
			getCouPon() {
				const params = {
					merchantId: uni.getStorageSync('merchantId'),
					rows: 9,
					start: 0
				}
				this.$api.get_not_received_coupons(params).then(res => {
					this.couponList = res.data.record || [];
					if (this.couponList.filter(item => item.status == 0).length) {
						this.new_coupon_show = true;
					} else {
						this.new_coupon_show = false;
					}
				});
			},
			swiper_click(index) {
				console.log(this.list[index])
				if (this.list[index].link_url) {
					this.turnTo(this.list[index].link_url)
				}
			},
			getBanner(num) {
				this.$api.home_banner({
					region: num,
					type: 3,
				}).then(res => {
					this.list = res.data
				});
			},
			callMe(phone) {
				let current = uni.getStorageSync("QRcode")
				console.log("callMe", current);
				uni.previewImage({
					current,
					urls: [current]
				})
				// uni.makePhoneCall({
				// 	phoneNumber:phone
				// })
			},
			turnTo(urls) {
				uni.navigateTo({
					url: urls
				})
			},
			async getUserinfo() {
				const res = await this.$api.get_user_info();
				const data = res.data;
				this.userInfo = data;
				uni.setStorageSync('userInfo', data)
				uni.setStorageSync('open_id', data.openId)
			},
			getMenuButtonBoundingClientRect() {
				let info = uni.getMenuButtonBoundingClientRect();
				this.top = info.top;
				this.height = info.height;
				this.orderTop = info.height + 120;
			},
		}
	};
</script>

<style lang="scss" scoped>
	.title-bar {
		width: 100%;
		height: 48rpx;
		font-family: PingFangSC-Semibold;
		font-size: 34rpx;
		font-weight: 600;
		line-height: 48rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: none;
	}

	.app {
		background: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/invite.png);
		background-size: 100% 100%;
		overflow: hidden;
	}

	.avatar {
		position: relative;
		margin-top: 9vh;
		margin-bottom: 100rpx;

		.avatarInfo {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.personal-icon {
		vertical-align: middle;
	}
	/deep/.u-iconfont {
		font-size: 20rpx!important;
	}
	.personalData {
		font-family: PingFangSC-Regular;
		font-size: 20rpx;
		font-weight: normal;
		text-align: center;
		color: rgba(255, 255, 255, 0.8);
	}
	.userInfo_personal {
		justify-content: center;
	}
	.userInfo_personal /deep/.u-icon {
		font-size: 20rpx !important;
		margin-left: 4rpx !important;
	}
	.bj {
		width: 100%;
		height: 352rpx;

		.bj_z {
			width: 90%;
			margin: 0 auto;
			margin-top: 60rpx;

			.userInfo_personal {
				color: #dfffee;
				font-size: 24rpx;
				margin-left: 10rpx;

			}
		}
	}

	.u-swiper {
		transform: translateY(-75rpx);
		width: 690rpx;
		margin: 0 auto;
	}

	.u-swiper_z {
		border-radius: 20rpx;
		transform: translateY(-75rpx);
		width: 690rpx;
		height: 200rpx;
		overflow: hidden;
		margin: 0 auto;

		image {
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	/deep/ .u-avatar__img {
		width: 144rpx !important;
		height: 144rpx !important;
		border: 1px solid #FFFFFF;
	}

	.userInfo {
		font-size: 32rpx;
		margin-bottom: 10rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		line-height: 32rpx;
		color: #FFFFFF;
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 20rpx;

		.user-bj {
			width: 116rpx;
			height: 52rpx;
			background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-my-user.png);
			background-size: 116rpx 52rpx;

			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #f7931e;
			line-height: 52rpx;
			text-align: right;
			padding-right: 14rpx;
		}
	}

	.code {
		image {
			width: 36rpx;
			height: 36rpx;
			vertical-align: middle;
		}
	}

	.box {
		flex: 25%;
		border-right: 2rpx solid #88cca8;
		text-align: center;

		&:nth-of-type(4) {
			border: none;
		}

		view {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #ffffff;
			line-height: 40rpx;

			text {
				margin-right: 10rpx;
			}

			&:last-child {
				font-size: 24rpx;
				font-weight: 400;
				color: #dfffee;
				line-height: 24rpx;
			}
		}

		image {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.order {
		width: 100%;
		margin: auto;
		margin-top: 20.48vh;
		padding: 20rpx;
		box-sizing: border-box;
		transform: translateY(-100rpx);
		box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.07);
		border-bottom: 24rpx solid rgba(136, 115, 255, 0.2);

		.border {
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #f3f3f3;
		}

		.arrow {
			text {
				margin-right: 15rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 24rpx;
			}
		}

		.list {
			text-align: center;

			image {
				width: 64rpx;
				height: 64rpx;
			}
		}
	}

	.main {
		border-bottom: 24rpx solid rgba(136, 115, 255, 0.2);
	}

	.ul {
		width: 100%;
		transform: translateY(-45rpx);
		margin-top: -48rpx;
		padding: 32rpx;
		box-sizing: border-box;
		box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.07);

		.mian-title {}

		.mian-title-left {}

		.mian-title-right {
			color: #666666;
			font-size: 24rpx;
		}

		.li {
			padding: 22rpx 0;
			border-bottom: 2rpx solid #f3f3f3;

			&:nth-last-of-type(1) {
				border: none;
			}

			.icon {
				flex: 0 0 44rpx;
				margin-right: 60rpx;

				image {
					width: 44rpx;
					height: 44rpx;
				}
			}

			.text {
				flex: 1 1 150rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
			}

			.right {
				flex: 0 1 150rpx;
				text-align: right;

				.subText {
					flex: 0 0 130rpx;
					display: flex;
					justify-content: flex-end;

					.color {
						margin: 0 10rpx;
						color: #038e45;
					}
				}
			}

			.tab {
				width: 35rpx;
				height: 35rpx;
				text-align: center;
				line-height: 35rpx;
				font-size: 24rpx;
				color: #ffffff;
			}
		}
	}

	.title {
		padding-left: 15rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 40rpx;
	}

	.main_z_list,
	.main_o_list {

		.share_button::after {
			border: none;
			padding-left: 0;
			padding-right: 0;

		}

		.share_button {
			padding-left: 0;
			padding-right: 0;
			margin-left: 0;
			margin-right: 0;
			line-height: 35rpx;
		}

		.main_z_item {
			width: 20%;
			margin: 20rpx 10rpx;
			position: relative;

			.main_z_item_text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 34rpx;
				text-align: center;
				color: #FFFFFF;
			}

			.main_z_item_img {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}

	.main_o_list {
		margin: 0;

		.main_z_item .main_z_item_img {
			width: 36rpx;
			height: 36rpx;
			margin-bottom: 10rpx;
		}
	}

	.mark {
		width: 12px;
		height: 12px;
		vertical-align: middle;
		margin-right: 4px;
		position: absolute;
		top: 0;
		right: 8px;
	}
</style>

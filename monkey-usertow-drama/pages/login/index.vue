<template>
	<view class="content">
		<Header toIndex="true"></Header>
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/ready.png" mode="heightFix">
			</image>
		</view>
		<view class="bgImage" v-if="!userInfo.nickname">
			<image src="../../static/login/login-bgImg.png" mode="widthFix"></image>
		</view>
		<view class="bg-top" style="width: 100%;height: 100%;"></view>
		<view class="avatar">
			<view class="avatarInfo">
				<view class="avatarInfo-img">
					<u-avatar :src="userInfo.icon" size="144"></u-avatar>
				</view>
				<view class="userInfo">
					<view class="userInfo-text1" style="font-size: 28rpx;"><text style="margin-right: 26rpx;">剧本杀</text>
						申请授权</view>
					<view class="userInfo-text2" v-if="!userInfo.nickname">获得你的公开信息（昵称、头像等）</view>
				</view>
			</view>
		</view>
		<!-- <view class="title">用户授权</view> -->
		<!-- <image class="logo" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-logo.png" mode="widthFix">
		</image> -->
		<!-- <view class="user-other-tel">使用其他手机号登录</view> -->
		<view class="login" :style="{top:(!userInfo.icon?'1100rpx':'700rpx')}">
			<view @click="navTo(`/pages/home/home`)" class="button" style="
          color: #f7931e;
          width: 300rpx;
          border: 2rpx solid #f7931e;
          border-radius: 40rpx;
        " v-if="false">
				取消登录
			</view>
			<view class="button bj">
				<!-- <text>{{ isUserInfo ? '授权允许' : '获取手机号' }}</text> -->
				<view class="wx-allow">
					<image style="width: 100%;height: auto;"
						:src="!userInfo.icon?'../../static/login/login-btn2.png':'../../static/login/login-btn.png'"
						mode="widthFix">
					</image>
					<!-- <text v-else>获取手机号</text> -->
				</view>
				<button class="button btn" v-if="isUserInfo && canIUseGetUserProfile" type="default"
					@click="getUserProfile" :disabled="isDisabled">
					授权允许
				</button>
				<button class="button btn" v-else-if="isUserInfo && !canIUseGetUserProfile" type="default"
					open-type="getUserInfo" @getUserInfo="getUserInfo" :disabled="isDisabled">
					授权允许
				</button>
				<button class="button btn" v-else type="default" open-type="getPhoneNumber"
					@getphonenumber="getphonenumber">
					获取手机号
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					nickname: '',
					icon: '',
					openid: '',
					sex: '',
					vestige_id: '',
					inviteCode: '', // 邀请码
				},
				isDisabled: false,
				code: '', // code会5分钟失效,且使用过一次需要重新获取
				timer: '', // 定时获取code,
				isUserInfo: true,
				canIUseGetUserProfile: false, // 兼容pc微信
				wechat: '', // 微信信息
				appId: '', // 小程序appid
				merchantId: null, // 当前的商户id
			}
		},
		onLoad({
			inviteCode,
			vestige_id
		}) {
			// 先登录，避免第一次获取用户信息报错
			this.getCode()
			this.userInfo.inviteCode = inviteCode || ''
			this.userInfo.vestige_id = vestige_id || ''
			if (wx.getUserProfile) {
				this.canIUseGetUserProfile = true
			}
			this.appId = uni.getStorageSync('appId');
			this.merchantId = uni.getStorageSync('merchantId') || null;
		},
		onUnload() {
			uni.setStorageSync('page', null)
			clearInterval(this.timer)
		},
		onHide() {
			uni.setStorageSync('page', null)
			uni.switchTab({
				url: "../home/home"
			})
		},
		methods: {
			navTo(url) {
				uni.switchTab({
					url,
				})
			},
			async getUserInfo(e) {
				this.isDisabled = true;
				// 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
				const res = e.detail
				await this.successCallback(res)
			},
			async successCallback(res) {
				const {
					userInfo,
					encryptedData,
					iv,
					signature
				} = res
				this.userInfo.nickname = userInfo.nickName
				this.userInfo.icon = userInfo.avatarUrl
				this.userInfo.sex =
					userInfo.gender === 1 ? '男' : userInfo.gender === 2 ? '女' : '保密'
				const code = await this.getCode()
				console.log(code)
				const result = await this.login({
					code,
					encryptedData,
					iv,
					signature,
					appId: this.appId,
					inviteCode: uni.getStorageSync('invite') || this.userInfo.inviteCode || '',
				})
				const {
					authKey,
					isInUse,
					username,
					inviteCode,
					entity,
					wxMaUserInfo
				} = result
				this.wechat = {
					authKey,
					encryptedData,
					iv,
					signature,
					username,
					inviteCode,
					entity,
					wxMaUserInfo,
				}
				if (isInUse === 2) {
					const _this = this
					_this.isUserInfo = false
					// wx.login({
					//   success({ code }) {
					//     _this.code = code;
					//   },
					// })
					// 更换按钮
				} else {
					uni.setStorageSync('token', result.token)
					uni.setStorageSync('inviteCode', result.inviteCode)
					this.getUserInfoApi(res)
				}
			},
			getUserProfile() {
				this.isDisabled = true;
				const _this = this;
				wx.getUserProfile({
					desc: '登录',
					success: async (res) => {
						await _this.successCallback(res)
					},
					fail: (res) => {
						uni.showToast({
							title: res.msg,
							icon: 'none',
						})
					},
					complete(res) {
						_this.isDisabled = false;
					}
				})
			},
			async getCode() {
				const _this = this
				return await new Promise(resolve => wx.login({
					success({
						code
					}) {
						console.log('wx.login getCode', code)
						resolve(code)
					},
				}))
			},
			// 微信登录
			async login(params) {
				const res = await this.$api.wechat_login(params)
				return res.data
			},
			async getphonenumber(e) {
				// 获取手机号
				const code = await this.getCode()
				console.log('code', code)
				// 新用户注册
				const res = await this.$api.wechat_phone({
					code,
					authKey: this.wechat.authKey,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					username: this.wechat.username,
					appId: this.appId,
					entity: this.wechat.entity,
					wxMaUserInfo: this.wechat.wxMaUserInfo,
					inviteCode: uni.getStorageSync('invite') || this.userInfo.inviteCode || '',
					//localStorage.setItem('invite'
					merchantId: this.merchantId
				})
				console.log('getphonenumber: ', res)
				if (res !== false) {
					uni.setStorageSync('token', res.data.token)
					uni.setStorageSync('inviteCode', res.data.inviteCode)
					await this.getUserInfoApi()
				}
			},
			// 获取用户信息
			async getUserInfoApi() {
				const res = await this.$api.get_user_info();
				const data = res.data
				this.userInfo.mobile = data.phone
				uni.setStorageSync('userInfo', data)
				uni.setStorageSync('open_id', data.openId)
				await this.$api.connect_store({
					merchantId: this.merchantId
				})

				this.isDisabled = false;
				const page = uni.getStorageSync('page')
				if (page) {
					await uni.navigateBack({
						delta: 1,
					})
					await uni.setStorageSync('page', null)
				} else {
					await uni.switchTab({
						url: '/pages/home/home',
					})
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: -3;
	}

	.bgImage {
		position: fixed;
		width: 80%;
		height: auto;
		left: 50%;
		transform: translateX(-50%);
		top: 600rpx;
		z-index: -1;
	}

	.bg-top {
		position: fixed;
		top: 0;
		background: #000;
		filter: alpha(Opacity=60);
		opacity: 0.6;
		z-index: -2;
	}

	.avatar {
		position: relative;
		margin-top: 18vh;
		// height: 200rpx;
		margin-bottom: 100rpx;

		.avatarInfo {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);

			.avatarInfo-img {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}

	.userInfo {
		font-size: 32rpx;
		margin-bottom: 10rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		line-height: 32rpx;
		color: #FFFFFF;
		text-align: center;
		margin-top: 180rpx;
		margin-bottom: 20rpx;
	}

	.userInfo-text1 {
		font-size: 34rpx;
		color: #FFFFFF;
		margin-bottom: 30rpx;
	}

	.userInfo-text2 {
		font-size: 26rpx;
		color: #FFFFFF;
		margin-bottom: 30rpx;
		width: 408rpx;
	}

	// .content {
	// 	align-items: center;
	// 	font-family: PingFangSC-Medium, PingFang SC;
	// }

	.title {
		margin: 156rpx 0 30rpx 0;
		font-size: 44rpx;
		font-weight: 500;
		color: #333333;
		text-align: center;
		line-height: 60rpx;
	}

	.login {
		position: absolute;
		top: 600rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.subtitle {
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
		line-height: 40rpx;
	}

	.logo {
		width: 320rpx;
		margin: 60rpx auto 120rpx auto;
	}

	.wx-allow {}

	.button {
		width: 600rpx;
		height: 80rpx;
		margin: auto;
		text-align: center;
		line-height: 80rpx;

		text {
			font-size: 32rpx;
			font-weight: 500;
			color: #ffffff;
		}
	}

	.bj {
		position: relative;
		// background: url(../../static/big-button.png);
		background-size: 300rpx 80rpx;
	}

	.user-other-tel {
		position: absolute;
		top: 60vh;
		left: 50%;
		transform: translateX(-50%);
		padding: 0 16rpx 10rpx;
		border-bottom: 2rpx solid white;
		height: 40rpx;
		line-height: 40rpx;
		background-color: none;
		font-size: 24rpx;
		text-align: center;
		color: white;
	}

	.btn {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
</style>

<template>
	<view>
		<Header toIndex='true'></Header>
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/ready.png" mode="heightFix">
			</image>
		</view>
		<view class="bg-mask" v-if="step != 4">
		</view>
		<view class="bg-mask4" v-if="step == 4">
		</view>
		<!-- <view class="bg">
		</view> -->
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<!-- <view class="bg-img" v-if="step != 4" :style="{marginTop: step == 1 ? '540rpx' : '0'}">
			<image style="width: 100%;height: 100%;" src="../../static/activity/bg.png" mode="widthFix"></image>
		</view>
		<view class="white-bg" v-if="step != 4" :style="{height: step == 1 ? '273rpx' : '590rpx'}">
		</view> -->
		<view class="scan-button" @click="scan" v-if="step == 1">
			<view class="scan-button-text">
				点击扫码 加入游戏
			</view>
			<image class="button-bg"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/scan-button-bg.png" mode="">
			</image>
		</view>
		<view class="step-select" v-if="step == 2">
			<view class="step-select-son" @click="handleSelectLeader">
				<view class="step-select-son-text">
					我是<br>
					队长
				</view>
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/step-select-bg.png"
					mode=""></image>
			</view>
			<view class="step-select-son" @click="handleSelectMember">
				<view class="step-select-son-text">
					我是<br>
					队员
				</view>
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/step-select-bg.png"
					mode=""></image>
			</view>
		</view>
		<view class="step-leader" v-if="step == 3">
			<view class="step-leader-divider">
				<view class="step-leader-divider-text">
					请选择您的团队
				</view>
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/title-bg1.png" mode="">
			</view>
			<view class="step-leader-roles">
				<view class="step-leader-role" v-for="(item, index) in teamData" :key="index">
					<view class="step-leader-role-img-v" @click="changeTeam(item, index)">
						<image class="step-leader-role-img" :src="item.teamLogo"
							:style="{border: index == teamIndex ? '6rpx solid #FF8D01' : ''}" mode=""></image>
						<view class="step-leader-role-tag" v-if="!item.userId">
							可选
						</view>
						<view class="step-leader-role-tag" v-if="item.userId"
							style="background-color: #F00C0C;right: -30rpx;">
							不可选
						</view>
					</view>
					<view class="step-leader-role-name">
						{{item.teamName}}
					</view>
				</view>
			</view>
			<view class="step-leader-divider2">
				将此码出示给DM
			</view>
			<view class="step-leader-scan">
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/step-leader-scan-bg.png"
					mode="">
					<view style="width: 100%;height: 100%;object-fit: cover;z-index: 1;">
						<!-- <image style="width: 100%;height: 100%;object-fit: cover;z-index: 1;position: relative;"
						src="../../static/album-topbg.jpg" mode="">
					</image> -->
						<canvas style="width: 128px; height: 128px;" canvas-id="myQrcode"></canvas>
					</view>
			</view>
			<view class="step-leader-select-text">
				（当前选择：{{teamData[teamIndex].teamName}}）
			</view>
			<!-- <view class="step-leader-tip">
				请等待DM扫码
			</view> -->
			<view class="step-leader-button" @click="handleLeaderStartGame">
				<view class="scan-button-text">
					进入游戏
				</view>
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/scan-button-bg.png"
					mode=""></image>
			</view>
		</view>
		<view class="step-player" v-if="step == 4">
			<view class="step-player-divider">
				<view class="step-leader-divider-text">
					当前已加入玩家
				</view>
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/title-bg1.png" mode="">
			</view>
			<view class="step-player-roles">
				<view class="step-player-role" v-for="(item, index) in roleDataBind" :key="index">
					<view class="step-player-role-img-v">
						<image class="step-player-role-img" :src="item.roleLogo" mode=""></image>
					</view>
					<view class="step-player-role-name">
						{{item.roleName}}
					</view>
				</view>
			</view>
			<view class="step-player-text">
				<view class="step-leader-divider-text">
					请选择您的角色
				</view>
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/title-bg1.png" mode="">
			</view>
			<view class="step-player-img">
				<!-- <curry-swiper :width="195" :space="112" :inverseScaling="400" :height="107" :perspective="14"
					:border="3" :count="10" ref="swiper">
					<curry-slide v-for="(slide, i) in sceneList" :index="i" :key="i">
						<template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
							<img :data-index="index"
				   	:class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }"
								:src="slide.img" />
						</template>
					</curry-slide>
				</curry-swiper> -->
				<!-- <u-swiper :circular="true" :current="roleCurrent" :effect3d="true" @change="change" border-radius="20"
					:autoplay="false" height="600" mode="none" :list="listData" title="true">
				</u-swiper> -->
				<kevy-swiper ref='kevySwiper' @click="swClick" @change="change" :list="imgListUnbind" height="460"
					@swip='handleSwip' />
				<view class="swiper-button">
					<view class="swiper-button-son" @click="handleBtnSwip('left')">
						<image style="width: 100%;height: 100%;"
							src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/swiper-left.png"
							mode=""></image>
					</view>
					<view class="swiper-button-son" @click="handleBtnSwip('right')">
						<image style="width: 100%;height: 100%;"
							src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/swiper-right.png"
							mode=""></image>
					</view>
				</view>
				<!-- <view class="step-player-img-name">
					{{roleDataUnBind[roleCurrent].roleName}}
				</view> -->
				<!-- <image style="width: 100%;height: 100%;object-fit: cover;" src="../../static/album-topbg.jpg" mode="">
				</image> -->
			</view>
			<view class="step-player-info">
				<view class="">
					角色介绍：
				</view>
				<view class="step-player-info-detail">
					{{roleDataUnBind[roleCurrent].roleDesc}}
				</view>
			</view>
			<view class="step-leader-button" @tap='selectRole'>
				<view class="scan-button-text">
					进入游戏
				</view>
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/scan-button-bg.png"
					mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import kevySwiper from '@/components/kevy-swiper/kevy-swiper'
	import drawQrcode from '@/utils/weapp.qrcode.esm.js'
	import {
		scanCode,
		parseSceneStr,
		scanCodeUrl,
		parseQueryString
	} from '@/common/util.js'

	export default {
		components: {
			kevySwiper,
		},
		data() {
			return {
				activeId: 0,
				step: 1,
				teamIndex: 0,
				roleCurrent: 0,
				// list: [{
				// 		image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 		title: ''
				// 	},
				// 	{
				// 		image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 		title: ''
				// 	},
				// 	{
				// 		image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 		title: ''
				// 	},
				// 	{
				// 		image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 		title: ''
				// 	},
				// 	{
				// 		image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 		title: ''
				// 	}
				// ],
				teamData: [],
				roleDataBind: [
				// 	{
				// 	roleLogo: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 	roleName: '1测试数据'
				// }, {
				// 	roleLogo: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 	roleName: '2测试据'
				// }, {
				// 	roleLogo: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 	roleName: '3测据'
				// }, {
				// 	roleLogo: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 	roleName: '4据'
				// },
				],
				roleDataUnBind: [
					// {
					// 	roleLogo: 'https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/scan-button-bg.png',
					// 	roleName: '1角色名字名字',
					// 	roleDesc: '1昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东'
					// },
					// {
					// 	roleLogo: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					// 	roleName: '2角色名字字',
					// 	roleDesc: '2昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东'
					// },
					// {
					// 	roleLogo: 'https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/ready.png',
					// 	roleName: '3角色名',
					// 	roleDesc: '3昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东'
					// },
					// {
					// 	roleLogo: 'https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/ready.png',
					// 	roleName: '4角色',
					// 	roleDesc: '4昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东'
					// },
					// {
					// 	roleLogo: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					// 	roleName: '5角色',
					// 	roleDesc: '5昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东'
					// },
					// {
					// 	roleLogo: 'https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/ready.png',
					// 	roleName: '6角色',
					// 	roleDesc: '6昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东，画楼西畔桂堂东昨夜星辰昨夜风，画楼西畔桂堂东'
					// }
				],
			}
		},
		computed: {
			imgListUnbind() {
				const list = this.roleDataUnBind.map(item => {
					return {
						image: item.roleLogo,
						title: item.roleName
					}
				})
				return list
			},
			// listData() {
			// 	const listData = this.list.map((item, index) => {
			// 		return {
			// 			image: item.image,
			// 			title: this.roleDataUnBind[index].roleName
			// 		}
			// 	})
			// 	return listData
			// }
		},
		async onLoad(option) {
			console.log('onLoad', option)
			if (option && (option.scene || option.q)) {
				let sceneObj = {}
				if (option.scene) {
					sceneObj = parseSceneStr(option.scene)
				} else {
					sceneObj = parseQueryString(decodeURIComponent(option.q))
				}
				uni.setStorageSync('activeId', sceneObj.activeId)
				this.activeId = sceneObj.activeId
				const resCheck = await this.checkUserBind()
				if (resCheck) {
					this.navTo('/pagesB/activity/loading')
				}
				// 如果有activeTeamId,则选择角色
				else if (sceneObj.activeTeamId) {
					this.activeTeamId = sceneObj.activeTeamId
					this.getTeamRoleList()
				} else {
					this.step = 2;
				}
			} else {
				//判断用户是否授权 提示信息 再跳转
				this.getUserPlayingActive()
			}
			this.$api.log_save({
				page: 'pagesB/activity/ready',
				key: 'onload',
				option
			})
		},
		onShow() {
			console.log('onShow')
		},
		methods: {
			async getUserPlayingActive() {
				const res = await this.$api.getUserPlayingActive()
				if (res.data) {
					uni.setStorageSync('activeId', res.data.id)
					this.navTo('/pagesB/activity/loading')
				}
			},
			async handleLeaderStartGame() {
				const res = await this.$api.getIsTeamLeaderBind({
					activeId: this.activeId || 1
				})
				if (!res.data.status) {
					uni.showToast({
						title: '未绑定成功',
						icon: 'error'
					})
					return
				}
				this.navTo('/pagesB/activity/loading')
			},
			swClick(data) {},
			async checkUserBind() {
				const res = await this.$api.getIsUserRoleBind({
					activeId: this.activeId || 1,
				})
				if (res.status !== 200) return
				return res.data
			},
			async selectRole() {
				const role = this.roleDataUnBind[this.roleCurrent] || {}
				const res = await this.$api.addActiveRole({
					activeId: this.activeId,
					roleId: role.id
				})
				if (res.status !== 200) {
					uni.showToast({
						title: res.reason || '绑定角色失败',
						icon: "error"
					})
					return
				}
				this.navTo('/pagesB/activity/loading')
			},
			async handleSelectLeader() {
				const res = await this.$api.getActiveTeamList({
					activeId: this.activeId,
				})
				if (res.status !== 200) {
					return
				}
				this.teamData = res.data || []
				this.teamIndex = res.data.findIndex(item => !item.userId) || 0
				this.changeTeam(res.data[this.teamIndex], this.teamIndex)
				this.step = 3
			},
			async handleSelectMember() {
				// TODO 报错 - 不确定的解决方案？
				// const result = await scanCode()
				// const resObj = parseQueryString(result);

				const result = await scanCodeUrl()
				const resObj = result

				this.activeTeamId = resObj.activeTeamId
				this.getTeamRoleList()
			},
			async getTeamRoleList() {
				const resRole = await this.$api.getActiveRoleList({
					activeTeamId: this.activeTeamId
				})
				if (resRole.status !== 200) {
					uni.showToast({
						title: '获取角色列表失败',
						icon: 'error'
					})
					return
				}
				this.roleDataBind = resRole.data.listBind
				this.roleDataUnBind = resRole.data.listUnBind
				this.step = 4
			},
			handleSwip(type) {
				this.roleSwiper(type)
			},
			handleBtnSwip(type) {
				this.roleSwiper(type)
				this.$refs.kevySwiper.swip(type)
			},
			roleSwiper(type) {
				if (type == 'left') {
					if (this.roleCurrent == 0) {
						this.roleCurrent = this.roleDataUnBind.length - 1;
					} else {
						this.roleCurrent--;
					}
				} else if (type == 'right') {
					if (this.roleCurrent == this.roleDataUnBind.length - 1) {
						this.roleCurrent = 0;
					} else {
						this.roleCurrent++;
					}
				}
			},
			change(index) {
				console.log(index)
				this.roleCurrent = index;
			},
			changeTeam(item, index) {
				if (item.userId) {
					uni.showToast({
						title: '该团队不可选择',
						icon: 'none',
						duration: 2000
					});
					return
				}
				this.teamIndex = index;
				const userInfo = uni.getStorageSync('userInfo');
				const data = {
					activeTeamId: item.id,
					userId: userInfo.id
				}
				console.log(data)
				this.$nextTick(function() {
					drawQrcode({
						width: 128,
						height: 128,
						canvasId: 'myQrcode',
						// ctx: wx.createCanvasContext('myQrcode'),
						text: JSON.stringify(data),
						// v1.0.0+版本支持在二维码上绘制图片
					})
				})
			},
			async scan() {
				const result = await scanCodeUrl()
				const res = result
				this.activeId = res.activeId
				uni.setStorageSync('activeId', result.activeId)
				const resCheck = await this.checkUserBind()
				if (resCheck) {
					this.navTo('/pagesB/activity/loading')
				} else {
					this.step = 2;
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

<style>
	/* page {
		background-image: url(../../static/bg/ready.png);
	} */
</style>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
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

	.bg-mask4 {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: linear-gradient(rgba(14, 24, 50, 0.9), rgba(7, 0, 0, 1));
		z-index: -1;
	}

	.button-bg {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		z-index: 0;
	}

	// 火箭图片
	.bg-img {
		margin-top: 340rpx;
	}

	// 扫码按钮
	.white-bg {
		height: 273rpx;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: white;
		z-index: -1;
	}

	.scan-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 472rpx;
		height: 112rpx;
		color: white;
		margin: 920rpx auto 0;
		border-radius: 12rpx;
		font-size: 32rpx;
		font-weight: bold;
		position: relative;
	}

	.scan-button-text {
		z-index: 1;
	}

	// 选择身份
	.step-select {
		display: flex;
		justify-content: space-between;
		background: linear-gradient(rgba(20, 34, 70, 0.5), rgba(7, 0, 0, 1));
		width: 100vw;
		height: calc(100vh - 320rpx - var(--status-bar-height));
		margin-top: 120rpx;
		padding: 220rpx 75rpx 0;
	}

	.step-select-son {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 264rpx;
		height: 264rpx;
		color: white;
		border-radius: 12rpx;
		position: relative;
	}

	.step-select-son-text {
		z-index: 1;
		font-size: 44rpx;
		font-weight: bold;
	}

	// 选择队长
	.step-leader {
		background: linear-gradient(rgba(20, 34, 70, 0.5), rgba(7, 0, 0, 1));
		width: 100vw;
		min-height: calc(100vh - 320rpx - var(--status-bar-height));
		margin-top: 120rpx;
		padding: 50rpx 75rpx 40rpx;
	}

	.step-leader-divider {
		// margin-top: 460rpx;
		width: 354rpx;
		height: 60rpx;
		position: relative;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.step-leader-divider-text {
		color: white;
		z-index: 1;
		font-size: 32rpx;
	}

	.step-leader-roles {
		padding: 65rpx 0 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.step-leader-role {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-right: 30rpx;
	}

	.step-leader-role-img {
		width: 88rpx;
		height: 88rpx;
		border-radius: 100rpx;
		border: 2rpx dashed;
		object-fit: cover;
	}

	.step-leader-role-img-v {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.step-leader-role-tag {
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		background-color: #2ED01B;
		color: white;
		border-radius: 25rpx;
		font-size: 20rpx;
		padding: 4rpx 8rpx;
	}

	.step-leader-role-name {
		font-size: 24rpx;
		margin-top: 20rpx;
		color: white;
	}

	.step-leader-divider2 {
		margin-top: 60rpx;
		text-align: center;
		color: #A18CBE;
		font-size: 24rpx;
	}

	.step-leader-scan {
		margin: 20rpx auto 0;
		width: 288rpx;
		height: 288rpx;
		padding: 16rpx;
		border-radius: 6rpx;
		position: relative;
	}

	.step-leader-select-text {
		text-align: center;
		margin-top: 30rpx;
		color: white;
		font-size: 24rpx;
	}

	.step-leader-tip {
		text-align: center;
		margin-top: 30rpx;
		color: red;
	}

	.step-leader-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 472rpx;
		height: 112rpx;
		color: white;
		margin: 30rpx auto 0;
		border-radius: 12rpx;
		font-size: 32rpx;
		position: relative;
	}

	// 选择队员
	.step-player-divider {
		width: 354rpx;
		height: 60rpx;
		position: relative;
		margin: 140rpx auto 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-player-roles {
		padding: 34rpx 98rpx 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		// background-color: white;
	}

	.step-player-role {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 4rpx 18rpx;
	}

	.step-player-role-img {
		width: 100%;
		height: 100%;
		border-radius: 100rpx;
		object-fit: cover;
	}

	.step-player-role-img-v {
		width: 86rpx;
		height: 86rpx;
		border-radius: 100rpx;
		border: 2rpx solid #6FAAFF;
	}

	.step-player-role-name {
		font-size: 24rpx;
		margin-top: 10rpx;
		color: white;
	}

	.step-player-text {
		width: 354rpx;
		height: 60rpx;
		position: relative;
		margin: 60rpx auto 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.step-player-img {
		margin: 20rpx auto;
		// width: 600rpx;
		position: relative;
	}

	/deep/ swiper {
		background-color: transparent !important;
	}

	/deep/.u-swiper-wrap {
		height: 600rpx !important;
		margin-top: -10rpx;

		// width: 560rpx!important;
		swiper {
			height: 600rpx !important;
		}
	}


	/deep/ .u-list-image-wrap {
		position: relative;
		width: 496rpx !important;
		height: 496rpx !important;
		overflow: visible !important;
		border-radius: 20rpx;
		border: 1rpx solid #99BBFF;
		box-shadow: 0px 0px 15px 0px rgba(57, 211, 255, 0.3);
	}

	/deep/ swiper {
		background-color: transparent !important;
		// padding-left: 100rpx;
		padding-bottom: 50rpx;
	}

	/deep/ .u-swiper-item {
		width: 500rpx !important;
		margin-left: 45rpx;
		padding: 0 30rpx 50rpx !important;
	}

	/deep/ .u-swiper-image {
		width: 100% !important;
		border-radius: 20rpx;
	}

	/deep/.u-swiper-title {
		min-width: 172rpx;
		padding: 0 16rpx;
		height: 68rpx;
		width: auto !important;
		background-image: linear-gradient(#FFFAE1, #FFCA7C);
		border-radius: 30rpx !important;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36rpx !important;
		position: absolute;
		left: auto !important;
		right: 55rpx;
		bottom: -40rpx !important;
		z-index: 10000;
		color: black !important;
	}

	.swiper-button {
		position: absolute;
		left: 0;
		// top: 260rpx;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		display: flex;
		justify-content: space-between;
		z-index: 10000;
		padding: 0 94rpx;
	}

	.swiper-button-son {
		width: 63rpx;
		height: 62rpx;
	}

	.step-player-img-name {
		min-width: 172rpx;
		padding: 0 16rpx;
		height: 68rpx;
		background-image: linear-gradient(#FFFAE1, #FFCA7C);
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
		position: absolute;
		right: 159rpx;
		bottom: -34rpx;
		z-index: 10000;
	}

	.step-player-info {
		margin: 10rpx auto 50rpx;
		width: 525rpx;
		color: white;
	}

	.step-player-info-detail {
		font-size: 24rpx;
		margin-top: 20rpx;
		color: #C2C0C2;
	}
</style>

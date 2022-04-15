<template>
	<view>
		<Header :onBack='handleBack'></Header>
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/activity-index.png"></image>
		</view>
		<!-- <view class="title">
			{{activeDetail.name}}
		</view> -->
		<view class="title-bar" :style="{paddingTop:top+'px',height:height+'px'}">
			<view class="personal-title" style="height: 66rpx;line-height: 66rpx;">{{activeDetail.name}}</view>
		</view>
		<!-- <view class="first">
			汇通天下
		</view> -->
		<view class="second">
			<view class="second-left">
				<view class="second-left-avatar-father" style="width: 84rpx;height: 84rpx;">
					<image class="second-left-avatar" :src="roleDetail.roleLogo"
						style="width: 100%;height: 100%;object-fit: cover;border-radius: 100%;"></image>
				</view>
				<view class="second-left-info">
					<view class="second-left-info-first">
						<view class="second-left-info-first-name">
							{{userInfo.nickname}}
						</view>
						<view class="second-left-info-first-badge" v-if='roleDetail.roleType==2'>
							队长
						</view>
					</view>
					<view class="second-left-info-second">
						财富值：{{roleDetail.pointValue || 0}}
					</view>
				</view>
			</view>
			<view class="second-right" @click="navTo('/pagesB/activity/invite')">
				<view class="second-right-text">
					邀请小伙伴
				</view>
				<image class="button-bg"
					src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/invite-bg.png" mode="">
				</image>
			</view>
			<image class="button-bg"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/Group30.png" mode="">
			</image>
		</view>
		<view class="third">
			<view class="third-left">
				<view class="third-left-roleName"
					style="background-image: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/Group30.png);">
					角色：{{roleDetail.roleName}}
				</view>
				<view class="third-left-roleName third-left-role"
					style="background-image: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/Group30.png);">
					队伍：{{roleDetail.teamName}}
				</view>
			</view>
			<view class="third-right" @tap="navTo('/pagesB/activity/role-detail')">
				详情 >
			</view>
		</view>
		<view class="fourth">
			<u-line-progress :percent="progressData.percent" inactive-color="#363084" activeColor="#363084" height="12"
				:show-percent="false"></u-line-progress>
			<view class="progress-img">
				<image src="../../static/index/progress-bgimg.png" style="width: 100%;height: 100%;" mode="widthFix">
				</image>
			</view>
			<view class="fourth-progress-info">
				<view class="fourth-progress-son" v-for="(item, index) in progressData.data" :key="index">
					<view class="fourth-progress-son-icon" @click="handleStageSelect(item, index)"
						:style="{'backgroundColor': item.percent > progressData.percent ? 'white' : ''}">
					</view>
					<view class="fourth-progress-son-icon-now" v-if="item.percent == progressData.percent">
						<image src="../../static/index/progress-now.png" mode="widthFix"></image>
					</view>
					<view class="fourth-progress-son-text">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="fifth" @click="navTo('/pagesB/activity/plot-detail')"> -->
		<view class="fifth">
			<!-- 剧情轮播 -->
			<!-- <image style="background-color: #4CB8F0;" src="" class="fifth-img"></image> -->
			<activity-swiper @click="toPlotDetail" :circular="false" :current="roleCurrent" :effect3d="true"
				@change="change" border-radius="20" :autoplay="false" height="375" mode="none"
				:list="curStageInfo.plotList | mapPlotImgList" title="true">
			</activity-swiper>

			<!-- <view class="fifth-box"> -->
			<!-- <view class="fifth-title">
					{{curStageInfo.plotList[roleCurrent].title}}
				</view> -->
			<!-- <view class="fifth-info">
					{{curStageInfo.plotList[roleCurrent].introduction}}
				</view> -->
			<!-- </view> -->
		</view>

		<view class="sixth">
			<view class="sixth-son" v-for='(item,index) in (curStageInfo.taskList||[])'
				@tap="navTo('/pagesB/activity/task?id='+item.id)" :key='item.id'>
				<image class="sixth-son-img " :style="{'backgroundColor': '#33156d', 
							 'border': item.done ? '4rpx solid #9EC0FF' : '',
							 'width': item.done ? '154rpx' : ''}" :src="item.icon" mode="aspectFill"></image>
				<view class="sixth-son-info" style="padding-bottom: 0;">
					<view class="sixth-son-info-left">
						{{item.name}}
					</view>
				</view>
				<view class="sixth-son-finish" v-if="item.done">
					<image style="width: 44rpx;height: 100%;"
						src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/task-finish.png"
						mode=""></image>
				</view>
				<view class="sixth-son-mask" style="bottom: -8rpx;width: 162rpx;">
					<image style="width: 158rpx;height: 100%;"
						src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/task-mask.png"
						mode=""></image>
				</view>
			</view>
		</view>

		<view class="seventh">
			<view class="seventh-left">
				<view class="seventh-son" @click="navTo('/pagesB/activity/clue')">
					<view class="seventh-son-icon">
						<image style="width: 100%;height: 100%;"
							src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/clue.png"
							mode=""></image>
					</view>
					<view class="seventh-son-text">
						线索
					</view>
				</view>
				<view class="seventh-son" @click="handleToMap">
					<view class="seventh-son-icon">
						<image style="width: 100%;height: 100%;"
							src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/map.png"
							mode=""></image>
					</view>
					<view class="seventh-son-text">
						地图
					</view>
				</view>
				<view class="seventh-son" @click="getInfo">
					<view class="seventh-son-icon">
						<image style="width: 100%;height: 100%;" src="../../static/index/refresh.png" mode=""></image>
					</view>
					<view class="seventh-son-text">
						刷新
					</view>
				</view>
				<view class="seventh-son" @click="navTo('/pagesB/activity/marry')" v-if='activeDetail.turnOnMarry'>
					<view class="seventh-son-icon">
						<image style="width: 100%;height: 100%;"
							src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/marry.png"
							mode=""></image>
					</view>
					<view class="seventh-son-text">
						结婚
					</view>
				</view>
				<view class="seventh-son" @click="navTo('/pagesB/activity/ranking')">
					<view class="seventh-son-icon">
						<image style="width: 100%;height: 100%;"
							src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/ranking.png"
							mode=""></image>
					</view>
					<view class="seventh-son-text">
						排行
					</view>
				</view>
			</view>
			<view class="seventh-right" @click="navTo('/pagesB/chat/chat')">
				<view class="seventh-son">
					<view class="seventh-son-icon">
						<image style="width: 100%;height: 100%;"
							src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/message.png"
							mode=""></image>
					</view>
					<view class="seventh-son-text">
						队伍消息
					</view>
					<view class="seventh-son-dot" v-if="last_msg_id">
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {list} from 'F:/yuchangbin/JSON数据/data.json'
	import activitySwiper from '../../components/uActivitySwiper/uActivitySwiper.vue'
	// import { websocetObj } from '@/utils/websocet.js';
	export default {
		data() {
			return {
				top: 0,
				height: 0,
				// 手动选择了第几阶段
				curStageSelect: 0,
				// 剧本进行到第几阶段
				curStage: 0,
				userInfo: uni.getStorageSync('userInfo'),
				roleCurrent: 0,
				list: list,
				progressData: {
					percent: 24.5,
					data: [{
						percent: 10,
						text: '第一幕'
					}],
				},
				mainPageInfo: {},
				activeDetail: {},
				roleDetail: {},
				last_msg_id: 0,
				activeId: 0,
			}
		},
		computed: {
			curStageInfo() {
				if (!this.activeDetail.activeStageList) return {}
				const list = this.activeDetail.activeStageList
				return list[this.curStageSelect] || {}
			},
		},
		components: {
			activitySwiper
		},
		onLoad() {
			this.getMenuButtonBoundingClientRect();
		},
		async onShow() {
			this.activeId = uni.getStorageSync('activeId')
			const res = await this.$api.getActiveTeamList({
				activeId: this.activeId,
			})
			console.log('res', res)
			if (res.status !== 200) {
				uni.setStorageSync('isLoginToActivityIndex', false)
			}
			if (!uni.getStorageSync('isLoginToActivityIndex')) {
				this.navTo('/pagesB/activity/ready');
			}
			// 刷新页面
			this.getInfo()
		},
		// 离开页面销毁websocket
		beforeDestroy() {},
		filters: {
			mapPlotImgList(list = []) {
				let newList = list.map((item, index) => {
					let newTitle = ''
					if (item.introduction.length <= 33) {
						newTitle = item.introduction
					} else {
						newTitle = item.introduction.slice(0, 32) + '...'
					}
					return {
						image: item.backgroundImage,
						title: newTitle
					}
				})
				return newList
			},
		},
		methods: {
			handleBack() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			toPlotDetail() {
				this.navTo('/pagesB/activity/plot-detail?stage=' + this.curStageSelect)
			},
			handleToMap() {
				const activeId = uni.getStorageSync('activeId')
				const stageId = this.activeDetail.activeStageList[this.curStage].stageId
				this.navTo(`/pagesB/activity/point-list?activityId=${activeId}&stageId=${stageId}`)
			},
			handleStageSelect(item, index) {
				if (index > this.curStage) return
				this.curStageSelect = index
				this.progressData.percent = item.percent
			},
			navTo(url) {
				if (url == "/pagesB/chat/chat") {
					this.last_msg_id = 0; // 去除缓存
				}
				uni.navigateTo({
					url
				})
			},
			change(index) {
				this.roleCurrent = index
			},
			async getInfo() {
				let activeId = uni.getStorageSync('activeId');
				if (!activeId) return console.error("getInfo - activeId is null", activeId);
				const res = await this.$api.getRoleIndexInfo({
					activeId: activeId
				})
				if (res.status !== 200) return
				this.mainPageInfo = res.data
				uni.setStorageSync('mainPageInfo', res.data)
				this.activeDetail = res.data.dramaActiveDetailDTO
				this.roleDetail = res.data.dSramaActiveRoleDetailDto
				// 当前阶段
				const list = this.activeDetail.activeStageList || []
				// const curStage = list.findIndex(item=>item.operateStatus == 1)
				// 找最后一个 '1'
				let curStage = 0
				for (let index in list) {
					if (list[index].operateStatus == 1) {
						curStage = index
					}
				}
				this.curStage = Math.max(0, curStage)
				this.curStageSelect = this.curStage
				// 初始化进度条数据
				const lenth = list.length
				const step = 80 / (lenth - 1)
				const data = list.map((item, index) => ({
					percent: 10 + step * index,
					text: `第${index+1}幕`
				}))
				const percent = 10 + step * this.curStageSelect
				this.progressData = {
					percent,
					data
				}

				this.getMsgList();
			},
			async getMsgList() {
				let activityId = uni.getStorageSync('activeId');
				let teamId = this.roleDetail.teamId;
				const res = await this.$api.getTeamMessage({
					activityId: activityId,
					teamId: teamId,
					page: 1,
					size: 1
				})
				if (res.data.records && res.data.records.length) {
					let records = res.data.records
					if (records && records.length) {
						console.log("getMsgList records", records);
						let _last_msg_id = uni.getStorageSync('last_msg_id') ? uni.getStorageSync('last_msg_id') : 0;
						let new_last_msg_id = records[0].id;
						console.log("_last_msg_id", _last_msg_id);
						console.log("new_last_msg_id", new_last_msg_id);
						if (new_last_msg_id != _last_msg_id) {
							uni.setStorageSync('last_msg_id', records[0].id)
							this.last_msg_id = records[0].id;
						}
					}
				}
				console.log("last_msg_id", this.last_msg_id);
			},
			getMenuButtonBoundingClientRect() {
				let info = uni.getMenuButtonBoundingClientRect();
				this.top = info.top;
				this.height = info.height;
				this.orderTop = info.height + 120;
			},
		},

	}
</script>

<style>
	/* 页面背景 */
	/* page {
		background-color: #1D0F95;
	} */
</style>

<style lang="scss" scoped>
	/deep/.u-swiper-wrap {
		height: 440rpx !important;

		// width: 560rpx!important;
		swiper {
			height: 440rpx !important;
		}
	}

	/deep/.u-list-image-wrap {
		height: 380rpx !important;
	}

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

	.bg {
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

	.title {
		color: white;
		font-weight: bold;
		text-align: center;
		font-size: 32rpx;
		margin-top: 60rpx;
		margin-bottom: 54rpx;
	}

	.button-bg {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		z-index: 0;
	}

	// 标题
	.first {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		color: white;
		font-size: 40rpx;
		padding: 24rpx 0;
	}

	// 用户信息
	.second {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 718rpx;
		height: 124rpx;
		padding: 0 26rpx;
		margin: 120rpx auto 0;
		position: relative;
	}

	.second-left {
		display: flex;
		align-items: center;
		z-index: 1;
	}

	.second-left-avatar {
		box-shadow: 0rpx 0rpx 14rpx 2rpx #8ABDFF;
	}

	.second-left-info {
		margin-left: 25rpx;
	}

	.second-left-info-first {
		display: flex;
		align-items: center;
	}

	.second-left-info-first-name {
		font-family: PingFangSC-Medium;
		font-size: 32rpx;
		font-weight: 500;
		line-height: 32rpx;
		color: #FFFFFF;
	}

	.second-left-info-first-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(to right, #8C02FE, #731CFD);
		font-size: 22rpx;
		width: 72rpx;
		height: 34rpx;
		border-radius: 40rpx;
		margin-left: 42rpx;
		color: white;
	}

	.second-left-info-second {
		margin-top: 8rpx;
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		color: #FFFFFF;
	}

	.second-right {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 172rpx;
		height: 60rpx;
		line-height: 60rpx;
		// background-color: white;
		border-radius: 20rpx;
		z-index: 1;
		position: relative;
	}

	.second-right-text {
		z-index: 1;
		font-size: 24rpx;
		font-weight: bold;
	}

	// 队伍信息
	.third {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding: 0 20rpx;
		margin-top: 26rpx;
	}

	.third-left {
		display: flex;
		color: #FCD9AA;
		font-size: 24rpx;
		// font-weight: bold;
	}

	.third-left-roleName {
		width: 248rpx;
		height: 40rpx;
		line-height: 40rpx;
		background-size: auto 40rpx;
		background-repeat: no-repeat;
		// text-align: center;
		padding-left: 16rpx;
		border-radius: 20rpx;
		border: 1rpx solid linear-gradient(75deg, rgba(24, 73, 191, 0.70) 2%, rgba(24, 73, 191, 0.70) 2%, rgba(69, 26, 152, 0.00) 63%, rgba(69, 26, 152, 0.00) 63%);

	}

	.third-left-role {
		margin-left: 30rpx;
	}

	.third-right {
		color: white;
		font-size: 22rpx;
	}

	//进度
	.fourth {
		position: relative;
		margin: 0 40rpx;
		margin-top: 36rpx;
	}

	.progress-img {
		position: relative;

		image {
			position: absolute;
			top: -18rpx;
			left: 0rpx;
			z-index: 1;
		}
	}

	.fourth-progress-info {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 0 10%;
		position: absolute;
		left: 0;
		top: 7rpx;
	}

	.fourth-progress-son {
		display: flex;
		flex-direction: column;
		align-items: center;
		// margin-left: 42rpx;
		width: 0rpx;
		background-color: pink;
	}

	.fourth-progress-son-icon {
		width: 30rpx;
		height: 30rpx;
		border-radius: 100%;
		background: #9ECAF4;
		border: 8rpx solid #58AEF3;
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fourth-progress-son-icon-now {
		margin-top: -34rpx;

		image {
			width: 46rpx;
		}
	}

	/deep/ .u-list-image-wrap {
		// width: 496rpx;
		// height: 378rpx;
		border-radius: 20rpx;
		border: 1rpx solid #99BBFF;
		// box-shadow: 0px 0px 15px 0px rgba(57, 211, 255, 0.3);
	}

	.fourth-progress-son-text {
		margin-top: 26rpx;
		position: absolute;
		top: 36rpx;
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		color: #FFFFFF;

	}

	// 剧情
	.fifth {
		// width: 700rpx;
		// margin: 64rpx auto 0;
		margin-top: 60rpx;
		position: relative;
	}

	/deep/.u-swiper-title {
		// width: 484rpx !important;
		left: 50% !important;
		transform: translateX(-50%) !important;
		font-size: 24rpx !important;
		background-color: transparent !important;
		white-space: normal !important;
		// padding-bottom: 35rpx !important;
		width: 101% !important;
		padding: 45rpx 10px !important;

		background-image: url('@/static/index/plot_mask.png') !important;
		background-size: 100% 100%;
		background-repeat: no-repeat;

	}

	/deep/ swiper {
		background-color: transparent !important;
		// padding-left: 100rpx;
	}

	/deep/ .u-swiper-item {
		width: 500rpx !important;
		margin-left: 45rpx;
		padding: 0 30rpx !important;
	}

	/deep/ .u-swiper-image {
		width: 102% !important;
		margin-left: -1% !important;
	}

	/deep/.u-list-image-wrap {
		width: 496rpx !important;
		height: 378rpx !important;
		// height: 99% !important;
		// box-shadow: 0px 0px 30rpx 0px rgba(57, 211, 255, 0.3);
	}

	// .current {
	// 	background-size: 44rpx auto;
	// 	background-image: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/task-finish.png);
	// }
	.fifth-img {
		width: 100%;
		height: 365rpx;
		border-radius: 25rpx;
	}

	.fifth-box {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: 22rpx 130rpx 32rpx;
		pointer-events: none;
	}

	.fifth-title {
		color: white;
		font-weight: bold;
		font-size: 46rpx;
	}

	.fifth-info {
		color: white;
		font-size: 24rpx;
	}

	// 任务
	.sixth {
		display: flex;
		flex-wrap: wrap;
		margin: 0 auto;
		width: 550rpx;
		margin-bottom: 170rpx;
		align-items: center;
		margin-left: 115rpx;
		margin-top: -20rpx;
	}

	.sixth-son {
		position: relative;
		margin-top: 34rpx;
	}

	.sixth-son:not(:nth-child(3n)) {
		margin-right: 19rpx;
	}

	.sixth-son,
	.sixth-son-img {
		width: 158rpx;
		height: 100rpx;
		border-radius: 25rpx;
	}

	.sixth-son-info {
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		// justify-content: space-between;
		width: 100%;
		padding: 0 20rpx 8rpx;
	}


	.sixth-son-info-left {
		font-size: 24rpx;
		// font-weight: bold;
		white-space: nowrap;
		color: white;
		z-index: 2;
	}

	.sixth-son-finish {
		position: absolute;
		right: -4rpx;
		top: 0;
		width: 48rpx;
		height: 32rpx;
	}

	.sixth-son-mask {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 154rpx;
		height: 40rpx;
		z-index: 1;
	}

	.sixth-son-info-right {
		font-size: 24rpx;
		font-weight: bold;
		white-space: nowrap;
		margin-left: 14rpx;
		color: #F00C0C;
	}

	// 跳转
	.seventh {
		display: flex;
		justify-content: space-between;
		align-items: center;
		// margin-top: 100rpx;
		position: fixed;
		bottom: 42rpx;
		width: -webkit-fill-available;
	}

	.seventh-son {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-left: 22rpx;
		position: relative;
	}

	.seventh-son-icon {
		width: 76rpx;
		height: 76rpx;
		// background-color: white;
		border-radius: 100rpx;
		margin-left: 10rpx;
	}

	.seventh-son-text {
		color: white;
		// font-weight: bold;
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.seventh-son:hover {
		.seventh-son-text {
			color: #FFC27A;
		}

	}

	.seventh-left {
		display: flex;
	}

	.seventh-son-dot {
		width: 30rpx;
		height: 30rpx;
		border-radius: 100%;
		background-color: red;
		position: absolute;
		right: -19rpx;
		top: -17rpx;
	}

	.seventh-right {
		padding-right: 30rpx;
	}
</style>

<template>
	<view class="">
		<Header title="我获得的线索"></Header>
		<!-- <view class="first">
			我获得的线索
		</view> -->
		<view class="fifth">
			<!-- 剧情轮播 -->
			<!-- <image style="background-color: #4CB8F0;" src="" class="fifth-img"></image> -->
			<u-swiper :circular="false" :current="roleCurrent" :effect3d="true" @change="change" border-radius="20"
				:autoplay="false" mode="none" :list="listSwiper | mapPlotImgList" title="true">
			</u-swiper>
		</view>

		<!-- 		<view class="fifth" v-if='list.length'>
			<image style="background-color: #FFFFFF;" :src="list[checked].backImage || defaultBackImg"
				class="fifth-img"></image>
			<view class="fifth-box">
				<view class="fifth-title">
					{{ list[checked].clueTitle }}
				</view>
				<view class="fifth-info">
					{{ list[checked].clueContent }}
				</view>
			</view>
		</view>
 -->
		<view class="sixth">
			<view class="sixth-son" :class="{active: roleCurrent == index}" v-for="(item, index) in listSwiper"
				:key="index" @click="roleCurrent = index">
				<view class="sixth-son-item">
					<view class="sixth-son-img" :style="{backgroundImage: 'url(' + item.image + ')'}"></view>
					<!-- <image class="sixth-son-img" :src="item.image"></image> -->
					<view class="sixth-son-info">
						<view class="sixth-son-info-left" :class="{active: roleCurrent == index}">
							{{ item.clueTitle }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import filter from "@/filters/index.js";
	export default {
		data() {
			return {
				defaultBackImg: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/%E8%83%8C%E6%99%AF%E5%9B%BE.png',
				userInfo: uni.getStorageSync('userInfo'),
				mainPageInfo: uni.getStorageSync('mainPageInfo'),
				checked: 0,
				listSwiper: [
					// {
					// image: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/%E8%83%8C%E6%99%AF%E5%9B%BE.png',
					// clueTitle: '线索1',
					// title: '这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀'
					// }, {
					// image: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/%E8%83%8C%E6%99%AF%E5%9B%BE.png',
					// clueTitle: '线索1',
					// title: '这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀里有一堆字呀这里有一堆字呀这里有一堆字呀这里有一堆字呀'
					// },
				],
				roleCurrent: 0,
			}
		},
		created() {
			this.getList();
		},
		filters: {
			mapPlotImgList(list = []) {
				let newList = list.map((item, index) => {
					let newTitle = ''
					if (item.title.length <= 33) {
						newTitle = item.title
					} else {
						newTitle = item.title.slice(0, 50) + '...'
					}
					return {
						image: item.image,
						title: newTitle
					}
				})
				return newList
			},
		},
		methods: {
			getList() {
				this.$api.getDramaClues({
					activeRoleId: this.mainPageInfo.dSramaActiveRoleDetailDto.id,
					activeId: uni.getStorageSync('activeId')
				}).then(res => {
					if (res.code == 200) {
						if (res.data && res.data[0]) this.list = res.data;
					}
				})
			}
		}
	}
</script>

<style>
	/* 页面背景 */
	page {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background-size: 100% auto;
		background: linear-gradient(180deg, #44006A 0%, #44006A 0%, #0D1421 100%, #0D1421 100%);
	}
</style>

<style lang="scss" scoped>
	/deep/.u-swiper-wrap {
		height: 650rpx !important;

		swiper {
			height: 650rpx !important;
			background-color: transparent !important;
		}
	}

	/deep/ .u-list-image-wrap {
		width: 496rpx !important;
		border-radius: 20rpx;
		// border: 1rpx solid #99BBFF;
		box-shadow: 0px 0px 15px 0px rgba(57, 211, 255, 0.3);
		// height: 99% !important;
		height: 612rpx !important;
		border-radius: 10px;
		backface-visibility: hidden;
		transform: translate3d(0, 0, 0);
		-webkit-backface-visibility: hidden;
		-webkit-transform: translate3d(0, 0, 0);
	}

	/deep/.u-swiper-title {
		font-size: 24rpx !important;
		background-color: transparent !important;
		white-space: normal !important;
		width: 101% !important;
		padding: 30rpx 30rpx !important;
		width: 100% !important;
		height: 170rpx !important;
		background: linear-gradient(0deg, #000000 0%, #000000 0%, rgba(0, 0, 0, 0.00) 100%, rgba(0, 0, 0, 0.00) 100%) !important;
		font-family: PingFangSC-Regular;
		font-weight: normal;
		line-height: 32rpx;
		color: #FFFFFF;
	}

	/deep/ .u-swiper-item {
		width: 526rpx !important;
		padding: 0 15rpx;
		margin-left: 54rpx;
	}

	/deep/ .u-swiper-image {
		width: 102% !important;
		margin-left: -1% !important;
	}

	// text1
	.first {
		font-size: 40rpx;
		font-weight: bold;
		color: white;
		padding-left: 43rpx;
		margin-top: 45rpx;
	}

	//线索
	.fifth {
		width: 100%;
		margin: 230rpx auto 0;
		position: relative;
	}

	.fifth-img {
		width: 100%;
		height: 630rpx;
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
		padding: 43rpx 32rpx 42rpx;
	}

	.fifth-title {
		font-weight: bold;
		font-size: 38rpx;
		color: #fff;
		background-color: #0000007a;
	}

	.fifth-info {
		color: #fff;
		background-color: #0000007a;
	}

	// 线索选择
	.sixth {
		display: -webkit-box;
		display: flex;
		padding-left: 32rpx;
		overflow-x: auto;
		margin-top: 30rpx;
		width: 100%;
		height: 180rpx;
	}

	.sixth-son {
		margin: auto;
		width: 128rpx;
		height: 56rpx;
		border-radius: 20rpx;
	}

	.sixth-son {
		position: relative;
		margin-right: 12rpx;

		// &.active::before {
		// 	border-radius: 25rpx;
		// 	display: block;
		// 	content: '';
		// 	width: 184rpx;
		// 	height: 184rpx;
		// 	position: absolute;
		// 	left: 0;
		// 	top: 0;
		// 	border: 4px solid #FF8D01;
		// }
		&.active {
			width: 128rpx;
			height: 88rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			border: 2rpx solid #84B8FF;
			box-shadow: 0px 0px 30rpx 0px rgba(57, 211, 255, 0.3);
			font-family: PingFangSC-Regular;
			font-size: 28rpx!important;
			font-weight: normal;
			line-height: 28rpx!important;
			color: #FFFFFF;
		}
	}

	.sixth-son-img {
		width: 97%;
		height: 100%;
		border-radius: 20rpx;
		background-position: 50% 50%;
	}

	.sixth-son-item {
		width: 128rpx;
		height: 100%;
		border-radius: 20rpx;

	}

	.sixth-son-info {
		text-align: center;
		width: 100%;
	}


	.sixth-son-info-left {
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		color: #FFFFFF;
		width: 100%;
		margin-top: 12rpx;
		&.active {
			font-size: 28rpx!important;
			line-height: 28rpx!important;
			color: #FFFFFF;
		}
	}

	.sixth-son-info-right {
		font-size: 24rpx;
		font-weight: bold;
		white-space: nowrap;
		margin-left: 14rpx;
		color: #F00C0C;
	}
</style>

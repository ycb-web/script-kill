<template>
	<view>
		<view class="banner">
			<u-swiper :circular="false" effect3d-previous-margin="30" height="320" border-radius="24" :effect3d="true"
				:list="list" :autoplay="false"></u-swiper>
		</view>
		<view class="goods-type">
			<view class="goods-type-son" v-for="(item, index) in goodsTypeDataE" :key="index">
				<view class="goods-type-son-icon"  @tap="turnTo('/pages/seek/seek')">
					<image style="width: 100%;height: 100%;"
						src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/scenario1.png"
						mode="" ></image>
				</view>
				<view class="goods-type-son-text"  >
					{{item.title}}剧本
				</view>
			</view>
		</view>
		<view class="event7-title">
			<view class="block-title">
				近七日活动推荐
			</view>
			<view class="block-text">
				左滑更多>
			</view>
		</view>
		<view class="event7">
			<view class="event7-son" v-for="(item, index) in goodsTypeDataE" :key="index">
				<view class="event7-son-first">
					<view class="event7-son-first-left">
						<view class="event7-son-first-title">
							这是一个很好的剧本
						</view>
					</view>
					<view class="event7-son-first-num">
						已售：99
					</view>
				</view>
				<view class="event7-son-detail">
					剧本的简单介绍剧本的简单介绍剧本的简单介数据来看房经理开始
				</view>
				<view class="event7-son-tags">
					<view class="event7-son-tag">
						古风
					</view>
					<view class="event7-son-tag">
						悬疑
					</view>
					<view class="event7-son-tag">
						商战
					</view>
				</view>
				<view class="event7-son-role">
					<view class="event7-son-role-img">
						<image style="width: 100%;height: 100%;border-radius: 20rpx;" src="../../static/album-topbg.jpg"
							mode=""></image>
					</view>
					<view class="event7-son-role-img">
						<image style="width: 100%;height: 100%;border-radius: 20rpx;" src="../../static/album-topbg.jpg"
							mode=""></image>
					</view>
					<view class="event7-son-role-img">
						<image style="width: 100%;height: 100%;border-radius: 20rpx;" src="../../static/album-topbg.jpg"
							mode=""></image>
					</view>
					<view class="event7-son-role-img">
						<image style="width: 100%;height: 100%;border-radius: 20rpx;" src="../../static/album-topbg.jpg"
							mode=""></image>
					</view>
				</view>

				<view class="event7-son-bg">
					<image style="width: 100%;height: 100%;"
						src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/event7-bg.png"
						mode=""></image>
				</view>
			</view>
		</view>

		<view class="block-title2">
			热门活动推荐
		</view>
		<view class="hot-event">
			<view class="hot-event-son">
				<view class="hot-event-son-icon">
					<image style="width: 100%;height: 100%;"
						src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/hot1.png" mode="">
					</image>
				</view>
				<view class="hot-event-son-title">
					某种专属
				</view>
				<view class="hot-event-son-text">
					春节专属活动
				</view>
			</view>
			<view class="hot-event-son">
				<view class="hot-event-son-icon">
					<image style="width: 100%;height: 100%;"
						src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/hot2.png" mode="">
					</image>
				</view>
				<view class="hot-event-son-title">
					某种专属
				</view>
				<view class="hot-event-son-text">
					春节专属活动
				</view>
			</view>
			<view class="hot-event-son">
				<view class="hot-event-son-icon">
					<image style="width: 100%;height: 100%;"
						src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/hot3.png" mode="">
					</image>
				</view>
				<view class="hot-event-son-title">
					某种专属
				</view>
				<view class="hot-event-son-text">
					春节专属活动
				</view>
			</view>
		</view>

		<view class="block-title2">
			限时抢购活动
		</view>
		<view class="time-event">
			<view class="time-event-son">
				<view class="time-event-son-title">
					剧本名
				</view>
				<view class="time-event-son-icon">
					<image style="width: 100%;height: 100%;"
						src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/scenario1.png"
						mode=""></image>
				</view>
				<view class="time-event-son-mask">
					<image style="width: 100%;height: 100%;" src="../../static/activity/矩形%20(3).png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsTypeData: [{
						title: '古风',
						color: '#EC595F'
					},
					{
						title: '古风',
						color: '#AB5DBD'
					},
					{
						title: '古风',
						color: '#698A99'
					},
					{
						title: '古风',
						color: '#EE5B66'
					},
					{
						title: '古风',
						color: '#EE981A'
					},
					{
						title: '古风',
						color: '#928DB0'
					},
					{
						title: '古风',
						color: '#C9C9CE'
					},
					{
						title: '古风',
						color: '#928DB0'
					},
					{
						title: '古风',
						color: '#9D9DA1'
					}
				],
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		computed: {
			goodsTypeDataE: function() {
				if (this.goodsTypeData.length >= 8) {
					var newData = this.goodsTypeData.slice(0, 7);
					newData.push({
						title: '更多',
						color: '#9D9DA1'
					});
					return newData;
				} else {
					return this.goodsTypeData;
				}
			}
		},
		methods: {
			turnTo(urls) {
				console.log()
				uni.navigateTo({
					url: urls
				})
			},
		}
	}
</script>

<style>
	/* 页面背景 */
	page {
		background-color: #32094A;
	}
</style>

<style lang="scss" scoped>
	// 轮播图
	.banner {
		margin-top: 80rpx;
	}

	/deep/ swiper {
		padding-bottom: 21px;
		background-color: transparent !important;
	}

	/deep/.u-swiper-item {
		width: 590rpx !important;
	}

	/deep/.u-indicator-item-round-active {
		width: 40rpx !important;
		background-color: #2A77C7 !important;
	}

	/deep/.u-indicator-item-round {
		width: 20rpx;
		background-color: #8FBCEC !important;
	}

	//商品分类
	.goods-type {
		// background-color: #FFFFFF;
		width: 700rpx;
		margin: 0 auto;
		border-radius: 16rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 34rpx 58rpx;
	}

	.goods-type-son {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 24rpx;
	}

	.goods-type-son:not(:nth-child(4n)) {
		margin-right: 77rpx;
	}

	.goods-type-son-icon {
		width: 98rpx;
		height: 102rpx;
	}

	.goods-type-son-text {
		font-size: 24rpx;
		margin-top: 24rpx;
		color: white;
	}

	// 模块title
	.event7-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
	}

	.block-title {
		font-weight: bold;
		font-size: 32rpx;
		color: white;
	}

	.block-text {
		font-size: 24rpx;
		color: #5F5C65;
	}

	.block-title2 {
		padding: 0 30rpx;
		font-weight: bold;
		font-size: 32rpx;
		color: white;
		margin-top: 44rpx;
	}

	// 近七日活动推荐
	.event7 {
		padding: 0 26rpx;
		margin-top: 32rpx;
		overflow-x: auto;
		display: flex;
	}

	.event7-son {
		width: 590rpx;
		border-radius: 16rpx;
		padding: 26rpx 22rpx;
		position: relative;
		z-index: 1;
		margin-right: 22rpx;
	}

	.event7-son-bg {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
	}

	.event7-son-first {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.event7-son-first-left {
		display: flex;
		align-items: center;
	}

	.event7-son-first-icon {
		width: 36rpx;
		height: 36rpx;
	}

	.event7-son-first-title {
		font-weight: bold;
		color: white;
	}

	.event7-son-first-num {
		font-size: 24rpx;
		color: #FEC179;
	}

	.event7-son-detail {
		font-size: 24rpx;
		color: #D1D0D0;
		margin-top: 4rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.event7-son-tags {
		margin-top: 24rpx;
		display: flex;
	}

	.event7-son-tag {
		width: 80rpx;
		height: 36rpx;
		background-color: #42301F;
		color: #FEC179;
		font-size: 22rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 16rpx;
		border-radius: 12rpx;
	}

	.event7-son-role {
		margin-top: 24rpx;
		display: flex;
	}

	.event7-son-role-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
		// margin-right: 16rpx;
	}

	.event7-son-role-img:not(:nth-child(4)) {
		margin-right: 22rpx;
	}

	// 热门活动推荐
	.hot-event {
		display: flex;
		justify-content: space-between;
		margin-top: 44rpx;
		padding: 0 64rpx;
	}

	.hot-event-son {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hot-event-son-icon {
		width: 124rpx;
		height: 124rpx;
	}

	.hot-event-son-title {
		font-weight: bold;
		color: white;
		margin-top: 12rpx;
	}

	.hot-event-son-text {
		color: #D4D2E2;
	}

	// 限时抢购活动
	.time-event {
		padding: 0 26rpx;
		margin-top: 44rpx;
	}

	.time-event-son {
		width: 208rpx;
		height: 224rpx;
		background-color: #232631;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.time-event-son-mask {
		width: 100%;
		height: 115rpx;
		position: absolute;
		left: 0;
		bottom: 0;
	}
</style>

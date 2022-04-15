<template>
	<view class="app" :class="{'disable-scroll': coupon_show}">
		<!-- <Header title="团队剧本杀"></Header> -->
		<view class="title-bar" :style="{paddingTop:top+'px',height:height+'px'}">
			<view class="personal-title" style="height: 66rpx;line-height: 66rpx;">团队剧本杀</view>
		</view>
		<view class="p-3">
			<view class="banner" v-if="list.length>0">
				<u-swiper :list="list" @click="swiper_click" border-radius="20" height="320" :circular="false"
					effect3d-previous-margin="30" :effect3d="true" :autoplay="false" :img-mode="'widthFix'">
					<!-- name="bannerUrl" 原-里面有这个属性没查到是干嘛的-图片就不显示了 -->
				</u-swiper>
			</view>
			<!-- 商品分类模块 -->
			<view class="flex mt-4 mb-5 tabs">
				<view class="tab" @click="toSeek(item.categoryId)" v-for="item in cateList" :key='item.categoryId'>
					<view class="flex direction-column justify-between">
						<image :src="item.iconUrl"></image>
						<view class="text">{{item.categoryName}}</view>
					</view>
				</view>
			</view>
			<view class="bannerZhong" v-if="list2.length>0">
				<!-- <scroll-view scroll-x="true" class="bannerZhong_scroll-view">
					<view class="bannerZhong_list flex">
						<view class="bannerZhong_list_item white-space" v-for="(item,index) in list2" :key="index"
							@click="swiper_click(index)">
							<image :src="item.bannerUrl" mode=""></image>
						</view>
					</view>
				</scroll-view> -->
			</view>

			<view v-for="(item, idx) in subData" :key="idx">
				<view v-if="item.showType === 2 && item.prods">
					<view class="swiperTitle d-flex align-center justify-between">
						<view class="title">
							<p>{{item.title}}: </p>
							<s> {{item.viceTitle}}</s>
						</view>
						<!-- <span @click="switchTab('/pages/seek/seek')">
							查看全部
							<image src="../../static/Product-rightArrow.png"></image>
						</span> -->
					</view>
					<view class="subSwiper mr-b30" v-if="item.prods && item.prods.length">
						<view v-for="(items, index) in item.prods" class="swiperSlider" :key="index"
							@click="goSubActivity(items.productId, items.status, items.lowPrice, items.product.prodType)">
							<sub-activity :item="items"></sub-activity>
						</view>
					</view>
				</view>

				<view v-if="item.showType === 1 && item.prods && item.prods.length">
					<view class="swiperTitle d-flex align-center justify-between">
						<view class="title">
							<p>{{item.title}}:</p>
							<view>{{item.viceTitle}}</view>
						</view>
						<!-- <span @click="switchTab('/pages/seek/seek')">
							查看全部
							<image src="../../static/Product-rightArrow.png"></image>
						</span> -->
					</view>
					<view class="subSwiperArea mr-b30">
						<view class="swiperSlider">
							<view class="subActivityContainer" v-for="(items, index) in item.prods" :key="index"
								@click="goSubActivity(items.productId, items.status, items.lowPrice, items.product.productType)">
								<view class="" style="width: 225rpx;height: 225rpx;overflow: hidden;">
									<image class="u-image" :src="items.product.pic" style="width: 200rpx;"
										mode="widthFix"></image>
								</view>
								<view class="content">
									<view class="title">
										{{items.product.prodName}}
									</view>
									<view class="typeName">
										<view class="">古风</view>
										<view class="">悬疑</view>
										<view class="">商战</view>
									</view>
									<view class="message">
										<div class="price">已售: {{items.product.actualTotalStocks }}</div>
										<!-- <div class="check">查看详情</div> -->
										<view class="priceNumber"><text style=" font-size: 24rpx;">￥</text>
											{{items.product.price || 0}}.00
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="Mask" @click="coupon_show = false" v-if="coupon_show"></view>
		<view class="Mask_z" v-if="coupon_show">
			<view class="top">
				<view class="hi">HI,</view>
				<view class="Tips">你可以领{{ couponList.length }}张超值优惠券</view>
			</view>
			<view class="list">
				<view class="item flex" v-for="(item, index) in couponList" :key="index" v-if="index < 3">
					<view class="left flex" v-if="item.discountType == 1">
						<text class="left_z ellipsis-main ellipsis-1">{{ item.discountValue }}</text>
						折
					</view>
					<view class="left" v-else>
						<div class="tit" style="color: #F7931E;">¥{{ item.couponPrice }}</div>
						<div class="tit1 f20 " style="color: #F7931E;">满{{ item.useMinPrice }}元可用</div>
					</view>
					<view class="right">
						{{ item.title }}
						<view v-if='hasRevieve' class="Joined">已领取</view>
					</view>
				</view>
			</view>
			<view v-if='hasRevieve' @tap="toCoupon()" class="saveCouPon"
				style="width: 392rpx;height: 80rpx;text-align: center;line-height: 80rpx;">立即使用</view>
			<view v-else @tap="saveCouPon()" class="saveCouPon"
				style="width: 392rpx;height: 80rpx;text-align: center;line-height: 80rpx;">立即领取</view>
		</view>
	</view>
</template>

<script>
	import cityList from '../../common/cityList.js';
	import activityList from '@/components/activity/activityList.vue';
	import PopTip from '@/components/popTip/popTip.vue';
	import subActivity from '../../components/activity/subActivity.vue'
	import getLocation from '../../utils/location.js'

	export default {
		components: {
			activityList,
			subActivity,
			PopTip,
		},
		data() {
			return {
				top: 0,
				height: 0,
				hasRevieve: false,
				cateList: [],
				subData: [],
				sub2Data: [],
				cityPosition: '',
				location_city: '',
				coupon_show: false, //优惠券弹窗
				citytxt: '',
				// 轮播图
				list: [],
				list2: [],
				is_recommend: 0,
				product_type: 1,
				// tab
				header_switch: [{
						content: "热门推荐",
						// nav_img: "http://shop666.oss-cn-hangzhou.aliyuncs.com/2021-05/10/8540phpgMcnfc1620651171210510.png",					product_type: '',
						is_recommend: 2,
						product_type: "",
					},
					{
						content: "亲子活动",
						is_recommend: 0,
						product_type: 1,
					},
					{
						content: "游乐场",
						is_recommend: 0,
						product_type: 2,
					},
					{
						content: "周边酒店",
						is_recommend: 0,
						product_type: 3,
					},
				],
				// tab初始值
				switch_index: 0,
				// 活动数据
				activityData: [],
				page: {
					pageNum: 1,
					pageSize: 30
				},
				nav_one_cate_id: '', // 一级导航
				couponList: [],
				homepageData: {
					incomplete: 0,
					incompleteActivity: 0,
					placeOrder: 0
				},
				userMessage: ''
			};
		},
		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo');
			},
		},
		onShow() {
			setTimeout(() => {
				if (uni.getStorageSync('chooseCity')) {
					this.initData()
				} else {
					this.getLocation();
				}
				let token = uni.getStorageSync("token")
				if (token) {
					this.userMessage = uni.getStorageSync('userInfo');
					this.getHomeData();
					this.getCouPon();
				}
				// this.$refs.poptip.getMsg()
			}, 200)
		},
		async onLoad(options) {
			this.getMenuButtonBoundingClientRect();
			uni.setStorageSync('invite', options.code || options.inviteCode || '')
			setTimeout(() => {
				// this.get_product_list();
				this.cityPosition = uni.getStorageSync('cityPosition')
				// this.get_service_qr_code();
				this.getActivityProduct();
				this.getHomeData();
				this.getCate1();
			}, 200)
		},
		// 分享
		onShareAppMessage() {
			return {
				title: `快来啊!来大猴小猴开启'爱的陪伴,共同成长'亲子旅程!`,
				path: `/pages/home/home?inviteCode=${this.userInfo.inviteCode}`
			};
		},
		// 分享到朋友圈
		onShareTimeline() {
			return {
				title: `快来啊!来大猴小猴开启'爱的陪伴,共同成长'亲子旅程!`,
				path: `inviteCode=${this.userInfo.inviteCode}`
			};
		},
		methods: {
			initData() {
				console.log('initData')
				this.citytxt = uni.getStorageSync('chooseCity').name;
				this.getBanner(uni.getStorageSync('chooseCity').id);
				this.getBanner2(uni.getStorageSync('chooseCity').id);
				// this.get_product_list();
				this.getHomeData();
				this.getActivityProduct();
				this.getCate1();
			},
			async getCate1() {
				const res = await this.$api.get_nav_category_list({
					merchantId: uni.getStorageSync('merchantId')
				})
				console.log(res.data)
				if (res.code != 200) return
				if (res.data) {
					this.cateList = res.data
				} else {
					this.cateList = [];
				}
			},
			get_service_qr_code() {
				this.$api.get_service_qr_code({}).then(res => {
					if (res.status == 200) {
						uni.setStorageSync("QRcode", res.data?.value)
					}
				})
			},
			swiper_click(index) {
				if (this.list[index].linkUrl) {
					this.navTo(this.list[index].linkUrl + "?bannerUrl=" + this.list[index].bannerUrl)
				}
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			switchTab(urls) {
				uni.switchTab({
					url: urls
				})
			},
			toCoupon() {
				uni.navigateTo({
					url: '/pages/coupon/my-coupon?index=1'
				});
			},
			//领取优惠券
			saveCouPon() {
				let list = [];
				this.couponList.forEach(item => {
					list.push(item.id)
				});
				this.$api
					.manual_coupon_collection({
						couponIds: list
					})
					.then(res => {
						// this.coupon_show = false;
						uni.showToast({
							icon: 'none',
							title: '领取成功'
						});
						this.hasRevieve = true
					});
			},
			//获取优惠券
			getCouPon() {
				const params = {
					merchantId: uni.getStorageSync('merchantId'),
					rows: 999,
					start: 0
				}
				this.$api.get_not_received_coupons(params).then(res => {
					this.couponList = res.data.record || [];
					if (this.couponList
						.filter(item => item.status == 4)
						.length) {
						this.coupon_show = true;
					}
				});
			},
			getLocation() {
				getLocation(({
					city
				}) => {
					uni.showToast({
						icon: "none",
						title: city
					})
					this.getCityIds(city);
					this.initData()
				}, () => {
					this.getCityIds("苏州市");
					this.initData()
				})
			},
			getCityIds(txt) {
				let cityArr = Object.values(cityList.cityList);
				cityArr.forEach(item => {
					item.forEach(items => {
						if (items.name == txt) {
							uni.setStorageSync('chooseCity', {
								id: items.id,
								name: items.name
							});
							// if (items.id === 530100) {
							// 	uni.setStorageSync('merchantId', 43)
							// } else {
							// 	uni.setStorageSync('merchantId', 42)
							// }
							uni.setStorageSync('city_id', items.id);
							this.getBanner(items.id);
							this.getBanner2(items.id);
							this.getCate1();
							this.citytxt = uni.getStorageSync("chooseCity").name
							this.location_city = uni.getStorageSync("chooseCity").name
							uni.setStorageSync('cityPosition', this.citytxt);
							// this.get_product_list();
						}
					});
				});
			},
			getBanner(num) {
				this.$api
					.home_banner({
						region: num,
						type: 1,
					})
					.then(res => {
						this.list = res.data.record.map(item => {
							return {
								image: item.bannerUrl,
								title: item.bannerName
							}
						})
					});
			},
			getBanner2(num) {
				this.$api
					.home_banner({
						region: num,
						type: 2,
					})
					.then(res => {
						this.list2 = res.data.record
					});
			},
			getActivityProduct() {
				let city_id = uni.getStorageSync('chooseCity').id;
				if (city_id !== 530100) {
					city_id = 320500;
				}
				this.$api.query_product_as_done(city_id).then(res => {
					let arr = res.data.record
					this.subData = arr;
				})
			},
			getHomeData() {
				const data = {
					userId: uni.getStorageSync('userInfo').id || this.userMessage.id,
					channel: 'monkey',
					region: uni.getStorageSync('chooseCity').id
				}
				if (!data.userId || !data.region) return
				this.$api.query_homepage_data(data).then(res => {
					this.homepageData = res.data
				})
			},
			// 获取活动商品
			get_product_list() {
				this.$api
					.get_product_list({
						merchantId: uni.getStorageSync('merchantId'),
						rows: this.page.pageSize,
						start: (this.page.pageNum - 1) * this.page.pageSize,
						// type: this.is_recommend==2? '' : this.product_type,
						categoryId: this.product_type

						// range: [this.page.pageNum, this.page.pageSize],
						// city_id: uni.getStorageSync('chooseCity').id,
						// nav_one_cate_id: this.nav_one_cate_id,
						// is_recommend:this.is_recommend,
						// product_type: this.is_recommend==2? '' : this.product_type
					})
					.then(res => {
						this.activityData = res.data?.record || [];
					});
			},
			turnTo(urls) {
				uni.navigateTo({
					url: urls
				});
			},
			// 切换事件
			click_switch(index, product_type, is_recommend) {
				this.product_type = product_type;
				this.switch_index = index;
				// this.nav_one_cate_id = id;
				// this.get_product_list();
			},
			// 活动日历
			goActivity() {
				uni.navigateTo({
					url: '/pagesB/activity/calendar'
				});
			},
			// 活动好物
			toSeek(type) {
				uni.setStorageSync('type', type);
				uni.navigateTo({
					url: `/pages/seek/seek`
				});
			},
			handleLogin() {
				if (uni.getStorageSync('userInfo')) return;
				uni.navigateTo({
					url: '../login/index'
				})
			},
			goSubActivity(product_id, status, curr_price, product_type) {
				// if (status) {
				// 	uni.showToast({
				// 		title: '本周已满员',
				// 		icon: 'none'
				// 	})
				// 	return false
				// }
				let nextPage = 'EventProductsDetail'
				uni.navigateTo({
					url: `/pages/product/${nextPage}/${nextPage}?product_id=${product_id}&type=3&productType=${product_type}`
				});
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

<style>
	/* 页面背景 */
	.app {
		background-size: 100% 100%;
		background-image: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/home/bg.png);
	}
</style>

<style lang="scss" scoped>
	/deep/ .u-swiper-image {
		object-fit: cover;
		height: none !important;
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
	.typeName {
		width: 100%;
		height: 20rpx;
		display: flex;
		justify-content: flex-start;
		view {
			width: 80rpx;
			height: 32rpx;
			border-radius: 10rpx;
			background: rgba(255, 193, 122, 0.25);
			margin-right: 30rpx;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			font-weight: normal;
			line-height: 32rpx;
			text-align: center;
			color: #FFC17A;
		}
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

<style lang="scss" scoped>
	.bannerZhong {
		margin-bottom: 20rpx;
	}

	.bannerZhong_scroll-view {
		height: 124rpx;

		.bannerZhong_list {
			// min-width: 1000vw;
			height: 124rpx;

			.bannerZhong_list_item {
				margin: 0 10rpx;
				width: 340rpx;
				height: 124rpx;
				border-radius: 20rpx;

				image {
					border-radius: 20rpx;
					width: 340rpx;
					height: 124rpx;
				}
			}
		}
	}

	.switch-list {
		width: 80vw;
	}

	.Mask {
		width: 100%;
		height: 100vh;
		background-color: #000;
		opacity: 0.6;
		position: fixed;
		top: 0;
		z-index: 9;
	}

	.saveCouPon {
		position: absolute;
		bottom: -20rpx;
		left: 50%;
		margin-left: -196rpx;
		background: url(../../static/icon390rpx.png);
		background-size: 100% 100%;
		color: #ffffff;
	}

	.Mask_z {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
		width: 640rpx;
		height: 808rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-yhq1-bg.png) no-repeat;
		background-size: 640rpx 808rpx;

		.top {
			position: absolute;
			top: 120rpx;
			left: 85rpx;
			font-size: 60rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #ffffff;

			.Tips {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}
		}

		.list {
			position: absolute;
			left: 50%;
			top: 300rpx;
			transform: translateX(-50%);

			.item {
				position: relative;
				margin: 20rpx 0;
				width: 464rpx;
				height: 118rpx;
				background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-coupon-background.png) no-repeat;
				background-size: 464rpx 118rpx;

				.left {
					text-align: center;
					width: 120rpx;
					position: absolute;
					top: 50%;
					left: 25rpx;
					transform: translateY(-50%);
					font-size: 25rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #f7931e;
					line-height: 34rpx;
					text-shadow: 0rpx 0rpx 8rpx rgba(255, 194, 122, 0.25);

					.left_z {
						width: 80rpx;
						font-size: 35rpx;
					}
				}

				.right {
					position: absolute;
					top: 50%;
					left: 180rpx;
					transform: translateY(-50%);
					font-size: 29rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #333333;
					line-height: 40rpx;
					text-shadow: 0rpx 0rpx 8rpx rgba(255, 194, 122, 0.25);
				}
			}
		}
	}

	.searchBox {
		.search {
			width: 690rpx;
			height: 68rpx;
			background: #f7f7f7;
			border-radius: 44rpx;
		}

		background: #ffffff;

		.address {
			width: 124rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 34rpx;
		}

		.searchText {
			flex: 0 0 492rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 34rpx;
		}

		.image {
			width: 32rpx;
			height: 32rpx;

			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}

	.user-card {
		border-radius: 40rpx;
		background-color: #fff;
		padding: 10rpx;
		margin: 30rpx 0 10rpx;
	}

	.tabs {
		width: 690rpx;

		.tab {
			width: 164rpx;
			height: 100%;
			text-align: center;

			image {
				width: 56px;
				height: 56px;
				margin-bottom: 10rpx;
			}

			.title {
				font-family: PingFangSC-Regular;
				font-size: 28px;
				font-weight: normal;
				line-height: 40px;
				color: #FFFFFF;
			}

			.count {
				font-size: 20px;
				color: #666;
				font-weight: 700;
			}

			.point {
				font-size: 22rpx;
				color: #F7931E;
			}

			.text {
				font-family: PingFangSC-Medium;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 28rpx;
				color: #FFFFFF;
			}
		}
	}

	.group {
		// background-image: url(../../static/home/group.png);
		background-size: 100%;
		background-repeat: no-repeat;
		height: 68px;
		width: 100%;
		box-shadow: 0 0 6px 0 rgba($color: #000000, $alpha: 0.07);
		margin-top: 14rpx;
		align-items: flex-start;

		.tab {
			height: auto;
			padding-top: 16rpx;
		}
	}

	.userinfo {
		display: flex;
		align-items: center;
		padding: 24rpx 40rpx;
		height: 64px;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		// background-image: url(../../static/home/infobg.png);

		image {
			width: 80rpx;
			height: 80rpx;
			margin-right: 20rpx;
			border-radius: 50%;
			border: 2px solid #fff;
		}

		.username {
			flex: 1;
			font-size: 14px;
			line-height: 14px;
			color: #25252F;
		}

		.welcome {
			font-size: 14px;
			line-height: 14px;
			color: #038E45;
			margin-top: 14rpx;
			max-width: 400rpx;
		}
	}

	.swiperTitle {
		font-size: 20px;
		line-height: 23px;
		color: #333333;
		font-weight: 700;
		position: relative;
		margin-bottom: 16px;
		margin-top: 24px;

		.title {
			font-size: 30rpx;
			color: white;
			display: flex;
			align-items: center;
			view:nth-child(1) {
				white-space: nowrap;
				font-family: PingFangSC-Medium;
				font-size: 36rpx;
				font-weight: 500;
				line-height: 36rpx;
				color: #FFFFFF;
			}
			view:nth-child(2) {
				white-space: nowrap;
				max-width: 150px;
				overflow: hidden;
				text-overflow: ellipsis;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				line-height: 36rpx;
				font-size: 36rpx;
				color: #FFFFFF;
			}
		}
		p {
			z-index: 1;
			position: relative;
			margin-right: 5px;
		}
		span {
			font-size: 12px;
			line-height: 12px;
			color: #f7931e;
			display: flex;
			align-items: center;

			image {
				width: 12px;
				height: 16px;
				margin-left: 3px;
			}
		}
	}

	.subSwiper {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.swiperSlider {
			margin-bottom: 40rpx;
			border-radius: 20rpx;
		}
	}

	.subSwiperArea {
		width: calc(104vw - 60rpx);
		overflow-x: scroll;
		// $subWidth: 400px;
		.u-image {
			// margin: 10rpx;
			border-radius: 20rpx;
			box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.05);
		}
		.swiperSlider {
			width: max-content;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			max-height: 390px;
		}

		.subActivityContainer {
			display: flex;
			margin-bottom: 16px;
			margin-right: 16px;
			width: 608rpx;
			height: 223rpx;
			background: #D7D7D7;
			border-radius: 20rpx;
			background: linear-gradient(0deg, #070000 0%, #070000 0%, #121632 100%, #121632 100%);

			image {
				margin: 11rpx;
			}

			.content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 12rpx 0rpx 12rpx 4rpx;
				width: 380rpx;
			}

			.title {
				font-size: 24rpx;
				color: white;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				height: max-content;
				font-size: 14px;
				// color: #333;
			}

			.message {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					font-size: 24rpx;
					font-weight: 500;
					color: #FFC17A;
					line-height: 40rpx;
					text-shadow: 0px 0px 12rpx rgba(0, 0, 0, 0.05);
				}

				.priceNumber {
					font-family: DINAlternate-Bold;
					font-size: 38rpx;
					font-weight: normal;
					line-height: 28rpx;
					// text-align: right;
					color: #FF5F17;
					margin-right: 15rpx;
				}

				.check {
					width: 160rpx;
					height: 50rpx;
					background: url(../../static/icon14.png) no-repeat;
					background-size: 160rpx 50rpx;
					color: #fff;
					line-height: 50rpx;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #ffffff;
				}
			}

			&:nth-child(3n) {
				margin-right: 0;
			}
		}
	}

	.header-switch {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;

		.switch-item {
			padding-bottom: 26rpx;
		}

		.switch-item-act {
			font-weight: bold;
			background: url(../../static/coupon-stars.png) no-repeat;
			background-size: 26rpx 10rpx;
			background-position: 50% 41rpx;
		}
	}

	.userinfo /deep/ .u-notice-bar {
		width: 400rpx;
		margin-top: 14rpx;

		.u-notice-box {
			margin: 0;
		}
	}

	.Joined {
		width: 104rpx;
		background: #fff6eb;
		border-radius: 17rpx;
		border: 2rpx solid #ffe5c7;
		font-size: 20rpx;
		line-height: 32rpx;
		text-align: center;
		color: #f7931e;
	}
</style>

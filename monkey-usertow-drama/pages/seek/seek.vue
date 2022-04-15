<template>
	<view class="app colum">
		<Header title="商品分类" class="title">
			<view class="searchBox border-box mr-b30">
				<view class="flex py-3 px-2 border-box search">
					<!-- <view class="address" @tap="turnTo('/pages/home/chooseAddress')">
							<text class="mr-1">{{ address.name }}</text>
							<u-icon name="arrow-down-fill" size="17" color="#25252F"></u-icon>
						</view> -->
					<view class="searchText" @tap="turnTo('/pages/home/search')">选择剧本</view>
					<view class="image">
						<image src="../../static/home/search.png" mode=""></image>
					</view>
				</view>
				<view class="header-switch flex justify-around">
					<view class="switch-item" :class="item.categoryId == form.nav_one_cate_id ? 'switch-item-act' : ''"
						v-for="(item, index) in allActivity" @click="click_switch(item.categoryId)"
						:key="item.categoryId">
						{{ item.categoryName }}
					</view>
				</view>
			</view>
		</Header>
		<!-- <view class="" style="width: 100%;height: 183rpx;"></view> -->
		<!-- <view class="bubble br-20 mr-b30" v-if="activity && activity.length > 0">
			<scroll-view scroll-x class="scroll-view">
				<view class="scroll-view-item flex">
					<view class="item" v-for="(item, index) in activity" :key="item.categoryId"
						@click="switch_nav(item.categoryId,index)">
						<image class="item-image" :src="item.iconUrl" mode="widthFix"
							:class="switch_nav_index==index?'item-image_act':''"></image>
						<image src="../../static/my-FamilyCircle.png" mode=""></image>
						楼上的image原来就是注释掉的
						<view class="item-tet" :class="switch_nav_index==index?'item-tet_act':''">
							{{ item.categoryName }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view> -->
		<scroll-view scroll-y class="scroll" :refresher-triggered="refresher" @refresherrefresh="refresherrefresh"
			@scrolltolower="scrolltolower">
			<!-- refresher-enabled   下拉失败的原因 -->
			<view class="scroll-top"></view>
			<activity-list :list="activityData"></activity-list>
			<!-- <goods v-show="isShowGoods" :list="goodsData"></goods>
			<ticket v-show="isShowTicket" :list="ticketData"></ticket> -->
			<u-empty v-if="[currentDataKey].length <= 0"
				src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据"
				icon-size="230" color="#333"></u-empty>
			<!-- <loading :status="loading" /> -->
		</scroll-view>
		<!-- <pop-tip ref='poptip'></pop-tip> -->
	</view>
</template>

<script>
	import activityList from '@/components/activity/activityList.vue';
	import ticket from '@/components/activity/ticket.vue';
	import goods from '@/components/activity/goods.vue';
	import loading from '@/components/loading/uni-load-more.vue';
	import PopTip from '@/components/popTip/popTip.vue';
	export default {
		components: {
			activityList,
			ticket,
			goods,
			loading,
			PopTip
		},
		data() {
			return {
				// 所有的活动导航
				allActivity: [],
				// 活动数据
				activityData: [],
				activityPage: {
					pageNum: 1,
					pageSize: 12,
					total: 0,
					isFirst: true, // 是否是首次请求
					switch_nav_index: 0, // 二级类目当前索引
				},
				switch_nav_index: 0,
				// 门票
				ticketData: [],
				ticketPage: {
					pageNum: 1,
					pageSize: 12,
					total: 0,
					isFirst: true, // 是否是首次请求
					switch_nav_index: 0, // 二级类目当前索引
				},
				// 商品
				goodsData: [],
				goodsPage: {
					pageNum: 1,
					pageSize: 12,
					total: 0,
					isFirst: true, // 是否是首次请求
					switch_nav_index: 0, // 二级类目当前索引
				},
				//
				form: {
					city_id: '', //城市ID(不传默认全部商品)
					nav_one_cate_id: '', //一级导航分类下的商品
					product_type: 1 //商品类型：1:活动2:游乐场(原好物)3:酒店(原门票)4:定制
				},
				address: '', // 定位地址
				// loading:"loading",
				refresher: false, // 刷新
			};
		},
		computed: {
			// 当前product_type的活动导航
			activity() {
				if (this.allActivity.length == 0) return []
				const act = this.allActivity.find((item) => item.categoryId == this.form.nav_one_cate_id) || {}
				return act.childInfos || []
			},
			currentKey() {
				return 'activity'
			},
			currentPageKey() {
				return this.currentKey + 'Page';
			},
			currentDataKey() {
				return this.currentKey + 'Data'
			},
			// uni app 不识别带表达式判断的v-show指令：https://ask.dcloud.net.cn/question/75176
			isShowActivity() {
				return this.activityData.length > 0 && this.form.product_type === 1;
			},
			isShowGoods() {
				return this.goodsData.length > 0 && this.form.product_type === 2;
			},
			isShowTicket() {
				return this.ticketData.length > 0 && this.form.product_type === 3;
			},
			// address() {
			// 	console.log(uni.getStorageSync('chooseCity'));
			// 	return {
			// 		name: uni.getStorageSync('chooseCity').name,
			// 		id: uni.getStorageSync('chooseCity').id
			// 	};
			// }
			userInfo() {
				return uni.getStorageSync('userInfo');
			},

		},
		watch: {
			address() {
				this.form.city_id = this.address.id;
				this.newPage(this.form.nav_one_cate_id)
			}
		},
		async onLoad() {
			this.form.city_id = this.address.id;
			const type = uni.getStorageSync('type')
			this.form.nav_one_cate_id = type;
			uni.setStorageSync('type', null)
			await this.get_nav_category_list();
			this.address = uni.getStorageSync('chooseCity')
		},
		async onShow() {
			if (uni.getStorageSync('type')) {
				const type = uni.getStorageSync('type')
				console.log('onshowTab', type)
				this.click_switch(uni.getStorageSync('type'))
				uni.setStorageSync('type', null)
			} else if (this.address && uni.getStorageSync('chooseCity').id !== this.address.id) {
				console.log('下')
				this.form.city_id = this.address.id;
				const type = uni.getStorageSync('type')
				this.form.nav_one_cate_id = type;
				uni.setStorageSync('type', null)
				await this.get_nav_category_list();
				this.address = uni.getStorageSync('chooseCity')
			}
			this.$refs.poptip.getMsg()
		},
		// 分享
		onShareAppMessage() {
			return {
				title: `快来啊!来大猴小猴开启'爱的陪伴,共同成长'亲子旅程!`,
				path: `/pages/seek/seek?inviteCode=${this.userInfo.inviteCode}`
			};
		},
		// 分享到朋友圈
		onShareTimeline() {
			return {
				title: `快来啊!来大猴小猴开启'爱的陪伴,共同成长'亲子旅程!`,
				path: `inviteCode=${this.userInfo.inviteCode}`
			};
		},
		// onReachBottom() {
		// 	if (this.form.product_type === 1) {
		// 		this.onReach(this.activityData);
		// 	} else if (this.form.product_type === 2) {
		// 		this.onReach(this.goodsData);
		// 	} else {
		// 		this.onReach(this.ticketData);
		// 	}
		// },
		// onPullDownRefresh() {
		// 	this.newPage();
		// 	this.get_product_list();
		// },
		methods: {
			turnTo(urls) {
				uni.navigateTo({
					url: urls
				});
			},
			// 刷新
			refresherrefresh() {
				this.refresher = true
				this.newPage();
			},
			// 触底
			scrolltolower() {
				this.onReach(this[this.currentDataKey])
			},
			// 上拉加载
			onReach(arr) {
				// if (this.form.product_type === 4) {
				// 	return
				// }
				if (this[this.currentKey + 'Page'].total <= arr.length) {
					return;
				}
				this[this.currentKey + 'Page'].pageNum++;
				this.get_product_list();
			},
			// 分页初始化
			newPage(id) {
				this.activityPage.pageNum = 1;
				this.goodsPage.pageNum = 1;
				this.ticketPage.pageNum = 1;
				// let id;
				if (!this.form.nav_one_cate_id) {
					this.switch_nav_index = 0;
					this.form.nav_one_cate_id = this.allActivity[0].categoryId;
					const childInfo = this.allActivity[0].childInfos;
					id = childInfo.length > 0 ? childInfo[0].categoryId : null;
				}
				this.get_product_list(id)
			},
			// 一级导航栏切换
			click_switch(id) {
				console.log(id)
				this.form.nav_one_cate_id = id
				// this.filterActivity();
				const pageKey = this.currentPageKey;
				const dataKey = this.currentDataKey;
				this.switch_nav_index = 0
				this[pageKey].pageNum = 1
				this[dataKey] = []
				// 判断二级分类使用 start
				// const childInfo = this.allActivity[id - 1].childInfos;
				// let categoryId = childInfo.length > 0 ? childInfo[0].categoryId : null;
				// 判断二级分类使用 end
				// this.get_product_list(categoryId)
				// 依赖this.form.product_type,注意顺序
				// if (this[this.currentPageKey].isFirst) {
				this.get_product_list(id)
				// }
			},
			// 子导航栏切换
			switch_nav(id, index) {
				const pageKey = this.currentPageKey;
				const dataKey = this.currentDataKey;
				this.switch_nav_index = index
				this[pageKey].pageNum = 1
				this[dataKey] = []
				this.get_product_list(id);
			},
			// 筛选导航栏
			// filterActivity() {
			// 	// this.activity = this.allActivity.filter(i => i.product_type === this.form.product_type && i.id !== 175);
			// 	this.activity = this.allActivity.find(i => i.categoryId === this.form.product_type);
			// 	this.form.nav_one_cate_id = this.activity ? this.activity.categoryId : ''; // 初始导航id
			// },
			// 获取导航栏
			async get_nav_category_list() {
				const data = await this.$api.get_nav_category_list({
					merchantId: uni.getStorageSync('merchantId')
				});
				this.allActivity = data.data;
				console.log('get_nav_category_list', this.allActivity)
				// this.filterActivity();
			},
			// 获取活动商品 type : activity, ticket, goods
			get_product_list(cateId) {
				// this.loading = 'loading'
				const pageKey = this.currentPageKey;
				const dataKey = this.currentDataKey;
				this.$api
					.get_product_list({
						merchantId: uni.getStorageSync('merchantId'),
						rows: this[pageKey].pageSize,
						start: (this[pageKey].pageNum - 1) * this[pageKey].pageSize,
						type: this.form.nav_one_cate_id,
						categoryId: cateId,
					})
					.then(res => {
						if (!res.data) {
							uni.showToast({
								title: '无此分类商品',
								icon: "none"
							})
							return
						}
						this[pageKey].total = res.data.total;
						if (this[pageKey].isFirst) {
							this[pageKey].isFirst = false;
						}
						if (this[pageKey].pageNum === 1) {
							this[dataKey] = res.data.record;
						} else {
							this[dataKey].push(...res.data.record);
						}
					})
					.finally(() => {
						// uni.stopPullDownRefresh();
						this.refresher = false
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* 页面背景 */
	.app {
		height: 100%;
		// width: 100%;
		background-size: 100% 100%;
		background-image: url(https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/home/bg.png);
	}


	.title {
		background-color: #121632;
		z-index: 999;
	}

	/deep/ .headerBox {
		background-color: #121632;
	}

	/deep/ .back {
		background-color: #121632;
		height: 90rpx !important;
	}

	.searchBox {
		// position: fixed;
		width: 750rpx;
		background-color: #121632;
		border-top: 1rpx solid rgba(174, 153, 255, 0.2);
		border-bottom: 1rpx solid rgba(174, 153, 255, 0.2);
		padding: 30rpx;
		padding-bottom: 0;
		z-index: 999;

		.search {
			width: 686rpx;
			height: 60rpx;
			border-radius: 10rpx;
			background: #CACACA;
		}

		.header-switch {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;

			.switch-item {
				padding-bottom: 25rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				font-weight: normal;
				line-height: 40rpx;
				text-align: center;
				color: #C6C6C6;
			}

			.switch-item-act {
				background: url(../../static/coupon-stars.png) no-repeat;
				background-size: 40rpx 6rpx;
				background-position: 50% 60rpx;
				font-family: PingFangSC-Medium;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 40rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}

		.address {
			width: 124rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 34rpx;
			border-right: 1px solid #eeeeee;
		}

		.searchText {
			flex: 0 0 492rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			line-height: 34rpx;
			margin-left: 16rpx;
			font-weight: normal;
			color: #666666;
		}

		.image {
			width: 32rpx;
			height: 32rpx;
			margin-left: 100rpx;

			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}

	.bubble {
		overflow: hidden;
		padding: 38rpx 20rpx 0 20rpx;
		width: 710rpx;
		height: 212rpx;
		background-color: white;
		border-radius: 30rpx;
		box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.05);

		.scroll-view-item {
			width: fit-content;

			.item-image_act {
				border-radius: 30rpx;
				box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(247, 147, 30, 1);
			}

			.item {
				text-align: center;
				white-space: nowrap;
				margin: 0 20rpx;
				padding: 5rpx;

				image {
					width: 82rpx;
					height: 82rpx;
				}

				.item-tet {
					margin-top: 10rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.item-tet_act {
					color: #333;
					font-weight: 700;
					font-size: 26rpx;
				}
			}
		}
	}

	.scroll {
		// margin-top: 306rpx;
		overflow: auto;
		// overflow: hidden;
		padding: 30rpx 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		flex: 1;
		// height: 2000rpx;
	}
	.scroll-top {
		width: 100%;
		// height: 283rpx;
		height: 20vh;
		background-color: none;
		margin-bottom: 30rpx;
	}
</style>

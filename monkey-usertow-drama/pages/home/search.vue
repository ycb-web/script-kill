<template>
	<view class="app bs-bb p30">
		<div class="search w100 fixed_t bs-bb">
			<div class="inner fixedr bs-bb p20 flex ali-c">
				<input type="text" value="" v-model="from.prodName" class="flex1" @confirm="search()" placeholder="搜索活动/门票/商品名称" />
				<image src="../../static/icon30.png" mode="aspectFit" @tap="from.prodName = ''"></image>
			</div>
		</div>
		<view class="w100 topLine"></view>
		<view v-if="is_search">
<!-- 			<view class="tit flex pb-2">
				<image src="../../static/icon31.png" mode="aspectFit"></image>
				<text class="c999 f24">历史搜索</text>
			</view>
			<view class="hottxt flex wrap">
				<view v-for="(item, index) in dataHotList" class="mr-2 mr-b20 f24 c-fff" :key="index" @click="hotSearch(item)">{{ item }}</view>
			</view> -->
			<view class="tit flex pb-2">
				<image src="../../static/icon31.png" mode="aspectFit"></image>
				<text class="c999 f24">热门搜索</text>
			</view>
			<view class="hottxt flex wrap">
				<view v-for="(item, index) in hotList" class="mr-2 mr-b20 f24 c-fff" :key="index" @click="hotSearch(item.content)">{{ item.content }}</view>
			</view>
		</view>
		<view v-else>
			<view class="header-switch flex justify-around">
				<view class="switch-item" :class="switch_index == index ? 'switch-item-act' : ''" v-for="(item, index) in header_switch" @click="click_switch(index)" :key="index">
					{{ item }}
				</view>
			</view>
			<view class="mt-1">
				<activity-list class="activity-list" v-if="activityData.length > 0 && from.type === 1" :list="activityData"></activity-list>
				<view v-if="activityData.length <= 0 && from.type === 1" style="width: 100%;height: 200rpx;"></view>
				<u-empty v-if="activityData.length <= 0 && from.type === 1" style="margin-top: 100rpx;" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>

				<goods v-if="goodsData.length > 0 && from.type === 2" :list="goodsData"></goods>
				<view v-if="activityData.length <= 0 && from.type ===2" style="width: 100%;height: 200rpx;"></view>
				<u-empty v-if="goodsData.length <= 0 && from.type === 2" style="margin-top: 100rpx;" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>

				<ticket v-if="ticketData.length > 0 && from.type === 3" :list="ticketData"></ticket>
				<view v-if="activityData.length <= 0 && from.type === 3" style="width: 100%;height: 200rpx;"></view>
				<u-empty v-if="ticketData.length <= 0 && from.type === 3" style="margin-top: 100rpx;" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
				
				<!-- <loading status="loading" /> -->
			</view>
		</view>
	</view>
</template>

<script>
import activityList from '@/components/activity/activityList.vue';
import ticket from '@/components/activity/ticket.vue';
import goods from '@/components/activity/goods.vue';
import loading from '@/components/loading/uni-load-more.vue'
export default {
	components: {
		activityList,
		ticket,
		goods,
		loading
	},
	data() {
		return {
			is_search: true,
			dataHotList: [],
			hotList: [],
			searchMsg: '',
			switch_index: 0, //切换的索引
			header_switch: ['活动', '好物', '门票'], //切换的数据
			// 活动数据
			activityData: [],
			page: {
				pageNum: 1,
				pageSize: 12,
				total: 0
			},
			// 门票
			ticketData: [],
			// 商品
			goodsData: [],
			//
			from: {
				prodName: '',
				type: 1 //商品类型：1:活动2:实物（好物） 3:门票
			}
		};
	},
	onShow() {
		// this.get_hot_word_search_list();
		this.getHotDataList();
	},
	onReachBottom() {
		if (this.from.type === 1) {
			this.onReach(this.activityData);
		} else if (this.from.type === 2) {
			this.onReach(this.goodsData);
		} else {
			this.onReach(this.ticketData);
		}
	},
	onPullDownRefresh() {
		this.newPage();
		this.get_product_list();
	},
	methods: {
		// 上拉加载
		onReach(arr) {
			if (this.page.total <= arr.length) {
				return;
			}
			this.page.pageNum++;
			this.get_product_list();
		},
		search() {
			this.is_search = false;
			this.from.type = 1;
			this.get_product_list()
		},
		hotSearch(keyword){
			this.newPage()
			this.from.prodName = keyword;
			this.search()
		},
		dataHotSearch() {
			
		},
		// 分页初始化
		newPage() {
			this.page.pageNum = 1;
		},
		// 切换事件
		click_switch(index) {
			this.switch_index = index;
			this.from.type = index + 1;
			this.newPage();
			this.get_product_list();
		},
		// 导航栏切换
		switch_nav(id) {
			this.newPage();
			this.from.nav_one_cate_id = id;
			this.get_product_list();
		},
		// 获取热词
		get_hot_word_search_list(){
			this.$api.get_hot_word_search_list().then(res =>{
				this.dataHotList = res.data
			})
		},
		getHotDataList() {
			this.$api.getHotSearchData().then(res => {
				this.hotList = res.data.record;
			})
		},
		// 获取活动商品
		get_product_list() {
			// const nav_one_cate_id = this.from.type === 1 ? this.from.nav_one_cate_id : '';
			// const city_id = uni.getStorageSync('chooseCity').id;
			this.$api
				.get_search_product_list({
					// range: [this.page.pageNum, this.page.pageSize],
					rows: this.page.pageSize,
					start: (this.page.pageNum-1)*this.page.pageSize,
					merchantId: uni.getStorageSync('merchantId'),
					// city_id,
					...this.from,
					// nav_one_cate_id
				})
				.then(res => {
					this.page.total = res.data.total;
					const data = res.data.record;
					// const data = list.filter(e => e.city_id === city_id);
					if (this.page.pageNum === 1) {
						if (this.from.type === 1) {
							this.activityData = data;
						} else if (this.from.type === 2) {
							this.goodsData = data;
						} else {
							this.ticketData = data;
						}
					} else {
						if (this.from.type === 1) {
							this.activityData.push(...data);
						} else if (this.from.type === 2) {
							this.goodsData.push(...data);
						} else {
							this.ticketData.push(...data);
						}
					}
				})
				.finally(() => {
					uni.stopPullDownRefresh();
				});
		},
		// 搜索
		// get_product_list_search() {
		// 	this.$api
		// 		.get_product_list({
		// 			// range: [this.page.pageNum, this.page.pageSize],
    //       merchantId: uni.getStorageSync('merchantId'),
    //       rows: this.page.pageSize,
    //       start: (this.page.pageNum-1)*this.page.pageSize,
    //       // city_id: uni.getStorageSync('chooseCity').id,
		// 			...this.from,
		// 		})
		// 		.then(res => {
		// 			this.page.total = res.data.total;
		// 			const data = res?.data?.record;
		// 			if (data.length) {
		// 				this.switch_index = 0;
		// 				this.get_product_list();
		// 			}
		// 		})
		// 		.finally(() => {
		// 			uni.stopPullDownRefresh();
		// 		});
		// }
	}
};
</script>

<style lang="scss" scoped>
@import url('@/common/search.css');
.hottxt {
	view {
		padding: 0 20rpx;
		height: 46rpx;
		line-height: 46rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-icon32.png);
		background-size: 100% 100%;
		border-radius: 23rpx;
	}
}
.tit {
	image {
		width: 22rpx;
		height: 22rpx;
		margin-right: 10rpx;
	}
}
.app {
	background-color: #ffffff;
}
.topLine {
	height: 104rpx;
	//#ifdef H5
	padding-top: 44px;
	//#endif
}
.search {
	//#ifdef H5
	top: 44px;
	//#endif
	z-index: 999;
	background: #ffffff;
	border-top: 1px solid #eee;
	height: 104rpx;
	padding: 20rpx 30rpx;
	.inner {
		width: 100%;
		height: 64rpx;
		border-radius: 32rpx;
		background-color: #f7f7f7;
		image {
			width: 24rpx;
			height: 24rpx;
			padding-left: 10rpx;
		}
		input {
			font-size: 24rpx;
			line-height: 40rpx;
			height: 40rpx;
		}
	}
}
</style>

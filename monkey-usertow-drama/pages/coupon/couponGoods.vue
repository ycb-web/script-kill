<template>
	<view class="bs-bb p30">
		<view class="header-switch flex justify-around">
			<view class="switch-item" :class="switch_index == index ? 'switch-item-act' : ''" v-for="(item, index) in header_switch" @click="click_switch(index)" :key="index">
				{{ item }}
			</view>
		</view>
		<view class="mt-1">
			<activity-list class="activity-list" v-if="activityData.length > 0 && from.product_type === 1" :list="activityData"></activity-list>
			<view v-if="activityData.length <= 0 && from.product_type === 1" style="width: 100%;height: 200rpx;"></view>
			<u-empty v-if="activityData.length <= 0 && from.product_type === 1" style="margin-top: 100rpx;" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
			
			<goods v-if="goodsData.length > 0 && from.product_type === 2" :list="goodsData"></goods>
			<view v-if="activityData.length <= 0 && from.product_type ===2" style="width: 100%;height: 200rpx;"></view>
			<u-empty v-if="goodsData.length <= 0 && from.product_type === 2" style="margin-top: 100rpx;" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
			
			<ticket v-if="ticketData.length > 0 && from.product_type === 3" :list="ticketData"></ticket>
			<view v-if="activityData.length <= 0 && from.product_type === 3" style="width: 100%;height: 200rpx;"></view>
			<u-empty v-if="ticketData.length <= 0 && from.product_type === 3" style="margin-top: 100rpx;" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
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
			switch_index: 0, //切换的索引
			header_switch: ['活动', '好物', '门票'], //切换的数据
			// 活动数据
			activityData: [],
			page: {
				pageNum: 1,
				pageSize: 12,
				couid: '',
			},
			total: 0,
			// 门票
			ticketData: [],
			// 商品
			goodsData: [],
			//
			from: {
				product_type: 1 //商品类型：1:活动2:实物（好物） 3:门票
			},
			isFirstLoad: true, // 是否是首次加载数据
		};
	},
	onLoad(option) {
		this.page.couid = option.id
		this.search();
	},
	onReachBottom() {
		if (this.from.product_type === 1) {
			this.onReach(this.activityData);
		} else if (this.from.product_type === 2) {
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
			if (this.total <= arr.length) {
				return;
			}
			this.page.pageNum++;
			this.get_product_list();
		},
		async search() {
			let i = 1;
			do {
				await this.get_product_list(i);
				i++;
			} while (this.total < 0 || i < 4);
		},
		// 分页初始化
		newPage() {
			this.page.pageNum = 1;
		},
		// 切换事件
		click_switch(index) {
			this.switch_index = index;
			this.from.product_type = index + 1;
			this.newPage();
			this.get_product_list();
		},
		// 导航栏切换
		switch_nav(id) {
			this.newPage();
			this.from.nav_one_cate_id = id;
			this.get_product_list();
		},
		// 获取活动商品
		async get_product_list(product_type) {
			const p_type = product_type || this.from.product_type;
			await this.$api.get_coupon_product(this.page).then(res => {
				this.total = res.data.total;
				if (this.total > 0 && this.isFirstLoad) {
					this.from.product_type = p_type;
					this.switch_index = p_type - 1;
					this.isFirstLoad = false;
				}
				if (this.page.pageNum === 1) {
					if (p_type === 1) {
						this.activityData = res.data.record;
					} else if (p_type === 2) {
						this.goodsData = res.data.record;
					} else {
						this.ticketData = res.data.record;
					}
				} else {
					if (p_type === 1) {
						this.activityData.push(...res.data.record);
					} else if (p_type === 2) {
						this.goodsData.push(...res.data.record);
					} else {
						this.ticketData.push(...res.data.record);
					}
				}
			}).finally(() => {
				uni.stopPullDownRefresh();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import url('@/common/search.css');
</style>

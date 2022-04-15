<template>
	<view class="m-app">
		<view class="main"><couponItem v-for="item in list" :couponItem="item" /></view>
	</view>
</template>

<script>
// import loading from '@/components/loading/uni-load-more.vue';
import couponItem from '@/pages/coupon/component/couponItem.vue';
export default {
	components: {
		couponItem,
	},
	
	data() {
		return {
			page: {
				pageNum: 1,
				pageSize: 10,
				total: 0,
			},
			
			list: [],
			ids:'',
		}
	},
	onReachBottom() {
		
	},
	onLoad(e) {
		this.ids = e.ids
		console.log(this.ids)
		this.get_my_coupons();
	},
	methods: {
		get_my_coupons() {
			this.$api
			.get_product_details_coupons_list({
				parent_product_id:37
			})
			.then(res => {
				console.log(res.data.data)
			})
			.finally(() => {
				this.loadDown = false;
				this.loadUp = false;
			});
		}
	}
}
</script>

<style>

</style>
